/* eslint-disable */
// Auto-generated from DownloadPackageV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface DownloadPackageV1Inputs {
  /**
   * Package Type
   *
   * - `maven` — Maven
   * - `npm` — Npm
   * - `nuget` — NuGet
   * - `pypi` — Python
   * - `upack` — Universal
   * - `cargo` — Cargo
   *
   * @default nuget
   */
  "packageType": "maven" | "npm" | "nuget" | "pypi" | "upack" | "cargo";
  /**
   * Feed
   */
  "feed": string;
  /**
   * View
   *
   * Select a view to use only versions promoted to that view.
   *
   * @default
   */
  "view"?: string;
  /**
   * Package
   *
   * If you don't find the package in the list, you can provide the package ID, which you can
   * find using the instructions [here](https://go.microsoft.com/fwlink/?linkid=2086778).
   */
  "definition": string;
  /**
   * Version
   *
   * Version of the package. Use `latest` to download the latest version of the package at
   * runtime.
   */
  "version": string;
  /**
   * Files
   *
   * Specify which files to download using [file matching
   * patterns](https://go.microsoft.com/fwlink/?linkid=2086953).
   *
   * @default **
   *
   * Only meaningful when: `packageType = maven || packageType = pypi || packageType = upack`
   *
   * In group: advancedOptions
   */
  "files"?: string;
  /**
   * Extract package contents
   *
   * Instead of extracting the package contents and removing the archive, the artifact folder
   * will contain the package archive.
   *
   * @default true
   *
   * Only meaningful when: `packageType = nuget || packageType = npm`
   *
   * In group: advancedOptions
   */
  "extract"?: boolean;
  /**
   * Destination directory
   *
   * Path on the agent machine where the package will be downloaded
   *
   * @default $(System.ArtifactsDirectory)
   */
  "downloadPath": string;
}

/**
 * Download package
 *
 * Download a package from a package management feed in Azure Artifacts
 *
 * Requires the Azure Artifacts extension to be installed
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/download-package
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DownloadPackageV1
 */
export function downloadPackageV1(
  inputs: DownloadPackageV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("DownloadPackage@1", inputs as unknown as Record<string, unknown>, opts);
}
