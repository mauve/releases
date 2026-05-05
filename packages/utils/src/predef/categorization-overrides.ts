/**
 * Hand-pinned categorization for predefined variables.
 *
 * The codegen rule (see `scripts/categorize.ts`) places each variable into
 * `Pipeline`, `Release`, `Shared`, or duplicates it across `Pipeline` and
 * `Release` based on which MS Learn page lists it and whether the
 * descriptions match. When that heuristic gets it wrong, add an override
 * here. Reviewed during every `pnpm sync-vars` run.
 *
 * Rationale notes encouraged — they're searchable when the override surprises
 * a reviewer later.
 */

export type Category = 'Pipeline' | 'Release' | 'Shared' | 'Duplicate';

export interface Override {
  /** Variable name as MS spells it (e.g. `'System.AccessToken'`). */
  name: string;
  /** Force this variable into the given category. */
  category: Category;
  /** One-line note explaining the override. */
  reason: string;
}

export const overrides: readonly Override[] = [
  {
    name: 'System.AccessToken',
    category: 'Shared',
    reason:
      'The OAuth token has identical semantics in both build and release contexts; the docs mention it on each page but the meaning does not vary.',
  },
  {
    name: 'Agent.OS',
    category: 'Shared',
    reason: 'Agent OS string is host-level metadata, identical across contexts.',
  },
  {
    name: 'Agent.OSArchitecture',
    category: 'Shared',
    reason: 'Same as Agent.OS — host-level metadata.',
  },
  {
    name: 'Agent.MachineName',
    category: 'Shared',
    reason: 'Host-level metadata.',
  },
  {
    name: 'Agent.Version',
    category: 'Shared',
    reason: 'Agent binary version — identical across contexts.',
  },
  {
    name: 'TF_BUILD',
    category: 'Shared',
    reason: 'Universally-set "we are inside a pipeline run" sentinel.',
  },
];

/** Map for fast lookup. */
export const overrideMap: ReadonlyMap<string, Override> = new Map(
  overrides.map((o) => [o.name, o]),
);
