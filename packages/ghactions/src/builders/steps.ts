import type { AnyStep, RunStep, UsesStep, StepCommon } from '../types.js';

/**
 * Step factory functions for GitHub Actions workflows. Each returns a plain
 * step object that can be passed to `.step(...)` or `.steps([...])` on a
 * {@link "GHJobBuilder"}.
 */

/**
 * Construct a {@link RunStep} (shell command step).
 *
 * @param script - Shell command(s) to execute. May be multi-line.
 * @param opts - Optional step-level fields.
 * @returns A {@link RunStep} object.
 *
 * @example
 * ```ts
 * job.step(run('npm test', { name: 'Run tests', shell: 'bash' }));
 * ```
 *
 * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsrun
 */
export function run(
  script: string,
  opts: Omit<RunStep, 'run'> = {},
): RunStep {
  return { run: script, ...opts };
}

/**
 * Construct a {@link UsesStep} (action reference step).
 *
 * @param action - Action reference in `owner/repo@ref` form, or a local path
 *   starting with `./`.
 * @param opts - Optional step-level fields including `with` inputs.
 * @returns A {@link UsesStep} object.
 *
 * @example
 * ```ts
 * job.step(uses('actions/checkout@v4'));
 * job.step(uses('actions/setup-node@v4', { with: { 'node-version': '20' } }));
 * ```
 *
 * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsuses
 */
export function uses(
  action: string,
  opts: Omit<UsesStep, 'uses'> = {},
): UsesStep {
  return { uses: action, ...opts };
}

export type { AnyStep, RunStep, UsesStep, StepCommon };
