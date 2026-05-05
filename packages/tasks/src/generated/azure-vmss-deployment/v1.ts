/* eslint-disable */
// Auto-generated from AzureVmssDeploymentV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureVmssDeploymentV1Inputs {
  /**
   * Azure subscription
   *
   * Select the Azure Resource Manager subscription for the scale set.
   *
   * In group: AzureDetails
   */
  "ConnectedServiceName": AzureRMConnection;
  /**
   * Action
   *
   * Choose between updating a VM scale set by using a VHD image and/or by running
   * deployment/install scripts using Custom Script VM extension.<br/>The VHD image approach is
   * better for scaling quickly and doing rollback. The extension approach is useful for post
   * deployment configuration, software installation, or any other configuration / management
   * task.<br/>You can use a VHD image to update a VM scale set only when it was created by using
   * a custom image, the update will fail if the VM Scale set was created by using a
   * platform/gallery image available in Azure.<br/>The Custom script VM extension approach can
   * be used for VM scale set created by using either custom image or platform/gallery image.
   *
   * - `Update image` — Update VM Scale set by using an image
   * - `Configure application startup` — Run Custom Script VM extension on VM scale set
   *
   * @default Update image
   *
   * In group: AzureDetails
   */
  "action": "Update image" | "Configure application startup";
  /**
   * Virtual Machine scale set name
   *
   * Name of VM scale set which you want to update by using either a VHD image or by using Custom
   * script VM extension.
   *
   * In group: AzureDetails
   */
  "vmssName": string;
  /**
   * OS type
   *
   * Select the operating system type of VM scale set.
   *
   * - `Windows` — Windows
   * - `Linux` — Linux
   *
   * In group: AzureDetails
   */
  "vmssOsType": "Windows" | "Linux";
  /**
   * Image URL
   *
   * Specify the URL of VHD image. If it is an Azure storage blob URL, the storage account
   * location should be same as scale set location.
   *
   * In group: Image
   */
  "imageUrl": string;
  /**
   * Custom script directory
   *
   * Path to directory containing custom script(s) that will be run by using Custom Script VM
   * extension. The extension approach is useful for post deployment configuration,
   * application/software installation, or any other application configuration/management task.
   * For example: the script can set a machine level environment variable which the application
   * uses, like database connection string.
   *
   * In group: StartupConfiguration
   */
  "customScriptsDirectory"?: string;
  /**
   * Command
   *
   * The script that will be run by using Custom Script VM extension. This script can invoke
   * other scripts in the directory. The script will be invoked with arguments passed
   * below.<br/>This script in conjugation with such arguments can be used to execute commands.
   * For example:<br/>1. Update-DatabaseConnectionStrings.ps1 -clusterType dev -user $(dbUser)
   * -password $(dbUserPwd) will update connection string in web.config of web
   * application.<br/>2. install-secrets.sh --key-vault-type prod -key serviceprincipalkey will
   * create an encrypted file containing service principal key.
   *
   * In group: StartupConfiguration
   */
  "customScript"?: string;
  /**
   * Arguments
   *
   * The custom script will be invoked with arguments passed. Build/Release variables can be used
   * which makes it easy to use secrets.
   *
   * In group: StartupConfiguration
   */
  "customScriptArguments"?: string;
  /**
   * Azure storage account where custom scripts will be uploaded
   *
   * The Custom Script Extension downloads and executes scripts provided by you on each virtual
   * machines in the VM scale set. These scripts will be stored in the storage account specified
   * here. Specify a pre-existing ARM storage account.
   *
   * In group: StartupConfiguration
   */
  "customScriptsStorageAccount"?: string;
  /**
   * Skip Archiving custom scripts
   *
   * By default, this task creates a compressed archive of directory containing custom scripts.
   * This improves performance and reliability while uploading to azure storage. If not selected,
   * archiving will not be done and all files will be inidividually uploaded.
   *
   * @default false
   *
   * In group: Advanced
   */
  "skipArchivingCustomScripts"?: boolean;
}

/**
 * Azure VM scale set deployment
 *
 * Deploy a virtual machine scale set image
 *
 * [Learn more about this
 * task](https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/azure-vmss-deployment)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/azure-vmss-deployment
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureVmssDeploymentV1
 */
export function azureVmssDeploymentV1(
  inputs: AzureVmssDeploymentV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureVmssDeployment@1", inputs as unknown as Record<string, unknown>, opts);
}
