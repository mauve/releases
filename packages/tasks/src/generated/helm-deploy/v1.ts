/* eslint-disable */
// Auto-generated from HelmDeployV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection, kubernetesConnection } from '../connections.js';

export interface HelmDeployV1Inputs {
  /**
   * Connection Type
   *
   * Select 'Azure Resource Manager' to connect to an Azure Kubernetes Service by using Azure
   * Service Connection. Select 'Kubernetes Service Connection' to connect to any Kubernetes
   * cluster by using kubeconfig or Service Account
   *
   * - `Azure Resource Manager` — Azure Resource Manager
   * - `Kubernetes Service Connection` — Kubernetes Service Connection
   * - `None` — None
   *
   * @default Azure Resource Manager
   *
   * In group: cluster
   */
  "connectionType": "Azure Resource Manager" | "Kubernetes Service Connection" | "None";
  /**
   * Azure subscription
   *
   * Select an Azure subscription, which has your Azure Container Registry.
   *
   * Only meaningful when: `connectionType = Azure Resource Manager`
   *
   * In group: cluster
   */
  "azureSubscriptionEndpoint"?: AzureRMConnection;
  /**
   * Resource group
   *
   * Select an Azure Resource Group.
   *
   * Only meaningful when: `connectionType = Azure Resource Manager`
   *
   * In group: cluster
   */
  "azureResourceGroup"?: string;
  /**
   * Kubernetes cluster
   *
   * Select an Azure Managed Cluster.
   *
   * Only meaningful when: `connectionType = Azure Resource Manager`
   *
   * In group: cluster
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
   * In group: cluster
   */
  "useClusterAdmin"?: boolean;
  /**
   * Kubernetes Service Connection
   *
   * Select a Kubernetes service connection.
   *
   * Only meaningful when: `connectionType = Kubernetes Service Connection`
   *
   * In group: cluster
   */
  "kubernetesServiceEndpoint"?: kubernetesConnection;
  /**
   * Namespace
   *
   * Specify K8 namespace to use. Use Tiller namespace can be specified in the advanced section
   * of the task or by passing the --tiller-namespace option as argument.
   *
   * In group: cluster
   */
  "namespace"?: string;
  /**
   * Azure subscription for Container Registry
   *
   * Select an Azure subscription, which has your Azure Container Registry.
   *
   * In group: azureContainerRegistry
   */
  "azureSubscriptionEndpointForACR": AzureRMConnection;
  /**
   * Resource group
   *
   * Select an Azure Resource Group, which has your Container Registry.
   *
   * In group: azureContainerRegistry
   */
  "azureResourceGroupForACR": string;
  /**
   * Azure Container Registry
   *
   * Select an Azure Container Registry which will be used for pushing helm charts.
   *
   * In group: azureContainerRegistry
   */
  "azureContainerRegistry": string;
  /**
   * Command
   *
   * Select a helm command.
   *
   * - `create` — create
   * - `delete` — delete
   * - `expose` — expose
   * - `get` — get
   * - `init` — init
   * - `install` — install
   * - `login` — login
   * - `logout` — logout
   * - `ls` — ls
   * - `push` — push
   * - `package` — package
   * - `rollback` — rollback
   * - `upgrade` — upgrade
   * - `uninstall` — uninstall
   *
   * @default ls
   *
   * In group: commands
   */
  "command": "create" | "delete" | "expose" | "get" | "init" | "install" | "login" | "logout" | "ls" | "push" | "package" | "rollback" | "upgrade" | "uninstall";
  /**
   * Chart Type
   *
   * Select how you want to enter chart info. You can either provide name of the chart or
   * folder/file path to the chart.
   *
   * - `Name` — Name
   * - `FilePath` — File Path
   *
   * @default Name
   *
   * Only meaningful when: `command == install || command == upgrade`
   *
   * In group: commands
   */
  "chartType"?: "Name" | "FilePath";
  /**
   * Chart Name
   *
   * Chart reference to install, this can be a url or a chart name. For example, if chart name is
   * 'stable/mysql', the task will run 'helm install stable/mysql'.
   *
   * Only meaningful when: `chartType == Name || command == create`
   *
   * In group: commands
   */
  "chartName"?: string;
  /**
   * Chart Path
   *
   * Path to the chart to install. This can be a path to a packaged chart or a path to an
   * unpacked chart directory. For example, if './redis' is specified the task will run 'helm
   * install ./redis'.
   *
   * Only meaningful when: `chartType == FilePath || command == package || command == push`
   *
   * In group: commands
   */
  "chartPath"?: string;
  /**
   * Remote Repo
   *
   * The remote repository where the chart will be pushed.
   *
   * Only meaningful when: `command == push`
   *
   * In group: commands
   */
  "remoteRepo"?: string;
  /**
   * Version
   *
   * Specify the exact chart version to install. If this is not specified, the latest version is
   * installed. Set the version on the chart to this semver version​
   *
   * Only meaningful when: `command == package || command == install || command == upgrade`
   *
   * In group: commands
   */
  "version"?: string;
  /**
   * Release Name
   *
   * Release name. If unspecified, it will autogenerate one for you.
   *
   * Only meaningful when: `command == install || command == upgrade || command == rollback ||
   * command == uninstall || command == delete`
   *
   * In group: commands
   */
  "releaseName"?: string;
  /**
   * Set Values
   *
   * Set values on the command line (can specify multiple or separate values with commas or
   * newlines: key1=val1,key2=val2 or <br>key1=val1<br>key2=val2<br>). The task will construct
   * the helm command by using these set values. For example, helm install --set key1=val1
   * ./redis.
   *
   * Only meaningful when: `command == install || command == upgrade`
   *
   * In group: commands
   */
  "overrideValues"?: string;
  /**
   * Value File
   *
   * Specify values in a YAML file or a URL. For example, specifying myvalues.yaml will result in
   * 'helm install --values=myvals.yaml'.
   *
   * Only meaningful when: `command == install || command == upgrade`
   *
   * In group: commands
   */
  "valueFile"?: string;
  /**
   * Destination
   *
   * Specify values in a YAML file or a URL.
   *
   * @default $(Build.ArtifactStagingDirectory)
   *
   * Only meaningful when: `command == package`
   *
   * In group: commands
   */
  "destination"?: string;
  /**
   * Use canary image version.
   *
   * Use the canary Tiller image, the latest pre-release version of Tiller.
   *
   * @default false
   *
   * Only meaningful when: `command == init`
   *
   * In group: commands
   */
  "canaryimage"?: boolean;
  /**
   * Upgrade Tiller
   *
   * Upgrade if Tiller is already installed.
   *
   * @default true
   *
   * Only meaningful when: `command == init`
   *
   * In group: commands
   */
  "upgradetiller"?: boolean;
  /**
   * Update Dependency
   *
   * Run helm dependency update before installing the chart. Update dependencies from
   * 'requirements.yaml' to dir 'charts/' before packaging
   *
   * @default false
   *
   * Only meaningful when: `command == install || command == package`
   *
   * In group: commands
   */
  "updatedependency"?: boolean;
  /**
   * Save
   *
   * Save packaged chart to local chart repository (default true)​
   *
   * @default true
   *
   * Only meaningful when: `command == package`
   *
   * In group: commands
   */
  "save"?: boolean;
  /**
   * Install if release not present.
   *
   * If a release by this name doesn't already exist, run an install​.
   *
   * @default true
   *
   * Only meaningful when: `command == upgrade`
   *
   * In group: commands
   */
  "install"?: boolean;
  /**
   * Recreate Pods.
   *
   * Performs pods restart for the resource if applicable.
   *
   * @default false
   *
   * Only meaningful when: `command == upgrade`
   *
   * In group: commands
   */
  "recreate"?: boolean;
  /**
   * Reset Values.
   *
   * Reset the values to the ones built into the chart.
   *
   * @default false
   *
   * Only meaningful when: `command == upgrade`
   *
   * In group: commands
   */
  "resetValues"?: boolean;
  /**
   * Force
   *
   * Force resource update through delete/recreate if needed​
   *
   * @default false
   *
   * Only meaningful when: `command == upgrade`
   *
   * In group: commands
   */
  "force"?: boolean;
  /**
   * Wait
   *
   * Block till command execution completes.
   *
   * @default true
   *
   * Only meaningful when: `command == init || command == install || command == upgrade`
   *
   * In group: commands
   */
  "waitForExecution"?: boolean;
  /**
   * Arguments
   *
   * Helm command options.
   *
   * Only meaningful when: `command != login && command != logout`
   *
   * In group: commands
   */
  "arguments"?: string;
  /**
   * Enable TLS
   *
   * Enables using SSL between Helm and Tiller.
   *
   * @default false
   *
   * In group: tls
   */
  "enableTls"?: boolean;
  /**
   * CA certificate
   *
   * CA cert used to issue certificate for tiller and helm client.
   *
   * Only meaningful when: `enableTls == true`
   *
   * In group: tls
   */
  "caCert"?: string;
  /**
   * Certificate
   *
   * Specify Tiller certificate or Helm client certificate
   *
   * Only meaningful when: `enableTls == true`
   *
   * In group: tls
   */
  "certificate"?: string;
  /**
   * Key
   *
   * Specify Tiller Key or Helm client key
   *
   * Only meaningful when: `enableTls == true`
   *
   * In group: tls
   */
  "privatekey"?: string;
  /**
   * Tiller namespace
   *
   * Specify K8 namespace of tiller.
   *
   * In group: advanced
   */
  "tillernamespace"?: string;
  /**
   * Fail on Standard Error
   *
   * If this is true, this task will fail if any errors are written to the error pipeline, or if
   * any data is written to the Standard Error stream. Otherwise the task will rely on the exit
   * code to determine failure.
   *
   * @default false
   *
   * In group: advanced
   */
  "failOnStderr"?: boolean;
  /**
   * Publish pipeline metadata
   *
   * If this is true, the task will collect and publish deployment metadata
   *
   * @default true
   *
   * In group: advanced
   */
  "publishPipelineMetadata"?: boolean;
  /**
   * Chart Name For Azure Container Registry
   *
   * Chart name with which the chart will be stored in Azure Container Registry.
   *
   * Only meaningful when: `command == package || command == push`
   *
   * In group: commands
   */
  "chartNameForACR"?: string;
  /**
   * Chart Path for Azure Container Registry
   *
   * Path to the chart directory.
   *
   * Only meaningful when: `command == package || command == push`
   *
   * In group: commands
   */
  "chartPathForACR"?: string;
}

/**
 * Package and deploy Helm charts
 *
 * Deploy, configure, update a Kubernetes cluster in Azure Container Service by running helm
 * commands
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=851275) or [see the
 * Helm documentation](https://helm.sh/docs/)
 *
 * @see https://aka.ms/azpipes-helm-tsg
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/HelmDeployV1
 */
export function helmDeployV1(
  inputs: HelmDeployV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("HelmDeploy@1", inputs as unknown as Record<string, unknown>, opts);
}
