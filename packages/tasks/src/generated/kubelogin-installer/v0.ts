/* eslint-disable */
// Auto-generated from KubeloginInstallerV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { github_OAuth_OAuth2_PersonalAccessToken_InstallationToken_TokenConnection } from '../connections.js';

export interface KubeloginInstallerV0Inputs {
  /**
   * kubelogin version
   *
   * The version of kubelogin to use
   *
   * @default latest
   */
  "kubeloginVersion"?: string;
  /**
   * GitHub Connection
   *
   * A GitHub connection is needed to prevent anonymous requests limits to the Github API for
   * [Azure/kubelogin](https://github.com/azure/kubelogin) from impacting the installation.
   * Leaving this empty may cause failures if the request limit is reached. This connection does
   * not require ANY permissions.
   */
  "gitHubConnection"?: github_OAuth_OAuth2_PersonalAccessToken_InstallationToken_TokenConnection;
}

/**
 * Kubelogin tool installer
 *
 * Helps to install kubelogin
 *
 * [Learn more about this
 * task](https://learn.microsoft.com/azure/devops/pipelines/tasks/reference/kubelogin-installer-v0)
 * or [see the Kubelogin documentation](https://azure.github.io/kubelogin/index.html)
 *
 * @see https://azure.github.io/kubelogin/index.html
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/KubeloginInstallerV0
 */
export function kubeloginInstallerV0(
  inputs: KubeloginInstallerV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("KubeloginInstaller@0", inputs as unknown as Record<string, unknown>, opts);
}
