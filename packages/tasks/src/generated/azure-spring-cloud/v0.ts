/* eslint-disable */
// Auto-generated from AzureSpringCloudV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureSpringCloudV0Inputs {
  /**
   * Azure subscription
   *
   * Select the Azure Resource Manager subscription for the deployment.
   */
  "ConnectedServiceName": AzureRMConnection;
  /**
   * Action
   *
   * Action to be performed on Azure Spring Apps.
   *
   * - `Deploy` — Deploy
   * - `Set Production` — Set Production Deployment
   * - `Delete Staging Deployment` — Delete Staging Deployment
   *
   * @default Deploy
   */
  "Action": "Deploy" | "Set Production" | "Delete Staging Deployment";
  /**
   * Azure Spring Apps Name
   *
   * Select the Azure Spring Apps service to which to deploy.
   */
  "AzureSpringCloud": string;
  /**
   * App
   *
   * Select the Azure Spring Apps app to deploy.
   */
  "AppName": string;
  /**
   * Deployment Type
   *
   * To deploy with source code or Java package, choose "Artifacts"; To deploy with container
   * image, choose "Custom Container"
   *
   * - `Artifacts` — Artifacts
   * - `CustomContainer` — Custom Container
   *
   * @default Artifacts
   *
   * Only meaningful when: `Action = Deploy`
   */
  "DeploymentType"?: "Artifacts" | "CustomContainer";
  /**
   * Use Staging Deployment
   *
   * Automatically select the deployment that's set as Staging at the time the task runs.
   *
   * @default true
   *
   * Only meaningful when: `Action = Deploy || Action = Set Production`
   */
  "UseStagingDeployment"?: boolean;
  /**
   * Create a new staging deployment if one does not exist.
   *
   * Whether to target the deployment that's set as Staging at the time of execution. If
   * unchecked, the 'Deployment Name' setting must be set.
   *
   * @default false
   *
   * Only meaningful when: `Action = Deploy && UseStagingDeployment = false`
   */
  "CreateNewDeployment"?: boolean;
  /**
   * Deployment
   *
   * The deployment to which this task will apply. Lowercase letters and numbers only; must start
   * with a letter.
   *
   * Only meaningful when: `UseStagingDeployment = false && Action != Delete Staging Deployment`
   */
  "DeploymentName"?: string;
  /**
   * Package or folder
   *
   * File path to the package or a folder containing the Spring Apps app contents.<br />Variables
   * ( [Build](https://docs.microsoft.com/vsts/pipelines/build/variables) |
   * [Release](https://docs.microsoft.com/vsts/pipelines/release/variables#default-variables)),
   * wildcards are supported. <br/> For example, $(System.DefaultWorkingDirectory)/\*\*​/\*.jar.
   *
   * @default $(System.DefaultWorkingDirectory)/**​/*.jar
   *
   * Only meaningful when: `Action = Deploy && DeploymentType = Artifacts`
   */
  "Package"?: string;
  /**
   * Builder
   *
   * Select a builder of VMware Tanzu® Build Service™, this can be used in enterprise tier. <br/>
   * For detailed description, please check [Use Tanzu Build
   * Service](https://docs.microsoft.com/en-us/azure/spring-apps/how-to-enterprise-build-service?tabs=azure-portal).
   *
   * Only meaningful when: `Action = Deploy && DeploymentType = Artifacts`
   *
   * In group: ApplicationAndConfigurationSettings
   */
  "Builder"?: string;
  /**
   * Registry Server
   *
   * The registry of the container image. Default: docker.io.
   *
   * @default docker.io
   *
   * Only meaningful when: `Action = Deploy && DeploymentType = CustomContainer`
   */
  "RegistryServer"?: string;
  /**
   * Registry Username
   *
   * The username of the container registry.
   *
   * Only meaningful when: `Action = Deploy && DeploymentType = CustomContainer`
   */
  "RegistryUsername"?: string;
  /**
   * Registry Password
   *
   * The password of the container registry.
   *
   * Only meaningful when: `Action = Deploy && DeploymentType = CustomContainer`
   */
  "RegistryPassword"?: string;
  /**
   * Image Name and Tag
   *
   * The container image tag.
   *
   * @default hello-world:v1
   *
   * Only meaningful when: `Action = Deploy && DeploymentType = CustomContainer`
   */
  "ImageName"?: string;
  /**
   * Image Command
   *
   * The command of the container image.
   *
   * Only meaningful when: `Action = Deploy && DeploymentType = CustomContainer`
   */
  "ImageCommand"?: string;
  /**
   * Image Arguments
   *
   * The arguments of the container image.
   *
   * Only meaningful when: `Action = Deploy && DeploymentType = CustomContainer`
   */
  "ImageArgs"?: string;
  /**
   * Language Framework
   *
   * - `springboot` — Springboot
   * - `` — Polyglot
   *
   * Only meaningful when: `Action = Deploy && DeploymentType = CustomContainer`
   */
  "ImageLanguageFramework"?: "springboot" | "";
  /**
   * Environment Variables
   *
   * Edit the app's environment variables.
   *
   * Only meaningful when: `Action = Deploy`
   *
   * In group: ApplicationAndConfigurationSettings
   */
  "EnvironmentVariables"?: string;
  /**
   * JVM Options
   *
   * Edit the app's JVM options. A String containing JVM Options. Example: `-Xms1024m -Xmx2048m`
   *
   * Only meaningful when: `Action = Deploy && DeploymentType = Artifacts`
   *
   * In group: ApplicationAndConfigurationSettings
   */
  "JvmOptions"?: string;
  /**
   * Runtime Version
   *
   * The runtime on which the app will run.
   *
   * - `Java_8` — Java 8
   * - `Java_11` — Java 11
   * - `Java_17` — Java 17
   * - `Java_21` — Java 21
   * - `NetCore_31` — .Net Core 3.1
   *
   * @default Java_11
   *
   * Only meaningful when: `Action = Deploy && DeploymentType = Artifacts`
   *
   * In group: ApplicationAndConfigurationSettings
   */
  "RuntimeVersion"?: "Java_8" | "Java_11" | "Java_17" | "Java_21" | "NetCore_31";
  /**
   * Main Entry Path
   *
   * The path to the .NET executable relative to zip root.
   *
   * Only meaningful when: `RuntimeVersion = NetCore_31`
   *
   * In group: ApplicationAndConfigurationSettings
   */
  "DotNetCoreMainEntryPath"?: string;
  /**
   * Version
   *
   * Only meaningful when: `Action = Deploy`
   *
   * In group: ApplicationAndConfigurationSettings
   */
  "Version"?: string;
}

/**
 * Azure Spring Apps
 *
 * Deploy applications to Azure Spring Apps and manage deployments.
 *
 * [Learn more about this
 * task](https://learn.microsoft.com/en-gb/azure/devops/pipelines/tasks/reference/azure-spring-cloud-v0?view=azure-pipelines)
 *
 * @see
 * https://learn.microsoft.com/en-gb/azure/devops/pipelines/tasks/reference/azure-spring-cloud-v0?view=azure-pipelines
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureSpringCloudV0
 */
export function azureSpringCloudV0(
  inputs: AzureSpringCloudV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureSpringCloud@0", inputs as unknown as Record<string, unknown>, opts);
}
