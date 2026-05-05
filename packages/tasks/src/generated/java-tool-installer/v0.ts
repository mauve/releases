/* eslint-disable */
// Auto-generated from JavaToolInstallerV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface JavaToolInstallerV0Inputs {
  /**
   * JDK version
   *
   * A number that specifies the JDK version to make available on the path. Use a whole number
   * version, such as 10
   *
   * @default 8
   */
  "versionSpec": string;
  /**
   * JDK architecture
   *
   * The architecture (x86, x64, arm64) of the JDK.
   *
   * - `x64` — X64
   * - `x86` — X86
   * - `arm64` — arm64
   */
  "jdkArchitectureOption": "x64" | "x86" | "arm64";
  /**
   * JDK source
   *
   * Source for the compressed JDK.
   *
   * - `AzureStorage` — Azure Storage
   * - `LocalDirectory` — Local Directory
   * - `PreInstalled` — Pre-installed
   */
  "jdkSourceOption": "AzureStorage" | "LocalDirectory" | "PreInstalled";
  /**
   * JDK file
   *
   * Path to where the compressed JDK is located. The path could be in your source repository or
   * a local path on the agent.
   *
   * Only meaningful when: `jdkSourceOption == LocalDirectory`
   */
  "jdkFile"?: string;
  /**
   * Azure subscription
   *
   * Choose the Azure Resource Manager subscription for the JDK.
   *
   * Only meaningful when: `jdkSourceOption == AzureStorage`
   */
  "azureResourceManagerEndpoint"?: AzureRMConnection;
  /**
   * Storage account name
   *
   * Azure Classic and Resource Manager storage accounts are listed. Select the storage account
   * name in which the JDK is located.
   *
   * Only meaningful when: `jdkSourceOption == AzureStorage`
   */
  "azureStorageAccountName"?: string;
  /**
   * Container name
   *
   * Name of the container in the storage account in which the JDK is located.
   *
   * Only meaningful when: `jdkSourceOption == AzureStorage`
   */
  "azureContainerName"?: string;
  /**
   * Common virtual path
   *
   * Path to the JDK inside the Azure storage container.
   *
   * Only meaningful when: `jdkSourceOption == AzureStorage`
   */
  "azureCommonVirtualFile"?: string;
  /**
   * Destination directory
   *
   * On Linux and Windows, this is used as the destination directory for JDK installation. On
   * macOS, this directory is used as a temporary folder for extracting of .dmg's since macOS
   * doesn't support installing of JDK to specific directory.
   *
   * Only meaningful when: `jdkSourceOption != PreInstalled`
   */
  "jdkDestinationDirectory"?: string;
  /**
   * Resource Group name
   *
   * Resource Group name of the storage account.
   *
   * Only meaningful when: `jdkSourceOption == AzureStorage`
   */
  "azureResourceGroupName"?: string;
  /**
   * Clean destination directory
   *
   * Select this option to clean the destination directory before JDK is extracted into it.
   *
   * @default true
   *
   * Only meaningful when: `jdkSourceOption != PreInstalled`
   */
  "cleanDestinationDirectory"?: boolean;
  /**
   * Create directory for extracting
   *
   * By default, task is creating a directory similar to this JAVA_HOME_8_X64_OpenJDK_zip for
   * extracting JDK. This option allows to disable creation of this folder, in this case, JDK
   * will be located in the root of jdkDestinationDirectory
   *
   * @default true
   *
   * Only meaningful when: `jdkSourceOption != PreInstalled`
   */
  "createExtractDirectory"?: boolean;
}

/**
 * Java tool installer
 *
 * Acquire a specific version of Java from a user-supplied Azure blob or the tool cache and
 * sets JAVA_HOME
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=875287) or [see the
 * Java documentation](https://docs.oracle.com/java/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/tool/java-tool-installer
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/JavaToolInstallerV0
 */
export function javaToolInstallerV0(
  inputs: JavaToolInstallerV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("JavaToolInstaller@0", inputs as unknown as Record<string, unknown>, opts);
}
