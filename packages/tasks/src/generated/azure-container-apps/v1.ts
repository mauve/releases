/* eslint-disable */
// Auto-generated from AzureContainerAppsV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureContainerAppsV1Inputs {
  /**
   * Working Directory
   *
   * Current working directory where the script is run. Empty is the root of the repo (build) or
   * artifacts (release), which is $(System.DefaultWorkingDirectory)
   *
   * In group: advanced
   */
  "cwd"?: string;
  /**
   * Application source path
   *
   * Absolute path on the runner of the source application code to be built. If not provided, the
   * 'imageToDeploy' argument must be provided to ensure the Container App has an image to
   * reference.
   */
  "appSourcePath"?: string;
  /**
   * Azure Resource Manager connection
   *
   * Select an Azure Resource Manager service connection for the deployment
   */
  "connectedServiceNameARM": AzureRMConnection;
  /**
   * Azure Container Registry name
   *
   * The name of the Azure Container Registry that the runnable application image will be pushed
   * to.
   */
  "acrName"?: string;
  /**
   * Azure Container Registry username
   *
   * The username used to authenticate push requests to the provided Azure Container Registry. If
   * not provided, an access token will be generated via 'az acr login' and provided to 'docker
   * login' to authenticate the requests.
   */
  "acrUsername"?: string;
  /**
   * Azure Container Registry password
   *
   * The password used to authenticate push requests to the provided Azure Container Registry. If
   * not provided, an access token will be generated via 'az acr login' and provided to 'docker
   * login' to authenticate the requests.
   */
  "acrPassword"?: string;
  /**
   * Dockerfile path
   *
   * Relative path to the Dockerfile in the provided application source that should be used to
   * build the image that is then pushed to ACR and deployed to the Container App. If not
   * provided, this task will check if there is a file named 'Dockerfile' at the root of the
   * provided application source and use that to build the image. Otherwise, the Oryx++ Builder
   * will be used to create the image.
   */
  "dockerfilePath"?: string;
  /**
   * Docker image to build
   *
   * The custom name of the image that is to be built, pushed to ACR and deployed to the
   * Container App by this task. Note: this image name should include the ACR server; e.g.,
   * <acr-name>.azurecr.io/<repo>:<tag>. If this argument is not provided, a default image name
   * will be constructed in the form of
   * `<acr-name>.azurecr.io/ado-task/container-app:<build-id>.<build-number>`.
   */
  "imageToBuild"?: string;
  /**
   * Docker image to deploy
   *
   * The custom name of the image that has already been pushed to ACR and will be deployed to the
   * Container App by this task. Note: the image name should include the ACR server; e.g.,
   * <acr-name>.azurecr.io/<repo>:<tag>. If this argument is not provided, the value provided (or
   * determined) for the 'imageToBuild' argument will be used.
   */
  "imageToDeploy"?: string;
  /**
   * Azure Container App name
   *
   * The name of the Azure Container App that will be created or updated. If not provided, this
   * value will be in the form of `ado-task-app-<build-id>-<build-number>`.
   */
  "containerAppName"?: string;
  /**
   * Azure resource group name
   *
   * The existing resource group that the Azure Container App will be created in. If not
   * provided, this value will be `<container-app-name>-rg` and its existence will first be
   * checked before attempting to create it.
   */
  "resourceGroup"?: string;
  /**
   * Azure Container App environment
   *
   * The name of the Azure Container App environment to use with the application. If not
   * provided, an existing environment in the resource group of the Container App will be used,
   * otherwise, an environment will be created in the form of `<container-app-name>-env`.
   */
  "containerAppEnvironment"?: string;
  /**
   * Application runtime stack
   *
   * The platform version stack that the application runs in when deployed to the Azure Container
   * App. This should be provided in the form of `<platform>:<version>`. If not provided, this
   * value is determined by Oryx based on the contents of the provided application. Please view
   * the following document for more information on the supported runtime stacks for Oryx:
   * https://github.com/microsoft/Oryx/blob/main/doc/supportedRuntimeVersions.md
   */
  "runtimeStack"?: string;
  /**
   * Container App kind
   *
   * Set to `functionapp` to get built in support and autoscaling to run Azure functions on Azure
   * Container apps.
   */
  "kind"?: string;
  /**
   * Application target port
   *
   * The designated port for the application to run on. If no value is provided and the builder
   * is used to build the runnable application image, the target port will be set to 80 for
   * Python applications and 8080 for all other platform applications. If no value is provided
   * when creating a Container App, the target port will default to 80. Note: when using this
   * task to update a Container App, the target port may be updated if not provided based on
   * changes to the ingress property.
   */
  "targetPort"?: string;
  /**
   * Location of the Container App
   *
   * The location that the Container App (and other created resources) will be deployed to.
   */
  "location"?: string;
  /**
   * Environment variables
   *
   * A list of environment variable(s) for the container. Space-separated values in 'key=value'
   * format. Empty string to clear existing values. Prefix value with 'secretref:' to reference a
   * secret.
   */
  "environmentVariables"?: string;
  /**
   * Ingress setting
   *
   * Possible options: external, internal, disabled. If set to `external` (default value if not
   * provided when creating a Container App), the Container App will be visible from the internet
   * or a VNET, depending on the app environment endpoint configured. If set to `internal`, the
   * Container App will be visible from within the app environment only. If set to `disabled`,
   * ingress will be disabled for this Container App and will not have an HTTP or TCP endpoint.
   */
  "ingress"?: string;
  /**
   * YAML configuration file path
   *
   * Full path (on the executing Azure Pipelines agent) to the YAML file detailing the
   * configuration of the Container App.
   */
  "yamlConfigPath"?: string;
  /**
   * Disable telemetry
   *
   * If set to 'true', no telemetry will be collected by this Azure DevOps Task. If set to
   * 'false', or if this argument is not provided, telemetry will be sent to Microsoft about the
   * Container App build and deploy scenario targeted by this Azure DevOps Task.
   */
  "disableTelemetry"?: boolean;
}

/**
 * Azure Container Apps Deploy
 *
 * An Azure DevOps Task to build and deploy Azure Container Apps.
 *
 * [Learn more about this
 * task](http://github.com/microsoft/azure-pipelines-tasks/blob/master/Tasks/AzureContainerAppsV1/README.md)
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureContainerAppsV1
 */
export function azureContainerAppsV1(
  inputs: AzureContainerAppsV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureContainerApps@1", inputs as unknown as Record<string, unknown>, opts);
}
