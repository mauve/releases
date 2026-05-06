// Auto-generated from actions/hello-world-docker-action@v2/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsHelloWorldDockerActionV2Inputs {
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
 * @see https://github.com/actions/hello-world-docker-action
 */
export function actionsHelloWorldDockerActionV2(
  inputs: ActionsHelloWorldDockerActionV2Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/hello-world-docker-action@v2", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
