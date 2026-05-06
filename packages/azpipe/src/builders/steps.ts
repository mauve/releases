import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
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
 * Prefer the typed helpers in `@mauvezero/azpipe-tasks` (`azureCLIV2`,
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

/**
 * Infer the `file://` URL of the direct caller of `include()` by parsing the
 * V8 error stack. Handles two frame formats emitted by Node.js / vitest:
 *   - `file:///abs/path/to/file.ts:line:col`  (node_modules, vitest runner)
 *   - `/abs/path/to/file.ts:line:col`          (user code in some environments)
 */
function callerFileUrl(): string {
  const thisPath = fileURLToPath(import.meta.url);
  for (const line of (new Error().stack ?? '').split('\n')) {
    // Match a file:// URL or an absolute filesystem path within the frame.
    const raw = /(file:\/\/[^\s)]+|\/[^\s)]+)/.exec(line)?.[1];
    if (!raw) continue;
    // Strip trailing :line:col suffix then normalise to an absolute path.
    const stripped = raw.replace(/:\d+:\d+$/, '');
    let filePath: string;
    try {
      filePath = stripped.startsWith('file://') ? fileURLToPath(stripped) : stripped;
    } catch {
      continue;
    }
    if (!filePath.startsWith('/')) continue; // skip node:internal, vm://, etc.
    if (filePath === thisPath) continue; // our own file
    if (filePath.includes('/node_modules/')) continue; // framework/runner frames
    return pathToFileURL(filePath).href;
  }
  // Fallback: treat the path as relative to the current working directory.
  return pathToFileURL(process.cwd() + '/').href;
}

/**
 * Read a script file and return its contents as a string.
 *
 * Intended for use in generated pipeline/release TypeScript files to reference
 * external script files instead of embedding large inline scripts. The path is
 * resolved relative to the **calling file's directory**, matching the behaviour
 * of a local `import`.
 *
 * @param relativePath - Path to the script file, relative to `baseUrl`.
 * @param baseUrl - The calling module's `import.meta.url`. When omitted,
 *   the caller's file URL is inferred from the call stack automatically.
 *   Passing `import.meta.url` explicitly is more robust and avoids any
 *   reliance on stack parsing; it is the recommended style for generated files.
 * @returns The file contents as a UTF-8 string.
 *
 * @example
 * ```ts
 * import { bash, include } from '@mauvezero/azpipe';
 *
 * // Explicit (recommended — generated files always use this form):
 * job.step(bash(include('./scripts/build.sh', import.meta.url)));
 *
 * // Implicit — caller inferred from call stack:
 * job.step(bash(include('./scripts/build.sh')));
 * ```
 */
export function include(relativePath: string, baseUrl?: string): string {
  return readFileSync(fileURLToPath(new URL(relativePath, baseUrl ?? callerFileUrl())), 'utf8');
}
