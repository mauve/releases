/* eslint-disable */
// Auto-generated from NuGetAuthenticateV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { ExternalNuGetFeedConnection } from '../connections.js';

export interface NuGetAuthenticateV1Inputs {
  /**
   * Service connection credentials for feeds outside this organization
   *
   * Comma-separated list of NuGet service connection names for feeds outside this
   * organization/collection. For feeds in this organization/collection, leave this blank; the
   * build’s credentials are used automatically.
   */
  "nuGetServiceConnections"?: ExternalNuGetFeedConnection;
  /**
   * Reinstall the credential provider even if already installed
   *
   * If the credential provider is already installed in the user profile, determines if it is
   * overwritten with the task-provided credential provider. This may upgrade (or potentially
   * downgrade) the credential provider.
   *
   * @default false
   */
  "forceReinstallCredentialProvider"?: boolean;
}

/**
 * NuGet authenticate
 *
 * Configure NuGet tools to authenticate with Azure Artifacts and other NuGet repositories.
 * Requires NuGet >= 4.8.5385, dotnet >= 6, or MSBuild >= 15.8.166.59604
 *
 * [Learn more about this task](https://aka.ms/NuGetAuthenticateTask)
 *
 * @see https://aka.ms/NuGetAuthenticateTask
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/NuGetAuthenticateV1
 */
export function nuGetAuthenticateV1(
  inputs: NuGetAuthenticateV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("NuGetAuthenticate@1", inputs as unknown as Record<string, unknown>, opts);
}
