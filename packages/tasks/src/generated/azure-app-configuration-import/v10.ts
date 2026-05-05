/* eslint-disable */
// Auto-generated from AzureAppConfigurationImportV10/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureAppConfigurationImportV10Inputs {
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
   * Configuration File Path
   *
   * the path to the configuration file (supported: yaml, json, properties)
   *
   * In group: Source
   */
  "ConfigurationFile": string;
  /**
   * Use the file path extension to determine the file format
   *
   * Specifies whether or not to use the file path extension to determine the file format
   *
   * @default true
   *
   * In group: Source
   */
  "UseFilePathExtension"?: boolean;
  /**
   * File Format
   *
   * The configuration file format. If no format is provided, then the format defaults to the
   * file extension of the configuration file provided.
   *
   * - `json` — Json
   * - `yaml` — Yaml
   * - `properties` — Properties
   *
   * Only meaningful when: `UseFilePathExtension = false`
   *
   * In group: Source
   */
  "FileFormat"?: "json" | "yaml" | "properties";
  /**
   * File Content Profile
   *
   * The configuration file's [content
   * profile](https://docs.microsoft.com/azure/azure-app-configuration/concept-config-file)
   *
   * - `appconfig/default` — Default
   * - `appconfig/kvset` — KVSet
   *
   * @default appconfig/default
   *
   * In group: Options
   */
  "FileContentProfile"?: "appconfig/default" | "appconfig/kvset";
  /**
   * Separator
   *
   * Separator used to flatten the configuration file (json & yaml files). It is required when
   * the depth provided is greater than 1
   *
   * - `.` — . (Period)
   * - `/` — / (Forward Slash)
   * - `:` — : (Colon)
   * - `;` — ; (Semicolon)
   * - `,` — , (Comma)
   * - `-` — - (Hyphen)
   * - `_` — _ (Underscore)
   * - `__` — __ (Double Underscore)
   *
   * Only meaningful when: `FileContentProfile EndsWith default`
   *
   * In group: Options
   */
  "Separator"?: "." | "/" | ":" | ";" | "," | "-" | "_" | "__";
  /**
   * Depth
   *
   * max depth to flatten to in configuration file (json and yaml files)
   *
   * Only meaningful when: `FileContentProfile EndsWith default`
   *
   * In group: Options
   */
  "Depth"?: string;
  /**
   * Prefix
   *
   * a prefix to append to all keys in the configuration file
   *
   * Only meaningful when: `FileContentProfile EndsWith default`
   *
   * In group: Options
   */
  "Prefix"?: string;
  /**
   * Label
   *
   * Specifies which label should be used when selecting key-values from App Configuration. If no
   * label is provided then key-values with the _null_ label will be retrieved. The following
   * characters are not allowed: `,` `*`.
   *
   * Only meaningful when: `FileContentProfile EndsWith default`
   *
   * In group: Options
   */
  "Label"?: string;
  /**
   * Content Type
   *
   * a content type to append to all keys in the configuration file
   *
   * Only meaningful when: `FileContentProfile EndsWith default`
   *
   * In group: Options
   */
  "ContentType"?: string;
  /**
   * Tags
   *
   * Specifies one or more tag that should be added to key-value settings being imported to App
   * Configuration. Tags should be of a valid JSON format and can span multiple lines. Example:
   * {"tag1": "value1", "tag2": "value2"}
   *
   * Only meaningful when: `FileContentProfile EndsWith default`
   *
   * In group: Options
   */
  "Tags"?: string;
  /**
   * Exclude feature flags
   *
   * Specifies whether or not any feature flags provided in the configuration file will be
   * imported to App Configuration.
   *
   * @default false
   *
   * Only meaningful when: `FileContentProfile EndsWith default`
   *
   * In group: Options
   */
  "ExcludeFeatureFlags"?: boolean;
  /**
   * Delete key-values that are not included in the configuration file
   *
   * The behavior of this option depends on the configuration file's content profile.
   * 'Default': Any key-values in the store with the specified prefix and label that are not
   * included in the configuration file will be deleted.
   * 'KVSet': Any key-values in the store that are not included in the configuration file will be
   * deleted.
   *
   * @default false
   *
   * In group: Options
   */
  "Strict": boolean;
  /**
   * Dry run
   *
   * When dry run is enabled, this task will not perform any updates to App Configuration.
   * Instead, any updates that would have been performed in a normal run will be printed to the
   * console for review
   *
   * @default false
   *
   * In group: Options
   */
  "DryRun"?: boolean;
  /**
   * Import Mode
   *
   * Determines the behavior when importing key-values. The default value, 'All' will import all
   * key-values in the input file to App Configuration. 'Ignore-Match' will only import settings
   * that have no matching key-value in App Configuration.
   *
   * - `All` — All
   * - `Ignore-Match` — Ignore-Match
   *
   * @default Ignore-Match
   *
   * In group: Options
   */
  "ImportMode"?: "All" | "Ignore-Match";
}

/**
 * Azure App Configuration Import
 *
 * Import settings from configuration files into Azure App Configuration through build or
 * deployment pipelines
 *
 * Email AzureAppConfig@microsoft.com for questions.
 *
 * @see https://learn.microsoft.com/azure/azure-app-configuration/azure-pipeline-import-task
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureAppConfigurationImportV10
 */
export function azureAppConfigurationImportV10(
  inputs: AzureAppConfigurationImportV10Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureAppConfigurationImport@10", inputs as unknown as Record<string, unknown>, opts);
}
