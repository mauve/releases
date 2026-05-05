/* eslint-disable */
// Auto-generated from DockerComposeV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection, dockerhostConnection, dockerregistryConnection } from '../connections.js';

export interface DockerComposeV1Inputs {
  /**
   * Container Registry Type
   *
   * Select a Container Registry Type.
   *
   * - `Azure Container Registry` — Azure Container Registry
   * - `Container Registry` — Container Registry
   *
   * @default Azure Container Registry
   */
  "containerregistrytype": "Azure Container Registry" | "Container Registry";
  /**
   * Docker Registry Service Connection
   *
   * Select a Docker registry service connection. Required for commands that need to authenticate
   * with a registry.
   *
   * Only meaningful when: `containerregistrytype = Container Registry`
   */
  "dockerRegistryEndpoint"?: dockerregistryConnection;
  /**
   * Azure subscription
   *
   * Select an Azure subscription
   *
   * Only meaningful when: `containerregistrytype = Azure Container Registry`
   */
  "azureSubscriptionEndpoint"?: AzureRMConnection;
  /**
   * Azure Container Registry
   *
   * Select an Azure Container Registry
   *
   * Only meaningful when: `containerregistrytype = Azure Container Registry`
   */
  "azureContainerRegistry"?: string;
  /**
   * Docker Compose File
   *
   * Path to the primary Docker Compose file to use.
   *
   * @default **​/docker-compose.yml
   */
  "dockerComposeFile": string;
  /**
   * Additional Docker Compose Files
   *
   * Additional Docker Compose files to be combined with the primary Docker Compose file.
   * Relative paths are resolved relative to the directory containing the primary Docker Compose
   * file. If a specified file is not found, it is ignored. Specify each file path on a new line.
   */
  "additionalDockerComposeFiles"?: string;
  /**
   * Environment Variables
   *
   * Environment variables to be set during the command. Specify each name=value pair on a new
   * line.
   */
  "dockerComposeFileArgs"?: string;
  /**
   * Project Name
   *
   * Project name used for default naming of images and containers.
   *
   * @default $(Build.Repository.Name)
   */
  "projectName"?: string;
  /**
   * Qualify Image Names
   *
   * Qualify image names for built services with the Docker registry service connection's
   * hostname if not otherwise specified.
   *
   * @default true
   */
  "qualifyImageNames"?: boolean;
  /**
   * Action
   *
   * Select a Docker Compose action.
   *
   * - `Build services` — Build service images
   * - `Push services` — Push service images
   * - `Run services` — Run service images
   * - `Run a specific service` — Run a specific service image
   * - `Lock services` — Lock service images
   * - `Write service image digests` — Write service image digests
   * - `Combine configuration` — Combine configuration
   * - `Run a Docker Compose command` — Run a Docker Compose command
   *
   * @default Run a Docker Compose command
   */
  "action": "Build services" | "Push services" | "Run services" | "Run a specific service" | "Lock services" | "Write service image digests" | "Combine configuration" | "Run a Docker Compose command";
  /**
   * Additional Image Tags
   *
   * Additional tags for the Docker images being built or pushed.
   *
   * Only meaningful when: `action = Build services || action = Push services`
   */
  "additionalImageTags"?: string;
  /**
   * Include Source Tags
   *
   * Include Git tags when building or pushing Docker images.
   *
   * @default false
   *
   * Only meaningful when: `action = Build services || action = Push services`
   */
  "includeSourceTags"?: boolean;
  /**
   * Include Latest Tag
   *
   * Include the 'latest' tag when building or pushing Docker images.
   *
   * @default false
   *
   * Only meaningful when: `action = Build services || action = Push services`
   */
  "includeLatestTag"?: boolean;
  /**
   * Build Images
   *
   * Build images before starting service containers.
   *
   * @default true
   *
   * Only meaningful when: `action = Run services`
   */
  "buildImages"?: boolean;
  /**
   * Service Name
   *
   * Name of the specific service to run.
   *
   * Only meaningful when: `action = Run a specific service`
   */
  "serviceName"?: string;
  /**
   * Container Name
   *
   * Name of the specific service container to run.
   *
   * Only meaningful when: `action = Run a specific service`
   */
  "containerName"?: string;
  /**
   * Ports
   *
   * Ports in the specific service container to publish to the host. Specify each
   * host-port:container-port binding on a new line.
   *
   * Only meaningful when: `action = Run a specific service`
   */
  "ports"?: string;
  /**
   * Working Directory
   *
   * The working directory for the specific service container.
   *
   * Only meaningful when: `action = Run a specific service`
   */
  "workDir"?: string;
  /**
   * Entry Point Override
   *
   * Override the default entry point for the specific service container.
   *
   * Only meaningful when: `action = Run a specific service`
   */
  "entrypoint"?: string;
  /**
   * Command
   *
   * Command to run in the specific service container. For example, if the image contains a
   * simple Python Flask web application you can specify 'python app.py' to launch the web
   * application.
   *
   * Only meaningful when: `action = Run a specific service`
   */
  "containerCommand"?: string;
  /**
   * Run in Background
   *
   * Run the service containers in the background.
   *
   * @default true
   *
   * Only meaningful when: `action = Run services || action = Run a specific service`
   */
  "detached"?: boolean;
  /**
   * Abort on Container Exit
   *
   * Stop all containers when any container exits.
   *
   * @default true
   *
   * Only meaningful when: `action = Run services && detached == false`
   */
  "abortOnContainerExit"?: boolean;
  /**
   * Image Digest Compose File
   *
   * Path to a Docker Compose file that is created and populated with the full image repository
   * digests of each service's Docker image.
   *
   * @default $(Build.StagingDirectory)/docker-compose.images.yml
   *
   * Only meaningful when: `action = Write service image digests`
   */
  "imageDigestComposeFile"?: string;
  /**
   * Remove Build Options
   *
   * Remove the build options from the output Docker Compose file.
   *
   * @default false
   *
   * Only meaningful when: `action = Lock services || action = Combine configuration`
   */
  "removeBuildOptions"?: boolean;
  /**
   * Base Resolve Directory
   *
   * The base directory from which relative paths in the output Docker Compose file should be
   * resolved.
   *
   * Only meaningful when: `action = Lock services || action = Combine configuration`
   */
  "baseResolveDirectory"?: string;
  /**
   * Output Docker Compose File
   *
   * Path to an output Docker Compose file.
   *
   * @default $(Build.StagingDirectory)/docker-compose.yml
   *
   * Only meaningful when: `action = Lock services || action = Combine configuration`
   */
  "outputDockerComposeFile"?: string;
  /**
   * Command
   *
   * Docker Compose command to execute with arguments. For example, 'rm --all' to remove all
   * stopped service containers.
   *
   * Only meaningful when: `action = Run a Docker Compose command`
   */
  "dockerComposeCommand"?: string;
  /**
   * Arguments
   *
   * Docker Compose command options. Ex:<br> For build command,<br>--pull --compress --parallel
   *
   * Only meaningful when: `action != Lock services && action != Combine configuration && action
   * != Write service image digests`
   */
  "arguments"?: string;
  /**
   * Docker Host Service Connection
   *
   * Select a Docker host service connection. Defaults to the agent's host.
   *
   * In group: advanced
   */
  "dockerHostEndpoint"?: dockerhostConnection;
  /**
   * No-op if no Docker Compose File
   *
   * If the Docker Compose file does not exist, skip this task. This is useful when the task
   * offers optional behavior based on the existence of a Docker Compose file in the repository.
   *
   * @default false
   *
   * In group: advanced
   */
  "nopIfNoDockerComposeFile"?: boolean;
  /**
   * Require Additional Docker Compose Files
   *
   * Produces an error if the additional Docker Compose files do not exist. This overrides the
   * default behavior which is to ignore a file if it does not exist.
   *
   * @default false
   *
   * In group: advanced
   */
  "requireAdditionalDockerComposeFiles"?: boolean;
  /**
   * Working Directory
   *
   * Working directory for the Docker Compose command.
   *
   * @default $(System.DefaultWorkingDirectory)
   *
   * In group: advanced
   */
  "cwd"?: string;
  /**
   * Docker Compose executable Path
   *
   * This docker-compose executable will be used if the path is provided
   *
   * In group: advanced
   */
  "dockerComposePath"?: string;
}

/**
 * Docker Compose
 *
 * Build, push or run multi-container Docker applications. Task can be used with Docker or
 * Azure Container registry.
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=848006) or [see the
 * Docker Compose documentation](https://docs.docker.com/)
 *
 * @see https://aka.ms/azpipes-docker-compose-tsg
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DockerComposeV1
 */
export function dockerComposeV1(
  inputs: DockerComposeV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("DockerCompose@1", inputs as unknown as Record<string, unknown>, opts);
}
