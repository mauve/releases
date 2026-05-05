/* eslint-disable */
// Auto-generated from MSBuildV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface MSBuildV1Inputs {
  /**
   * Project
   *
   * Relative path from repo root of the project(s) or solution(s) to run. Wildcards can be used.
   * For example, `**​/*.csproj` for all csproj files in all sub folders.
   *
   * @default **​/*.sln
   */
  "solution": string;
  /**
   * MSBuild
   *
   * - `version` — Version
   * - `location` — Specify Location
   *
   * @default version
   */
  "msbuildLocationMethod"?: "version" | "location";
  /**
   * MSBuild Version
   *
   * If the preferred version cannot be found, the latest version found will be used instead. On
   * an macOS agent, xbuild (Mono) will be used if version is lower than 15.0.
   *
   * - `latest` — Latest
   * - `18.0` — MSBuild 18.0
   * - `17.0` — MSBuild 17.0
   * - `16.0` — MSBuild 16.0
   * - `15.0` — MSBuild 15.0
   * - `14.0` — MSBuild 14.0
   * - `12.0` — MSBuild 12.0
   * - `4.0` — MSBuild 4.0
   *
   * @default latest
   *
   * Only meaningful when: `msbuildLocationMethod = version`
   */
  "msbuildVersion"?: "latest" | "18.0" | "17.0" | "16.0" | "15.0" | "14.0" | "12.0" | "4.0";
  /**
   * MSBuild Architecture
   *
   * Optionally supply the architecture (x86, x64, arm64) of MSBuild to run.
   *
   * - `x86` — MSBuild x86
   * - `x64` — MSBuild x64
   * - `arm64` — MSBuild arm64
   *
   * @default x86
   *
   * Only meaningful when: `msbuildLocationMethod = version`
   */
  "msbuildArchitecture"?: "x86" | "x64" | "arm64";
  /**
   * Path to MSBuild
   *
   * Optionally supply the path to MSBuild.
   *
   * Only meaningful when: `msbuildLocationMethod = location`
   */
  "msbuildLocation"?: string;
  /**
   * Platform
   */
  "platform"?: string;
  /**
   * Configuration
   */
  "configuration"?: string;
  /**
   * MSBuild Arguments
   *
   * Additional arguments passed to MSBuild (on Windows) and xbuild (on macOS).
   */
  "msbuildArguments"?: string;
  /**
   * Clean
   *
   * Run a clean build (/t:clean) prior to the build.
   *
   * @default false
   */
  "clean"?: boolean;
  /**
   * Build in Parallel
   *
   * If your MSBuild target configuration is compatible with building in parallel, you can
   * optionally check this input to pass the /m switch to MSBuild (Windows only). If your target
   * configuration is not compatible with building in parallel, checking this option may cause
   * your build to result in file-in-use errors, or intermittent or inconsistent build failures.
   *
   * @default false
   *
   * In group: advanced
   */
  "maximumCpuCount"?: boolean;
  /**
   * Restore NuGet Packages
   *
   * This option is deprecated. To restore NuGet packages, add a
   * [NuGet](https://docs.microsoft.com/azure/devops/pipelines/tasks/package/nuget) task before
   * the build.
   *
   * @default false
   *
   * In group: advanced
   */
  "restoreNugetPackages"?: boolean;
  /**
   * Record Project Details
   *
   * Optionally record timeline details for each project (Windows only).
   *
   * @default false
   *
   * In group: advanced
   */
  "logProjectEvents"?: boolean;
  /**
   * Create Log File
   *
   * Optionally create a log file (Windows only).
   *
   * @default false
   *
   * In group: advanced
   */
  "createLogFile"?: boolean;
  /**
   * Log File Verbosity
   *
   * Optional log file verbosity.
   *
   * - `quiet` — Quiet
   * - `minimal` — Minimal
   * - `normal` — Normal
   * - `detailed` — Detailed
   * - `diagnostic` — Diagnostic
   *
   * @default normal
   *
   * Only meaningful when: `createLogFile = true`
   *
   * In group: advanced
   */
  "logFileVerbosity"?: "quiet" | "minimal" | "normal" | "detailed" | "diagnostic";
}

/**
 * MSBuild
 *
 * Build with MSBuild
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613724)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/msbuild
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/MSBuildV1
 */
export function mSBuildV1(
  inputs: MSBuildV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("MSBuild@1", inputs as unknown as Record<string, unknown>, opts);
}
