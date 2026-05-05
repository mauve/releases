/* eslint-disable */
// Auto-generated from AzureFunctionAppContainerV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureFunctionAppContainerV1Inputs {
  /**
   * Azure subscription
   *
   * Select the Azure Resource Manager subscription for the deployment.
   */
  "azureSubscription": AzureRMConnection;
  /**
   * App name
   *
   * Enter or Select the name of an existing Azure App Service. App services based on selected
   * app type will only be listed.
   */
  "appName": string;
  /**
   * Deploy to Slot or App Service Environment
   *
   * Select the option to deploy to an existing deployment slot or Azure App Service
   * Environment.<br />For both the targets, the task needs Resource group name.<br />In case the
   * deployment target is a slot, by default the deployment is done to the production slot. Any
   * other existing slot name can also be provided.<br />In case the deployment target is an
   * Azure App Service environment, leave the slot name as ‘production’ and just specify the
   * Resource group name.
   *
   * @default false
   */
  "deployToSlotOrASE"?: boolean;
  /**
   * Resource group
   *
   * The Resource group name is required when the deployment target is either a deployment slot
   * or an App Service Environment.<br />Enter or Select the Azure Resource group that contains
   * the Azure App Service specified above.
   *
   * Only meaningful when: `deployToSlotOrASE = true`
   */
  "resourceGroupName"?: string;
  /**
   * Slot
   *
   * Enter or Select an existing Slot other than the Production slot.
   *
   * @default production
   *
   * Only meaningful when: `deployToSlotOrASE = true`
   */
  "slotName"?: string;
  /**
   * Image name
   *
   * A globally unique top-level domain name for your specific registry or namespace.<br/> Note:
   * Fully qualified image name will be of the format: '<b>`<registry or
   * namespace`></b>/`<repository`>:`<tag`>'. For example,
   * '<b>myregistry.azurecr.io</b>/nginx:latest'.
   */
  "imageName": string;
  /**
   * Startup command
   *
   * Enter the start up command. For ex.<br/>dotnet exec filename.dll<br/>dotnet filename.dll
   */
  "containerCommand"?: string;
  /**
   * App settings
   *
   * Edit web app application settings following the syntax -key value . Value containing spaces
   * should be enclosed in double quotes.<br /> <b>Example</b> : -Port 5000 -RequestTimeout 5000
   * <br /> -WEBSITE_TIME_ZONE "Eastern Standard Time"
   *
   * In group: ApplicationAndConfigurationSettings
   */
  "appSettings"?: string;
  /**
   * Configuration settings
   *
   * Edit web app configuration settings following the syntax -key value. Value containing spaces
   * should be enclosed in double quotes.<br /> Example : -phpVersion 5.6 -linuxFxVersion:
   * node|6.11
   *
   * In group: ApplicationAndConfigurationSettings
   */
  "configurationStrings"?: string;
}

/**
 * Azure Functions for container
 *
 * Update a function app with a Docker container
 *
 * [Learn more about this task](https://aka.ms/azurefunctiononcontainerdeployreadme)
 *
 * @see https://aka.ms/azurefunctioncontainertroubleshooting
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureFunctionAppContainerV1
 */
export function azureFunctionAppContainerV1(
  inputs: AzureFunctionAppContainerV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureFunctionAppContainer@1", inputs as unknown as Record<string, unknown>, opts);
}
