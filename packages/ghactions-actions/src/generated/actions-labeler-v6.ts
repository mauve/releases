/* eslint-disable */
// Auto-generated from actions/labeler@v6/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsLabelerV6Inputs {
  /**
   * The GitHub token used to manage labels
   *
   * @default ${{ github.token }}
   */
  "repo-token"?: string | boolean | number;
  /**
   * The path for the label configurations
   *
   * @default .github/labeler.yml
   */
  "configuration-path"?: string | boolean | number;
  /**
   * Whether or not to remove labels when matching files are reverted
   *
   * @default false
   */
  "sync-labels"?: string | boolean | number;
  /**
   * Whether or not to auto-include paths starting with dot (e.g. `.github`)
   *
   * @default true
   */
  "dot"?: string | boolean | number;
  /**
   * The pull request number(s)
   */
  "pr-number"?: string | boolean | number;
}

/**
 * Labeler
 *
 * Automatically label new pull requests based on the paths of files being changed
 *
 * @see https://github.com/actions/labeler
 */
export function actionsLabelerV6(
  inputs: ActionsLabelerV6Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/labeler@v6", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
