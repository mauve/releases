/* eslint-disable */
// Auto-generated from WindowsMachineFileCopyV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface WindowsMachineFileCopyV1Inputs {
  /**
   * Source
   *
   * Absolute path of the source folder or file on the local machine, or a UNC Share like
   * c:\fabrikamfiber or \\\\fabrikamshare\fabrikamfiber.
   */
  "SourcePath": string;
  /**
   * Machines
   *
   * Provide a comma separated list of machine IP addresses or FQDNs. <br>Eg:
   * dbserver.fabrikam.com,192.168.12.34 <br>Or provide output variable of other tasks. Eg:
   * $(variableName)
   */
  "EnvironmentName"?: string;
  /**
   * Admin Login
   *
   * Administrator login for the target machines.
   */
  "AdminUserName"?: string;
  /**
   * Password
   *
   * Password for administrator login for the target machines. <br>It can accept a variable
   * defined in build or release pipelines as '$(passwordVariable)'. <br>You may mark variable as
   * 'secret' to secure it.
   */
  "AdminPassword"?: string;
  /**
   * Destination Folder
   *
   * Local Path on the target machines or an accessible UNC path for copying the files from the
   * source like d:\fabrikam or \\\\fabrikam\Web.
   */
  "TargetPath": string;
  /**
   * Clean Target
   *
   * Selecting it will clean the destination folder before copying the files.
   *
   * @default false
   *
   * In group: advanced
   */
  "CleanTargetBeforeCopy"?: boolean;
  /**
   * Copy Files in Parallel
   *
   * Selecting it will copy files in parallel to the machines.
   *
   * @default true
   *
   * In group: advanced
   */
  "CopyFilesInParallel"?: boolean;
  /**
   * Additional Arguments
   *
   * Additional robocopy arguments that will be applied when copying files like, /min:33553332
   * /l.
   *
   * In group: advanced
   */
  "AdditionalArguments"?: string;
  /**
   * Select Machines By
   *
   * - `machineNames` — Machine Names
   * - `tags` — Tags
   *
   * @default machineNames
   *
   * In group: advanced
   */
  "ResourceFilteringMethod"?: "machineNames" | "tags";
  /**
   * Filter Criteria
   *
   * This input is valid only for machine groups and is not supported for flat list of machines
   * or output variables yet. Provide a list of machines like, dbserver.fabrikam.com,
   * webserver.fabrikam.com, 192.168.12.34, or tags like, Role:DB; OS:Win8.1. If multiple tags
   * are provided, then the task will run in all the machines with the specified tags. The
   * default is to run the task in all machines.
   *
   * In group: advanced
   */
  "MachineNames"?: string;
}

/**
 * Windows machine file copy
 *
 * Copy files to remote Windows machines
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=627415)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/windows-machine-file-copy
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/WindowsMachineFileCopyV1
 */
export function windowsMachineFileCopyV1(
  inputs: WindowsMachineFileCopyV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("WindowsMachineFileCopy@1", inputs as unknown as Record<string, unknown>, opts);
}
