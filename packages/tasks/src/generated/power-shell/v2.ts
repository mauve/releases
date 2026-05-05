/* eslint-disable */
// Auto-generated from PowerShellV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface PowerShellV2Inputs {
  /**
   * Type
   *
   * Target script type: File Path or Inline
   *
   * - `filePath` — File Path
   * - `inline` — Inline
   *
   * @default filePath
   */
  "targetType"?: "filePath" | "inline";
  /**
   * Script Path
   *
   * Path of the script to execute. Must be a fully qualified path or relative to
   * $(System.DefaultWorkingDirectory).
   *
   * Only meaningful when: `targetType = filePath`
   */
  "filePath"?: string;
  /**
   * Arguments
   *
   * Arguments passed to the PowerShell script. Either ordinal parameters or named parameters.
   *
   * Only meaningful when: `targetType = filePath`
   */
  "arguments"?: string;
  /**
   * Script
   *
   * @default # Write your PowerShell commands here.
   *
   * Write-Host "Hello World"
   *
   * Only meaningful when: `targetType = inline`
   */
  "script"?: string;
  /**
   * ErrorActionPreference
   *
   * When not `Default`, prepends the line `$ErrorActionPreference = 'VALUE'` at the top of your
   * script.
   *
   * - `default` — Default
   * - `stop` — Stop
   * - `continue` — Continue
   * - `silentlyContinue` — SilentlyContinue
   *
   * @default stop
   *
   * In group: preferenceVariables
   */
  "errorActionPreference"?: "default" | "stop" | "continue" | "silentlyContinue";
  /**
   * WarningPreference
   *
   * When not `Default`, prepends the line `$WarningPreference = 'VALUE'` at the top of your
   * script.
   *
   * - `default` — Default
   * - `stop` — Stop
   * - `continue` — Continue
   * - `silentlyContinue` — SilentlyContinue
   *
   * @default default
   *
   * In group: preferenceVariables
   */
  "warningPreference"?: "default" | "stop" | "continue" | "silentlyContinue";
  /**
   * InformationPreference
   *
   * When not `Default`, prepends the line `$InformationPreference = 'VALUE'` at the top of your
   * script.
   *
   * - `default` — Default
   * - `stop` — Stop
   * - `continue` — Continue
   * - `silentlyContinue` — SilentlyContinue
   *
   * @default default
   *
   * In group: preferenceVariables
   */
  "informationPreference"?: "default" | "stop" | "continue" | "silentlyContinue";
  /**
   * VerbosePreference
   *
   * When not `Default`, prepends the line `$VerbosePreference = 'VALUE'` at the top of your
   * script.
   *
   * - `default` — Default
   * - `stop` — Stop
   * - `continue` — Continue
   * - `silentlyContinue` — SilentlyContinue
   *
   * @default default
   *
   * In group: preferenceVariables
   */
  "verbosePreference"?: "default" | "stop" | "continue" | "silentlyContinue";
  /**
   * DebugPreference
   *
   * When not `Default`, prepends the line `$DebugPreference = 'VALUE'` at the top of your
   * script.
   *
   * - `default` — Default
   * - `stop` — Stop
   * - `continue` — Continue
   * - `silentlyContinue` — SilentlyContinue
   *
   * @default default
   *
   * In group: preferenceVariables
   */
  "debugPreference"?: "default" | "stop" | "continue" | "silentlyContinue";
  /**
   * ProgressPreference
   *
   * When not `Default`, prepends the line `$ProgressPreference = 'VALUE'` at the top of your
   * script.
   *
   * - `default` — Default
   * - `stop` — Stop
   * - `continue` — Continue
   * - `silentlyContinue` — SilentlyContinue
   *
   * @default silentlyContinue
   *
   * In group: preferenceVariables
   */
  "progressPreference"?: "default" | "stop" | "continue" | "silentlyContinue";
  /**
   * Fail on Standard Error
   *
   * If this is true, this task will fail if any errors are written to the error pipeline, or if
   * any data is written to the Standard Error stream. Otherwise the task will rely on the exit
   * code to determine failure.
   *
   * @default false
   *
   * In group: advanced
   */
  "failOnStderr"?: boolean;
  /**
   * Show warnings as Azure DevOps warnings
   *
   * If this is true, and your script writes a warnings - they are shown as warnings also in
   * pipeline logs
   *
   * @default false
   *
   * In group: advanced
   */
  "showWarnings"?: boolean;
  /**
   * Ignore $LASTEXITCODE
   *
   * If this is false, the line `if ((Test-Path -LiteralPath variable:\LASTEXITCODE)) { exit
   * $LASTEXITCODE }` is appended to the end of your script. This will cause the last exit code
   * from an external command to be propagated as the exit code of powershell. Otherwise the line
   * is not appended to the end of your script.
   *
   * @default false
   *
   * In group: advanced
   */
  "ignoreLASTEXITCODE"?: boolean;
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
   * Working Directory
   *
   * Working directory where the script is run.
   *
   * In group: advanced
   */
  "workingDirectory"?: string;
  /**
   * Run script in the separate scope
   *
   * This input allows executing PowerShell scripts using '&' operator instead of the default
   * '.'. If this input set to the true script will be executed in separate scope and globally
   * scoped PowerShell variables won't be updated
   *
   * @default false
   *
   * In group: advanced
   */
  "runScriptInSeparateScope"?: boolean;
}

/**
 * PowerShell
 *
 * Run a PowerShell script on Linux, macOS, or Windows
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613736)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/powershell
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/PowerShellV2
 */
export function powerShellV2(
  inputs: PowerShellV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("PowerShell@2", inputs as unknown as Record<string, unknown>, opts);
}
