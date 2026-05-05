/* eslint-disable */
// Auto-generated from ManualInterventionV8/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface ManualInterventionV8Inputs {
  /**
   * Instructions
   *
   * These instructions will be shown to the user for resuming or rejecting the manual
   * intervention. Based on these instructions the user will take an informed decision about this
   * manual intervention.
   */
  "instructions"?: string;
  /**
   * Notify users
   *
   * Send a manual intervention pending email to specific users (or groups). Only users with
   * manage deployment permission can act on a manual intervention.
   */
  "emailRecipients"?: string;
  /**
   * On timeout
   *
   * Reject or resume this manual intervention automatically after it is pending for the
   * specified timeout or 60 days, whichever is earlier.
   *
   * - `reject` — Reject
   * - `resume` — Resume
   *
   * @default reject
   */
  "onTimeout"?: "reject" | "resume";
}

/**
 * Manual intervention
 *
 * Pause deployment and wait for manual intervention
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=870234)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/manual-intervention
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/ManualInterventionV8
 */
export function manualInterventionV8(
  inputs: ManualInterventionV8Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("ManualIntervention@8", inputs as unknown as Record<string, unknown>, opts);
}
