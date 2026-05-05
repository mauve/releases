/* eslint-disable */
// Auto-generated from MavenAuthenticateV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { externalmavenrepositoryConnection } from '../connections.js';

export interface MavenAuthenticateV0Inputs {
  /**
   * Feeds
   */
  "artifactsFeeds"?: string;
  /**
   * Credentials for repositories outside this organization/collection
   *
   * Credentials to use for external repositories located in the project's pom.xml.
   */
  "mavenServiceConnections"?: externalmavenrepositoryConnection;
}

/**
 * Maven Authenticate
 *
 * Provides credentials for Azure Artifacts feeds and external maven repositories
 *
 * [Learn more about this
 * task](https://docs.microsoft.com/azure/devops/pipelines/tasks/package/maven-authenticate)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/package/maven-authenticate
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/MavenAuthenticateV0
 */
export function mavenAuthenticateV0(
  inputs: MavenAuthenticateV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("MavenAuthenticate@0", inputs as unknown as Record<string, unknown>, opts);
}
