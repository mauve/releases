/* eslint-disable */
// Auto-generated from AzureKeyVaultV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureKeyVaultV2Inputs {
  /**
   * Azure subscription
   *
   * Select the Azure subscription for the key vault
   */
  "ConnectedServiceName": AzureRMConnection;
  /**
   * Key vault
   *
   * Provide the name of an existing key vault
   */
  "KeyVaultName": string;
  /**
   * Secrets filter
   *
   * Comma separated list of secret names or leave * to download all secrets from the selected
   * key vault.
   *
   * @default *
   */
  "SecretsFilter": string;
  /**
   * Make secrets available to whole job
   *
   * Run the task before job execution begins. Exposes secrets to all tasks in the job, not just
   * tasks that follow this one.
   *
   * @default false
   */
  "RunAsPreJob": boolean;
}

/**
 * Azure Key Vault
 *
 * Download Azure Key Vault secrets
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=848891)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/azure-key-vault
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureKeyVaultV2
 */
export function azureKeyVaultV2(
  inputs: AzureKeyVaultV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureKeyVault@2", inputs as unknown as Record<string, unknown>, opts);
}
