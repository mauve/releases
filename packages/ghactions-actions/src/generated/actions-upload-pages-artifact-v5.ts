/* eslint-disable */
// Auto-generated from actions/upload-pages-artifact@v5/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsUploadPagesArtifactV5Inputs {
  /**
   * Artifact name
   *
   * @default github-pages
   */
  "name"?: string | boolean | number;
  /**
   * Path of the directory containing the static assets.
   *
   * @default _site/
   */
  "path"?: string | boolean | number;
  /**
   * Duration after which artifact will expire in days.
   *
   * @default 1
   */
  "retention-days"?: string | boolean | number;
  /**
   * Include hidden files and directories (those starting with a dot) in the artifact. Excludes
   * .git and .github regardless.
   *
   * @default false
   */
  "include-hidden-files"?: string | boolean | number;
}

/**
 * Upload GitHub Pages artifact
 *
 * A composite action that prepares your static assets to be deployed to GitHub Pages
 *
 * @see https://github.com/actions/upload-pages-artifact
 */
export function actionsUploadPagesArtifactV5(
  inputs: ActionsUploadPagesArtifactV5Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/upload-pages-artifact@v5", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
