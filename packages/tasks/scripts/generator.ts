/**
 * Pure code-emission helpers. No filesystem access — sync-tasks.ts handles I/O.
 *
 * Exports:
 *   - generateTaskFile(taskJson, folder, knownConnectionKinds): per-task TS source
 *   - generateConnectionsFile(kinds): branded connection types + constructors
 *   - generateIndexFile(emitted): aggregate re-exporter
 */

export interface TaskInput {
  name: string;
  type: string;
  label?: string;
  defaultValue?: unknown;
  required?: boolean;
  helpMarkDown?: string;
  groupName?: string;
  visibleRule?: string;
  options?: Record<string, string>;
}

export interface TaskJson {
  id: string;
  name: string;
  friendlyName?: string;
  description?: string;
  helpMarkDown?: string;
  helpUrl?: string;
  category?: string;
  version: { Major: number; Minor: number; Patch: number };
  deprecated?: boolean;
  deprecationMessage?: string;
  removalDate?: string;
  inputs?: TaskInput[];
}

const RESERVED_WORDS = new Set([
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
  'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for',
  'function', 'if', 'import', 'in', 'instanceof', 'new', 'null', 'return',
  'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void',
  'while', 'with', 'yield',
]);

export function camelCase(s: string): string {
  // PascalCase → camelCase. Preserve internal capitals (e.g. "AzureCLI" → "azureCLI").
  return s.length === 0 ? s : s[0]!.toLowerCase() + s.slice(1);
}

