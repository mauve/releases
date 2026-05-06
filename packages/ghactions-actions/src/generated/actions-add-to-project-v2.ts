// Auto-generated from actions/add-to-project@v2/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsAddToProjectV2Inputs {
  /**
   * URL of the project to add issues to
   */
  "project-url": string | boolean | number;
  /**
   * A GitHub personal access token with write access to the project
   */
  "github-token": string | boolean | number;
  /**
   * A comma-separated list of labels to use as a filter for issue to be added
   */
  "labeled"?: string | boolean | number;
  /**
   * The behavior of the labels filter, AND to match all labels, OR to match any label, NOT to
   * exclude any listed label (default is OR)
   */
  "label-operator"?: string | boolean | number;
}

/**
 * Add To GitHub projects
 *
 * Automatically add issues and PRs to GitHub projects
 *
 * @see https://github.com/actions/add-to-project
 */
export function actionsAddToProjectV2(
  inputs: ActionsAddToProjectV2Inputs,
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/add-to-project@v2", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
