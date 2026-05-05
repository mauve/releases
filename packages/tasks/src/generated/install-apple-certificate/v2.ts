/* eslint-disable */
// Auto-generated from InstallAppleCertificateV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface InstallAppleCertificateV2Inputs {
  /**
   * Certificate (P12)
   *
   * Select the certificate (.p12) that was uploaded to `Secure Files` to install on the macOS
   * agent.
   */
  "certSecureFile": string;
  /**
   * Certificate (P12) password
   *
   * Password to the Apple certificate (.p12). Use a new build variable with its lock enabled on
   * the `Variables` tab to encrypt this value.
   */
  "certPwd"?: string;
  /**
   * Keychain
   *
   * Select the keychain in which to install the Apple certificate. For Microsoft hosted builds,
   * use `Temporary Keychain`. A temporary keychain will always be deleted after the build or
   * release is complete.
   *
   * - `default` — Default Keychain
   * - `temp` — Temporary Keychain
   * - `custom` — Custom Keychain
   *
   * @default temp
   *
   * In group: advanced
   */
  "keychain": "default" | "temp" | "custom";
  /**
   * Keychain password
   *
   * Password to unlock the keychain. Use a new build variable with its lock enabled on the
   * `Variables` tab to encrypt this value.
   *
   * Only meaningful when: `keychain = custom || keychain = default`
   *
   * In group: advanced
   */
  "keychainPassword"?: string;
  /**
   * Custom keychain path
   *
   * Full path to a custom keychain file. The keychain will be created if it does not exist.
   *
   * Only meaningful when: `keychain = custom`
   *
   * In group: advanced
   */
  "customKeychainPath"?: string;
  /**
   * Delete certificate from keychain
   *
   * Select to delete the certificate from the keychain after the build or release is complete.
   *
   * Only meaningful when: `keychain = custom || keychain = default`
   *
   * In group: advanced
   */
  "deleteCert"?: boolean;
  /**
   * Delete custom keychain
   *
   * Select to delete the custom keychain from the agent after the build or release is complete.
   *
   * Only meaningful when: `keychain = custom`
   *
   * In group: advanced
   */
  "deleteCustomKeychain"?: boolean;
  /**
   * Certificate signing identity
   *
   * The Common Name of the subject in the signing certificate. Will attempt to parse the Common
   * Name if this is left empty.
   *
   * In group: advanced
   */
  "signingIdentity"?: string;
  /**
   * Set up partition_id ACL for the imported private key
   *
   * If true - sets the partition_id ACL for the imported private key, so codesign won't prompt
   * to use the key for signing. This isn't necessary for temporary keychains, at least on MacOS
   * High Sierra. See the [link](http://www.openradar.me/28524119) for more details.
   *
   * In group: advanced
   */
  "setUpPartitionIdACLForPrivateKey"?: boolean;
  /**
   * OpenSSL arguments for PKCS12
   *
   * Arguments for extraction certificate information using openssl.
   *
   * In group: advanced
   */
  "opensslPkcsArgs"?: string;
}

/**
 * Install Apple certificate
 *
 * Install an Apple certificate required to build on a macOS agent machine
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=862067)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/install-apple-certificate
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/InstallAppleCertificateV2
 */
export function installAppleCertificateV2(
  inputs: InstallAppleCertificateV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("InstallAppleCertificate@2", inputs as unknown as Record<string, unknown>, opts);
}