export function kebabCase(s: string): string {
  return s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function pascalCase(s: string): string {
  return s.length === 0 ? s : s[0]!.toUpperCase() + s.slice(1);
}

/** Make text safe to embed inside a `/** ... *\/` block. */
export function sanitizeComment(text: string): string {
  return text
    // eslint-disable-next-line no-control-regex -- intentionally strip NUL bytes from upstream JSON
    .replace(/\u0000/g, '')
    .replace(/\r\n?/g, '\n')
    .replace(/\t/g, '  ')
    // Break any literal `*/` sequence so it can't close the doc-comment block.
    // Use a zero-width space which preserves visual rendering but separates
    // the two characters at the lexer level.
    .replace(/\*\//g, '*\u200B/');
}

/** Wrap a single paragraph to ~100 cols on word boundaries. URLs aren't broken. */
function wrapParagraph(text: string, width = 92): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    if (line.length === 0) {
      line = w;
    } else if (line.length + 1 + w.length <= width) {
      line += ' ' + w;
    } else {
      lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Render a TSDoc block from an array of paragraph strings. Returns "" if no content. */
function renderTsdoc(paragraphs: (string | undefined)[], indent = ''): string {
  const cleaned = paragraphs
    .filter((p): p is string => typeof p === 'string' && p.trim().length > 0)
    .map((p) => sanitizeComment(p.trim()));
  if (cleaned.length === 0) return '';
  const lines: string[] = [`${indent}/**`];
  cleaned.forEach((para, i) => {
    if (i > 0) lines.push(`${indent} *`);
    // Preserve intra-paragraph newlines as separate doc lines.
    for (const sub of para.split('\n')) {
      const wrapped = wrapParagraph(sub.trim());
      if (wrapped.length === 0) {
        lines.push(`${indent} *`);
      } else {
        for (const w of wrapped) lines.push(`${indent} * ${w}`);
      }
    }
  });
  lines.push(`${indent} */`);
  return lines.join('\n') + '\n';
}

function fnNameFor(t: TaskJson): string {
  let name = camelCase(t.name) + 'V' + t.version.Major;
  if (RESERVED_WORDS.has(name)) name += '_';
  return name;
}

function inputsTypeNameFor(t: TaskJson): string {
  return pascalCase(t.name) + 'V' + t.version.Major + 'Inputs';
}

function isInputRequired(input: TaskInput): boolean {
  if (input.required !== true) return false;
  // visibleRule means the input is conditionally shown — treat as optional in TS.
  if (input.visibleRule && input.visibleRule.trim().length > 0) return false;
  // A non-empty defaultValue means Azure DevOps will apply the default when
  // the field is omitted, so the caller is not forced to supply it.
  if (input.defaultValue !== undefined && input.defaultValue !== '') return false;
  return true;
}

function literalUnionFromOptions(options: Record<string, string> | undefined): string {
  const keys = Object.keys(options ?? {});
  if (keys.length === 0) return 'string';
  return keys.map((k) => JSON.stringify(k)).join(' | ');
}

function inputTypescriptType(
  input: TaskInput,
  knownConnectionKinds: string[],
): { tsType: string; pickListBullets: string[] } {
  const t = input.type;
  if (t.startsWith('connectedService:')) {
    const kind = t.slice('connectedService:'.length);
    // Only emit branded type if we collected this kind in connections.ts; otherwise fall back to string.
    if (knownConnectionKinds.includes(kind)) {
      return { tsType: connectionTypeName(kind), pickListBullets: [] };
    }
    return { tsType: 'string', pickListBullets: [] };
  }
  switch (t) {
    case 'string':
    case 'multiLine':
    case 'filePath':
    case 'secureFile':
    case 'identities':
    case 'querycontrol':
      return { tsType: 'string', pickListBullets: [] };
    case 'int':
      return { tsType: 'number', pickListBullets: [] };
    case 'boolean':
      return { tsType: 'boolean', pickListBullets: [] };
    case 'pickList':
    case 'radio': {
      const bullets = Object.entries(input.options ?? {}).map(
        ([k, v]) => `\`${k}\` — ${v}`,
      );
      return { tsType: literalUnionFromOptions(input.options), pickListBullets: bullets };
    }
    default:
      return { tsType: `string /* TODO: unknown task input type "${t}" */`, pickListBullets: [] };
  }
}

function connectionTypeName(kind: string): string {
  // Sanitize kind to a valid TS identifier; keep PascalCase shape.
  const safe = kind.replace(/[^A-Za-z0-9_]/g, '_');
  return `${safe}Connection`;
}

function connectionFnName(kind: string): string {
  const safe = kind.replace(/[^A-Za-z0-9_]/g, '_');
  return camelCase(safe) + 'Connection';
}

export function generateConnectionsFile(kinds: string[]): string {
  const header = renderTsdoc([
    'Branded service-connection types.',
    'Each kind corresponds to a `connectedService:<Kind>` input type in the upstream task definitions. ' +
    'Use the constructor functions to create a typed reference to a service connection by name; ' +
    'the brand prevents accidentally passing one connection kind where another is expected.',
    'Auto-generated by `pnpm sync-tasks`. Do not edit by hand.',
  ]);
  const body = kinds
    .map((kind) => {
      const typeName = connectionTypeName(kind);
      const fnName = connectionFnName(kind);
      const symName = `__brand_${typeName}`;
      return [
        renderTsdoc([
          `Reference to a "${kind}" service connection by name.`,
        ]),
        `declare const ${symName}: unique symbol;`,
        `export type ${typeName} = string & { readonly [${symName}]: void };`,
        '',
        renderTsdoc([
          `Construct a typed reference to a "${kind}" service connection.`,
          `@param name The name (or id) of the service connection in the Azure DevOps project.`,
        ]),
        `export function ${fnName}(name: string): ${typeName} {`,
        `  return name as ${typeName};`,
        `}`,
        '',
      ].join('\n');
    })
    .join('\n');
  return `/* eslint-disable */\n${header}${body}`;
}

interface GenerateResult {
  fnName: string;
  relPath: string;
  contents: string;
}

export function generateTaskFile(
  t: TaskJson,
  folder: string,
  knownConnectionKinds: string[],
): GenerateResult | null {
  if (!t.name || !t.version || typeof t.version.Major !== 'number') return null;

  const fnName = fnNameFor(t);
  const inputsTypeName = inputsTypeNameFor(t);
  const taskRef = `${t.name}@${t.version.Major}`;
  const upstreamUrl = `https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/${folder}`;
  const usedConnectionKinds = new Set<string>();

  const inputs = t.inputs ?? [];

  // Build inputs interface body.
  const fieldLines: string[] = [];
  for (const input of inputs) {
    const { tsType, pickListBullets } = inputTypescriptType(input, knownConnectionKinds);
    if (input.type.startsWith('connectedService:')) {
      const kind = input.type.slice('connectedService:'.length);
      if (knownConnectionKinds.includes(kind)) usedConnectionKinds.add(kind);
    }
    const docParts: string[] = [];
    if (input.label) docParts.push(input.label);
    if (input.helpMarkDown) docParts.push(input.helpMarkDown);
    if (pickListBullets.length > 0) {
      docParts.push(pickListBullets.map((b) => `- ${b}`).join('\n'));
    }
    if (input.defaultValue !== undefined && input.defaultValue !== '') {
      const defStr = typeof input.defaultValue === 'string' ? input.defaultValue : JSON.stringify(input.defaultValue);
      docParts.push(`@default ${defStr}`);
    }
    if (input.visibleRule) {
      docParts.push(`Only meaningful when: \`${input.visibleRule}\``);
    }
    if (input.groupName) {
      docParts.push(`In group: ${input.groupName}`);
    }
    const doc = renderTsdoc(docParts, '  ');
    const required = isInputRequired(input);
    const fieldName = JSON.stringify(input.name); // always quote — input names can have non-identifier chars in practice
    fieldLines.push(`${doc}  ${fieldName}${required ? '' : '?'}: ${tsType};`);
  }

  // Build the file.
  const inputsSection = fieldLines.length > 0
    ? `export interface ${inputsTypeName} {\n${fieldLines.join('\n')}\n}\n`
    : `export interface ${inputsTypeName} {}\n`;

  const fnDocParts: string[] = [];
  if (t.friendlyName) fnDocParts.push(t.friendlyName);
  if (t.description) fnDocParts.push(t.description);
  if (t.helpMarkDown && t.helpMarkDown !== t.description) fnDocParts.push(t.helpMarkDown);
  if (t.helpUrl) fnDocParts.push(`@see ${t.helpUrl}`);
  fnDocParts.push(`@see ${upstreamUrl}`);
  if (t.deprecated) {
    const reason = t.deprecationMessage ? ` ${t.deprecationMessage}` : '';
    fnDocParts.push(`@deprecated${reason}`);
  }

  const fnDoc = renderTsdoc(fnDocParts);

  // Imports. Tasks live at src/generated/<kebab>/v<N>.ts; runtime is at
  // src/runtime.ts and connections at src/generated/connections.ts.
  const imports = [`import { makeTask, type TaskStepOptions } from '../../runtime.js';`];
  if (usedConnectionKinds.size > 0) {
    const connTypes = [...usedConnectionKinds].sort().map((k) => connectionTypeName(k)).join(', ');
    imports.push(`import type { ${connTypes} } from '../connections.js';`);
  }

  const fn = [
    `${fnDoc}export function ${fnName}(`,
    `  inputs: ${inputsTypeName},`,
    `  opts: TaskStepOptions = {},`,
    `): ReturnType<typeof makeTask> {`,
    `  return makeTask(${JSON.stringify(taskRef)}, inputs as unknown as Record<string, unknown>, opts);`,
    `}`,
    '',
  ].join('\n');

  const banner = `/* eslint-disable */\n// Auto-generated from ${folder}/task.json. Do not edit by hand.\n// Run \`pnpm sync-tasks\` to regenerate.\n\n`;

  const contents = banner + imports.join('\n') + '\n\n' + inputsSection + '\n' + fn;

  const relPath = `${kebabCase(t.name)}/v${t.version.Major}.ts`;

  return { fnName, relPath, contents };
}

export function generateIndexFile(emitted: { fnName: string; relPath: string }[]): string {
  const sorted = [...emitted].sort((a, b) => a.fnName.localeCompare(b.fnName));
  const lines = [
    '/* eslint-disable */',
    '// Auto-generated by `pnpm sync-tasks`. Do not edit by hand.',
    '',
  ];
  for (const e of sorted) {
    const importPath = './' + e.relPath.replace(/\.ts$/, '.js');
    lines.push(`export { ${e.fnName} } from ${JSON.stringify(importPath)};`);
  }
  lines.push('');
  return lines.join('\n');
}

export interface TaskIdEntry {
  /** `Name@Major` form, matching what `makeTask` writes to `TaskStep.task`. */
  taskRef: string;
  /** Task GUID from `task.json` `id`. */
  id: string;
  /** Major version. */
  major: number;
}

/**
 * Emit the lookup table consumed by the release-side workflow-task adapter
 * in @mauvezero/azpipe-releases. Maps the `task` field of a TaskStep
 * (e.g. `'AzureCLI@2'`) to the GUID + major version Azure DevOps Releases
 * needs (`taskId` + `version: 'major.*'`).
 */
export function generateTaskIdsFile(entries: TaskIdEntry[]): string {
  const sorted = [...entries].sort((a, b) => a.taskRef.localeCompare(b.taskRef));
  const lines = [
    '/* eslint-disable */',
    '// Auto-generated by `pnpm sync-tasks`. Do not edit by hand.',
    '',
    'export interface TaskIdEntry {',
    '  /** Task GUID. */',
    '  readonly id: string;',
    '  /** Major version. */',
    '  readonly major: number;',
    '}',
    '',
    'export const taskIds: Readonly<Record<string, TaskIdEntry>> = Object.freeze({',
  ];
  for (const e of sorted) {
    lines.push(
      `  ${JSON.stringify(e.taskRef)}: { id: ${JSON.stringify(e.id)}, major: ${e.major} },`,
    );
  }
  lines.push('});');
  lines.push('');
  lines.push('/**');
  lines.push(' * Look up the GUID and major version for a task ref like `\'AzureCLI@2\'`.');
  lines.push(' * Returns undefined for unknown refs (custom or marketplace tasks not in our');
  lines.push(' * generated catalog) — callers should fall back to the raw `task` string.');
  lines.push(' */');
  lines.push('export function lookupTaskId(taskRef: string): TaskIdEntry | undefined {');
  lines.push('  return taskIds[taskRef];');
  lines.push('}');
  lines.push('');
  return lines.join('\n');
}
