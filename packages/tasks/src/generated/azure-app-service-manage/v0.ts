/* eslint-disable */
// Auto-generated from AzureAppServiceManageV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureAppServiceManageV0Inputs {
  /**
   * Azure subscription
   *
   * Select the Azure Resource Manager subscription
   */
  "ConnectedServiceName": AzureRMConnection;
  /**
   * Action
   *
   * Action to be performed on the App Service. You can Start, Stop, Restart, Slot swap, Install
   * site extensions or enable Continuous Monitoring for an Azure App Service
   *
   * - `Swap Slots` — Swap Slots
   * - `Start Azure App Service` — Start App Service
   * - `Stop Azure App Service` — Stop App Service
   * - `Restart Azure App Service` — Restart App Service
   * - `Start Swap With Preview` — Start Swap with Preview
   * - `Complete Swap` — Complete Swap With Preview
   * - `Cancel Swap` — Cancel Swap With Preview
   * - `Delete Slot` — Delete Slot
   * - `Install Extensions` — Install Extensions
   * - `Enable Continuous Monitoring` — Enable Continuous Monitoring
   * - `Start all continuous webjobs` — Start All Continuous Webjobs
   * - `Stop all continuous webjobs` — Stop All Continuous Webjobs
   *
   * @default Swap Slots
   */
  "Action"?: "Swap Slots" | "Start Azure App Service" | "Stop Azure App Service" | "Restart Azure App Service" | "Start Swap With Preview" | "Complete Swap" | "Cancel Swap" | "Delete Slot" | "Install Extensions" | "Enable Continuous Monitoring" | "Start all continuous webjobs" | "Stop all continuous webjobs";
  /**
   * App Service name
   *
   * Enter or select the name of an existing Azure App Service
   */
  "WebAppName": string;
  /**
   * Specify Slot or App Service Environment
   *
   * @default false
   *
   * Only meaningful when: `Action != Swap Slots && Action != Delete Slot && Action != Start Swap
   * With Preview && Action != Complete Swap && Action != Cancel Swap`
   */
  "SpecifySlot"?: boolean;
  /**
   * Resource group
   *
   * Enter or Select the Azure Resource Group that contains the Azure App Service specified above
   *
   * Only meaningful when: `Action = Swap Slots || Action = Delete Slot || SpecifySlot = true ||
   * Action = Start Swap With Preview || Action = Complete Swap || Action = Cancel Swap`
   */
  "ResourceGroupName"?: string;
  /**
   * Source Slot
   *
   * The swap action directs destination slot's traffic to the source slot
   *
   * Only meaningful when: `Action = Swap Slots || Action = Start Swap With Preview || Action =
   * Complete Swap`
   */
  "SourceSlot"?: string;
  /**
   * Swap with Production
   *
   * Select the option to swap the traffic of source slot with production. If this option is not
   * selected, then you will have to provide source and target slot names.
   *
   * @default true
   *
   * Only meaningful when: `Action = Swap Slots || Action = Start Swap With Preview || Action =
   * Complete Swap`
   */
  "SwapWithProduction"?: boolean;
  /**
   * Target Slot
   *
   * The swap action directs destination slot's traffic to the source slot
   *
   * Only meaningful when: `SwapWithProduction = false`
   */
  "TargetSlot"?: string;
  /**
   * Preserve Vnet
   *
   * Preserve the Virtual network settings
   *
   * @default false
   *
   * Only meaningful when: `Action = Swap Slots || Action = Start Swap With Preview || Action =
   * Complete Swap`
   */
  "PreserveVnet"?: boolean;
  /**
   * Slot
   *
   * @default production
   *
   * Only meaningful when: `Action = Delete Slot || Action = Cancel Swap || SpecifySlot = true`
   */
  "Slot"?: string;
  /**
   * Install Extensions
   *
   * Site Extensions run on Microsoft Azure App Service. You can install set of tools as site
   * extension and better manage your Azure App Service. The App Service will be restarted to
   * make sure latest changes take effect.
   *
   * Only meaningful when: `Action = Install Extensions`
   */
  "ExtensionsList"?: string;
  /**
   * Output variable
   *
   * Provide the variable name for the local installation path for the selected
   * extension.<br/>This field is now deprecated and would be removed. Use
   * LocalPathsForInstalledExtensions variable from Output Variables section in subsequent tasks.
   *
   * Only meaningful when: `Action = Install Extensions`
   */
  "OutputVariable"?: string;
  /**
   * Resource Group name for Application Insights
   *
   * Enter or Select resource group where your application insights resource is available
   *
   * Only meaningful when: `Action == Enable Continuous Monitoring`
   */
  "AppInsightsResourceGroupName"?: string;
  /**
   * Application Insights resource name
   *
   * Select Application Insights resource where continuous monitoring data will be recorded.
   * <br/>If your application insights resource is not listed here and you want to create a new
   * resource, click on [+New] button. Once the resource is created on Azure Portal, come back
   * here and click on refresh button.
   *
   * Only meaningful when: `Action == Enable Continuous Monitoring`
   */
  "ApplicationInsightsResourceName"?: string;
  /**
   * Application Insights web test name
   *
   * Enter Application Insights Web Test name to be created or updated. <br/>If not provided, the
   * default test name will be used.
   *
   * In group: AdvancedSettings
   */
  "ApplicationInsightsWebTestName"?: string;
}

/**
 * Azure App Service manage
 *
 * Start, stop, restart, slot swap, slot delete, install site extensions or enable continuous
 * monitoring for an Azure App Service
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=831573)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/azure-app-service-manage
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureAppServiceManageV0
 */
export function azureAppServiceManageV0(
  inputs: AzureAppServiceManageV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureAppServiceManage@0", inputs as unknown as Record<string, unknown>, opts);
}
