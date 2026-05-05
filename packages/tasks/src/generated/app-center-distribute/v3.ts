/* eslint-disable */
// Auto-generated from AppCenterDistributeV3/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { vsmobilecenterConnection } from '../connections.js';

export interface AppCenterDistributeV3Inputs {
  /**
   * App Center service connection
   *
   * Select the service connection for Visual Studio App Center. To create one, click the Manage
   * link and create a new service connection.
   */
  "serverEndpoint": vsmobilecenterConnection;
  /**
   * App slug
   *
   * The app slug is in the format of **{username}/{app_identifier}**. To locate **{username}**
   * and **{app_identifier}** for an app, click on its name from https://appcenter.ms/apps, and
   * the resulting URL is in the format of
   * [https://appcenter.ms/users/<b>{username}</b>/apps/<b>{app_identifier}</b>](https://appcenter.ms/users/{username}/apps/{app_identifier}).
   * If you are using orgs, the app slug is of the format **{orgname}/{app_identifier}**.
   */
  "appSlug": string;
  /**
   * Binary file path
   *
   * Relative path from the repo root to the APK/AAB or IPA file you want to publish
   */
  "app": string;
  /**
   * Build version
   *
   * The build version of the uploading binary which needs to be specified for `.zip` and `.msi`.
   * This value will be ignored unless the platform is WPF or WinForms.
   */
  "buildVersion"?: string;
  /**
   * Symbols type
   *
   * Include symbol files to receive symbolicated stack traces in App Center Diagnostics.
   *
   * - `Apple` — Apple
   * - `Android` — Android
   * - `UWP` — UWP
   *
   * @default Apple
   *
   * In group: symbols
   */
  "symbolsType"?: "Apple" | "Android" | "UWP";
  /**
   * Symbols path
   *
   * Relative path from the repo root to the symbols folder.
   *
   * Only meaningful when: `symbolsType == AndroidNative || symbolsType = Windows`
   *
   * In group: symbols
   */
  "symbolsPath"?: string;
  /**
   * Symbols path (*.appxsym)
   *
   * Relative path from the repo root to APPXSYM symbols file.
   *
   * Only meaningful when: `symbolsType = UWP`
   *
   * In group: symbols
   */
  "appxsymPath"?: string;
  /**
   * dSYM path
   *
   * Relative path from the repo root to dSYM folder. Path may contain wildcards.
   *
   * Only meaningful when: `symbolsType = Apple`
   *
   * In group: symbols
   */
  "dsymPath"?: string;
  /**
   * Mapping file
   *
   * Relative path from the repo root to Android's mapping.txt file.
   *
   * Only meaningful when: `symbolsType = Android`
   *
   * In group: symbols
   */
  "mappingTxtPath"?: string;
  /**
   * Native Library File Path
   *
   * Relative path from the repo root to the additional native libraries you want to publish
   * (e.g. .so files).
   *
   * Only meaningful when: `symbolsType == Android`
   *
   * In group: symbols
   */
  "nativeLibrariesPath"?: string;
  /**
   * Include all items in parent folder
   *
   * Upload the selected symbols file or folder and all other items inside the same parent
   * folder. This is required for React Native apps.
   *
   * Only meaningful when: `symbolsType = Apple`
   *
   * In group: symbols
   */
  "packParentFolder"?: boolean;
  /**
   * Create release notes
   *
   * Release notes will be attached to the release and shown to testers on the installation page.
   *
   * - `input` — Enter Release Notes
   * - `file` — Select Release Notes File
   *
   * @default input
   */
  "releaseNotesSelection": "input" | "file";
  /**
   * Release notes
   *
   * Release notes for this version.
   *
   * Only meaningful when: `releaseNotesSelection = input`
   */
  "releaseNotesInput"?: string;
  /**
   * Release notes file
   *
   * Select a UTF-8 encoded text file which contains the Release Notes for this version.
   *
   * Only meaningful when: `releaseNotesSelection = file`
   */
  "releaseNotesFile"?: string;
  /**
   * Require users to update to this release
   *
   * App Center Distribute SDK required to mandate update. Testers will automatically be prompted
   * to update.
   *
   * @default false
   */
  "isMandatory"?: boolean;
  /**
   * Release destination
   *
   * Each release will be distributed to either groups or a store.
   *
   * - `groups` — Groups
   * - `store` — Store
   *
   * @default groups
   */
  "destinationType": "groups" | "store";
  /**
   * Destination IDs
   *
   * IDs of the distribution groups to release to. Leave it empty to use the default group and
   * use commas or semicolons to separate multiple IDs.
   *
   * Only meaningful when: `destinationType = groups`
   */
  "destinationGroupIds"?: string;
  /**
   * Destination ID
   *
   * ID of the distribution store to deploy to.
   *
   * Only meaningful when: `destinationType = store`
   */
  "destinationStoreId"?: string;
  /**
   * Do not notify testers. Release will still be available to install.
   *
   * Testers will not receive an email for new releases.
   *
   * Only meaningful when: `destinationType = groups`
   */
  "isSilent"?: boolean;
}

/**
 * App Center distribute
 *
 * Distribute app builds to testers and users via Visual Studio App Center
 *
 * For help with this task, visit the Visual Studio App Center [support
 * site](https://aka.ms/appcentersupport/).
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/app-center-distribute
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AppCenterDistributeV3
 */
export function appCenterDistributeV3(
  inputs: AppCenterDistributeV3Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AppCenterDistribute@3", inputs as unknown as Record<string, unknown>, opts);
}
