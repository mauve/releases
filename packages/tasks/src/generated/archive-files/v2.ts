/* eslint-disable */
// Auto-generated from ArchiveFilesV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface ArchiveFilesV2Inputs {
  /**
   * Root folder or file to archive
   *
   * Enter the root folder or file path to add to the archive. If a folder, everything under the
   * folder will be added to the resulting archive.
   *
   * @default $(Build.BinariesDirectory)
   */
  "rootFolderOrFile": string;
  /**
   * Prepend root folder name to archive paths
   *
   * If selected, the root folder name will be prepended to file paths within the archive.
   * Otherwise, all file paths will start one level lower.<p>For example, suppose the selected
   * root folder is: <b>`/home/user/output/classes/`</b>, and contains:
   * <b>`com/acme/Main.class`</b>. <ul><li>If selected, the resulting archive would contain:
   * <b>`classes/com/acme/Main.class`</b>.</li><li>Otherwise, the resulting archive would
   * contain: <b>`com/acme/Main.class`</b>.</li></ul>
   *
   * @default true
   */
  "includeRootFolder": boolean;
  /**
   * Archive type
   *
   * Specify the compression scheme used. To create <b>`foo.jar`</b>, for example, choose
   * <b>`zip`</b> for the compression, and specify <b>`foo.jar`</b> as the archive file to
   * create. For all tar files (including compressed ones), choose <b>`tar`</b>.
   *
   * - `zip` — zip
   * - `7z` — 7z
   * - `tar` — tar
   * - `wim` — wim
   *
   * @default zip
   *
   * In group: archive
   */
  "archiveType": "zip" | "7z" | "tar" | "wim";
  /**
   * 7z compression
   *
   * Optionally choose a compression level, or choose <b>`None`</b> to create an uncompressed 7z
   * file.
   *
   * - `ultra` — Ultra
   * - `maximum` — Maximum
   * - `normal` — Normal
   * - `fast` — Fast
   * - `fastest` — Fastest
   * - `none` — None
   *
   * @default normal
   *
   * Only meaningful when: `archiveType = 7z`
   *
   * In group: archive
   */
  "sevenZipCompression"?: "ultra" | "maximum" | "normal" | "fast" | "fastest" | "none";
  /**
   * Tar compression
   *
   * Optionally choose a compression scheme, or choose <b>`None`</b> to create an uncompressed
   * tar file.
   *
   * - `gz` — gz
   * - `bz2` — bz2
   * - `xz` — xz
   * - `none` — None
   *
   * @default gz
   *
   * Only meaningful when: `archiveType = tar`
   *
   * In group: archive
   */
  "tarCompression"?: "gz" | "bz2" | "xz" | "none";
  /**
   * Archive file to create
   *
   * Specify the name of the archive file to create. For example, to create <b>`foo.tgz`</b>,
   * select the <b>`tar`</b> archive type and <b>`gz`</b> for tar compression.
   *
   * @default $(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip
   *
   * In group: archive
   */
  "archiveFile": string;
  /**
   * Replace existing archive
   *
   * If an existing archive exists, specify whether to overwrite it. Otherwise, files will be
   * added to it.
   *
   * @default true
   *
   * In group: archive
   */
  "replaceExistingArchive": boolean;
  /**
   * Force verbose output
   *
   * If set to true, forces tools to use verbose output. Overrides 'quiet'
   *
   * @default false
   *
   * In group: archive
   */
  "verbose"?: boolean;
  /**
   * Force quiet output
   *
   * If set to true, forces tools to use quiet output. Can be overridden by 'verbose'
   *
   * @default false
   *
   * In group: archive
   */
  "quiet"?: boolean;
}

/**
 * Archive files
 *
 * Compress files into .7z, .tar.gz, or .zip
 *
 * [Learn more about this task](http://go.microsoft.com/fwlink/?LinkId=809083)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/archive-files
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/ArchiveFilesV2
 */
export function archiveFilesV2(
  inputs: ArchiveFilesV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("ArchiveFiles@2", inputs as unknown as Record<string, unknown>, opts);
}
