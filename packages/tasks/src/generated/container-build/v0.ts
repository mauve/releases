/* eslint-disable */
// Auto-generated from ContainerBuildV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { dockerregistryConnection } from '../connections.js';

export interface ContainerBuildV0Inputs {
  /**
   * Docker registry service connection
   *
   * Select a Docker registry service connection.
   */
  "dockerRegistryServiceConnection"?: dockerregistryConnection;
  /**
   * Container repository
   *
   * Name of the repository within the container registry.
   */
  "repository"?: string;
  /**
   * Dockerfile
   *
   * Path to Dockerfile.
   *
   * @default Dockerfile
   */
  "Dockerfile": string;
  /**
   * Build context
   *
   * Path to Build context.
   *
   * @default .
   */
  "buildContext"?: string;
  /**
   * Tags
   *
   * A list of tags in separate lines. Tags are used while building and pushing the image to
   * container registry.
   *
   * @default $(Build.BuildId)
   */
  "tags"?: string;
}

/**
 * Container Build
 *
 * Container Build Task
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=2107300)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/ContainerBuildV0
 */
export function containerBuildV0(
  inputs: ContainerBuildV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("ContainerBuild@0", inputs as unknown as Record<string, unknown>, opts);
}
