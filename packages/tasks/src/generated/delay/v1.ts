/* eslint-disable */
// Auto-generated from DelayV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface DelayV1Inputs {
  /**
   * Delay Time (minutes)
   *
   * Delay the execution of the workflow by specified time in minutes. 0 value means that
   * workflow execution will start without delay.
   *
   * @default 0
   */
  "delayForMinutes": string;
}

/**
 * Delay
 *
 * Delay further execution of a workflow by a fixed time
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=870239)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/delay
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DelayV1
 */
export function delayV1(
  inputs: DelayV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Delay@1", inputs as unknown as Record<string, unknown>, opts);
}
