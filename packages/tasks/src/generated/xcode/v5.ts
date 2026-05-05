/* eslint-disable */
// Auto-generated from XcodeV5/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface XcodeV5Inputs {
  /**
   * Actions
   *
   * Enter a space-delimited list of actions. Some valid options are `build`, `clean`, `test`,
   * `analyze`, and `archive`. For example,`clean build` will run a clean build.
   *
   * @default build
   */
  "actions": string;
  /**
   * Configuration
   *
   * Enter the Xcode project or workspace configuration to be built. The default value of this
   * field is the variable `$(Configuration)`. When using a variable, make sure to specify a
   * value (for example, `Release`) on the **Variables** tab.
   *
   * @default $(Configuration)
   */
  "configuration"?: string;
  /**
   * SDK
   *
   * Specify an SDK to use when building the Xcode project or workspace. From the macOS Terminal
   * application, run `xcodebuild -showsdks` to display the valid list of SDKs. The default value
   * of this field is the variable `$(SDK)`. When using a variable, make sure to specify a value
   * (for example, `iphonesimulator`) on the **Variables** tab.
   *
   * @default $(SDK)
   */
  "sdk"?: string;
  /**
   * Workspace or project path
   *
   * (Optional) Enter a relative path from the root of the repository to the Xcode workspace or
   * project. For example, `MyApp/MyApp.xcworkspace` or `MyApp/MyApp.xcodeproj`. Wildcards can be
   * used ([more information](https://go.microsoft.com/fwlink/?linkid=856077)).
   *
   * @default **​/*.xcodeproj/project.xcworkspace
   */
  "xcWorkspacePath"?: string;
  /**
   * Scheme
   *
   * (Optional) Enter a scheme name defined in Xcode. It must be a shared scheme, with its
   * <strong>Shared</strong> checkbox enabled under <strong>Managed Schemes</strong> in Xcode. If
   * you specify a <strong>Workspace or project path</strong> above without specifying a scheme,
   * and the workspace has a single shared scheme, it will be automatically used.
   */
  "scheme"?: string;
  /**
   * Xcode version
   *
   * Specify the target version of Xcode. Select `Default` to use the default version of Xcode on
   * the agent machine. Selecting a version number (e.g. `Xcode 9`) relies on environment
   * variables being set on the agent machine for the version's location (e.g.
   * `XCODE_9_DEVELOPER_DIR=/Applications/Xcode_9.0.0.app/Contents/Developer`). Select `Specify
   * path` to provide a specific path to the Xcode developer directory.<br/>Note: XCode 12 is
   * installed on macOS-10.15 (or higher)
   *
   * - `8` — Xcode 8
   * - `9` — Xcode 9
   * - `10` — Xcode 10
   * - `11` — Xcode 11
   * - `12` — Xcode 12
   * - `13` — Xcode 13
   * - `default` — Default
   * - `specifyPath` — Specify path
   *
   * @default default
   */
  "xcodeVersion"?: "8" | "9" | "10" | "11" | "12" | "13" | "default" | "specifyPath";
  /**
   * Xcode developer path
   *
   * (Optional) Enter a path to a specific Xcode developer directory (e.g.
   * `/Applications/Xcode_9.0.0.app/Contents/Developer`). This is useful when multiple versions
   * of Xcode are installed on the agent machine.
   *
   * Only meaningful when: `xcodeVersion == specifyPath`
   */
  "xcodeDeveloperDir"?: string;
  /**
   * Create app package
   *
   * Indicate whether an IPA app package file should be generated as a part of the build.
   *
   * @default false
   *
   * In group: package
   */
  "packageApp": boolean;
  /**
   * Archive path
   *
   * (Optional) Specify a directory where created archives should be placed.
   *
   * Only meaningful when: `packageApp == true`
   *
   * In group: package
   */
  "archivePath"?: string;
  /**
   * Export path
   *
   * (Optional) Specify the destination for the product exported from the archive.
   *
   * @default output/$(SDK)/$(Configuration)
   *
   * Only meaningful when: `packageApp == true`
   *
   * In group: package
   */
  "exportPath"?: string;
  /**
   * Export options
   *
   * Select a way of providing options for exporting the archive. When the default value of
   * `Automatic` is selected, the export method is automatically detected from the archive.
   * Select `Plist` to specify a plist file containing export options. Select `Specify` to
   * provide a specific **Export method** and **Team ID**.
   *
   * - `auto` — Automatic
   * - `plist` — Plist
   * - `specify` — Specify
   *
   * @default auto
   *
   * Only meaningful when: `packageApp == true`
   *
   * In group: package
   */
  "exportOptions"?: "auto" | "plist" | "specify";
  /**
   * Export method
   *
   * Enter the method that Xcode should use to export the archive. For example: `app-store`,
   * `package`, `ad-hoc`, `enterprise`, or `development`.
   *
   * @default development
   *
   * Only meaningful when: `exportOptions == specify`
   *
   * In group: package
   */
  "exportMethod"?: string;
  /**
   * Team ID
   *
   * (Optional) Enter the 10-character team ID from the Apple Developer Portal to use during
   * export.
   *
   * Only meaningful when: `exportOptions == specify`
   *
   * In group: package
   */
  "exportTeamId"?: string;
  /**
   * Export options plist
   *
   * Enter the path to the plist file that contains options to use during export.
   *
   * Only meaningful when: `exportOptions == plist`
   *
   * In group: package
   */
  "exportOptionsPlist"?: string;
  /**
   * Export arguments
   *
   * (Optional) Enter additional command line arguments to be used during export.
   *
   * Only meaningful when: `packageApp == true`
   *
   * In group: package
   */
  "exportArgs"?: string;
  /**
   * Signing style
   *
   * Choose the method of signing the build. Select `Do not code sign` to disable signing. Select
   * `Project defaults` to use only the project's signing configuration. Select `Manual signing`
   * to force manual signing and optionally specify a signing identity and provisioning profile.
   * Select `Automatic signing` to force automatic signing and optionally specify a development
   * team ID. If your project requires signing, use the "Install Apple..." tasks to install
   * certificates and provisioning profiles prior to the Xcode build.
   *
   * - `nosign` — Do not code sign
   * - `default` — Project defaults
   * - `manual` — Manual signing
   * - `auto` — Automatic signing
   *
   * @default nosign
   *
   * In group: sign
   */
  "signingOption"?: "nosign" | "default" | "manual" | "auto";
  /**
   * Signing identity
   *
   * (Optional) Enter a signing identity override with which to sign the build. This may require
   * unlocking the default keychain on the agent machine. If no value is entered, the Xcode
   * project's setting will be used.
   *
   * Only meaningful when: `signingOption = manual`
   *
   * In group: sign
   */
  "signingIdentity"?: string;
  /**
   * Provisioning profile UUID
   *
   * (Optional) Enter the UUID of an installed provisioning profile to be used for this build.
   * Use separate build tasks with different schemes or targets to specify separate provisioning
   * profiles by target in a single workspace (iOS, tvOS, watchOS).
   *
   * Only meaningful when: `signingOption = manual`
   *
   * In group: sign
   */
  "provisioningProfileUuid"?: string;
  /**
   * Provisioning profile name
   *
   * (Optional) Enter the name of an installed provisioning profile to be used for this build. If
   * specified, this takes precedence over the provisioning profile UUID. Use separate build
   * tasks with different schemes or targets to specify separate provisioning profiles by target
   * in a single workspace (iOS, tvOS, watchOS).
   *
   * Only meaningful when: `signingOption = manual`
   *
   * In group: sign
   */
  "provisioningProfileName"?: string;
  /**
   * Team ID
   *
   * (Optional, unless you are a member of multiple development teams.) Specify the 10-character
   * development team ID.
   *
   * Only meaningful when: `signingOption = auto`
   *
   * In group: sign
   */
  "teamId"?: string;
  /**
   * Destination platform
   *
   * Select the destination device's platform to be used for UI testing when the generic build
   * device isn't valid. Choose `Custom` to specify a platform not included in this list. When
   * `Default` is selected, no simulators nor devices will be targeted.
   *
   * @default default
   *
   * In group: devices
   */
  "destinationPlatformOption"?: string /* TODO: unknown task input type "picklist" */;
  /**
   * Custom destination platform
   *
   * Enter a destination device's platform to be used for UI testing when the generic build
   * device isn't valid.
   *
   * Only meaningful when: `destinationPlatformOption == custom`
   *
   * In group: devices
   */
  "destinationPlatform"?: string;
  /**
   * Destination type
   *
   * Choose the destination type to be used for UI testing. Devices must be connected to the Mac
   * performing the build via a cable or network connection. See <strong>Devices and
   * Simulators</strong> in Xcode.
   *
   * - `simulators` — Simulator
   * - `devices` — Connected Device
   *
   * @default simulators
   *
   * Only meaningful when: `destinationPlatformOption != default && destinationPlatformOption !=
   * macOS`
   *
   * In group: devices
   */
  "destinationTypeOption"?: "simulators" | "devices";
  /**
   * Simulator
   *
   * Enter an Xcode simulator name to be used for UI testing. For example, enter `iPhone X` (iOS
   * and watchOS) or `Apple TV 4K` (tvOS). A target OS version is optional and can be specified
   * in the format 'OS=<i>versionNumber</i>', such as `iPhone X,OS=11.1`. A list of simulators
   * installed on the <strong>Hosted macOS</strong> agent can be [found
   * here](https://go.microsoft.com/fwlink/?linkid=875290).
   *
   * Only meaningful when: `destinationPlatformOption != default && destinationPlatformOption !=
   * macOS && destinationTypeOption == simulators`
   *
   * In group: devices
   */
  "destinationSimulators"?: string;
  /**
   * Device
   *
   * Enter the name of the device to be used for UI testing, such as `Raisa's iPad`.
   *
   * Only meaningful when: `destinationPlatformOption != default && destinationPlatformOption !=
   * macOS && destinationTypeOption == devices`
   *
   * In group: devices
   */
  "destinationDevices"?: string;
  /**
   * Arguments
   *
   * (Optional) Enter additional command line arguments with which to build. This is useful for
   * specifying `-target` or `-project` arguments instead of specifying a workspace/project and
   * scheme.
   *
   * In group: advanced
   */
  "args"?: string;
  /**
   * Working directory
   *
   * (Optional) Enter the working directory in which to run the build. If no value is entered,
   * the root of the repository will be used.
   *
   * In group: advanced
   */
  "cwd"?: string;
  /**
   * Use xcpretty
   *
   * Specify whether to use xcpretty to format xcodebuild output. Enabling this requires xcpretty
   * to be installed on the agent machine. If xcpretty is not installed, raw xcodebuild output is
   * shown. xcpretty is preinstalled on Azure Pipelines hosted build agents. See
   * [xcpretty](https://github.com/supermarin/xcpretty) on GitHub.
   *
   * @default true
   *
   * In group: advanced
   */
  "useXcpretty"?: boolean;
  /**
   * Xcpretty arguments
   *
   * Additional arguments to pass to xcpretty.
   *
   * Only meaningful when: `useXcpretty == true`
   *
   * In group: advanced
   */
  "xcprettyArgs"?: string;
  /**
   * Publish test results to Azure Pipelines
   *
   * Specify whether to publish JUnit test results to Azure Pipelines. This requires xcpretty to
   * be enabled to generate JUnit test results.
   *
   * @default false
   *
   * In group: advanced
   */
  "publishJUnitResults"?: boolean;
  /**
   * Test run title
   *
   * Title of the test run when publishing JUnit test results to Azure Pipelines.
   *
   * Only meaningful when: `publishJUnitResults == true`
   *
   * In group: advanced
   */
  "testRunTitle"?: string;
}

/**
 * Xcode
 *
 * Build, test, or archive an Xcode workspace on macOS. Optionally package an app.
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613730) or [see the
 * Xcode documentation](https://developer.apple.com/xcode/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/xcode
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/XcodeV5
 */
export function xcodeV5(
  inputs: XcodeV5Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Xcode@5", inputs as unknown as Record<string, unknown>, opts);
}
