/**
 * Action-ref → typed factory lookup for `@mauvezero/ghactions-actions`.
 *
 * Mirrors the pattern used by `../codegen/tasks.ts` for Azure Pipelines tasks.
 *
 * The naming convention for generated action factories is:
 *   `owner/repo@vN` → normalize to `owner-repo-vN` → camelCase → `ownerRepoVN`
 *
 * Because GitHub Action owner names are case-sensitive (e.g. `EndBug` vs
 * `endbug`) and the generator preserves the original casing, we first try an
 * exact camelCase derivation from the ref, then fall back to a case-insensitive
 * search over the actual module exports.
 */

import * as actionsMod from '@mauvezero/ghactions-actions';

/** All function-valued exports from `@mauvezero/ghactions-actions`. */
const allFactories: Set<string> = new Set(
  Object.keys(actionsMod).filter(
    (k) => typeof (actionsMod as Record<string, unknown>)[k] === 'function',
  ),
);

/** Lowercase→actual-name map for case-insensitive fallback lookup. */
const lowerToFactory: Map<string, string> = new Map(
  [...allFactories].map((name) => [name.toLowerCase(), name]),
);

/**
 * Convert an action ref (`owner/repo@vN`) to the expected camelCase factory name.
 *
 * Uses the same rules as the codegen script: replace `/` and `@` with `-`,
 * split on `-`, then join as camelCase.
 */
function deriveFactoryName(ref: string): string {
  const normalized = ref.replace('/', '-').replace('@', '-');
  const parts = normalized.split('-').filter(Boolean);
  if (parts.length === 0) return '';
  const [head, ...tail] = parts as [string, ...string[]];
  return (
    head.toLowerCase() +
    tail
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join('')
  );
}

export interface ActionMatch {
  /** The action ref as provided (e.g. `'actions/checkout@v6'`). */
  ref: string;
  /** The factory function name (e.g. `'actionsCheckoutV6'`). */
  factory: string;
}

/**
 * Look up the typed factory for a `'owner/repo@vN'`-style action reference.
 *
 * Returns `undefined` when the action is not in the catalog, so callers can
 * fall back to a generic `uses()` call.
 */
export function findActionFactory(ref: string): ActionMatch | undefined {
  const candidate = deriveFactoryName(ref);

  // Exact match (most common path)
  if (allFactories.has(candidate)) return { ref, factory: candidate };

  // Case-insensitive fallback — handles owner casing differences like EndBug vs endbug
  const actual = lowerToFactory.get(candidate.toLowerCase());
  if (actual !== undefined) return { ref, factory: actual };

  return undefined;
}
