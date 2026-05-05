/* eslint-disable */
// Auto-generated from DotNetCoreCLIV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection, ExternalNuGetFeedConnection } from '../connections.js';

export interface DotNetCoreCLIV2Inputs {
  /**
   * Azure Resource Manager connection
   *
   * Select an Azure Resource Manager service connection
   */
  "ConnectedServiceName"?: AzureRMConnection;
  /**
   * Command
   *
   * The dotnet command to run. Select 'Custom' to add arguments or use a command not listed
   * here.
   *
   * - `build` — build
   * - `push` — nuget push
   * - `pack` — pack
   * - `publish` — publish
   * - `restore` — restore
   * - `run` — run
   * - `test` — test
   * - `custom` — custom
   *
   * @default build
   */
  "command": "build" | "push" | "pack" | "publish" | "restore" | "run" | "test" | "custom";
  /**
   * Publish web projects
   *
   * If true, the task will try to find the web projects in the repository and run the publish
   * command on them. Web projects are identified by presence of either a web.config file or
   * wwwroot folder in the directory.
   *
   * @default true
   *
   * Only meaningful when: `command = publish`
   */
  "publishWebProjects"?: boolean;
  /**
   * Path to project(s) or solution(s)
   *
   * The path to the csproj or sln file(s) to use. You can use wildcards (e.g. **​/*.csproj for
   * all .csproj files in all subfolders). **This field follows glob pattern, and is run against
   * root of the repository at all times irrespective of Working Directory.**
   *
   * Only meaningful when: `command = build || command = restore || command = run || command =
   * test || command = custom || publishWebProjects = false`
   */
  "projects"?: string;
  /**
   * Custom command
   *
   * The command to pass to dotnet.exe for execution.
   *
   * Only meaningful when: `command = custom`
   */
  "custom"?: string;
  /**
   * Arguments
   *
   * Arguments to the selected command. For example, build configuration, output folder, runtime.
   * The arguments depend on the command selected.
   *
   * Only meaningful when: `command = build || command = publish || command = run || command =
   * test || command = custom`
   */
  "arguments"?: string;
  /**
   * Arguments
   *
   * Write the additional arguments to be passed to **restore** command.
   *
   * Only meaningful when: `command = restore`
   */
  "restoreArguments"?: string;
  /**
   * Publish test results and code coverage
   *
   * Enabling this option will generate a test results TRX file in `$(Agent.TempDirectory)` and
   * results will be published to the server. <br>This option appends `--logger trx
   * --results-directory $(Agent.TempDirectory)` to the command line arguments. <br><br>Code
   * coverage can be collected by adding `--collect "Code coverage"` option to the command line
   * arguments. This is currently only available on the Windows platform.
   *
   * @default true
   *
   * Only meaningful when: `command = test`
   */
  "publishTestResults"?: boolean;
  /**
   * Test run title
   *
   * Provide a name for the test run.
   *
   * Only meaningful when: `command = test`
   */
  "testRunTitle"?: string;
  /**
   * Zip published projects
   *
   * If true, folder created by the publish command will be zipped.
   *
   * @default true
   *
   * Only meaningful when: `command = publish`
   */
  "zipAfterPublish"?: boolean;
  /**
   * Add project's folder name to publish path
   *
   * If true, folders created by the publish command will have project's folder name prefixed to
   * their folder names when output path is specified explicitly in arguments. This is useful if
   * you want to publish multiple projects to the same folder.
   *
   * @default true
   *
   * Only meaningful when: `command = publish`
   */
  "modifyOutputPath"?: boolean;
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
   * Use packages from this Azure Artifacts feed. Select from the dropdown or enter [project
   * name/]feed name.
   *
   * Include the selected feed in the generated NuGet.config.
   *
   * Format:
   * * For organization-scoped feeds: `FeedName`
   * * For project-scoped feeds: `ProjectName/FeedName`
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
   * Destination directory
   *
   * Specifies the folder in which packages are installed. If no folder is specified, packages
   * are restored into the default NuGet package cache.
   *
   * In group: restoreAdvanced
   */
  "packagesDirectory"?: string;
  /**
   * Verbosity
   *
   * Specifies the amount of detail displayed in the output.
   *
   * - `-` — -
   * - `Quiet` — Quiet
   * - `Minimal` — Minimal
   * - `Normal` — Normal
   * - `Detailed` — Detailed
   * - `Diagnostic` — Diagnostic
   *
   * @default Normal
   *
   * In group: restoreAdvanced
   */
  "verbosityRestore"?: "-" | "Quiet" | "Minimal" | "Normal" | "Detailed" | "Diagnostic";
  /**
   * Path to NuGet package(s) to publish
   *
   * The pattern to match or path to nupkg files to be uploaded. Multiple patterns can be
   * separated by a semicolon.
   *
   * @default $(Build.ArtifactStagingDirectory)/*.nupkg
   *
   * Only meaningful when: `command = push`
   */
  "searchPatternPush"?: string;
  /**
   * Target feed location
   *
   * - `internal` — This organization/collection
   * - `external` — External NuGet server (including other organizations/collections)
   *
   * @default internal
   *
   * Only meaningful when: `command = push`
   */
  "nuGetFeedType"?: "internal" | "external";
  /**
   * Target feed
   *
   * Select a feed hosted in this organization. You must have Azure Artifacts installed and
   * licensed to select a feed here.
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
   * NuGet server
   *
   * The NuGet service connection that contains the external NuGet server’s credentials.
   *
   * Only meaningful when: `command = push && nuGetFeedType = external`
   */
  "externalEndpoint"?: ExternalNuGetFeedConnection;
  /**
   * Path to csproj or nuspec file(s) to pack
   *
   * Pattern to search for csproj or nuspec files to pack.
   *
   * You can separate multiple patterns with a semicolon, and you can make a pattern negative by
   * prefixing it with '!'. Example: `**​/*.csproj;!**​/*.Tests.csproj`
   *
   * @default **​/*.csproj
   *
   * Only meaningful when: `command = pack`
   */
  "searchPatternPack"?: string;
  /**
   * Configuration to Package
   *
   * When using a csproj file this specifies the configuration to package
   *
   * @default $(BuildConfiguration)
   *
   * Only meaningful when: `command = pack`
   */
  "configurationToPack"?: string;
  /**
   * Package Folder
   *
   * Folder where packages will be created. If empty, packages will be created alongside the
   * csproj file.
   *
   * @default $(Build.ArtifactStagingDirectory)
   *
   * Only meaningful when: `command = pack`
   */
  "outputDir"?: string;
  /**
   * Do not build
   *
   * Don't build the project before packing. Corresponds to the --no-build command line
   * parameter.
   *
   * @default false
   *
   * Only meaningful when: `command = pack`
   */
  "nobuild"?: boolean;
  /**
   * Include Symbols
   *
   * Additionally creates symbol NuGet packages. Corresponds to the --include-symbols command
   * line parameter.
   *
   * @default false
   *
   * Only meaningful when: `command = pack`
   */
  "includesymbols"?: boolean;
  /**
   * Include Source
   *
   * Includes source code in the package. Corresponds to the --include-source command line
   * parameter.
   *
   * @default false
   *
   * Only meaningful when: `command = pack`
   */
  "includesource"?: boolean;
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
   * - `bySemVerBuildNumber` — Use full SemVer build number
   *
   * @default off
   *
   * In group: packOptions
   */
  "versioningScheme": "off" | "byPrereleaseNumber" | "byEnvVar" | "byBuildNumber" | "bySemVerBuildNumber";
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
   * Additional build properties
   *
   * Specifies a list of token = value pairs, separated by semicolons, where each occurrence of
   * $token$ in the .nuspec file will be replaced with the given value. Values can be strings in
   * quotation marks.
   *
   * In group: packAdvanced
   */
  "buildProperties"?: string;
  /**
   * Verbosity
   *
   * Specifies the amount of detail displayed in the output.
   *
   * - `-` — -
   * - `Quiet` — Quiet
   * - `Minimal` — Minimal
   * - `Normal` — Normal
   * - `Detailed` — Detailed
   * - `Diagnostic` — Diagnostic
   *
   * @default Normal
   *
   * In group: packAdvanced
   */
  "verbosityPack"?: "-" | "Quiet" | "Minimal" | "Normal" | "Detailed" | "Diagnostic";
  /**
   * Working directory
   *
   * Current working directory where the script is run. Empty is the root of the repo (build) or
   * artifacts (release), which is $(System.DefaultWorkingDirectory). The project search pattern
   * is **NOT** relative to working directory.
   *
   * Only meaningful when: `command != restore && command != push && command != pack`
   *
   * In group: generalAdvanced
   */
  "workingDirectory"?: string;
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
 * .NET Core
 *
 * Build, test, package, or publish a dotnet application, or run a custom dotnet command
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=832194) or [see the
 * .NET Core documentation](https://docs.microsoft.com/dotnet/core/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/dotnet-core-cli
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DotNetCoreCLIV2
 */
export function dotNetCoreCLIV2(
  inputs: DotNetCoreCLIV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("DotNetCoreCLI@2", inputs as unknown as Record<string, unknown>, opts);
}
