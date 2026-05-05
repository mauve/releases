/**
 * Custom *agent* tasks contributed by Mauve-internal Azure DevOps
 * extensions. Empty for now — add typed factories here when we ship more.
 *
 * Each task helper should return a {@link "TaskStep"} (from `@mauvezero/azpipe`)
 * so it composes with the existing pipeline + release builders. If the task
 * isn't part of the public catalog known to `@mauvezero/azpipe-tasks`,
 * release-side consumers must call `taskStepToWorkflowTask(step, { taskId, version })`
 * with overrides.
 */
export { };
