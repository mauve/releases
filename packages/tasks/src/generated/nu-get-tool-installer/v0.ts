/* eslint-disable */
// Auto-generated from NuGetToolInstallerV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface NuGetToolInstallerV0Inputs {
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
   */
  "versionSpec"?: string;
  /**
   * Always download the latest matching version
   *
   * Always check for and download the latest available version of NuGet.exe which satisfies the
   * version spec. This option will also always incur download time, even if the selected version
   * of NuGet is already cached.
   *
   * Enabling this option could cause unexpected build breaks when a new version of NuGet is
   * released.
   *
   * @default false
   */
  "checkLatest"?: boolean;
}

/**
 * NuGet tool installer
 *
 * Acquires a specific version of NuGet from the internet or the tools cache and adds it to the
 * PATH. Use this task to change the version of NuGet used in the NuGet tasks.
 *
 * [More Information](https://go.microsoft.com/fwlink/?linkid=852538)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/package/prev-versions/nuget-installer-0
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/NuGetToolInstallerV0
 */
export function nuGetToolInstallerV0(
  inputs: NuGetToolInstallerV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("NuGetToolInstaller@0", inputs as unknown as Record<string, unknown>, opts);
}
