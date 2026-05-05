/**
 * Hand-curated, ergonomic types layered on top of the generated Azure Pipelines
 * schema. These intentionally simplify some of the more painful unions while
 * still serializing to a schema-valid pipeline.
 *
 * Every type here corresponds to a concept in the Azure Pipelines YAML
 * reference. Field names match the YAML keys exactly so that an object built
 * from these types can be serialized without further translation.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema
 */

/**
 * Concrete pool specification (the object form of {@link Pool}).
 *
 * Use the bare-string form for named pools with no further configuration; use
 * this object form for hosted images, demands, or named pools with demands.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/pool
 */
export interface PoolSpec {
  /** Name of a private agent pool. Mutually exclusive with `vmImage`. */
  name?: string;
  /** Name of a Microsoft-hosted VM image, e.g. `'ubuntu-latest'`. */
  vmImage?: string;
  /** Capability demands the agent must satisfy. String for a single demand,
   *  or an array for multiple. */
  demands?: string | string[];
}

/**
 * A pool reference. Either a pool name (`'my-pool'`) or a {@link PoolSpec}
 * with image / demands / etc.
 */
export type Pool = string | PoolSpec;

/**
 * Branch include / exclude filter used by triggers.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/trigger#branchfilters
 */
export interface BranchFilter {
  /** Branches to include. Wildcards are allowed (e.g. `'release/*'`). */
  include?: string[];
  /** Branches to exclude. Evaluated after `include`. */
  exclude?: string[];
}

/**
 * Path include / exclude filter used by triggers. Identical shape to
 * {@link BranchFilter} but applies to repository paths.
 */
export interface PathFilter {
  include?: string[];
  exclude?: string[];
}

/**
 * Continuous-integration trigger object form. Use {@link CITriggerInput} for
 * all the shapes Azure accepts (string-shorthand, array of branches, or this
 * full object).
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/trigger
 */
export interface CITrigger {
  /** Batch incoming changes per branch and run them serially. */
  batch?: boolean;
  branches?: BranchFilter;
  paths?: PathFilter;
  tags?: BranchFilter;
}

/**
 * All forms a CI trigger may take in YAML:
 * - `'none'` — disable CI triggers entirely.
 * - `string[]` — shorthand for `{ branches: { include: [...] } }`.
 * - {@link CITrigger} — full configuration with batching, paths, tags.
 */
export type CITriggerInput = 'none' | string[] | CITrigger;

/**
 * Pull-request trigger object form.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/pr
 */
export interface PRTrigger {
  /** Cancel in-flight runs when a new commit lands on the PR. Defaults to true on Azure DevOps. */
  autoCancel?: boolean;
  branches?: BranchFilter;
  paths?: PathFilter;
  /** Whether to run the pipeline for draft PRs. */
  drafts?: boolean;
}

/**
 * All forms a PR trigger may take: `'none'`, a list of branches, or a full
 * {@link PRTrigger}.
 */
export type PRTriggerInput = 'none' | string[] | PRTrigger;

/**
 * Scheduled trigger entry — one cron expression, optionally restricted to
 * specific branches.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/schedules-cron
 */
export interface ScheduleTrigger {
  /** Cron expression in UTC, e.g. `'0 0 * * *'` for daily at midnight. */
  cron: string;
  /** Human-readable name shown in the schedule list. */
  displayName?: string;
  /** Branches the schedule fires for. */
  branches?: BranchFilter;
  /** Run even if the source has not changed since the last scheduled run. */
  always?: boolean;
  /** Batch incoming runs across the schedule. */
  batch?: boolean;
}

// ---------- Steps ----------

/**
 * Inline cross-platform script step. On Windows the script runs with `cmd.exe`,
 * on Linux/macOS with the default shell.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-script
 */
export interface ScriptStep {
  /** Script body to execute. May be multi-line. */
  script: string;
  displayName?: string;
  /** Step identifier; later steps may consume its outputs via `$(name.var)`. */
  name?: string;
  workingDirectory?: string;
  /** Mark the step failed if anything is written to stderr. */
  failOnStderr?: boolean;
  /** Environment variables exposed to the script process. */
  env?: Record<string, string>;
  /** Conditional expression. Skips the step when it evaluates to false. */
  condition?: string;
  continueOnError?: boolean;
  enabled?: boolean;
  timeoutInMinutes?: number;
  retryCountOnTaskFailure?: number;
  /** Where the step runs (host vs. job container). */
  target?: string | { container?: string; commands?: string };
}

