/* eslint-disable */
// Auto-generated from KubernetesManifestV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection, dockerregistryConnection, kubernetesConnection } from '../connections.js';

export interface KubernetesManifestV1Inputs {
  /**
   * Action
   *
   * Choose the action to be performed.
   *
   * - `bake` — bake
   * - `createSecret` — create secret
   * - `delete` — delete
   * - `deploy` — deploy
   * - `patch` — patch
   * - `promote` — promote
   * - `scale` — scale
   * - `reject` — reject
   *
   * @default deploy
   */
  "action"?: "bake" | "createSecret" | "delete" | "deploy" | "patch" | "promote" | "scale" | "reject";
  /**
   * Service connection type
   *
   * Select a Kubernetes service connection type.
   *
   * - `azureResourceManager` — Azure Resource Manager
   * - `kubernetesServiceConnection` — Kubernetes Service Connection
   *
   * @default kubernetesServiceConnection
   *
   * Only meaningful when: `action != bake`
   */
  "connectionType"?: "azureResourceManager" | "kubernetesServiceConnection";
  /**
   * Kubernetes service connection
   *
   * Select a Kubernetes service connection.
   *
   * Only meaningful when: `action != bake && connectionType = kubernetesServiceConnection`
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
   * Only meaningful when: `action != bake && connectionType = azureResourceManager`
   */
  "azureSubscriptionEndpoint"?: AzureRMConnection;
  /**
   * Resource group
   *
   * Select an Azure resource group.
   *
   * Only meaningful when: `action != bake && connectionType = azureResourceManager`
   */
  "azureResourceGroup"?: string;
  /**
   * Kubernetes cluster
   *
   * Select an Azure managed cluster.
   *
   * Only meaningful when: `action != bake && connectionType = azureResourceManager`
   */
  "kubernetesCluster"?: string;
  /**
   * Use cluster admin credentials
   *
   * Use cluster administrator credentials instead of default cluster user credentials.
   *
   * @default false
   *
   * Only meaningful when: `connectionType = azureResourceManager`
   */
  "useClusterAdmin"?: boolean;
  /**
   * Namespace
   *
   * Sets the namespace for the commands by using the –namespace flag. If the namespace is not
   * provided, the commands will run in the default namespace.
   */
  "namespace"?: string;
  /**
   * Strategy
   *
   * Deployment strategy to be used
   *
   * - `canary` — Canary
   * - `none` — None
   *
   * @default none
   *
   * Only meaningful when: `action = deploy || action = promote || action = reject`
   */
  "strategy"?: "canary" | "none";
  /**
   * Traffic split method
   *
   * Traffic split method to be used
   *
   * - `pod` — Pod
   * - `smi` — SMI
   *
   * @default pod
   *
   * Only meaningful when: `strategy = canary`
   */
  "trafficSplitMethod"?: "pod" | "smi";
  /**
   * Percentage
   *
   * Percentage of traffic redirect to canary deployment
   *
   * @default 0
   *
   * Only meaningful when: `strategy = Canary && action = deploy`
   */
  "percentage"?: string;
  /**
   * Baseline and canary replicas
   *
   * Baseline and canary replicas count
   *
   * @default 1
   *
   * Only meaningful when: `strategy = Canary && action = deploy && trafficSplitMethod = SMI`
   */
  "baselineAndCanaryReplicas"?: string;
  /**
   * Manifests
   *
   * Manifests to deploy
   *
   * Only meaningful when: `action = deploy || action = promote || action = reject`
   */
  "manifests"?: string;
  /**
   * Containers
   *
   * Containers
   *
   * Only meaningful when: `action = deploy || action = promote || action = bake`
   */
  "containers"?: string;
  /**
   * ImagePullSecrets
   *
   * ImagePullSecret to pull image from private registry
   *
   * Only meaningful when: `action = deploy || action = promote`
   */
  "imagePullSecrets"?: string;
  /**
   * Render Engine
   *
   * Tool to use for generating manifest files.
   *
   * - `helm` — Helm
   * - `kompose` — Kompose
   * - `kustomize` — Kustomize
   *
   * @default helm
   *
   * Only meaningful when: `action = bake`
   */
  "renderType"?: "helm" | "kompose" | "kustomize";
  /**
   * Path to docker compose file
   *
   * docker-compose file path
   *
   * Only meaningful when: `action = bake && renderType = kompose`
   */
  "dockerComposeFile"?: string;
  /**
   * Helm Chart
   *
   * Helm chart path to bake
   *
   * Only meaningful when: `action = bake && renderType = helm`
   */
  "helmChart"?: string;
  /**
   * Helm Release Name
   *
   * Helm release name to use
   *
   * Only meaningful when: `action = bake && renderType = helm`
   */
  "releaseName"?: string;
  /**
   * Override Files
   *
   * Override files to set
   *
   * Only meaningful when: `action = bake && renderType = helm`
   */
  "overrideFiles"?: string;
  /**
   * Overrides
   *
   * Override values to set
   *
   * Only meaningful when: `action = bake && renderType = helm`
   */
  "overrides"?: string;
  /**
   * Kustomization Path
   *
   * The argument must be the path to the directory containing the file, or a git repository URL
   * with a path suffix specifying same with respect to the repository root.
   *
   * Only meaningful when: `action = bake && renderType = kustomize`
   */
  "kustomizationPath"?: string;
  /**
   * Resource to patch
   *
   * to identify the resource
   *
   * - `file` — file
   * - `name` — name
   *
   * @default file
   *
   * Only meaningful when: `action = patch`
   */
  "resourceToPatch"?: "file" | "name";
  /**
   * File path
   *
   * Path to the file used for patch
   *
   * Only meaningful when: `action = patch && resourceToPatch = file`
   */
  "resourceFileToPatch"?: string;
  /**
   * Kind
   *
   * Kind of K8s object; deployment, replicaSet etc.
   *
   * - `deployment` — deployment
   * - `replicaset` — replicaset
   * - `statefulset` — statefulset
   *
   * Only meaningful when: `action = scale || resourceToPatch = name`
   */
  "kind"?: "deployment" | "replicaset" | "statefulset";
  /**
   * Name
   *
   * Name of the k8s object
   *
   * Only meaningful when: `action = scale || resourceToPatch = name`
   */
  "name"?: string;
  /**
   * Replica count
   *
   * Number of replicas to scale to
   *
   * Only meaningful when: `action = scale`
   */
  "replicas"?: string;
  /**
   * Merge Strategy
   *
   * The type of patch being provided; one of [json merge strategic]
   *
   * - `json` — json
   * - `merge` — merge
   * - `strategic` — strategic
   *
   * @default strategic
   *
   * Only meaningful when: `action = patch`
   */
  "mergeStrategy"?: "json" | "merge" | "strategic";
  /**
   * Arguments
   *
   * Arguments for `kubectl delete` command
   *
   * Only meaningful when: `action = delete`
   */
  "arguments"?: string;
  /**
   * Patch
   *
   * Contents of patch
   *
   * Only meaningful when: `action = patch`
   */
  "patch"?: string;
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
   * Only meaningful when: `action = createSecret`
   */
  "secretType"?: "dockerRegistry" | "generic";
  /**
   * Secret name
   *
   * Name of the secret. You can use this secret name in the Kubernetes YAML configuration file.
   *
   * Only meaningful when: `action = createSecret`
   */
  "secretName"?: string;
  /**
   * Arguments
   *
   * Specify keys and literal values to insert in secret.For example, --from-literal=key1=value1
   * --from-literal=key2="top secret".
   *
   * Only meaningful when: `action = createSecret && secretType = generic`
   */
  "secretArguments"?: string;
  /**
   * Docker registry service connection
   *
   * Select a Docker registry service connection. Required for commands that need to authenticate
   * with a registry.
   *
   * Only meaningful when: `action = createSecret && secretType = dockerRegistry`
   */
  "dockerRegistryEndpoint"?: dockerregistryConnection;
  /**
   * Timeout for rollout status
   *
   * The length of time (in seconds) to wait before ending watch on rollout status
   *
   * @default 0
   *
   * Only meaningful when: `action = deploy || action = patch || action = scale || action =
   * promote`
   */
  "rolloutStatusTimeout"?: string;
  /**
   * Resource type
   *
   * The type of the resource (fleet, managed cluster)
   *
   * @default Microsoft.ContainerService/managedClusters
   *
   * Only meaningful when: `action = deploy`
   */
  "resourceType"?: string;
}

/**
 * Deploy to Kubernetes
 *
 * Use Kubernetes manifest files to deploy to clusters or even bake the manifest files to be
 * used for deployments using Helm charts
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=851275) or [see the
 * Kubernetes documentation](https://kubernetes.io/docs/home/)
 *
 * @see https://aka.ms/azpipes-k8s-manifest-tsg
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/KubernetesManifestV1
 */
export function kubernetesManifestV1(
  inputs: KubernetesManifestV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("KubernetesManifest@1", inputs as unknown as Record<string, unknown>, opts);
}
