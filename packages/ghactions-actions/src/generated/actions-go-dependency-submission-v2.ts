/* eslint-disable */
// Auto-generated from actions/go-dependency-submission@v2/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsGoDependencySubmissionV2Inputs {
  /**
   * GitHub Personal Access Token (PAT). Defaults to PAT provided by Action runner
   *
   * @default ${{ github.token }}
   */
  "token"?: string | boolean | number;
  /**
   * User provided map of max key/value pairs of metadata to include with the snapshot e.g.
   * {"lastModified": "12-31-2022"}
   */
  "metadata"?: string | boolean | number;
  /**
   * Repo path to the go.mod file used to detect dependencies for the Go build target. Defaults
   * to go.mod in the root of the repository.
   *
   * @default go.mod
   */
  "go-mod-path"?: string | boolean | number;
  /**
   * Build target to detect build dependencies. If unspecified, will use "all", with will detect
   * all dependencies used in all build targets (including tests and tools).
   *
   * @default all
   */
  "go-build-target"?: string | boolean | number;
}

/**
 * Go Dependency Submission
 *
 * Calculates dependencies for a Go build-target and submits the list to the Dependency
 * Submission API
 *
 * @see https://github.com/actions/go-dependency-submission
 */
export function actionsGoDependencySubmissionV2(
  inputs: ActionsGoDependencySubmissionV2Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/go-dependency-submission@v2", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
