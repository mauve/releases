import type { TaskStep } from '@mauve/azpipe';

/** Step-level options shared by every task. Anything except the discriminator
 *  (`task`) and `inputs`. */
export type TaskStepOptions = Omit<TaskStep, 'task' | 'inputs'>;

/** Internal helper used by every generated task function. Folds inputs and
 *  outer options into a single TaskStep, dropping `inputs` if empty so the
 *  emitted YAML stays clean. */
export function makeTask(
  task: string,
  inputs: Record<string, unknown>,
  opts: TaskStepOptions = {},
): TaskStep {
  const hasInputs = Object.keys(inputs).length > 0;
  return hasInputs
    ? ({ task, inputs: inputs as Record<string, string | number | boolean>, ...opts } as TaskStep)
    : ({ task, ...opts } as TaskStep);
}