/**
 * Bash script step. Runs in `bash` on all platforms (requires WSL or Git Bash
 * on Windows agents that don't ship it natively).
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-bash
 */
export interface BashStep {
  bash: string;
  displayName?: string;
  name?: string;
  workingDirectory?: string;
  failOnStderr?: boolean;
  /** Skip loading `~/.profile` and friends. */
  noProfile?: boolean;
  /** Skip loading `~/.bashrc`. */
  noRc?: boolean;
  env?: Record<string, string>;
  condition?: string;
  continueOnError?: boolean;
  enabled?: boolean;
  timeoutInMinutes?: number;
  retryCountOnTaskFailure?: number;
  target?: string | { container?: string; commands?: string };
}

/**
 * PowerShell Core (`pwsh`) script step. Runs cross-platform.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-pwsh
 */
export interface PwshStep {
  pwsh: string;
  displayName?: string;
  name?: string;
  workingDirectory?: string;
  /** PowerShell `$ErrorActionPreference` value injected before the script body. */
  errorActionPreference?: 'stop' | 'continue' | 'silentlyContinue';
  failOnStderr?: boolean;
  /** Don't propagate `$LASTEXITCODE` from the last invocation. */
  ignoreLASTEXITCODE?: boolean;
  env?: Record<string, string>;
  condition?: string;
  continueOnError?: boolean;
  enabled?: boolean;
  timeoutInMinutes?: number;
  retryCountOnTaskFailure?: number;
}

/**
 * Windows PowerShell (`powershell.exe`) script step. Windows-only.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-powershell
 */
export interface PowerShellStep {
  powershell: string;
  displayName?: string;
  name?: string;
  workingDirectory?: string;
  errorActionPreference?: 'stop' | 'continue' | 'silentlyContinue';
  failOnStderr?: boolean;
  ignoreLASTEXITCODE?: boolean;
  env?: Record<string, string>;
  condition?: string;
  continueOnError?: boolean;
  enabled?: boolean;
  timeoutInMinutes?: number;
  retryCountOnTaskFailure?: number;
}

/**
 * Source-checkout step. Most pipelines run an implicit `checkout: self` first;
 * use this to override that or to fetch additional repository resources.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-checkout
 */
export interface CheckoutStep {
  /** `'self'` for the triggering repo, `'none'` to skip checkout, or a repository resource alias. */
  checkout: 'self' | 'none' | string;
  displayName?: string;
  /** Whether to clean the working directory before fetching. */
  clean?: boolean | string;
  /** Shallow clone depth. `0` means full history. */
  fetchDepth?: number;
  fetchTags?: boolean;
  lfs?: boolean | string;
  persistCredentials?: boolean | string;
  submodules?: boolean | 'recursive' | 'true' | 'false';
  /** Path under `$(Pipeline.Workspace)` where the repo is checked out. */
  path?: string;
  condition?: string;
  enabled?: boolean;
}

/**
 * Pipeline-artifact download step.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-download
 */
export interface DownloadStep {
  /** `'current'` for the running pipeline, `'none'` to skip auto-download, or a pipeline resource alias. */
  download: 'current' | 'none' | string;
  /** Specific artifact name; omit to download all. */
  artifact?: string;
  /** Glob pattern to filter artifact contents. */
  patterns?: string;
  displayName?: string;
  condition?: string;
  enabled?: boolean;
}

/**
 * Pipeline-artifact publish step.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-publish
 */
export interface PublishStep {
  /** Path on the agent to publish. */
  publish: string;
  /** Artifact name. */
  artifact?: string;
  displayName?: string;
  condition?: string;
  enabled?: boolean;
}

/**
 * Reference to a marketplace task. Prefer the typed helpers in
 * `@mauve/azpipe-tasks` over building this object directly; they enforce
 * the input shape per task.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/steps-task
 */
export interface TaskStep {
  /** Task identifier in `Name@Major` form, e.g. `'AzureCLI@2'`. */
  task: string;
  displayName?: string;
  name?: string;
  /** Task-specific input map. */
  inputs?: Record<string, string | number | boolean>;
  env?: Record<string, string>;
  condition?: string;
  continueOnError?: boolean;
  enabled?: boolean;
  timeoutInMinutes?: number;
  retryCountOnTaskFailure?: number;
}

