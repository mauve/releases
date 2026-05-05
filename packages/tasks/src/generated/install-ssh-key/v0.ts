/* eslint-disable */
// Auto-generated from InstallSSHKeyV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface InstallSSHKeyV0Inputs {
  /**
   * Known Hosts Entry
   *
   * The entry for this SSH key for the known_hosts file. Supports several hosts.
   */
  "hostName": string;
  /**
   * SSH Public Key
   *
   * The contents of the public SSH key. If not specified it will be generated out of private
   * key.
   */
  "sshPublicKey"?: string;
  /**
   * SSH Passphrase
   *
   * The passphrase for the SSH key, if any.
   */
  "sshPassphrase"?: string;
  /**
   * SSH Key
   *
   * Select the SSH key that was uploaded to `Secure Files` to install on the agent.
   */
  "sshKeySecureFile": string;
  /**
   * Add entry to SSH config
   *
   * Add entry related to the key installed to the SSH config file. The key file will be
   * available for all subsequent tasks.
   *
   * @default false
   *
   * In group: advanced
   */
  "addEntryToConfig"?: boolean;
  /**
   * Alias
   *
   * Name of SSH config entry
   *
   * Only meaningful when: `addEntryToConfig = true`
   *
   * In group: advanced
   */
  "configHostAlias"?: string;
  /**
   * Host name
   *
   * Host name property of SSH config entry
   *
   * Only meaningful when: `addEntryToConfig = true`
   *
   * In group: advanced
   */
  "configHostname"?: string;
  /**
   * User
   *
   * Username property of SSH config entry
   *
   * Only meaningful when: `addEntryToConfig = true`
   *
   * In group: advanced
   */
  "configUser"?: string;
  /**
   * Port
   *
   * Port of SSH config entry
   *
   * Only meaningful when: `addEntryToConfig = true`
   *
   * In group: advanced
   */
  "configPort"?: string;
}

/**
 * Install SSH key
 *
 * Install an SSH key prior to a build or deployment
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=875267)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/install-ssh-key
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/InstallSSHKeyV0
 */
export function installSSHKeyV0(
  inputs: InstallSSHKeyV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("InstallSSHKey@0", inputs as unknown as Record<string, unknown>, opts);
}
