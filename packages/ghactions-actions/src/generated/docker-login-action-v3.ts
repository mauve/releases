// Auto-generated from docker/login-action@v3/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface DockerLoginActionV3Inputs {
  /**
   * Server address of Docker registry. If not set then will default to Docker Hub
   */
  "registry"?: string | boolean | number;
  /**
   * Username used to log against the Docker registry
   */
  "username"?: string | boolean | number;
  /**
   * Password or personal access token used to log against the Docker registry
   */
  "password"?: string | boolean | number;
  /**
   * Specifies whether the given registry is ECR (auto, true or false)
   */
  "ecr"?: string | boolean | number;
  /**
   * Scope for the authentication token
   */
  "scope"?: string | boolean | number;
  /**
   * Log out from the Docker registry at the end of a job
   *
   * @default true
   */
  "logout"?: string | boolean | number;
  /**
   * Raw authentication to registries, defined as YAML objects
   */
  "registry-auth"?: string | boolean | number;
}

/**
 * Docker Login
 *
 * GitHub Action to login against a Docker registry
 *
 * @see https://github.com/docker/login-action
 */
export function dockerLoginActionV3(
  inputs: DockerLoginActionV3Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("docker/login-action@v3", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
