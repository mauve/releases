/* eslint-disable */
// Auto-generated from ManualValidationV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface ManualValidationV0Inputs {
  /**
   * Notify users
   *
   * Send a manual validation pending email to specific users (or groups). Only users with queue
   * build permission can act on a manual validation.
   */
  "notifyUsers": string;
  /**
   * Instructions
   *
   * These instructions will be shown to the user for resuming or rejecting the manual
   * validation. Based on these instructions the user will take an informed decision about this
   * manual validation.
   */
  "instructions"?: string;
  /**
   * On timeout
   *
   * Reject or resume this manual validation automatically after it is pending for the specified
   * timeout or 30 days, whichever is earlier.
   *
   * - `reject` — Reject
   * - `resume` — Resume
   *
   * @default reject
   */
  "onTimeout"?: "reject" | "resume";
}

/**
 * Manual validation
 *
 * Pause a pipeline run to wait for manual interaction. Works only with YAML pipelines.
 *
 * [Learn more about this task](https://aka.ms/manual-validation)
 *
 * @see https://aka.ms/manual-validation
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/ManualValidationV0
 */
export function manualValidationV0(
  inputs: ManualValidationV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("ManualValidation@0", inputs as unknown as Record<string, unknown>, opts);
}
