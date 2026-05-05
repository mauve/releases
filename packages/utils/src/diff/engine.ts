/**
 * Identity-aware deep diff for JSON-shaped values.
 *
 * Plain structural diffs treat every array as ordered, so reshuffling or
 * inserting an element produces a cascade of misleading changes. The Azure
 * Pipelines and Releases shapes have many object-arrays whose elements are
 * keyed by a stable field (`stage`, `job`, `id`, `rank`, `alias`). When that
 * field is known, we can pair elements by identity and report only the real
 * attribute changes.
 *
 * Callers supply a small {@link ShapeDescriptor} mapping JSONPath globs to
 * identity keys. Built-in descriptors live in `./descriptors.ts`.
 */

/** A function that returns a stable string identity for an array element. */
export type IdentityKey = string | ((node: unknown) => string);

/** Map from JSONPath glob (e.g. `'$.stages[*]'`) to identity key. */
export type ShapeDescriptor = Record<string, IdentityKey>;

export interface DiffOptions {
  /** Identity keys for object-arrays. Default: pure structural diff. */
  descriptor?: ShapeDescriptor;
  /** JSONPath globs whose subtree should be ignored entirely. */
  ignorePaths?: string[];
}

export type DiffKind = 'add' | 'remove' | 'change';

export interface DiffNode {
  /** JSONPath of the difference (e.g. `'$.stages[Build].jobs[compile]'`). */
  path: string;
  kind: DiffKind;
  /** Value on the "before" side. Undefined for `add`. */
  before?: unknown;
  /** Value on the "after" side. Undefined for `remove`. */
  after?: unknown;
}

const ROOT = '$';

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const ak = Object.keys(a);
    const bk = Object.keys(b);
    if (ak.length !== bk.length) return false;
    return ak.every((k) => deepEqual(a[k], b[k]));
  }
  return false;
}

/**
 * Match a JSONPath glob against a concrete path. Globs use `[*]` as an
 * array-element wildcard; concrete paths use `[<id>]` (the resolved identity)
 * or `[<index>]` (when no identity is configured).
 *
 * `'$.stages[*]'` matches `'$.stages[Build]'` and `'$.stages[0]'`.
 */
export function matchGlob(glob: string, path: string): boolean {
  const re = new RegExp(
    '^' + glob.replace(/[.+?^${}()|]/g, '\\$&').replace(/\[\*\]/g, '\\[[^\\]]*\\]') + '$',
  );
  return re.test(path);
}

function shouldIgnore(path: string, ignorePaths: string[] | undefined): boolean {
  if (!ignorePaths || ignorePaths.length === 0) return false;
  return ignorePaths.some((g) => matchGlob(g, path) || path.startsWith(g + '.') || path.startsWith(g + '['));
}

function lookupIdentity(
  arrayPath: string,
  descriptor: ShapeDescriptor | undefined,
): IdentityKey | undefined {
  if (!descriptor) return undefined;
  for (const [glob, key] of Object.entries(descriptor)) {
    // Descriptor keys identify the *element* of the array, e.g. `$.stages[*]`.
    if (matchGlob(glob, arrayPath)) return key;
  }
  return undefined;
}

function identityOf(elem: unknown, key: IdentityKey, fallbackIndex: number): string {
  if (typeof key === 'function') {
    try {
      const v = key(elem);
      if (typeof v === 'string' && v.length > 0) return v;
    } catch {
      // fall through
    }
    return `#${fallbackIndex}`;
  }
  if (isPlainObject(elem) && typeof elem[key] === 'string') return elem[key] as string;
  if (isPlainObject(elem) && typeof elem[key] === 'number') return String(elem[key]);
  return `#${fallbackIndex}`;
}

function joinPath(parent: string, segment: string | number, kind: 'index' | 'key' | 'id' = 'key'): string {
  if (kind === 'key') return parent === ROOT ? `$.${segment}` : `${parent}.${segment}`;
  return `${parent}[${segment}]`;
}

/**
 * Compute the diff. The result is a flat list of {@link DiffNode}; renderers
 * in `./render.ts` turn it into unified text or JSON Patch.
 */
export function diff(before: unknown, after: unknown, opts: DiffOptions = {}): DiffNode[] {
  const out: DiffNode[] = [];
  walk(before, after, ROOT, opts, out);
  return out;
}

function walk(
  before: unknown,
  after: unknown,
  path: string,
  opts: DiffOptions,
  out: DiffNode[],
): void {
  if (shouldIgnore(path, opts.ignorePaths)) return;

  if (deepEqual(before, after)) return;

  const beforeUndef = before === undefined;
  const afterUndef = after === undefined;
  if (beforeUndef && !afterUndef) {
    out.push({ path, kind: 'add', after });
    return;
  }
  if (!beforeUndef && afterUndef) {
    out.push({ path, kind: 'remove', before });
    return;
  }

  if (Array.isArray(before) && Array.isArray(after)) {
    walkArray(before, after, path, opts, out);
    return;
  }

  if (isPlainObject(before) && isPlainObject(after)) {
    walkObject(before, after, path, opts, out);
    return;
  }

  // Type mismatch or scalar difference.
  out.push({ path, kind: 'change', before, after });
}

function walkObject(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
  path: string,
  opts: DiffOptions,
  out: DiffNode[],
): void {
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  for (const k of [...keys].sort()) {
    walk(before[k], after[k], joinPath(path, k, 'key'), opts, out);
  }
}

function walkArray(
  before: unknown[],
  after: unknown[],
  path: string,
  opts: DiffOptions,
  out: DiffNode[],
): void {
  const idKey = lookupIdentity(path + '[*]', opts.descriptor);
  if (idKey === undefined) {
    // No identity configured — index-based diff.
    const max = Math.max(before.length, after.length);
    for (let i = 0; i < max; i++) {
      walk(before[i], after[i], joinPath(path, i, 'index'), opts, out);
    }
    return;
  }

  const beforeMap = new Map<string, unknown>();
  before.forEach((el, i) => beforeMap.set(identityOf(el, idKey, i), el));
  const afterMap = new Map<string, unknown>();
  after.forEach((el, i) => afterMap.set(identityOf(el, idKey, i), el));

  const allIds = new Set([...beforeMap.keys(), ...afterMap.keys()]);
  for (const id of [...allIds].sort()) {
    walk(beforeMap.get(id), afterMap.get(id), joinPath(path, id, 'id'), opts, out);
  }
}
