/* eslint-disable */
// Auto-generated from NuGetCommandV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { ExternalNuGetFeedConnection } from '../connections.js';

export interface NuGetCommandV2Inputs {
  /**
   * Command
   *
   * The NuGet command to run. Select 'Custom' to add arguments or to use a different command.
   *
   * - `restore` — restore
   * - `pack` — pack
   * - `push` — push
   * - `custom` — custom
   *
   * @default restore
   */
  "command"?: "restore" | "pack" | "push" | "custom";
  /**
   * Path to solution, packages.config, or project.json
   *
   * The path to the solution, packages.config, or project.json file that references the packages
   * to be restored.
   *
   * @default **​/*.sln
   *
   * Only meaningful when: `command = restore`
   */
  "solution"?: string;
  /**
   * Feeds to use
   *
   * You can either select a feed from Azure Artifacts and/or NuGet.org here, or commit a
   * nuget.config file to your source code repository and set its path here.
   *
   * - `select` — Feed(s) I select here
   * - `config` — Feeds in my NuGet.config
   *
   * @default select
   *
   * In group: restoreAuth
   */
  "selectOrConfig"?: "select" | "config";
  /**
   * Use packages from this Azure Artifacts/TFS feed. Select from the dropdown or enter [project
   * name/]feed name.
   *
   * Include the selected feed in the generated NuGet.config. You must have Azure Artifacts
   * installed and licensed to select a feed here.
   *
   * Only meaningful when: `selectOrConfig = select`
   *
   * In group: restoreAuth
   */
  "feedRestore"?: string;
  /**
   * Use packages from NuGet.org
   *
   * Include NuGet.org in the generated NuGet.config.
   *
   * @default true
   *
   * Only meaningful when: `selectOrConfig = select`
   *
   * In group: restoreAuth
   */
  "includeNuGetOrg"?: boolean;
  /**
   * Path to NuGet.config
   *
   * The NuGet.config in your repository that specifies the feeds from which to restore packages.
   *
   * Only meaningful when: `selectOrConfig = config`
   *
   * In group: restoreAuth
   */
  "nugetConfigPath"?: string;
  /**
   * Credentials for feeds outside this organization/collection
   *
   * Credentials to use for external registries located in the selected NuGet.config. For feeds
   * in this organization/collection, leave this blank; the build’s credentials are used
   * automatically.
   *
   * Only meaningful when: `selectOrConfig = config`
   *
   * In group: restoreAuth
   */
  "externalEndpoints"?: ExternalNuGetFeedConnection;
  /**
   * Disable local cache
   *
   * Prevents NuGet from using packages from local machine caches.
   *
   * @default false
   *
   * In group: restoreAdvanced
   */
  "noCache"?: boolean;
  /**
   * Disable parallel processing
   *
   * Prevents NuGet from installing multiple packages in parallel.
   *
   * @default false
   *
   * In group: restoreAdvanced
   */
  "disableParallelProcessing"?: boolean;
  /**
   * Destination directory
   *
   * Specifies the folder in which packages are installed. If no folder is specified, packages
   * are restored into a packages/ folder alongside the selected solution, packages.config, or
   * project.json.
   *
   * In group: restoreAdvanced
   */
  "packagesDirectory"?: string;
  /**
   * Verbosity
   *
   * Specifies the amount of detail displayed in the output.
   *
   * - `Quiet` — Quiet
   * - `Normal` — Normal
   * - `Detailed` — Detailed
   *
   * @default Detailed
   *
   * In group: restoreAdvanced
   */
  "verbosityRestore"?: "Quiet" | "Normal" | "Detailed";
  /**
   * Path to NuGet package(s) to publish
   *
   * The pattern to match or path to nupkg files to be uploaded. Multiple patterns can be
   * separated by a semicolon.
   *
   * @default
   * $(Build.ArtifactStagingDirectory)/**​/*.nupkg;!$(Build.ArtifactStagingDirectory)/**​/*.symbols.nupkg
   *
   * Only meaningful when: `command = push`
   */
  "searchPatternPush"?: string;
  /**
   * Target feed location
   *
   * - `internal` — This organization/collection
   * - `external` — External NuGet server (including other accounts/collections)
   *
   * @default internal
   *
   * Only meaningful when: `command = push`
   */
  "nuGetFeedType"?: "internal" | "external";
  /**
   * Target feed
   *
   * Select a feed hosted in this account. You must have Azure Artifacts installed and licensed
   * to select a feed here.
   *
   * Only meaningful when: `command = push && nuGetFeedType = internal`
   */
  "feedPublish"?: string;
  /**
   * Publish pipeline metadata
   *
   * Associate this build/release pipeline’s metadata (run #, source code information) with the
   * package
   *
   * @default true
   *
   * Only meaningful when: `command = push && nuGetFeedType = internal`
   *
   * In group: pushAdvanced
   */
  "publishPackageMetadata"?: boolean;
  /**
   * Allow duplicates to be skipped
   *
   * If you continually publish a set of packages and only change the version number of the
   * subset of packages that changed, use this option. It allows the task to report success even
   * if some of your packages are rejected with 409 Conflict errors.
   *
   * This option is currently only available on Azure Pipelines and using Windows agents. If
   * NuGet.exe encounters a conflict, the task will fail. This option will not work and publish
   * will fail if you are within a proxy environment.
   *
   * @default false
   *
   * Only meaningful when: `command = push && nuGetFeedType = internal`
   */
  "allowPackageConflicts"?: boolean;
  /**
   * NuGet server
   *
   * The NuGet service connection that contains the external NuGet server’s credentials.
   *
   * Only meaningful when: `command = push && nuGetFeedType = external`
   */
  "externalEndpoint"?: ExternalNuGetFeedConnection;
  /**
   * Verbosity
   *
   * Specifies the amount of detail displayed in the output.
   *
   * - `Quiet` — Quiet
   * - `Normal` — Normal
   * - `Detailed` — Detailed
   *
   * @default Detailed
   *
   * In group: pushAdvanced
   */
  "verbosityPush"?: "Quiet" | "Normal" | "Detailed";
  /**
   * Path to csproj or nuspec file(s) to pack
   *
   * Pattern to search for csproj directories to pack.
   *
   * You can separate multiple patterns with a semicolon, and you can make a pattern negative by
   * prefixing it with '!'. Example: `**\*.csproj;!**\*.Tests.csproj`
   *
   * @default **​/*.csproj
   *
   * Only meaningful when: `command = pack`
   */
  "searchPatternPack"?: string;
  /**
   * Configuration to package
   *
   * When using a csproj file this specifies the configuration to package
   *
   * @default $(BuildConfiguration)
   *
   * Only meaningful when: `command = pack`
   */
  "configurationToPack"?: string;
  /**
   * Package folder
   *
   * Folder where packages will be created. If empty, packages will be created at the source
   * root.
   *
   * @default $(Build.ArtifactStagingDirectory)
   *
   * Only meaningful when: `command = pack`
   */
  "outputDir"?: string;
  /**
   * Automatic package versioning
   *
   * Cannot be used with include referenced projects. If you choose 'Use the date and time', this
   * will generate a [SemVer](http://semver.org/spec/v1.0.0.html)-compliant version formatted as
   * `X.Y.Z-ci-datetime` where you choose X, Y, and Z.
   *
   * If you choose 'Use an environment variable', you must select an environment variable and
   * ensure it contains the version number you want to use.
   *
   * If you choose 'Use the build number', this will use the build number to version your
   * package. **Note:** Under Options set the build number format to be
   * '[$(BuildDefinitionName)_$(Year:yyyy).$(Month).$(DayOfMonth)$(Rev:.r)](https://go.microsoft.com/fwlink/?LinkID=627416)'.
   *
   * - `off` — Off
   * - `byPrereleaseNumber` — Use the date and time
   * - `byEnvVar` — Use an environment variable
   * - `byBuildNumber` — Use the build number
   *
   * @default off
   *
   * In group: packOptions
   */
  "versioningScheme": "off" | "byPrereleaseNumber" | "byEnvVar" | "byBuildNumber";
  /**
   * Include referenced projects
   *
   * Include referenced projects either as dependencies or as part of the package. Cannot be used
   * with automatic package versioning. If a referenced project has a corresponding nuspec file
   * that has the same name as the project, then that referenced project is added as a
   * dependency. Otherwise, the referenced project is added as part of the package. [Learn
   * more](https://docs.microsoft.com/en-us/nuget/tools/cli-ref-pack).
   *
   * @default false
   *
   * Only meaningful when: `versioningScheme = off`
   *
   * In group: packOptions
   */
  "includeReferencedProjects"?: boolean;
  /**
   * Environment variable
   *
   * Enter the variable name without $, $env, or %.
   *
   * Only meaningful when: `versioningScheme = byEnvVar`
   *
   * In group: packOptions
   */
  "versionEnvVar"?: string;
  /**
   * Major
   *
   * The 'X' in version [X.Y.Z](http://semver.org/spec/v1.0.0.html)
   *
   * @default 1
   *
   * Only meaningful when: `versioningScheme = byPrereleaseNumber`
   *
   * In group: packOptions
   */
  "requestedMajorVersion"?: string;
  /**
   * Minor
   *
   * The 'Y' in version [X.Y.Z](http://semver.org/spec/v1.0.0.html)
   *
   * @default 0
   *
   * Only meaningful when: `versioningScheme = byPrereleaseNumber`
   *
   * In group: packOptions
   */
  "requestedMinorVersion"?: string;
  /**
   * Patch
   *
   * The 'Z' in version [X.Y.Z](http://semver.org/spec/v1.0.0.html)
   *
   * @default 0
   *
   * Only meaningful when: `versioningScheme = byPrereleaseNumber`
   *
   * In group: packOptions
   */
  "requestedPatchVersion"?: string;
  /**
   * Time zone
   *
   * Specifies the desired time zone used to produce the version of the package. Selecting UTC is
   * recommended if you're using hosted build agents as their date and time might differ.
   *
   * - `utc` — UTC
   * - `local` — Agent local time
   *
   * @default utc
   *
   * Only meaningful when: `versioningScheme = byPrereleaseNumber`
   *
   * In group: packOptions
   */
  "packTimezone"?: "utc" | "local";
  /**
   * Create symbols package
   *
   * Specifies that the package contains sources and symbols. When used with a .nuspec file, this
   * creates a regular NuGet package file and the corresponding symbols package.
   *
   * @default false
   *
   * In group: packOptions
   */
  "includeSymbols"?: boolean;
  /**
   * Tool Package
   *
   * Determines if the output files of the project should be in the tool folder.
   *
   * @default false
   *
   * In group: packOptions
   */
  "toolPackage"?: boolean;
  /**
   * Additional build properties
   *
   * Specifies a list of token=value pairs, separated by semicolons, where each occurrence of
   * $token$ in the .nuspec file will be replaced with the given value. Values can be strings in
   * quotation marks.
   *
   * In group: packAdvanced
   */
  "buildProperties"?: string;
  /**
   * Base path
   *
   * The base path of the files defined in the nuspec file.
   *
   * In group: packAdvanced
   */
  "basePath"?: string;
  /**
   * Verbosity
   *
   * Specifies the amount of detail displayed in the output.
   *
   * - `Quiet` — Quiet
   * - `Normal` — Normal
   * - `Detailed` — Detailed
   *
   * @default Detailed
   *
   * In group: packAdvanced
   */
  "verbosityPack"?: "Quiet" | "Normal" | "Detailed";
  /**
   * Command and arguments
   *
   * The command and arguments which will be passed to NuGet.exe for execution. If NuGet 3.5 or
   * later is used, authenticated commands like list, restore, and publish against any feed in
   * this organization/collection that the Project Collection Build Service has access to will be
   * automatically authenticated.
   *
   * Only meaningful when: `command = custom`
   */
  "arguments"?: string;
}

/**
 * NuGet
 *
 * Restore, pack, or push NuGet packages, or run a NuGet command. Supports NuGet.org and
 * authenticated feeds like Azure Artifacts and MyGet. Uses NuGet.exe and works with .NET
 * Framework apps. For .NET Core and .NET Standard apps, use the .NET Core task.
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613747) or [see the
 * NuGet documentation](https://docs.microsoft.com/nuget/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/package/nuget
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/NuGetCommandV2
 */
export function nuGetCommandV2(
  inputs: NuGetCommandV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("NuGetCommand@2", inputs as unknown as Record<string, unknown>, opts);
}
