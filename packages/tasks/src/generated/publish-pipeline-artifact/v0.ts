/* eslint-disable */
// Auto-generated from PublishPipelineArtifactV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface PublishPipelineArtifactV0Inputs {
  /**
   * The name of this artifact
   *
   * The name of this artifact.
   *
   * @default drop
   */
  "artifactName": string;
  /**
   * Path to publish
   *
   * The folder or file path to publish. This can be a fully-qualified path or a path relative to
   * the root of the repository. Wildcards are not supported.
   * [Variables](https://go.microsoft.com/fwlink/?LinkID=550988) are supported.
   */
  "targetPath": string;
  /**
   * Custom properties
   *
   * Enter custom properties to associate with the artifact. Valid JSON string expected with all
   * keys having the prefix 'user-'
   */
  "properties"?: string;
}

/**
 * Publish pipeline artifact
 *
 * Publish a local directory or file as a named artifact for the current pipeline
 *
 * Publish a local directory or file as a named artifact for the current pipeline.
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/publish-pipeline-artifact
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/PublishPipelineArtifactV0
 */
export function publishPipelineArtifactV0(
  inputs: PublishPipelineArtifactV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("PublishPipelineArtifact@0", inputs as unknown as Record<string, unknown>, opts);
}
