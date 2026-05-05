/* eslint-disable */
// Auto-generated from GitHubReleaseV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { github_OAuth_OAuth2_PersonalAccessToken_InstallationToken_TokenConnection } from '../connections.js';

export interface GitHubReleaseV1Inputs {
  /**
   * GitHub connection (OAuth or PAT)
   *
   * Specify the name of the GitHub service connection to use to connect to the GitHub
   * repository. The connection must be based on a GitHub user's OAuth or a GitHub personal
   * access token. Learn more about service connections [here](https://aka.ms/AA3am5s).
   */
  "gitHubConnection": github_OAuth_OAuth2_PersonalAccessToken_InstallationToken_TokenConnection;
  /**
   * Repository
   *
   * Specify the name of the GitHub repository in which the GitHub release will be created,
   * edited, or deleted.
   *
   * @default $(Build.Repository.Name)
   */
  "repositoryName": string /* TODO: unknown task input type "githubRepositoryPicker" */;
  /**
   * Action
   *
   * Specify the type of release operation to perform. This task can create, edit, or delete a
   * GitHub release.
   *
   * - `create` — Create
   * - `edit` — Edit
   * - `delete` — Delete
   *
   * @default create
   */
  "action": "create" | "edit" | "delete";
  /**
   * Target
   *
   * Specify the commit SHA for which the GitHub release will be created. E.g.
   * `48b11d8d6e92a22e3e9563a3f643699c16fd6e27`. You can also use a variable here. E.g.
   * `$(myCommitSHA)`.
   *
   * @default $(Build.SourceVersion)
   *
   * Only meaningful when: `action = create || action = edit`
   */
  "target"?: string;
  /**
   * Tag source
   *
   * Specify the tag to be used for release creation. The 'Git tag' option automatically takes
   * the tag which is associated with the Git commit. Use the 'User specified tag' option to
   * manually provide a tag.
   *
   * - `gitTag` — Git tag
   * - `userSpecifiedTag` — User specified tag
   *
   * @default gitTag
   *
   * Only meaningful when: `action = create`
   */
  "tagSource"?: "gitTag" | "userSpecifiedTag";
  /**
   * Tag Pattern
   *
   * Specify the git tag pattern using regex(Eg. `release-v1.*`). GitHub release will be created
   * only for commits that have matching git tag.
   *
   * Only meaningful when: `tagSource = gitTag`
   */
  "tagPattern"?: string;
  /**
   * Tag
   *
   * Specify the tag for which to create, edit, or delete a release. You can also use a variable
   * here. E.g. `$(myTagName)`.
   *
   * Only meaningful when: `action = edit || action = delete || tagSource = userSpecifiedTag`
   */
  "tag"?: string;
  /**
   * Release title
   *
   * Specify the title of the GitHub release. If left empty, the tag will be used as the release
   * title.
   *
   * Only meaningful when: `action = create || action = edit`
   */
  "title"?: string;
  /**
   * Release notes source
   *
   * Specify the description of the GitHub release. Use the 'Release notes file' option to use
   * the contents of a file as release notes. Use the 'Inline release notes' option to manually
   * enter release notes.
   *
   * - `filePath` — Release notes file
   * - `inline` — Inline release notes
   *
   * @default filePath
   *
   * Only meaningful when: `action = create || action = edit`
   */
  "releaseNotesSource"?: "filePath" | "inline";
  /**
   * Release notes file path
   *
   * Select the file which contains the release notes.
   *
   * Only meaningful when: `releaseNotesSource = filePath`
   */
  "releaseNotesFilePath"?: string;
  /**
   * Release notes
   *
   * Enter the release notes here. Markdown is supported.
   *
   * Only meaningful when: `releaseNotesSource = inline`
   */
  "releaseNotesInline"?: string;
  /**
   * Assets
   *
   * Specify the files to be uploaded as assets of the release. You can use wildcard characters
   * to specify multiple files. E.g. For build pipelines,
   * `$(Build.ArtifactStagingDirectory)/*.zip` or in case of release pipelines
   * `$(System.DefaultWorkingDirectory)/*.zip`. You can also specify multiple patterns - one per
   * line. By default, all files in the $(Build.ArtifactStagingDirectory) directory will be
   * uploaded. To know more about the list of pre-defined variables available, see [build
   * variables](https://aka.ms/AA4449z) and [release variables](https://aka.ms/AA43wws).
   *
   * @default $(Build.ArtifactStagingDirectory)/*
   *
   * Only meaningful when: `action = create || action = edit`
   */
  "assets"?: string;
  /**
   * Asset upload mode
   *
   * Use the 'Delete existing assets' option to first delete any existing assets in the release
   * and then upload all assets. Use the 'Replace existing assets' option to replace any assets
   * that have the same name.
   *
   * - `delete` — Delete exisiting assets
   * - `replace` — Replace existing assets
   *
   * @default delete
   *
   * Only meaningful when: `action = edit`
   */
  "assetUploadMode"?: "delete" | "replace";
  /**
   * Draft release
   *
   * Indicate whether the release should be saved as a draft (unpublished). If `false`, the
   * release will be published.
   *
   * @default false
   *
   * Only meaningful when: `action = create || action = edit`
   */
  "isDraft"?: boolean;
  /**
   * Pre-release
   *
   * Indicate whether the release should be marked as a pre-release.
   *
   * @default false
   *
   * Only meaningful when: `action = create || action = edit`
   */
  "isPreRelease"?: boolean;
  /**
   * Make Latest
   *
   * Specify whether to designate this release as the 'latest' release for the repository. Set to
   * 'false' to prevent marking this release as latest, or 'legacy' to use GitHub's legacy
   * latest-release determination based on creation date and semantic versioning.
   *
   * - `true` — true
   * - `false` — false
   * - `legacy` — legacy
   *
   * @default true
   *
   * Only meaningful when: `action = create || action = edit`
   */
  "makeLatest"?: "true" | "false" | "legacy";
  /**
   * Add changelog
   *
   * If set to `true`, a list of changes (commits and issues) between this and the last published
   * release will be generated and appended to the release notes.
   *
   * @default true
   *
   * Only meaningful when: `action = create || action = edit`
   */
  "addChangeLog"?: boolean;
  /**
   * Compare to
   *
   * Indicate which release we should compare with to generate the changelog:
   * Last full release: Compares the current release with the most recent non-draft release which
   * is not marked as pre-release.
   * Last non-draft release: Compares the current release with the most recent non-draft release.
   * Last non-draft release by tag: Compares the current release with the last non-draft release
   * matching the specified tag. You can also specify a regex instead of an exact tag.
   *
   * - `lastFullRelease` — Last full release
   * - `lastNonDraftRelease` — Last non-draft release
   * - `lastNonDraftReleaseByTag` — Last non-draft release by tag
   *
   * @default lastFullRelease
   *
   * Only meaningful when: `addChangeLog = true`
   *
   * In group: changeLogConfiguration
   */
  "changeLogCompareToRelease"?: "lastFullRelease" | "lastNonDraftRelease" | "lastNonDraftReleaseByTag";
  /**
   * Release Tag
   *
   * Specify the regex for release tag. Release matching this tag will be used as base for
   * changelog computation.
   *
   * Only meaningful when: `changeLogCompareToRelease = lastNonDraftReleaseByTag`
   *
   * In group: changeLogConfiguration
   */
  "changeLogCompareToReleaseTag"?: string;
  /**
   * Changelog type
   *
   * Changelog can be commit based or issue based . Commit based changelog lists all commits
   * included in a release where as Issue based changelog lists all the issues/pr included in the
   * release.
   *
   * - `commitBased` — Commit based
   * - `issueBased` — Issue based
   *
   * @default commitBased
   *
   * Only meaningful when: `addChangeLog = true`
   *
   * In group: changeLogConfiguration
   */
  "changeLogType"?: "commitBased" | "issueBased";
  /**
   * Categories
   *
   * Using this you can categorize changes based on the label associated with the issue/pr. For a
   * label you can mention the display name for the category and the state of issue. E.g. `"[{
   * "label" : "bug", "displayName" : "Bugs", "state" : "closed" }]"` .In case a change has
   * multiple labels on it, the first specified label takes priority. Leave this field empty, to
   * see a flat list of issues/pr.
   *
   * @default [{ "label" : "bug", "displayName" : "Bugs", "state" : "closed" }]
   *
   * Only meaningful when: `changeLogType = issueBased`
   *
   * In group: changeLogConfiguration
   */
  "changeLogLabels"?: string;
}

/**
 * GitHub Release
 *
 * Create, edit, or delete a GitHub release
 *
 * [Learn more about this task](https://aka.ms/AA3aeiw)
 *
 * @see https://aka.ms/AA5vv5o
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/GitHubReleaseV1
 */
export function gitHubReleaseV1(
  inputs: GitHubReleaseV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("GitHubRelease@1", inputs as unknown as Record<string, unknown>, opts);
}
