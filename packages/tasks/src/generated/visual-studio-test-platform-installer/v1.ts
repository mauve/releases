/* eslint-disable */
// Auto-generated from VsTestPlatformToolInstallerV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface VisualStudioTestPlatformInstallerV1Inputs {
  /**
   * Package Feed
   *
   * Specify the feed from which the Visual Studio Test Platform nuget packge should be fetched.
   *
   * - `nugetOrg` — Official Nuget
   * - `customFeed` — Custom Feed
   * - `netShare` — Network path
   *
   * @default nugetOrg
   *
   * In group: packageSettings
   */
  "packageFeedSelector": "nugetOrg" | "customFeed" | "netShare";
  /**
   * Version
   *
   * Pick whether to install the latest version or a specific version of the Visual Studio Test
   * Platform. <br>If you use the test platform installer to run Coded UI tests, ensure that the
   * version you choose matches the major version of Visual Studio with which the test binaries
   * were built. For e.g., if the Coded UI test project was built using Visual Studio 2017
   * (version 15.x), you must use test platform version 15.x.
   *
   * - `latestPreRelease` — Latest (Includes Pre-Release)
   * - `latestStable` — Latest Stable
   * - `specificVersion` — Specific Version
   *
   * @default latestPreRelease
   *
   * Only meaningful when: `packageFeedSelector = nugetOrg || packageFeedSelector = customFeed`
   *
   * In group: packageSettings
   */
  "versionSelector"?: "latestPreRelease" | "latestStable" | "specificVersion";
  /**
   * Test Platform Version
   *
   * Specify the version of Visual Studio Test Platform to install on the agent. Available
   * versions can be viewed on <a
   * href="https://www.nuget.org/packages/Microsoft.TestPlatform/">nuget</a>.
   *
   * Only meaningful when: `versionSelector = specificVersion`
   *
   * In group: packageSettings
   */
  "testPlatformVersion"?: string;
  /**
   * Package Source
   *
   * Fetch the testplatform package from the specified package feed. Can be a public or a private
   * feed.
   *
   * Only meaningful when: `packageFeedSelector = customFeed`
   *
   * In group: packageSettings
   */
  "customFeed"?: string;
  /**
   * User Name
   *
   * User name for authenticating against the specified feed. If providing a PAT token as
   * password, username is optional.
   *
   * Only meaningful when: `packageFeedSelector = customFeed`
   *
   * In group: packageSettings
   */
  "username"?: string;
  /**
   * Password
   *
   * Password or personal access token for authenticating against the specified feed.
   *
   * Only meaningful when: `packageFeedSelector = customFeed`
   *
   * In group: packageSettings
   */
  "password"?: string;
  /**
   * UNC Path
   *
   * Specify the full UNC path to the microsoft.testplatform nupkg file.
   *
   * Only meaningful when: `packageFeedSelector = netShare`
   *
   * In group: packageSettings
   */
  "netShare"?: string;
}

/**
 * Visual Studio test platform installer
 *
 * Acquire the test platform from nuget.org or the tool cache. Satisfies the ‘vstest’ demand
 * and can be used for running tests and collecting diagnostic data using the Visual Studio
 * Test task.
 *
 * [Test platform package on NuGet](https://www.nuget.org/packages/Microsoft.TestPlatform/)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/tool/vstest-platform-tool-installer
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/VsTestPlatformToolInstallerV1
 */
export function visualStudioTestPlatformInstallerV1(
  inputs: VisualStudioTestPlatformInstallerV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("VisualStudioTestPlatformInstaller@1", inputs as unknown as Record<string, unknown>, opts);
}
