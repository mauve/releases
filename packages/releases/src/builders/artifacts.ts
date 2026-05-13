import { releaseArtifactVar, type ReleaseArtifactVars } from '@mauvezero/azpipe-utils';
import type { Artifact, ArtifactSourceReference } from '../raw.js';

/**
 * An {@link Artifact} returned by one of the artifact factories, carrying its
 * own per-artifact predefined-variable bundle pre-bound to its `alias`.
 *
 * `output` is a non-enumerable getter, so `JSON.stringify(artifact)` produces
 * exactly the wire-format `Artifact` (no leakage into the REST payload).
 */
export interface ReleaseArtifact extends Artifact {
  /** Per-artifact predefined variables (`$(Release.Artifacts.<alias>.*)`). */
  readonly output: ReleaseArtifactVars;
}

function attachOutput<T extends Artifact>(artifact: T): T & { readonly output: ReleaseArtifactVars } {
  Object.defineProperty(artifact, 'output', {
    enumerable: false,
    configurable: false,
    get: () => releaseArtifactVar(artifact.alias),
  });
  return artifact as T & { readonly output: ReleaseArtifactVars };
}

/** Reference a Build pipeline as an artifact source. */
export interface BuildArtifactSpec {
  alias: string;
  /**
   * Build pipeline definition id (numeric). Find it in the URL of the
   * build pipeline: `…/_build?definitionId=N`.
   */
  definitionId: number | string;
  /** Project id (GUID); omit for the same project. */
  projectId?: string;
  /** Default version selector. */
  defaultVersionType?: 'latestType' | 'latestFromBranchType' | 'specificVersionType';
  /** Branch for `latestFromBranchType`. */
  defaultVersionBranch?: string;
  isPrimary?: boolean;
  isRetained?: boolean;
}

/** Reference an Azure Repos Git repo as an artifact source. */
export interface GitArtifactSpec {
  alias: string;
  projectId: string;
  /** Azure Repos repository id (GUID) or repo name. */
  definitionId: string;
  defaultVersionType?: 'latestFromBranchType' | 'specificVersionType';
  defaultVersionBranch?: string;
  isPrimary?: boolean;
  isRetained?: boolean;
}

/** Reference a GitHub repo as an artifact source. */
export interface GitHubArtifactSpec {
  alias: string;
  /** Service connection id. */
  connection: string;
  /** GitHub repo slug, e.g. `'mauve/web'`. */
  definitionId: string;
  defaultVersionType?: 'latestFromBranchType' | 'specificVersionType';
  defaultVersionBranch?: string;
  isPrimary?: boolean;
  isRetained?: boolean;
}

function ref(name: string, id?: string): ArtifactSourceReference {
  return id === undefined ? { name } : { id, name };
}

/**
 * Build artifact (a build pipeline).
 *
 * @example
 * buildArtifact({ alias: 'web', definitionId: 100, isPrimary: true })
 */
export function buildArtifact(spec: BuildArtifactSpec): ReleaseArtifact {
  const defId = String(spec.definitionId);
  const definitionReference: Record<string, ArtifactSourceReference> = {
    definition: ref(defId, defId),
    defaultVersionType: ref(spec.defaultVersionType ?? 'latestType'),
  };
  if (spec.projectId) definitionReference['project'] = ref(spec.projectId, spec.projectId);
  if (spec.defaultVersionBranch)
    definitionReference['defaultVersionBranch'] = ref(spec.defaultVersionBranch);
  return attachOutput({
    alias: spec.alias,
    type: 'Build',
    isPrimary: spec.isPrimary ?? false,
    isRetained: spec.isRetained ?? false,
    definitionReference,
  });
}

/**
 * Azure Repos Git artifact.
 *
 * @example
 * gitArtifact({
 *   alias: 'infra',
 *   projectId: '00000000-0000-0000-0000-000000000000',
 *   definitionId: 'infra-repo',
 *   defaultVersionBranch: 'refs/heads/main',
 * })
 */
export function gitArtifact(spec: GitArtifactSpec): ReleaseArtifact {
  return attachOutput({
    alias: spec.alias,
    type: 'Git',
    isPrimary: spec.isPrimary ?? false,
    isRetained: spec.isRetained ?? false,
    definitionReference: {
      project: ref(spec.projectId),
      definition: ref(spec.definitionId),
      defaultVersionType: ref(spec.defaultVersionType ?? 'latestFromBranchType'),
      ...(spec.defaultVersionBranch
        ? { defaultVersionBranch: ref(spec.defaultVersionBranch) }
        : {}),
    },
  });
}

/**
 * GitHub artifact.
 *
 * @example
 * gitHubArtifact({
 *   alias: 'site',
 *   connection: 'github-neko',
 *   definitionId: 'mauve/web',
 *   defaultVersionBranch: 'refs/heads/main',
 * })
 */
export function gitHubArtifact(spec: GitHubArtifactSpec): ReleaseArtifact {
  return attachOutput({
    alias: spec.alias,
    type: 'GitHub',
    isPrimary: spec.isPrimary ?? false,
    isRetained: spec.isRetained ?? false,
    definitionReference: {
      connection: ref(spec.connection),
      definition: ref(spec.definitionId),
      defaultVersionType: ref(spec.defaultVersionType ?? 'latestFromBranchType'),
      ...(spec.defaultVersionBranch
        ? { defaultVersionBranch: ref(spec.defaultVersionBranch) }
        : {}),
    },
  });
}
