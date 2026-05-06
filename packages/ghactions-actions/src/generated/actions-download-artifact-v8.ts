/* eslint-disable */
// Auto-generated from actions/download-artifact@v8/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsDownloadArtifactV8Inputs {
  /**
   * Name of the artifact to download. If unspecified, all artifacts for the run are downloaded.
   */
  "name"?: string | boolean | number;
  /**
   * IDs of the artifacts to download, comma-separated. Either inputs `artifact-ids` or `name`
   * can be used, but not both.
   */
  "artifact-ids"?: string | boolean | number;
  /**
   * Destination path. Supports basic tilde expansion. Defaults to $GITHUB_WORKSPACE
   */
  "path"?: string | boolean | number;
  /**
   * A glob pattern matching the artifacts that should be downloaded. Ignored if name is
   * specified.
   */
  "pattern"?: string | boolean | number;
  /**
   * When multiple artifacts are matched, this changes the behavior of the destination
   * directories. If true, the downloaded artifacts will be in the same directory specified by
   * path. If false, the downloaded artifacts will be extracted into individual named directories
   * within the specified path.
   *
   * @default false
   */
  "merge-multiple"?: string | boolean | number;
  /**
   * The GitHub token used to authenticate with the GitHub API. This is required when downloading
   * artifacts from a different repository or from a different workflow run. If this is not
   * specified, the action will attempt to download artifacts from the current repository and the
   * current workflow run.
   */
  "github-token"?: string | boolean | number;
  /**
   * The repository owner and the repository name joined together by "/". If github-token is
   * specified, this is the repository that artifacts will be downloaded from.
   *
   * @default ${{ github.repository }}
   */
  "repository"?: string | boolean | number;
  /**
   * The id of the workflow run where the desired download artifact was uploaded from. If
   * github-token is specified, this is the run that artifacts will be downloaded from.
   *
   * @default ${{ github.run_id }}
   */
  "run-id"?: string | boolean | number;
  /**
   * If true, the downloaded artifact will not be automatically extracted/decompressed. This is
   * useful when you want to handle the artifact as-is without extraction.
   *
   * @default false
   */
  "skip-decompress"?: string | boolean | number;
  /**
   * The behavior when a downloaded artifact's digest does not match the expected digest.
   * Options: ignore, info, warn, error. Default is error which will fail the action.
   *
   * @default error
   */
  "digest-mismatch"?: string | boolean | number;
}

/**
 * Download a Build Artifact
 *
 * Download a build artifact that was previously uploaded in the workflow by the
 * upload-artifact action
 *
 * @see https://github.com/actions/download-artifact
 */
export function actionsDownloadArtifactV8(
  inputs: ActionsDownloadArtifactV8Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/download-artifact@v8", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
