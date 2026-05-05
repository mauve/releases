import type { AnyJob, Pool, StageInit, StageObject, Variable } from '../types.js';
import {
  DeploymentJobBuilder,
  JobBuilder,
  materializeJob,
  type AnyJobBuilder,
} from './job.js';
import type { JobInit, DeploymentJobInit } from '../types.js';

/**
 * A stage dependency: either a `stage:` name (string) or a {@link StageBuilder}
 * whose name should be used.
 */
export type StageDep = string | StageBuilder;

/** Resolve a {@link StageDep} to the underlying stage name. */
export function resolveStageName(dep: StageDep): string {
  return typeof dep === 'string' ? dep : dep.name;
}

/**
 * Fluent builder for a `stage:` entry. Methods mutate internal state and
 * return `this` for chaining; the accumulated state is materialized via
 * {@link StageBuilder.toObject}.
 *
 * Usually constructed indirectly via {@link "PipelineBuilder.stage"}.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/stages-stage
 *
 * @example
 * ```ts
 * pipeline().stage('Build', s =>
 *   s.displayName('Build')
 *    .job('compile', j => j.step(script('npm run build'))));
 * ```
 */
export class StageBuilder {
  private readonly state: StageObject;
  private readonly jobBuilders: AnyJobBuilder[] = [];
  private readonly rawJobs: AnyJob[] = [];

  /**
   * @param name - Stage identifier (used as the `stage:` key).
   * @param init - Optional initial fields.
   */
  constructor(name: string, init: StageInit = {}) {
    const { jobs: _jobs, ...rest } = init;
    this.state = { stage: name, ...rest };
    if (init.jobs) this.rawJobs.push(...init.jobs);
  }

  /** The stage's identifier (the `stage:` value). Read-only. */
  get name(): string {
    return this.state.stage;
  }

  /** Set the human-readable display name shown in the run UI. */
  displayName(name: string): this {
    this.state.displayName = name;
    return this;
  }

  /**
   * Declare other stages that must complete before this one starts.
   *
   * Accepts a stage name (string) or another {@link StageBuilder} (which
   * contributes its `name`), or an array mixing both. Passing a single value
   * emits `dependsOn: <name>`; passing an array emits `dependsOn: [a, b]`.
   *
   * @example
   * ```ts
   * pipeline()
   *   .stage('Build', s => s.job('compile', j => j.step(script('npm run build'))))
   *   .stage('Test', s => s.dependsOn(s_build).job(...))
   * ```
   */
  dependsOn(deps: StageDep | StageDep[]): this {
    this.state.dependsOn = Array.isArray(deps)
      ? deps.map(resolveStageName)
      : resolveStageName(deps);
    return this;
  }

  /** Conditional expression. Skips the stage when it evaluates to false. */
  condition(condition: string): this {
    this.state.condition = condition;
    return this;
  }

  /** Default agent pool for jobs in this stage that don't override it. */
  pool(pool: Pool): this {
    this.state.pool = pool;
    return this;
  }

  /** Append a single inline variable. */
  variable(name: string, value: string | number | boolean): this {
    (this.state.variables ??= []).push({ name, value });
    return this;
  }

  /** Append a variable-group reference. */
  variableGroup(group: string): this {
    (this.state.variables ??= []).push({ group });
    return this;
  }

  /** Append several pre-built variables. */
  variables(vars: Variable[]): this {
    (this.state.variables ??= []).push(...vars);
    return this;
  }

  /** Concurrency policy when the stage is reached by multiple in-flight runs. */
  lockBehavior(value: 'sequential' | 'runLatest'): this {
    this.state.lockBehavior = value;
    return this;
  }

  /** `'manual'` requires an approval before the stage runs. */
  trigger(value: 'manual' | 'automatic'): this {
    this.state.trigger = value;
    return this;
  }

  /**
   * Add a regular job to the stage.
   *
   * Two forms are supported:
   * - `job('name', j => j.step(...).step(...))` — fluent configurator.
   * - `job('name', { pool, displayName, ... })` — initial-fields object.
   */
  job(name: string, configure: (j: JobBuilder) => JobBuilder | void): this;
  job(name: string, init?: JobInit): this;
  job(
    name: string,
    arg?: JobInit | ((j: JobBuilder) => JobBuilder | void),
  ): this {
    if (typeof arg === 'function') {
      const b = new JobBuilder(name);
      arg(b);
      this.jobBuilders.push(b);
    } else {
      this.jobBuilders.push(new JobBuilder(name, arg));
    }
    return this;
  }

  /**
   * Add a deployment job to the stage.
   *
   * @param name - Deployment-job identifier.
   * @param init - Required environment + optional job-level fields.
   * @param configure - Optional fluent configurator for additional fields.
   */
  deployment(
    name: string,
    init: DeploymentJobInit,
    configure?: (d: DeploymentJobBuilder) => DeploymentJobBuilder | void,
  ): this {
    const b = new DeploymentJobBuilder(name, init);
    if (configure) configure(b);
    this.jobBuilders.push(b);
    return this;
  }

  /**
   * Add a job-template reference to this stage's `jobs:`.
   *
   * Two forms are supported:
   * - `jobTemplate('templates/build.yml', { node: '20.x' })` — path + parameters.
   * - `jobTemplate(extend(typedTemplate, { ... }))` — pre-built reference object,
   *   typically from {@link "extend"} in `@mauvezero/azpipe-utils`.
   */
  /** Append several pre-built job objects. */
  jobs(jobs: AnyJob[]): this {
    this.rawJobs.push(...jobs);
    return this;
  }

  jobTemplate(template: string, parameters?: Record<string, unknown>): this;
  jobTemplate(ref: { template: string; parameters?: Record<string, unknown> }): this;
  jobTemplate(
    arg: string | { template: string; parameters?: Record<string, unknown> },
    parameters?: Record<string, unknown>,
  ): this {
    if (typeof arg === 'string') {
      this.rawJobs.push(parameters === undefined ? { template: arg } : { template: arg, parameters });
    } else {
      this.rawJobs.push(arg);
    }
    return this;
  }


  /**
   * Materialize the accumulated state into a plain {@link StageObject}.
   * Job builders are resolved to their object form; raw template refs are
   * passed through unchanged.
   */
  toObject(): StageObject {
    const allJobs: AnyJob[] = [
      ...this.jobBuilders.map((b) => materializeJob(b)),
      ...this.rawJobs,
    ];
    if (allJobs.length > 0) this.state.jobs = allJobs;
    return this.state;
  }
}
