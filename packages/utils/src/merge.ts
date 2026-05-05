import type { AnyStage, BranchFilter, CITrigger, CITriggerInput, Variable } from '@mauvezero/azpipe';

function uniq(xs: string[]): string[] {
  return [...new Set(xs)];
}

function mergeBranchFilter(a?: BranchFilter, b?: BranchFilter): BranchFilter | undefined {
  if (!a && !b) return undefined;
  const include = uniq([...(a?.include ?? []), ...(b?.include ?? [])]);
  const exclude = uniq([...(a?.exclude ?? []), ...(b?.exclude ?? [])]);
  const out: BranchFilter = {};
  if (include.length > 0) out.include = include;
  if (exclude.length > 0) out.exclude = exclude;
  return out;
}

function normalizeTrigger(t: CITriggerInput | undefined): CITrigger | 'none' | undefined {
  if (t === undefined) return undefined;
  if (t === 'none') return 'none';
  if (Array.isArray(t)) return { branches: { include: t } };
  return t;
}

/** Merge two CI triggers. `'none'` on either side wins (disables the trigger). */
export function mergeTriggers(
  a: CITriggerInput | undefined,
  b: CITriggerInput | undefined,
): CITriggerInput | undefined {
  const na = normalizeTrigger(a);
  const nb = normalizeTrigger(b);
  if (na === 'none' || nb === 'none') return 'none';
  if (!na) return b;
  if (!nb) return a;
  const out: CITrigger = {};
  const branches = mergeBranchFilter(na.branches, nb.branches);
  if (branches) out.branches = branches;
  const paths = mergeBranchFilter(na.paths, nb.paths);
  if (paths) out.paths = paths;
  const tags = mergeBranchFilter(na.tags, nb.tags);
  if (tags) out.tags = tags;
  if (na.batch !== undefined) out.batch = na.batch;
  if (nb.batch !== undefined) out.batch = nb.batch;
  return out;
}

/** Concatenate variable lists, with later entries overriding earlier ones by name. */
export function mergeVariables(...lists: (Variable[] | undefined)[]): Variable[] {
  const named = new Map<string, Variable>();
  const groupsAndTemplates: Variable[] = [];
  for (const list of lists) {
    if (!list) continue;
    for (const v of list) {
      if ('name' in v) named.set(v.name, v);
      else groupsAndTemplates.push(v);
    }
  }
  return [...groupsAndTemplates, ...named.values()];
}

/** Concatenate stage lists. Stages with the same `stage` name are deduplicated
 *  (later entries replace earlier ones). Template refs are appended in order. */
export function composeStages(...lists: (AnyStage[] | undefined)[]): AnyStage[] {
  const byName = new Map<string, AnyStage>();
  const refs: AnyStage[] = [];
  for (const list of lists) {
    if (!list) continue;
    for (const s of list) {
      if ('stage' in s) byName.set(s.stage, s);
      else refs.push(s);
    }
  }
  return [...byName.values(), ...refs];
}
