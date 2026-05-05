/* eslint-disable */
// Auto-generated from DockerInstallerV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface DockerInstallerV0Inputs {
  /**
   * Docker Version
   *
   * Specify the version of Docker CLI to install
   *
   * @default 17.09.0-ce
   */
  "dockerVersion": string;
  /**
   * Release type
   *
   * Pick the release type to install. Nightly is not supported on Windows
   *
   * - `stable` — stable
   * - `edge` — edge
   * - `test` — test
   * - `nightly` — nightly
   *
   * @default stable
   */
  "releaseType"?: "stable" | "edge" | "test" | "nightly";
}

/**
 * Docker CLI installer
 *
 * Install Docker CLI on agent machine.
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=851275)
 *
 * @see https://aka.ms/azpipes-docker-installer-tsg
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DockerInstallerV0
 */
export function dockerInstallerV0(
  inputs: DockerInstallerV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("DockerInstaller@0", inputs as unknown as Record<string, unknown>, opts);
}
