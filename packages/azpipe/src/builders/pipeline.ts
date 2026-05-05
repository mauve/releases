import {
  toYaml as coreToYaml,
  toJson as coreToJson,
  type SerializeOptions,
} from '@mauvezero/azpipe-core';
import type {
  AnyJob,
  AnyStage,
  CITriggerInput,
  PipelineRoot,
  Pool,
  PRTriggerInput,
  Resources,
  ScheduleTrigger,
  Step,
  Variable,
} from '../types.js';
import { StageBuilder } from './stage.js';
import {
  DeploymentJobBuilder,
  JobBuilder,
  materializeJob,
  type AnyJobBuilder,
} from './job.js';
import type { JobInit, DeploymentJobInit } from '../types.js';

/**
 * Fluent builder for the root of an Azure Pipelines YAML document.
 *
 * Methods mutate internal state and return `this` for chaining. The terminal
 * methods are {@link PipelineBuilder.toYaml}, {@link PipelineBuilder.toJson},
 * and {@link PipelineBuilder.toObject}.
 *
 * The pipeline operates in one of three mutually exclusive modes, picked
 * automatically based on which methods you call:
 * - **stages mode** — populated by {@link PipelineBuilder.stage} /
 *   {@link PipelineBuilder.stageTemplate}.
 * - **jobs mode** — populated by {@link PipelineBuilder.job} /
 *   {@link PipelineBuilder.deployment} / {@link PipelineBuilder.jobTemplate}.
 * - **steps mode** (single implicit job) — populated by
 *   {@link PipelineBuilder.step} / {@link PipelineBuilder.steps}.
 *
 * Calling {@link PipelineBuilder.toObject} picks the highest-priority mode
 * with content (stages > jobs > steps).
 *
 * Most users construct a builder via the {@link pipeline} factory function
 * rather than `new PipelineBuilder()`.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema
 *
 * @example
 * ```ts
 * import { pipeline, script } from '@mauvezero/azpipe';
 *
 * export default pipeline()
 *   .name('CI $(Date:yyyyMMdd)')
 *   .trigger(['main'])
 *   .pool({ vmImage: 'ubuntu-latest' })
 *   .stage('Build', s =>
 *     s.job('compile', j => j.step(script('npm run build'))));
 * ```
 */
export class PipelineBuilder {
  private readonly state: PipelineRoot = {};
  private readonly stageBuilders: StageBuilder[] = [];
  private readonly stageRefs: AnyStage[] = [];
  private readonly jobBuilders: AnyJobBuilder[] = [];
  private readonly jobRefs: AnyJob[] = [];
  private readonly stepList: Step[] = [];

  /**
   * Set the run-name format. Supports counters and runtime expressions —
   * e.g. `'CI $(Date:yyyyMMdd).$(Rev:r)'`.
   *
   * @see https://learn.microsoft.com/azure/devops/pipelines/process/run-number
   */
  name(name: string): this {
    this.state.name = name;
    return this;
  }

  /** Append the commit message to the auto-generated run name. */
  appendCommitMessageToRunName(value = true): this {
    this.state.appendCommitMessageToRunName = value;
    return this;
  }

  /**
   * Set the continuous-integration trigger.
   *
   * @param trigger - `'none'` to disable CI, an array of branches as
   *   shorthand, or a full {@link "CITrigger"} object.
   */
  trigger(trigger: CITriggerInput): this {
    this.state.trigger = trigger;
    return this;
  }

  /**
   * Set the pull-request trigger.
   *
   * @param trigger - `'none'`, a list of target branches, or a full
   *   {@link "PRTrigger"} object.
   */
  pr(trigger: PRTriggerInput): this {
    this.state.pr = trigger;
    return this;
  }

  /** Append a scheduled trigger. */
  schedule(schedule: ScheduleTrigger): this {
    (this.state.schedules ??= []).push(schedule);
    return this;
  }

  /** Append several scheduled triggers in order. */
  schedules(schedules: ScheduleTrigger[]): this {
    (this.state.schedules ??= []).push(...schedules);
    return this;
  }

  /** Default agent pool for stages/jobs that don't override it. */
  pool(pool: Pool): this {
    this.state.pool = pool;
    return this;
  }

  /**
   * Append a single inline variable.
   *
   * @param name - Variable name (referenced as `$(name)` in scripts).
   * @param value - Variable value.
   * @param readonly - When true, prevent overrides at queue time.
   */
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

  /**
   * Declare a compile-time pipeline parameter (shown in the run dialog).
   *
   * @param spec - Parameter definition: name + optional type, default, and
   *   allowed values.
   *
   * @see https://learn.microsoft.com/azure/devops/pipelines/process/runtime-parameters
   */
  parameter(spec: { name: string; type?: string; default?: unknown; values?: unknown[] }): this {
    (this.state.parameters ??= []).push(spec);
    return this;
  }

  /** Set the resources block (repositories, pipelines, containers, packages). */
  resources(resources: Resources): this {
    this.state.resources = resources;
    return this;
  }

  /** Concurrency policy when multiple runs reach the pipeline simultaneously. */
  lockBehavior(value: 'sequential' | 'runLatest'): this {
    this.state.lockBehavior = value;
    return this;
  }

  /**
   * Add a stage. Switches the pipeline to **stages mode**.
   *
   * @param name - Stage identifier.
   * @param configure - Fluent configurator for the stage.
   */
  stage(name: string, configure: (s: StageBuilder) => StageBuilder | void): this {
    const s = new StageBuilder(name);
    configure(s);
    this.stageBuilders.push(s);
    return this;
  }

