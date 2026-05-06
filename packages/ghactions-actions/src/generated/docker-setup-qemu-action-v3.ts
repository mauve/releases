/* eslint-disable */
// Auto-generated from docker/setup-qemu-action@v3/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface DockerSetupQemuActionV3Inputs {
  /**
   * QEMU static binaries Docker image (e.g. tonistiigi/binfmt:latest)
   *
   * @default docker.io/tonistiigi/binfmt:latest
   */
  "image"?: string | boolean | number;
  /**
   * Platforms to install (e.g. arm64,riscv64,arm)
   *
   * @default all
   */
  "platforms"?: string | boolean | number;
  /**
   * Cache binfmt image to GitHub Actions cache backend
   *
   * @default true
   */
  "cache-image"?: string | boolean | number;
}

/**
 * Docker Setup QEMU
 *
 * Install QEMU static binaries
 *
 * @see https://github.com/docker/setup-qemu-action
 */
export function dockerSetupQemuActionV3(
  inputs: DockerSetupQemuActionV3Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("docker/setup-qemu-action@v3", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
