/* eslint-disable */
// Auto-generated from BatchScriptV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface BatchScriptV1Inputs {
  /**
   * Path
   *
   * Path of the cmd or bat script to execute. Should be fully qualified path or relative to the
   * default working directory (please note that working directory could differ from
   * 'workingFolder' which could be specified for this task).
   */
  "filename": string;
  /**
   * Arguments
   *
   * Arguments passed to the cmd or bat script
   */
  "arguments"?: string;
  /**
   * Modify Environment
   *
   * Determines whether environment variable modifications will affect subsequent tasks.
   *
   * @default False
   */
  "modifyEnvironment"?: boolean;
  /**
   * Working folder
   *
   * Current working directory when script is run. Defaults to the folder where the script is
   * located.
   *
   * In group: advanced
   */
  "workingFolder"?: string;
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
 * Batch script
 *
 * Run a Windows command or batch script and optionally allow it to change the environment
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613733).
 *
 * Please note: this task is not compatible with Windows containers. If you need to run a batch
 * script on a Windows container, use the [CmdLine
 * task](https://go.microsoft.com/fwlink/?LinkID=613735) instead.
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/batch-script
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/BatchScriptV1
 */
export function batchScriptV1(
  inputs: BatchScriptV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("BatchScript@1", inputs as unknown as Record<string, unknown>, opts);
}
