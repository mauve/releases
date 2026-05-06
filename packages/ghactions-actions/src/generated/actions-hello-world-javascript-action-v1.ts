// Auto-generated from actions/hello-world-javascript-action@v1/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsHelloWorldJavascriptActionV1Inputs {
  /**
   * Who to greet
   *
   * @default World
   */
  "who-to-greet"?: string | boolean | number;
}

/**
 * Hello World
 *
 * Greet someone and record the time
 *
 * @see https://github.com/actions/hello-world-javascript-action
 */
export function actionsHelloWorldJavascriptActionV1(
  inputs: ActionsHelloWorldJavascriptActionV1Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/hello-world-javascript-action@v1", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
