/* eslint-disable */
// Auto-generated from AzureAppConfigurationSnapshotV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureAppConfigurationSnapshotV1Inputs {
  /**
   * Azure subscription
   *
   * Select the Azure Subscription for the Azure App Configuration instance.
   *
   * In group: AppConfiguration
   */
  "ConnectedServiceName": AzureRMConnection;
  /**
   * App Configuration Endpoint
   *
   * Provide the endpoint of an existing [Azure App
   * Configuration](https://docs.microsoft.com/en-us/azure/azure-app-configuration/concept-key-value).
   *
   * In group: AppConfiguration
   */
  "AppConfigurationEndpoint": string;
  /**
   * Snapshot Name
   *
   * Provide a name for the snapshot.
   *
   * In group: Options
   */
  "SnapshotName": string;
  /**
   * Composition Type
   *
   * 'Key': The filters are applied in order for this composition type. Each key-value in the
   * snapshot is uniquely identified by the key only. If there are multiple key-values with the
   * same key and multiple labels, only one key-value will be retained based on the last
   * applicable filter.
   * 'Key-Label': Filters will be applied and every key-value in resulting snapshot will be
   * uniquely identified by the key and label together.
   *
   * - `key` — Key (default)
   * - `key_label` — Key-Label
   *
   * @default key
   *
   * In group: Options
   */
  "CompositionType": "key" | "key_label";
  /**
   * Filters for key-values
   *
   * Specifies snapshot filters that represent the key and label filters used to build an App
   * Configuration snapshot. Filters should be of a valid JSON format. Example [{"key":"abc*",
   * "label":"1.0.0"}]. At least 1 filter and max of 3 filters can be applied.
   *
   * In group: Options
   */
  "Filters": string;
  /**
   * Days to retain archived snapshot
   *
   * Archived snapshots can be recovered during the retention period. Choose the number of days
   * the snapshot will be retained after it is archived. The value cannot be changed after
   * creation.
   *
   * @default 30
   *
   * In group: Options
   */
  "RetentionPeriod"?: number;
  /**
   * Tags
   *
   * Specifies one or more tags that should be added to a snapshot. Tags should be of a valid
   * JSON format and can span multiple lines. Example: {"tag1": "value1", "tag2": "value2"}
   *
   * In group: Options
   */
  "Tags"?: string;
}

/**
 * Azure App Configuration Snapshot
 *
 * Create a configuration snapshot in Azure App Configuration through build or deployment
 * pipelines
 *
 * Email AzureAppConfig@microsoft.com for questions.
 *
 * @see https://learn.microsoft.com/en-us/azure/azure-app-configuration/concept-snapshots
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureAppConfigurationSnapshotV1
 */
export function azureAppConfigurationSnapshotV1(
  inputs: AzureAppConfigurationSnapshotV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureAppConfigurationSnapshot@1", inputs as unknown as Record<string, unknown>, opts);
}
