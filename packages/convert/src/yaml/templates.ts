/**
 * Convert a referenced YAML template file into a `defineTemplate(...)` TS
 * source file. The body is rendered as a plain object literal — the
 * converter does not try to lift inner `${{ parameters.x }}` expressions into
 * typed parameter substitutions; those round-trip as string literals (with a
 * TODO comment) and the user can manually rewrite to typed lookups.
 */

import { parse as parseYaml } from 'yaml';
import {
  ImportCollector,
  expr,
  strLit,
  raw,
  isRaw,
  type RawExpr,
} from '../codegen/printer.js';
import { rewriteTree } from '../codegen/predef.js';

const UTILS = '@mauve/azpipe-utils';

export interface TemplateEmitInput {
  /** Path the template was referenced as in the parent (`templates/foo.yml`). */
  referencePath: string;
  /** The TS identifier the parent expects — matches the file name we'll emit. */
  identifier: string;
  /** Raw YAML text. */
  yamlText: string;
  /** Hint of where it was referenced from. */
  kind: 'jobs' | 'stages' | 'steps' | 'variables' | 'extends';
}

export interface TemplateEmitResult {
  /** Path we want the file written to, relative to the entry's directory.
   *  e.g. `'templates/build-and-test.ts'`. */
  filePath: string;
  /** TS source of the file (before Prettier). */
  source: string;
}

interface ParsedTemplate {
  parameters?: TemplateParameter[];
  // Body keys: jobs / stages / steps / variables / etc.
  [key: string]: unknown;
}

interface TemplateParameter {
  name: string;
  type?: string;
  default?: unknown;
  values?: unknown[];
}

/** Map a template to its `defineTemplate(...)` TS source. */
export function emitTemplateSource(input: TemplateEmitInput): TemplateEmitResult {
  const parsed = parseYaml(input.yamlText) as ParsedTemplate | null;
  if (parsed === null || typeof parsed !== 'object') {
    throw new Error(`Template ${input.referencePath} did not parse to a mapping`);
  }
  const imports = new ImportCollector();
  imports.add(UTILS, 'defineTemplate');

  const params = parsed.parameters ?? [];
  const paramShapeLines: string[] = [];
  for (const p of params) {
    const shape: Record<string, unknown> = { type: p.type ?? 'string' };
    if (p.default !== undefined) shape['default'] = p.default;
    if (p.values !== undefined) shape['values'] = p.values;
    paramShapeLines.push(`  ${jsKey(p.name)}: ${expr(shape, 2)},`);
  }

  // The body: take parsed minus `parameters`.
  const { parameters: _ignored, ...body } = parsed;
  void _ignored;
  // Substitute any `${{ parameters.x }}` strings with the destructured ident
  // so the body reads like the canonical examples.
  const bodyTransformed = substituteParameterRefs(body, params.map((p) => p.name));
  const { value: bodyWithPredef, usedNamespaces } = rewriteTree(bodyTransformed);
  if (usedNamespaces.size > 0) imports.add(UTILS, 'PreDef');

  const kind = inferKind(body, input.kind);
  const paramShape = paramShapeLines.length > 0 ? '{\n' + paramShapeLines.join('\n') + '\n  }' : '{}';
  const destructure = params.length > 0
    ? '{ ' + params.map((p) => safeIdent(p.name)).join(', ') + ' }'
    : '_';

  // Preserve the original YAML reference path so the round-trip through
  // `azpipe build` lands the template at the same on-disk location it was
  // imported from.
  const source =
    imports.render() + '\n\n' +
    `export const ${input.identifier} = defineTemplate({\n` +
    `  name: ${strLit(input.identifier)},\n` +
    `  path: ${strLit(input.referencePath)},\n` +
    `  kind: ${strLit(kind)},\n` +
    `  parameters: ${paramShape},\n` +
    `  body: (${destructure}) => (${expr(bodyWithPredef, 2)}),\n` +
    `});\n`;
  return { filePath: deriveTemplateFilePath(input.referencePath, input.identifier), source };
}

function inferKind(
  body: Record<string, unknown>,
  fallback: TemplateEmitInput['kind'],
): 'jobs' | 'stages' | 'steps' | 'variables' {
  if ('stages' in body) return 'stages';
  if ('jobs' in body) return 'jobs';
  if ('steps' in body) return 'steps';
  if ('variables' in body) return 'variables';
  // Use the parent's expectation as fallback (e.g. an `extends:` template
  // typically supplies the body keys but maps to whichever shape the parent
  // wired up).
  return fallback === 'extends' ? 'jobs' : fallback;
}

function deriveTemplateFilePath(referencePath: string, _identifier: string): string {
  // Strip any @repository suffix; replace .yml with .ts; keep parent dirs.
  // We mirror the YAML basename (not the camelCase identifier) so the import
  // path emitted by the entry file lines up.
  const at = referencePath.indexOf('@');
  const noAt = at >= 0 ? referencePath.slice(0, at) : referencePath;
  const dir = noAt.includes('/') ? noAt.slice(0, noAt.lastIndexOf('/')) : '';
  const file = noAt.slice(noAt.lastIndexOf('/') + 1).replace(/\.ya?ml$/i, '.ts');
  return (dir ? dir + '/' : 'templates/') + file;
}

const PARAM_RE = /\$\{\{\s*parameters\.([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

function substituteParameterRefs(value: unknown, paramNames: string[]): unknown {
  if (isRaw(value)) return value;
  if (typeof value === 'string') {
    if (!value.includes('${{')) return value;
    const replaced = stringWithParamRefs(value, paramNames);
    return replaced ?? value;
  }
  if (Array.isArray(value)) return value.map((v) => substituteParameterRefs(v, paramNames));
  if (typeof value === 'object' && value !== null) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = substituteParameterRefs(v, paramNames);
    }
    return out;
  }
  return value;
}

function stringWithParamRefs(text: string, paramNames: string[]): RawExpr | undefined {
  const matches = [...text.matchAll(PARAM_RE)];
  if (matches.length === 0) return undefined;
  const known = new Set(paramNames);
  // Whole-string single match → bare identifier (cast to string for safety).
  if (matches.length === 1 && matches[0]![0] === text) {
    const name = matches[0]![1]!;
    if (known.has(name)) return raw(`${safeIdent(name)} as unknown as string`);
    return undefined;
  }
  // Otherwise produce a template literal stitched from idents and raw text.
  let cursor = 0;
  let out = '';
  let any = false;
  for (const m of matches) {
    const name = m[1]!;
    if (!known.has(name)) continue;
    const start = m.index ?? 0;
    const end = start + m[0].length;
    if (start > cursor) out += escTemplate(text.slice(cursor, start));
    out += '${' + safeIdent(name) + '}';
    cursor = end;
    any = true;
  }
  if (!any) return undefined;
  if (cursor < text.length) out += escTemplate(text.slice(cursor));
  return raw('`' + out + '`');
}

function escTemplate(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const RESERVED = new Set([
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
  'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false',
  'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new',
  'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try',
  'typeof', 'var', 'void', 'while', 'with', 'yield',
]);

function safeIdent(name: string): string {
  if (RESERVED.has(name)) return name + '_';
  return name;
}

function jsKey(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) && !RESERVED.has(name) ? name : strLit(name);
}
