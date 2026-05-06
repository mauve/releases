import type { UsesStep } from '@mauvezero/ghactions';

/** Step-level options for a GitHub Actions action step (everything except `uses` and `with`). */
export type ActionStepOptions = Omit<UsesStep, 'uses' | 'with'>;

/**
 * Internal helper used by every generated action function. Folds the typed
 * inputs and outer step options into a single {@link UsesStep}. Drops the
 * `with:` block when no inputs are provided so the emitted YAML stays clean.
 */
export function makeAction(
  uses: string,
  inputs: Record<string, string | boolean | number | undefined>,
  opts: ActionStepOptions = {},
): UsesStep {
  // Strip keys whose value is undefined — those were not passed by the caller.
  const entries = Object.entries(inputs ?? {}).filter(([, v]) => v !== undefined) as [
    string,
    string | boolean | number,
  ][];
  const withBlock: Record<string, string | boolean | number> = Object.fromEntries(entries);
  return entries.length > 0
    ? { uses, ...opts, with: withBlock }
    : { uses, ...opts };
}
