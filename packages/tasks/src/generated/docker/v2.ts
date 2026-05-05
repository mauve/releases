/* eslint-disable */
// Auto-generated from DockerV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { dockerregistryConnection } from '../connections.js';

export interface DockerV2Inputs {
  /**
   * Container registry
   *
   * Select a Docker registry service connection. Required for commands that need to authenticate
   * with a registry.
   *
   * In group: containerRepository
   */
  "containerRegistry"?: dockerregistryConnection;
  /**
   * Container repository
   *
   * Name of the repository.
   *
   * Only meaningful when: `command != login && command != logout && command != start && command
   * != stop`
   *
   * In group: containerRepository
   */
  "repository"?: string;
  /**
   * Command
   *
   * Select a Docker command.
   *
   * - `buildAndPush` — buildAndPush
   * - `build` — build
   * - `push` — push
   * - `login` — login
   * - `logout` — logout
   * - `start` — start
   * - `stop` — stop
   *
   * @default buildAndPush
   *
   * In group: commands
   */
  "command": "buildAndPush" | "build" | "push" | "login" | "logout" | "start" | "stop";
  /**
   * Dockerfile
   *
   * Path to the Dockerfile.
   *
   * @default **​/Dockerfile
   *
   * Only meaningful when: `command = build || command = buildAndPush`
   *
   * In group: commands
   */
  "Dockerfile"?: string;
  /**
   * Build context
   *
   * Path to the build context. Pass ** to specify the directory that contains the Dockerfile.
   *
   * @default **
   *
   * Only meaningful when: `command = build || command = buildAndPush`
   *
   * In group: commands
   */
  "buildContext"?: string;
  /**
   * Tags
   *
   * A list of tags in separate lines. These tags are used in build, push and buildAndPush
   * commands. Ex:<br><br>beta1.1<br>latest
   *
   * @default $(Build.BuildId)
   *
   * Only meaningful when: `command = build || command = push || command = buildAndPush`
   *
   * In group: commands
   */
  "tags"?: string;
  /**
   * Arguments
   *
   * Docker command options. Ex:<br> For build command,<br>--build-arg
   * HTTP_PROXY=http://10.20.30.2:1234 --quiet
   *
   * Only meaningful when: `command != login && command != logout && command != buildAndPush`
   *
   * In group: commands
   */
  "arguments"?: string;
  /**
   * Add Pipeline metadata to image(s)
   *
   * By default pipeline data like source branch name, build id are added which helps with
   * traceability. For example you can inspect an image to find out which pipeline built the
   * image. You can opt out of this default behavior by using this input.
   *
   * @default true
   *
   * In group: commands
   */
  "addPipelineData"?: boolean;
  /**
   * Add base image metadata to image(s)
   *
   * By default base image data like base image name and digest are added which helps with
   * traceability. You can opt out of this default behavior by using this input.
   *
   * @default true
   *
   * In group: commands
   */
  "addBaseImageData"?: boolean;
  /**
   * Container
   *
   * Name of the container. For use with start and stop commands.
   *
   * Only meaningful when: `command = start || command = stop`
   *
   * In group: commands
   */
  "container"?: string;
}

/**
 * Docker
 *
 * Build or push Docker images, login or logout, start or stop containers, or run a Docker
 * command
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=848006) or [see the
 * Docker documentation](https://docs.docker.com/)
 *
 * @see https://aka.ms/azpipes-docker-tsg
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DockerV2
 */
export function dockerV2(
  inputs: DockerV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Docker@2", inputs as unknown as Record<string, unknown>, opts);
}
