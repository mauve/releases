/* eslint-disable */
// Auto-generated from AzureFunctionOnKubernetesV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection, dockerregistryConnection, kubernetesConnection } from '../connections.js';

export interface AzureFunctionOnKubernetesV1Inputs {
  /**
   * Service connection type
   *
   * Select a Kubernetes service connection type.
   *
   * - `Azure Resource Manager` — Azure Resource Manager
   * - `Kubernetes Service Connection` — Kubernetes Service Connection
   *
   * @default Kubernetes Service Connection
   *
   * In group: serviceConnections
   */
  "connectionType": "Azure Resource Manager" | "Kubernetes Service Connection";
  /**
   * Docker registry service connection
   *
   * Select a Docker registry service connection.
   *
   * In group: serviceConnections
   */
  "dockerRegistryServiceConnection": dockerregistryConnection;
  /**
   * Kubernetes service connection
   *
   * Select a Kubernetes service connection.
   *
   * Only meaningful when: `connectionType = Kubernetes Service Connection`
   *
   * In group: serviceConnections
   */
  "kubernetesServiceEndpoint"?: kubernetesConnection;
  /**
   * Azure subscription
   *
   * Select the Azure Resource Manager subscription, which contains Azure Container
   * Registry.Note: To configure new service connection, select the Azure subscription from the
   * list and click 'Authorize'. If your subscription is not listed or if you want to use an
   * existing Service Principal, you can setup an Azure service connection using 'Add' or
   * 'Manage' button.
   *
   * Only meaningful when: `connectionType = Azure Resource Manager`
   *
   * In group: serviceConnections
   */
  "azureSubscriptionEndpoint"?: AzureRMConnection;
  /**
   * Resource group
   *
   * Select an Azure resource group.
   *
   * Only meaningful when: `connectionType = Azure Resource Manager`
   *
   * In group: serviceConnections
   */
  "azureResourceGroup"?: string;
  /**
   * Kubernetes cluster
   *
   * Select an Azure managed cluster.
   *
   * Only meaningful when: `connectionType = Azure Resource Manager`
   *
   * In group: serviceConnections
   */
  "kubernetesCluster"?: string;
  /**
   * Kubernetes namespace
   *
   * Kubernetes namespace
   *
   * In group: commands
   */
  "namespace"?: string;
  /**
   * Secret Name
   *
   * Kubernetes secret containing function config data (for ex. AzureWebJobsStorage: <Azure
   * storage connection string>)
   *
   * In group: commands
   */
  "secretName"?: string;
  /**
   * Docker Hub namespace
   *
   * Docker Hub namespace. Required for private Docker Hub repository.
   *
   * In group: commands
   */
  "dockerHubNamespace"?: string;
  /**
   * Application Name
   *
   * Application Name. The Kubernetes objects created use this name. This should follow
   * Kubernetes naming conventions for resource names.
   *
   * In group: commands
   */
  "appName": string;
  /**
   * Function root directory
   *
   * Function root directory. Should contain host.json. Docker build and push is performed from
   * this directory.
   *
   * In group: commands
   */
  "functionRootDirectory"?: string;
  /**
   * Wait for stability
   *
   * Wait for the Kubernetes objects to reach the desired state.
   *
   * @default true
   *
   * In group: commands
   */
  "waitForStability"?: boolean;
  /**
   * Arguments
   *
   * Pass arguments to command. Ex:<br>--no-docker --service-type NodePort
   *
   * In group: commands
   */
  "arguments"?: string;
}

/**
 * Azure Function on Kubernetes
 *
 * Deploy Azure function to Kubernetes cluster.
 *
 * [Learn more about this task](https://aka.ms/func-k8s) or [see Azure Functions on Kubernetes
 * with KEDA](https://docs.microsoft.com/en-us/azure/azure-functions/functions-kubernetes-keda)
 * or [check out
 * sample-hello-world-azure-functions](https://github.com/kedacore/sample-hello-world-azure-functions)
 *
 * @see https://aka.ms/func-k8s
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureFunctionOnKubernetesV1
 */
export function azureFunctionOnKubernetesV1(
  inputs: AzureFunctionOnKubernetesV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureFunctionOnKubernetes@1", inputs as unknown as Record<string, unknown>, opts);
}
