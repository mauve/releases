/* eslint-disable */
// Auto-generated from UsePythonVersionV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface UsePythonVersionV0Inputs {
  /**
   * Version spec
   *
   * Version range or exact version of a Python version to use, using semver's version range
   * syntax. [More information](https://go.microsoft.com/fwlink/?LinkID=2006180)
   *
   * @default 3.x
   */
  "versionSpec": string;
  /**
   * Disable downloading releases from the GitHub registry
   *
   * Whether to disable downloading missing python version from the [Github Actions
   * registry](https://github.com/actions/python-versions). Check this if you only want to use
   * local pre-installed python.
   *
   * @default false
   */
  "disableDownloadFromRegistry"?: boolean;
  /**
   * Allow downloading unstable releases
   *
   * Allow downloading unstable python versions from [Github Actions python versions
   * registry](https://github.com/actions/python-versions).
   *
   * @default false
   *
   * Only meaningful when: `disableDownloadFromRegistry = false`
   */
  "allowUnstable"?: boolean;
  /**
   * GitHub token for GitHub Actions python registry
   *
   * GitHub token is needed to prevent anonymous requests limit to the [Github Actions python
   * versions registry](https://github.com/actions/python-versions). Leaving this empty may cause
   * download failures. Not needed if you only use locally installed python.
   *
   * Only meaningful when: `disableDownloadFromRegistry = false`
   */
  "githubToken"?: string;
  /**
   * Add to PATH
   *
   * Whether to prepend the retrieved Python version to the PATH environment variable to make it
   * available in subsequent tasks or scripts without using the output variable.
   *
   * @default true
   */
  "addToPath": boolean;
  /**
   * Architecture
   *
   * The target architecture (x86, x64, arm64) of the Python interpreter.
   *
   * - `x86` — x86
   * - `x64` — x64
   * - `arm64` — arm64
   *
   * @default x64
   *
   * In group: advanced
   */
  "architecture": "x86" | "x64" | "arm64";
}

/**
 * Use Python version
 *
 * Use the specified version of Python from the tool cache, optionally adding it to the PATH
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=871498) or [see the
 * Python documentation](https://www.python.org/doc/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/tool/use-python-version
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/UsePythonVersionV0
 */
export function usePythonVersionV0(
  inputs: UsePythonVersionV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("UsePythonVersion@0", inputs as unknown as Record<string, unknown>, opts);
}
