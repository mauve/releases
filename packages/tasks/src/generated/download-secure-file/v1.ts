/* eslint-disable */
// Auto-generated from DownloadSecureFileV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface DownloadSecureFileV1Inputs {
  /**
   * Secure File
   *
   * The file name or GUID of the secure file to download to the agent machine. The file will be
   * deleted after the pipeline runs.
   */
  "secureFile": string;
  /**
   * Retry Count
   *
   * Optional number of times to retry downloading a secure file if the download fails.
   *
   * @default 8
   */
  "retryCount"?: string;
  /**
   * Socket Timeout
   *
   * Optional timeout for a socket associated with downloading secure file request in ms.
   */
  "socketTimeout"?: string;
}

/**
 * Download secure file
 *
 * Download a secure file to the agent machine
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=862069)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/download-secure-file
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DownloadSecureFileV1
 */
export function downloadSecureFileV1(
  inputs: DownloadSecureFileV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("DownloadSecureFile@1", inputs as unknown as Record<string, unknown>, opts);
}
