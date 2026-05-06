/* eslint-disable */
// Auto-generated from azure/login@v2/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface AzureLoginV2Inputs {
  /**
   * Paste output of `az ad sp create-for-rbac` as value of secret variable: AZURE_CREDENTIALS
   */
  "creds"?: string | boolean | number;
  /**
   * ClientId of the Azure Service principal created.
   */
  "client-id"?: string | boolean | number;
  /**
   * TenantId of the Azure Service principal created.
   */
  "tenant-id"?: string | boolean | number;
  /**
   * Azure subscriptionId
   */
  "subscription-id"?: string | boolean | number;
  /**
   * Set this value to true to enable Azure PowerShell Login in addition to Azure CLI login
   *
   * @default false
   */
  "enable-AzPSSession"?: string | boolean | number;
  /**
   * Name of the environment. Supported values are azurecloud, azurestack, azureusgovernment,
   * azurechinacloud, azuregermancloud. Default being azurecloud
   *
   * @default azurecloud
   */
  "environment"?: string | boolean | number;
  /**
   * Set this value to true to enable support for accessing tenants without subscriptions
   *
   * @default false
   */
  "allow-no-subscriptions"?: string | boolean | number;
  /**
   * Provide audience field for access-token. Default value is api://AzureADTokenExchange
   *
   * @default api://AzureADTokenExchange
   */
  "audience"?: string | boolean | number;
  /**
   * The type of authentication. Supported values are SERVICE_PRINCIPAL, IDENTITY. Default value
   * is SERVICE_PRINCIPAL
   *
   * @default SERVICE_PRINCIPAL
   */
  "auth-type"?: string | boolean | number;
}

/**
 * Azure Login
 *
 * Authenticate to Azure and run your Azure CLI or Azure PowerShell based actions or scripts.
 *
 * @see https://github.com/azure/login
 */
export function azureLoginV2(
  inputs: AzureLoginV2Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("azure/login@v2", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
