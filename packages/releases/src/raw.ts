/**
 * Raw types for the Azure DevOps Classic Release REST API.
 *
 * These mirror the JSON shape returned by `GET /_apis/release/definitions/{id}`
 * (api-version 7.1) and accepted by the corresponding PUT. Hand-written from
 * the Microsoft REST reference rather than vendored from `azure-devops-node-api`
 * to keep dependencies minimal.
 *
 * @see https://learn.microsoft.com/rest/api/azure/devops/release/definitions
 */

// --- Identity ---------------------------------------------------------------

export interface IdentityRef {
  /** Display name. */
  displayName?: string;
  /** UPN or email. */
  uniqueName?: string;
  /** Active Directory descriptor. */
  id?: string;
  imageUrl?: string;
  url?: string;
  descriptor?: string;
}

// --- Approvals --------------------------------------------------------------

export interface Approval {
  /** Order within the approval block. */
  rank?: number;
  /** When true this approval auto-approves; used for "no approval" placeholders. */
  isAutomated?: boolean;
  isNotificationOn?: boolean;
  approver?: IdentityRef;
  status?: 'pending' | 'approved' | 'rejected' | 'reassigned' | 'canceled' | 'skipped' | 'undefined';
  comments?: string;
}

export interface ApprovalOptions {
  /** 0 = all approvers required; otherwise N approvals suffice. */
  requiredApproverCount?: number;
  releaseCreatorCanBeApprover?: boolean;
  autoTriggeredAndPreviousEnvironmentApprovedCanBeSkipped?: boolean;
  enforceIdentityRevalidation?: boolean;
  timeoutInMinutes?: number;
  /** When approvals run relative to gates. */
  executionOrder?: 'beforeGates' | 'afterSuccessfulGates' | 'afterGatesAlways';
}

export interface ApprovalsBlock {
  approvals?: Approval[];
  approvalOptions?: ApprovalOptions;
}

// --- Gates ------------------------------------------------------------------

export interface GatesOptions {
  isEnabled?: boolean;
  /** Time before gates start evaluating (minutes). */
  stabilizationTime?: number;
  /** How often gates re-evaluate (minutes). */
  samplingInterval?: number;
  /** Required successful evaluation window (minutes). */
  minimumSuccessDuration?: number;
  /** Maximum time gates may keep the deployment waiting (minutes). */
  timeout?: number;
}

export interface GateStep {
  name?: string;
  tasks?: WorkflowTask[];
}

export interface GatesBlock {
  gatesOptions?: GatesOptions;
  gates?: GateStep[];
}

// --- Workflow tasks ---------------------------------------------------------

export interface WorkflowTask {
  /** Task GUID. */
  taskId: string;
  /** `'major.*'` or full triple. */
  version: string;
  /** Step name within the phase. */
  name?: string;
  /** Reference name used by other tasks to consume outputs. */
  refName?: string;
  enabled?: boolean;
  /** "task" for marketplace tasks; "tool" for built-ins. */
  definitionType?: 'task' | 'tool';
  alwaysRun?: boolean;
  continueOnError?: boolean;
  timeoutInMinutes?: number;
  retryCountOnTaskFailure?: number;
  condition?: string;
  /** "host" or container alias. */
  environment?: Record<string, unknown>;
  inputs?: Record<string, string>;
  overrideInputs?: Record<string, string>;
}

// --- Deploy phases ----------------------------------------------------------

export type DeployPhaseType =
  | 'agentBasedDeployment'
  | 'machineGroupBasedDeployment'
  | 'runOnServer'
  | 'deploymentGates';

export interface AgentDeploymentInput {
  /** Agent queue ID (numeric, server-resolved). */
  queueId?: number;
  /** Agent demands. */
  demands?: string[];
  parallelExecution?: {
    parallelExecutionType?: 'none' | 'multiConfiguration' | 'multiMachine';
    maxNumberOfAgents?: number;
    multipliers?: string;
    continueOnError?: boolean;
  };
  artifactsDownloadInput?: {
    downloadInputs?: Array<Record<string, unknown>>;
  };
  skipArtifactsDownload?: boolean;
  timeoutInMinutes?: number;
  jobCancelTimeoutInMinutes?: number;
  condition?: string;
  enableAccessToken?: boolean;
  /**
   * Pin a specific Microsoft-hosted agent image (e.g. `'ubuntu-22.04'`,
   * `'macos-13'`). Only meaningful on the `'Azure Pipelines'` hosted queue;
   * Azure ignores it for private pools.
   */
  agentSpecification?: { identifier: string };
}

export interface ServerPhaseInput {
  parallelExecution?: AgentDeploymentInput['parallelExecution'];
  timeoutInMinutes?: number;
  jobCancelTimeoutInMinutes?: number;
  condition?: string;
}

export interface DeployPhase {
  rank: number;
  phaseType: DeployPhaseType;
  name?: string;
  refName?: string;
  workflowTasks?: WorkflowTask[];
  deploymentInput?: AgentDeploymentInput | ServerPhaseInput;
}

// --- Environments -----------------------------------------------------------

export interface EnvironmentExecutionPolicy {
  concurrencyCount?: number;
  queueDepthCount?: number;
}

