/**
 * Per-artifact release variables. The alias is user-chosen at release-pipeline
 * definition time, so we can't enumerate concrete keys at codegen — instead
 * we expose a function that takes the alias and returns the typed bundle.
 *
 * Field list mirrors the "Release.Artifacts.{alias}.*" table at
 * https://learn.microsoft.com/azure/devops/pipelines/release/variables —
 * keep this in sync with that page when MS adds new fields.
 */

/**
 * Per-artifact variables (`$(Release.Artifacts.<alias>.<Name>)`) for one
 * artifact alias. Returned by {@link releaseArtifactVar} and
 * `PreDef.Release.Artifacts(alias)`.
 *
 * Each property is the literal `$(...)` macro string Azure DevOps will
 * substitute at runtime.
 */
export interface ReleaseArtifactVars {
  /** The build/source name of the artifact. (e.g. the build pipeline id reference.) */
  readonly DefinitionId: string;
  /** The build/source name of the build that produced the artifact. */
  readonly DefinitionName: string;
  /** The identifier of the build that produced the artifact. */
  readonly BuildId: string;
  /** The number of the build that produced the artifact (the run name). */
  readonly BuildNumber: string;
  /** The URL to the build that produced the artifact. */
  readonly BuildUri: string;
  /** Type of build (e.g. `Build`, `Jenkins`, `Git`, `GitHub`). */
  readonly Type: string;
  /** Friendly identifier of the artifact source connection. */
  readonly SourceAlias: string;
  /** The branch the artifact source was built from. */
  readonly SourceBranch: string;
  /** Short name of the source branch (e.g. `main`). */
  readonly SourceBranchName: string;
  /** Full source-control commit hash for the artifact version. */
  readonly SourceVersion: string;
  /** Repository name backing the artifact source. */
  readonly Repository: string;
  /** ID of the repository backing the artifact source. */
  readonly RepositoryProvider: string;
  /** ID of the requestor (the user or service account) that triggered the source build. */
  readonly RequestedForId: string;
  /** Display name of the requestor that triggered the source build. */
  readonly RequestedFor: string;
}

const ARTIFACT_FIELDS = [
  'DefinitionId',
  'DefinitionName',
  'BuildId',
  'BuildNumber',
  'BuildUri',
  'Type',
  'SourceAlias',
  'SourceBranch',
  'SourceBranchName',
  'SourceVersion',
  'Repository',
  'RepositoryProvider',
  'RequestedForId',
  'RequestedFor',
] as const satisfies readonly (keyof ReleaseArtifactVars)[];

/**
 * Return the per-artifact variable bundle for a given alias.
 *
 * The alias is whatever you set as `Artifact.alias` in the release definition
 * — typically the source pipeline / repo name. Resolves to `$(Release.Artifacts.<alias>.Name)`
 * macro strings.
 *
 * Lives at the top level for ergonomic import; identical to
 * `PreDef.Release.Artifacts(alias)`.
 *
 * @example
 * ```ts
 * import { releaseArtifactVar } from '@mauve/azpipe-utils';
 *
 * const v = releaseArtifactVar('web');
 * v.BuildId        // '$(Release.Artifacts.web.BuildId)'
 * v.SourceBranch   // '$(Release.Artifacts.web.SourceBranch)'
 * ```
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/release/variables
 */
export function releaseArtifactVar(alias: string): ReleaseArtifactVars {
  const out = {} as Record<string, string>;
  for (const field of ARTIFACT_FIELDS) {
    out[field] = `$(Release.Artifacts.${alias}.${field})`;
  }
  return out as unknown as ReleaseArtifactVars;
}
