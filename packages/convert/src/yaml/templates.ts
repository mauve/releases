/**
 * Convert a referenced YAML template file into either:
 * - A plain TS function returning `Step[]` / `Job[]` / `Stage[]` (inline mode — default).
 * - A `defineTemplate(...)` call (legacy mode — used when `--no-inline-templates` or as
 *   fallback for templates with unsupported expressions).
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

const AZPIPE = '@mauve/azpipe';
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

// ---------------------------------------------------------------------------
// Inline template mode: emits a plain TS function returning Step[]/Job[]/Stage[]
// ---------------------------------------------------------------------------

/** Return type annotation for a template function based on its kind. */
function returnType(kind: string): string {
  switch (kind) {
    case 'steps': return 'Step[]';
    case 'jobs': return 'Job[]';
    case 'stages': return 'Stage[]';
    default: return 'unknown[]';
  }
}

/** Map a YAML parameter type to a TS type annotation. */
function tsType(paramType: string | undefined): string {
  switch (paramType) {
    case 'boolean': return 'boolean';
    case 'number': return 'number';
    case 'object': return 'Record<string, unknown>';
    case 'stepList': return 'Step[]';
    case 'jobList': return 'Job[]';
    case 'stageList': return 'Stage[]';
    default: return 'string';
  }
}

/** Result of inline template emission — includes whether we fell back to defineTemplate. */
export interface InlineTemplateEmitResult extends TemplateEmitResult {
  /** True when the template had complex expressions that couldn't be fully converted. */
  hasComplexExpressions: boolean;
}

/**
 * Emit a template as a plain TypeScript function.
 *
 * Best-effort conversion:
 * - `${{ parameters.x }}` → destructured parameter
 * - `${{ if condition }}` → conditional spread with ternary (array context only)
 * - `${{ each item in parameters.list }}` → spread of the parameter array
 *
 * If expressions are too complex (in non-array contexts, unknown functions),
 * they pass through literally with a TODO comment. The function is still emitted
 * but the user must manually fix the complex parts.
 */
export function emitInlineTemplateSource(input: TemplateEmitInput): InlineTemplateEmitResult {
  const parsed = parseYaml(input.yamlText) as ParsedTemplate | null;
  if (parsed === null || typeof parsed !== 'object') {
    throw new Error(`Template ${input.referencePath} did not parse to a mapping`);
  }

  const params = parsed.parameters ?? [];
  const { parameters: _ignored, ...body } = parsed;
  void _ignored;

  const complexity = assessComplexity(body);

  const imports = new ImportCollector();
  const kind = inferKind(body, input.kind);
  const rtType = returnType(kind);

  // Add the return-type import.
  if (kind === 'steps') imports.add(AZPIPE, 'Step');
  else if (kind === 'jobs') imports.add(AZPIPE, 'AnyJob');
  else if (kind === 'stages') imports.add(AZPIPE, 'AnyStage');

  // Substitute ${{ parameters.x }} with bare identifiers.
  const paramNames = params.map((p) => p.name);
  const bodyTransformed = substituteParameterRefs(body, paramNames);

  // Handle ${{ if }} and ${{ each }} expressions in arrays.
  const bodyWithExpressions = convertExpressions(bodyTransformed, paramNames);

  // Apply PreDef rewriting.
  const { value: bodyWithPredef, usedNamespaces } = rewriteTree(bodyWithExpressions);
  if (usedNamespaces.size > 0) imports.add(UTILS, 'PreDef');

  // Build the function parameter signature.
  const paramSig = buildParamSignature(params);

  // Extract the body array (jobs/steps/stages).
  const bodyArray = (bodyWithPredef as Record<string, unknown>)[kind];
  const actualReturnType = kind === 'jobs' ? 'AnyJob[]' : kind === 'stages' ? 'AnyStage[]' : rtType;

  const todoComment = complexity === 'too-complex'
    ? '// TODO: This template contains complex ${{ }} expressions that need manual conversion.\n'
    : '';

  const source =
    imports.render() + '\n\n' +
    todoComment +
    `export function ${input.identifier}(${paramSig}): ${actualReturnType} {\n` +
    `  return ${expr(bodyArray, 2)};\n` +
    `}\n`;

  return {
    filePath: deriveTemplateFilePath(input.referencePath, input.identifier),
    source,
    hasComplexExpressions: complexity === 'too-complex',
  };
}

