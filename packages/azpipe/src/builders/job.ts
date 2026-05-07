import type {
  AnyJob,
  DeploymentJobInit,
  DeploymentJobObject,
  JobInit,
  JobObject,
  Pool,
  Step,
  Strategy,
  Variable,
} from '../types.js';

/**
 * Fluent builder for a regular `job:` entry inside `stages[].jobs` or top-level
 * `jobs`. Methods mutate internal state and return `this` for chaining; the
 * accumulated state is materialized via {@link JobBuilder.toObject}.
 *
 * Usually constructed indirectly via {@link "StageBuilder.job"} or
 * {@link "PipelineBuilder.job"}.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/jobs-job
 *
 * @example
 * ```ts
 * stage.job('compile', j =>
 *   j.pool({ vmImage: 'ubuntu-latest' })
 *    .step(script('npm ci'))
 *    .step(script('npm run build')));
 * ```
 */
export class JobBuilder {
  private readonly state: JobObject;

  /**
   * @param name - Job identifier (used as the `job:` key). Pass `null` for an
   *   unnamed job, which Azure DevOps accepts as an anonymous single-job stage.
   * @param init - Optional initial fields. Steps are copied into the builder's
   *   internal step list.
   */
  constructor(name: string | null, init: JobInit = {}) {
    this.state = { job: name, steps: init.steps ? [...init.steps] : [], ...init };
    if (this.state.steps === undefined) this.state.steps = [];
  }

  /** The job's identifier (the `job:` value). Read-only. */
  get name(): string | null {
    return this.state.job;
  }

  /** Set the human-readable display name shown in the run UI. */
  displayName(name: string): this {
    this.state.displayName = name;
    return this;
  }

  /** Set the agent pool the job runs on. */
  pool(pool: Pool): this {
    this.state.pool = pool;
    return this;
  }

  /**
   * Declare other jobs that must complete before this one starts.
   *
   * Accepts a job name (string) or another {@link JobBuilder} /
   * {@link DeploymentJobBuilder} (which contributes its `name`), or an array
   * mixing both. Passing a single value emits `dependsOn: <name>`; passing an
   * array emits `dependsOn: [a, b]`.
   *
   * @example
   * ```ts
   * const compile = new JobBuilder('compile');
   * const lint = new JobBuilder('lint');
   * stage.job('test', j => j.dependsOn([compile, lint]).step(script('npm test')));
   * ```
   */
  dependsOn(deps: JobDep | JobDep[]): this {
    this.state.dependsOn = Array.isArray(deps) ? deps.map(resolveJobName) : resolveJobName(deps);
    return this;
  }

  /** Conditional expression. Skips the job when it evaluates to false. */
  condition(condition: string): this {
    this.state.condition = condition;
    return this;
  }

  /** Mark the job as soft-fail. Defaults to `true` if called without an argument. */
  continueOnError(value = true): this {
    this.state.continueOnError = value;
    return this;
  }

  /** Wall-clock cap for the job in minutes. */
  timeoutInMinutes(minutes: number): this {
    this.state.timeoutInMinutes = minutes;
    return this;
  }

  /** Append a single inline variable (name/value pair). */
  variable(name: string, value: string | number | boolean, readonly?: boolean): this {
    (this.state.variables ??= []).push(
      readonly === undefined ? { name, value } : { name, value, readonly },
    );
    return this;
  }

  /** Append a reference to a variable group. */
  variableGroup(group: string): this {
    (this.state.variables ??= []).push({ group });
    return this;
  }

  /** Append several pre-built variables (inline, group, or template refs). */
  variables(vars: Variable[]): this {
    (this.state.variables ??= []).push(...vars);
    return this;
  }

  /** Set the matrix or parallel execution strategy. */
  strategy(strategy: Strategy): this {
    this.state.strategy = strategy;
    return this;
  }

  /** Run the job inside the given container resource alias. */
  container(name: string): this {
    this.state.container = name;
    return this;
  }

  /** Attach side-car services keyed by alias. */
  services(services: Record<string, string>): this {
    this.state.services = services;
    return this;
  }

