/**
 * `@mauvezero/azpipe` — typesafe fluent builder for Azure Pipelines.
 *
 * Public surface:
 *
 * - {@link pipeline} — entry point that returns a fresh {@link PipelineBuilder}.
 * - {@link PipelineBuilder}, {@link StageBuilder}, {@link JobBuilder},
 *   {@link DeploymentJobBuilder} — fluent builders for each level of the YAML
 *   document.
 * - Step factories: {@link script}, {@link bash}, {@link pwsh},
 *   {@link powershell}, {@link checkout}, {@link download}, {@link publish},
 *   {@link task}, {@link stepTemplate}.
 * - Pipeline document types (re-exported from `./types`): {@link PipelineRoot},
 *   {@link Step}, {@link Variable}, {@link Pool}, {@link Resources}, etc.
 * - Validator + serializer (re-exported from `@mauvezero/azpipe-core`):
 *   {@link validatePipeline}, {@link toYaml}, {@link toJson},
 *   {@link PipelineValidationError}.
 *
 * For typed marketplace-task helpers (`azureCLIV2(...)`, `useNodeV1(...)`),
 * see `@mauvezero/azpipe-tasks`.
 *
 * For `defineTemplate` / `extend` helpers used to build derived packages with
 * typed templates, see `@mauvezero/azpipe-utils`.
 *
 * @packageDocumentation
 */

export { pipeline, PipelineBuilder } from './builders/pipeline.js';
export { StageBuilder, resolveStageName, type StageDep } from './builders/stage.js';
export {
  JobBuilder,
  DeploymentJobBuilder,
  isJobBuilder,
  isDeploymentJobBuilder,
  materializeJob,
  resolveJobName,
  type AnyJobBuilder,
  type JobDep,
} from './builders/job.js';
export {
  script,
  bash,
  pwsh,
  powershell,
  checkout,
  download,
  publish,
  task,
  stepTemplate,
} from './builders/steps.js';
export * from './types.js';
export {
  validatePipeline,
  PipelineValidationError,
  toYaml,
  toJson,
  type SerializeOptions,
  type ValidationResult,
} from '@mauvezero/azpipe-core';
