import type {
  AnyStep,
  ConcurrencyConfig,
  ContainerConfig,
  DefaultsConfig,
  Environment,
  JobObject,
  Permissions,
  RunDefaults,
  StrategyConfig,
} from '../types.js';

/**
 * Fluent builder for a single GitHub Actions job.
 *
 * Methods mutate internal state and return `this` for chaining. The accumulated
 * state is materialized via {@link GHJobBuilder.toObject}.
 *
 * Usually constructed indirectly via {@link "WorkflowBuilder.job"}.
 *
 * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_id
 *
 * @example
 * ```ts
 * workflow().job('build', j =>
 *   j.runsOn('ubuntu-latest')
 *    .step(uses('actions/checkout@v4'))
 *    .step(run('npm test')));
 * ```
 */
export class GHJobBuilder {
  private readonly state: Partial<JobObject> = {};
  private readonly stepList: AnyStep[] = [];

  /** The job's identifier (the key in the `jobs:` map). Read-only. */
  readonly id: string;

  /** @param id - Job identifier used as the key in `jobs:`. */
  constructor(id: string) {
    this.id = id;
  }

  /**
   * Set the runner label(s) for this job.
   *
   * @param value - A single label string (e.g. `'ubuntu-latest'`) or an array
   *   of labels for more-specific self-hosted runner selection.
   *
   * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idruns-on
   */
  runsOn(value: string | string[]): this {
    this.state['runs-on'] = value;
    return this;
  }

  /** Set the human-readable job name displayed in the Actions UI. */
  name(displayName: string): this {
    this.state.name = displayName;
    return this;
  }

  /**
   * Declare jobs that must succeed before this job starts.
   *
   * Accepts a job identifier (string), another {@link GHJobBuilder} (which
   * contributes its `id`), or an array mixing both.
   *
   * @example
   * ```ts
   * const build = workflow().job('build', ...);
   * workflow.job('test', j => j.needs(build)...);
   * ```
   */
  needs(deps: GHJobDep | GHJobDep[]): this {
    if (Array.isArray(deps)) {
      this.state.needs = deps.map(resolveJobId);
    } else {
      this.state.needs = resolveJobId(deps);
    }
    return this;
  }

  /**
   * Set a conditional expression. The job is skipped when it evaluates to
   * false.
   *
   * Named `if_` because `if` is a TypeScript reserved word.
   *
   * @example
   * ```ts
   * j.if_('github.ref == \'refs/heads/main\'')
   * ```
   */
  if_(expr: string): this {
    this.state.if = expr;
    return this;
  }

  /**
   * Append a single job-level environment variable.
   *
   * @param name - Variable name.
   * @param value - Variable value.
   */
  env(name: string, value: string | number | boolean): this {
    (this.state.env ??= {})[name] = value;
    return this;
  }

  /** Set several job-level environment variables at once. */
  envs(vars: Record<string, string | number | boolean>): this {
    this.state.env = { ...(this.state.env ?? {}), ...vars };
    return this;
  }

  /**
   * Set the deployment environment for this job.
   *
   * @param value - Environment name (string) or an object with `name` and
   *   optional `url`.
   *
   * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idenvironment
   */
  environment(value: Environment): this {
    this.state.environment = value;
    return this;
  }

  /**
   * Set a concurrency group for this job.
   *
   * @param group - Concurrency group expression.
   * @param cancelInProgress - Cancel in-flight runs sharing the same group.
   *
   * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#concurrency
   */
  concurrency(group: string, cancelInProgress?: boolean | string): this {
    const config: ConcurrencyConfig = { group };
    if (cancelInProgress !== undefined) config['cancel-in-progress'] = cancelInProgress;
    this.state.concurrency = config;
    return this;
  }

  /**
   * Set the token permissions for this job.
   *
   * @param perms - `'read-all'`, `'write-all'`, or a fine-grained map.
   */
  permissions(perms: Permissions): this {
    this.state.permissions = perms;
    return this;
  }

  /**
   * Set the job output map. Values are step-output expressions such as
   * `'${{ steps.my-step.outputs.value }}'`.
   *
   * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idoutputs
   */
  outputs(map: Record<string, string>): this {
    this.state.outputs = map;
    return this;
  }

  /**
   * Set the matrix execution strategy.
   *
   * @param config - Strategy configuration with `matrix`, optional `fail-fast`,
   *   and `max-parallel`.
   *
   * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategy
   */
  strategy(config: StrategyConfig): this {
    this.state.strategy = config;
    return this;
  }

  /**
   * Mark the job as soft-fail: the workflow succeeds even if this job fails.
   *
   * @param value - Default `true`.
   */
  continueOnError(value: boolean | string = true): this {
    this.state['continue-on-error'] = value;
    return this;
  }

  /**
   * Set the job-level timeout in minutes.
   *
   * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idtimeout-minutes
   */
  timeoutMinutes(n: number): this {
    this.state['timeout-minutes'] = n;
    return this;
  }

  /**
   * Run the job inside a container.
   *
   * @param config - Image name string or a full {@link ContainerConfig}.
   *
   * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idcontainer
   */
  container(config: string | ContainerConfig): this {
    this.state.container = config;
    return this;
  }

  /**
   * Attach side-car service containers keyed by alias.
   *
   * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idservices
   */
  services(services: Record<string, string | ContainerConfig>): this {
    this.state.services = services;
    return this;
  }

  /**
   * Set default shell and/or working directory for all run steps in this job.
   *
   * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_iddefaults
   */
  defaults(opts: RunDefaults): this {
    this.state.defaults = { run: opts } satisfies DefaultsConfig;
    return this;
  }

  /** Append a single step. */
  step(step: AnyStep): this {
    this.stepList.push(step);
    return this;
  }

  /** Append several steps in order. */
  steps(steps: AnyStep[]): this {
    this.stepList.push(...steps);
    return this;
  }

  /**
   * Materialize the accumulated state into a plain {@link JobObject}. Called by
   * {@link "WorkflowBuilder"} during serialization; consumers usually don't
   * need to invoke this directly.
   */
  toObject(): JobObject {
    const runsOn = this.state['runs-on'];
    if (runsOn === undefined) {
      throw new Error(`Job "${this.id}": .runsOn() is required.`);
    }
    return {
      ...this.state,
      'runs-on': runsOn,
      steps: [...this.stepList],
    };
  }
}

/**
 * A job dependency: either a job identifier string or a {@link GHJobBuilder}
 * whose `id` should be used.
 */
export type GHJobDep = string | GHJobBuilder;

/** Resolve a {@link GHJobDep} to the underlying job identifier. */
export function resolveJobId(dep: GHJobDep): string {
  return typeof dep === 'string' ? dep : dep.id;
}
