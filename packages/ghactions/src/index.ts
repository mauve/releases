/**
 * `@mauvezero/ghactions` — typesafe fluent builder for GitHub Actions workflows.
 *
 * Public surface:
 *
 * - {@link workflow} — entry point that returns a fresh {@link WorkflowBuilder}.
 * - {@link WorkflowBuilder}, {@link GHJobBuilder} — fluent builders.
 * - Step factories: {@link run}, {@link uses}.
 * - Serializer: {@link toYaml}, {@link WorkflowSerializeOptions}.
 * - Workflow document types: {@link WorkflowRoot}, {@link WorkflowTriggers},
 *   {@link JobObject}, {@link AnyStep}, {@link UsesStep}, {@link RunStep}, etc.
 *
 * @packageDocumentation
 */

export { workflow, WorkflowBuilder } from './builders/workflow.js';
export { GHJobBuilder, resolveJobId, type GHJobDep } from './builders/job.js';
export { run, uses } from './builders/steps.js';
export { toYaml, type WorkflowSerializeOptions } from './serialize.js';
export * from './types.js';
