/* eslint-disable */
// Auto-generated from BicepDeployV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface BicepDeployV0Inputs {
  /**
   * Execution type
   *
   * Specifies the execution type: deployment or deploymentStack.
   *
   * - `deployment` — Deployment
   * - `deploymentStack` — Deployment Stack
   *
   * @default deployment
   *
   * In group: AzureDetails
   */
  "type": "deployment" | "deploymentStack";
  /**
   * Operation
   *
   * Specifies the operation to perform. Deployment supports: create, validate, whatIf.
   * Deployment Stack supports: create, validate, delete.
   *
   * - `create` — Create or update
   * - `validate` — Validate
   * - `whatIf` — What-If (preview changes)
   * - `delete` — Delete
   *
   * @default create
   *
   * Only meaningful when: `type = deployment || (type = deploymentStack && operation != whatIf)`
   *
   * In group: AzureDetails
   */
  "operation"?: "create" | "validate" | "whatIf" | "delete";
  /**
   * Deployment scope
   *
   * Specifies the scope at which resources are deployed.
   *
   * - `resourceGroup` — Resource Group
   * - `subscription` — Subscription
   * - `managementGroup` — Management Group
   * - `tenant` — Tenant
   *
   * @default resourceGroup
   *
   * In group: AzureDetails
   */
  "scope": "resourceGroup" | "subscription" | "managementGroup" | "tenant";
  /**
   * Deployment name
   *
   * Specifies the name of the deployment or deployment stack. If not provided, a default name
   * will be generated.
   *
   * In group: AzureDetails
   */
  "name"?: string;
  /**
   * Azure Resource Manager connection
   *
   * Select the Azure Resource Manager service connection.
   *
   * In group: AzureDetails
   */
  "ConnectedServiceName": AzureRMConnection;
  /**
   * Subscription
   *
   * Select the Azure subscription. Required if scope is subscription or resourceGroup.
   *
   * Only meaningful when: `scope != tenant && scope != managementGroup`
   *
   * In group: AzureDetails
   */
  "subscriptionId"?: string;
  /**
   * Resource group
   *
   * Provide the name of the resource group.
   *
   * Only meaningful when: `scope = resourceGroup`
   *
   * In group: AzureDetails
   */
  "resourceGroupName"?: string;
  /**
   * Location
   *
   * Location to store deployment metadata. Required for subscription, managementGroup, and
   * tenant scopes.
   *
   * Only meaningful when: `scope != resourceGroup`
   *
   * In group: AzureDetails
   */
  "location"?: string;
  /**
   * Tenant ID
   *
   * Specifies the tenant ID. Required if scope is tenant.
   *
   * Only meaningful when: `scope = tenant`
   *
   * In group: AzureDetails
   */
  "tenantId"?: string;
  /**
   * Management group ID
   *
   * Specifies the management group ID. Required if scope is managementGroup.
   *
   * Only meaningful when: `scope = managementGroup`
   *
   * In group: AzureDetails
   */
  "managementGroupId"?: string;
  /**
   * Template file
   *
   * Specify the path to the Bicep template file (.bicep).
   *
   * In group: Template
   */
  "templateFile"?: string;
  /**
   * Parameters file
   *
   * Specify the path to the parameters file (.json or .bicepparam).
   *
   * In group: Template
   */
  "parametersFile"?: string;
  /**
   * Override parameters
   *
   * Specify inline parameters as a JSON or YAML object. Example: {"param1": "value1", "param2":
   * "value2"}
   *
   * In group: Template
   */
  "parameters"?: string;
  /**
   * Action on unmanaged resources
   *
   * Specifies the action to take on resources not defined in the template.
   *
   * - `delete` — Delete
   * - `detach` — Detach
   *
   * @default detach
   *
   * Only meaningful when: `type = deploymentStack`
   *
   * In group: DeploymentStack
   */
  "actionOnUnmanageResources"?: "delete" | "detach";
  /**
   * Action on unmanaged resource groups
   *
   * Specifies the action to take on resource groups not defined in the template.
   *
   * - `delete` — Delete
   * - `detach` — Detach
   *
   * Only meaningful when: `type = deploymentStack`
   *
   * In group: DeploymentStack
   */
  "actionOnUnmanageResourceGroups"?: "delete" | "detach";
  /**
   * Action on unmanaged management groups
   *
   * Specifies the action to take on management groups not defined in the template.
   *
   * - `delete` — Delete
   * - `detach` — Detach
   *
   * Only meaningful when: `type = deploymentStack`
   *
   * In group: DeploymentStack
   */
  "actionOnUnmanageManagementGroups"?: "delete" | "detach";
  /**
   * Deny settings mode
   *
   * Specifies the mode of the deny settings to prevent unauthorized changes.
   *
   * - `none` — None
   * - `denyDelete` — Deny Delete
   * - `denyWriteAndDelete` — Deny Write and Delete
   *
   * @default none
   *
   * Only meaningful when: `type = deploymentStack`
   *
   * In group: DeploymentStack
   */
  "denySettingsMode"?: "none" | "denyDelete" | "denyWriteAndDelete";
  /**
   * Deny settings excluded actions
   *
   * Comma-separated list of actions to exclude from deny settings.
   *
   * Only meaningful when: `type = deploymentStack && denySettingsMode != none`
   *
   * In group: DeploymentStack
   */
  "denySettingsExcludedActions"?: string;
  /**
   * Deny settings excluded principals
   *
   * Comma-separated list of principal IDs to exclude from deny settings.
   *
   * Only meaningful when: `type = deploymentStack && denySettingsMode != none`
   *
   * In group: DeploymentStack
   */
  "denySettingsExcludedPrincipals"?: string;
  /**
   * Apply deny settings to child scopes
   *
   * When enabled, deny settings also apply to child scopes of managed resources.
   *
   * @default false
   *
   * Only meaningful when: `type = deploymentStack && denySettingsMode != none`
   *
   * In group: DeploymentStack
   */
  "denySettingsApplyToChildScopes"?: boolean;
  /**
   * Bypass stack out of sync error
   *
   * Bypass errors when the deployment stack is out of sync.
   *
   * @default false
   *
   * Only meaningful when: `type = deploymentStack`
   *
   * In group: DeploymentStack
   */
  "bypassStackOutOfSyncError"?: boolean;
  /**
   * Description
   *
   * Description for the deployment or deployment stack.
   *
   * In group: Advanced
   */
  "description"?: string;
  /**
   * Tags
   *
   * Tags as JSON or YAML object. Example: {"Environment": "Development", "Owner": "TeamName"}
   *
   * Only meaningful when: `type = deploymentStack`
   *
   * In group: Advanced
   */
  "tags"?: string;
  /**
   * Bicep version
   *
   * Specify the version of Bicep to use (e.g., '0.38.5'). If not provided, the latest version
   * will be used.
   *
   * In group: Advanced
   */
  "bicepVersion"?: string;
  /**
   * Masked outputs
   *
   * Comma-separated list of output names to mask values for (e.g., secrets).
   *
   * In group: Advanced
   */
  "maskedOutputs"?: string;
  /**
   * Azure environment
   *
   * Specifies the Azure environment to use.
   *
   * - `azureCloud` — Azure Cloud
   * - `azureChinaCloud` — Azure China Cloud
   * - `azureGermanCloud` — Azure German Cloud
   * - `azureUSGovernment` — Azure US Government
   *
   * @default azureCloud
   *
   * In group: Advanced
   */
  "environment"?: "azureCloud" | "azureChinaCloud" | "azureGermanCloud" | "azureUSGovernment";
  /**
   * What-If exclude change types
   *
   * Comma-separated list of change types to exclude from What-If operation (e.g., noChange,
   * ignore).
   *
   * Only meaningful when: `operation = whatIf`
   *
   * In group: Advanced
   */
  "whatIfExcludeChangeTypes"?: string;
  /**
   * Validation level
   *
   * Validation level for deployment operations.
   *
   * - `provider` — Provider
   * - `template` — Template
   * - `providerNoRbac` — Provider (No RBAC)
   *
   * Only meaningful when: `type = deployment && (operation = validate || operation = whatIf)`
   *
   * In group: Advanced
   */
  "validationLevel"?: "provider" | "template" | "providerNoRbac";
}

/**
 * Bicep Deploy
 *
 * Deploy and Manage Azure Resources using Bicep Files
 *
 * [Learn more about this task](https://aka.ms/bicepdeploytaskreadme)
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/BicepDeployV0
 */
export function bicepDeployV0(
  inputs: BicepDeployV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("BicepDeploy@0", inputs as unknown as Record<string, unknown>, opts);
}
