/* eslint-disable */
// Auto-generated from KubernetesV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection, dockerregistryConnection, kubernetesConnection } from '../connections.js';

export interface KubernetesV1Inputs {
  /**
   * Service connection type
   *
   * Select a service connection type.
   *
   * - `Azure Resource Manager` — Azure Resource Manager
   * - `Kubernetes Service Connection` — Kubernetes Service Connection
   * - `None` — None
   *
   * @default Kubernetes Service Connection
   *
   * In group: kubernetesCluster
   */
  "connectionType": "Azure Resource Manager" | "Kubernetes Service Connection" | "None";
  /**
   * Kubernetes service connection
   *
   * Select a Kubernetes service connection.
   *
   * Only meaningful when: `connectionType = Kubernetes Service Connection`
   *
   * In group: kubernetesCluster
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
   * In group: kubernetesCluster
   */
  "azureSubscriptionEndpoint"?: AzureRMConnection;
  /**
   * Resource group
   *
   * Select an Azure resource group.
   *
   * Only meaningful when: `connectionType = Azure Resource Manager`
   *
   * In group: kubernetesCluster
   */
  "azureResourceGroup"?: string;
  /**
   * Kubernetes cluster
   *
   * Select an Azure managed cluster.
   *
   * Only meaningful when: `connectionType = Azure Resource Manager`
   *
   * In group: kubernetesCluster
   */
  "kubernetesCluster"?: string;
  /**
   * Use cluster admin credentials
   *
   * Use cluster administrator credentials instead of default cluster user credentials.
   *
   * @default false
   *
   * Only meaningful when: `connectionType = Azure Resource Manager`
   *
   * In group: kubernetesCluster
   */
  "useClusterAdmin"?: boolean;
  /**
   * Namespace
   *
   * Set the namespace for the kubectl command by using the –namespace flag. If the namespace is
   * not provided, the commands will run in the default namespace.
   *
   * In group: kubernetesCluster
   */
  "namespace"?: string;
  /**
   * Command
   *
   * Select or specify a kubectl command to run.
   *
   * - `apply` — apply
   * - `create` — create
   * - `delete` — delete
   * - `exec` — exec
   * - `expose` — expose
   * - `get` — get
   * - `login` — login
   * - `logout` — logout
   * - `logs` — logs
   * - `rollout` — rollout
   * - `run` — run
   * - `set` — set
   * - `top` — top
   *
   * In group: commands
   */
  "command"?: "apply" | "create" | "delete" | "exec" | "expose" | "get" | "login" | "logout" | "logs" | "rollout" | "run" | "set" | "top";
  /**
   * Use configuration
   *
   * Use Kubernetes configuration with the kubectl command. An inline script, filename,
   * directory, or URL to Kubernetes configuration files can be provided.
   *
   * @default false
   *
   * Only meaningful when: `command != login && command != logout`
   *
   * In group: commands
   */
  "useConfigurationFile"?: boolean;
  /**
   * Configuration type
   *
   * Type of Kubernetes configuration for kubectl command. It can be a file path or an inline
   * script.
   *
   * - `configuration` — File path
   * - `inline` — Inline configuration
   *
   * @default configuration
   *
   * Only meaningful when: `useConfigurationFile = true`
   *
   * In group: commands
   */
  "configurationType"?: "configuration" | "inline";
  /**
   * File path
   *
   * Filename, directory, or URL to kubernetes configuration files that will be used with the
   * commands.
   *
   * Only meaningful when: `configurationType = configuration`
   *
   * In group: commands
   */
  "configuration"?: string;
  /**
   * Inline configuration
   *
   * Inline deployment configuration for kubectl command
   *
   * Only meaningful when: `configurationType = inline`
   *
   * In group: commands
   */
  "inline"?: string;
  /**
   * Arguments
   *
   * Arguments to the specified kubectl command.
   *
   * Only meaningful when: `command != login && command != logout`
   *
   * In group: commands
   */
  "arguments"?: string;
  /**
   * Type of secret
   *
   * Create/update a generic or docker imagepullsecret. Select dockerRegistry to create/update
   * the imagepullsecret of the selected registry. An imagePullSecret is a way to pass a secret
   * that contains a container registry password to the Kubelet so it can pull a private image on
   * behalf of your Pod.
   *
   * - `dockerRegistry` — dockerRegistry
   * - `generic` — generic
   *
   * @default dockerRegistry
   *
   * In group: secrets
   */
  "secretType": "dockerRegistry" | "generic";
  /**
   * Arguments
   *
   * Specify keys and literal values to insert in secret.For example, --from-literal=key1=value1
   * --from-literal=key2="top secret".
   *
   * Only meaningful when: `secretType = generic`
   *
   * In group: secrets
   */
  "secretArguments"?: string;
  /**
   * Container registry type
   *
   * Select a Container registry type. The task can use Azure Subscription details to work with
   * an Azure Container registry. Other standard Container registries are also supported.
   *
   * - `Azure Container Registry` — Azure Container Registry
   * - `Container Registry` — Container Registry
   *
   * @default Azure Container Registry
   *
   * Only meaningful when: `secretType = dockerRegistry`
   *
   * In group: secrets
   */
  "containerRegistryType"?: "Azure Container Registry" | "Container Registry";
  /**
   * Docker registry service connection
   *
   * Select a Docker registry service connection. Required for commands that need to authenticate
   * with a registry.
   *
   * Only meaningful when: `secretType = dockerRegistry && containerRegistryType = Container
   * Registry`
   *
   * In group: secrets
   */
  "dockerRegistryEndpoint"?: dockerregistryConnection;
  /**
   * Azure subscription
   *
   * Select the Azure Resource Manager subscription, which contains Azure Container Registry.
   * Note: To configure new service connection, select the Azure subscription from the list and
   * click 'Authorize'. If your subscription is not listed or if you want to use an existing
   * Service Principal, you can setup an Azure service connection using 'Add' or 'Manage' button.
   *
   * Only meaningful when: `secretType = dockerRegistry && containerRegistryType = Azure
   * Container Registry`
   *
   * In group: secrets
   */
  "azureSubscriptionEndpointForSecrets"?: AzureRMConnection;
  /**
   * Azure container registry
   *
   * Select an Azure Container Registry which will be used for pulling container images and
   * deploying applications to the Kubernetes cluster. Required for commands that need to
   * authenticate with a registry.
   *
   * Only meaningful when: `secretType = dockerRegistry && containerRegistryType = Azure
   * Container Registry`
   *
   * In group: secrets
   */
  "azureContainerRegistry"?: string;
  /**
   * Secret name
   *
   * Name of the secret. You can use this secret name in the Kubernetes YAML configuration file.
   *
   * In group: secrets
   */
  "secretName"?: string;
  /**
   * Force update secret
   *
   * Delete the secret if it exists and create a new one with updated values.
   *
   * @default true
   *
   * In group: secrets
   */
  "forceUpdate"?: boolean;
  /**
   * ConfigMap name
   *
   * ConfigMaps allow you to decouple configuration artifacts from image content to keep
   * containerized applications portable.
   *
   * In group: configMaps
   */
  "configMapName"?: string;
  /**
   * Force update configmap
   *
   * Delete the configmap if it exists and create a new one with updated values.
   *
   * @default false
   *
   * In group: configMaps
   */
  "forceUpdateConfigMap"?: boolean;
  /**
   * Use file
   *
   * Create a ConfigMap from an individual file, or from multiple files by specifying a
   * directory.
   *
   * @default false
   *
   * In group: configMaps
   */
  "useConfigMapFile"?: boolean;
  /**
   * ConfigMap file
   *
   * Specify a file or directory that contains the configMaps
   *
   * Only meaningful when: `useConfigMapFile = true`
   *
   * In group: configMaps
   */
  "configMapFile"?: string;
  /**
   * Arguments
   *
   * Specify keys and literal values to insert in configMap.For example,
   * --from-literal=key1=value1 --from-literal=key2="top secret".
   *
   * Only meaningful when: `useConfigMapFile = false`
   *
   * In group: configMaps
   */
  "configMapArguments"?: string;
  /**
   * Kubectl
   *
   * kubectl is a command line interface for running commands against Kubernetes clusters.
   *
   * - `version` — Version
   * - `location` — Specify location
   *
   * @default version
   *
   * In group: advanced
   */
  "versionOrLocation"?: "version" | "location";
  /**
   * Version spec
   *
   * Version Spec of version to get. Examples: 1.7.0, 1.x.0, 4.x.0, 6.10.0
   *
   * @default 1.13.2
   *
   * Only meaningful when: `versionOrLocation = version`
   *
   * In group: advanced
   */
  "versionSpec"?: string;
  /**
   * Check for latest version
   *
   * Always checks online for the latest available version (stable.txt) that satisfies the
   * version spec. This is typically false unless you have a specific scenario to always get
   * latest. This will cause it to incur download costs when potentially not necessary,
   * especially with the hosted build pool.
   *
   * @default false
   *
   * Only meaningful when: `versionOrLocation = version`
   *
   * In group: advanced
   */
  "checkLatest"?: boolean;
  /**
   * Path to kubectl
   *
   * Full path to the kubectl.exe
   *
   * Only meaningful when: `versionOrLocation = location`
   *
   * In group: advanced
   */
  "specifyLocation"?: string;
  /**
   * Working directory
   *
   * Working directory for the Kubectl command.
   *
   * @default $(System.DefaultWorkingDirectory)
   *
   * In group: advanced
   */
  "cwd"?: string;
  /**
   * Output format
   *
   * Output format.
   *
   * - `json` — json
   * - `yaml` — yaml
   * - `none` — none
   *
   * @default json
   *
   * In group: advanced
   */
  "outputFormat"?: "json" | "yaml" | "none";
}

/**
 * Kubectl
 *
 * Deploy, configure, update a Kubernetes cluster in Azure Container Service by running kubectl
 * commands
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=851275) or [see the
 * Kubernetes documentation](https://kubernetes.io/docs/home/)
 *
 * @see https://aka.ms/azpipes-kubectl-tsg
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/KubernetesV1
 */
export function kubernetesV1(
  inputs: KubernetesV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Kubernetes@1", inputs as unknown as Record<string, unknown>, opts);
}
