/* eslint-disable */
// Auto-generated from InstallAppleProvisioningProfileV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface InstallAppleProvisioningProfileV1Inputs {
  /**
   * Provisioning profile location
   *
   * Select the location of the provisioning profile to install. The provisioning profile can be
   * uploaded to `Secure Files` or stored in your source repository or a local path on the agent.
   *
   * - `secureFiles` — Secure Files
   * - `sourceRepository` — Source Repository
   *
   * @default secureFiles
   */
  "provisioningProfileLocation": "secureFiles" | "sourceRepository";
  /**
   * Provisioning profile
   *
   * Select the provisioning profile that was uploaded to `Secure Files` to install on the macOS
   * agent.
   *
   * Only meaningful when: `provisioningProfileLocation == secureFiles`
   */
  "provProfileSecureFile"?: string;
  /**
   * Provisioning profile
   *
   * Select the provisioning profile from the source repository or specify the local path to a
   * provisioning profile on the macOS agent.
   *
   * Only meaningful when: `provisioningProfileLocation == sourceRepository`
   */
  "provProfileSourceRepository"?: string;
  /**
   * Remove profile after build
   *
   * Select to specify that the provisioning profile should be removed from the agent after the
   * build or release is complete.
   *
   * @default true
   */
  "removeProfile"?: boolean;
}

/**
 * Install Apple provisioning profile
 *
 * Install an Apple provisioning profile required to build on a macOS agent machine
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=862068)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/install-apple-provisioning-profile
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/InstallAppleProvisioningProfileV1
 */
export function installAppleProvisioningProfileV1(
  inputs: InstallAppleProvisioningProfileV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("InstallAppleProvisioningProfile@1", inputs as unknown as Record<string, unknown>, opts);
}
