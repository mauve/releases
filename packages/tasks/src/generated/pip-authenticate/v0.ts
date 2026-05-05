/* eslint-disable */
// Auto-generated from PipAuthenticateV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { externalPythonDownloadFeedConnection } from '../connections.js';

export interface PipAuthenticateV0Inputs {
  /**
   * My feeds (select below)
   *
   * Select feeds to authenticate present in this organization
   *
   * In group: feedAuthentication
   */
  "feedList"?: string;
  /**
   * Feeds from external organizations
   *
   * Select endpoints to authenticate outside this organization.
   *
   * In group: feedAuthentication
   */
  "externalSources"?: externalPythonDownloadFeedConnection;
}

/**
 * Python pip authenticate
 *
 * Authentication task for the pip client used for installing Python distributions
 *
 * [Learn more about this task](https://pip.pypa.io/en/stable/reference/pip_install/) or [see
 * the pip documentation](https://pip.pypa.io/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/package/pip-authenticate
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/PipAuthenticateV0
 */
export function pipAuthenticateV0(
  inputs: PipAuthenticateV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("PipAuthenticate@0", inputs as unknown as Record<string, unknown>, opts);
}
