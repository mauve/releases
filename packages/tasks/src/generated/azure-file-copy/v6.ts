/* eslint-disable */
// Auto-generated from AzureFileCopyV6/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureFileCopyV6Inputs {
  /**
   * Source
   *
   * Absolute path of the source folder, or file on the local machine, or a UNC share. Expression
   * should return a single folder or a file. Wild card symbol (*) is supported anywhere in the
   * file path or file name.
   */
  "SourcePath": string;
  /**
   * Azure Subscription
   *
   * Azure Resource Manager subscription to target for copying the files.
   */
  "ConnectedServiceNameARM": AzureRMConnection;
  /**
   * Destination Type
   *
   * Select the destination, either Azure Blob or Azure VMs.
   *
   * - `AzureBlob` — Azure Blob
   * - `AzureVMs` — Azure VMs
   */
  "Destination": "AzureBlob" | "AzureVMs";
  /**
   * RM Storage Account
   *
   * Specify a pre-existing ARM storage account. It is also used as an intermediary for copying
   * files to Azure VMs
   */
  "StorageAccountRM": string;
  /**
   * Container Name
   *
   * Name of the Container for uploading the files. If a container with the given name does not
   * exist in the specified storage account, it will automatically be created. <br> If you need
   * to create a virtual directory inside the container, use the blob prefix input below. <br>
   * Example: If your target location is
   * <i>https://myaccount.blob.core.windows.net/mycontainer/vd1/vd2/</i>, then specify
   * <i>mycontainer</i> as container name and <i>vd1/vd2/</i> as blob prefix.
   *
   * Only meaningful when: `Destination = AzureBlob`
   */
  "ContainerName"?: string;
  /**
   * Blob Prefix
   *
   * Useful for filtering files, for example, append build number to all the blobs to download
   * files from that build only. Example: If you specify blob prefix as <i>myvd1/</i>, a virtual
   * directory with this name will be created inside the container. Blob prefix with a trailing
   * '/' will be considered a virtual directory. Otherwise, it will be treated as a file, unless
   * the item being copied is itself a folder. The source files will be copied to
   * <i>https://myaccount.blob.core.windows.net/mycontainer/myvd1/</i>.
   *
   * Only meaningful when: `Destination = AzureBlob`
   */
  "BlobPrefix"?: string;
  /**
   * Resource Group
   *
   * Name of the target Resource Group for copying files to.
   *
   * Only meaningful when: `Destination = AzureVMs`
   */
  "EnvironmentNameRM"?: string;
  /**
   * Select Machines By
   *
   * Optionally, select a subset of VMs in resource group either by providing VMs host name or
   * tags. [Tags](https://learn.microsoft.com/en-us/azure/virtual-machines/tag-template/) are
   * supported for resources created via the Azure Resource Manager only.
   *
   * - `machineNames` — Machine Names
   * - `tags` — Tags
   *
   * @default machineNames
   *
   * Only meaningful when: `Destination = AzureVMs`
   */
  "ResourceFilteringMethod"?: "machineNames" | "tags";
  /**
   * Filter Criteria
   *
   * Provide a list of VMs host name like ffweb, ffdb, or tags like Role:DB, Web; OS:Win8.1. Note
   * the delimiters used for tags are &#44;(comma), &#58;(colon) and &#59;(semicolon). If
   * multiple tags are provided, then the task will run in all the VMs with the specified tags.
   * The default is to run the task in all the VMs.
   *
   * Only meaningful when: `Destination = AzureVMs`
   */
  "MachineNames"?: string;
  /**
   * Admin Login
   *
   * Administrator Username of the VMs.
   *
   * Only meaningful when: `Destination = AzureVMs`
   */
  "vmsAdminUserName"?: string;
  /**
   * Password
   *
   * The administrator password of the VMs. <br>It can accept variable defined in build or
   * release pipelines as '$(passwordVariable)'. <br>You may mark variable as 'secret' to secure
   * it.
   *
   * Only meaningful when: `Destination = AzureVMs`
   */
  "vmsAdminPassword"?: string;
  /**
   * Destination Folder
   *
   * Local path on the target machines for copying the files from the source. Environment
   * variable can be used like $env:windir\BudgetIT\Web.
   *
   * Only meaningful when: `Destination = AzureVMs`
   */
  "TargetPath"?: string;
  /**
   * Optional Arguments (for uploading files to blob)
   *
   * Optional AzCopy.exe arguments that will be applied when uploading to blob like,
   * --check-length=true. If no optional arguments are specified here, the following optional
   * arguments will be added by default.<br> --log-level=INFO (if the pipeline is running in
   * debug mode set --log-level=DEBUG),<br> --recursive (only if container name is not
   * $root),<br> --blob-type=PageBlob (only if specified storage account is a premium account).
   */
  "AdditionalArgumentsForBlobCopy"?: string;
  /**
   * Optional Arguments (for downloading files to VM)
   *
   * Optional AzCopy.exe arguments that will be applied when downloading to VM like,
   * --check-length=true. If no optional arguments are specified here, the following optional
   * arguments will be added by default.<br> --log-level=INFO (if the pipeline is running in
   * debug mode set --log-level=DEBUG),<br> --recursive
   *
   * Only meaningful when: `Destination = AzureVMs`
   */
  "AdditionalArgumentsForVMCopy"?: string;
  /**
   * Enable Copy Prerequisites
   *
   * Enabling this option configures Windows Remote Management (WinRM) listener over HTTPS
   * protocol on port 5986, using a self-signed certificate. This configuration is required for
   * performing copy operation on Azure machines. If the target Virtual Machines are backed by a
   * Load balancer, ensure Inbound NAT rules are configured for target port (5986). Applicable
   * only for ARM VMs.
   *
   * @default false
   *
   * Only meaningful when: `Destination = AzureVMs`
   */
  "enableCopyPrerequisites"?: boolean;
  /**
   * Copy in Parallel
   *
   * Setting it to true will copy files in parallel to the target machines.
   *
   * @default true
   *
   * Only meaningful when: `Destination = AzureVMs`
   */
  "CopyFilesInParallel"?: boolean;
  /**
   * Clean Target
   *
   * Setting it to true will clean-up the destination folder before copying the files.
   *
   * @default false
   */
  "CleanTargetBeforeCopy"?: boolean;
  /**
   * Test Certificate
   *
   * If this option is selected, client skips the validation that the server certificate is
   * signed by a trusted certificate authority (CA) when connecting over Hypertext Transfer
   * Protocol over Secure Socket Layer (HTTPS).
   *
   * @default true
   *
   * Only meaningful when: `Destination = AzureVMs`
   */
  "skipCACheck"?: boolean;
}

/**
 * Azure file copy
 *
 * Copy files to Azure Blob Storage or virtual machines
 *
 * [Learn more about this task](https://aka.ms/azurefilecopyreadme) and to report any issues
 * with this new version of the task
 * [here](https://github.com/microsoft/azure-pipelines-tasks/issues/new?assignees=&labels=regression%2Cbug&projects=&template=1.regression.yml&title=%5BREGRESSION%5D%3A+)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/azure-file-copy
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureFileCopyV6
 */
export function azureFileCopyV6(
  inputs: AzureFileCopyV6Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureFileCopy@6", inputs as unknown as Record<string, unknown>, opts);
}
