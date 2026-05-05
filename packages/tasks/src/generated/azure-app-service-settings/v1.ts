/* eslint-disable */
// Auto-generated from AzureAppServiceSettingsV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureAppServiceSettingsV1Inputs {
  /**
   * Azure subscription
   *
   * Select the Azure Resource Manager subscription
   */
  "ConnectedServiceName": AzureRMConnection;
  /**
   * App Service name
   *
   * Enter or Select the name of an existing Azure App Service
   */
  "appName": string;
  /**
   * Resource group
   *
   * Enter or Select the Azure Resource Group that contains the Azure App Service specified above
   */
  "resourceGroupName": string;
  /**
   * Slot
   *
   * Enter or Select an existing Slot. If no slot is selected, changes will be made to
   * production.
   *
   * @default production
   */
  "slotName"?: string;
  /**
   * App settings
   *
   * Add/Update App Service App Settings using the json syntax as follows:<br/>
   * [<br/>&nbsp;&nbsp; {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"name": "key1",
   * <br/>&nbsp;&nbsp;&nbsp;&nbsp;"value":
   * "valueabcd",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"slotSetting": false <br/> &nbsp;&nbsp;
   * },<br/>&nbsp;&nbsp; {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"name": "key2",
   * <br/>&nbsp;&nbsp;&nbsp;&nbsp;"value":
   * "valueefgh",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"slotSetting": true <br/> &nbsp;&nbsp; }<br/>]
   *
   * In group: ApplicationAndConfigurationSettings
   */
  "appSettings"?: string;
  /**
   * General settings
   *
   * Add/Update App Service General Settings using the json syntax as follows:<br/>
   * [<br/>&nbsp;&nbsp; {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"alwaysOn": true,
   * <br/>&nbsp;&nbsp;&nbsp;&nbsp;"webSocketsEnabled": false<br/> &nbsp;&nbsp; }<br/>]
   *
   * In group: ApplicationAndConfigurationSettings
   */
  "generalSettings"?: string;
  /**
   * Connection Strings
   *
   * Add/Update App Service Connection strings using the json syntax as follows:<br/>
   * [<br/>&nbsp;&nbsp; {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"name": "key1",
   * <br/>&nbsp;&nbsp;&nbsp;&nbsp;"value": "valueabcd",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"type":
   * "MySql", <br/> &nbsp;&nbsp;&nbsp;&nbsp;"slotSetting": false <br/> &nbsp;&nbsp;
   * },<br/>&nbsp;&nbsp; {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"name": "key2",
   * <br/>&nbsp;&nbsp;&nbsp;&nbsp;"value": "valueefgh",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"type":
   * "Custom", <br/> &nbsp;&nbsp;&nbsp;&nbsp;"slotSetting": true <br/> &nbsp;&nbsp; }<br/>]
   *
   * In group: ApplicationAndConfigurationSettings
   */
  "connectionStrings"?: string;
}

/**
 * Azure App Service Settings
 *
 * Update/Add App settings an Azure Web App for Linux or Windows
 *
 * [Learn more about this
 * task](https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/azure-app-service-settings)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/azure-app-service-settings
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureAppServiceSettingsV1
 */
export function azureAppServiceSettingsV1(
  inputs: AzureAppServiceSettingsV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureAppServiceSettings@1", inputs as unknown as Record<string, unknown>, opts);
}
