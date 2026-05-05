/* eslint-disable */
// Auto-generated from CondaAuthenticateV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface CondaAuthenticateV0Inputs {}

/**
 * Conda authenticate (for task runners)
 *
 * Authentication task for the conda client
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/CondaAuthenticateV0
 */
export function condaAuthenticateV0(
  inputs: CondaAuthenticateV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("CondaAuthenticate@0", inputs as unknown as Record<string, unknown>, opts);
}
