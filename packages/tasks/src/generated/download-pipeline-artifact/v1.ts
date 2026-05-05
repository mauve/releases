/* eslint-disable */
// Auto-generated from DownloadPipelineArtifactV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface DownloadPipelineArtifactV1Inputs {
  /**
   * Download artifacts produced by
   *
   * Download artifacts produced by the current build, or from a specific build.
   *
   * - `current` — Current build
   * - `specific` — Specific build
   *
   * @default current
   */
  "buildType": "current" | "specific";
  /**
   * Project
   *
   * The project from which to download the pipeline artifacts.
   *
   * Only meaningful when: `buildType == specific`
   */
  "project"?: string;
  /**
   * Build pipeline
   *
   * Select the build pipeline name.
   *
   * Only meaningful when: `buildType == specific`
   */
  "definition"?: string;
  /**
   * When appropriate, download artifacts from the triggering build.
   *
   * If checked, this build task will try to download artifacts from the triggering build. If
   * there is no triggering build from the specified pipeline, it will download artifacts from
   * the build specified in the options below.
   *
   * @default false
   *
   * Only meaningful when: `buildType == specific`
   */
  "specificBuildWithTriggering"?: boolean;
  /**
   * Build version to download
   *
   * - `latest` — Latest
   * - `latestFromBranch` — Latest from specific branch and specified Build Tags
   * - `specific` — Specific version
   *
   * @default latest
   *
   * Only meaningful when: `buildType == specific`
   */
  "buildVersionToDownload"?: "latest" | "latestFromBranch" | "specific";
  /**
   * Branch name
   *
   * Specify to filter on branch/ref name, for example: ```refs/heads/develop```.
   *
   * @default refs/heads/master
   *
   * Only meaningful when: `buildType == specific && buildVersionToDownload == latestFromBranch`
   */
  "branchName"?: string;
  /**
   * Build
   *
   * The build from which to download the artifacts.
   *
   * Only meaningful when: `buildType == specific && buildVersionToDownload == specific`
   */
  "buildId"?: string;
  /**
   * Build Tags
   *
   * A comma-delimited list of tags. Only builds with these tags will be returned.
   *
   * Only meaningful when: `buildType == specific && buildVersionToDownload != specific`
   */
  "tags"?: string;
  /**
   * Artifact name
   *
   * The name of the artifact to download.
   */
  "artifactName"?: string;
  /**
   * Matching pattern
   *
   * Specify files to be downloaded as multi line minimatch pattern. [More
   * Information](https://aka.ms/minimatchexamples).</p>
   *
   * @default **
   */
  "itemPattern"?: string;
  /**
   * Destination directory
   *
   * Path on the agent machine where the artifacts will be downloaded.
   *
   * @default $(System.ArtifactsDirectory)
   */
  "downloadPath": string;
}

/**
 * Download pipeline artifact
 *
 * Download a named artifact from a pipeline to a local path
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/download-pipeline-artifact
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DownloadPipelineArtifactV1
 */
export function downloadPipelineArtifactV1(
  inputs: DownloadPipelineArtifactV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("DownloadPipelineArtifact@1", inputs as unknown as Record<string, unknown>, opts);
}