/**
 * Reference to a step template defined in another YAML file. Used to inject a
 * shared step list without duplication.
 */
export interface StepTemplateRef {
  /** Path to the template file, optionally suffixed with `@repository`. */
  template: string;
  /** Parameter values to pass to the template. */
  parameters?: Record<string, unknown>;
}

/**
 * Discriminated union of every step kind. Each variant is identified by the
 * "kind" key it carries (`script`, `bash`, `task`, `template`, etc.).
 */
export type Step =
  | ScriptStep
  | BashStep
  | PwshStep
  | PowerShellStep
  | CheckoutStep
  | DownloadStep
  | PublishStep
  | TaskStep
  | StepTemplateRef;

/**
 * One entry in a `variables:` list. Variables are either inline (name/value),
 * a reference to a variable group, or a reference to a variable template.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/variables
 */
export type Variable =
  | { name: string; value: string | number | boolean; readonly?: boolean }
  | { group: string }
  | { template: string; parameters?: Record<string, unknown> };

/**
 * Matrix execution strategy: run a job multiple times with different variable
 * sets.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/jobs-job-strategy
 */
export interface MatrixStrategy {
  /** Map from leg name to the variables for that leg. May also be a runtime
   *  expression string that produces such a map. */
  matrix: Record<string, Record<string, string | number | boolean>> | string;
  /** Cap on concurrent legs. Omit to let Azure pick. */
  maxParallel?: number;
}

/** Run a job N times in parallel without per-leg variables. */
export interface ParallelStrategy {
  parallel: number;
}

/** Job execution strategy: matrix or parallel. */
export type Strategy = MatrixStrategy | ParallelStrategy;

/**
 * External Git repository made available to the pipeline.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/resources-repositories-repository
 */
export interface RepositoryResource {
  /** Local alias used in `checkout:` references. */
  repository: string;
  type?: 'git' | 'github' | 'githubenterprise' | 'bitbucket';
  /** Repository name in `org/repo` form. */
  name?: string;
  /** Branch, tag, or commit. */
  ref?: string;
  /** Service-connection name for non-public providers. */
  endpoint?: string;
  trigger?: CITriggerInput;
}

/**
 * Reference to another pipeline as an artifact source / trigger.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/resources-pipelines-pipeline
 */
export interface PipelineResource {
  /** Local alias. */
  pipeline: string;
  /** Source pipeline name. */
  source?: string;
  project?: string;
  version?: string;
  branch?: string;
  tags?: string[];
  trigger?: { branches?: BranchFilter; tags?: string[]; stages?: string[] } | true;
}

/**
 * Container resource (image) usable by jobs via `container:` or `services:`.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/resources-containers-container
 */
export interface ContainerResource {
  /** Local alias. */
  container: string;
  /** Image reference. */
  image: string;
  /** `'ACR'` for Azure Container Registry, or other provider name. */
  type?: 'ACR' | string;
  endpoint?: string;
  options?: string;
  env?: Record<string, string>;
  ports?: string[];
  volumes?: string[];
}

/**
 * Package-feed resource (npm, NuGet, PyPI, Maven).
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/resources-packages-package
 */
export interface PackageResource {
  /** Local alias. */
  package: string;
  type: 'npm' | 'nuget' | 'pypi' | 'maven';
  /** Service-connection name. */
  connection: string;
  name: string;
  version?: string;
  tag?: string;
  trigger?: 'true' | 'none';
}

/**
 * Aggregate resources block. Each sub-list declares external references the
 * pipeline can depend on.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/resources
 */
export interface Resources {
  repositories?: RepositoryResource[];
  pipelines?: PipelineResource[];
  containers?: ContainerResource[];
  packages?: PackageResource[];
}

/**
 * Constructor / fluent-init shape for a regular {@link JobObject job}.
 * All fields are optional; the job name is supplied separately.
 */
export interface JobInit {
  pool?: Pool;
  displayName?: string;
  /** Names of jobs that must complete before this one starts. */
  dependsOn?: string | string[];
  condition?: string;
  continueOnError?: boolean;
  /** Wall-clock cap for the job. */
  timeoutInMinutes?: number;
  /** Wall-clock cap for the job's cancellation phase (post-cancel cleanup). */
  cancelTimeoutInMinutes?: number;
  variables?: Variable[];
  strategy?: Strategy;
  /** Workspace clean policy. */
  workspace?: { clean?: 'outputs' | 'resources' | 'all' };
  /** Container resource alias to run the job inside. */
  container?: string;
  /** Side-car services keyed by alias. */
  services?: Record<string, string>;
  steps?: Step[];
}

