// Auto-generated from actions/upload-artifact@v7/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsUploadArtifactV7Inputs {
  /**
   * Artifact name. If the `archive` input is `false`, the name of the file uploaded will be the
   * artifact name.
   *
   * @default artifact
   */
  "name"?: string | boolean | number;
  /**
   * A file, directory or wildcard pattern that describes what to upload.
   */
  "path": string | boolean | number;
  /**
   * The desired behavior if no files are found using the provided path.
   * Available Options:
   * warn: Output a warning but do not fail the action
   * error: Fail the action with an error message
   * ignore: Do not output any warnings or errors, the action does not fail
   *
   * @default warn
   */
  "if-no-files-found"?: string | boolean | number;
  /**
   * Duration after which artifact will expire in days. 0 means using default retention.
   * Minimum 1 day. Maximum 90 days unless changed from the repository settings page.
   */
  "retention-days"?: string | boolean | number;
  /**
   * The level of compression for Zlib to be applied to the artifact archive. The value can range
   * from 0 to 9: - 0: No compression - 1: Best speed - 6: Default compression (same as GNU Gzip)
   * - 9: Best compression Higher levels will result in better compression, but will take longer
   * to complete. For large files that are not easily compressed, a value of 0 is recommended for
   * significantly faster uploads.
   *
   * @default 6
   */
  "compression-level"?: string | boolean | number;
  /**
   * If true, an artifact with a matching name will be deleted before a new one is uploaded. If
   * false, the action will fail if an artifact for the given name already exists. Does not fail
   * if the artifact does not exist.
   *
   * @default false
   */
  "overwrite"?: string | boolean | number;
  /**
   * If true, hidden files will be included in the artifact. If false, hidden files will be
   * excluded from the artifact.
   *
   * @default false
   */
  "include-hidden-files"?: string | boolean | number;
  /**
   * If true, the artifact will be archived (zipped) before uploading. If false, the artifact
   * will be uploaded as-is without archiving. When `archive` is `false`, only a single file can
   * be uploaded. The name of the file will be used as the artifact name (ignoring the `name`
   * parameter).
   *
   * @default true
   */
  "archive"?: string | boolean | number;
}

/**
 * Upload a Build Artifact
 *
 * Upload a build artifact that can be used by subsequent workflow steps
 *
 * @see https://github.com/actions/upload-artifact
 */
export function actionsUploadArtifactV7(
  inputs: ActionsUploadArtifactV7Inputs,
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/upload-artifact@v7", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
