/* eslint-disable */
// Auto-generated from TwineAuthenticateV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { externalPythonUploadFeedConnection } from '../connections.js';

export interface TwineAuthenticateV0Inputs {
  /**
   * My feeds (select below)
   *
   * Select feeds to authenticate present in this organization.
   *
   * In group: feedAuthentication
   */
  "feedList"?: string;
  /**
   * Feeds from external organizations
   *
   * Select endpoints to authenticate outside this organization. Make sure the endpoints have
   * package upload permissions.
   *
   * In group: feedAuthentication
   */
  "externalSources"?: externalPythonUploadFeedConnection;
  /**
   * Publish pipeline metadata
   *
   * Associate this build/release pipeline’s metadata (run #, source code information) with the
   * package when uploading to my feeds.
   *
   * @default true
   *
   * In group: advanced
   */
  "publishPackageMetadata"?: boolean;
}

/**
 * Python twine upload authenticate
 *
 * Authenticate for uploading Python distributions using twine. Add '-r FeedName/EndpointName
 * --config-file $(PYPIRC_PATH)' to your twine upload command. For feeds present in this
 * organization, use the feed name as the repository (-r). Otherwise, use the endpoint name
 * defined in the service connection.
 *
 * [Learn more about this
 * task](https://docs.microsoft.com/azure/devops/pipelines/tasks/package/twine-authenticate) or
 * [see the Twine documentation](https://twine.readthedocs.io/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/package/twine-authenticate
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/TwineAuthenticateV0
 */
export function twineAuthenticateV0(
  inputs: TwineAuthenticateV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("TwineAuthenticate@0", inputs as unknown as Record<string, unknown>, opts);
}
