import type { TaskStep } from '@mauvezero/azpipe';
import type { GatesBlock, GatesOptions, GateStep, WorkflowTask } from '../raw.js';
import { taskStepToWorkflowTask } from '../workflow-task.js';

function isWorkflowTask(v: TaskStep | WorkflowTask): v is WorkflowTask {
  return typeof (v as WorkflowTask).taskId === 'string';
}

export interface GateSpec {
  /** Pre-evaluation stabilization period (minutes). */
  stabilizationTime?: number;
  /** How often gates re-evaluate (minutes). */
  samplingInterval?: number;
  /** Required success window before deployment proceeds (minutes). */
  minimumSuccessDuration?: number;
  /** Hard cap on how long gates may keep the deployment waiting (minutes). */
  timeout?: number;
  /** One or more gate steps (each runs a task). */
  gates: GateStep[];
}

/**
 * Build a single gate step (typed by its underlying task).
 *
 * Accepts either YAML-pipeline {@link "TaskStep"} objects (e.g. from
 * `useNodeV1(...)` in `@mauve/azpipe-tasks`) or pre-built
 * {@link WorkflowTask} objects (e.g. from `calendarGateCheck(...)` in
 * `@mauve/custom`). TaskStep arguments are routed through
 * {@link "taskStepToWorkflowTask"}; WorkflowTask arguments pass through.
 */
export function gate(name: string, ...steps: Array<TaskStep | WorkflowTask>): GateStep {
  return {
    name,
    tasks: steps.map((s) => (isWorkflowTask(s) ? s : taskStepToWorkflowTask(s))),
  };
}

/** Compose a {@link GatesBlock} with options + gate steps. */
export function gates(spec: GateSpec): GatesBlock {
  const options: GatesOptions = {
    isEnabled: true,
    stabilizationTime: spec.stabilizationTime ?? 0,
    samplingInterval: spec.samplingInterval ?? 5,
    minimumSuccessDuration: spec.minimumSuccessDuration ?? 0,
    timeout: spec.timeout ?? 60,
  };
  return { gatesOptions: options, gates: spec.gates };
}
