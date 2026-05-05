/* eslint-disable */
// Auto-generated from UniversalPackagesV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { externaltfsConnection } from '../connections.js';

export interface UniversalPackagesV0Inputs {
  /**
   * Command
   *
   * The Universal Package command to run.
   *
   * - `download` — Download
   * - `publish` — Publish
   *
   * @default download
   */
  "command"?: "download" | "publish";
  /**
   * Destination directory
   *
   * Folder path where the package's contents will be downloaded.
   *
   * @default $(System.DefaultWorkingDirectory)
   *
   * Only meaningful when: `command = download`
   */
  "downloadDirectory"?: string;
  /**
   * Feed location
   *
   * You can either select a feed from this collection or any other collection in Azure
   * Artifacts.
   *
   * - `internal` — This organization/collection
   * - `external` — Another organization/collection
   *
   * @default internal
   *
   * In group: packageDownloadDetails
   */
  "internalOrExternalDownload"?: "internal" | "external";
  /**
   * organization/collection connection
   *
   * Credentials to use for external feeds.
   *
   * Only meaningful when: `internalOrExternalDownload = external`
   *
   * In group: packageDownloadDetails
   */
  "externalEndpoint"?: externaltfsConnection;
  /**
   * Feed
   *
   * Only meaningful when: `internalOrExternalDownload = internal`
   *
   * In group: packageDownloadDetails
   */
  "feedListDownload"?: string;
  /**
   * Package name
   *
   * Only meaningful when: `internalOrExternalDownload = internal`
   *
   * In group: packageDownloadDetails
   */
  "packageListDownload"?: string;
  /**
   * Version
   *
   * Select the package version or use a variable containing the version to download. This can
   * also be a wildcard expression such as * to get the highest version, 1.* to get the highest
   * version with major version 1, or 1.2.* to get the highest patch release with major version 1
   * and minor version 2.
   *
   * Only meaningful when: `internalOrExternalDownload = internal`
   *
   * In group: packageDownloadDetails
   */
  "versionListDownload"?: string;
  /**
   * Feed (or Project/Feed if the feed was created in a project)
   *
   * If the feed was created in a project, this should be Project/Feed where Project is project's
   * name or ID and Feed is the feed's name. If not created in a project, this should be only the
   * feed name.
   *
   * Only meaningful when: `internalOrExternalDownload = external`
   *
   * In group: packageDownloadDetails
   */
  "feedDownloadExternal"?: string;
  /**
   * Package name
   *
   * Package name
   *
   * Only meaningful when: `internalOrExternalDownload = external`
   *
   * In group: packageDownloadDetails
   */
  "packageDownloadExternal"?: string;
  /**
   * Version
   *
   * Select the package version or use a variable containing the version to download. This can
   * also be a wildcard expression such as * to get the highest version, 1.* to get the highest
   * version with major version 1, or 1.2.* to get the highest patch release with major version 1
   * and minor version 2.
   *
   * Only meaningful when: `internalOrExternalDownload = external`
   *
   * In group: packageDownloadDetails
   */
  "versionDownloadExternal"?: string;
  /**
   * Path to file(s) to publish
   *
   * Specifies the path to list of files to be published.
   *
   * @default $(Build.ArtifactStagingDirectory)
   *
   * Only meaningful when: `command = publish`
   */
  "publishDirectory"?: string;
  /**
   * Feed location
   *
   * You can either select a feed from this collection or any other collection in Azure
   * Artifacts.
   *
   * - `internal` — This organization/collection
   * - `external` — Another organization/collection
   *
   * @default internal
   *
   * In group: packagePublishDetails
   */
  "internalOrExternalPublish"?: "internal" | "external";
  /**
   * organization/collection connection
   *
   * Credentials to use for external feeds.
   *
   * Only meaningful when: `internalOrExternalPublish = external`
   *
   * In group: packagePublishDetails
   */
  "externalEndpoints"?: externaltfsConnection;
  /**
   * Destination Feed
   *
   * Only meaningful when: `internalOrExternalPublish = internal`
   *
   * In group: packagePublishDetails
   */
  "feedListPublish"?: string;
  /**
   * Publish pipeline metadata
   *
   * Associate this build/release pipeline’s metadata (run #, source code information) with the
   * package
   *
   * @default true
   *
   * Only meaningful when: `command = publish && internalOrExternalPublish = internal`
   *
   * In group: advanced
   */
  "publishPackageMetadata"?: boolean;
  /**
   * Package name
   *
   * Select a package ID to publish or type a new package ID if you've never published a version
   * of this package before. Package names must be lower case and can only use letters, numbers,
   * and dashes(-).
   *
   * Only meaningful when: `internalOrExternalPublish = internal`
   *
   * In group: packagePublishDetails
   */
  "packageListPublish"?: string;
  /**
   * Feed (or Project/Feed if the feed was created in a project)
   *
   * If the feed was created in a project, this should be Project/Feed where Project is project's
   * name or ID and Feed is the feed's name. If not created in a project, this should be only the
   * feed name.
   *
   * Only meaningful when: `internalOrExternalPublish = external`
   *
   * In group: packagePublishDetails
   */
  "feedPublishExternal"?: string;
  /**
   * Package name
   *
   * Package name
   *
   * Only meaningful when: `internalOrExternalPublish = external`
   *
   * In group: packagePublishDetails
   */
  "packagePublishExternal"?: string;
  /**
   * Version
   *
   * Select a version increment strategy, or select Custom to input your package version
   * manually. For new packages, the first version will be 1.0.0 if you select "Next major",
   * 0.1.0 if you select "Next minor", or 0.0.1 if you select "Next patch". See the [Semantic
   * Versioning spec](https://semver.org/) for more information.
   *
   * - `major` — Next major
   * - `minor` — Next minor
   * - `patch` — Next patch
   * - `custom` — Custom
   *
   * @default patch
   *
   * In group: packagePublishDetails
   */
  "versionPublishSelector"?: "major" | "minor" | "patch" | "custom";
  /**
   * Custom version
   *
   * Select the custom package version.
   *
   * Only meaningful when: `versionPublishSelector = custom`
   *
   * In group: packagePublishDetails
   */
  "versionPublish"?: string;
  /**
   * Description
   *
   * Description of the contents of this package and/or the changes made in this version of the
   * package.
   *
   * In group: packagePublishDetails
   */
  "packagePublishDescription"?: string;
  /**
   * Verbosity
   *
   * Specifies the amount of detail displayed in the output.
   *
   * - `None` — None
   * - `Trace` — Trace
   * - `Debug` — Debug
   * - `Information` — Information
   * - `Warning` — Warning
   * - `Error` — Error
   * - `Critical` — Critical
   *
   * @default None
   *
   * In group: advanced
   */
  "verbosity"?: "None" | "Trace" | "Debug" | "Information" | "Warning" | "Error" | "Critical";
  /**
   * Package Output Variable
   *
   * Provide a name for the variable that will contain the published package name and version.
   *
   * In group: output
   */
  "publishedPackageVar"?: string;
}

/**
 * Universal packages
 *
 * Download or publish Universal Packages
 *
 * [Learn more about this
 * task](https://docs.microsoft.com/azure/devops/pipelines/tasks/package/universal-packages)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/package/universal-packages
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/UniversalPackagesV0
 */
export function universalPackagesV0(
  inputs: UniversalPackagesV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("UniversalPackages@0", inputs as unknown as Record<string, unknown>, opts);
}