/**
 * Materialized regular job: a {@link JobInit} plus the required `job` name and
 * non-optional `steps` list. This is what gets serialized into YAML.
 */
export interface JobObject extends JobInit {
  job: string;
  steps: Step[];
}

/**
 * Deployment-job rollout strategy. Deployment jobs always declare exactly one
 * of `runOnce`, `canary`, or `rolling`.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/jobs-deployment-strategy
 */
export type DeploymentStrategy =
  | {
      runOnce: {
        deploy?: { steps: Step[] };
        preDeploy?: { steps: Step[] };
        postRouteTraffic?: { steps: Step[] };
        on?: { failure?: { steps: Step[] }; success?: { steps: Step[] } };
      };
    }
  | { canary: Record<string, unknown> }
  | { rolling: Record<string, unknown> };

/**
 * Constructor / fluent-init shape for a {@link DeploymentJobObject}. Inherits
 * all of {@link JobInit} (minus `strategy`, which is replaced by
 * {@link DeploymentStrategy}) and adds the required `environment`.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema/jobs-deployment
 */
export interface DeploymentJobInit extends Omit<JobInit, 'strategy'> {
  /** Target environment name, or an environment object with a resource selector. */
  environment: string | { name: string; resourceType?: string; resourceName?: string };
  strategy?: DeploymentStrategy;
}

/** Materialized deployment job: a {@link DeploymentJobInit} plus the required
 *  `deployment` name. */
export interface DeploymentJobObject extends DeploymentJobInit {
  deployment: string;
}

/**
 * Anything that can appear in a `jobs:` array — a regular job, a deployment
 * job, or a job-template reference.
 */
export type AnyJob = JobObject | DeploymentJobObject | { template: string; parameters?: Record<string, unknown> };

/**
 * Constructor / fluent-init shape for a {@link StageObject}.
 */
export interface StageInit {
  displayName?: string;
  /** Stages that must complete before this one starts. */
  dependsOn?: string | string[];
  condition?: string;
  variables?: Variable[];
  pool?: Pool;
  jobs?: AnyJob[];
  /** Concurrency policy when the stage is reached by multiple runs. */
  lockBehavior?: 'sequential' | 'runLatest';
  /** `'manual'` requires human approval before the stage runs. */
  trigger?: 'manual' | 'automatic';
  /** Whether the stage may be skipped from the run UI. */
  isSkippable?: boolean;
}

/** Materialized stage: a {@link StageInit} plus the required `stage` name. */
export interface StageObject extends StageInit {
  stage: string;
}

/** Anything that can appear in a `stages:` array — a regular stage or a
 *  stage-template reference. */
export type AnyStage = StageObject | { template: string; parameters?: Record<string, unknown> };

/**
 * Top-level pipeline document shape. This is what serializes to the root of
 * `azure-pipelines.yml`. Use {@link "PipelineBuilder"} for the fluent API
 * rather than constructing this object literal manually.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/yaml-schema
 */
export interface PipelineRoot {
  /** Run name format. Supports counters and runtime expressions. */
  name?: string;
  appendCommitMessageToRunName?: boolean;
  trigger?: CITriggerInput;
  pr?: PRTriggerInput;
  schedules?: ScheduleTrigger[];
  pool?: Pool;
  variables?: Variable[];
  /** Compile-time parameters shown in the run dialog. */
  parameters?: Array<{ name: string; type?: string; default?: unknown; values?: unknown[] }>;
  resources?: Resources;
  lockBehavior?: 'sequential' | 'runLatest';
  /** Stages-mode pipeline. Mutually exclusive with `jobs`/`steps`. */
  stages?: AnyStage[];
  /** Jobs-mode pipeline. Mutually exclusive with `stages`/`steps`. */
  jobs?: AnyJob[];
  /** Single-job pipeline (steps only). Mutually exclusive with `stages`/`jobs`. */
  steps?: Step[];
  /** Reference to a pipeline template — replaces the stages/jobs/steps body. */
  extends?: { template: string; parameters?: Record<string, unknown> };
}
