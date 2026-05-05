/* eslint-disable */
// Auto-generated from KubectlInstallerV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface KubectlInstallerV0Inputs {
  /**
   * Kubectl Version Spec
   *
   * Specify the version of Kubectl to install
   *
   * @default latest
   */
  "kubectlVersion"?: string;
}

/**
 * Kubectl tool installer
 *
 * Install Kubectl on agent machine
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=851275) or [see the
 * Kubernetes documentation](https://kubernetes.io/docs/home/)
 *
 * @see https://aka.ms/azpipes-kubectl-installer-tsg
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/KubectlInstallerV0
 */
export function kubectlInstallerV0(
  inputs: KubectlInstallerV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("KubectlInstaller@0", inputs as unknown as Record<string, unknown>, opts);
}
