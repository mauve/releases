/* eslint-disable */
// Auto-generated from AzureMonitorV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureMonitorV1Inputs {
  /**
   * Azure subscription
   *
   * Select an Azure Resource Manager subscription to monitor.
   */
  "connectedServiceNameARM"?: AzureRMConnection;
  /**
   * Resource group
   *
   * Provide the name of a resource group to monitor.
   */
  "ResourceGroupName": string;
  /**
   * Filter type
   *
   * Filter by specific resource or alert rule. Default value is None.
   *
   * - `resource` — By resource
   * - `alertrule` — By alert rule
   * - `none` — None
   *
   * @default none
   *
   * In group: advanced
   */
  "filterType": "resource" | "alertrule" | "none";
  /**
   * Resource
   *
   * Select Azure resource to monitor.
   *
   * Only meaningful when: `filterType = resource`
   *
   * In group: advanced
   */
  "resource"?: string;
  /**
   * Alert rule
   *
   * Filter by specific alert rule. Default value is to select all.
   *
   * Only meaningful when: `filterType = alertrule`
   *
   * In group: advanced
   */
  "alertRule"?: string;
  /**
   * Severity
   *
   * Filter by severity. Default value is select all.
   *
   * - `Sev0` — Sev0
   * - `Sev1` — Sev1
   * - `Sev2` — Sev2
   * - `Sev3` — Sev3
   * - `Sev4` — Sev4
   *
   * @default Sev0,Sev1,Sev2,Sev3,Sev4
   *
   * In group: advanced
   */
  "severity"?: "Sev0" | "Sev1" | "Sev2" | "Sev3" | "Sev4";
  /**
   * Time range
   *
   * Filter by time range. Default value is 1 hour.
   *
   * - `1h` — Past hour
   * - `1d` — Past 24 hours
   * - `7d` — Past 7 days
   * - `30d` — Past 30 days
   *
   * @default 1h
   *
   * In group: advanced
   */
  "timeRange"?: "1h" | "1d" | "7d" | "30d";
  /**
   * Alert state
   *
   * Filter by state of the alert instance. Default value is to select all.
   *
   * - `New` — New
   * - `Acknowledged` — Acknowledged
   * - `Closed` — Closed
   *
   * @default Acknowledged,New
   *
   * In group: advanced
   */
  "alertState"?: "New" | "Acknowledged" | "Closed";
  /**
   * Monitor condition
   *
   * Monitor condition represents whether the underlying conditions have crossed the defined
   * alert rule thresholds.
   *
   * - `Fired ` — Fired
   * - `Resolved` — Resolved
   *
   * @default Fired
   *
   * In group: advanced
   */
  "monitorCondition"?: "Fired " | "Resolved";
}

/**
 * Query Azure Monitor alerts
 *
 * Observe the configured Azure Monitor rules for active alerts
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=870240)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/azure-monitor
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureMonitorV1
 */
export function azureMonitorV1(
  inputs: AzureMonitorV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureMonitor@1", inputs as unknown as Record<string, unknown>, opts);
}
