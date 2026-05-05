/* eslint-disable */
// Auto-generated from GoToolV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface GoToolV0Inputs {
  /**
   * Version
   *
   * The Go version to download (if necessary) and use. Example: 1.9.3
   *
   * @default 1.10
   */
  "version": string;
  /**
   * GOPATH
   *
   * A custom value for the GOPATH environment variable.
   *
   * In group: advanced
   */
  "goPath"?: string;
  /**
   * GOBIN
   *
   * A custom value for the GOBIN environment variable.
   *
   * In group: advanced
   */
  "goBin"?: string;
  /**
   * Go download URL
   *
   * URL for downloading Go binaries. Only https://go.dev/dl (official) and
   * https://aka.ms/golang/release/latest (Microsoft build prefix) are supported. If omitted, the
   * official Go download URL (https://go.dev/dl) will be used. You can also set the
   * 'GOTOOL_GODOWNLOADURL' environment variable to specify the download URL. The parameter takes
   * priority over the environment variable if both are set.
   *
   * @default https://go.dev/dl
   *
   * In group: advanced
   */
  "goDownloadUrl"?: string;
}

/**
 * Go tool installer
 *
 * Find in cache or download a specific version of Go and add it to the PATH
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=867581) or [see the Go
 * documentation](https://golang.org/doc/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/tool/go-tool
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/GoToolV0
 */
export function goToolV0(
  inputs: GoToolV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("GoTool@0", inputs as unknown as Record<string, unknown>, opts);
}
