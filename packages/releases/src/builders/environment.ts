import type {
  ApprovalsBlock,
  ConfigurationVariableValue,
  DeployPhase,
  EnvironmentCondition,
  GatesBlock,
  RetentionPolicy,
  ReleaseEnvironmentDefinition,
} from '../raw.js';
import { noApproval } from './approvals.js';
import { AgentPhaseBuilder, ServerPhaseBuilder } from './phase.js';

/**
 * Source-environment outcome states that satisfy a `dependsOn` dependency.
 *
 * Azure DevOps encodes these as a bitmask in `EnvironmentCondition.value`.
 * The numeric values are server-defined: 4 = Succeeded, 8 = PartiallySucceeded,
 * 16 = Rejected, 32 = Canceled, 64 = Skipped (rare).
 */
export type EnvironmentOutcome =
  | 'Succeeded'
  | 'PartiallySucceeded'
  | 'Rejected'
  | 'Canceled'
  | 'Skipped';

const OUTCOME_BITS: Record<EnvironmentOutcome, number> = {
  Succeeded: 4,
  PartiallySucceeded: 8,
  Rejected: 16,
  Canceled: 32,
  Skipped: 64,
};

function outcomesToValue(outcomes: readonly EnvironmentOutcome[]): string {
  const mask = outcomes.reduce((acc, o) => acc | OUTCOME_BITS[o], 0);
  return String(mask);
}

/** Either a sibling environment name or another {@link EnvironmentBuilder}. */
export type EnvironmentDep = string | EnvironmentBuilder;

export interface DependsOnOptions {
  /**
   * Source-environment outcomes that should trigger this environment.
   * Default: `['Succeeded']`. Common alternative: `['Succeeded',
   * 'PartiallySucceeded']` to roll forward through known-but-tolerated
   * failures.
   */
  whenStates?: readonly EnvironmentOutcome[];
}

/**
 * Fluent builder for a release environment (a "stage" in classic releases —
 * dev/staging/prod, etc.).
 */
export class EnvironmentBuilder {
  private readonly state: ReleaseEnvironmentDefinition;
  private readonly phaseBuilders: Array<AgentPhaseBuilder | ServerPhaseBuilder> = [];
  private readonly rawPhases: DeployPhase[] = [];

  constructor(name: string, rank: number) {
    this.state = {
      name,
      rank,
      preDeployApprovals: noApproval(),
      postDeployApprovals: noApproval(),
      deployPhases: [],
      retentionPolicy: { daysToKeep: 30, releasesToKeep: 3, retainBuild: true },
    };
  }

  /** This environment's identifier (the `name`). */
  get name(): string {
    return this.state.name;
  }

  /** Override the auto-assigned rank. */
  rank(rank: number): this {
    this.state.rank = rank;
    return this;
  }

  /**
   * Make this environment run after the given source environments reach a
   * matching state.
   *
   * In Azure DevOps Classic Releases, environment dependencies are encoded as
   * `conditions[]` entries with `conditionType: 'environmentState'`, *not* as
   * a `dependsOn` field. This helper builds those entries for you. The
   * default state filter is `Succeeded`; pass `{ whenStates }` to widen it.
   *
   * Sources may be names (`'staging'`) or other {@link EnvironmentBuilder}
   * instances (whose `name` is read at call time).
   *
   * Calling `dependsOn(...)` again appends more conditions — call it once
   * with all sources, or chain multiple times if you want different state
   * filters per source.
   *
   * @example
   * ```ts
   * pipeline
   *   .environment('staging', e => e.agentPhase(...))
   *   .environment('prod', e => e.dependsOn('staging').agentPhase(...));
   *
   * // Multiple sources, all must succeed:
   * .environment('release', e => e.dependsOn('prod-eu', 'prod-us'))
   *
   * // Tolerate partial success:
   * .environment('postcheck', e => e
   *   .dependsOn(['prod'], { whenStates: ['Succeeded', 'PartiallySucceeded'] }))
   * ```
   */
  dependsOn(...sources: EnvironmentDep[]): this;
  dependsOn(sources: EnvironmentDep[], opts: DependsOnOptions): this;
  dependsOn(
    ...args: [EnvironmentDep[], DependsOnOptions] | EnvironmentDep[]
  ): this {
    let sources: EnvironmentDep[];
    let opts: DependsOnOptions;
    if (
      args.length === 2 &&
      Array.isArray(args[0]) &&
      typeof args[1] === 'object' &&
      args[1] !== null &&
      !Array.isArray(args[1]) &&
      !(args[1] instanceof EnvironmentBuilder)
    ) {
      sources = args[0];
      opts = args[1];
    } else {
      sources = args as EnvironmentDep[];
      opts = {};
    }
    const value = outcomesToValue(opts.whenStates ?? ['Succeeded']);
    const list = (this.state.conditions ??= []);
    for (const s of sources) {
      const name = typeof s === 'string' ? s : s.name;
      const condition: EnvironmentCondition = {
        name,
        conditionType: 'environmentState',
        value,
      };
      list.push(condition);
    }
    return this;
  }

  /** Pre-deployment approvals. Call {@link "approval"} or {@link "noApproval"} from `./approvals` to construct. */
  preApproval(block: ApprovalsBlock): this {
    this.state.preDeployApprovals = block;
    return this;
  }

  /** Post-deployment approvals. */
  postApproval(block: ApprovalsBlock): this {
    this.state.postDeployApprovals = block;
    return this;
  }

  /** Pre-deployment gates. Use {@link "gates"} from `./gates` to construct. */
  preGates(block: GatesBlock): this {
    this.state.preDeploymentGates = block;
    return this;
  }

  /** Post-deployment gates. */
  postGates(block: GatesBlock): this {
    this.state.postDeploymentGates = block;
    return this;
  }

  /** Append an inline variable. */
  variable(name: string, value: ConfigurationVariableValue | string): this {
    (this.state.variables ??= {})[name] =
      typeof value === 'string' ? { value } : value;
    return this;
  }

  /** Reference variable groups by ID. */
  variableGroups(...ids: number[]): this {
    this.state.variableGroups = [...(this.state.variableGroups ?? []), ...ids];
    return this;
  }

  /** Retention policy override. */
  retention(policy: RetentionPolicy): this {
    this.state.retentionPolicy = policy;
    return this;
  }

  /**
   * Add an agent-based deploy phase.
   * @param configure Fluent configurator for the phase.
   */
  agentPhase(configure: (p: AgentPhaseBuilder) => AgentPhaseBuilder | void): this {
    const rank = this.phaseBuilders.length + 1;
    const b = new AgentPhaseBuilder(rank);
    configure(b);
    this.phaseBuilders.push(b);
    return this;
  }

  /** Add an "agentless" / run-on-server phase. */
  serverPhase(configure: (p: ServerPhaseBuilder) => ServerPhaseBuilder | void): this {
    const rank = this.phaseBuilders.length + 1;
    const b = new ServerPhaseBuilder(rank);
    configure(b);
    this.phaseBuilders.push(b);
    return this;
  }

  /** Append a raw phase (for shapes the builders don't cover). */
  phase(phase: DeployPhase): this {
    this.rawPhases.push(phase);
    return this;
  }

  toObject(): ReleaseEnvironmentDefinition {
    const allPhases: DeployPhase[] = [
      ...this.phaseBuilders.map((p) => p.toObject()),
      ...this.rawPhases,
    ];
    this.state.deployPhases = allPhases;
    return this.state;
  }
}
