/* eslint-disable */
// Auto-generated from PublishPipelineArtifactV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface PublishPipelineArtifactV1Inputs {
  /**
   * File or directory path
   *
   * The path of the file or directory to publish. Can be absolute or relative to the default
   * working directory. Can include [variables](https://go.microsoft.com/fwlink/?LinkID=550988),
   * but wildcards are not supported.
   *
   * @default $(Pipeline.Workspace)
   */
  "path": string;
  /**
   * Artifact name
   *
   * Name of the artifact to publish. If not set, defaults to a unique ID scoped to the job.
   */
  "artifactName"?: string;
  /**
   * Artifact publish location
   *
   * Choose whether to store the artifact in Azure Pipelines, or to copy it to a file share that
   * must be accessible from the pipeline agent.
   *
   * - `pipeline` — Azure Pipelines
   * - `filepath` — A file share
   *
   * @default pipeline
   */
  "artifactType": "pipeline" | "filepath";
  /**
   * File share path
   *
   * The file share to which the artifact files will be copied. This can include variables.
   * Example: \\\\my\\share\\$(Build.DefinitionName)\\$(Build.BuildNumber). Publishing artifacts
   * from a Linux or macOS agent to a file share is not supported.
   *
   * Only meaningful when: `artifactType = filepath`
   */
  "fileSharePath"?: string;
  /**
   * Parallel copy
   *
   * Select whether to copy files in parallel using multiple threads for greater potential
   * throughput. If this setting is not enabled, one thread will be used.
   *
   * @default false
   *
   * Only meaningful when: `artifactType = filepath`
   */
  "parallel"?: boolean;
  /**
   * Parallel count
   *
   * Enter the degree of parallelism, or number of threads used, to perform the copy. The value
   * must be at least 1 and not greater than 128.
   *
   * @default 8
   *
   * Only meaningful when: `artifactType = filepath && parallel = true`
   */
  "parallelCount"?: number;
  /**
   * Custom properties
   *
   * Enter custom properties to associate with the artifact. Valid JSON string expected with all
   * keys having the prefix 'user-'
   */
  "properties"?: string;
}

/**
 * Publish Pipeline Artifacts
 *
 * Publish (upload) a file or directory as a named artifact for the current run
 *
 * Publish (upload) a file or directory as a named artifact for the current run. Published
 * artifacts can be downloaded in other jobs, stages, or pipelines using the "Download pipeline
 * artifact" task.
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/publish-pipeline-artifact
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/PublishPipelineArtifactV1
 */
export function publishPipelineArtifactV1(
  inputs: PublishPipelineArtifactV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("PublishPipelineArtifact@1", inputs as unknown as Record<string, unknown>, opts);
}
