/* eslint-disable */
// Auto-generated from NodeTaskRunnerInstallerV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface NodeTaskRunnerInstallerV0Inputs {
  /**
   * Version of runner to install
   *
   * Select the node version to install.
   *
   * - `6` — Node.js 6.17.1
   * - `10` — Node.js 10.24.1
   * - `16` — Node.js 16.20.2
   *
   * @default 6
   */
  "runnerVersion": "6" | "10" | "16";
}

/**
 * Node.js tasks runner installer
 *
 * Install specific Node.js version to run node tasks
 *
 * [Learn more about this
 * task](https://learn.microsoft.com/azure/devops/pipelines/tasks/reference/node-task-runner-installer-v0)
 *
 * @see
 * https://learn.microsoft.com/azure/devops/pipelines/tasks/reference/node-task-runner-installer-v0
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/NodeTaskRunnerInstallerV0
 */
export function nodeTaskRunnerInstallerV0(
  inputs: NodeTaskRunnerInstallerV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("NodeTaskRunnerInstaller@0", inputs as unknown as Record<string, unknown>, opts);
}
