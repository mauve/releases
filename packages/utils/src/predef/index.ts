/**
 * `PreDef` — typed predefined-variable symbols for Azure DevOps.
 *
 * Every leaf is the literal `$(Name)` macro string Azure substitutes at
 * runtime. Hovering an entry in your editor shows the description copied from
 * MS Learn.
 *
 * Three top-level namespaces:
 * - {@link "Pipeline"} — variables available in YAML / build-pipeline runs (`$(Build.*)`,
 *   plus the build-context value of `$(System.*)` and `$(Agent.*)`).
 * - {@link "Release"} — variables available in classic release runs (`$(Release.*)`,
 *   plus the release-context value of `$(System.*)` and `$(Agent.*)`).
 * - {@link "Shared"} — variables whose meaning is identical across contexts
 *   (`$(System.AccessToken)`, `$(Agent.OS)`, `TF_BUILD`, …).
 *
 * Most of `Pipeline.*` and `Release.*` is generated from MS Learn markdown
 * (`pnpm sync-vars`); `Shared.*` is hand-curated via
 * {@link "categorization-overrides"} plus the codegen heuristic.
 *
 * @example
 * ```ts
 * import { PreDef, releaseArtifactVar } from '@mauve/azpipe-utils';
 *
 * PreDef.Pipeline.Build.SourceBranch    // '$(Build.SourceBranch)'
 * PreDef.Release.Release.ReleaseId      // '$(Release.ReleaseId)'
 * PreDef.Shared.System.AccessToken      // '$(System.AccessToken)'
 * releaseArtifactVar('web').BuildId     // '$(Release.Artifacts.web.BuildId)'
 * ```
 */

import { Pipeline as GeneratedPipeline } from './pipeline.js';
import { Release as GeneratedRelease } from './release.js';
import { Shared } from './shared.js';
import { releaseArtifactVar, type ReleaseArtifactVars } from './artifacts.js';

/**
 * Combined release namespace: the generated `Release.*` variables plus the
 * `Artifacts(alias)` factory for per-artifact variables. Same shape as
 * `Pipeline` and `Shared` but with an extra callable property.
 */
const Release = { ...GeneratedRelease, Artifacts: releaseArtifactVar } as const;

/** Typed predefined-variable symbols. See module docs for layout. */
export const PreDef = {
  Pipeline: GeneratedPipeline,
  Release,
  Shared,
} as const;

export { releaseArtifactVar, type ReleaseArtifactVars };
export type Pipeline = typeof GeneratedPipeline;
export type ReleaseNS = typeof Release;
export type SharedNS = typeof Shared;
