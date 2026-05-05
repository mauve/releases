/* eslint-disable */
// Auto-generated from CopyFilesOverSSHV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { sshConnection } from '../connections.js';

export interface CopyFilesOverSSHV0Inputs {
  /**
   * SSH service connection
   *
   * SSH service connection with connection details for the remote machine.
   */
  "sshEndpoint": sshConnection;
  /**
   * Source folder
   *
   * The source folder of the files to copy to the remote machine. When empty, the root of the
   * repository (build) or artifacts directory (release) is used, which is
   * $(System.DefaultWorkingDirectory). Use
   * [variables](https://go.microsoft.com/fwlink/?LinkID=550988) if files are not in the
   * repository. Example: $(Agent.BuildDirectory)
   */
  "sourceFolder"?: string;
  /**
   * Contents
   *
   * File paths to include as part of the copy. Supports multiple lines of minimatch patterns.
   * [More Information](https://go.microsoft.com/fwlink/?LinkId=821894)
   *
   * @default **
   */
  "contents": string;
  /**
   * Target folder
   *
   * Target folder on the remote machine to where files will be copied. Example:
   * /home/user/MySite.
   */
  "targetFolder"?: string;
  /**
   * Target machine running Windows
   *
   * Target machine running Windows
   *
   * @default false
   *
   * In group: advanced
   */
  "isWindowsOnTarget"?: boolean;
  /**
   * Clean target folder
   *
   * Delete all existing files and subfolders in the target folder before copying.
   *
   * @default false
   *
   * In group: advanced
   */
  "cleanTargetFolder"?: boolean;
  /**
   * Remove hidden files in target folder
   *
   * Remove hidden files in the target folder.
   *
   * @default false
   *
   * Only meaningful when: `cleanTargetFolder = true`
   *
   * In group: advanced
   */
  "cleanHiddenFilesInTarget"?: boolean;
  /**
   * SSH handshake timeout
   *
   * How long (in milliseconds) to wait for the SSH handshake to complete.
   *
   * @default 20000
   *
   * In group: advanced
   */
  "readyTimeout": string;
  /**
   * Overwrite
   *
   * Replace existing files in and beneath the target folder.
   *
   * @default true
   *
   * In group: advanced
   */
  "overwrite"?: boolean;
  /**
   * Fail if no files found to copy
   *
   * Fail if no matching files to be copied are found under the source folder.
   *
   * @default false
   *
   * In group: advanced
   */
  "failOnEmptySource"?: boolean;
  /**
   * Flatten folders
   *
   * Flatten the folder structure and copy all files into the specified target folder on the
   * remote machine.
   *
   * @default false
   *
   * In group: advanced
   */
  "flattenFolders"?: boolean;
  /**
   * Number of concurrent uploads when copying files
   *
   * Number of concurrent uploads when copying files. Default is 10.
   *
   * @default 10
   *
   * In group: advanced
   */
  "concurrentUploads"?: string;
  /**
   * Delay between queueing uploads (in milliseconds)
   *
   * Delay between queueing uploads (in milliseconds). Default is 50.
   *
   * @default 50
   *
   * In group: advanced
   */
  "delayBetweenUploads"?: string;
}

/**
 * Copy files over SSH
 *
 * Copy files or build artifacts to a remote machine over SSH
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkId=821894)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/copy-files-over-ssh
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/CopyFilesOverSSHV0
 */
export function copyFilesOverSSHV0(
  inputs: CopyFilesOverSSHV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("CopyFilesOverSSH@0", inputs as unknown as Record<string, unknown>, opts);
}
