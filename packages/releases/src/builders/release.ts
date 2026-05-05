import type {
  Artifact,
  ConfigurationVariableValue,
  ReleaseDefinition,
  ReleaseEnvironmentDefinition,
  ReleaseTrigger,
} from '../raw.js';
import { EnvironmentBuilder } from './environment.js';
import { artifactSourceTrigger } from './triggers.js';

export class MultiplePrimaryArtifactsError extends Error {
  readonly aliases: string[];
  constructor(aliases: string[]) {
    super(
      `Multiple artifacts marked isPrimary:true (${aliases.map((a) => JSON.stringify(a)).join(', ')}). ` +
        `Exactly one artifact may be primary — that one drives the Build.* predefined variables ` +
        `and the default release-name token sources.`,
    );
    this.name = 'MultiplePrimaryArtifactsError';
    this.aliases = aliases;
  }
}

export class UnknownArtifactAliasError extends Error {
  readonly alias: string;
  readonly known: readonly string[];
  constructor(alias: string, known: readonly string[]) {
    super(
      `Trigger references unknown artifact alias ${JSON.stringify(alias)}. ` +
        `Registered aliases: ${known.length === 0 ? '(none)' : known.map((a) => JSON.stringify(a)).join(', ')}. ` +
        `Either add the artifact via .artifact(...) or fix the alias on the trigger.`,
    );
    this.name = 'UnknownArtifactAliasError';
    this.alias = alias;
    this.known = known;
  }
}

function extractTriggerAlias(t: ReleaseTrigger): string | undefined {
  if ('artifactAlias' in t) return t.artifactAlias;
  if ('alias' in t) return t.alias;
  return undefined;
}

export interface ReleasePipelineInit {
  /** Azure DevOps organization name (used by the REST client). */
  org: string;
  /** Project name within the organization. */
  project: string;
  /** Release definition name (also the lookup key for diff/push). */
  name: string;
  /** Folder path; default `'\\'`. */
  path?: string;
  description?: string;
  /** `'Release-$(rev:r)'` and friends. */
  releaseNameFormat?: string;
}

/**
 * Fluent builder for an Azure DevOps Classic Release definition.
 *
 * Output is the {@link ReleaseDefinition} JSON document accepted by
 * `PUT /_apis/release/definitions`. The `org`/`project` fields are local to
 * this builder (used by the REST client) and are *not* serialized into the
 * definition body.
 */
export class ReleasePipelineBuilder {
  private readonly init: ReleasePipelineInit;
  private readonly state: Omit<ReleaseDefinition, 'environments'>;
  private readonly environmentBuilders: EnvironmentBuilder[] = [];
  private readonly rawEnvironments: ReleaseEnvironmentDefinition[] = [];
  private readonly artifactList: Artifact[] = [];
  private readonly triggerList: ReleaseTrigger[] = [];

  constructor(init: ReleasePipelineInit) {
    this.init = init;
    this.state = {
      name: init.name,
      ...(init.path !== undefined ? { path: init.path } : {}),
      ...(init.description !== undefined ? { description: init.description } : {}),
      ...(init.releaseNameFormat !== undefined
        ? { releaseNameFormat: init.releaseNameFormat }
        : {}),
    };
  }

  /** The org this release targets (read by the REST client). */
  get org(): string {
    return this.init.org;
  }

  /** The project this release targets. */
  get project(): string {
    return this.init.project;
  }

  /** The definition name (also serialized into the body). */
  get name(): string {
    return this.init.name;
  }

