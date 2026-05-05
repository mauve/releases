/* eslint-disable */
// Auto-generated from PowerShellOnTargetMachinesV3/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface PowerShellOnTargetMachinesV3Inputs {
  /**
   * Machines
   *
   * Provide a comma separated list of machine IP addresses or FQDNs along with ports. Port is
   * defaulted based on the selected protocol. <br>Eg:
   * dbserver.fabrikam.com,dbserver_int.fabrikam.com:5986,192.168.12.34:5986 <br>Or provide build
   * or release variables. Eg: $(variableName) <br>If you are using HTTPS, name/IP of machine
   * should match the CN in the certificate.
   */
  "Machines": string;
  /**
   * Username
   *
   * Username for the target machines. The user should be a part of Administrators group or WinRM
   * remote management users group. <br> Eg: Format: Domain\Admin User, Admin User@Domain,
   * .\Admin User
   */
  "UserName"?: string;
  /**
   * Password
   *
   * password for the target machines. <br>It can accept variable defined in build or release
   * pipelines as '$(passwordVariable)'. <br>You may mark variable type as 'secret' to secure it.
   */
  "UserPassword"?: string;
  /**
   * Script Type
   *
   * The type of script to execute: Inline or File Path
   *
   * - `FilePath` — File Path
   * - `Inline` — Inline
   *
   * @default Inline
   *
   * In group: ScriptOptions
   */
  "ScriptType"?: "FilePath" | "Inline";
  /**
   * Script File Path
   *
   * Location of the PowerShell script on the target machines or on a UNC path like
   * C:\BudgetIT\Web\Deploy\Website.ps1 which should be accessible from the target machine.
   *
   * Only meaningful when: `ScriptType = FilePath`
   *
   * In group: ScriptOptions
   */
  "ScriptPath"?: string;
  /**
   * Script
   *
   * @default # Write your powershell commands here.
   *
   * Write-Output "Hello World"
   *
   * Only meaningful when: `ScriptType = Inline`
   *
   * In group: ScriptOptions
   */
  "InlineScript"?: string;
  /**
   * Script Arguments
   *
   * Arguments for the PowerShell script. Can be ordinal parameters or named parameters like
   * -testParam test
   *
   * Only meaningful when: `ScriptType = FilePath`
   *
   * In group: ScriptOptions
   */
  "ScriptArguments"?: string;
  /**
   * Initialization script
   *
   * Location of the data script for DSC on the target machines or on a UNC path like
   * C:\BudgetIT\Web\Deploy\WebsiteConfiguration.ps1
   *
   * Only meaningful when: `ScriptType = FilePath`
   *
   * In group: ScriptOptions
   */
  "InitializationScript"?: string;
  /**
   * Session Variables
   *
   * Set common session variables for both the scripts. Variable assignments should be valid
   * PowerShell statements.
   *
   * Only meaningful when: `ScriptType = FilePath`
   *
   * In group: ScriptOptions
   */
  "SessionVariables"?: string;
  /**
   * Protocol
   *
   * Select the protocol to use for the WinRM service connection with the machine(s). Default is
   * HTTPS.
   *
   * - `Http` — HTTP
   * - `Https` — HTTPS
   *
   * @default Https
   *
   * In group: SessionOptions
   */
  "CommunicationProtocol"?: "Http" | "Https";
  /**
   * Authentication
   *
   * Select the authentication mechanism to be used for creating the pssession. For 'CredSSP'
   * authentication, username and password fields are mandatory.
   *
   * - `Default` — Default
   * - `Credssp` — CredSSP
   *
   * @default Default
   *
   * In group: SessionOptions
   */
  "AuthenticationMechanism"?: "Default" | "Credssp";
  /**
   * Session Option parameters
   *
   * Advanced options for remote session (New-PSSessionOption). For example, -SkipCACheck,
   * -SkipCNCheck, -SkipRevocationCheck etc. For a complete list of all session options, see
   * [this](https://aka.ms/Vsts_PS_TM_v3_NewPSSessionOptions)
   *
   * @default -SkipCACheck -IdleTimeout 7200000 -OperationTimeout 0 -OutputBufferingMode Block
   *
   * In group: SessionOptions
   */
  "NewPsSessionOptionArguments"?: string;
  /**
   * ErrorActionPreference
   *
   * Prepends the line `$ErrorActionPreference = 'VALUE'` at the top of your script.
   *
   * - `stop` — Stop
   * - `continue` — Continue
   * - `silentlyContinue` — SilentlyContinue
   *
   * @default stop
   *
   * In group: ErrorHandlingOptions
   */
  "ErrorActionPreference"?: "stop" | "continue" | "silentlyContinue";
  /**
   * Fail on Standard Error
   *
   * If this is true, this task will fail if any errors are written to the error pipeline, or if
   * any data is written to the Standard Error stream. Otherwise the task will rely on the exit
   * code to determine failure.
   *
   * @default false
   *
   * In group: ErrorHandlingOptions
   */
  "failOnStderr"?: boolean;
  /**
   * Ignore $LASTEXITCODE
   *
   * If this is false, the line `if ((Test-Path -LiteralPath variable:\LASTEXITCODE)) { exit
   * $LASTEXITCODE }` is executed at the end of your script. This will cause the last exit code
   * from an external command to be propagated as the exit code of powershell. Otherwise the line
   * is not executed to the end of your script.
   *
   * @default false
   *
   * In group: ErrorHandlingOptions
   */
  "ignoreLASTEXITCODE"?: boolean;
  /**
   * Working Directory
   *
   * Working directory where the script is run.
   *
   * In group: advanced
   */
  "WorkingDirectory"?: string;
  /**
   * Run PowerShell in Parallel
   *
   * Setting it to true will run the PowerShell scripts in parallel on the target machines.
   *
   * @default true
   *
   * In group: advanced
   */
  "RunPowershellInParallel"?: boolean;
}

/**
 * PowerShell on target machines
 *
 * Execute PowerShell scripts on remote machines using PSSession and Invoke-Command for
 * remoting
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=873465)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/powershell-on-target-machines
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/PowerShellOnTargetMachinesV3
 */
export function powerShellOnTargetMachinesV3(
  inputs: PowerShellOnTargetMachinesV3Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("PowerShellOnTargetMachines@3", inputs as unknown as Record<string, unknown>, opts);
}
