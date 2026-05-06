/**
 * Pure code-emission helpers for ghactions-actions.
 *
 * No filesystem access — sync-actions.ts handles all I/O.
 *
 * Exports:
 *   - generateActionFile(entry, actionYaml): per-action TS source
 *   - generateIndexFile(emitted): aggregate re-exporter barrel
 */

// ---------- Types from action.yml ----------

export interface ActionYamlInput {
  description?: string;
  required?: boolean;
  default?: string;
}

export interface ActionYaml {
  name?: string;
  description?: string;
  inputs?: Record<string, ActionYamlInput>;
}

// ---------- Entry from config ----------

export interface ActionEntry {
  /** GitHub owner (e.g. "actions", "docker"). */
  owner: string;
  /** Repository name (e.g. "checkout"). */
  repo: string;
  /** Major-version ref string (e.g. "v4"). */
  ref: string;
}

// ---------- Helpers ----------

const RESERVED_WORDS = new Set([
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
  'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for',
  'function', 'if', 'import', 'in', 'instanceof', 'new', 'null', 'return',
  'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void',
  'while', 'with', 'yield',
]);

/** Converts "owner/repo" → "ownerRepo" PascalCase-style identifier base. */
function entryIdentifierBase(entry: ActionEntry): string {
  const ownerPart = toPascalCase(entry.owner.replace(/[^a-zA-Z0-9]/g, '-'));
  const repoPart = toPascalCase(entry.repo.replace(/[^a-zA-Z0-9]/g, '-'));
  return ownerPart + repoPart;
}

function toPascalCase(s: string): string {
  return s
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase() + w.slice(1))
    .join('');
}

function toCamelCase(s: string): string {
  const p = toPascalCase(s);
  return p.length === 0 ? p : p[0]!.toLowerCase() + p.slice(1);
}

/** e.g. "actions/checkout" + "v4" → "actionsCheckoutV4" */
export function fnNameFor(entry: ActionEntry): string {
  const base = toCamelCase(
    entry.owner.replace(/[^a-zA-Z0-9]/g, '-') + '-' + entry.repo.replace(/[^a-zA-Z0-9]/g, '-'),
  );
  const vSuffix = entry.ref.replace(/^v/i, 'V').replace(/[^a-zA-Z0-9]/g, '');
  let name = base + vSuffix;
  if (RESERVED_WORDS.has(name)) name += '_';
  return name;
}

/** e.g. "actions/checkout" + "v4" → "ActionsCheckoutV4Inputs" */
export function inputsTypeNameFor(entry: ActionEntry): string {
  const base = entryIdentifierBase(entry);
  const vSuffix = entry.ref.replace(/^v/i, 'V').replace(/[^a-zA-Z0-9]/g, '');
  return base + vSuffix + 'Inputs';
}

/** e.g. "actions/checkout@v4" → "actions-checkout-v4.ts" */
export function slugFor(entry: ActionEntry): string {
  const ownerSlug = entry.owner.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const repoSlug = entry.repo.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const refSlug = entry.ref.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `${ownerSlug}-${repoSlug}-${refSlug}`;
}

/** Make text safe inside a `/** ... *\/` block. */
function sanitizeComment(text: string): string {
  return text
    // eslint-disable-next-line no-control-regex
    .replace(/\u0000/g, '')
    .replace(/\r\n?/g, '\n')
    .replace(/\t/g, '  ')
    .replace(/\*\//g, '*\u200B/');
}

/** Wrap a paragraph to ~100 cols. */
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

/**
 * Returns true if an input should be required in the TypeScript interface.
 * Inputs with a default value are optional even if `required: true` because
 * the action will use the default when the input is omitted.
 */
function isInputRequired(input: ActionYamlInput): boolean {
  if (input.required !== true) return false;
  if (input.default !== undefined && input.default !== '') return false;
  return true;
}

// ---------- Public API ----------

export interface GenerateResult {
  fnName: string;
  inputsTypeName: string;
  slug: string;
  contents: string;
}

/**
 * Generate the TypeScript source for a single action wrapper.
 *
 * @param entry - Identifying metadata for the action (owner, repo, ref).
 * @param actionYaml - Parsed contents of the action's `action.yml`.
 * @returns The generated TypeScript source and naming metadata.
 */
export function generateActionFile(
  entry: ActionEntry,
  actionYaml: ActionYaml,
): GenerateResult {
  const fnName = fnNameFor(entry);
  const inputsTypeName = inputsTypeNameFor(entry);
  const slug = slugFor(entry);
  const usesRef = `${entry.owner}/${entry.repo}@${entry.ref}`;

  const inputs = Object.entries(actionYaml.inputs ?? {});

  // Build inputs interface body.
  const fieldLines: string[] = [];
  for (const [inputName, input] of inputs) {
    const required = isInputRequired(input);
    const docParts: string[] = [];
    if (input.description) docParts.push(input.description);
    if (input.default !== undefined && input.default !== '') {
      docParts.push(`@default ${input.default}`);
    }
    const doc = renderTsdoc(docParts, '  ');
    const quotedName = JSON.stringify(inputName);
    fieldLines.push(`${doc}  ${quotedName}${required ? '' : '?'}: string | boolean | number;`);
  }

  const inputsSection =
    fieldLines.length > 0
      ? `export interface ${inputsTypeName} {\n${fieldLines.join('\n')}\n}\n`
      : `export interface ${inputsTypeName} {}\n`;

  // Function TSDoc.
  const fnDocParts: string[] = [];
  if (actionYaml.name) fnDocParts.push(actionYaml.name);
  if (actionYaml.description) fnDocParts.push(actionYaml.description);
  fnDocParts.push(`@see https://github.com/${entry.owner}/${entry.repo}`);

  const fnDoc = renderTsdoc(fnDocParts);

  // Determine if any input is truly required (required: true and no default).
  const hasRequiredInputs = inputs.some(([, input]) => isInputRequired(input));

  const fn = [
    `${fnDoc}export function ${fnName}(`,
    hasRequiredInputs
      ? `  inputs: ${inputsTypeName},`
      : `  inputs: ${inputsTypeName} = {},`,
    `  opts: ActionStepOptions = {},`,
    `): UsesStep {`,
    `  return makeAction(${JSON.stringify(usesRef)}, inputs as unknown as Record<string, string | boolean | number | undefined>, opts);`,
    `}`,
    '',
  ].join('\n');

  const banner =
    `/* eslint-disable */\n` +
    `// Auto-generated from ${usesRef}/action.yml. Do not edit by hand.\n` +
    `// Run \`pnpm sync-actions\` to regenerate.\n\n`;

  const imports = [
    `import type { UsesStep } from '@mauvezero/ghactions';`,
    `import { makeAction, type ActionStepOptions } from '../runtime.js';`,
  ].join('\n');

  const contents = banner + imports + '\n\n' + inputsSection + '\n' + fn;

  return { fnName, inputsTypeName, slug, contents };
}

/**
 * Generate the barrel `index.ts` that re-exports every generated action file.
 */
export function generateIndexFile(emitted: { fnName: string; inputsTypeName: string; slug: string }[]): string {
  const sorted = [...emitted].sort((a, b) => a.fnName.localeCompare(b.fnName));
  const lines = [
    '/* eslint-disable */',
    '// Auto-generated by `pnpm sync-actions`. Do not edit by hand.',
    '',
  ];
  for (const e of sorted) {
    lines.push(`export { ${e.fnName} } from './${e.slug}.js';`);
    lines.push(`export type { ${e.inputsTypeName} } from './${e.slug}.js';`);
  }
  lines.push('');
  return lines.join('\n');
}
