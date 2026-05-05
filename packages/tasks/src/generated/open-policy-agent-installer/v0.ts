/* eslint-disable */
// Auto-generated from OpenPolicyAgentInstallerV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface OpenPolicyAgentInstallerV0Inputs {
  /**
   * OPA Version Spec
   *
   * Specify the version of open policy agent to install
   *
   * @default latest
   */
  "opaVersion"?: string;
}

/**
 * Open Policy Agent Installer
 *
 * Install Open Policy Agent on agent machine
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=851275)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/OpenPolicyAgentInstallerV0
 */
export function openPolicyAgentInstallerV0(
  inputs: OpenPolicyAgentInstallerV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("OpenPolicyAgentInstaller@0", inputs as unknown as Record<string, unknown>, opts);
}
