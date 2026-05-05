/* eslint-disable */
// Auto-generated from WindowsMachineFileCopyV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface WindowsMachineFileCopyV2Inputs {
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
  "MachineNames": string;
  /**
   * Admin Login
   *
   * Administrator login for the target machines.
   */
  "AdminUserName": string;
  /**
   * Password
   *
   * Password for administrator login for the target machines. <br>It can accept a variable
   * defined in build or release pipelines as '$(passwordVariable)'. <br>You may mark the
   * variable as 'secret' to secure it.
   */
  "AdminPassword": string;
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
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/WindowsMachineFileCopyV2
 */
export function windowsMachineFileCopyV2(
  inputs: WindowsMachineFileCopyV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("WindowsMachineFileCopy@2", inputs as unknown as Record<string, unknown>, opts);
}
