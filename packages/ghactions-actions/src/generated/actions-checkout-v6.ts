/* eslint-disable */
// Auto-generated from actions/checkout@v6/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsCheckoutV6Inputs {
  /**
   * Repository name with owner. For example, actions/checkout
   *
   * @default ${{ github.repository }}
   */
  "repository"?: string | boolean | number;
  /**
   * The branch, tag or SHA to checkout. When checking out the repository that triggered a
   * workflow, this defaults to the reference or SHA for that event. Otherwise, uses the default
   * branch.
   */
  "ref"?: string | boolean | number;
  /**
   * Personal access token (PAT) used to fetch the repository. The PAT is configured with the
   * local git config, which enables your scripts to run authenticated git commands. The post-job
   * step removes the PAT.
   *
   * We recommend using a service account with the least permissions necessary. Also when
   * generating a new PAT, select the least scopes necessary.
   *
   * [Learn more about creating and using encrypted
   * secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)
   *
   * @default ${{ github.token }}
   */
  "token"?: string | boolean | number;
  /**
   * SSH key used to fetch the repository. The SSH key is configured with the local git config,
   * which enables your scripts to run authenticated git commands. The post-job step removes the
   * SSH key.
   *
   * We recommend using a service account with the least permissions necessary.
   *
   * [Learn more about creating and using encrypted
   * secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)
   */
  "ssh-key"?: string | boolean | number;
  /**
   * Known hosts in addition to the user and global host key database. The public SSH keys for a
   * host may be obtained using the utility `ssh-keyscan`. For example, `ssh-keyscan github.com`.
   * The public key for github.com is always implicitly added.
   */
  "ssh-known-hosts"?: string | boolean | number;
  /**
   * Whether to perform strict host key checking. When true, adds the options
   * `StrictHostKeyChecking=yes` and `CheckHostIP=no` to the SSH command line. Use the input
   * `ssh-known-hosts` to configure additional hosts.
   *
   * @default true
   */
  "ssh-strict"?: string | boolean | number;
  /**
   * The user to use when connecting to the remote SSH host. By default 'git' is used.
   *
   * @default git
   */
  "ssh-user"?: string | boolean | number;
  /**
   * Whether to configure the token or SSH key with the local git config
   *
   * @default true
   */
  "persist-credentials"?: string | boolean | number;
  /**
   * Relative path under $GITHUB_WORKSPACE to place the repository
   */
  "path"?: string | boolean | number;
  /**
   * Whether to execute `git clean -ffdx && git reset --hard HEAD` before fetching
   *
   * @default true
   */
  "clean"?: string | boolean | number;
  /**
   * Partially clone against a given filter. Overrides sparse-checkout if set.
   *
   * @default null
   */
  "filter"?: string | boolean | number;
  /**
   * Do a sparse checkout on given patterns. Each pattern should be separated with new lines.
   *
   * @default null
   */
  "sparse-checkout"?: string | boolean | number;
  /**
   * Specifies whether to use cone-mode when doing a sparse checkout.
   *
   * @default true
   */
  "sparse-checkout-cone-mode"?: string | boolean | number;
  /**
   * Number of commits to fetch. 0 indicates all history for all branches and tags.
   *
   * @default 1
   */
  "fetch-depth"?: string | boolean | number;
  /**
   * Whether to fetch tags, even if fetch-depth > 0.
   *
   * @default false
   */
  "fetch-tags"?: string | boolean | number;
  /**
   * Whether to show progress status output when fetching.
   *
   * @default true
   */
  "show-progress"?: string | boolean | number;
  /**
   * Whether to download Git-LFS files
   *
   * @default false
   */
  "lfs"?: string | boolean | number;
  /**
   * Whether to checkout submodules: `true` to checkout submodules or `recursive` to recursively
   * checkout submodules.
   *
   * When the `ssh-key` input is not provided, SSH URLs beginning with `git@github.com:` are
   * converted to HTTPS.
   *
   * @default false
   */
  "submodules"?: string | boolean | number;
  /**
   * Add repository path as safe.directory for Git global config by running `git config --global
   * --add safe.directory <path>`
   *
   * @default true
   */
  "set-safe-directory"?: string | boolean | number;
  /**
   * The base URL for the GitHub instance that you are trying to clone from, will use environment
   * defaults to fetch from the same instance that the workflow is running from unless specified.
   * Example URLs are https://github.com or https://my-ghes-server.example.com
   */
  "github-server-url"?: string | boolean | number;
}

/**
 * Checkout
 *
 * Checkout a Git repository at a particular version
 *
 * @see https://github.com/actions/checkout
 */
export function actionsCheckoutV6(
  inputs: ActionsCheckoutV6Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/checkout@v6", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
