/* eslint-disable */
// Auto-generated from AndroidSigningV3/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface AndroidSigningV3Inputs {
  /**
   * APK files
   *
   * Relative path from the repo root to the APK(s) you want to sign. You can use wildcards to
   * specify multiple files ([more information](https://go.microsoft.com/fwlink/?linkid=856077)).
   * For example, `**​/bin/*.apk` for all .APK files in the 'bin' subfolder
   *
   * @default **​/*.apk
   */
  "files": string;
  /**
   * Sign the APK
   *
   * Select this option to sign the APK with a provided keystore file. Unsigned APKs can only run
   * in an emulator. APKs must be signed to run on a device.
   *
   * @default true
   *
   * In group: apksignerOptions
   */
  "apksign"?: boolean;
  /**
   * Keystore file
   *
   * Select the keystore file that was uploaded to `Secure Files` to be used to sign the APK.
   *
   * Only meaningful when: `apksign = true`
   *
   * In group: apksignerOptions
   */
  "keystoreFile"?: string;
  /**
   * Keystore password
   *
   * Enter the password for the provided keystore file. Use a new variable with its lock enabled
   * on the Variables tab to encrypt this value.
   *
   * Only meaningful when: `apksign = true`
   *
   * In group: apksignerOptions
   */
  "keystorePass"?: string;
  /**
   * Alias
   *
   * Enter the alias that identifies the public/private key pair to be used in the keystore file.
   *
   * Only meaningful when: `apksign = true`
   *
   * In group: apksignerOptions
   */
  "keystoreAlias"?: string;
  /**
   * Key password
   *
   * Enter the key password for the alias and keystore file. Use a new variable with its lock
   * enabled on the Variables tab to encrypt this value.
   *
   * Only meaningful when: `apksign = true`
   *
   * In group: apksignerOptions
   */
  "keyPass"?: string;
  /**
   * apksigner version
   *
   * Enter Android SDK build-tools version to look apksigner executable from.
   *
   * @default latest
   *
   * Only meaningful when: `apksign = true`
   *
   * In group: apksignerOptions
   */
  "apksignerVersion"?: string;
  /**
   * apksigner arguments
   *
   * Provide any options to pass to the apksigner command line. Default is: --verbose
   *
   * @default --verbose
   *
   * Only meaningful when: `apksign = true`
   *
   * In group: apksignerOptions
   */
  "apksignerArguments"?: string;
  /**
   * apksigner location
   *
   * Optionally specify the location of the apksigner executable used during signing. This
   * defaults to the apksigner found in the Android SDK version folder that your application
   * builds against.
   *
   * Only meaningful when: `apksign = true`
   *
   * In group: apksignerOptions
   */
  "apksignerLocation"?: string;
  /**
   * Zipalign
   *
   * Select if you want to zipalign your package. This reduces the amount of RAM consumed by an
   * app.
   *
   * @default true
   *
   * In group: zipalignOptions
   */
  "zipalign"?: boolean;
  /**
   * Zipalign version
   *
   * Enter Android SDK build-tools version to look zipalign executable from.
   *
   * @default latest
   *
   * Only meaningful when: `zipalign = true`
   *
   * In group: zipalignOptions
   */
  "zipalignVersion"?: string;
  /**
   * Zipalign location
   *
   * Optionally specify the location of the zipalign executable used during signing. This
   * defaults to the zipalign found in the Android SDK version folder that your application
   * builds against.
   *
   * Only meaningful when: `zipalign = true`
   *
   * In group: zipalignOptions
   */
  "zipalignLocation"?: string;
}

/**
 * Android signing
 *
 * Sign and align Android APK files
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613717)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/android-signing
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AndroidSigningV3
 */
export function androidSigningV3(
  inputs: AndroidSigningV3Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AndroidSigning@3", inputs as unknown as Record<string, unknown>, opts);
}
