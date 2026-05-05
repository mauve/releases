/* eslint-disable */
// Auto-generated from AzurePowerShellV5/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzurePowerShellV5Inputs {
  /**
   * Azure Subscription
   *
   * Azure Resource Manager subscription to configure before running PowerShell
   */
  "ConnectedServiceNameARM": AzureRMConnection;
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
  "ScriptType"?: "FilePath" | "InlineScript";
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
   * @default # You can write your azure powershell scripts inline here.
   * # You can also pass predefined and custom variables to this script using arguments
   *
   * Only meaningful when: `ScriptType = InlineScript`
   */
  "Inline"?: string;
  /**
   * Script Arguments
   *
   * Additional parameters to pass to PowerShell. Can be either ordinal or named parameters.
   *
   * Only meaningful when: `ScriptType = FilePath`
   */
  "ScriptArguments"?: string;
  /**
   * ErrorActionPreference
   *
   * Select the value of the ErrorActionPreference variable for executing the script.
   *
   * - `stop` — Stop
   * - `continue` — Continue
   * - `silentlyContinue` — SilentlyContinue
   *
   * @default stop
   */
  "errorActionPreference"?: "stop" | "continue" | "silentlyContinue";
  /**
   * Fail on Standard Error
   *
   * If this is true, this task will fail if any errors are written to the error pipeline, or if
   * any data is written to the Standard Error stream.
   *
   * @default false
   */
  "FailOnStandardError"?: boolean;
  /**
   * Azure PowerShell Version
   *
   * In case of hosted agents, the supported Azure PowerShell Version is: 1.0.0, 1.6.0, 2.3.2,
   * 2.6.0, 3.1.0 (Hosted VS2017 Queue).
   * To pick the latest version available on the agent, select "Latest installed version".
   *
   * For private agents you can specify preferred version of Azure PowerShell using "Specify
   * version"
   *
   * - `LatestVersion` — Latest installed version
   * - `OtherVersion` — Specify other version
   *
   * @default OtherVersion
   *
   * In group: AzurePowerShellVersionOptions
   */
  "TargetAzurePs"?: "LatestVersion" | "OtherVersion";
  /**
   * Preferred Azure PowerShell Version
   *
   * Preferred Azure PowerShell Version needs to be a proper semantic version eg. 1.2.3. Regex
   * like 2.\*,2.3.\* is not supported. The Hosted VS2017 Pool currently supports Az module
   * version: 1.0.0, 1.6.0, 2.3.2, 2.6.0, 3.1.0
   *
   * Only meaningful when: `TargetAzurePs = OtherVersion`
   *
   * In group: AzurePowerShellVersionOptions
   */
  "CustomTargetAzurePs"?: string;
  /**
   * Use PowerShell Core
   *
   * If this is true, then on Windows the task will use pwsh.exe from your PATH instead of
   * powershell.exe.
   *
   * @default false
   *
   * In group: advanced
   */
  "pwsh"?: boolean;
  /**
   * Validate script signature
   *
   * If this is true, then the task will first check to make sure specified script is signed and
   * valid before executing it.
   *
   * @default false
   *
   * Only meaningful when: `ScriptType = FilePath`
   *
   * In group: advanced
   */
  "validateScriptSignature"?: boolean;
  /**
   * Working Directory
   *
   * Working directory where the script is run.
   *
   * In group: advanced
   */
  "workingDirectory"?: string;
}

/**
 * Azure PowerShell
 *
 * Run a PowerShell script within an Azure environment
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613749)
 *
 * @see https://aka.ms/azurepowershelltroubleshooting
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzurePowerShellV5
 */
export function azurePowerShellV5(
  inputs: AzurePowerShellV5Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzurePowerShell@5", inputs as unknown as Record<string, unknown>, opts);
}
