import type {
  ConcurrencyConfig,
  DefaultsConfig,
  JobObject,
  Permissions,
  RunDefaults,
  WorkflowRoot,
  WorkflowTriggers,
} from '../types.js';
import { GHJobBuilder } from './job.js';
import { toYaml, type WorkflowSerializeOptions } from '../serialize.js';

/**
 * Fluent builder for a GitHub Actions workflow document.
 *
 * Methods mutate internal state and return `this` for chaining. The terminal
 * methods are {@link WorkflowBuilder.toYaml}, {@link WorkflowBuilder.toObject}.
 *
 * Most users construct a builder via the {@link workflow} factory function
 * rather than `new WorkflowBuilder()`.
 *
 * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions
 *
 * @example
 * ```ts
 * import { workflow, run, uses } from '@mauvezero/ghactions';
 *
 * export default workflow()
 *   .name('CI')
 *   .on({ push: { branches: ['main'] } })
 *   .job('build', j =>
 *     j.runsOn('ubuntu-latest')
 *      .step(uses('actions/checkout@v4'))
 *      .step(run('npm test')));
 * ```
 */
export class WorkflowBuilder {
  private readonly state: Partial<WorkflowRoot> = {};
  /** Jobs in insertion order. */
  private readonly jobBuilders: Map<string, GHJobBuilder> = new Map();

  /**
   * Set the workflow display name shown in the GitHub Actions UI.
   *
   * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#name
   */
  name(name: string): this {
    this.state.name = name;
    return this;
  }

  /**
   * Set the event trigger(s) for this workflow.
   *
   * @param triggers - An object whose keys are GitHub event names and values
   *   are per-event filter configurations. Pass `{}` for event-only triggers
   *   that carry no filter (e.g. `{ push: {} }`).
   *
   * @example
   * ```ts
   * workflow().on({
   *   push: { branches: ['main'] },
   *   pull_request: { branches: ['main'] },
   *   workflow_dispatch: {},
   * });
   * ```
   *
   * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#on
   */
  on(triggers: WorkflowTriggers): this {
    this.state.on = triggers;
    return this;
  }

  /**
   * Append a single workflow-level environment variable.
   *
   * @param name - Variable name.
   * @param value - Variable value.
   */
  env(name: string, value: string | number | boolean): this {
    (this.state.env ??= {})[name] = value;
    return this;
  }

  /** Set several workflow-level environment variables at once. */
  envs(vars: Record<string, string | number | boolean>): this {
    this.state.env = { ...(this.state.env ?? {}), ...vars };
    return this;
  }

  /**
   * Set a workflow-level concurrency group.
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
   * Set the default token permissions for all jobs.
   *
   * @param perms - `'read-all'`, `'write-all'`, or a fine-grained map.
   *
   * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#permissions
   */
  permissions(perms: Permissions): this {
    this.state.permissions = perms;
    return this;
  }

  /**
   * Set default shell and/or working directory for all run steps.
   *
   * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#defaults
   */
  defaults(opts: RunDefaults): this {
    this.state.defaults = { run: opts } satisfies DefaultsConfig;
    return this;
  }

  /**
   * Add a job to the workflow.
   *
   * @param id - Job identifier (key in the `jobs:` map).
   * @param configure - Fluent configurator for the job.
   *
   * @example
   * ```ts
   * workflow().job('build', j =>
   *   j.runsOn('ubuntu-latest').step(run('npm run build')));
   * ```
   */
  job(id: string, configure: (j: GHJobBuilder) => GHJobBuilder | void): this {
    const b = new GHJobBuilder(id);
    configure(b);
    this.jobBuilders.set(id, b);
    return this;
  }

  /**
   * Materialize the accumulated state into a plain {@link WorkflowRoot} object,
   * ready to be serialized.
   *
   * @throws {Error} when `.on()` or at least one job has not been configured.
   */
  toObject(): WorkflowRoot {
    if (!this.state.on) {
      throw new Error('WorkflowBuilder: .on() must be called before serializing.');
    }
    if (this.jobBuilders.size === 0) {
      throw new Error('WorkflowBuilder: at least one .job() must be added before serializing.');
    }
    const jobs: Record<string, JobObject> = {};
    for (const [id, b] of this.jobBuilders) {
      jobs[id] = b.toObject();
    }
    return { ...this.state, on: this.state.on, jobs };
  }

  /**
   * Serialize to YAML.
   *
   * @example
   * ```ts
   * const yaml = workflow()
   *   .name('CI')
   *   .on({ push: {} })
   *   .job('build', j => j.runsOn('ubuntu-latest').step(run('echo hi')))
   *   .toYaml();
   * ```
   */
  toYaml(opts?: WorkflowSerializeOptions): string {
    return toYaml(this.toObject(), opts);
  }
}

/**
 * Construct a fresh {@link WorkflowBuilder}. Primary entry point of the package.
 *
 * @example
 * ```ts
 * import { workflow, run, uses } from '@mauvezero/ghactions';
 *
 * export default workflow()
 *   .name('CI')
 *   .on({ push: { branches: ['main'] } })
 *   .job('build', j =>
 *     j.runsOn('ubuntu-latest')
 *      .step(uses('actions/checkout@v4'))
 *      .step(run('npm test')));
 * ```
 */
export function workflow(): WorkflowBuilder {
  return new WorkflowBuilder();
}