  /**
   * Add a stage-template reference. Switches the pipeline to **stages mode**.
   *
   * @param template - Template path (optionally `path@repository`).
   * @param parameters - Parameters to pass to the template.
   */
  stageTemplate(template: string, parameters?: Record<string, unknown>): this {
    this.stageRefs.push(parameters === undefined ? { template } : { template, parameters });
    return this;
  }

  /**
   * Add a regular job. Switches the pipeline to **jobs mode** unless stages
   * have already been added.
   *
   * Two forms are supported:
   * - `job('name', j => j.step(...))` — fluent configurator.
   * - `job('name', { pool, displayName, ... })` — initial-fields object.
   */
  job(name: string, configure: (j: JobBuilder) => JobBuilder | void): this;
  job(name: string, init?: JobInit): this;
  job(name: string, arg?: JobInit | ((j: JobBuilder) => JobBuilder | void)): this {
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
   * Add a deployment job at the pipeline root.
   *
   * @param name - Deployment-job identifier.
   * @param init - Required environment + optional job-level fields.
   * @param configure - Optional fluent configurator.
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
   * Add a job-template reference at the pipeline root.
   *
   * Two forms are supported:
   * - `jobTemplate('templates/build.yml', { node: '20.x' })` — path + parameters.
   * - `jobTemplate(extend(typedTemplate, { ... }))` — pre-built reference object,
   *   typically from {@link "extend"} in `@mauvezero/azpipe-utils`.
   */
  jobTemplate(template: string, parameters?: Record<string, unknown>): this;
  jobTemplate(ref: { template: string; parameters?: Record<string, unknown> }): this;
  jobTemplate(
    arg: string | { template: string; parameters?: Record<string, unknown> },
    parameters?: Record<string, unknown>,
  ): this {
    if (typeof arg === 'string') {
      this.jobRefs.push(parameters === undefined ? { template: arg } : { template: arg, parameters });
    } else {
      this.jobRefs.push(arg);
    }
    return this;
  }

  /**
   * Add a stage-template reference object. Use this overload when you already
   * have an `{ template, parameters }` value (e.g. from
   * {@link "extend"} in `@mauvezero/azpipe-utils`); for path+parameters
   * call {@link PipelineBuilder.stageTemplate} instead.
   */
  stageTemplateRef(ref: { template: string; parameters?: Record<string, unknown> }): this {
    this.stageRefs.push(ref);
    return this;
  }

  /** Append several pre-built stage objects. Switches to **stages mode**. */
  stages(stages: AnyStage[]): this {
    this.stageRefs.push(...stages);
    return this;
  }

  /** Append several pre-built job objects. Switches to **jobs mode**. */
  jobs(jobs: AnyJob[]): this {
    this.jobRefs.push(...jobs);
    return this;
  }

  /**
   * Append a step at the pipeline root. Switches the pipeline to **steps mode**
   * (single implicit job) unless stages or jobs have already been added.
   */
  step(step: Step): this {
    this.stepList.push(step);
    return this;
  }

  /** Append several steps in order. */
  steps(steps: Step[]): this {
    this.stepList.push(...steps);
    return this;
  }

  /**
   * Set the root-level `extends:` template reference.
   *
   * Note: named `extends_` because `extends` is a TypeScript reserved word
   * for class declarations.
   *
   * @param template - Template file path.
   * @param parameters - Parameters passed to the template.
   *
   * @see https://learn.microsoft.com/azure/devops/pipelines/process/templates#extends
   */
  extends_(template: string, parameters?: Record<string, unknown>): this {
    this.state.extends =
      parameters === undefined ? { template } : { template, parameters };
    return this;
  }

  /**
   * Materialize the accumulated state into a plain {@link "PipelineRoot"}
   * object, ready to be serialized.
   *
   * The pipeline mode (stages vs. jobs vs. steps) is picked here: stages win
   * if any are present, then jobs, then steps. Mixing modes silently drops
   * the lower-priority entries — call {@link PipelineBuilder.toYaml} with
   * `validate: true` (the default) to be alerted via schema validation.
   */
  toObject(): PipelineRoot {
    const out: PipelineRoot = { ...this.state };
    const stages: AnyStage[] = [
      ...this.stageBuilders.map((s) => s.toObject()),
      ...this.stageRefs,
    ];
    const jobs: AnyJob[] = [
      ...this.jobBuilders.map((b) => materializeJob(b)),
      ...this.jobRefs,
    ];
    if (stages.length > 0) out.stages = stages;
    else if (jobs.length > 0) out.jobs = jobs;
    else if (this.stepList.length > 0) out.steps = this.stepList;
    return out;
  }

  /**
   * Serialize to YAML. Validates against the Azure Pipelines schema by
   * default; pass `{ validate: false }` to skip.
   *
   * @throws {@link "PipelineValidationError"} when validation fails.
   */
  toYaml(opts?: SerializeOptions): string {
    return coreToYaml(this.toObject(), opts);
  }

  /**
   * Serialize to JSON (with a trailing newline). Validates by default; pass
   * `{ validate: false }` to skip.
   *
   * @throws {@link "PipelineValidationError"} when validation fails.
   */
  toJson(opts?: SerializeOptions): string {
    return coreToJson(this.toObject(), opts);
  }
}

/**
 * Construct a fresh {@link PipelineBuilder}. Primary entry point of the
 * package — most pipelines start with `pipeline()`.
 *
 * @example
 * ```ts
 * import { pipeline, script } from '@mauvezero/azpipe';
 *
 * export default pipeline()
 *   .pool({ vmImage: 'ubuntu-latest' })
 *   .step(script('echo hello'));
 * ```
 */
export function pipeline(): PipelineBuilder {
  return new PipelineBuilder();
}
