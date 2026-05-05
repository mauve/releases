/* eslint-disable */
// Auto-generated from ServiceFabricPowerShellV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { servicefabricConnection } from '../connections.js';

export interface ServiceFabricPowerShellV1Inputs {
  /**
   * Cluster Service Connection
   *
   * Azure Service Fabric cluster which will have an established service connection when
   * executing the specified PowerShell script.
   */
  "serviceConnectionName": servicefabricConnection;
  /**
   * Script Type
   *
   * Type of the script: File Path or Inline Script
   *
   * - `FilePath` — Script File Path
   * - `InlineScript` — Inline Script
   *
   * @default FilePath
   */
  "ScriptType": "FilePath" | "InlineScript";
  /**
   * Script Path
   *
   * Path of the script. Should be fully qualified path or relative to the default working
   * directory.
   *
   * Only meaningful when: `ScriptType = FilePath`
   */
  "ScriptPath"?: string;
  /**
   * Inline Script
   *
   * Enter the script to execute.
   *
   * @default # You can write your PowerShell scripts inline here.
   * # You can also pass predefined and custom variables to this script using arguments
   *
   * Only meaningful when: `ScriptType = InlineScript`
   */
  "Inline"?: string;
  /**
   * Script Arguments
   *
   * Additional parameters to pass to PowerShell. Can be either ordinal or named parameters.
   */
  "ScriptArguments"?: string;
}

/**
 * Service Fabric PowerShell
 *
 * Run a PowerShell script in the context of an Azure Service Fabric cluster connection
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=841538)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/service-fabric-powershell
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/ServiceFabricPowerShellV1
 */
export function serviceFabricPowerShellV1(
  inputs: ServiceFabricPowerShellV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("ServiceFabricPowerShell@1", inputs as unknown as Record<string, unknown>, opts);
}
