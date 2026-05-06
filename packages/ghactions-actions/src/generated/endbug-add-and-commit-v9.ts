// Auto-generated from EndBug/add-and-commit@v9/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface EndBugAddAndCommitV9Inputs {
  /**
   * Arguments for the git add command
   *
   * @default .
   */
  "add"?: string | boolean | number;
  /**
   * The name of the user that will be displayed as the author of the commit
   */
  "author_name"?: string | boolean | number;
  /**
   * The email of the user that will be displayed as the author of the commit
   */
  "author_email"?: string | boolean | number;
  /**
   * Additional arguments for the git commit command
   */
  "commit"?: string | boolean | number;
  /**
   * The name of the custom committer you want to use
   */
  "committer_name"?: string | boolean | number;
  /**
   * The email of the custom committer you want to use
   */
  "committer_email"?: string | boolean | number;
  /**
   * The directory where your repository is located. You should use actions/checkout first to set
   * it up
   *
   * @default .
   */
  "cwd"?: string | boolean | number;
  /**
   * How the action should fill missing author name or email.
   *
   * @default github_actor
   */
  "default_author"?: string | boolean | number;
  /**
   * Arguments for the git fetch command (if 'false', the action won't fetch the repo)
   *
   * @default --tags --force
   */
  "fetch"?: string | boolean | number;
  /**
   * The message for the commit
   */
  "message"?: string | boolean | number;
  /**
   * The name of the branch to create.
   */
  "new_branch"?: string | boolean | number;
  /**
   * The way the action should handle pathspec errors from the add and remove commands.
   *
   * @default ignore
   */
  "pathspec_error_handling"?: string | boolean | number;
  /**
   * Arguments for the git pull command. By default, the action does not pull.
   */
  "pull"?: string | boolean | number;
  /**
   * Whether to push the commit and, if any, its tags to the repo. It can also be used to set the
   * git push arguments (more info in the README)
   *
   * @default true
   */
  "push"?: string | boolean | number;
  /**
   * Arguments for the git rm command
   */
  "remove"?: string | boolean | number;
  /**
   * Arguments for the git tag command (the tag name always needs to be the first word not
   * preceded by a hyphen)
   */
  "tag"?: string | boolean | number;
  /**
   * Arguments for the git push --tags command (any additional argument will be added after
   * --tags)
   */
  "tag_push"?: string | boolean | number;
  /**
   * The token used to make requests to the GitHub API. It's NOT used to make commits and should
   * not be changed.
   *
   * @default ${{ github.token }}
   */
  "github_token"?: string | boolean | number;
}

/**
 * Add & Commit
 *
 * Automatically commit changes made in your workflow run directly to your repo
 *
 * @see https://github.com/EndBug/add-and-commit
 */
export function endBugAddAndCommitV9(
  inputs: EndBugAddAndCommitV9Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("EndBug/add-and-commit@v9", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
