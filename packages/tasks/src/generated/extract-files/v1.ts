/* eslint-disable */
// Auto-generated from ExtractFilesV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface ExtractFilesV1Inputs {
  /**
   * Archive file patterns
   *
   * File paths or patterns of the archive files to extract. Supports multiple lines of minimatch
   * patterns. [More Information](https://go.microsoft.com/fwlink/?LinkId=800269)
   *
   * @default **​/*.zip
   */
  "archiveFilePatterns": string;
  /**
   * Destination folder
   *
   * Destination folder into which archive files should be extracted. Use
   * [variables](https://go.microsoft.com/fwlink/?LinkID=550988) if files are not in the repo.
   * Example: $(agent.builddirectory)
   */
  "destinationFolder": string;
  /**
   * Clean destination folder before extracting
   *
   * Select this option to clean the destination directory before archive contents are extracted
   * into it.
   *
   * @default true
   */
  "cleanDestinationFolder": boolean;
  /**
   * Overwrite existing files
   *
   * Select this option to overwrite existing files in the destination directory.
   *
   * @default false
   */
  "overwriteExistingFiles": boolean;
  /**
   * Path to 7z utility
   *
   * You can specify custom path to 7z utility. For example, "C:\7z\7z.exe" on Windows and
   * "/usr/local/bin/7z" on MacOS/Ubuntu.
   */
  "pathToSevenZipTool"?: string;
}

/**
 * Extract files
 *
 * Extract a variety of archive and compression files such as .7z, .rar, .tar.gz, and .zip
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkId=800269)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/extract-files
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/ExtractFilesV1
 */
export function extractFilesV1(
  inputs: ExtractFilesV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("ExtractFiles@1", inputs as unknown as Record<string, unknown>, opts);
}
