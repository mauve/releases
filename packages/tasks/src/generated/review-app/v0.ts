/* eslint-disable */
// Auto-generated from ReviewAppV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface ReviewAppV0Inputs {
  /**
   * Resource name
   *
   * Name of an existing resource in the environment which will be used for resource type
   * information
   */
  "resourceName": string;
  /**
   * Environment name
   */
  "baseEnvironmentName"?: string;
  /**
   * Review Resource Name
   */
  "reviewResourceName"?: string;
}

/**
 * Review App
 *
 * Use this task under deploy phase provider to create a resource dynamically
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613735)
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/ReviewAppV0
 */
export function reviewAppV0(
  inputs: ReviewAppV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("ReviewApp@0", inputs as unknown as Record<string, unknown>, opts);
}
