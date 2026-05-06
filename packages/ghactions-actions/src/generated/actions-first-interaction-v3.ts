// Auto-generated from actions/first-interaction@v3/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsFirstInteractionV3Inputs {
  /**
   * Comment to post on an individual's first issue
   */
  "issue_message"?: string | boolean | number;
  /**
   * Comment to post on an individual's first pull request
   */
  "pr_message"?: string | boolean | number;
  /**
   * Token with permissions to post issue and PR comments
   *
   * @default ${{ github.token }}
   */
  "repo_token"?: string | boolean | number;
}

/**
 * First Interaction
 *
 * Greet first-time contributors when they open an issue or PR
 *
 * @see https://github.com/actions/first-interaction
 */
export function actionsFirstInteractionV3(
  inputs: ActionsFirstInteractionV3Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/first-interaction@v3", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
