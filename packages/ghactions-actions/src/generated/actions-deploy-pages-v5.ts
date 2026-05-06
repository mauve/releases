// Auto-generated from actions/deploy-pages@v5/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsDeployPagesV5Inputs {
  /**
   * GitHub token
   *
   * @default ${{ github.token }}
   */
  "token"?: string | boolean | number;
  /**
   * Time in milliseconds after which to timeout and cancel the deployment (default: 10 minutes)
   *
   * @default 600000
   */
  "timeout"?: string | boolean | number;
  /**
   * Maximum number of status report errors before cancelling a deployment (default: 10)
   *
   * @default 10
   */
  "error_count"?: string | boolean | number;
  /**
   * Time in milliseconds between two deployment status report (default: 5 seconds)
   *
   * @default 5000
   */
  "reporting_interval"?: string | boolean | number;
  /**
   * Name of the artifact to deploy
   *
   * @default github-pages
   */
  "artifact_name"?: string | boolean | number;
  /**
   * Is this attempting to deploy a pull request as a GitHub Pages preview site? (NOTE: This
   * feature is only in alpha currently and is not available to the public!)
   *
   * @default false
   */
  "preview"?: string | boolean | number;
}

/**
 * Deploy GitHub Pages site
 *
 * A GitHub Action to deploy an artifact as a GitHub Pages site
 *
 * @see https://github.com/actions/deploy-pages
 */
export function actionsDeployPagesV5(
  inputs: ActionsDeployPagesV5Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/deploy-pages@v5", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
