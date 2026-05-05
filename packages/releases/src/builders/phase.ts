import type { TaskStep } from '@mauvezero/azpipe';
import type {
  AgentDeploymentInput,
  DeployPhase,
  ServerPhaseInput,
  WorkflowTask,
} from '../raw.js';
import { applyPoolSpec, type ReleasePoolSpec } from '../pool.js';
import { taskStepToWorkflowTask } from '../workflow-task.js';

/**
 * Fluent builder for an agent-based deploy phase. Phases run on a hosted or
 * private agent and execute a workflowTasks list.
 *
 * Steps are accepted as YAML-pipeline {@link "TaskStep"} objects (use
 * `useNodeV1(...)`, `azureCLIV2(...)`, etc. from `@mauve/azpipe-tasks`)
 * and converted to `workflowTask` shape internally.
 */
export class AgentPhaseBuilder {
  private readonly state: DeployPhase;
  private readonly tasks: WorkflowTask[] = [];
  private readonly input: AgentDeploymentInput = {};

  constructor(rank: number, name = 'Agent job') {
    this.state = {
      rank,
      phaseType: 'agentBasedDeployment',
      name,
      workflowTasks: [],
      deploymentInput: this.input,
    };
  }

  /** Display name for the phase. */
  name(name: string): this {
    this.state.name = name;
    return this;
  }

  /** Reference name (used by other phases / conditions). */
  refName(refName: string): this {
    this.state.refName = refName;
    return this;
  }

  /**
   * Bind the phase to an agent pool / queue.
   *
   * Accepts:
   * - `string` shorthand — queue name (e.g. `'Azure Pipelines'`, `'MyCustomPool'`).
   * - `{ name, demands?, vmImage? }` — queue name plus capability demands and
   *   optional Microsoft-hosted image override (`agentSpecification.identifier`).
   * - `{ vmImage, demands? }` — pin a hosted image; queue defaults to
   *   `'Azure Pipelines'`. Same ergonomics as `pool({ vmImage })` in the YAML
   *   pipeline side.
   * - `{ queueId, demands? }` — numeric queue id (escape hatch).
   *
   * Name-based references are resolved to a numeric `queueId` at push time
   * via the REST client's `listQueues` API; queue names that don't exist
   * surface as a clear error from `azpipe release push`.
   *
   * @example
   * ```ts
   * .pool('Azure Pipelines')                              // hosted, no constraints
   * .pool({ name: 'MyLinuxPool' })                        // private pool
   * .pool({ vmImage: 'ubuntu-22.04' })                    // hosted, pinned image
   * .pool({ vmImage: 'macos-13' })
   * .pool({ name: 'Azure Pipelines', vmImage: 'ubuntu-latest', demands: ['Foo'] })
   * .pool({ queueId: 12 })                                // raw id
   * ```
   */
  pool(spec: ReleasePoolSpec): this {
    applyPoolSpec(this.input, spec);
    return this;
  }

  /**
   * Append capability demands the agent must satisfy. Combines with any
   * demands set via {@link AgentPhaseBuilder.pool}.
   */
  demands(...demands: string[]): this {
    this.input.demands = [...(this.input.demands ?? []), ...demands];
    return this;
  }

  /** Skip the implicit artifacts download at phase start. */
  skipArtifactsDownload(skip = true): this {
    this.input.skipArtifactsDownload = skip;
    return this;
  }

  /** Phase-level wall-clock cap in minutes. */
  timeoutInMinutes(minutes: number): this {
    this.input.timeoutInMinutes = minutes;
    return this;
  }

  /** Allow the running tasks to use the system OAuth access token. */
  enableAccessToken(value = true): this {
    this.input.enableAccessToken = value;
    return this;
  }

  /** Append a single task step. */
  step(step: TaskStep): this {
    this.tasks.push(taskStepToWorkflowTask(step));
    return this;
  }

  /** Append several task steps. */
  steps(steps: TaskStep[]): this {
    for (const s of steps) this.tasks.push(taskStepToWorkflowTask(s));
    return this;
  }

  /** Append a pre-built {@link WorkflowTask} (for custom or marketplace tasks). */
  workflowTask(wt: WorkflowTask): this {
    this.tasks.push(wt);
    return this;
  }

  toObject(): DeployPhase {
    this.state.workflowTasks = this.tasks;
    return this.state;
  }
}

/** Fluent builder for a "run on server" deploy phase (gates, manual intervention). */
export class ServerPhaseBuilder {
  private readonly state: DeployPhase;
  private readonly tasks: WorkflowTask[] = [];
  private readonly input: ServerPhaseInput = {};

  constructor(rank: number, name = 'Agentless job') {
    this.state = {
      rank,
      phaseType: 'runOnServer',
      name,
      workflowTasks: [],
      deploymentInput: this.input,
    };
  }

  name(name: string): this {
    this.state.name = name;
    return this;
  }

  timeoutInMinutes(minutes: number): this {
    this.input.timeoutInMinutes = minutes;
    return this;
  }

  step(step: TaskStep): this {
    this.tasks.push(taskStepToWorkflowTask(step));
    return this;
  }

  workflowTask(wt: WorkflowTask): this {
    this.tasks.push(wt);
    return this;
  }

  toObject(): DeployPhase {
    this.state.workflowTasks = this.tasks;
    return this.state;
  }
}
