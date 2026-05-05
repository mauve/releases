/* eslint-disable */
// Auto-generated from QueryWorkItemsV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface QueryWorkItemsV0Inputs {
  /**
   * Query
   *
   * Select a saved work item query to execute.
   */
  "queryId"?: string;
  /**
   * Upper threshold
   *
   * The maximum number of matching workitems from the query.
   *
   * @default 0
   */
  "maxThreshold"?: string;
  /**
   * Lower threshold
   *
   * The minimum number of matching workitems from the query.
   *
   * @default 0
   *
   * In group: advanced
   */
  "minThreshold"?: string;
}

/**
 * Query work items
 *
 * Execute a work item query and check the number of items returned
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=870238)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/work-item-query
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/QueryWorkItemsV0
 */
export function queryWorkItemsV0(
  inputs: QueryWorkItemsV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("queryWorkItems@0", inputs as unknown as Record<string, unknown>, opts);
}
