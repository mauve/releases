/* eslint-disable */
// Auto-generated from UseNodeV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface UseNodeV1Inputs {
  /**
   * Version
   *
   * Version Spec of the version to use. Examples: 10.x, 10.15.1, >=10.15.0
   *
   * @default 10.x
   */
  "version"?: string;
  /**
   * Check for Latest Version
   *
   * Always checks online for the latest available version that satisfies the version spec. This
   * is typically false unless you have a specific scenario to always get latest. This will cause
   * it to incur download costs when potentially not necessary, especially with the hosted build
   * pool.
   *
   * @default false
   */
  "checkLatest"?: boolean;
  /**
   * Use 32 bit version on x64 agents
   *
   * Installs the x86 version of Node regardless of the CPU architecture of the agent.
   *
   * @default false
   */
  "force32bit"?: boolean;
  /**
   * Set source for Node.js binaries
   *
   * Use an alternative installation mirror when sourcing the Node.js binaries.
   *
   * @default https://nodejs.org/dist
   *
   * In group: advanced
   */
  "nodejsMirror"?: string;
  /**
   * Set retry count when nodes downloads failed
   *
   * Use this option when the task failed to download node binaries from the mirror. The task
   * will retry to download the binaries for the specified times.
   *
   * @default 5
   *
   * In group: advanced
   */
  "retryCountOnDownloadFails"?: string;
  /**
   * Set delay between retries
   *
   * Use this option to set the delay between retries in milliseconds. The default value is 1000
   * milliseconds.
   *
   * @default 1000
   *
   * In group: advanced
   */
  "delayBetweenRetries"?: string;
}

/**
 * Use Node.js ecosystem
 *
 * Set up a Node.js environment and add it to the PATH, additionally providing proxy support
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/UseNodeV1
 */
export function useNodeV1(
  inputs: UseNodeV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("UseNode@1", inputs as unknown as Record<string, unknown>, opts);
}
