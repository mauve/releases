/* eslint-disable */
// Auto-generated from DockerV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection, dockerhostConnection, dockerregistryConnection } from '../connections.js';

export interface DockerV1Inputs {
  /**
   * Container registry type
   *
   * Select 'Azure Container Registry' to connect to it by using an Azure Service Connection.
   * Select 'Container registry' to connect to Docker Hub or any other private container
   * registry.
   *
   * - `Azure Container Registry` — Azure Container Registry
   * - `Container Registry` — Container Registry
   *
   * @default Azure Container Registry
   *
   * In group: containerRegistry
   */
  "containerregistrytype": "Azure Container Registry" | "Container Registry";
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
   * Docker registry service connection
   *
   * Select a Docker registry service connection. Required for commands that need to authenticate
   * with a registry.
   *
   * Only meaningful when: `containerregistrytype = Container Registry`
   *
   * In group: containerRegistry
   */
  "dockerRegistryEndpoint"?: dockerregistryConnection;
  /**
   * Azure subscription
   *
   * Select an Azure subscription
   *
   * Only meaningful when: `containerregistrytype = Azure Container Registry`
   *
   * In group: containerRegistry
   */
  "azureSubscriptionEndpoint"?: AzureRMConnection;
  /**
   * Azure container registry
   *
   * Select an Azure Container Registry in the selected Azure Subscription. The container image
   * will be built and pushed to this container registry.
   *
   * Only meaningful when: `containerregistrytype = Azure Container Registry`
   *
   * In group: containerRegistry
   */
  "azureContainerRegistry"?: string;
  /**
   * Command
   *
   * Select a Docker command.
   *
   * - `Build an image` — build
   * - `Tag image` — tag
   * - `Push an image` — push
   * - `Run an image` — run
   * - `login` — login
   * - `logout` — logout
   *
   * @default Build an image
   *
   * In group: commands
   */
  "command": "Build an image" | "Tag image" | "Push an image" | "Run an image" | "login" | "logout";
  /**
   * Dockerfile
   *
   * Path to the Dockerfile.
   *
   * @default **​/Dockerfile
   *
   * Only meaningful when: `command = Build an image || command = build`
   *
   * In group: commands
   */
  "dockerFile"?: string;
  /**
   * Arguments
   *
   * Docker command options. In case of 'tag' command, you can specify additional tags for Docker
   * image here.
   *
   * Only meaningful when: `command != login && command != logout`
   *
   * In group: commands
   */
  "arguments"?: string;
  /**
   * Push multiple images
   *
   * Push multiple images by using a text file that contains the names of the Docker images to
   * push. Each image name is contained on its own line.<br>For example:<br> Imagename1:tag1<br>
   * Imagename2:tag2<br> Imagename3<br>In case only image name is provided, all tags of the
   * ImageName3 container image will be pushed.
   *
   * @default false
   *
   * Only meaningful when: `command = Push an image || command = push`
   *
   * In group: commands
   */
  "pushMultipleImages"?: boolean;
  /**
   * Tag multiple images
   *
   * Tag multiple images by using a text file that contains the names of the Docker images to
   * tag. Each image name is contained on its own line.<br>For example:<br> Imagename1:tag1<br>
   * Imagename2:tag2<br> Imagename3<br>In case only image name is provided, that image will be
   * tagged as 'latest'.
   *
   * @default false
   *
   * Only meaningful when: `command = Tag image || command = tag`
   *
   * In group: commands
   */
  "tagMultipleImages"?: boolean;
  /**
   * Image name
   *
   * Name of the Docker image to build, push, or run.
   *
   * @default $(Build.Repository.Name):$(Build.BuildId)
   *
   * Only meaningful when: `command = Build an image || command = build || command = Run an image
   * || command = run || pushMultipleImages = false || tagMultipleImages = false`
   *
   * In group: commands
   */
  "imageName"?: string;
  /**
   * Image names path
   *
   * Path to a text file that contains the names of the Docker images to tag or push. Each image
   * name is contained on its own line.
   *
   * Only meaningful when: `tagMultipleImages = true || pushMultipleImages = true`
   *
   * In group: commands
   */
  "imageNamesPath"?: string;
  /**
   * Qualify image name
   *
   * Qualify the image name with the Docker registry service connection's hostname if not
   * otherwise specified.
   *
   * @default true
   *
   * Only meaningful when: `command = Build an image || command = build || command = Tag image ||
   * command = tag || command = Push an image || command = push || command = Run an image ||
   * command = run`
   *
   * In group: commands
   */
  "qualifyImageName"?: boolean;
  /**
   * Qualify source image name
   *
   * Qualify the source image name with the Docker registry service connection's hostname if not
   * otherwise specified.
   *
   * @default false
   *
   * Only meaningful when: `command = Tag image || command = tag`
   *
   * In group: commands
   */
  "qualifySourceImageName"?: boolean;
  /**
   * Include source tags
   *
   * Include Git tags when building or pushing the Docker image.
   *
   * @default false
   *
   * Only meaningful when: `command = Build an image || command = build || command = Tag image ||
   * command = tag || command = Push an image || command = push`
   *
   * In group: commands
   */
  "includeSourceTags"?: boolean;
  /**
   * Include latest tag
   *
   * Include the 'latest' tag when building the Docker image.
   *
   * @default false
   *
   * Only meaningful when: `command = Build an image || command = build`
   *
   * In group: commands
   */
  "includeLatestTag"?: boolean;
  /**
   * Add default labels
   *
   * Add CI/CD metadata like repository, commit, build and release information to the container
   * image by using Docker labels.
   *
   * @default true
   *
   * Only meaningful when: `addDefaultLabels = false`
   *
   * In group: commands
   */
  "addDefaultLabels"?: boolean;
  /**
   * Use default build context
   *
   * Set the build context to the directory that contains the Dockerfile.
   *
   * @default true
   *
   * Only meaningful when: `command = Build an image || command = build`
   *
   * In group: commands
   */
  "useDefaultContext"?: boolean;
  /**
   * Build context
   *
   * Path to the build context.
   *
   * Only meaningful when: `useDefaultContext = false`
   *
   * In group: commands
   */
  "buildContext"?: string;
  /**
   * Image digest file
   *
   * Path to a file that is created and populated with the full image repository digest of the
   * Docker image that was pushed.
   *
   * Only meaningful when: `command = Push an image || command = push`
   *
   * In group: commands
   */
  "imageDigestFile"?: string;
  /**
   * Container name
   *
   * Name of the Docker container to run.
   *
   * Only meaningful when: `command = Run an image || command = run`
   *
   * In group: commands
   */
  "containerName"?: string;
  /**
   * Ports
   *
   * Ports in the Docker container to publish to the host. Specify each host-port:container-port
   * binding on a new line.
   *
   * Only meaningful when: `command = Run an image || command = run`
   *
   * In group: commands
   */
  "ports"?: string;
  /**
   * Volumes
   *
   * Volumes to mount from the host. Specify each host-dir:container-dir on a new line.
   *
   * Only meaningful when: `command = Run an image || command = run`
   *
   * In group: commands
   */
  "volumes"?: string;
  /**
   * Environment variables
   *
   * Environment variables for the Docker container. Specify each name=value pair on a new line.
   *
   * Only meaningful when: `command = Run an image || command = run`
   *
   * In group: commands
   */
  "envVars"?: string;
  /**
   * Working directory
   *
   * The working directory for the Docker container.
   *
   * Only meaningful when: `command = Run an image || command = run`
   *
   * In group: commands
   */
  "workingDirectory"?: string;
  /**
   * Entry point override
   *
   * Override the default entry point for the Docker container.
   *
   * Only meaningful when: `command = Run an image || command = run`
   *
   * In group: commands
   */
  "entrypointOverride"?: string;
  /**
   * Container command
   *
   * The docker run command first creates a writeable container layer over the specified image,
   * and then starts it by using the specified run command. For example, if the image contains a
   * simple Python Flask web application you can specify 'python app.py' to launch the web
   * application.
   *
   * Only meaningful when: `command = Run an image || command = run`
   *
   * In group: commands
   */
  "containerCommand"?: string;
  /**
   * Run in background
   *
   * Run the Docker container in the background.
   *
   * @default true
   *
   * Only meaningful when: `command = Run an image || command = run`
   *
   * In group: commands
   */
  "runInBackground"?: boolean;
  /**
   * Restart policy
   *
   * Select a restart policy.
   *
   * - `no` — No
   * - `onFailure` — On failure
   * - `always` — Always
   * - `unlessStopped` — Unless stopped
   *
   * @default no
   *
   * Only meaningful when: `runInBackground = true`
   *
   * In group: commands
   */
  "restartPolicy"?: "no" | "onFailure" | "always" | "unlessStopped";
  /**
   * Maximum restart retries
   *
   * The maximum number of restart retries the Docker daemon attempts.
   *
   * Only meaningful when: `runInBackground = true && restartPolicy = onFailure`
   *
   * In group: commands
   */
  "maxRestartRetries"?: string;
  /**
   * Docker host service connection
   *
   * Select a Docker host service connection. Defaults to the agent's host.
   *
   * In group: advanced
   */
  "dockerHostEndpoint"?: dockerhostConnection;
  /**
   * Force image name to follow Docker naming convention
   *
   * If enabled Docker image name will be modified to follow Docker naming convention. Converts
   * upper case character to lower case and removes spaces in image name.
   *
   * @default true
   *
   * In group: advanced
   */
  "enforceDockerNamingConvention"?: boolean;
  /**
   * Memory limit
   *
   * The maximum amount of memory available to the container as a integer with optional suffixes
   * like '2GB'.
   *
   * In group: advanced
   */
  "memoryLimit"?: string;
}

/**
 * Docker
 *
 * Build, tag, push, or run Docker images, or run a Docker command
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=848006)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/docker
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DockerV1
 */
export function dockerV1(
  inputs: DockerV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Docker@1", inputs as unknown as Record<string, unknown>, opts);
}