  /** Append a single step. */
  step(step: Step): this {
    this.state.steps.push(step);
    return this;
  }

  /** Append several steps in order. */
  steps(steps: Step[]): this {
    this.state.steps.push(...steps);
    return this;
  }

  /**
   * Materialize the accumulated state into a plain {@link JobObject}. Called
   * by parent builders during YAML/JSON serialization; consumers usually
   * don't need to invoke this directly.
   */
  toObject(): JobObject {
    return this.state;
  }
}

/**
 * Fluent builder for a `deployment:` job (deployment to an environment).
 *
 * Constructed via {@link "StageBuilder.deployment"} or
 * {@link "PipelineBuilder.deployment"}.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/jobs-deployment
 */
export class DeploymentJobBuilder {
  private readonly state: DeploymentJobObject;

  /**
   * @param name - Deployment job identifier.
   * @param init - Required environment + optional job-level fields.
   */
  constructor(name: string, init: DeploymentJobInit) {
    this.state = { deployment: name, ...init };
  }

  /** The deployment-job's identifier (the `deployment:` value). Read-only. */
  get name(): string {
    return this.state.deployment;
  }

  /** Set the human-readable display name. */
  displayName(name: string): this {
    this.state.displayName = name;
    return this;
  }

  /** Set the agent pool. */
  pool(pool: Pool): this {
    this.state.pool = pool;
    return this;
  }

  /**
   * Declare other jobs (regular or deployment) that must complete before this
   * one starts. Accepts names, builder references, or a mixed array. See
   * {@link JobBuilder.dependsOn} for the exact behaviour.
   */
  dependsOn(deps: JobDep | JobDep[]): this {
    this.state.dependsOn = Array.isArray(deps) ? deps.map(resolveJobName) : resolveJobName(deps);
    return this;
  }

  /** Conditional expression. */
  condition(condition: string): this {
    this.state.condition = condition;
    return this;
  }

  /** Append an inline variable. */
  variable(name: string, value: string | number | boolean): this {
    (this.state.variables ??= []).push({ name, value });
    return this;
  }

  /** Append a variable-group reference. */
  variableGroup(group: string): this {
    (this.state.variables ??= []).push({ group });
    return this;
  }

  /**
   * Configure the job as a `runOnce` deployment with the given deploy steps.
   * For canary or rolling strategies, set `strategy` directly via the init
   * object passed to the constructor.
   */
  runOnce(steps: Step[]): this {
    this.state.strategy = { runOnce: { deploy: { steps } } };
    return this;
  }

  /** Materialize the accumulated state into a plain {@link DeploymentJobObject}. */
  toObject(): DeploymentJobObject {
    return this.state;
  }
}

/**
 * A job dependency: either a `job:`/`deployment:` name (string) or a job
 * builder whose name should be used.
 */
export type JobDep = string | JobBuilder | DeploymentJobBuilder;

/** Resolve a {@link JobDep} to the underlying job name. */
export function resolveJobName(dep: JobDep): string {
  return typeof dep === 'string' ? dep : dep.name;
}

/** Type guard: is `x` a {@link JobBuilder} instance? */
export function isJobBuilder(x: unknown): x is JobBuilder {
  return x instanceof JobBuilder;
}

/** Type guard: is `x` a {@link DeploymentJobBuilder} instance? */
export function isDeploymentJobBuilder(x: unknown): x is DeploymentJobBuilder {
  return x instanceof DeploymentJobBuilder;
}

/** Either a {@link JobBuilder} or a {@link DeploymentJobBuilder}. */
export type AnyJobBuilder = JobBuilder | DeploymentJobBuilder;

/**
 * Resolve a builder or plain job object into a serializable {@link AnyJob}.
 *
 * Used internally by {@link "StageBuilder"} and {@link "PipelineBuilder"} to
 * collect heterogeneous job inputs into a uniform array. Consumers building
 * derived packages may also call this when assembling jobs programmatically.
 */
export function materializeJob(
  j: AnyJobBuilder | AnyJob,
): AnyJob {
  if (isJobBuilder(j) || isDeploymentJobBuilder(j)) return j.toObject();
  return j;
}
