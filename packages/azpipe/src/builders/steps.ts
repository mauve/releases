import type {
  BashStep,
  CheckoutStep,
  DownloadStep,
  PowerShellStep,
  PublishStep,
  PwshStep,
  ScriptStep,
  Step,
  StepTemplateRef,
  TaskStep,
} from '../types.js';

/**
 * Step factory functions. Each returns a plain step object that can be passed
 * to `.step(...)` or `.steps([...])` on a {@link "JobBuilder"}, or used in any
 * `Step[]` array.
 *
 * These factories are thin constructors — they exist for ergonomics and
 * type-safety, not for runtime logic.
 */

/**
 * Construct a {@link ScriptStep} (cross-platform inline script).
 *
 * @param script - Script body (may be multi-line).
 * @param opts - Optional step-level fields (displayName, env, condition, ...).
 * @returns A {@link ScriptStep} object.
 *
 * @example
 * ```ts
 * job.step(script('npm test', { displayName: 'Run tests' }));
 * ```
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-script
 */
export function script(script: string, opts: Omit<ScriptStep, 'script'> = {}): ScriptStep {
  return { script, ...opts };
}

/**
 * Construct a {@link BashStep} (Bash script step).
 *
 * @param bash - Bash script body.
 * @param opts - Optional step-level fields.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-bash
 */
export function bash(bash: string, opts: Omit<BashStep, 'bash'> = {}): BashStep {
  return { bash, ...opts };
}

/**
 * Construct a {@link PwshStep} (PowerShell Core, cross-platform).
 *
 * @param pwsh - Script body.
 * @param opts - Optional step-level fields.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-pwsh
 */
export function pwsh(pwsh: string, opts: Omit<PwshStep, 'pwsh'> = {}): PwshStep {
  return { pwsh, ...opts };
}

/**
 * Construct a {@link PowerShellStep} (Windows PowerShell, Windows-only).
 *
 * @param powershell - Script body.
 * @param opts - Optional step-level fields.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-powershell
 */
export function powershell(
  powershell: string,
  opts: Omit<PowerShellStep, 'powershell'> = {},
): PowerShellStep {
  return { powershell, ...opts };
}

/**
 * Construct a {@link CheckoutStep} (source-checkout step).
 *
 * @param ref - `'self'` for the triggering repo, `'none'` to skip the implicit
 *   checkout, or the alias of a {@link "RepositoryResource"}.
 * @param opts - Checkout options (clean, fetchDepth, lfs, submodules, ...).
 *
 * @example
 * ```ts
 * job.step(checkout('self', { fetchDepth: 1, lfs: true }));
 * ```
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-checkout
 */
export function checkout(
  ref: 'self' | 'none' | string,
  opts: Omit<CheckoutStep, 'checkout'> = {},
): CheckoutStep {
  return { checkout: ref, ...opts };
}

/**
 * Construct a {@link DownloadStep} (pipeline-artifact download).
 *
 * @param source - `'current'` to download artifacts from the running pipeline,
 *   `'none'` to disable the implicit download, or the alias of a
 *   {@link "PipelineResource"}.
 * @param opts - Download options (artifact name, glob patterns).
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-download
 */
export function download(
  source: 'current' | 'none' | string,
  opts: Omit<DownloadStep, 'download'> = {},
): DownloadStep {
  return { download: source, ...opts };
}

/**
 * Construct a {@link PublishStep} (pipeline-artifact publish).
 *
 * @param path - Path on the agent to publish.
 * @param opts - Publish options (artifact name, condition, ...).
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-publish
 */
export function publish(path: string, opts: Omit<PublishStep, 'publish'> = {}): PublishStep {
  return { publish: path, ...opts };
}

/**
 * Construct a {@link TaskStep} (marketplace-task invocation).
 *
 * Prefer the typed helpers in `@mauve/azpipe-tasks` (`azureCLIV2`,
 * `useNodeV1`, ...) over this factory — they enforce per-task input shapes at
 * compile time and copy documentation from the upstream task definitions.
 * Use `task()` only for tasks the typed helpers don't cover (custom or
 * preview tasks).
 *
 * @param name - Task identifier in `Name@Major` form.
 * @param opts - Task options including the `inputs` map.
 *
 * @example
 * ```ts
 * job.step(task('NodeTool@0', { inputs: { versionSpec: '20.x' } }));
 * ```
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-task
 */
export function task(name: string, opts: Omit<TaskStep, 'task'> = {}): TaskStep {
  return { task: name, ...opts };
}

/**
 * Construct a {@link StepTemplateRef} (reference to a step template).
 *
 * @param templatePath - Template file path, optionally with `@repository`
 *   suffix to reference a template from a {@link "RepositoryResource"}.
 * @param parameters - Parameter values to pass to the template.
 *
 * @example
 * ```ts
 * job.step(stepTemplate('templates/install.yml', { node: '20.x' }));
 * ```
 */
export function stepTemplate(
  templatePath: string,
  parameters?: Record<string, unknown>,
): StepTemplateRef {
  return parameters === undefined
    ? { template: templatePath }
    : { template: templatePath, parameters };
}

export type { Step };
