/* eslint-disable */
// Auto-generated from UseDotNetV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface UseDotNetV2Inputs {
  /**
   * Package to install
   *
   * Please select whether to install only runtime or SDK.
   *
   * - `runtime` — Runtime
   * - `sdk` — SDK (contains runtime)
   *
   * @default sdk
   */
  "packageType"?: "runtime" | "sdk";
  /**
   * Use global json
   *
   * Select this option to install all SDKs from global.json files. These files are searched from
   * system.DefaultWorkingDirectory. You can change the search root path by setting working
   * directory input.
   *
   * @default false
   *
   * Only meaningful when: `packageType = sdk`
   */
  "useGlobalJson"?: boolean;
  /**
   * Working Directory
   *
   * Specify path from where global.json files should be searched when using `Use global json`.
   * If empty, `system.DefaultWorkingDirectory` will be considered as the root path.
   *
   * Only meaningful when: `useGlobalJson = true`
   */
  "workingDirectory"?: string;
  /**
   * Version
   *
   * Specify version of .NET Core SDK or runtime to install.<br/>Versions can be given in the
   * following formats<li>2.x => Install latest in major version.</li><li>2.2.x => Install latest
   * in major and minor version</li><li>2.2.104 => Install exact version</li><br/>Find the value
   * of `version` for installing SDK/Runtime, from the releases.json. The link to releases.json
   * of that major.minor version can be found in [**releases-index
   * file.**](https://builds.dotnet.microsoft.com/dotnet/release-metadata/releases-index.json).
   * Like link to releases.json for 2.2 version is
   * https://builds.dotnet.microsoft.com/dotnet/release-metadata/2.2/releases.json
   *
   * Only meaningful when: `useGlobalJson = false || packageType = runtime`
   */
  "version"?: string;
  /**
   * Compatible Visual Studio version
   *
   * Specify version of compatible visual studio for which .NET core sdk to install. Specifiy
   * complete vs-version like 16.6.4 containing major version, minor version and patch
   * number.Find the value of `version` for installing SDK/Runtime, from the releases.json. The
   * link to releases.json of that major.minor version can be found in [**releases-index
   * file.**](https://builds.dotnet.microsoft.com/dotnet/release-metadata/releases-index.json)
   *
   * In group: advanced
   */
  "vsVersion"?: string;
  /**
   * Check for existing installation
   *
   * Select if you want to detect if the specified version is already installed before attempting
   * to download. Use only when installationPath is Empty i.e. set to default value
   *
   * @default false
   *
   * In group: advanced
   */
  "checkForExistingVersion"?: boolean;
  /**
   * Include Preview Versions
   *
   * Select if you want preview versions to be included while searching for latest versions, such
   * as while searching 2.2.x. This setting is ignored if you specify an exact version, such as:
   * 3.0.100-preview3-010431
   *
   * @default false
   *
   * Only meaningful when: `useGlobalJson = false || packageType = runtime`
   */
  "includePreviewVersions"?: boolean;
  /**
   * Path To Install .Net Core
   *
   * Specify where .Net Core SDK/Runtime should be installed. Different paths can have the
   * following impact on .Net's behavior.<li>$(Agent.ToolsDirectory): This makes the version to
   * be cached on the agent since this directory is not cleanup up across pipelines. All
   * pipelines running on the agent, would have access to the versions installed previously using
   * the agent.</li><li>$(Agent.TempDirectory): This can ensure that a pipeline doesn't use any
   * cached version of .Net core since this folder is cleaned up after each pipeline.</li><li>Any
   * other path: You can configure any other path given the agent process has access to the path.
   * This will change the state of the machine and impact all processes running on it.<br/>Note
   * that you can also configure Multi-Level Lookup setting which can configure .Net host's
   * probing for a suitable version.
   *
   * @default $(Agent.ToolsDirectory)/dotnet
   *
   * In group: advanced
   */
  "installationPath"?: string;
  /**
   * Perform Multi Level Lookup
   *
   * This input is only applicable to Windows based agents. This configures the behavior of .Net
   * host process for looking up a suitable shared framework.<li>unchecked: Only versions present
   * in the folder specified in this task would be looked by the host process.</li><li>checked:
   * The host will attempt to look in pre-defined global locations using multi-level
   * lookup.<br/>The default global locations are: <br/><b>For Windows:</b><br/>C:\Program
   * Files\dotnet (64-bit processes)<br/>C:\Program Files (x86)\dotnet (32-bit process)</li> You
   * can read more about it
   * [**HERE**](https://github.com/dotnet/core-setup/blob/master/Documentation/design-docs/multilevel-sharedfx-lookup.md).<br/>
   *
   * @default false
   *
   * In group: advanced
   */
  "performMultiLevelLookup"?: boolean;
  /**
   * Set timeout for package download request
   *
   * Provide a timeout value for HTTP requests that the task makes to obtain the .NET package.
   * The value is in milliseconds. Default is 300000 milliseconds (5 minutes). Cannot be more
   * than 600000 milliseconds (10 minutes).
   *
   * @default 300000
   */
  "requestTimeout"?: number;
}

/**
 * Use .NET Core
 *
 * Acquires a specific version of the .NET Core SDK from the internet or the local cache and
 * adds it to the PATH. Use this task to change the version of .NET Core used in subsequent
 * tasks. Additionally provides proxy support.
 *
 * [Learn more about this task](https://aka.ms/AA4xgy0)
 *
 * @see https://aka.ms/AA4xgy0
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/UseDotNetV2
 */
export function useDotNetV2(
  inputs: UseDotNetV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("UseDotNet@2", inputs as unknown as Record<string, unknown>, opts);
}
