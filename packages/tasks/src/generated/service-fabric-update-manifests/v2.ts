/* eslint-disable */
// Auto-generated from ServiceFabricUpdateManifestsV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface ServiceFabricUpdateManifestsV2Inputs {
  /**
   * Update Type
   *
   * Specify the type of update that should be made to the manifest files. In order to use both
   * update types, add an instance of this task to the build pipeline for each type of update to
   * be executed.
   *
   * - `Manifest versions` — Manifest versions
   * - `Docker image settings` — Docker image settings
   *
   * @default Manifest versions
   */
  "updateType": "Manifest versions" | "Docker image settings";
  /**
   * Application Package
   *
   * Path to the application package. [Variables](https://go.microsoft.com/fwlink/?LinkID=550988)
   * and wildcards can be used in the path.
   */
  "applicationPackagePath": string;
  /**
   * Version Value
   *
   * The value used to specify the version in the manifest files. Default is
   * .$(Build.BuildNumber).
   *
   * @default .$(Build.BuildNumber)
   *
   * Only meaningful when: `updateType = Manifest versions`
   */
  "versionSuffix"?: string;
  /**
   * Version Behavior
   *
   * Specify whether to append the version value to existing values in the manifest files or
   * replace them.
   *
   * - `Append` — Append
   * - `Replace` — Replace
   *
   * @default Append
   *
   * Only meaningful when: `updateType = Manifest versions`
   */
  "versionBehavior"?: "Append" | "Replace";
  /**
   * Update only if changed
   *
   * Incrementally update only the packages that have changed. Use the [deterministic compiler
   * flag](https://go.microsoft.com/fwlink/?LinkId=808668) to ensure builds with the same inputs
   * produce the same outputs.
   *
   * @default false
   *
   * Only meaningful when: `updateType = Manifest versions`
   */
  "updateOnlyChanged"?: boolean;
  /**
   * Package Artifact Name
   *
   * The name of the artifact containing the application package for comparison.
   *
   * Only meaningful when: `updateType = Manifest versions && updateOnlyChanged = true`
   */
  "pkgArtifactName"?: string;
  /**
   * Log all changes
   *
   * Compare all files in every package and log if the file was added, removed, or if its content
   * changed. Otherwise, compare files in a package only until the first change is found for
   * faster performance.
   *
   * @default true
   *
   * Only meaningful when: `updateType = Manifest versions && updateOnlyChanged = true`
   */
  "logAllChanges"?: boolean;
  /**
   * Compare against
   *
   * The build for comparison.
   *
   * - `LastSuccessful` — Last Successful Build
   * - `Specific` — Specific Build
   *
   * @default LastSuccessful
   *
   * Only meaningful when: `updateType = Manifest versions && updateOnlyChanged = true`
   */
  "compareType"?: "LastSuccessful" | "Specific";
  /**
   * Build Number
   *
   * The build number for comparison.
   *
   * Only meaningful when: `updateType = Manifest versions && compareType = Specific`
   */
  "buildNumber"?: string;
  /**
   * Overwrite Existing Package Artifact
   *
   * Always download a new copy of the artifact. Otherwise use an existing copy, if present.
   *
   * @default true
   *
   * Only meaningful when: `updateType = Manifest versions && updateOnlyChanged = true`
   */
  "overwriteExistingPkgArtifact"?: boolean;
  /**
   * Image Names Path
   *
   * Path to a text file that contains the names of the Docker images associated with the Service
   * Fabric application that should be updated with digests. Each image name must be on its own
   * line and must be in the same order as the digests in Image Digests file. If the images are
   * created by the Service Fabric project, this file is generated as part of the Package target
   * and its output location is controlled by the property BuiltDockerImagesFilePath.
   *
   * Only meaningful when: `updateType = Docker image settings`
   */
  "imageNamesPath"?: string;
  /**
   * Image Digests Path
   *
   * Path to a text file that contains the digest values of the Docker images associated with the
   * Service Fabric application. This file can be output by the [Docker
   * task](https://go.microsoft.com/fwlink/?linkid=848006) when using the push action. The file
   * should contain lines of text in the format of 'registry/image_name@digest_value'.
   *
   * Only meaningful when: `updateType = Docker image settings`
   */
  "imageDigestsPath"?: string;
}

/**
 * Update Service Fabric manifests
 *
 * Automatically update portions of application and service manifests in a packaged Azure
 * Service Fabric application
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkId=820529)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/service-fabric-versioning
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/ServiceFabricUpdateManifestsV2
 */
export function serviceFabricUpdateManifestsV2(
  inputs: ServiceFabricUpdateManifestsV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("ServiceFabricUpdateManifests@2", inputs as unknown as Record<string, unknown>, opts);
}
