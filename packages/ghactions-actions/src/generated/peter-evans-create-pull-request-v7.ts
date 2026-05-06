// Auto-generated from peter-evans/create-pull-request@v7/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface PeterEvansCreatePullRequestV7Inputs {
  /**
   * The token that the action will use to create and update the pull request.
   *
   * @default ${{ github.token }}
   */
  "token"?: string | boolean | number;
  /**
   * The token that the action will use to create and update the branch. Defaults to the value of
   * `token`.
   */
  "branch-token"?: string | boolean | number;
  /**
   * Relative path under $GITHUB_WORKSPACE to the repository. Defaults to $GITHUB_WORKSPACE.
   */
  "path"?: string | boolean | number;
  /**
   * A comma or newline-separated list of file paths to commit. Paths should follow git's
   * pathspec syntax. Defaults to adding all new and modified files.
   */
  "add-paths"?: string | boolean | number;
  /**
   * The message to use when committing changes.
   *
   * @default [create-pull-request] automated change
   */
  "commit-message"?: string | boolean | number;
  /**
   * The committer name and email address in the format `Display Name <email@address.com>`.
   * Defaults to the GitHub Actions bot user.
   *
   * @default github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>
   */
  "committer"?: string | boolean | number;
  /**
   * The author name and email address in the format `Display Name <email@address.com>`. Defaults
   * to the user who triggered the workflow run.
   *
   * @default ${{ github.actor }} <${{ github.actor_id }}+${{ github.actor
   * }}@users.noreply.github.com>
   */
  "author"?: string | boolean | number;
  /**
   * Add `Signed-off-by` line by the committer at the end of the commit log message.
   *
   * @default false
   */
  "signoff"?: string | boolean | number;
  /**
   * The pull request branch name.
   *
   * @default create-pull-request/patch
   */
  "branch"?: string | boolean | number;
  /**
   * Delete the `branch` if it doesn't have an active pull request associated with it.
   *
   * @default false
   */
  "delete-branch"?: string | boolean | number;
  /**
   * The branch suffix type when using the alternative branching strategy.
   */
  "branch-suffix"?: string | boolean | number;
  /**
   * The pull request base branch. Defaults to the branch checked out in the workflow.
   */
  "base"?: string | boolean | number;
  /**
   * A fork of the checked out parent repository to which the pull request branch will be pushed.
   * e.g. `owner/repo-fork`. The pull request will be created to merge the fork's branch into the
   * parent's base.
   */
  "push-to-fork"?: string | boolean | number;
  /**
   * Sign commits as `github-actions[bot]` when using `GITHUB_TOKEN`, or your own bot when using
   * GitHub App tokens.
   *
   * @default false
   */
  "sign-commits"?: string | boolean | number;
  /**
   * The title of the pull request.
   *
   * @default Changes by create-pull-request action
   */
  "title"?: string | boolean | number;
  /**
   * The body of the pull request.
   *
   * @default Automated changes by
   * [create-pull-request](https://github.com/peter-evans/create-pull-request) GitHub action
   */
  "body"?: string | boolean | number;
  /**
   * The path to a file containing the pull request body. Takes precedence over `body`.
   */
  "body-path"?: string | boolean | number;
  /**
   * A comma or newline separated list of labels.
   */
  "labels"?: string | boolean | number;
  /**
   * A comma or newline separated list of assignees (GitHub usernames).
   */
  "assignees"?: string | boolean | number;
  /**
   * A comma or newline separated list of reviewers (GitHub usernames) to request a review from.
   */
  "reviewers"?: string | boolean | number;
  /**
   * A comma or newline separated list of GitHub teams to request a review from. Note that a
   * `repo` scoped Personal Access Token (PAT) may be required.
   */
  "team-reviewers"?: string | boolean | number;
  /**
   * The number of the milestone to associate the pull request with.
   */
  "milestone"?: string | boolean | number;
  /**
   * Create a draft pull request. Valid values are `true` (only on create), `always-true` (on
   * create and update), and `false`.
   *
   * @default false
   */
  "draft"?: string | boolean | number;
  /**
   * Indicates whether maintainers can modify the pull request.
   *
   * @default true
   */
  "maintainer-can-modify"?: string | boolean | number;
}

/**
 * Create Pull Request
 *
 * Creates a pull request for changes to your repository in the actions workspace
 *
 * @see https://github.com/peter-evans/create-pull-request
 */
export function peterEvansCreatePullRequestV7(
  inputs: PeterEvansCreatePullRequestV7Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("peter-evans/create-pull-request@v7", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
