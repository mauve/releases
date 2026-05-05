/**
 * Parse Microsoft's `azure-devops-docs` predefined-variables pages from
 * raw GitHub-flavored markdown into a list of variable records.
 *
 * The pages have ::: moniker range="..."  blocks for different versions —
 * we keep only the latest moniker (Azure DevOps Services / `azure-devops`)
 * since older Azure DevOps Server versions are out of scope here.
 *
 * Tables come in 2-/3-column shape:
 *   | Variable | Description | Available in templates? |
 *   |----------|-------------|-------------------------|
 *   | **`Build.SourceBranch`** | The branch the build was queued for. | Yes |
 *
 * The variable name in column 1 may be:
 *   - `**Build.SourceBranch**`
 *   - `**`Build.SourceBranch`**`
 *   - `**Build.SourceBranch** <a name="anchor"></a>`
 * We strip backticks, anchors, and surrounding `**`.
 */

export interface ParsedVariable {
  /** Canonical dotted name, e.g. `'Build.SourceBranch'`. */
  name: string;
  /** Plain-prose description (markdown preserved; backticks normalized). */
  description: string;
  /** True if the docs explicitly list "Available in templates? Yes". */
  availableInTemplates?: boolean;
  /** Source page tag (informational). */
  source?: 'pipeline' | 'release';
}

const LATEST_MONIKER = 'azure-devops';

/**
 * Strip MS Learn `::: moniker range="..."` blocks that aren't the latest.
 * Each block is delimited by `::: moniker range="..."` open and `::: moniker-end` close.
 * Nested blocks are unusual; we handle the flat case which covers the docs we target.
 */
export function keepLatestMoniker(md: string, latest = LATEST_MONIKER): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let skip = false;
  for (const line of lines) {
    const open = /^:::\s*moniker\s+range="([^"]+)"\s*$/.exec(line);
    if (open) {
      const range = open[1] ?? '';
      // Keep the block iff the range expression mentions the latest moniker.
      // Common spellings: `>= azure-devops-2019`, `= azure-devops`, `azure-devops`.
      // Any range that includes `azure-devops` (and doesn't restrict to older
      // server-only e.g. `< azure-devops`) is treated as "current".
      const mentionsLatest = range.includes(latest);
      const excludesLatest = /^\s*<\s*[A-Za-z0-9-]+/.test(range) && !range.includes('=');
      skip = !mentionsLatest || excludesLatest;
      continue;
    }
    if (/^:::\s*moniker-end\s*$/.test(line)) {
      skip = false;
      continue;
    }
    if (!skip) out.push(line);
  }
  return out.join('\n');
}

/**
 * Strip `**`, backticks, and anchor tags from a cell. Preserves the inner
 * variable name as-is.
 */
function cleanVarName(cell: string): string {
  let s = cell.trim();
  // Drop trailing anchors like `<a name="..."></a>`.
  s = s.replace(/<a\s+name="[^"]*"\s*>\s*<\/a>/gi, '').trim();
  // Strip surrounding bold markers (one or two pairs).
  s = s.replace(/^\*\*+|\*\*+$/g, '').trim();
  // Strip enclosing backticks.
  s = s.replace(/^`|`$/g, '').trim();
  // The cell may also be wrapped: `**`Foo`**` → already handled above.
  return s;
}

function cleanDescription(cell: string): string {
  let s = cell.trim();
  // Replace `<br>` and `<br/>` with newlines for cleaner TSDoc.
  s = s.replace(/<br\s*\/?>/gi, '\n');
  // Drop anchor tags.
  s = s.replace(/<a\s+name="[^"]*"\s*>\s*<\/a>/gi, '');
  return s.trim();
}

/** Normalize a description for fuzzy equivalence checks across pages. */
export function normalizeDescription(s: string): string {
  return s
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold → text
    .replace(/\*([^*]+)\*/g, '$1') // italic → text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // markdown links → link text
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Parse a single GFM table starting at `lines[start]` (the header row). Returns
 * the parsed rows and the index of the first line *after* the table. Handles
 * `| col | col |` separator on the second line.
 */
function parseTableAt(
  lines: string[],
  start: number,
): { rows: string[][]; end: number } | null {
  const header = lines[start];
  if (!header || !/^\s*\|/.test(header)) return null;
  const sep = lines[start + 1];
  if (!sep || !/^\s*\|?\s*[:\-\s|]+$/.test(sep)) return null;
  const rows: string[][] = [];
  let i = start + 2;
  while (i < lines.length) {
    const line = lines[i]!;
    if (!/^\s*\|/.test(line)) break;
    if (line.trim() === '') break;
    const cells = splitRow(line);
    rows.push(cells);
    i++;
  }
  return { rows, end: i };
}

function splitRow(line: string): string[] {
  // Drop the leading and trailing pipes, then split on un-escaped pipes.
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|\s*$/, '');
  // Keep escaped \| as a literal pipe in the cell.
  const cells: string[] = [];
  let cur = '';
  for (let i = 0; i < trimmed.length; i++) {
    const c = trimmed[i];
    if (c === '\\' && trimmed[i + 1] === '|') {
      cur += '|';
      i++;
      continue;
    }
    if (c === '|') {
      cells.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  cells.push(cur);
  return cells.map((c) => c.trim());
}

/**
 * Parse the variables out of an MS Learn predef-variables markdown page.
 *
 * Returns every row in every 2- or 3-column table whose first cell looks like
 * a dotted variable name (or the special-case `TF_BUILD`). Tables in other
 * shapes are skipped.
 */
export function parseVariablesPage(
  md: string,
  source: 'pipeline' | 'release',
): ParsedVariable[] {
  const filtered = keepLatestMoniker(md);
  const lines = filtered.split('\n');
  const out: ParsedVariable[] = [];
  let i = 0;
  while (i < lines.length) {
    const table = parseTableAt(lines, i);
    if (!table) {
      i++;
      continue;
    }
    for (const row of table.rows) {
      if (row.length < 2) continue;
      const rawName = cleanVarName(row[0] ?? '');
      const description = cleanDescription(row[1] ?? '');
      if (!isVariableName(rawName) || description.length === 0) continue;
      const v: ParsedVariable = { name: rawName, description, source };
      if (row.length >= 3) {
        const t = row[2]?.trim().toLowerCase();
        v.availableInTemplates = t === 'yes' || t === 'true';
      }
      out.push(v);
    }
    i = table.end;
  }
  // De-duplicate by name (some tables repeat). Keep the longest description
  // (often the more complete entry).
  const dedup = new Map<string, ParsedVariable>();
  for (const v of out) {
    const cur = dedup.get(v.name);
    if (!cur || cur.description.length < v.description.length) dedup.set(v.name, v);
  }
  return [...dedup.values()];
}

function isVariableName(s: string): boolean {
  if (s === 'TF_BUILD') return true;
  // Dotted identifier: at least one `.`, only word chars and dots.
  return /^[A-Za-z][A-Za-z0-9_]*(\.[A-Za-z][A-Za-z0-9_]*)+$/.test(s);
}