/** Build a TypeScript function parameter with destructuring and defaults. */
function buildParamSignature(params: TemplateParameter[]): string {
  if (params.length === 0) return '';

  const required: string[] = [];
  const optional: string[] = [];

  for (const p of params) {
    const name = safeIdent(p.name);
    const type = tsType(p.type);
    if (p.default !== undefined) {
      optional.push(`${name} = ${expr(p.default, 0)}`);
    } else {
      required.push(`${name}`);
    }
  }

  // Build the type annotation for the parameter object.
  const typeProps = params.map((p) => {
    const name = safeIdent(p.name);
    const type = tsType(p.type);
    const isOptional = p.default !== undefined;
    return `${name}${isOptional ? '?' : ''}: ${type}`;
  });

  const allNames = [...required, ...optional];
  const typeAnnotation = `{ ${typeProps.join('; ')} }`;

  if (required.length === 0) {
    // All optional — provide a default empty object.
    return `{ ${allNames.join(', ')} }: ${typeAnnotation} = {}`;
  }
  return `{ ${allNames.join(', ')} }: ${typeAnnotation}`;
}

// ---------------------------------------------------------------------------
// Expression assessment and conversion
// ---------------------------------------------------------------------------

type Complexity = 'simple' | 'has-expressions' | 'too-complex';

const EXPR_IF_RE = /\$\{\{\s*if\s+/;
const EXPR_EACH_RE = /\$\{\{\s*each\s+/;
const EXPR_ELSEIF_RE = /\$\{\{\s*else(?:if|\s*if)?\s*/;
const EXPR_GENERIC_RE = /\$\{\{[^}]*\}\}/;

/** Walk the body and determine whether it uses expressions we can't convert.
 *  @param inArrayItem - true when this value is a direct element of an array
 *  (where ${{ if }} keys can be converted to conditional spreads). */
function assessComplexity(value: unknown, inArrayItem = false): Complexity {
  if (typeof value === 'string') {
    if (!value.includes('${{')) return 'simple';
    // Check for non-parameter, non-if, non-each expressions that we can't handle.
    const stripped = value
      .replace(PARAM_RE, '')
      .replace(/\$\{\{\s*if\s+[^}]*\}\}/g, '')
      .replace(/\$\{\{\s*elseif\s+[^}]*\}\}/g, '')
      .replace(/\$\{\{\s*else\s*\}\}/g, '')
      .replace(/\$\{\{\s*each\s+[^}]*\}\}/g, '');
    if (EXPR_GENERIC_RE.test(stripped)) return 'too-complex';
    return 'has-expressions';
  }
  if (Array.isArray(value)) {
    let result: Complexity = 'simple';
    for (const item of value) {
      // Array items can have ${{ if }} keys that we convert to conditional spreads.
      const c = assessComplexity(item, true);
      if (c === 'too-complex') return 'too-complex';
      if (c === 'has-expressions') result = 'has-expressions';
    }
    return result;
  }
  if (typeof value === 'object' && value !== null) {
    let result: Complexity = 'simple';
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
      if (EXPR_IF_RE.test(key) || EXPR_EACH_RE.test(key) || EXPR_ELSEIF_RE.test(key)) {
        if (inArrayItem) {
          // Convertible: array-level conditionals/iterations.
          result = 'has-expressions';
        } else {
          // Non-array-context: can't convert object-key expressions.
          return 'too-complex';
        }
      }
      const c = assessComplexity(v);
      if (c === 'too-complex') return 'too-complex';
      if (c === 'has-expressions') result = 'has-expressions';
    }
    return result;
  }
  return 'simple';
}

// Regex for ${{ if <condition> }} used as an object key.
const IF_KEY_RE = /^\$\{\{\s*if\s+(.+?)\s*\}\}$/;
const EACH_KEY_RE = /^\$\{\{\s*each\s+(\w+)\s+in\s+parameters\.(\w+)\s*\}\}$/;
const ELSE_KEY_RE = /^\$\{\{\s*else\s*\}\}$/;
const ELSEIF_KEY_RE = /^\$\{\{\s*else\s*if\s+(.+?)\s*\}\}$/;

/**
 * Convert `${{ if }}` and `${{ each }}` expressions in arrays to TS-representable
 * conditional/iteration patterns using RawExpr nodes.
 */
function convertExpressions(value: unknown, paramNames: string[]): unknown {
  if (isRaw(value)) return value;
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return convertArrayExpressions(value, paramNames);
  if (typeof value === 'object' && value !== null) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = convertExpressions(v, paramNames);
    }
    return out;
  }
  return value;
}

