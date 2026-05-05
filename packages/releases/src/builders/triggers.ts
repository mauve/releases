import type {
  Artifact,
  ArtifactSourceTrigger,
  ContainerImageTrigger,
  PackageTrigger,
  PullRequestTrigger,
  ScheduleEntry,
  ScheduleTrigger,
  SourceRepoTrigger,
} from '../raw.js';

/**
 * Trigger when a new artifact build becomes available.
 *
 * Pass an {@link Artifact} (returned by `buildArtifact` / `gitArtifact` /
 * `gitHubArtifact`) to bind by reference, or a string alias for the
 * explicit form (useful when composing with `triggerConditions`).
 */
export function artifactSourceTrigger(artifact: Artifact): ArtifactSourceTrigger;
export function artifactSourceTrigger(artifactAlias: string): ArtifactSourceTrigger;
export function artifactSourceTrigger(arg: string | Artifact): ArtifactSourceTrigger {
  const artifactAlias = typeof arg === 'string' ? arg : arg.alias;
  return { triggerType: 'artifactSource', artifactAlias };
}

/** Schedule release at a fixed time (UTC offsets via timeZoneId, e.g. `'UTC'`). */
export function scheduleTrigger(
  schedule: ScheduleEntry & { timeZoneId?: string },
): ScheduleTrigger {
  return {
    triggerType: 'schedule',
    schedule: { timeZoneId: 'UTC', ...schedule },
  };
}

/** Trigger when a source repo branch updates (CI-style). */
export function sourceRepoTrigger(opts: {
  alias?: string;
  branchFilters?: string[];
}): SourceRepoTrigger {
  return { triggerType: 'sourceRepo', ...opts };
}

/** Trigger on pull-request events from a Git/GitHub artifact. */
export function pullRequestTrigger(artifact: Artifact): PullRequestTrigger;
export function pullRequestTrigger(artifactAlias: string): PullRequestTrigger;
export function pullRequestTrigger(arg: string | Artifact): PullRequestTrigger {
  const artifactAlias = typeof arg === 'string' ? arg : arg.alias;
  return { triggerType: 'pullRequest', artifactAlias };
}

/** Trigger on container-image push. */
export function containerImageTrigger(alias: string): ContainerImageTrigger {
  return { triggerType: 'containerImage', alias };
}

/** Trigger on package-feed publish. */
export function packageTrigger(alias: string): PackageTrigger {
  return { triggerType: 'package', alias };
}
