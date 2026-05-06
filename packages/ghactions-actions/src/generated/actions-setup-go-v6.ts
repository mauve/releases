/* eslint-disable */
// Auto-generated from actions/setup-go@v6/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsSetupGoV6Inputs {
  /**
   * The Go version to download (if necessary) and use. Supports semver spec and ranges. Be sure
   * to enclose this option in single quotation marks.
   */
  "go-version"?: string | boolean | number;
  /**
   * Path to the go.mod, go.work, .go-version, or .tool-versions file.
   */
  "go-version-file"?: string | boolean | number;
  /**
   * Set this option to true if you want the action to always check for the latest available
   * version that satisfies the version spec
   *
   * @default false
   */
  "check-latest"?: string | boolean | number;
  /**
   * Used to pull Go distributions from go-versions. Since there's a default, this is typically
   * not supplied by the user. When running this action on github.com, the default value is
   * sufficient. When running on GHES, you can pass a personal access token for github.com if you
   * are experiencing rate limiting.
   *
   * @default ${{ github.server_url == 'https://github.com' && github.token || '' }}
   */
  "token"?: string | boolean | number;
  /**
   * Used to specify whether caching is needed. Set to true, if you'd like to enable caching.
   *
   * @default true
   */
  "cache"?: string | boolean | number;
  /**
   * Used to specify the path to a dependency file (e.g., go.mod, go.sum)
   */
  "cache-dependency-path"?: string | boolean | number;
  /**
   * Target architecture for Go to use. Examples: x86, x64. Will use system architecture by
   * default.
   */
  "architecture"?: string | boolean | number;
  /**
   * Custom base URL for downloading Go distributions. Use this to download Go from a mirror or
   * custom source. Defaults to "https://go.dev/dl". Can also be set via the GO_DOWNLOAD_BASE_URL
   * environment variable. The input takes precedence over the environment variable.
   */
  "go-download-base-url"?: string | boolean | number;
}

/**
 * Setup Go environment
 *
 * Setup a Go environment and add it to the PATH
 *
 * @see https://github.com/actions/setup-go
 */
export function actionsSetupGoV6(
  inputs: ActionsSetupGoV6Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/setup-go@v6", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
