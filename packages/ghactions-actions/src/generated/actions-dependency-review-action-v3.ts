/* eslint-disable */
// Auto-generated from actions/dependency-review-action@v3/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsDependencyReviewActionV3Inputs {
  /**
   * Token for the repository. Can be passed in using `{{ secrets.GITHUB_TOKEN }}`.
   *
   * @default ${{ github.token }}
   */
  "repo-token"?: string | boolean | number;
  /**
   * Don't block PRs below this severity. Possible values are `low`, `moderate`, `high`,
   * `critical`.
   */
  "fail-on-severity"?: string | boolean | number;
  /**
   * Dependency scopes to block PRs on. Comma-separated list. Possible values are 'unknown',
   * 'runtime', and 'development' (e.g. "runtime, development")
   */
  "fail-on-scopes"?: string | boolean | number;
  /**
   * The base git ref to be used for this check. Has a default value when the workflow event is
   * `pull_request` or `pull_request_target`. Must be provided otherwise.
   */
  "base-ref"?: string | boolean | number;
  /**
   * The head git ref to be used for this check. Has a default value when the workflow event is
   * `pull_request` or `pull_request_target`. Must be provided otherwise.
   */
  "head-ref"?: string | boolean | number;
  /**
   * A path to the configuration file for the action.
   */
  "config-file"?: string | boolean | number;
  /**
   * Comma-separated list of allowed licenses (e.g. "MIT, GPL 3.0, BSD 2 Clause")
   */
  "allow-licenses"?: string | boolean | number;
  /**
   * Comma-separated list of forbidden licenses (e.g. "MIT, GPL 3.0, BSD 2 Clause")
   */
  "deny-licenses"?: string | boolean | number;
  /**
   * Comma-separated list of dependencies in purl format (e.g. "pkg:npm/express,
   * pkg:pypi/pycrypto"). These dependencies will be permitted to use any license, no matter what
   * license policy is enforced otherwise.
   */
  "allow-dependencies-licenses"?: string | boolean | number;
  /**
   * Comma-separated list of allowed GitHub Advisory IDs (e.g. "GHSA-abcd-1234-5679,
   * GHSA-efgh-1234-5679")
   */
  "allow-ghsas"?: string | boolean | number;
  /**
   * A token for fetching external configuration file if it lives in another repository. It is
   * required if the repository is private
   */
  "external-repo-token"?: string | boolean | number;
  /**
   * A boolean to determine if license checks should be performed
   */
  "license-check"?: string | boolean | number;
  /**
   * A boolean to determine if vulnerability checks should be performed
   */
  "vulnerability-check"?: string | boolean | number;
  /**
   * Determines if the summary is posted as a comment in the PR itself. Setting this to `always`
   * or `on-failure` requires you to give the workflow the write permissions for pull-requests
   */
  "comment-summary-in-pr"?: string | boolean | number;
  /**
   * A comma-separated list of package URLs to deny (e.g. "pkg:npm/express, pkg:pypi/pycrypto")
   */
  "deny-packages"?: string | boolean | number;
  /**
   * A comma-separated list of package URLs for group(s)/namespace(s) to deny (e.g.
   * "pkg:npm/express, pkg:pypi/pycrypto")
   */
  "deny-groups"?: string | boolean | number;
  /**
   * Whether to retry on snapshot warnings
   *
   * @default false
   */
  "retry-on-snapshot-warnings"?: string | boolean | number;
  /**
   * Number of seconds to wait before stopping snapshot retries.
   *
   * @default 120
   */
  "retry-on-snapshot-warnings-timeout"?: string | boolean | number;
}

/**
 * Dependency Review
 *
 * Prevent the introduction of dependencies with known vulnerabilities
 *
 * @see https://github.com/actions/dependency-review-action
 */
export function actionsDependencyReviewActionV3(
  inputs: ActionsDependencyReviewActionV3Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/dependency-review-action@v3", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
