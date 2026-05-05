import type { DiffNode } from './engine.js';

/**
 * Format a diff result as a unified, human-readable text block. Output is
 * stable: nodes are sorted by path, then by kind (`remove` < `change` < `add`).
 *
 * @param nodes - Result of {@link "diff"}.
 * @param opts.color - Wrap +/- markers in ANSI colors. Default: false.
 * @param opts.maxValueLines - Truncate long value blocks. Default: 12.
 */
export function unified(
  nodes: DiffNode[],
  opts: { color?: boolean; maxValueLines?: number } = {},
): string {
  const sorted = [...nodes].sort((a, b) => {
    const pcmp = a.path.localeCompare(b.path);
    if (pcmp !== 0) return pcmp;
    return kindOrder(a.kind) - kindOrder(b.kind);
  });
  const maxLines = opts.maxValueLines ?? 12;

  const out: string[] = [];
  for (const node of sorted) {
    out.push(`@ ${node.path}`);
    if (node.kind === 'add') {
      pushLines(out, '+', formatValue(node.after, maxLines), opts.color);
    } else if (node.kind === 'remove') {
      pushLines(out, '-', formatValue(node.before, maxLines), opts.color);
    } else {
      pushLines(out, '-', formatValue(node.before, maxLines), opts.color);
      pushLines(out, '+', formatValue(node.after, maxLines), opts.color);
    }
    out.push('');
  }
  return out.join('\n');
}

function kindOrder(k: DiffNode['kind']): number {
  return k === 'remove' ? 0 : k === 'change' ? 1 : 2;
}

const ANSI = { red: '\x1b[31m', green: '\x1b[32m', reset: '\x1b[0m' };

function pushLines(out: string[], marker: '+' | '-', text: string, color: boolean | undefined): void {
  const colorize = (line: string): string => {
    if (!color) return line;
    const c = marker === '+' ? ANSI.green : ANSI.red;
    return `${c}${line}${ANSI.reset}`;
  };
  for (const line of text.split('\n')) out.push(colorize(`${marker} ${line}`));
}

function formatValue(v: unknown, maxLines: number): string {
  if (v === undefined) return '(undefined)';
  let text: string;
  if (typeof v === 'string') text = JSON.stringify(v);
  else if (typeof v === 'number' || typeof v === 'boolean' || v === null) text = String(v);
  else text = JSON.stringify(v, null, 2);
  const lines = text.split('\n');
  if (lines.length <= maxLines) return text;
  return [...lines.slice(0, maxLines), `... (${lines.length - maxLines} more lines)`].join('\n');
}

/**
 * RFC 6902 JSON Patch operation. Used by {@link jsonPatch}.
 */
export interface JsonPatchOp {
  op: 'add' | 'remove' | 'replace';
  /** RFC 6901 JSON Pointer (e.g. `/stages/0/jobs/1/steps/0/script`). */
  path: string;
  value?: unknown;
}

/**
 * Convert a diff result to a list of RFC 6902 JSON Patch operations.
 *
 * The output is best-effort — paths that involve identity-keyed array elements
 * (e.g. `$.stages[Build]`) are converted to JSON Pointer using `/stages/Build`,
 * which is not strictly RFC-compliant but matches how Azure DevOps and most
 * REST clients address keyed collections.
 */
export function jsonPatch(nodes: DiffNode[]): JsonPatchOp[] {
  return nodes.map((n) => {
    const pointer = pathToPointer(n.path);
    if (n.kind === 'add') return { op: 'add', path: pointer, value: n.after };
    if (n.kind === 'remove') return { op: 'remove', path: pointer };
    return { op: 'replace', path: pointer, value: n.after };
  });
}

function pathToPointer(jsonPath: string): string {
  // Strip leading `$.`; convert `.foo` and `[bar]` segments into `/foo` / `/bar`.
  let p = jsonPath;
  if (p.startsWith('$.')) p = p.slice(2);
  else if (p === '$') return '';
  const segments: string[] = [];
  const re = /([^.[\]]+)|\[([^\]]+)\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(p))) {
    const seg = m[1] ?? m[2] ?? '';
    segments.push(seg.replace(/~/g, '~0').replace(/\//g, '~1'));
  }
  return '/' + segments.join('/');
}
