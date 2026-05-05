/* eslint-disable */
// Auto-generated from CargoAuthenticateV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { externalcargorepositoryConnection } from '../connections.js';

export interface CargoAuthenticateV0Inputs {
  /**
   * config.toml file to authenticate
   *
   * Path to the config.toml file that specifies the registries you want to work with. Select the
   * file, not the folder e.g. "/.cargo/config.toml".
   */
  "configFile": string;
  /**
   * Credentials for registries outside this organization/collection
   *
   * Credentials to use for external registries located in the project's config.toml. For
   * registries in this organization/collection, leave this blank; the build’s credentials are
   * used automatically.
   */
  "cargoServiceConnections"?: externalcargorepositoryConnection;
}

/**
 * Cargo authenticate (for task runners)
 *
 * Authentication task for the cargo client used for installing Cargo crates distribution
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/CargoAuthenticateV0
 */
export function cargoAuthenticateV0(
  inputs: CargoAuthenticateV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("CargoAuthenticate@0", inputs as unknown as Record<string, unknown>, opts);
}
