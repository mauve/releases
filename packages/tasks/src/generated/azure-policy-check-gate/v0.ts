/* eslint-disable */
// Auto-generated from AzurePolicyV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzurePolicyCheckGateV0Inputs {
  /**
   * Azure subscription
   *
   * Select the Azure Resource Manager subscription to enforce the policies.
   */
  "ConnectedServiceName": AzureRMConnection;
  /**
   * Resource group
   *
   * Provide name of a resource group.
   */
  "ResourceGroupName"?: string;
  /**
   * Resource name
   *
   * Select name of Azure resources for which you want to check the policy compliance.
   */
  "Resources"?: string;
  /**
   * Retry duration
   *
   * Defines period which task will wait until it retry to call Azure API in case that previous
   * response code was "Accepted"​. Minimal period is 2 minutes.
   *
   * @default 00:02:00
   *
   * In group: advancedOptions
   */
  "RetryDuration"?: string;
}

/**
 * Check Azure Policy compliance
 *
 * Security and compliance assessment for Azure Policy
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/azure-policy-check-gate
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzurePolicyV0
 */
export function azurePolicyCheckGateV0(
  inputs: AzurePolicyCheckGateV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzurePolicyCheckGate@0", inputs as unknown as Record<string, unknown>, opts);
}
