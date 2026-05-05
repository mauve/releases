/* eslint-disable */
// Auto-generated from FuncToolsInstallerV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface FuncToolsInstallerV0Inputs {
  /**
   * Version
   *
   * Specify the version of Azure func tools to install.
   * Ex:<br><br>2.7.1575<br>v2.7.1575<br>latest
   *
   * @default latest
   */
  "version"?: string;
}

/**
 * Install Azure Func Core Tools
 *
 * Install Azure Func Core Tools
 *
 * [Learn more about this task](https://aka.ms/func-tools-installer)
 *
 * @see https://aka.ms/func-tools-installer
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/FuncToolsInstallerV0
 */
export function funcToolsInstallerV0(
  inputs: FuncToolsInstallerV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("FuncToolsInstaller@0", inputs as unknown as Record<string, unknown>, opts);
}
