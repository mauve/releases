/* eslint-disable */
// Auto-generated from actions/setup-node@v6/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsSetupNodeV6Inputs {
  /**
   * Version Spec of the version to use. Examples: 12.x, 10.15.1, >=10.15.0.
   */
  "node-version"?: string | boolean | number;
  /**
   * File containing the version Spec of the version to use. Examples: package.json, .nvmrc,
   * .node-version, .tool-versions.
   */
  "node-version-file"?: string | boolean | number;
  /**
   * Target architecture for Node to use. Examples: x86, x64. Will use system architecture by
   * default.
   */
  "architecture"?: string | boolean | number;
  /**
   * Set this option if you want the action to check for the latest available version that
   * satisfies the version spec.
   *
   * @default false
   */
  "check-latest"?: string | boolean | number;
  /**
   * Optional registry to set up for auth. Will set the registry in a project level .npmrc and
   * .yarnrc file, and set up auth to read in from env.NODE_AUTH_TOKEN.
   */
  "registry-url"?: string | boolean | number;
  /**
   * Optional scope for authenticating against scoped registries. Will fall back to the
   * repository owner when using the GitHub Packages registry (https://npm.pkg.github.com/).
   */
  "scope"?: string | boolean | number;
  /**
   * Used to pull node distributions from node-versions. Since there's a default, this is
   * typically not supplied by the user. When running this action on github.com, the default
   * value is sufficient. When running on GHES, you can pass a personal access token for
   * github.com if you are experiencing rate limiting.
   *
   * @default ${{ github.server_url == 'https://github.com' && github.token || '' }}
   */
  "token"?: string | boolean | number;
  /**
   * Used to specify a package manager for caching in the default directory. Supported values:
   * npm, yarn, pnpm.
   */
  "cache"?: string | boolean | number;
  /**
   * Set to false to disable automatic caching. By default, caching is enabled when either
   * devEngines.packageManager or the top-level packageManager field in package.json specifies
   * npm as the package manager.
   *
   * @default true
   */
  "package-manager-cache"?: string | boolean | number;
  /**
   * Used to specify the path to a dependency file: package-lock.json, yarn.lock, etc. Supports
   * wildcards or a list of file names for caching multiple dependencies.
   */
  "cache-dependency-path"?: string | boolean | number;
  /**
   * Used to specify an alternative mirror to download Node.js binaries from
   */
  "mirror"?: string | boolean | number;
  /**
   * The token used as Authorization header when fetching from the mirror
   */
  "mirror-token"?: string | boolean | number;
}

/**
 * Setup Node.js environment
 *
 * Setup a Node.js environment by adding problem matchers and optionally downloading and adding
 * it to the PATH.
 *
 * @see https://github.com/actions/setup-node
 */
export function actionsSetupNodeV6(
  inputs: ActionsSetupNodeV6Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/setup-node@v6", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
