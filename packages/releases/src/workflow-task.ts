import type { TaskStep } from '@mauve/azpipe';
import { lookupTaskId } from '@mauve/azpipe-tasks';
import type { WorkflowTask } from './raw.js';

export class UnknownTaskRefError extends Error {
  readonly taskRef: string;
  constructor(taskRef: string) {
    super(
      `Unknown task ref ${JSON.stringify(taskRef)}: no GUID is known for this task. ` +
        `Either it's a custom/marketplace task not in @mauve/azpipe-tasks's catalog, ` +
        `or the catalog is out of date — try \`pnpm sync-tasks\`. ` +
        `If this is a custom task, supply { taskId, version } via taskStepToWorkflowTask(step, { taskId, version }).`,
    );
    this.name = 'UnknownTaskRefError';
    this.taskRef = taskRef;
  }
}

export interface WorkflowTaskOverrides {
  /** GUID for tasks not in the catalog (custom or marketplace). */
  taskId?: string;
  /** Override for `version` (default `'<major>.*'`). */
  version?: string;
}

/**
 * Convert a YAML-pipeline {@link "TaskStep"} (e.g. produced by `useNodeV1(...)`,
 * `azureCLIV2(...)` from `@mauve/azpipe-tasks`) into the release-side
 * {@link WorkflowTask} shape. Looks up the task GUID from the generated
 * task-ids catalog by default; pass overrides for custom tasks.
 *
 * @example
 * ```ts
 * import { useNodeV1 } from '@mauve/azpipe-tasks';
 * const wt = taskStepToWorkflowTask(useNodeV1({ version: '20.x' }));
 * // → { taskId: '...', version: '1.*', enabled: true, inputs: { version: '20.x' }, ... }
 * ```
 */
export function taskStepToWorkflowTask(
  step: TaskStep,
  overrides: WorkflowTaskOverrides = {},
): WorkflowTask {
  const taskRef = step.task;
  let taskId = overrides.taskId;
  let version = overrides.version;

  if (!taskId || !version) {
    const known = lookupTaskId(taskRef);
    if (known) {
      taskId ??= known.id;
      version ??= `${known.major}.*`;
    }
  }
  if (!taskId) throw new UnknownTaskRefError(taskRef);
  if (!version) {
    // taskRef looks like Name@N
    const at = taskRef.lastIndexOf('@');
    const major = at >= 0 ? taskRef.slice(at + 1) : '0';
    version = `${major}.*`;
  }

  // Stringify inputs — release REST expects `Record<string, string>`.
  const inputs: Record<string, string> | undefined = step.inputs
    ? Object.fromEntries(Object.entries(step.inputs).map(([k, v]) => [k, stringify(v)]))
    : undefined;

  const wt: WorkflowTask = {
    taskId,
    version,
    definitionType: 'task',
    enabled: step.enabled ?? true,
  };
  if (step.displayName !== undefined) wt.name = step.displayName;
  if (step.name !== undefined) wt.refName = step.name;
  if (step.condition !== undefined) wt.condition = step.condition;
  if (step.continueOnError !== undefined) wt.continueOnError = step.continueOnError;
  if (step.timeoutInMinutes !== undefined) wt.timeoutInMinutes = step.timeoutInMinutes;
  if (step.retryCountOnTaskFailure !== undefined)
    wt.retryCountOnTaskFailure = step.retryCountOnTaskFailure;
  if (inputs) wt.inputs = inputs;
  return wt;
}

function stringify(v: string | number | boolean): string {
  return typeof v === 'string' ? v : String(v);
}
