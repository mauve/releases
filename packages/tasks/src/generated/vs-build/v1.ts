/* eslint-disable */
// Auto-generated from VSBuildV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface VSBuildV1Inputs {
  /**
   * Solution
   *
   * Relative path from repo root of the solution(s) or MSBuild project to run. Wildcards can be
   * used. For example, `**\*.sln` for all sln files in all sub folders.
   *
   * @default **\*.sln
   */
  "solution": string;
  /**
   * Visual Studio Version
   *
   * If the preferred version cannot be found, the latest version found will be used instead.
   *
   * - `latest` — Latest
   * - `18.0` — Visual Studio 2026
   * - `17.0` — Visual Studio 2022
   * - `16.0` — Visual Studio 2019
   * - `15.0` — Visual Studio 2017
   * - `14.0` — Visual Studio 2015
   * - `12.0` — Visual Studio 2013
   * - `11.0` — Visual Studio 2012
   *
   * @default latest
   */
  "vsVersion"?: "latest" | "18.0" | "17.0" | "16.0" | "15.0" | "14.0" | "12.0" | "11.0";
  /**
   * MSBuild Arguments
   *
   * Additional arguments passed to MSBuild.
   */
  "msbuildArgs"?: string;
  /**
   * Platform
   *
   * Specify the platform you want to build such as Win32, x86, x64 or any cpu.
   */
  "platform"?: string;
  /**
   * Configuration
   *
   * Specify the configuration you want to build such as debug or release.
   */
  "configuration"?: string;
  /**
   * Clean
   *
   * Set to False if you want to make this an incremental build.
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
   * This option is deprecated. To restore NuGet packages, add a [NuGet Tool
   * Installer](https://docs.microsoft.com/vsts/pipelines/tasks/tool/nuget) task before the
   * build.
   *
   * @default false
   *
   * In group: advanced
   */
  "restoreNugetPackages"?: boolean;
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
   * In group: advanced
   */
  "msbuildArchitecture"?: "x86" | "x64" | "arm64";
  /**
   * Record Project Details
   *
   * Optionally record timeline details for each project.
   *
   * @default true
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
  /**
   * Enable Default Logger
   *
   * If true - enables default logger for msbuild
   *
   * @default true
   *
   * In group: advanced
   */
  "enableDefaultLogger"?: boolean;
  /**
   * Custom Version
   *
   * Allows setting custom version of Visual Studio. Examples: 15.0, 16.0, 17.0. Make sure that
   * the required version of Visual Studio is installed in the system.
   *
   * In group: advanced
   */
  "customVersion"?: string;
}

/**
 * Visual Studio build
 *
 * Build with MSBuild and set the Visual Studio version property
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613727)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/visual-studio-build
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/VSBuildV1
 */
export function vSBuildV1(
  inputs: VSBuildV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("VSBuild@1", inputs as unknown as Record<string, unknown>, opts);
}
