/* eslint-disable */
// Auto-generated from actions/delete-package-versions@v5/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsDeletePackageVersionsV5Inputs {
  /**
   * Comma separated string of package version ids to delete.
   */
  "package-version-ids"?: string | boolean | number;
  /**
   * Owner of the repo containing the package version to delete. Defaults to the owner of the
   * repo running the action.
   */
  "owner"?: string | boolean | number;
  /**
   * Name of the package containing the version to delete.
   */
  "package-name": string | boolean | number;
  /**
   * Type of package. Can be one of container, maven, npm, nuget, or rubygems.
   */
  "package-type": string | boolean | number;
  /**
   * Number of versions to delete starting with the oldest version. Defaults to 1.
   *
   * @default 1
   */
  "num-old-versions-to-delete"?: string | boolean | number;
  /**
   * Number of versions to keep starting with the latest version By default keeps no version. To
   * delete all versions set this as 0.
   *
   * @default -1
   */
  "min-versions-to-keep"?: string | boolean | number;
  /**
   * Regex pattern for package versions to ignore. Defaults to delete all versions.
   *
   * @default ^$
   */
  "ignore-versions"?: string | boolean | number;
  /**
   * Deletes only pre-release versions. The number of pre-release versions to keep can be
   * specified by min-versions-to-keep. When this is set num-old-versions-to-delete and
   * ignore-versions will not be taken into account. By default this is set to false
   *
   * @default false
   */
  "delete-only-pre-release-versions"?: string | boolean | number;
  /**
   * Deletes only untagged versions in case of a container package. Does not work for other
   * package types. The number of untagged versions to keep can be specified by
   * min-versions-to-keep. When this is set num-old-versions-to-delete will not be taken into
   * account. By default this is set to false
   *
   * @default false
   */
  "delete-only-untagged-versions"?: string | boolean | number;
  /**
   * Token with the necessary scopes to delete package versions. If num-old-versions-to-delete is
   * used the token also needs the read packages scope. Defaults to github.token scoped to the
   * repo running the action. To delete package versions of a package outside the repo the action
   * is running in use a Personal Access Token stored as a secret.
   *
   * @default ${{ github.token }}
   */
  "token"?: string | boolean | number;
}

/**
 * Delete Package Versions
 *
 * Deletes package versions
 *
 * @see https://github.com/actions/delete-package-versions
 */
export function actionsDeletePackageVersionsV5(
  inputs: ActionsDeletePackageVersionsV5Inputs,
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/delete-package-versions@v5", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
