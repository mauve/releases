// Auto-generated from softprops/action-gh-release@v2/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface SoftpropsActionGhReleaseV2Inputs {
  /**
   * Note-worthy description of changes in release
   */
  "body"?: string | boolean | number;
  /**
   * Path to load note-worthy description of changes in release from
   */
  "body_path"?: string | boolean | number;
  /**
   * Gives the release a custom name. Defaults to tag name
   */
  "name"?: string | boolean | number;
  /**
   * Gives a tag name. Defaults to github.ref_name. refs/tags/<name> values are normalized to
   * <name>.
   */
  "tag_name"?: string | boolean | number;
  /**
   * Keeps the release as a draft. Defaults to false. When reusing an existing draft release, set
   * this to true to keep it draft; omit it to publish after upload. On immutable-release
   * repositories, use this for prereleases that upload assets and publish the draft later.
   */
  "draft"?: string | boolean | number;
  /**
   * Identify the release as a prerelease. Defaults to false
   */
  "prerelease"?: string | boolean | number;
  /**
   * Upload artifacts sequentially in the provided order. This does not control the final display
   * order GitHub uses for release assets.
   */
  "preserve_order"?: string | boolean | number;
  /**
   * Newline-delimited list of path globs for asset files to upload. Escape glob metacharacters
   * when matching literal filenames that contain them. `~/...` expands to the runner home
   * directory. On Windows, both \ and / path separators are accepted. GitHub may normalize raw
   * asset filenames that contain special characters; the action restores the asset label when
   * possible, but the final download name remains GitHub-controlled.
   */
  "files"?: string | boolean | number;
  /**
   * Base directory to resolve 'files' globs against. Defaults to the workspace root used by the
   * action step.
   */
  "working_directory"?: string | boolean | number;
  /**
   * Overwrite existing files with the same name. Defaults to true
   *
   * @default true
   */
  "overwrite_files"?: string | boolean | number;
  /**
   * Fails if any of the `files` globs match nothing. Defaults to false
   */
  "fail_on_unmatched_files"?: string | boolean | number;
  /**
   * Repository to make releases against, in <owner>/<repo> format
   */
  "repository"?: string | boolean | number;
  /**
   * Authorized GitHub token or PAT. Defaults to github.token when omitted. A non-empty explicit
   * token overrides GITHUB_TOKEN. Passing an empty string treats the token as unset.
   *
   * @default ${{ github.token }}
   */
  "token"?: string | boolean | number;
  /**
   * Commitish value that determines where the Git tag is created from. Can be any branch or
   * commit SHA. When creating a new tag for an older commit, `github.token` may not have
   * permission to create the ref; use a PAT or another token with sufficient contents
   * permissions if you hit 403 `Resource not accessible by integration`.
   */
  "target_commitish"?: string | boolean | number;
  /**
   * If specified, a discussion of the specified category is created and linked to the release.
   * The value must be a category that already exists in the repository. If there is already a
   * discussion linked to the release, this parameter is ignored.
   */
  "discussion_category_name"?: string | boolean | number;
  /**
   * Whether to automatically generate the name and body for this release. If name is specified,
   * the specified name will be used; otherwise, a name will be automatically generated. If body
   * is specified, the body will be pre-pended to the automatically generated notes.
   */
  "generate_release_notes"?: string | boolean | number;
  /**
   * Optional. When generate_release_notes is enabled, use this tag as GitHub's previous_tag_name
   * comparison base. If omitted, GitHub chooses the comparison base automatically.
   */
  "previous_tag"?: string | boolean | number;
  /**
   * Append to existing body instead of overwriting it. Default is false.
   */
  "append_body"?: string | boolean | number;
  /**
   * Specifies whether this release should be set as the latest release for the repository.
   * Drafts and prereleases cannot be set as latest. Can be `true`, `false`, or `legacy`. Uses
   * GitHub api default if not provided
   */
  "make_latest"?: string | boolean | number;
}

/**
 * GH Release
 *
 * Github Action for creating Github Releases
 *
 * @see https://github.com/softprops/action-gh-release
 */
export function softpropsActionGhReleaseV2(
  inputs: SoftpropsActionGhReleaseV2Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("softprops/action-gh-release@v2", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
