// Auto-generated from docker/metadata-action@v5/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface DockerMetadataActionV5Inputs {
  /**
   * Where to get context data. Allowed options are "workflow" (default), "git".
   *
   * @default workflow
   */
  "context"?: string | boolean | number;
  /**
   * List of Docker images to use as base name for tags
   */
  "images"?: string | boolean | number;
  /**
   * List of tags as key-value pair attributes
   */
  "tags"?: string | boolean | number;
  /**
   * Flavors to apply
   */
  "flavor"?: string | boolean | number;
  /**
   * List of custom labels
   */
  "labels"?: string | boolean | number;
  /**
   * List of custom annotations
   */
  "annotations"?: string | boolean | number;
  /**
   * Separator to use for tags output (default \n)
   */
  "sep-tags"?: string | boolean | number;
  /**
   * Separator to use for labels output (default \n)
   */
  "sep-labels"?: string | boolean | number;
  /**
   * Separator to use for annotations output (default \n)
   */
  "sep-annotations"?: string | boolean | number;
  /**
   * Bake target name (default docker-metadata-action)
   */
  "bake-target"?: string | boolean | number;
  /**
   * GitHub Token as provided by secrets
   *
   * @default ${{ github.token }}
   */
  "github-token"?: string | boolean | number;
}

/**
 * Docker Metadata action
 *
 * GitHub Action to extract metadata (tags, labels) for Docker
 *
 * @see https://github.com/docker/metadata-action
 */
export function dockerMetadataActionV5(
  inputs: DockerMetadataActionV5Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("docker/metadata-action@v5", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
