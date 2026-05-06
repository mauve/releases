// Auto-generated from actions/github-script@v9/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsGithubScriptV9Inputs {
  /**
   * The script to run
   */
  "script": string | boolean | number;
  /**
   * The GitHub token used to create an authenticated client
   *
   * @default ${{ github.token }}
   */
  "github-token"?: string | boolean | number;
  /**
   * Whether to tell the GitHub client to log details of its requests. true or false. Default is
   * to run in debug mode when the GitHub Actions step debug logging is turned on.
   *
   * @default ${{ runner.debug == '1' }}
   */
  "debug"?: string | boolean | number;
  /**
   * An optional user-agent string
   *
   * @default actions/github-script
   */
  "user-agent"?: string | boolean | number;
  /**
   * A comma-separated list of GraphQL API previews to accept
   */
  "previews"?: string | boolean | number;
  /**
   * Either "string" or "json" (default "json")—how the result will be encoded
   *
   * @default json
   */
  "result-encoding"?: string | boolean | number;
  /**
   * The number of times to retry a request
   *
   * @default 0
   */
  "retries"?: string | boolean | number;
  /**
   * A comma separated list of status codes that will NOT be retried e.g. "400,500". No effect
   * unless `retries` is set
   *
   * @default 400,401,403,404,422
   */
  "retry-exempt-status-codes"?: string | boolean | number;
  /**
   * An optional GitHub REST API URL to connect to a different GitHub instance. For example,
   * https://my.github-enterprise-server.com/api/v3
   */
  "base-url"?: string | boolean | number;
}

/**
 * GitHub Script
 *
 * Run simple scripts using the GitHub client
 *
 * @see https://github.com/actions/github-script
 */
export function actionsGithubScriptV9(
  inputs: ActionsGithubScriptV9Inputs,
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/github-script@v9", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
