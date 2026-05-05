/* eslint-disable */
// Auto-generated from AzureFunctionV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface AzureFunctionV1Inputs {
  /**
   * Azure function URL
   *
   * URL of the Azure function that needs to be invoked​. Example:-
   * https://azurefunctionapp.azurewebsites.net/api/HttpTriggerJS1
   */
  "function": string;
  /**
   * Function key
   *
   * Function or Host key with which to access this function. To keep the key secure, create a
   * variable group, add a secret variable, and use it here. Make sure to link the variable group
   * in the "Control options" section. Example: $(myFunctionKey), where myFunctionKey is the
   * secret variable containing the key, like
   * `ZxPXnIEODXLRzYwCw1TgZ4osMfoKs9Zn6se6X/N0FnztfDvZbdOmYw==`
   */
  "key": string;
  /**
   * Method
   *
   * Select the HTTP method with which the function should be invoked.
   *
   * - `OPTIONS` — OPTIONS
   * - `GET` — GET
   * - `HEAD` — HEAD
   * - `POST` — POST
   * - `PUT` — PUT
   * - `DELETE` — DELETE
   * - `TRACE` — TRACE
   * - `PATCH` — PATCH
   *
   * @default POST
   */
  "method"?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "PATCH";
  /**
   * Headers
   *
   * Define a header in JSON format. The header shall be attached to the request that is sent.
   *
   * @default {
   * "Content-Type":"application/json",
   * "PlanUrl": "$(system.CollectionUri)",
   * "ProjectId": "$(system.TeamProjectId)",
   * "HubName": "$(system.HostType)",
   * "PlanId": "$(system.PlanId)",
   * "JobId": "$(system.JobId)",
   * "TimelineId": "$(system.TimelineId)",
   * "TaskInstanceId": "$(system.TaskInstanceId)",
   * "AuthToken": "$(system.AccessToken)"
   * }
   */
  "headers"?: string;
  /**
   * Query parameters
   *
   * Query parameters string to append to the function URL. It should not start with with "?" nor
   * "&".
   */
  "queryParameters"?: string;
  /**
   * Body
   *
   * JSON-formatted message body for the request.
   *
   * Only meaningful when: `method != GET && method != HEAD`
   */
  "body"?: string;
  /**
   * Completion event
   *
   * Default value "ApiResponse". Available values: "ApiResponse", "Callback" call where the
   * Azure function calls back to update the timeline record​.
   *
   * - `true` — Callback
   * - `false` — ApiResponse
   *
   * @default false
   *
   * In group: completionOptions
   */
  "waitForCompletion": "true" | "false";
  /**
   * Success criteria
   *
   * Criteria which defines when to pass the task. No criteria means the response content does
   * not influence the result. Example:- For response {"status" : "successful"}, the expression
   * can be eq(root['status'], 'successful'). [More
   * information](https://go.microsoft.com/fwlink/?linkid=842996)​
   *
   * Only meaningful when: `waitForCompletion = false`
   *
   * In group: completionOptions
   */
  "successCriteria"?: string;
}

/**
 * Invoke Azure Function
 *
 * Invoke an Azure Function
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=870235)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/azure-function
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureFunctionV1
 */
export function azureFunctionV1(
  inputs: AzureFunctionV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureFunction@1", inputs as unknown as Record<string, unknown>, opts);
}
