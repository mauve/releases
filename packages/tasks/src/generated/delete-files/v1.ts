/* eslint-disable */
// Auto-generated from DeleteFilesV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface DeleteFilesV1Inputs {
  /**
   * Source Folder
   *
   * The source folder that the deletion(s) will be run from. Empty is the root of the repo. Use
   * [variables](https://go.microsoft.com/fwlink/?LinkID=550988) if files are not in the repo.
   * Example: $(agent.builddirectory)
   */
  "SourceFolder"?: string;
  /**
   * Contents
   *
   * File/folder paths to delete. Supports multiple lines of minimatch patterns. [More
   * Information](https://go.microsoft.com/fwlink/?LinkID=722333)
   *
   * @default myFileShare
   */
  "Contents": string;
  /**
   * Remove SourceFolder
   *
   * Attempt to remove the source folder as well.
   *
   * @default false
   */
  "RemoveSourceFolder"?: boolean;
  /**
   * Remove files starting with a dot
   *
   * Delete files starting with a dot (.git, .dockerfile). Omits these files if it's not
   * specified explicitly (for example, '/.*'). Please see this
   * [link](https://github.com/isaacs/minimatch#dot) for more info
   *
   * @default false
   *
   * In group: advanced
   */
  "RemoveDotFiles"?: boolean;
}

/**
 * Delete files
 *
 * Delete folders, or files matching a pattern
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=722333)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/delete-files
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DeleteFilesV1
 */
export function deleteFilesV1(
  inputs: DeleteFilesV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("DeleteFiles@1", inputs as unknown as Record<string, unknown>, opts);
}
