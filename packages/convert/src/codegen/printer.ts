/**
 * Low-level TypeScript source emitters.
 *
 * The converter builds output as plain strings rather than via an AST. The
 * helpers here keep formatting consistent so the post-Prettier pass has very
 * little to fix up: object literals are emitted multi-line, primitives are
 * quoted properly, and chained method calls land one-per-line.
 *
 * String contents are emitted with single quotes by default to match the
 * canonical example style; embedded single quotes / backslashes / newlines
 * trigger automatic escaping or template-literal fall-back.
 */

const RE_VALID_KEY = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const RESERVED = new Set([
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
  'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false',
  'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new',
  'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try',
  'typeof', 'var', 'void', 'while', 'with', 'yield',
]);

/**
 * A pre-rendered TS expression. Wrap a literal source fragment with this so
 * downstream emitters know to splice it in verbatim instead of re-quoting it.
 */
export interface RawExpr {
  readonly __raw: true;
  readonly source: string;
}

/** Wrap a string as a {@link RawExpr}. */
export function raw(source: string): RawExpr {
  return { __raw: true, source };
}

export function isRaw(v: unknown): v is RawExpr {
  return typeof v === 'object' && v !== null && (v as { __raw?: unknown }).__raw === true;
}

/** Quote a JavaScript string literal. Picks single quotes unless the string
 *  contains one (then double); newlines escape. */
export function strLit(value: string): string {
  if (value.includes('\n') || value.length > 200) {
    // Use a template literal for multi-line strings; escape backticks and ${.
    const escaped = value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    return '`' + escaped + '`';
  }
  if (!value.includes("'")) {
    return "'" + value.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
  }
  return '"' + value.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

/** Render any JSON-ish value as TypeScript. Strings → string literals; objects
 *  → multi-line object literals; arrays → multi-line. {@link RawExpr} values
 *  pass through verbatim. */
export function expr(value: unknown, indent = 0): string {
  if (isRaw(value)) return value.source;
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return strLit(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const inner = ' '.repeat(indent + 2);
    const close = ' '.repeat(indent);
    const items = value.map((v) => inner + expr(v, indent + 2));
    return '[\n' + items.join(',\n') + ',\n' + close + ']';
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== undefined,
    );
    if (entries.length === 0) return '{}';
    const inner = ' '.repeat(indent + 2);
    const close = ' '.repeat(indent);
    const lines = entries.map(([k, v]) => inner + objKey(k) + ': ' + expr(v, indent + 2));
    return '{\n' + lines.join(',\n') + ',\n' + close + '}';
  }
  // Fallback (rare): bigint, symbol, function. Best-effort stringify.
  return String(value);
}

/** Quote an object key when it isn't a valid identifier or is a reserved word. */
export function objKey(key: string): string {
  return RE_VALID_KEY.test(key) && !RESERVED.has(key) ? key : strLit(key);
}

/** Indent every line of a block by `n` spaces. Empty lines are left empty. */
export function indentBlock(s: string, n: number): string {
  const pad = ' '.repeat(n);
  return s
    .split('\n')
    .map((line) => (line.length === 0 ? line : pad + line))
    .join('\n');
}

/**
 * One step in a fluent chain: a method name plus already-rendered argument
 * expressions. Use {@link arrow} to construct a configurator-style argument
 * (`s => s.job(...)`).
 */
export interface ChainCall {
  method: string;
  args: string[];
}

/** Render a fluent chain: `<receiver>\n  .method(args)\n  .method(args)…`. */
export function chain(receiver: string, calls: ChainCall[]): string {
  if (calls.length === 0) return receiver;
  const out: string[] = [receiver];
  for (const c of calls) {
    out.push('  .' + c.method + '(' + c.args.join(', ') + ')');
  }
  return out.join('\n');
}

/**
 * Render an arrow function whose body is a fluent chain on the parameter.
 *
 * Used to build configurator callbacks:
 *
 * ```text
 * (s) => s
 *   .displayName('Build')
 *   .job('compile', j => j…)
 * ```
 */
export function arrow(param: string, calls: ChainCall[]): string {
  if (calls.length === 0) return `(${param}) => ${param}`;
  const lines: string[] = [`(${param}) => ${param}`];
  for (const c of calls) {
    lines.push('  .' + c.method + '(' + c.args.join(', ') + ')');
  }
  return lines.join('\n');
}

/** A Set-like accumulator for grouping imports per module. */
export class ImportCollector {
  private readonly named = new Map<string, Set<string>>();
  private readonly types = new Map<string, Set<string>>();

  /** Add a value-import. */
  add(module: string, name: string): void {
    let bucket = this.named.get(module);
    if (!bucket) {
      bucket = new Set();
      this.named.set(module, bucket);
    }
    bucket.add(name);
  }

  /** Add a type-only import. */
  addType(module: string, name: string): void {
    let bucket = this.types.get(module);
    if (!bucket) {
      bucket = new Set();
      this.types.set(module, bucket);
    }
    bucket.add(name);
  }

  /** Render the import block. Modules are sorted; named imports are sorted
   *  per module. Returns '' when nothing was added. */
  render(): string {
    const lines: string[] = [];
    const modules = new Set([...this.named.keys(), ...this.types.keys()]);
    const sortedModules = [...modules].sort();
    for (const module of sortedModules) {
      const named = this.named.get(module);
      const types = this.types.get(module);
      if (named && named.size > 0) {
        const list = [...named].sort().join(', ');
        lines.push(`import { ${list} } from '${module}';`);
      }
      if (types && types.size > 0) {
        const list = [...types].sort().join(', ');
        lines.push(`import type { ${list} } from '${module}';`);
      }
    }
    return lines.join('\n');
  }
}
