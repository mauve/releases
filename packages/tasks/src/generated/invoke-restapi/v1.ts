/* eslint-disable */
// Auto-generated from InvokeRestApiV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection, GenericConnection } from '../connections.js';

export interface InvokeRESTAPIV1Inputs {
  /**
   * Connection type
   *
   * Select the service connection type to use to invoke the REST API.
   *
   * - `connectedServiceName` — Generic
   * - `connectedServiceNameARM` — Azure Resource Manager
   *
   * @default connectedServiceName
   */
  "connectedServiceNameSelector": "connectedServiceName" | "connectedServiceNameARM";
  /**
   * Generic service connection
   *
   * Select a generic service connection that should be used to pick the URL and construct
   * authorization header for the http request.
   *
   * Only meaningful when: `connectedServiceNameSelector = connectedServiceName`
   */
  "connectedServiceName"?: GenericConnection;
  /**
   * Azure subscription
   *
   * Select an Azure Resource Manager subscription to use for invoking a management API.
   * 'ManagementPortalUrl' of the cloud is used as the baseURL
   *
   * Only meaningful when: `connectedServiceNameSelector = connectedServiceNameARM`
   */
  "connectedServiceNameARM"?: AzureRMConnection;
  /**
   * Method
   *
   * Select the HTTP method with which the API should be invoked.
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
   * Define header in JSON format. The header shall be attached with request to be sent.
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
   * Body
   *
   * Only meaningful when: `method != GET && method != HEAD`
   */
  "body"?: string;
  /**
   * URL suffix and parameters
   *
   * Given string append to the URL. Example: If the service connection URL is
   * https:...TestProj/_apis/Release/releases and the URL suffix is /2/environments/1, the
   * service connection URL becomes https:.../TestProj/_apis/Release/releases/2/environments/1.
   * If the URL suffix is ?definitionId=1&releaseCount=1 then the service connection URL becomes
   * https//...TestProj/_apis/Release/releases?definitionId=1&releaseCount=1.
   */
  "urlSuffix"?: string;
  /**
   * Completion event
   *
   * Default value "ApiResponse". Available values : "ApiResponse", "Callback" call where the
   * REST API calls back to update the timeline record​.
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
   * Criteria which defines when to pass the task. No criteria means response content does not
   * influence the result. Example:- For response {"status" : "successful"}, the expression can
   * be eq(root['status'], 'successful'). [More
   * information](https://go.microsoft.com/fwlink/?linkid=842996)​
   *
   * Only meaningful when: `waitForCompletion = false`
   *
   * In group: completionOptions
   */
  "successCriteria"?: string;
}

/**
 * Invoke REST API
 *
 * Invoke a REST API as a part of your pipeline.
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=870236)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/http-rest-api
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/InvokeRestApiV1
 */
export function invokeRESTAPIV1(
  inputs: InvokeRESTAPIV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("InvokeRESTAPI@1", inputs as unknown as Record<string, unknown>, opts);
}
