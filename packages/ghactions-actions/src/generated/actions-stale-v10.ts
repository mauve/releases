/* eslint-disable */
// Auto-generated from actions/stale@v10/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsStaleV10Inputs {
  /**
   * Token for the repository. Can be passed in using `{{ secrets.GITHUB_TOKEN }}`.
   *
   * @default ${{ github.token }}
   */
  "repo-token"?: string | boolean | number;
  /**
   * The message to post on the issue when tagging it. If none provided, will not mark issues
   * stale.
   */
  "stale-issue-message"?: string | boolean | number;
  /**
   * The message to post on the pull request when tagging it. If none provided, will not mark
   * pull requests stale.
   */
  "stale-pr-message"?: string | boolean | number;
  /**
   * The message to post on the issue when closing it. If none provided, will not comment when
   * closing an issue.
   */
  "close-issue-message"?: string | boolean | number;
  /**
   * The message to post on the pull request when closing it. If none provided, will not comment
   * when closing a pull requests.
   */
  "close-pr-message"?: string | boolean | number;
  /**
   * The number of days old an issue or a pull request can be before marking it stale. Set to -1
   * to never mark issues or pull requests as stale automatically.
   *
   * @default 60
   */
  "days-before-stale"?: string | boolean | number;
  /**
   * The number of days old an issue can be before marking it stale. Set to -1 to never mark
   * issues as stale automatically. Override "days-before-stale" option regarding only the
   * issues.
   */
  "days-before-issue-stale"?: string | boolean | number;
  /**
   * The number of days old a pull request can be before marking it stale. Set to -1 to never
   * mark pull requests as stale automatically. Override "days-before-stale" option regarding
   * only the pull requests.
   */
  "days-before-pr-stale"?: string | boolean | number;
  /**
   * The number of days to wait to close an issue or a pull request after it being marked stale.
   * Set to -1 to never close stale issues or pull requests.
   *
   * @default 7
   */
  "days-before-close"?: string | boolean | number;
  /**
   * The number of days to wait to close an issue after it being marked stale. Set to -1 to never
   * close stale issues. Override "days-before-close" option regarding only the issues.
   */
  "days-before-issue-close"?: string | boolean | number;
  /**
   * The number of days to wait to close a pull request after it being marked stale. Set to -1 to
   * never close stale pull requests. Override "days-before-close" option regarding only the pull
   * requests.
   */
  "days-before-pr-close"?: string | boolean | number;
  /**
   * The label to apply when an issue is stale.
   *
   * @default Stale
   */
  "stale-issue-label"?: string | boolean | number;
  /**
   * The label to apply when an issue is closed.
   */
  "close-issue-label"?: string | boolean | number;
  /**
   * The labels that mean an issue is exempt from being marked stale. Separate multiple labels
   * with commas (eg. "label1,label2").
   */
  "exempt-issue-labels"?: string | boolean | number;
  /**
   * The reason to use when closing an issue.
   *
   * @default not_planned
   */
  "close-issue-reason"?: string | boolean | number;
  /**
   * The label to apply when a pull request is stale.
   *
   * @default Stale
   */
  "stale-pr-label"?: string | boolean | number;
  /**
   * The label to apply when a pull request is closed.
   */
  "close-pr-label"?: string | boolean | number;
  /**
   * The labels that mean a pull request is exempt from being marked as stale. Separate multiple
   * labels with commas (eg. "label1,label2").
   */
  "exempt-pr-labels"?: string | boolean | number;
  /**
   * The milestones that mean an issue or a pull request is exempt from being marked as stale.
   * Separate multiple milestones with commas (eg. "milestone1,milestone2").
   */
  "exempt-milestones"?: string | boolean | number;
  /**
   * The milestones that mean an issue is exempt from being marked as stale. Separate multiple
   * milestones with commas (eg. "milestone1,milestone2"). Override "exempt-milestones" option
   * regarding only the issues.
   */
  "exempt-issue-milestones"?: string | boolean | number;
  /**
   * The milestones that mean a pull request is exempt from being marked as stale. Separate
   * multiple milestones with commas (eg. "milestone1,milestone2"). Override "exempt-milestones"
   * option regarding only the pull requests.
   */
  "exempt-pr-milestones"?: string | boolean | number;
  /**
   * Exempt all issues and pull requests with milestones from being marked as stale. Default to
   * false.
   *
   * @default false
   */
  "exempt-all-milestones"?: string | boolean | number;
  /**
   * Exempt all issues with milestones from being marked as stale. Override
   * "exempt-all-milestones" option regarding only the issues.
   */
  "exempt-all-issue-milestones"?: string | boolean | number;
  /**
   * Exempt all pull requests with milestones from being marked as stale. Override
   * "exempt-all-milestones" option regarding only the pull requests.
   */
  "exempt-all-pr-milestones"?: string | boolean | number;
  /**
   * Only issues or pull requests with all of these labels are checked if stale. Defaults to ``
   * (disabled) and can be a comma-separated list of labels.
   */
  "only-labels"?: string | boolean | number;
  /**
   * Only issues or pull requests with at least one of these labels are checked if stale.
   * Defaults to `` (disabled) and can be a comma-separated list of labels.
   */
  "any-of-labels"?: string | boolean | number;
  /**
   * Only issues with at least one of these labels are checked if stale. Defaults to ``
   * (disabled) and can be a comma-separated list of labels. Override "any-of-labels" option
   * regarding only the issues.
   */
  "any-of-issue-labels"?: string | boolean | number;
  /**
   * Only pull requests with at least one of these labels are checked if stale. Defaults to ``
   * (disabled) and can be a comma-separated list of labels. Override "any-of-labels" option
   * regarding only the pull requests.
   */
  "any-of-pr-labels"?: string | boolean | number;
  /**
   * Only issues with all of these labels are checked if stale. Defaults to `[]` (disabled) and
   * can be a comma-separated list of labels. Override "only-labels" option regarding only the
   * issues.
   */
  "only-issue-labels"?: string | boolean | number;
  /**
   * Only pull requests with all of these labels are checked if stale. Defaults to `[]`
   * (disabled) and can be a comma-separated list of labels. Override "only-labels" option
   * regarding only the pull requests.
   */
  "only-pr-labels"?: string | boolean | number;
  /**
   * The maximum number of operations per run, used to control rate limiting (GitHub API CRUD
   * related).
   *
   * @default 30
   */
  "operations-per-run"?: string | boolean | number;
  /**
   * Remove stale labels from issues and pull requests when they are updated or commented on.
   *
   * @default true
   */
  "remove-stale-when-updated"?: string | boolean | number;
  /**
   * Remove stale labels from issues when they are updated or commented on. Override
   * "remove-stale-when-updated" option regarding only the issues.
   */
  "remove-issue-stale-when-updated"?: string | boolean | number;
  /**
   * Remove stale labels from pull requests when they are updated or commented on. Override
   * "remove-stale-when-updated" option regarding only the pull requests.
   */
  "remove-pr-stale-when-updated"?: string | boolean | number;
  /**
   * Run the processor in debug mode without actually performing any operations on live issues.
   *
   * @default false
   */
  "debug-only"?: string | boolean | number;
  /**
   * The order to get issues or pull requests. Defaults to false, which is descending.
   *
   * @default false
   */
  "ascending"?: string | boolean | number;
  /**
   * What to sort results by. Valid options are `created`, `updated`, and `comments`. Defaults to
   * `created`.
   *
   * @default created
   */
  "sort-by"?: string | boolean | number;
  /**
   * Delete the git branch after closing a stale pull request.
   *
   * @default false
   */
  "delete-branch"?: string | boolean | number;
  /**
   * The date used to skip the stale action on issue/pull request created before it (ISO 8601 or
   * RFC 2822).
   */
  "start-date"?: string | boolean | number;
  /**
   * The assignees which exempt an issue or a pull request from being marked as stale. Separate
   * multiple assignees with commas (eg. "user1,user2").
   */
  "exempt-assignees"?: string | boolean | number;
  /**
   * The assignees which exempt an issue from being marked as stale. Separate multiple assignees
   * with commas (eg. "user1,user2"). Override "exempt-assignees" option regarding only the
   * issues.
   */
  "exempt-issue-assignees"?: string | boolean | number;
  /**
   * The assignees which exempt a pull request from being marked as stale. Separate multiple
   * assignees with commas (eg. "user1,user2"). Override "exempt-assignees" option regarding only
   * the pull requests.
   */
  "exempt-pr-assignees"?: string | boolean | number;
  /**
   * Exempt all issues and pull requests with assignees from being marked as stale. Default to
   * false.
   *
   * @default false
   */
  "exempt-all-assignees"?: string | boolean | number;
  /**
   * Exempt all issues with assignees from being marked as stale. Override "exempt-all-assignees"
   * option regarding only the issues.
   */
  "exempt-all-issue-assignees"?: string | boolean | number;
  /**
   * Exempt all pull requests with assignees from being marked as stale. Override
   * "exempt-all-assignees" option regarding only the pull requests.
   */
  "exempt-all-pr-assignees"?: string | boolean | number;
  /**
   * Exempt draft pull requests from being marked as stale. Default to false.
   *
   * @default false
   */
  "exempt-draft-pr"?: string | boolean | number;
  /**
   * Display some statistics at the end regarding the stale workflow (only when the logs are
   * enabled).
   *
   * @default true
   */
  "enable-statistics"?: string | boolean | number;
  /**
   * A comma delimited list of labels to add when an issue or pull request becomes unstale.
   */
  "labels-to-add-when-unstale"?: string | boolean | number;
  /**
   * A comma delimited list of labels to remove when an issue or pull request becomes stale.
   */
  "labels-to-remove-when-stale"?: string | boolean | number;
  /**
   * A comma delimited list of labels to remove when an issue or pull request becomes unstale.
   */
  "labels-to-remove-when-unstale"?: string | boolean | number;
  /**
   * Any update (update/comment) can reset the stale idle time on the issues and pull requests.
   *
   * @default false
   */
  "ignore-updates"?: string | boolean | number;
  /**
   * Any update (update/comment) can reset the stale idle time on the issues. Override
   * "ignore-updates" option regarding only the issues.
   */
  "ignore-issue-updates"?: string | boolean | number;
  /**
   * Any update (update/comment) can reset the stale idle time on the pull requests. Override
   * "ignore-updates" option regarding only the pull requests.
   */
  "ignore-pr-updates"?: string | boolean | number;
  /**
   * Only the issues or the pull requests with an assignee will be marked as stale automatically.
   *
   * @default false
   */
  "include-only-assigned"?: string | boolean | number;
  /**
   * Only issues with a matching type are processed as stale/closed. Defaults to `[]` (disabled)
   * and can be a comma-separated list of issue types.
   */
  "only-issue-types"?: string | boolean | number;
}

/**
 * Close Stale Issues
 *
 * Close issues and pull requests with no recent activity
 *
 * @see https://github.com/actions/stale
 */
export function actionsStaleV10(
  inputs: ActionsStaleV10Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/stale@v10", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