export interface RetentionPolicy {
  daysToKeep?: number;
  releasesToKeep?: number;
  retainBuild?: boolean;
}

export interface EnvironmentTrigger {
  triggerType?: 'undefined' | 'deploymentGroupRedeploy' | 'rollbackRedeploy';
  definitionId?: number;
  releaseDefinitionId?: number;
  environmentId?: number;
}

export interface ReleaseEnvironmentDefinition {
  id?: number;
  name: string;
  rank: number;
  owner?: IdentityRef;
  variables?: Record<string, ConfigurationVariableValue>;
  variableGroups?: number[];
  preDeployApprovals?: ApprovalsBlock;
  postDeployApprovals?: ApprovalsBlock;
  preDeploymentGates?: GatesBlock;
  postDeploymentGates?: GatesBlock;
  deployPhases?: DeployPhase[];
  environmentOptions?: Record<string, unknown>;
  demands?: string[];
  conditions?: EnvironmentCondition[];
  executionPolicy?: EnvironmentExecutionPolicy;
  schedules?: ScheduleEntry[];
  retentionPolicy?: RetentionPolicy;
  properties?: Record<string, unknown>;
  environmentTriggers?: EnvironmentTrigger[];
  badgeUrl?: string;
  currentRelease?: { id?: number; url?: string };
}

export interface EnvironmentCondition {
  name?: string;
  conditionType?: 'event' | 'environmentState' | 'artifact' | 'undefined';
  value?: string;
}

// --- Triggers ---------------------------------------------------------------

export type TriggerType =
  | 'undefined'
  | 'artifactSource'
  | 'schedule'
  | 'sourceRepo'
  | 'containerImage'
  | 'package'
  | 'pullRequest';

export interface ArtifactSourceTrigger {
  triggerType: 'artifactSource';
  artifactAlias: string;
  triggerConditions?: Array<Record<string, unknown>>;
}

export interface ScheduleEntry {
  jobId?: string;
  daysToRelease?: number;
  startHours?: number;
  startMinutes?: number;
  scheduleOnlyWithChanges?: boolean;
  timeZoneId?: string;
}

export interface ScheduleTrigger {
  triggerType: 'schedule';
  schedule: ScheduleEntry;
}

export interface SourceRepoTrigger {
  triggerType: 'sourceRepo';
  alias?: string;
  branchFilters?: string[];
}

export interface PullRequestTrigger {
  triggerType: 'pullRequest';
  artifactAlias: string;
  pullRequestConfiguration?: Record<string, unknown>;
}

export interface ContainerImageTrigger {
  triggerType: 'containerImage';
  alias: string;
}

export interface PackageTrigger {
  triggerType: 'package';
  alias: string;
}

export type ReleaseTrigger =
  | ArtifactSourceTrigger
  | ScheduleTrigger
  | SourceRepoTrigger
  | PullRequestTrigger
  | ContainerImageTrigger
  | PackageTrigger;

// --- Artifacts --------------------------------------------------------------

export type ArtifactType =
  | 'Build'
  | 'Git'
  | 'GitHub'
  | 'Jenkins'
  | 'TFVC'
  | 'Nuget'
  | 'TeamCity'
  | 'AzureContainerRepository'
  | 'PackageManagement'
  | 'Custom';

export interface ArtifactSourceReference {
  /** Display name for the field (e.g. `'project'`, `'definition'`). */
  id?: string;
  /** Resolved value. */
  name?: string;
}

export interface Artifact {
  alias: string;
  type: ArtifactType;
  sourceId?: string;
  isPrimary?: boolean;
  isRetained?: boolean;
  /**
   * Map of source-specific fields (e.g. `project.id`, `definition.id`,
   * `defaultVersionType.id`, `defaultVersionBranch.id`).
   */
  definitionReference: Record<string, ArtifactSourceReference>;
}

// --- Variables --------------------------------------------------------------

export interface ConfigurationVariableValue {
  value?: string;
  isSecret?: boolean;
  allowOverride?: boolean;
}

// --- Top-level definition ---------------------------------------------------

export interface ReleaseDefinitionShallow {
  id: number;
  name: string;
  path?: string;
  revision: number;
  url?: string;
}

export interface ReleaseDefinition {
  id?: number;
  name: string;
  path?: string;
  description?: string;
  /** Server-tracked, returned by GET; required on PUT for optimistic concurrency. */
  revision?: number;
  releaseNameFormat?: string;
  variables?: Record<string, ConfigurationVariableValue>;
  variableGroups?: number[];
  artifacts?: Artifact[];
  triggers?: ReleaseTrigger[];
  environments: ReleaseEnvironmentDefinition[];
  comment?: string;
  tags?: string[];
  source?: 'undefined' | 'restApi' | 'userInterface' | 'ibiza' | 'portalExtensionApi';
  /** Server-managed audit fields. */
  createdBy?: IdentityRef;
  createdOn?: string;
  modifiedBy?: IdentityRef;
  modifiedOn?: string;
  /** Server-supplied URL. */
  url?: string;
  _links?: Record<string, unknown>;
  isDeleted?: boolean;
  properties?: Record<string, unknown>;
  /** Project the definition belongs to. */
  projectReference?: { id?: string; name?: string };
}
