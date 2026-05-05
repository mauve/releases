/* eslint-disable */
// Auto-generated from JenkinsDownloadArtifactsV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection, JenkinsConnection } from '../connections.js';

export interface JenkinsDownloadArtifactsV1Inputs {
  /**
   * Jenkins service connection
   *
   * Select the service connection for your Jenkins instance. To create one, click the Manage
   * link and create a new Jenkins service connection.
   */
  "serverEndpoint": JenkinsConnection;
  /**
   * Job name
   *
   * The name of the Jenkins job to download artifacts from. This must exactly match the job name
   * on the Jenkins server.
   */
  "jobName": string;
  /**
   * Jenkins job type
   *
   * Jenkins job type, detected automatically.
   *
   * Only meaningful when: `jobName = invalidjobName`
   */
  "jenkinsJobType"?: string;
  /**
   * Save to
   *
   * Jenkins artifacts will be downloaded and saved to this directory. This directory will be
   * created if it does not exist.
   *
   * @default jenkinsArtifacts
   */
  "saveTo": string;
  /**
   * Download artifacts produced by
   *
   * Download artifacts produced by the last successful build, or from a specific build instance.
   *
   * - `LastSuccessfulBuild` — Last Successful Build
   * - `BuildNumber` — Build Number
   *
   * @default LastSuccessfulBuild
   *
   * In group: advanced
   */
  "jenkinsBuild": "LastSuccessfulBuild" | "BuildNumber";
  /**
   * Jenkins build number
   *
   * Download artifacts produced by this build.
   *
   * @default 1
   *
   * Only meaningful when: `jenkinsBuild == BuildNumber`
   *
   * In group: advanced
   */
  "jenkinsBuildNumber"?: string;
  /**
   * Item Pattern
   *
   * Specify files to be downloaded as multi line minimatch pattern. [More
   * Information](https://aka.ms/minimatchexamples) <p>The default pattern (\*\*) will download
   * all files across all artifacts produced by the Jenkins job. To download all files within
   * artifact drop use drop/**.</p>
   *
   * @default **
   *
   * In group: advanced
   */
  "itemPattern"?: string;
  /**
   * Download Commits and WorkItems
   *
   * Enables downloading the commits and work item details associated with the Jenkins Job
   *
   * @default false
   *
   * In group: advanced
   */
  "downloadCommitsAndWorkItems"?: boolean;
  /**
   * Download commits and work items from
   *
   * Optional start build number for downloading commits and work items. If provided, all commits
   * and work items between start build number and build number given as input to download
   * artifacts will be downloaded.
   *
   * Only meaningful when: `downloadCommitsAndWorkItems == true && jenkinsBuild == BuildNumber`
   *
   * In group: advanced
   */
  "startJenkinsBuildNumber"?: string;
  /**
   * Commit and WorkItem FileName
   *
   * Optional file name suffix for commits and work item attachments. Attachments will be created
   * with commits_{suffix}.json and workitem_{suffix}.json. If this input is not provided,
   * attachments will be created with the name commits.json and workitems.json
   *
   * Only meaningful when: `downloadCommitsAndWorkItems == invalid`
   *
   * In group: advanced
   */
  "artifactDetailsFileNameSuffix"?: string;
  /**
   * Artifacts are propagated to Azure
   *
   * Check this if Jenkins artifacts were propagated to Azure. To upload Jenkins artifacts to
   * azure, refer to this [Jenkins
   * plugin](https://wiki.jenkins.io/display/JENKINS/Windows+Azure+Storage+Plugin)
   *
   * @default false
   *
   * In group: propagatedArtifactsGroup
   */
  "propagatedArtifacts"?: boolean;
  /**
   * Artifact Provider
   *
   * Choose the external storage provider used in Jenkins job to upload the artifacts.
   *
   * - `azureStorage` — Azure Storage
   *
   * @default azureStorage
   *
   * Only meaningful when: `propagatedArtifacts == notValid`
   *
   * In group: propagatedArtifactsGroup
   */
  "artifactProvider"?: "azureStorage";
  /**
   * Azure Subscription
   *
   * Choose the Azure Resource Manager subscription for the artifacts.
   *
   * Only meaningful when: `propagatedArtifacts == true`
   *
   * In group: propagatedArtifactsGroup
   */
  "ConnectedServiceNameARM"?: AzureRMConnection;
  /**
   * Storage Account Name
   *
   * Azure Classic and Resource Manager stoarge accounts are listed. Select the Storage account
   * name in which the artifacts are propagated.
   *
   * Only meaningful when: `propagatedArtifacts == true`
   *
   * In group: propagatedArtifactsGroup
   */
  "storageAccountName"?: string;
  /**
   * Container Name
   *
   * Name of the container in the storage account to which artifacts are uploaded.
   *
   * Only meaningful when: `propagatedArtifacts == true`
   *
   * In group: propagatedArtifactsGroup
   */
  "containerName"?: string;
  /**
   * Common Virtual Path
   *
   * Path to the artifacts inside the Azure storage container.
   *
   * Only meaningful when: `propagatedArtifacts == true`
   *
   * In group: propagatedArtifactsGroup
   */
  "commonVirtualPath"?: string;
}

/**
 * Jenkins download artifacts
 *
 * Download artifacts produced by a Jenkins job
 *
 * Download artifacts produced by a [Jenkins](https://jenkins.io/) job.
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/jenkins-download-artifacts
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/JenkinsDownloadArtifactsV1
 */
export function jenkinsDownloadArtifactsV1(
  inputs: JenkinsDownloadArtifactsV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("JenkinsDownloadArtifacts@1", inputs as unknown as Record<string, unknown>, opts);
}
