/* eslint-disable */
// Auto-generated from DownloadBuildArtifactsV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface DownloadBuildArtifactsV1Inputs {
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
   * The project from which to download the build artifacts
   *
   * Only meaningful when: `buildType == specific`
   */
  "project"?: string;
  /**
   * Build pipeline
   *
   * Select the build pipeline name
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
   * Download artifacts even from partially succeeded builds.
   *
   * If checked, this build task will try to download artifacts whether the build is succeeded or
   * partially succeeded.
   *
   * @default false
   *
   * Only meaningful when: `buildType == specific && buildVersionToDownload != specific`
   */
  "allowPartiallySucceededBuilds"?: boolean;
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
   * The build from which to download the artifacts
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
   * Download type
   *
   * Download a specific artifact or specific files from the build.
   *
   * - `single` — Specific artifact
   * - `specific` — Specific files
   *
   * @default single
   */
  "downloadType": "single" | "specific";
  /**
   * Artifact name
   *
   * The name of the artifact to download
   *
   * Only meaningful when: `downloadType == single`
   */
  "artifactName"?: string;
  /**
   * Matching pattern
   *
   * Specify files to be downloaded as multi line minimatch pattern. [More
   * Information](https://aka.ms/minimatchexamples) <p>The default pattern (\*\*) will download
   * all files across all artifacts in the build if "Specific files" option is selected. To
   * download all files within artifact drop use drop/**.</p>
   *
   * @default **
   */
  "itemPattern"?: string;
  /**
   * Destination directory
   *
   * Path on the agent machine where the artifacts will be downloaded
   *
   * @default $(System.ArtifactsDirectory)
   */
  "downloadPath": string;
  /**
   * Clean destination folder
   *
   * Delete all existing files in destination folder before artifact download
   *
   * @default false
   */
  "cleanDestinationFolder"?: boolean;
  /**
   * Parallelization limit
   *
   * Number of files to download simultaneously
   *
   * @default 8
   *
   * In group: advanced
   */
  "parallelizationLimit"?: string;
  /**
   * Check downloaded files
   *
   * If checked, this build task will check that all files are fully downloaded.
   *
   * @default false
   *
   * In group: advanced
   */
  "checkDownloadedFiles"?: boolean;
  /**
   * Retry count
   *
   * Optional number of times to retry downloading a build artifact if the download fails.
   *
   * @default 4
   *
   * In group: advanced
   */
  "retryDownloadCount"?: string;
  /**
   * Extract all files that are stored inside tar archives
   *
   * Enable this option to extract all downloaded files that have .tar extension. This is helpful
   * because you need to pack your artifact files into tar if you want to preserve Unix file
   * permissions. Enabling `StoreAsTar` option in PublishBuildArtifacts task will store artifacts
   * as .tar files automatically.
   *
   * In group: advanced
   */
  "extractTars"?: boolean;
}

/**
 * Download build artifacts
 *
 * Download files that were saved as artifacts of a completed build
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/download-build-artifacts
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DownloadBuildArtifactsV1
 */
export function downloadBuildArtifactsV1(
  inputs: DownloadBuildArtifactsV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("DownloadBuildArtifacts@1", inputs as unknown as Record<string, unknown>, opts);
}
