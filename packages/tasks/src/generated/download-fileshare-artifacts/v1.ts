/* eslint-disable */
// Auto-generated from DownloadFileshareArtifactsV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface DownloadFileshareArtifactsV1Inputs {
  /**
   * File share path
   *
   * File share path e.g \\server\folder
   */
  "filesharePath": string;
  /**
   * Artifact name
   *
   * The name of the artifact to download e.g drop
   */
  "artifactName": string;
  /**
   * Matching pattern
   *
   * Specify files to be downloaded as multi line minimatch pattern. [More
   * Information](https://aka.ms/minimatchexamples) <p>The default pattern (\*\*) will download
   * all files within the artifact.</p>
   *
   * @default **
   */
  "itemPattern"?: string;
  /**
   * Download path
   *
   * Path on the agent machine where the artifacts will be downloaded
   *
   * @default $(System.ArtifactsDirectory)
   */
  "downloadPath": string;
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
}

/**
 * Download artifacts from file share
 *
 * Download artifacts from a file share, like \\share\drop
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/download-fileshare-artifacts
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DownloadFileshareArtifactsV1
 */
export function downloadFileshareArtifactsV1(
  inputs: DownloadFileshareArtifactsV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("DownloadFileshareArtifacts@1", inputs as unknown as Record<string, unknown>, opts);
}
