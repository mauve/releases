/* eslint-disable */
// Auto-generated from HelmInstallerV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface HelmInstallerV1Inputs {
  /**
   * Helm Version Spec
   *
   * Specify the version of Helm to install.
   *
   * @default latest
   */
  "helmVersionToInstall"?: string;
}

/**
 * Helm tool installer
 *
 * Install Helm on an agent machine
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=851275)
 *
 * @see https://aka.ms/azpipes-helm-installer-tsg
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/HelmInstallerV1
 */
export function helmInstallerV1(
  inputs: HelmInstallerV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("HelmInstaller@1", inputs as unknown as Record<string, unknown>, opts);
}
