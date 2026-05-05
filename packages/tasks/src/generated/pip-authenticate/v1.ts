/* eslint-disable */
// Auto-generated from PipAuthenticateV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { externalPythonDownloadFeedConnection } from '../connections.js';

export interface PipAuthenticateV1Inputs {
  /**
   * My feeds (select below)
   *
   * Select feeds to authenticate present in this organization
   *
   * In group: feedAuthentication
   */
  "artifactFeeds"?: string;
  /**
   * Feeds from external organizations
   *
   * Select endpoints to authenticate outside this organization.
   *
   * In group: feedAuthentication
   */
  "pythonDownloadServiceConnections"?: externalPythonDownloadFeedConnection;
  /**
   * Don't set primary index URL
   *
   * If this is set to true, no feed will be set as the primary index URL. All of the configured
   * feeds/endpoints will be set as extra index URLs. Defaults to false.
   *
   * @default false
   *
   * In group: feedAuthentication
   */
  "onlyAddExtraIndex"?: boolean;
}

/**
 * Python pip authenticate
 *
 * Authentication task for the pip client used for installing Python distributions
 *
 * [Learn more about this
 * task](https://docs.microsoft.com/azure/devops/pipelines/tasks/package/pip-authenticate) or
 * [see the pip documentation](https://pip.pypa.io/en/stable/reference/pip_install/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/package/pip-authenticate
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/PipAuthenticateV1
 */
export function pipAuthenticateV1(
  inputs: PipAuthenticateV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("PipAuthenticate@1", inputs as unknown as Record<string, unknown>, opts);
}
