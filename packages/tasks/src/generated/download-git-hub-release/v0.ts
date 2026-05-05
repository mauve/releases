/* eslint-disable */
// Auto-generated from DownloadGitHubReleaseV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { githubConnection } from '../connections.js';

export interface DownloadGitHubReleaseV0Inputs {
  /**
   * GitHub Connection
   *
   * GitHub service connection
   */
  "connection": githubConnection;
  /**
   * Repository
   *
   * GitHub repository full name
   */
  "userRepository": string /* TODO: unknown task input type "githubRepositoryPicker" */;
  /**
   * Default version
   *
   * Download assets from latest release or specific release version/tag
   *
   * - `latest` — Latest Release
   * - `specificVersion` — Specific Version
   * - `specificTag` — Specific Tag
   *
   * @default latest
   */
  "defaultVersionType": "latest" | "specificVersion" | "specificTag";
  /**
   * Release
   *
   * Release version/tag to download
   *
   * Only meaningful when: `defaultVersionType != latest`
   */
  "version"?: string;
  /**
   * Item Pattern
   *
   * Minimatch pattern to filter files to be downloaded. To download all files within release use
   * **
   *
   * @default **
   */
  "itemPattern"?: string;
  /**
   * Destination directory
   *
   * Path on the agent machine where the release assets will be downloaded
   *
   * @default $(System.ArtifactsDirectory)
   */
  "downloadPath": string;
}

/**
 * Download GitHub Release
 *
 * Downloads a GitHub Release from a repository
 *
 * [Learn more about this task](https://aka.ms/AA3x715)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/download-github-release
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DownloadGitHubReleaseV0
 */
export function downloadGitHubReleaseV0(
  inputs: DownloadGitHubReleaseV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("DownloadGitHubRelease@0", inputs as unknown as Record<string, unknown>, opts);
}
