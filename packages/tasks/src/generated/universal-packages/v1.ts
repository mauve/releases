/* eslint-disable */
// Auto-generated from UniversalPackagesV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface UniversalPackagesV1Inputs {
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
   * Feed
   *
   * The feed name. For project-scoped feeds, use 'project/feed' format.
   */
  "feed": string;
  /**
   * Package name
   *
   * The name of the Universal Package. Package names must be lower case and can only use
   * letters, numbers, and dashes (-).
   */
  "packageName": string;
  /**
   * Package version
   *
   * The version of the package. Required for download. For publish, either specify this or use
   * 'versionIncrement' for auto-incrementing. For downloads, this can also be a wildcard
   * expression such as * to get the highest version, 1.* to get the highest version with major
   * version 1, or 1.2.* to get the highest patch release with major version 1 and minor version
   * 2.
   */
  "packageVersion"?: string;
  /**
   * Version increment
   *
   * Cannot be used with 'packageVersion'. Automatically increment the package version. Queries
   * the feed for the highest existing version and increments the specified component. For new
   * packages, starts at 1.0.0 (major), 0.1.0 (minor), or 0.0.1 (patch).
   *
   * - `major` — Major
   * - `minor` — Minor
   * - `patch` — Patch
   *
   * Only meaningful when: `command = publish`
   */
  "versionIncrement"?: "major" | "minor" | "patch";
  /**
   * Directory
   *
   * For downloads: folder path where the package's contents will be downloaded. For publish:
   * path to the directory containing files to publish.
   *
   * @default $(System.DefaultWorkingDirectory)
   */
  "directory"?: string;
  /**
   * Description
   *
   * Optional. Description of the contents of this package and/or the changes made in this
   * version of the package.
   *
   * Only meaningful when: `command = publish`
   */
  "packageDescription"?: string;
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
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/UniversalPackagesV1
 */
export function universalPackagesV1(
  inputs: UniversalPackagesV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("UniversalPackages@1", inputs as unknown as Record<string, unknown>, opts);
}
