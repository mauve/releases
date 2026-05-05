/* eslint-disable */
// Auto-generated from ShellScriptV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface ShellScriptV2Inputs {
  /**
   * Script Path
   *
   * Relative path from repo root of the shell script file to run.
   */
  "scriptPath": string;
  /**
   * Arguments
   *
   * Arguments passed to the shell script
   */
  "args"?: string;
  /**
   * Specify Working Directory
   *
   * The default behavior is to set the working directory to the script location. This enables
   * you to optionally specify a different working directory.
   *
   * @default false
   *
   * In group: advanced
   */
  "disableAutoCwd"?: boolean;
  /**
   * Working Directory
   *
   * Current working directory where the script is run. Empty is the root of the repo (build) or
   * artifacts (release), which is $(System.DefaultWorkingDirectory).
   *
   * Only meaningful when: `disableAutoCwd = true`
   *
   * In group: advanced
   */
  "cwd"?: string;
  /**
   * Fail on Standard Error
   *
   * If this is true, this task will fail if any errors are written to the StandardError stream.
   *
   * @default false
   *
   * In group: advanced
   */
  "failOnStandardError"?: boolean;
}

/**
 * Shell script
 *
 * Run a shell script using Bash
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613738)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/shell-script
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/ShellScriptV2
 */
export function shellScriptV2(
  inputs: ShellScriptV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("ShellScript@2", inputs as unknown as Record<string, unknown>, opts);
}
