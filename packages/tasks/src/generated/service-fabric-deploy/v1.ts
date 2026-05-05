/* eslint-disable */
// Auto-generated from ServiceFabricDeployV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection, dockerregistryConnection, servicefabricConnection } from '../connections.js';

export interface ServiceFabricDeployV1Inputs {
  /**
   * Application Package
   *
   * Path to the application package that is to be deployed.
   * [Variables](https://go.microsoft.com/fwlink/?LinkID=550988) and wildcards can be used in the
   * path.
   */
  "applicationPackagePath": string;
  /**
   * Cluster Service Connection
   *
   * Select an Azure Service Fabric service connection to be used to connect to the cluster. The
   * settings defined in this referenced service connection will override those defined in the
   * publish profile. Choose 'Manage' to register a new service connection.
   */
  "serviceConnectionName": servicefabricConnection;
  /**
   * Publish Profile
   *
   * Path to the publish profile file that defines the settings to use.
   * [Variables](https://go.microsoft.com/fwlink/?LinkID=550988) and wildcards can be used in the
   * path.
   */
  "publishProfilePath"?: string;
  /**
   * Application Parameters
   *
   * Path to the application parameters file.
   * [Variables](https://go.microsoft.com/fwlink/?LinkID=550988) and wildcards can be used in the
   * path. If specified, this will override the value in the publish profile.
   */
  "applicationParameterPath"?: string;
  /**
   * Override Application Parameters
   *
   * Variables defined in the build or release pipeline will be matched against the 'Parameter
   * Name' entries in the application manifest file.
   * Example: If your application has a parameter defined as below.
   * <Parameters>
   * <Parameter Name="SampleApp_PartitionCount" Value="1" />
   * <Parameter Name="SampleApp_InstanceCount" DefaultValue="-1" />
   * </Parameters>
   * and you want to change the partition count to 2, you can define a release pipeline or an
   * environment variable "SampleApp_PartitionCount" and its value as "2".
   *
   * Note: If same variables are defined in the release pipeline and in the environment, then the
   * environment variables will supersede the release pipeline variables.
   *
   * @default false
   */
  "overrideApplicationParameter"?: boolean;
  /**
   * Compress Package
   *
   * Indicates whether the application package should be compressed before copying to the image
   * store. If enabled, this will override the value in the publish profile.
   *
   * @default false
   */
  "compressPackage"?: boolean;
  /**
   * CopyPackageTimeoutSec
   *
   * Timeout in seconds for copying application package to image store. If specified, this will
   * override the value in the publish profile.
   */
  "copyPackageTimeoutSec"?: string;
  /**
   * RegisterPackageTimeoutSec
   *
   * Timeout in seconds for registering or un-registering application package.
   */
  "registerPackageTimeoutSec"?: string;
  /**
   * Overwrite Behavior
   *
   * Overwrite Behavior: when upgrade is not configured and an Application with same name already
   * exists in the cluster, then following actions are available => Never, Always,
   * SameAppTypeAndVersion.
   * Never will not remove the existing Application. This is the default behavior.
   * Always will remove the existing Application even if its Application type and Version is
   * different from the Application being created.
   * SameAppTypeAndVersion will remove the existing Application only if its Application type and
   * Version is same as the Application being created.
   *
   * - `Always` — Always
   * - `Never` — Never
   * - `SameAppTypeAndVersion` — SameAppTypeAndVersion
   *
   * @default SameAppTypeAndVersion
   */
  "overwriteBehavior": "Always" | "Never" | "SameAppTypeAndVersion";
  /**
   * Skip upgrade for same Type and Version
   *
   * Indicates whether an upgrade will be skipped if the same application type and version
   * already exists in the cluster, otherwise the upgrade fails during validation. If enabled,
   * re-deployments are idempotent.
   *
   * @default false
   */
  "skipUpgradeSameTypeAndVersion"?: boolean;
  /**
   * Skip package validation
   *
   * Indicates whether the package should be validated or not before deployment.
   *
   * @default false
   */
  "skipPackageValidation"?: boolean;
  /**
   * Use Diff Package
   *
   * Upgrade by using a diff package that contains only the updated application files, the
   * updated application manifest, and the service manifest files.
   *
   * @default false
   */
  "useDiffPackage"?: boolean;
  /**
   * Override All Publish Profile Upgrade Settings
   *
   * This will override all upgrade settings with either the values specified below or the
   * default value if not specified.
   *
   * @default false
   */
  "overridePublishProfileSettings"?: boolean;
  /**
   * Upgrade the Application
   *
   * @default true
   *
   * Only meaningful when: `overridePublishProfileSettings = true`
   */
  "isUpgrade"?: boolean;
  /**
   * Unregister Unused Versions
   *
   * Indicates whether all unused versions of the application type will be removed after an
   * upgrade.
   *
   * @default true
   */
  "unregisterUnusedVersions"?: boolean;
  /**
   * Upgrade Mode
   *
   * - `Monitored` — Monitored
   * - `UnmonitoredAuto` — UnmonitoredAuto
   * - `UnmonitoredManual` — UnmonitoredManual
   *
   * @default Monitored
   *
   * Only meaningful when: `overridePublishProfileSettings = true && isUpgrade = true`
   */
  "upgradeMode"?: "Monitored" | "UnmonitoredAuto" | "UnmonitoredManual";
  /**
   * FailureAction
   *
   * - `Rollback` — Rollback
   * - `Manual` — Manual
   *
   * @default Rollback
   *
   * Only meaningful when: `overridePublishProfileSettings = true && isUpgrade = true &&
   * upgradeMode = Monitored`
   */
  "FailureAction"?: "Rollback" | "Manual";
  /**
   * UpgradeReplicaSetCheckTimeoutSec
   *
   * Only meaningful when: `overridePublishProfileSettings = true && isUpgrade = true`
   */
  "UpgradeReplicaSetCheckTimeoutSec"?: string;
  /**
   * TimeoutSec
   *
   * Only meaningful when: `overridePublishProfileSettings = true && isUpgrade = true`
   */
  "TimeoutSec"?: string;
  /**
   * ForceRestart
   *
   * @default false
   *
   * Only meaningful when: `overridePublishProfileSettings = true && isUpgrade = true`
   */
  "ForceRestart"?: boolean;
  /**
   * HealthCheckRetryTimeoutSec
   *
   * Only meaningful when: `overridePublishProfileSettings = true && isUpgrade = true &&
   * upgradeMode = Monitored`
   */
  "HealthCheckRetryTimeoutSec"?: string;
  /**
   * HealthCheckWaitDurationSec
   *
   * Only meaningful when: `overridePublishProfileSettings = true && isUpgrade = true &&
   * upgradeMode = Monitored`
   */
  "HealthCheckWaitDurationSec"?: string;
  /**
   * HealthCheckStableDurationSec
   *
   * Only meaningful when: `overridePublishProfileSettings = true && isUpgrade = true &&
   * upgradeMode = Monitored`
   */
  "HealthCheckStableDurationSec"?: string;
  /**
   * UpgradeDomainTimeoutSec
   *
   * Only meaningful when: `overridePublishProfileSettings = true && isUpgrade = true &&
   * upgradeMode = Monitored`
   */
  "UpgradeDomainTimeoutSec"?: string;
  /**
   * ConsiderWarningAsError
   *
   * @default false
   *
   * Only meaningful when: `overridePublishProfileSettings = true && isUpgrade = true &&
   * upgradeMode = Monitored`
   */
  "ConsiderWarningAsError"?: boolean;
  /**
   * DefaultServiceTypeHealthPolicy
   *
   * Only meaningful when: `overridePublishProfileSettings = true && isUpgrade = true &&
   * upgradeMode = Monitored`
   */
  "DefaultServiceTypeHealthPolicy"?: string;
  /**
   * MaxPercentUnhealthyDeployedApplications
   *
   * Only meaningful when: `overridePublishProfileSettings = true && isUpgrade = true &&
   * upgradeMode = Monitored`
   */
  "MaxPercentUnhealthyDeployedApplications"?: string;
  /**
   * UpgradeTimeoutSec
   *
   * Only meaningful when: `overridePublishProfileSettings = true && isUpgrade = true &&
   * upgradeMode = Monitored`
   */
  "UpgradeTimeoutSec"?: string;
  /**
   * ServiceTypeHealthPolicyMap
   *
   * Only meaningful when: `overridePublishProfileSettings = true && isUpgrade = true &&
   * upgradeMode = Monitored`
   */
  "ServiceTypeHealthPolicyMap"?: string;
  /**
   * Configure Docker settings
   *
   * Configures the application with the specified Docker settings.
   *
   * @default false
   */
  "configureDockerSettings"?: boolean;
  /**
   * Registry Credentials Source
   *
   * Choose how credentials for the Docker registry will be provided.
   *
   * - `AzureResourceManagerEndpoint` — Azure Resource Manager Service Connection
   * - `ContainerRegistryEndpoint` — Container Registry Service Connection
   * - `UsernamePassword` — Username and Password
   *
   * @default AzureResourceManagerEndpoint
   *
   * Only meaningful when: `configureDockerSettings = true`
   *
   * In group: docker
   */
  "registryCredentials"?: "AzureResourceManagerEndpoint" | "ContainerRegistryEndpoint" | "UsernamePassword";
  /**
   * Docker Registry Service Connection
   *
   * Select a Docker registry service connection. Required for commands that need to authenticate
   * with a registry.<br/>Note: task will try to encrypt the registry secret before transmitting
   * it to service fabric cluster. However, it needs cluster's server certiticate to be installed
   * on agent machine in order to do so. If certificate is not present, secret will not be
   * encrypted.
   *
   * Only meaningful when: `configureDockerSettings = true && registryCredentials =
   * ContainerRegistryEndpoint`
   */
  "dockerRegistryEndpoint"?: dockerregistryConnection;
  /**
   * Azure subscription
   *
   * Select an Azure subscription.<br/>Note: task will try to encrypt the registry secret before
   * transmitting it to service fabric cluster. However, it needs cluster's server certiticate to
   * be installed on agent machine in order to do so. If certificate is not present, secret will
   * not be encrypted.
   *
   * Only meaningful when: `configureDockerSettings = true && registryCredentials =
   * AzureResourceManagerEndpoint`
   */
  "azureSubscriptionEndpoint"?: AzureRMConnection;
  /**
   * Registry User Name
   *
   * Username for the Docker registry
   *
   * Only meaningful when: `configureDockerSettings = true && registryCredentials =
   * UsernamePassword`
   *
   * In group: docker
   */
  "registryUserName"?: string;
  /**
   * Registry Password
   *
   * Password for the Docker registry. If the password is not encrypted, it is recommended that
   * you use a custom release pipeline secret variable to store it.
   *
   * Only meaningful when: `configureDockerSettings = true && registryCredentials =
   * UsernamePassword`
   *
   * In group: docker
   */
  "registryPassword"?: string;
  /**
   * Password Encrypted
   *
   * It is recommended to encrypt your password using
   * [Invoke-ServiceFabricEncryptText](https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-application-secret-management#encrypt-application-secrets).
   * If you do not, and a certificate matching the Server Certificate Thumbprint in the Cluster
   * Service Connection is installed on the build agent, it will be used to encrypt the password;
   * otherwise an error will occur.
   *
   * @default true
   *
   * Only meaningful when: `configureDockerSettings = true && registryCredentials =
   * UsernamePassword`
   *
   * In group: docker
   */
  "passwordEncrypted"?: boolean;
}

/**
 * Service Fabric application deployment
 *
 * Deploy an Azure Service Fabric application to a cluster
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkId=820528)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/service-fabric-deploy
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/ServiceFabricDeployV1
 */
export function serviceFabricDeployV1(
  inputs: ServiceFabricDeployV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("ServiceFabricDeploy@1", inputs as unknown as Record<string, unknown>, opts);
}
