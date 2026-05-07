/**
 * Predefined-variable rewriter.
 *
 * Walks `PreDef` once at module load to build a lookup from the raw `$(Name)`
 * macro string Azure substitutes at runtime to the dotted access path on
 * `PreDef`. The {@link rewriteString} entry point uses that table to:
 *
 * - turn pure-token strings (`$(Build.SourceBranch)`) into the bare reference
 *   (`PreDef.Pipeline.Build.SourceBranch`), and
 * - turn mixed strings (`'release-$(Build.BuildNumber)'`) into template
 *   literals stitched together with the same references.
 *
 * Unknown `$(...)` tokens pass through untouched as part of the surrounding
 * string literal — no false positives.
 */

import { PreDef } from '@mauvezero/azpipe-utils';
import { isRaw, raw, type RawExpr, strLit } from './printer.js';

interface PredefEntry {
  /** TS access path, e.g. `'PreDef.Pipeline.Build.SourceBranch'`. */
  path: string;
  /** The namespace this came from — used by import collection. */
  ns: 'Pipeline' | 'Release' | 'Shared';
}

interface NamespaceMap {
  pipeline: ReadonlyMap<string, PredefEntry>;
  release: ReadonlyMap<string, PredefEntry>;
  shared: ReadonlyMap<string, PredefEntry>;
}

const TOKENS: NamespaceMap = (() => {
  /** Return true when `s` is a valid JS identifier (no dot-access needed). */
  function isIdent(s: string): boolean {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(s);
  }

  /** Build a dotted/bracket access path from an array of property-name parts.
   *  Parts that are not valid identifiers (e.g. contain a dot like
   *  "Repository.Name") are rendered with bracket notation so the generated
   *  expression compiles correctly. */
  function partsToPath(parts: string[]): string {
    return 'PreDef' + parts
      .map((p) => (isIdent(p) ? '.' + p : '["' + p + '"]'))
      .join('');
  }

  function walk(root: unknown, top: string, ns: PredefEntry['ns']): Map<string, PredefEntry> {
    const m = new Map<string, PredefEntry>();
    function rec(obj: unknown, parts: string[]): void {
      if (typeof obj === 'string') {
        m.set(obj, { path: partsToPath(parts), ns });
        return;
      }
      if (typeof obj !== 'object' || obj === null) return;
      for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
        if (typeof v === 'function') continue;
        rec(v, [...parts, k]);
      }
    }
    rec(root, [top]);
    return m;
  }
  return {
    pipeline: walk(PreDef.Pipeline, 'Pipeline', 'Pipeline'),
    release: walk(PreDef.Release, 'Release', 'Release'),
    shared: walk(PreDef.Shared, 'Shared', 'Shared'),
  };
})();

/** Whether to prefer the build-context (`PreDef.Pipeline.*`) or release-context
 *  (`PreDef.Release.*`) when a token is defined in both. `Shared.*` always
 *  wins over either when a token is present there. */
export type PredefContext = 'pipeline' | 'release';

function lookupToken(token: string, ctx: PredefContext): PredefEntry | undefined {
  // Shared takes priority — same meaning in both contexts means we always
  // prefer the unambiguous symbol.
  const shared = TOKENS.shared.get(token);
  if (shared) return shared;
  if (ctx === 'pipeline') {
    return TOKENS.pipeline.get(token) ?? TOKENS.release.get(token);
  }
  return TOKENS.release.get(token) ?? TOKENS.pipeline.get(token);
}

const TOKEN_RE = /\$\(([^)]+)\)/g;

/**
 * The result of rewriting a single string. Either a {@link RawExpr} (when the
 * string contained at least one known token) or `undefined` (when no tokens
 * matched and the caller should keep the original string literal).
 *
 * `usedNamespaces` lists the `PreDef.*` top-level branches the result
 * references — the caller must add `PreDef` from `@mauvezero/azpipe-utils`
 * to its import block when this is non-empty.
 */
export interface RewriteResult {
  expr: RawExpr;
  usedNamespaces: Set<'Pipeline' | 'Release' | 'Shared'>;
}

