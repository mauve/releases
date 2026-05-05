/* eslint-disable */
// Auto-generated from GitHubCommentV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { github_OAuth_PersonalAccessToken_InstallationToken_TokenConnection } from '../connections.js';

export interface GitHubCommentV0Inputs {
  /**
   * GitHub connection (OAuth or PAT)
   *
   * Specify the name of the GitHub service connection to use to connect to the GitHub
   * repository. The connection must be based on a GitHub user's OAuth or a GitHub personal
   * access token. Learn more about service connections [here](https://aka.ms/AA3am5s).
   */
  "gitHubConnection": github_OAuth_PersonalAccessToken_InstallationToken_TokenConnection;
  /**
   * Repository
   *
   * Specify the name of the GitHub repository in which the GitHub comment will be created
   *
   * @default $(Build.Repository.Name)
   */
  "repositoryName": string /* TODO: unknown task input type "githubRepositoryPicker" */;
  /**
   * ID of the github pr/issue
   *
   * Specify the issue or pr number; if used in a Pipeline for PRs leave it empty to dynamically
   * figure out the id
   */
  "id"?: string;
  /**
   * Comment
   *
   * Contents of the comment to be written
   */
  "comment"?: string;
}

/**
 * GitHub Comment
 *
 * Write a comment to your Github entity i.e. issue or a Pull Request (PR)
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/GitHubCommentV0
 */
export function gitHubCommentV0(
  inputs: GitHubCommentV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("GitHubComment@0", inputs as unknown as Record<string, unknown>, opts);
}
