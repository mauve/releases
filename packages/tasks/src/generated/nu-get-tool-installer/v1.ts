/* eslint-disable */
// Auto-generated from NuGetToolInstallerV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface NuGetToolInstallerV1Inputs {
  /**
   * Version of NuGet.exe to install
   *
   * A version or version range that specifies the NuGet version to make available on the path.
   * Use x as a wildcard. See the [list of available NuGet
   * versions](http://dist.nuget.org/tools.json).
   *
   * If you want to match a pre-release version, the specification must contain a major, minor,
   * patch, and pre-release version from the list above.
   *
   * Examples: 4.x, 3.3.x, 2.8.6, >=4.0.0-0
   *
   * If unspecified, a version will be chosen automatically.
   *
   * In group: advanced
   */
  "versionSpec"?: string;
  /**
   * Always check for new versions
   *
   * Always check for and download the latest available version of NuGet.exe which satisfies the
   * version spec.
   *
   * Enabling this option could cause unexpected build breaks when a new version of NuGet is
   * released.
   *
   * @default false
   *
   * In group: advanced
   */
  "checkLatest"?: boolean;
}

/**
 * NuGet tool installer
 *
 * Acquires a specific version of NuGet from the internet or the tools cache and adds it to the
 * PATH. Use this task to change the version of NuGet used in the NuGet tasks.
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=852538) or [see the
 * NuGet documentation](https://docs.microsoft.com/nuget/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/tool/nuget
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/NuGetToolInstallerV1
 */
export function nuGetToolInstallerV1(
  inputs: NuGetToolInstallerV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("NuGetToolInstaller@1", inputs as unknown as Record<string, unknown>, opts);
}
