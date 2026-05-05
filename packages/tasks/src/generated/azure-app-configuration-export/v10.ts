/* eslint-disable */
// Auto-generated from AzureAppConfigurationExportV10/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureAppConfigurationExportV10Inputs {
  /**
   * Azure subscription
   *
   * Select the Azure Subscription for the Azure App Configuration instance.
   */
  "ConnectedServiceName": AzureRMConnection;
  /**
   * App Configuration Endpoint
   *
   * Provide the endpoint of an existing [Azure App
   * Configuration](https://docs.microsoft.com/en-us/azure/azure-app-configuration/concept-key-value).
   */
  "AppConfigurationEndpoint": string;
  /**
   * Selection Mode
   *
   * Selection mode specifies how the key-values read from a configuration store are selected.
   * The 'Default' selection mode allows the use of key and label filters. The 'Snapshot'
   * selection mode allows key-values to be selected from a snapshot.
   *
   * - `Default` — Default
   * - `Snapshot` — Snapshot
   *
   * @default Default
   */
  "SelectionMode"?: "Default" | "Snapshot";
  /**
   * Key Filter
   *
   * The filter can be used to select what key-values are requested from Azure App Configuration.
   * A value of '*' will select all key-values. [Reference for key-values
   * query](https://docs.microsoft.com/en-us/azure/azure-app-configuration/concept-key-value#query-key-values).
   *
   * @default *
   *
   * Only meaningful when: `SelectionMode = Default`
   */
  "KeyFilter"?: string;
  /**
   * Label
   *
   * Specifies which label should be used when selecting key-values from App Configuration. If no
   * label is provided then key-values with the _null_ label will be retrieved. The following
   * characters are not allowed: `,` `*`.
   *
   * Only meaningful when: `SelectionMode = Default`
   */
  "Label"?: string;
  /**
   * Snapshot name
   *
   * Specifies snapshot from which key-values should be retrieved in Azure App Configuration
   *
   * Only meaningful when: `SelectionMode = Snapshot`
   */
  "SnapshotName"?: string;
  /**
   * Trim Key Prefix
   *
   * Specifies one or more prefixes that should be trimmed from App Configuration keys before
   * setting them as variables. Multiple prefixes can be separated by a new-line character.
   */
  "TrimKeyPrefix"?: string;
  /**
   * Suppress warning for overridden keys
   *
   * Specifies whether or not to suppress the warning shown when existing keys are overridden.
   *
   * @default false
   */
  "SuppressWarningForOverriddenKeys"?: boolean;
  /**
   * Treat key vault resolution errors as warnings
   *
   * Specifies whether to display key vault resolution errors as warning. By default, the task
   * fails when encountering key vault resolution errors.
   *
   * @default false
   */
  "TreatKeyVaultErrorsAsWarning"?: boolean;
}

/**
 * Azure App Configuration Export
 *
 * Export key-values from Azure App Configuration to task variables in your build or deployment
 * pipelines
 *
 * Email AzureAppConfig@microsoft.com for questions.
 *
 * @see https://learn.microsoft.com/azure/azure-app-configuration/azure-pipeline-export-task
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureAppConfigurationExportV10
 */
export function azureAppConfigurationExportV10(
  inputs: AzureAppConfigurationExportV10Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureAppConfigurationExport@10", inputs as unknown as Record<string, unknown>, opts);
}
