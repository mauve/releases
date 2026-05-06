/* eslint-disable */
// Auto-generated from actions/javascript-action@v1/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsJavascriptActionV1Inputs {
  /**
   * number of milliseconds to wait
   *
   * @default 1000
   */
  "milliseconds"?: string | boolean | number;
}

/**
 * Wait
 *
 * Wait a designated number of milliseconds
 *
 * @see https://github.com/actions/javascript-action
 */
export function actionsJavascriptActionV1(
  inputs: ActionsJavascriptActionV1Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/javascript-action@v1", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
