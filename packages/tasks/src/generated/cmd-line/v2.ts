/* eslint-disable */
// Auto-generated from CmdLineV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface CmdLineV2Inputs {
  /**
   * Script
   *
   * @default echo Write your commands here
   *
   * echo Hello world
   */
  "script": string;
  /**
   * Working Directory
   *
   * In group: advanced
   */
  "workingDirectory"?: string;
  /**
   * Fail on Standard Error
   *
   * If this is true, this task will fail if any errors are written to the StandardError stream.
   *
   * @default false
   *
   * In group: advanced
   */
  "failOnStderr"?: boolean;
}

/**
 * Command line
 *
 * Run a command line script using Bash on Linux and macOS and cmd.exe on Windows
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613735)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/command-line
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/CmdLineV2
 */
export function cmdLineV2(
  inputs: CmdLineV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("CmdLine@2", inputs as unknown as Record<string, unknown>, opts);
}
