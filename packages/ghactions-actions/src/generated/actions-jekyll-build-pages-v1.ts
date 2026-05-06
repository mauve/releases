/* eslint-disable */
// Auto-generated from actions/jekyll-build-pages@v1/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsJekyllBuildPagesV1Inputs {
  /**
   * Directory where the source files reside.
   *
   * @default ./
   */
  "source"?: string | boolean | number;
  /**
   * Output directory of the build. Although it can be nested inside the source, it cannot be the
   * same as the source directory.
   *
   * @default ./_site
   */
  "destination"?: string | boolean | number;
  /**
   * Publishes posts with a future date. When set to true, the build is made with the --future
   * option which overrides the future option that may be set in a Jekyll configuration file.
   *
   * @default false
   */
  "future"?: string | boolean | number;
  /**
   * The SHA-1 of the git commit for which the build is running. Default to GITHUB_SHA.
   *
   * @default ${{ github.sha }}
   */
  "build_revision"?: string | boolean | number;
  /**
   * Verbose output
   *
   * @default true
   */
  "verbose"?: string | boolean | number;
  /**
   * GitHub token
   *
   * @default ${{ github.token }}
   */
  "token"?: string | boolean | number;
}

/**
 * Build Jekyll for GitHub Pages
 *
 * A simple GitHub Action for producing Jekyll build artifacts compatible with GitHub Pages
 *
 * @see https://github.com/actions/jekyll-build-pages
 */
export function actionsJekyllBuildPagesV1(
  inputs: ActionsJekyllBuildPagesV1Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/jekyll-build-pages@v1", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