  /**
   * Append an artifact source for this release definition.
   *
   * Use one of the factories — {@link buildArtifact} (a build pipeline),
   * {@link gitArtifact} (Azure Repos), or {@link gitHubArtifact} (GitHub) —
   * to construct the {@link Artifact}. The factory enforces the right shape
   * for `definitionReference`; constructing an `Artifact` literal by hand is
   * supported but unnecessary for the common cases.
   *
   * The `alias` chosen for an artifact is the lookup key used everywhere
   * else: `artifactSourceTrigger(alias)`, the per-environment artifact
   * download filter, and the `Release.Artifacts.<alias>.*` predefined
   * variables on the release agent. Set `isPrimary: true` on exactly one
   * artifact — that one drives the `Build.*` predefined variables and the
   * default release name token sources.
   *
   * @example
   * const web = buildArtifact({ alias: 'web', definitionId: 100, isPrimary: true });
   * releasePipeline({ org, project, name: 'web-release' })
   *   .artifact(web)
   *   .trigger(web)                        // shorthand for artifactSourceTrigger(web)
   *   // …or with triggerConditions:
   *   // .trigger(artifactSourceTrigger(web))
   */
  artifact(artifact: Artifact): this {
    this.artifactList.push(artifact);
    return this;
  }

  /**
   * Append a trigger.
   *
   * Pass an {@link Artifact} for the common "release on new artifact build"
   * shorthand — equivalent to `.trigger(artifactSourceTrigger(artifact))`.
   * Pass a {@link ReleaseTrigger} (any of the trigger factories) for
   * everything else.
   */
  trigger(trigger: ReleaseTrigger): this;
  trigger(artifact: Artifact): this;
  trigger(arg: ReleaseTrigger | Artifact): this {
    const t: ReleaseTrigger =
      'triggerType' in arg ? arg : artifactSourceTrigger(arg);
    this.triggerList.push(t);
    return this;
  }

  /** Append a global variable. */
  variable(name: string, value: ConfigurationVariableValue | string): this {
    (this.state.variables ??= {})[name] =
      typeof value === 'string' ? { value } : value;
    return this;
  }

  /** Reference global variable groups by ID. */
  variableGroups(...ids: number[]): this {
    this.state.variableGroups = [...(this.state.variableGroups ?? []), ...ids];
    return this;
  }

  /** Add tags shown on the release definition. */
  tags(...tags: string[]): this {
    this.state.tags = [...(this.state.tags ?? []), ...tags];
    return this;
  }

  /**
   * Add an environment.
   *
   * Rank is auto-assigned in declaration order. Environments may chain by
   * adding `environmentTriggers` via the underlying object — typical usage is
   * "prod runs after staging completes" via Azure's UI flow.
   */
  environment(name: string, configure: (e: EnvironmentBuilder) => EnvironmentBuilder | void): this {
    const rank = this.environmentBuilders.length + 1;
    const b = new EnvironmentBuilder(name, rank);
    configure(b);
    this.environmentBuilders.push(b);
    return this;
  }

  /** Append a raw environment object (for shapes the builders don't cover). */
  rawEnvironment(env: ReleaseEnvironmentDefinition): this {
    this.rawEnvironments.push(env);
    return this;
  }

  /** Materialize the accumulated state into a {@link ReleaseDefinition} JSON document. */
  toDefinition(): ReleaseDefinition {
    const primaryAliases = this.artifactList
      .filter((a) => a.isPrimary === true)
      .map((a) => a.alias);
    if (primaryAliases.length > 1) {
      throw new MultiplePrimaryArtifactsError(primaryAliases);
    }

    const knownAliases = new Set(this.artifactList.map((a) => a.alias));
    for (const t of this.triggerList) {
      const alias = extractTriggerAlias(t);
      if (alias !== undefined && !knownAliases.has(alias)) {
        throw new UnknownArtifactAliasError(alias, [...knownAliases]);
      }
    }

    const environments: ReleaseEnvironmentDefinition[] = [
      ...this.environmentBuilders.map((e) => e.toObject()),
      ...this.rawEnvironments,
    ];
    return {
      ...this.state,
      ...(this.artifactList.length > 0 ? { artifacts: this.artifactList } : {}),
      ...(this.triggerList.length > 0 ? { triggers: this.triggerList } : {}),
      environments,
    };
  }
}

/** Construct a fresh {@link ReleasePipelineBuilder}. */
export function releasePipeline(init: ReleasePipelineInit): ReleasePipelineBuilder {
  return new ReleasePipelineBuilder(init);
}
