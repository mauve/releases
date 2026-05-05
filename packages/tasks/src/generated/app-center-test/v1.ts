/* eslint-disable */
// Auto-generated from AppCenterTestV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { vsmobilecenterConnection } from '../connections.js';

export interface AppCenterTestV1Inputs {
  /**
   * Binary application file path
   *
   * Relative path from the repo root to the APK or IPA file you want to test.
   */
  "app": string;
  /**
   * Artifacts directory
   *
   * Where to place the artifacts produced by the prepare step and used by the run step. This
   * directory will be created if it does not exist.
   *
   * @default $(Build.ArtifactStagingDirectory)/AppCenterTest
   */
  "artifactsDir": string;
  /**
   * Prepare tests
   *
   * @default true
   *
   * In group: prepare
   */
  "enablePrepare"?: boolean;
  /**
   * Test framework
   *
   * - `appium` — Appium
   * - `espresso` — Espresso
   * - `calabash` — Calabash
   * - `uitest` — Xamarin UI Test
   * - `xcuitest` — XCUITest
   *
   * @default appium
   *
   * Only meaningful when: `enablePrepare = true`
   *
   * In group: prepare
   */
  "framework"?: "appium" | "espresso" | "calabash" | "uitest" | "xcuitest";
  /**
   * Build directory
   *
   * Path to directory with Appium tests.
   *
   * Only meaningful when: `enablePrepare = true && framework = appium`
   *
   * In group: prepare
   */
  "appiumBuildDir"?: string;
  /**
   * Build directory
   *
   * Path to Espresso output directory.
   *
   * Only meaningful when: `enablePrepare = true && framework = espresso`
   *
   * In group: prepare
   */
  "espressoBuildDir"?: string;
  /**
   * Test APK path
   *
   * Path to APK file with Espresso tests. If not set, build-dir is used to discover it. Wildcard
   * is allowed.
   *
   * Only meaningful when: `enablePrepare = true && framework = espresso`
   *
   * In group: prepare
   */
  "espressoTestApkPath"?: string;
  /**
   * Project directory
   *
   * Path to Calabash workspace directory.
   *
   * Only meaningful when: `enablePrepare = true && framework = calabash`
   *
   * In group: prepare
   */
  "calabashProjectDir"?: string;
  /**
   * Cucumber config file
   *
   * Path to Cucumber configuration file, usually cucumber.yml.
   *
   * Only meaningful when: `enablePrepare = true && framework = calabash`
   *
   * In group: prepare
   */
  "calabashConfigFile"?: string;
  /**
   * Profile to run
   *
   * Profile to run. This value must exists in the Cucumber configuration file.
   *
   * Only meaningful when: `enablePrepare = true && framework = calabash`
   *
   * In group: prepare
   */
  "calabashProfile"?: string;
  /**
   * Skip Configuration Check
   *
   * Force running without Cucumber profile.
   *
   * @default false
   *
   * Only meaningful when: `enablePrepare = true && framework = calabash`
   *
   * In group: prepare
   */
  "calabashSkipConfigCheck"?: boolean;
  /**
   * Build directory
   *
   * Path to directory with built test assemblies.
   *
   * Only meaningful when: `enablePrepare = true && framework = uitest`
   *
   * In group: prepare
   */
  "uitestBuildDir"?: string;
  /**
   * Store file
   *
   * Only meaningful when: `enablePrepare = true && framework = uitest`
   *
   * In group: prepare
   */
  "uitestStorePath"?: string;
  /**
   * Store password
   *
   * Only meaningful when: `enablePrepare = true && framework = uitest`
   *
   * In group: prepare
   */
  "uitestStorePass"?: string;
  /**
   * Key alias
   *
   * Only meaningful when: `enablePrepare = true && framework = uitest`
   *
   * In group: prepare
   */
  "uitestKeyAlias"?: string;
  /**
   * Key password
   *
   * Only meaningful when: `enablePrepare = true && framework = uitest`
   *
   * In group: prepare
   */
  "uitestKeyPass"?: string;
  /**
   * Test tools directory
   *
   * Path to directory with Xamarin UI test tools that contains test-cloud.exe.
   *
   * Only meaningful when: `enablePrepare = true && framework = uitest`
   *
   * In group: prepare
   */
  "uitestToolsDir"?: string;
  /**
   * Signing information
   *
   * Use Signing Infor for signing the test server.
   *
   * Only meaningful when: `framework = calabash || framework = uitest`
   *
   * In group: prepare
   */
  "signInfo"?: string;
  /**
   * Build directory
   *
   * Path to the build output directory (usually $(ProjectDir)/Build/Products/Debug-iphoneos).
   *
   * Only meaningful when: `enablePrepare = true && framework = xcuitest`
   *
   * In group: prepare
   */
  "xcuitestBuildDir"?: string;
  /**
   * Test IPA path
   *
   * Path to the *.ipa file with the XCUITest tests.
   *
   * Only meaningful when: `enablePrepare = true && framework = xcuitest`
   *
   * In group: prepare
   */
  "xcuitestTestIpaPath"?: string;
  /**
   * Additional options
   *
   * Additional arguments passed to the App Center test prepare step.
   *
   * Only meaningful when: `enablePrepare = true`
   *
   * In group: prepare
   */
  "prepareOpts"?: string;
  /**
   * Run tests
   *
   * @default true
   *
   * In group: run
   */
  "enableRun"?: boolean;
  /**
   * Authentication method
   *
   * Use App Center service connection or enter credentials to connect to Visual Studio App
   * Center.
   *
   * - `serviceEndpoint` — App Center service connection
   * - `inputs` — Credentials
   *
   * @default serviceEndpoint
   *
   * Only meaningful when: `enableRun = true`
   *
   * In group: run
   */
  "credsType"?: "serviceEndpoint" | "inputs";
  /**
   * App Center service connection
   *
   * Select the service connection for Visual Studio App Center. To create one, click the Manage
   * link and create a new service connection.
   *
   * Only meaningful when: `enableRun = true && credsType = serviceEndpoint`
   *
   * In group: run
   */
  "serverEndpoint"?: vsmobilecenterConnection;
  /**
   * App Center username
   *
   * Visit https://appcenter.ms/settings/profile to get your username.
   *
   * Only meaningful when: `enableRun = true && credsType = inputs`
   *
   * In group: run
   */
  "username"?: string;
  /**
   * App Center password
   *
   * Visit https://appcenter.ms/settings/profile to set your password. It can accept a variable
   * defined in build or release pipelines as '$(passwordVariable)'. You may mark variable type
   * as 'secret' to secure it.
   *
   * Only meaningful when: `enableRun = true && credsType = inputs`
   *
   * In group: run
   */
  "password"?: string;
  /**
   * App slug
   *
   * The app slug is in the format of {username}/{app_identifier}. To locate {username} and
   * {app_identifier} for an app, click on its name from https://appcenter.ms/apps, and the
   * resulting URL is in the format of
   * https://appcenter.ms/users/{username}/apps/{app_identifier}.
   *
   * Only meaningful when: `enableRun = true`
   *
   * In group: run
   */
  "appSlug"?: string;
  /**
   * Devices
   *
   * String to identify what devices this test will run against. Copy and paste this string when
   * you define a new test run from App Center Test beacon.
   *
   * Only meaningful when: `enableRun = true`
   *
   * In group: run
   */
  "devices"?: string;
  /**
   * Test series
   *
   * The series name for organizing test runs (e.g. master, production, beta).
   *
   * @default master
   *
   * Only meaningful when: `enableRun = true`
   *
   * In group: run
   */
  "series"?: string;
  /**
   * dSYM directory
   *
   * Path to iOS symbol files.
   *
   * Only meaningful when: `enableRun = true`
   *
   * In group: run
   */
  "dsymDir"?: string;
  /**
   * System language
   *
   * If your language isn't displayed, select 'Other' and enter its locale below, such as en_US.
   *
   * - `da_DK` — Danish (Denmark)
   * - `nl_NL` — Dutch (Netherlands)
   * - `en_GB` — English (United Kingdom)
   * - `en_US` — English (United States)
   * - `fr_FR` — French (France)
   * - `de_DE` — German (Germany)
   * - `ja_JP` — Japanese (Japan)
   * - `ru_RU` — Russian (Russia)
   * - `es_MX` — Spanish (Mexico)
   * - `es_ES` — Spanish (Spain)
   * - `user` — Other
   *
   * @default en_US
   *
   * Only meaningful when: `enableRun = true`
   *
   * In group: run
   */
  "locale"?: "da_DK" | "nl_NL" | "en_GB" | "en_US" | "fr_FR" | "de_DE" | "ja_JP" | "ru_RU" | "es_MX" | "es_ES" | "user";
  /**
   * Other locale
   *
   * Enter any two-letter ISO-639 language code along with any two-letter ISO 3166 country code
   * in the format [language]_[country], such as en_US.
   *
   * Only meaningful when: `enableRun = true && locale = user`
   *
   * In group: run
   */
  "userDefinedLocale"?: string;
  /**
   * Additional options for login
   *
   * Additional arguments passed to the App Center login step.
   *
   * Only meaningful when: `enableRun = true && credsType = inputs`
   *
   * In group: run
   */
  "loginOpts"?: string;
  /**
   * Additional options for run
   *
   * Additional arguments passed to the App Center test run.
   *
   * Only meaningful when: `enableRun = true`
   *
   * In group: run
   */
  "runOpts"?: string;
  /**
   * Do not wait for test result
   *
   * Execute command asynchronously, exit when tests are uploaded, without waiting for test
   * results.
   *
   * @default false
   *
   * Only meaningful when: `enableRun = true`
   *
   * In group: run
   */
  "async"?: boolean;
  /**
   * App Center CLI location
   *
   * Path to the App Center CLI on the build or release agent.
   *
   * In group: advanced
   */
  "cliLocationOverride"?: string;
  /**
   * Enable debug output
   *
   * Add --debug to the App Center CLI.
   *
   * @default false
   *
   * In group: advanced
   */
  "debug"?: boolean;
}

/**
 * App Center test
 *
 * Test app packages with Visual Studio App Center
 *
 * For help with this task, visit the Visual Studio App Center [support
 * site](https://aka.ms/appcentersupport).
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/test/app-center-test
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AppCenterTestV1
 */
export function appCenterTestV1(
  inputs: AppCenterTestV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AppCenterTest@1", inputs as unknown as Record<string, unknown>, opts);
}