/**
 * Rewrite a string that may contain `$(...)` tokens. Returns `undefined` if
 * the string is plain (no rewrites needed) so the caller can keep emitting a
 * regular string literal.
 *
 * - `'$(Build.SourceBranch)'` → `PreDef.Pipeline.Build.SourceBranch` (in
 *   pipeline context) or `PreDef.Release.Build.SourceBranch` (release context)
 * - `'release-$(Build.BuildNumber)'` → template literal
 * - `'no-tokens'` → `undefined`
 * - `'$(Unknown.Var)'` → `undefined` (unknown tokens preserved as literal)
 */
export function rewriteString(value: string, ctx: PredefContext = 'pipeline'): RewriteResult | undefined {
  // Quick reject: no `$(` means nothing to do.
  if (!value.includes('$(')) return undefined;
  const matches = [...value.matchAll(TOKEN_RE)];
  if (matches.length === 0) return undefined;

  const used = new Set<'Pipeline' | 'Release' | 'Shared'>();
  // Pre-scan: do any of the tokens match? If none, leave the string alone so
  // we don't generate a template literal for what's effectively raw text.
  let anyKnown = false;
  for (const m of matches) {
    if (lookupToken(m[0], ctx)) {
      anyKnown = true;
      break;
    }
  }
  if (!anyKnown) return undefined;

  // Single-token, whole-string match: `$(Build.SourceBranch)` → bare reference.
  if (matches.length === 1) {
    const m = matches[0]!;
    const entry = lookupToken(m[0], ctx);
    if (entry && m[0] === value) {
      used.add(entry.ns);
      return { expr: raw(entry.path), usedNamespaces: used };
    }
  }

  // Mixed string: build a template literal with `${...}` for known tokens and
  // raw text (escaped) for everything else.
  let cursor = 0;
  let out = '';
  for (const m of matches) {
    const start = m.index ?? 0;
    const end = start + m[0].length;
    if (start > cursor) {
      out += escapeTemplateRaw(value.slice(cursor, start));
    }
    const entry = lookupToken(m[0], ctx);
    if (entry) {
      used.add(entry.ns);
      out += '${' + entry.path + '}';
    } else {
      // Unknown token — keep as literal text inside the template.
      out += escapeTemplateRaw(m[0]);
    }
    cursor = end;
  }
  if (cursor < value.length) out += escapeTemplateRaw(value.slice(cursor));
  if (used.size === 0) return undefined;
  return { expr: raw('`' + out + '`'), usedNamespaces: used };
}

function escapeTemplateRaw(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

/**
 * Walk a JS value and replace any nested string with its rewritten expression
 * when {@link rewriteString} matches. Returns a fresh tree alongside the set
 * of `PreDef.*` namespaces referenced.
 *
 * `ctx` selects the preferred namespace when a token exists in both Pipeline
 * and Release. Defaults to `'pipeline'` since the YAML emitter is the more
 * common caller; the release emitter passes `'release'` explicitly.
 */
export function rewriteTree<T>(
  root: T,
  ctx: PredefContext = 'pipeline',
): { value: T; usedNamespaces: Set<'Pipeline' | 'Release' | 'Shared'> } {
  const used = new Set<'Pipeline' | 'Release' | 'Shared'>();
  function walk(v: unknown): unknown {
    if (isRaw(v)) return v;
    if (typeof v === 'string') {
      const r = rewriteString(v, ctx);
      if (r) {
        for (const ns of r.usedNamespaces) used.add(ns);
        return r.expr;
      }
      return v;
    }
    if (Array.isArray(v)) return v.map(walk);
    if (typeof v === 'object' && v !== null) {
      const out: Record<string, unknown> = {};
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        out[k] = walk(val);
      }
      return out;
    }
    return v;
  }
  return { value: walk(root) as T, usedNamespaces: used };
}

/** Render a (possibly already-rewritten) string-or-RawExpr value. */
export function renderStringOrExpr(value: string | RawExpr): string {
  if (isRaw(value)) return value.source;
  return strLit(value);
}