/**
 * In Azure Pipelines YAML, conditional items in arrays look like:
 * ```yaml
 * steps:
 *   - ${{ if eq(parameters.runLint, true) }}:
 *     - script: npm run lint
 *   - script: npm test
 * ```
 *
 * We convert these into conditional spreads: `...(runLint ? [{ script: 'npm run lint' }] : [])`
 */
function convertArrayExpressions(arr: unknown[], paramNames: string[]): unknown[] {
  const result: unknown[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (typeof item !== 'object' || item === null) {
      result.push(convertExpressions(item, paramNames));
      continue;
    }
    const entries = Object.entries(item as Record<string, unknown>);
    if (entries.length === 0) {
      result.push(item);
      continue;
    }

    const [key, val] = entries[0]!;
    const ifMatch = IF_KEY_RE.exec(key);
    if (ifMatch) {
      const condition = convertConditionToTs(ifMatch[1]!, paramNames);
      if (condition === null) {
        // Can't convert — pass through unchanged, assessComplexity should have caught this.
        result.push(convertExpressions(item, paramNames));
        continue;
      }
      const thenItems = Array.isArray(val) ? val : [val];
      const convertedThen = convertArrayExpressions(thenItems, paramNames);

      // Check for ${{ else }} in subsequent entries of the same object.
      let elseItems: unknown[] = [];
      if (entries.length > 1) {
        const [elseKey, elseVal] = entries[1]!;
        if (ELSE_KEY_RE.test(elseKey)) {
          elseItems = Array.isArray(elseVal) ? elseVal : [elseVal];
        }
      }
      const convertedElse = elseItems.length > 0 ? convertArrayExpressions(elseItems, paramNames) : undefined;

      const thenExpr = expr(convertedThen, 2);
      const elseExpr = convertedElse ? expr(convertedElse, 2) : '[]';
      result.push(raw(`...(${condition} ? ${thenExpr} : ${elseExpr})`));
      continue;
    }

    const eachMatch = EACH_KEY_RE.exec(key);
    if (eachMatch) {
      const itemVar = eachMatch[1]!;
      const listParam = eachMatch[2]!;
      if (!paramNames.includes(listParam)) {
        result.push(convertExpressions(item, paramNames));
        continue;
      }
      // For simple `${{ each step in parameters.steps }}` where val is the iteration body.
      result.push(raw(`...${safeIdent(listParam)}`));
      continue;
    }

    // Regular item — recurse into values.
    result.push(convertExpressions(item, paramNames));
  }
  return result;
}

// Condition conversion: eq(parameters.x, true) → x === true, etc.
const EQ_RE = /^eq\(\s*parameters\.(\w+)\s*,\s*(.+?)\s*\)$/;
const NE_RE = /^ne\(\s*parameters\.(\w+)\s*,\s*(.+?)\s*\)$/;
const NOT_EQ_RE = /^not\(\s*eq\(\s*parameters\.(\w+)\s*,\s*(.+?)\s*\)\s*\)$/;
const PARAM_BOOL_RE = /^parameters\.(\w+)$/;

function convertConditionToTs(condition: string, paramNames: string[]): string | null {
  const eqMatch = EQ_RE.exec(condition);
  if (eqMatch) {
    const [, paramName, value] = eqMatch;
    if (!paramNames.includes(paramName!)) return null;
    return `${safeIdent(paramName!)} === ${convertConditionValue(value!)}`;
  }

  const neMatch = NE_RE.exec(condition);
  if (neMatch) {
    const [, paramName, value] = neMatch;
    if (!paramNames.includes(paramName!)) return null;
    return `${safeIdent(paramName!)} !== ${convertConditionValue(value!)}`;
  }

  const notEqMatch = NOT_EQ_RE.exec(condition);
  if (notEqMatch) {
    const [, paramName, value] = notEqMatch;
    if (!paramNames.includes(paramName!)) return null;
    return `${safeIdent(paramName!)} !== ${convertConditionValue(value!)}`;
  }

  const boolMatch = PARAM_BOOL_RE.exec(condition);
  if (boolMatch) {
    const paramName = boolMatch[1]!;
    if (!paramNames.includes(paramName)) return null;
    return safeIdent(paramName);
  }

  // Can't convert this condition.
  return null;
}

function convertConditionValue(value: string): string {
  if (value === 'true') return 'true';
  if (value === 'false') return 'false';
  // Quoted strings.
  if ((value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith('"') && value.endsWith('"'))) {
    return strLit(value.slice(1, -1));
  }
  // Numeric values.
  if (/^\d+(\.\d+)?$/.test(value)) return value;
  // Otherwise treat as a string literal.
  return strLit(value);
}
