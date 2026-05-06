// Auto-generated from docker/setup-buildx-action@v3/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface DockerSetupBuildxActionV3Inputs {
  /**
   * Buildx version. (eg. v0.3.0)
   */
  "version"?: string | boolean | number;
  /**
   * Sets the builder driver to be used
   *
   * @default docker-container
   */
  "driver"?: string | boolean | number;
  /**
   * List of additional driver-specific options. (eg. image=moby/buildkit:master)
   */
  "driver-opts"?: string | boolean | number;
  /**
   * BuildKit daemon flags
   */
  "buildkitd-flags"?: string | boolean | number;
  /**
   * BuildKit daemon config file
   */
  "buildkitd-config"?: string | boolean | number;
  /**
   * Inline BuildKit daemon config
   */
  "buildkitd-config-inline"?: string | boolean | number;
  /**
   * Switch to this builder instance
   *
   * @default true
   */
  "use"?: string | boolean | number;
  /**
   * Name of the builder. If not specified, one will be generated or if it already exists, it
   * will be used instead of creating a new one.
   */
  "name"?: string | boolean | number;
  /**
   * Optional address for docker socket or context from `docker context ls`
   */
  "endpoint"?: string | boolean | number;
  /**
   * Fixed platforms for current node. If not empty, values take priority over the detected ones
   */
  "platforms"?: string | boolean | number;
  /**
   * Append additional nodes to the builder
   */
  "append"?: string | boolean | number;
  /**
   * Keep BuildKit state on cleanup. This is only useful on persistent self-hosted runners.
   *
   * @default false
   */
  "keep-state"?: string | boolean | number;
  /**
   * Cache buildx binary to GitHub Actions cache backend
   *
   * @default true
   */
  "cache-binary"?: string | boolean | number;
  /**
   * Cleanup temp files and remove builder at the end of a job
   *
   * @default true
   */
  "cleanup"?: string | boolean | number;
  /**
   * BuildKit daemon config file
   */
  "config"?: string | boolean | number;
  /**
   * Inline BuildKit daemon config
   */
  "config-inline"?: string | boolean | number;
  /**
   * Sets up docker build command as an alias to docker buildx build
   *
   * @default false
   */
  "install"?: string | boolean | number;
}

/**
 * Docker Setup Buildx
 *
 * Set up Docker Buildx
 *
 * @see https://github.com/docker/setup-buildx-action
 */
export function dockerSetupBuildxActionV3(
  inputs: DockerSetupBuildxActionV3Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("docker/setup-buildx-action@v3", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
