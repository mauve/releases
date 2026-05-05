/* eslint-disable */
// Auto-generated from NpmAuthenticateV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { externalnpmregistryConnection } from '../connections.js';

export interface NpmAuthenticateV0Inputs {
  /**
   * .npmrc file to authenticate
   *
   * Path to the .npmrc file that specifies the registries you want to work with. Select the
   * file, not the folder e.g. "/packages/mypackage.npmrc".
   */
  "workingFile": string;
  /**
   * Credentials for registries outside this organization/collection
   *
   * Credentials to use for external registries located in the project's .npmrc. For registries
   * in this organization/collection, leave this blank; the build’s credentials are used
   * automatically.
   */
  "customEndpoint"?: externalnpmregistryConnection;
}

/**
 * npm authenticate (for task runners)
 *
 * Don't use this task if you're also using the npm task. Provides npm credentials to an .npmrc
 * file in your repository for the scope of the build. This enables npm task runners like gulp
 * and Grunt to authenticate with private registries.
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/package/npm-authenticate
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/NpmAuthenticateV0
 */
export function npmAuthenticateV0(
  inputs: NpmAuthenticateV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("npmAuthenticate@0", inputs as unknown as Record<string, unknown>, opts);
}
