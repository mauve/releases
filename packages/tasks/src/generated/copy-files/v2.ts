/* eslint-disable */
// Auto-generated from CopyFilesV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface CopyFilesV2Inputs {
  /**
   * Source Folder
   *
   * The source folder that the copy pattern(s) will be run from. Empty is the root of the repo.
   * Use [variables](https://go.microsoft.com/fwlink/?LinkID=550988) if files are not in the
   * repo. Example: $(agent.builddirectory)
   */
  "SourceFolder"?: string;
  /**
   * Contents
   *
   * File paths to include as part of the copy. Supports multiple lines of match patterns. [More
   * Information](https://go.microsoft.com/fwlink/?LinkID=708389)
   *
   * @default **
   */
  "Contents": string;
  /**
   * Target Folder
   *
   * Target folder or UNC path files will copy to. You can use
   * [variables](http://go.microsoft.com/fwlink/?LinkID=550988). Example:
   * $(build.artifactstagingdirectory)
   */
  "TargetFolder": string;
  /**
   * Clean Target Folder
   *
   * Delete all existing files in target folder before copy
   *
   * @default false
   *
   * In group: advanced
   */
  "CleanTargetFolder"?: boolean;
  /**
   * Overwrite
   *
   * Replace existing file in target folder
   *
   * @default false
   *
   * In group: advanced
   */
  "OverWrite"?: boolean;
  /**
   * Flatten Folders
   *
   * Flatten the folder structure and copy all files into the specified target folder.
   *
   * @default false
   *
   * In group: advanced
   */
  "flattenFolders"?: boolean;
  /**
   * Preserve Target Timestamp
   *
   * Using the original source file, preserve the target file timestamp.
   *
   * @default false
   *
   * In group: advanced
   */
  "preserveTimestamp"?: boolean;
  /**
   * Retry count to copy the file
   *
   * Specify the retry count to copy the file. It might help to resolve intermittent issues e.g.
   * with UNC target paths on a remote host.
   *
   * @default 0
   *
   * In group: advanced
   */
  "retryCount"?: string;
  /**
   * Delay between two retries.
   *
   * Specify the delay between two retries. It might help to be more resilient to intermittent
   * issues e.g. with UNC target paths on a remote host.
   *
   * @default 1000
   *
   * In group: advanced
   */
  "delayBetweenRetries"?: string;
  /**
   * Ignore errors during creation of target folder.
   *
   * Ignore errors which happen during creation of target folder. This could be useful to avoid
   * issues with parallel execution of task by several agents with one target folder.
   *
   * @default false
   *
   * In group: advanced
   */
  "ignoreMakeDirErrors"?: boolean;
}

/**
 * Copy files
 *
 * Copy files from a source folder to a target folder using patterns matching file paths (not
 * folder paths)
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=708389)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/copy-files
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/CopyFilesV2
 */
export function copyFilesV2(
  inputs: CopyFilesV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("CopyFiles@2", inputs as unknown as Record<string, unknown>, opts);
}
