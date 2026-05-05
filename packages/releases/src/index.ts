/**
 * `@mauve/azpipe-releases` — typesafe builders for Azure DevOps Classic
 * Release definitions.
 *
 * The output of {@link ReleasePipelineBuilder.toDefinition} is the JSON
 * document accepted by `PUT /_apis/release/definitions`. To talk to the REST
 * API (get, diff, push), use `@mauve/azpipe-releases-client`.
 *
 * Marketplace tasks from `@mauve/azpipe-tasks` (e.g. `useNodeV1`,
 * `azureCLIV2`) are accepted directly via {@link AgentPhaseBuilder.step} —
 * they're translated to the release-side `workflowTask` shape using
 * {@link taskStepToWorkflowTask}.
 *
 * @packageDocumentation
 */

export * from './raw.js';
export {
  applyPoolSpec,
  clearUnresolvedQueue,
  markUnresolvedQueue,
  readUnresolvedQueue,
  HOSTED_QUEUE_NAME,
  UNRESOLVED_QUEUE,
  type HostedVmImage,
  type ReleasePoolByName,
  type ReleasePoolById,
  type ReleasePoolByVmImage,
  type ReleasePoolSpec,
  type UnresolvedQueueRef,
} from './pool.js';
export {
  ReleasePipelineBuilder,
  releasePipeline,
  MultiplePrimaryArtifactsError,
  UnknownArtifactAliasError,
  type ReleasePipelineInit,
} from './builders/release.js';
export {
  EnvironmentBuilder,
  type DependsOnOptions,
  type EnvironmentDep,
  type EnvironmentOutcome,
} from './builders/environment.js';
export { AgentPhaseBuilder, ServerPhaseBuilder } from './builders/phase.js';
export { approval, noApproval, type ApprovalSpec } from './builders/approvals.js';
export { gate, gates, type GateSpec } from './builders/gates.js';
export {
  buildArtifact,
  gitArtifact,
  gitHubArtifact,
  type BuildArtifactSpec,
  type GitArtifactSpec,
  type GitHubArtifactSpec,
  type ReleaseArtifact,
} from './builders/artifacts.js';
export {
  releaseArtifactVar,
  type ReleaseArtifactVars,
} from '@mauvezero/azpipe-utils';
export {
  artifactSourceTrigger,
  scheduleTrigger,
  sourceRepoTrigger,
  pullRequestTrigger,
  containerImageTrigger,
  packageTrigger,
} from './builders/triggers.js';
export {
  taskStepToWorkflowTask,
  UnknownTaskRefError,
  type WorkflowTaskOverrides,
} from './workflow-task.js';
