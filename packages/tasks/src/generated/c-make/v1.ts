/* eslint-disable */
// Auto-generated from CMakeV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface CMakeV1Inputs {
  /**
   * Working Directory
   *
   * Current working directory when cmake is run.
   *
   * @default build
   */
  "cwd"?: string;
  /**
   * Arguments
   *
   * Arguments passed to cmake
   */
  "cmakeArgs"?: string;
  /**
   * Run cmake command inside shell
   *
   * CMake arguments will be handled like they would be inside of an OS specific shell. It can be
   * used to handle environment variables inside of argument strings.
   *
   * @default false
   *
   * In group: advanced
   */
  "runInsideShell"?: boolean;
}

/**
 * CMake
 *
 * Build with the CMake cross-platform build system
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613719)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/cmake
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/CMakeV1
 */
export function cMakeV1(
  inputs: CMakeV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("CMake@1", inputs as unknown as Record<string, unknown>, opts);
}
