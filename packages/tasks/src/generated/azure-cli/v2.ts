/* eslint-disable */
// Auto-generated from AzureCLIV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureCLIV2Inputs {
  /**
   * Azure Resource Manager connection
   *
   * Select an Azure Resource Manager service connection for the deployment
   */
  "connectedServiceNameARM": AzureRMConnection;
  /**
   * Script Type
   *
   * Type of script: PowerShell/PowerShell Core/Bat/Shell script. Select Shell/PowerShell Core
   * script when running on Linux agent or Batch/PowerShell/PowerShell Core script when running
   * on Windows agent. PowerShell Core script can run on cross-platform agents (Linux, macOS, or
   * Windows).
   *
   * - `ps` — PowerShell
   * - `pscore` — PowerShell Core
   * - `batch` — Batch
   * - `bash` — Shell
   */
  "scriptType": "ps" | "pscore" | "batch" | "bash";
  /**
   * Script Location
   *
   * Path to script: File path or Inline script
   *
   * - `inlineScript` — Inline script
   * - `scriptPath` — Script path
   *
   * @default scriptPath
   */
  "scriptLocation": "inlineScript" | "scriptPath";
  /**
   * Script Path
   *
   * Fully qualified path of the script(.ps1 or .bat or .cmd when using Windows based agent else
   * .ps1 or .sh when using linux based agent) or a path relative to the the default working
   * directory
   *
   * Only meaningful when: `scriptLocation = scriptPath`
   */
  "scriptPath"?: string;
  /**
   * Inline Script
   *
   * You can write your scripts inline here. When using Windows agent, use PowerShell or
   * PowerShell Core or batch scripting whereas use PowerShell Core or shell scripting when using
   * Linux based agents. For batch files use the prefix "call" before every azure command. You
   * can also pass predefined and custom variables to this script using arguments
   *
   * example for PowerShell/PowerShellCore/shell:
   * az --version
   * az account show
   *
   * example for batch:
   * call az --version
   * call az account show
   *
   * Only meaningful when: `scriptLocation = inlineScript`
   */
  "inlineScript"?: string;
  /**
   * Script Arguments
   *
   * Arguments passed to the script
   */
  "scriptArguments"?: string;
  /**
   * ErrorActionPreference
   *
   * Prepends the line `$ErrorActionPreference = 'VALUE'` at the top of your
   * powershell/powershell core script.
   *
   * - `stop` — Stop
   * - `continue` — Continue
   * - `silentlyContinue` — SilentlyContinue
   *
   * @default stop
   *
   * Only meaningful when: `scriptType = ps || scriptType = pscore`
   */
  "powerShellErrorActionPreference"?: "stop" | "continue" | "silentlyContinue";
  /**
   * Access service principal details in script
   *
   * Adds service principal id, service principal key and tenant id of the Azure endpoint you
   * chose to the script's execution environment. You can use variables: `servicePrincipalId`,
   * `servicePrincipalKey` and `tenantId` in your script.
   *
   * This is honored only when the Azure endpoint has Service Principal authentication scheme.
   *
   * Syntax to access environment variables based on script type.
   *
   * Powershell script: $env:servicePrincipalId
   *
   * Batch script: %servicePrincipalId%
   *
   * Shell script: $servicePrincipalId
   *
   * @default false
   *
   * In group: advanced
   */
  "addSpnToEnvironment"?: boolean;
  /**
   * Use global Azure CLI configuration
   *
   * If this is false, this task will use its own separate [Azure CLI configuration
   * directory](https://docs.microsoft.com/en-us/cli/azure/azure-cli-configuration?view=azure-cli-latest#cli-configuration-file).
   * This can be used to run Azure CLI tasks in *parallel* releases
   *
   * @default false
   *
   * In group: advanced
   */
  "useGlobalConfig"?: boolean;
  /**
   * Working Directory
   *
   * Current working directory where the script is run. Empty is the root of the repo (build) or
   * artifacts (release), which is $(System.DefaultWorkingDirectory)
   *
   * In group: advanced
   */
  "cwd"?: string;
  /**
   * Fail on Standard Error
   *
   * If this is true, this task will fail when any errors are written to the StandardError
   * stream. Unselect the checkbox to ignore standard errors and rely on exit codes to determine
   * the status
   *
   * @default false
   *
   * In group: advanced
   */
  "failOnStandardError"?: boolean;
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
   * Only meaningful when: `scriptType = ps || scriptType = pscore`
   *
   * In group: advanced
   */
  "powerShellIgnoreLASTEXITCODE"?: boolean;
  /**
   * az login output visibility
   *
   * If this is set to true, az login command will output to the task. Setting it to false will
   * suppress the az login output
   *
   * @default true
   *
   * In group: advanced
   */
  "visibleAzLogin"?: boolean;
  /**
   * [Experimental] Keep Azure CLI session active
   *
   * When enabled, this task will continuously sign into Azure to avoid AADSTS700024 errors when
   * requesting access tokens beyond the IdToken expiry date. Note that this feature is
   * EXPERIMENTAL, may not work in all scenarios and you are using it without any guarantees.
   * Valid only for service connections using the Workload Identity Federation authentication
   * scheme.
   *
   * @default false
   *
   * In group: advanced
   */
  "keepAzSessionActive"?: boolean;
}

/**
 * Azure CLI
 *
 * Run Azure CLI commands against an Azure subscription in a PowerShell Core/Shell script when
 * running on Linux agent or PowerShell/PowerShell Core/Batch script when running on Windows
 * agent.
 *
 * [Learn more about this
 * task](http://github.com/microsoft/azure-pipelines-tasks/blob/master/Tasks/AzureCLIV2/Readme.md)
 * or [see the Azure CLI documentation](https://docs.microsoft.com/cli/azure/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/azure-cli
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureCLIV2
 */
export function azureCLIV2(
  inputs: AzureCLIV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureCLI@2", inputs as unknown as Record<string, unknown>, opts);
}
