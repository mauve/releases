/* eslint-disable */
// Auto-generated from PublishBuildArtifactsV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface PublishBuildArtifactsV1Inputs {
  /**
   * Path to publish
   *
   * The folder or file path to publish. This can be a fully-qualified path or a path relative to
   * the root of the repository. Wildcards are not supported.
   * [Variables](https://go.microsoft.com/fwlink/?LinkID=550988) are supported. Example:
   * $(Build.ArtifactStagingDirectory)
   *
   * @default $(Build.ArtifactStagingDirectory)
   */
  "PathtoPublish": string;
  /**
   * Artifact name
   *
   * The name of the artifact to create in the publish location.
   *
   * @default drop
   */
  "ArtifactName": string;
  /**
   * Artifact publish location
   *
   * Choose whether to store the artifact in Azure Pipelines, or to copy it to a file share that
   * must be accessible from the build agent.
   *
   * - `Container` — Azure Pipelines
   * - `FilePath` — A file share
   *
   * @default Container
   */
  "ArtifactType": "Container" | "FilePath";
  /**
   * Max Artifact Size
   *
   * Maximum limit on the size of artifacts to be published in bytes. Put 0 if you don't want to
   * set any limit.
   *
   * @default 0
   */
  "MaxArtifactSize"?: number;
  /**
   * File share path
   *
   * The file share to which the artifact files will be copied. This can include variables.
   * Example: \\\\my\\share\\$(Build.DefinitionName)\\$(Build.BuildNumber). Publishing artifacts
   * from a Linux or macOS agent to a file share is not supported.
   *
   * Only meaningful when: `ArtifactType = FilePath`
   */
  "TargetPath"?: string;
  /**
   * Parallel copy
   *
   * Select whether to copy files in parallel using multiple threads for greater potential
   * throughput. If this setting is not enabled, one thread will be used.
   *
   * @default false
   *
   * Only meaningful when: `ArtifactType = FilePath`
   */
  "Parallel"?: boolean;
  /**
   * Parallel count
   *
   * Enter the degree of parallelism, or number of threads used, to perform the copy. The value
   * must be at least 1 and not greater than 128.
   *
   * @default 8
   *
   * Only meaningful when: `ArtifactType = FilePath && Parallel = true`
   */
  "ParallelCount"?: number;
  /**
   * Tar the artifact before uploading
   *
   * Add all files from the publish path to a tar archive before uploading. This allows you to
   * preserve the UNIX file permissions. Use `extractTars` option of DownloadBuildArtifacts task
   * to extract the downloaded items automatically.
   *
   * @default false
   *
   * In group: advanced
   */
  "StoreAsTar"?: boolean;
}

/**
 * Publish build artifacts
 *
 * Publish build artifacts to Azure Pipelines or a Windows file share
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=708390)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/publish-build-artifacts
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/PublishBuildArtifactsV1
 */
export function publishBuildArtifactsV1(
  inputs: PublishBuildArtifactsV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("PublishBuildArtifacts@1", inputs as unknown as Record<string, unknown>, opts);
}
