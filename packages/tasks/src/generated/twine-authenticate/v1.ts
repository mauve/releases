/* eslint-disable */
// Auto-generated from TwineAuthenticateV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { externalPythonUploadFeedConnection } from '../connections.js';

export interface TwineAuthenticateV1Inputs {
  /**
   * My feed name (select below)
   *
   * Select a feed to authenticate present in this organization.
   *
   * In group: feedAuthentication
   */
  "artifactFeed"?: string;
  /**
   * Feed from external organizations
   *
   * Select an endpoint to authenticate outside this organization. Make sure the endpoint has
   * package upload permissions.
   *
   * In group: feedAuthentication
   */
  "pythonUploadServiceConnection"?: externalPythonUploadFeedConnection;
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
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/TwineAuthenticateV1
 */
export function twineAuthenticateV1(
  inputs: TwineAuthenticateV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("TwineAuthenticate@1", inputs as unknown as Record<string, unknown>, opts);
}
