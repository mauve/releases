/* eslint-disable */
// Auto-generated from NpmV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface NpmV0Inputs {
  /**
   * working folder
   *
   * Working directory where the npm command is run. Defaults to the root of the repo.
   */
  "cwd"?: string;
  /**
   * npm command
   *
   * @default install
   */
  "command": string;
  /**
   * arguments
   *
   * Additional arguments passed to npm.
   */
  "arguments"?: string;
}

/**
 * npm
 *
 * Run an npm command. Use NpmAuthenticate@0 task for latest capabilities.
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613746)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/package/npm
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/NpmV0
 */
export function npmV0(
  inputs: NpmV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Npm@0", inputs as unknown as Record<string, unknown>, opts);
}
