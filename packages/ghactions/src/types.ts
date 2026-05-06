/**
 * Hand-authored TypeScript types for GitHub Actions workflow YAML.
 *
 * Internal field names match the YAML keys exactly (kebab-case where the GHA
 * spec uses kebab-case) so that objects built from these types serialize
 * directly without any key transformation.
 *
 * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions
 */

// ---------- Permissions ----------

/** GitHub token permission level for a single scope. */
export type PermissionLevel = 'read' | 'write' | 'none';

/**
 * Fine-grained permissions for the `GITHUB_TOKEN`.
 *
 * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#permissions
 */
export interface PermissionsMap {
  actions?: PermissionLevel;
  attestations?: PermissionLevel;
  checks?: PermissionLevel;
  contents?: PermissionLevel;
  deployments?: PermissionLevel;
  'id-token'?: PermissionLevel;
  issues?: PermissionLevel;
  discussions?: PermissionLevel;
  packages?: PermissionLevel;
  pages?: PermissionLevel;
  'pull-requests'?: PermissionLevel;
  'repository-projects'?: PermissionLevel;
  'security-events'?: PermissionLevel;
  statuses?: PermissionLevel;
}

/** Permission grant: either a blanket level or fine-grained per-scope map. */
export type Permissions = 'read-all' | 'write-all' | PermissionsMap;

// ---------- Concurrency ----------

/**
 * Concurrency configuration: cancels in-flight runs sharing the same group.
 *
 * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#concurrency
 */
export interface ConcurrencyConfig {
  group: string;
  'cancel-in-progress'?: boolean | string;
}

/** Concurrency value: either a group string or a full config object. */
export type Concurrency = string | ConcurrencyConfig;

// ---------- Triggers ----------

/** Branch / tag / path filter used by push and PR triggers. */
export interface BranchTagPathFilter {
  branches?: string[];
  'branches-ignore'?: string[];
  tags?: string[];
  'tags-ignore'?: string[];
  paths?: string[];
  'paths-ignore'?: string[];
}

/** Pull-request trigger types. */
export type PullRequestType =
  | 'assigned'
  | 'unassigned'
  | 'labeled'
  | 'unlabeled'
  | 'opened'
  | 'edited'
  | 'closed'
  | 'reopened'
  | 'synchronize'
  | 'converted_to_draft'
  | 'locked'
  | 'unlocked'
  | 'enqueued'
  | 'dequeued'
  | 'milestoned'
  | 'demilestoned'
  | 'ready_for_review'
  | 'review_requested'
  | 'review_request_removed'
  | 'auto_merge_enabled'
  | 'auto_merge_disabled';

/** Pull-request / pull_request_target trigger filter. */
export interface PullRequestFilter extends BranchTagPathFilter {
  types?: PullRequestType[];
}

/** Release trigger types. */
export type ReleaseType =
  | 'published'
  | 'unpublished'
  | 'created'
  | 'edited'
  | 'deleted'
  | 'prereleased'
  | 'released';

/** `workflow_dispatch` input definition. */
export interface WorkflowDispatchInput {
  description?: string;
  required?: boolean;
  default?: string;
  type?: 'string' | 'boolean' | 'choice' | 'environment' | 'number';
  options?: string[];
}

/** `workflow_dispatch` trigger: manually triggered with optional inputs. */
export interface WorkflowDispatchTrigger {
  inputs?: Record<string, WorkflowDispatchInput>;
}

/** `workflow_call` input definition. */
export interface WorkflowCallInput {
  description?: string;
  required?: boolean;
  default?: string | boolean | number;
  type?: 'boolean' | 'number' | 'string';
}

/** `workflow_call` output definition. */
export interface WorkflowCallOutput {
  description?: string;
  value: string;
}

/** `workflow_call` secret definition. */
export interface WorkflowCallSecret {
  description?: string;
  required?: boolean;
}

/** `workflow_call` trigger: reusable workflow invocation. */
export interface WorkflowCallTrigger {
  inputs?: Record<string, WorkflowCallInput>;
  outputs?: Record<string, WorkflowCallOutput>;
  secrets?: Record<string, WorkflowCallSecret>;
}

/**
 * All supported `on:` triggers. Keys match the YAML event names exactly.
 * At least one trigger must be specified.
 */
export interface WorkflowTriggers {
  push?: BranchTagPathFilter;
  pull_request?: PullRequestFilter;
  pull_request_target?: PullRequestFilter;
  schedule?: Array<{ cron: string }>;
  workflow_dispatch?: WorkflowDispatchTrigger | Record<string, never>;
  workflow_call?: WorkflowCallTrigger;
  release?: { types?: ReleaseType[] };
  /** Other event-only triggers (create, delete, fork, label, milestone, etc.). */
  [event: string]: unknown;
}

// ---------- Steps ----------

/** Fields common to every step kind. */
export interface StepCommon {
  /** Step identifier for cross-step output references (`steps.<id>.outputs.*`). */
  id?: string;
  /** Human-readable step name shown in the run log. */
  name?: string;
  /** Conditional expression. Step is skipped when it evaluates to false. */
  if?: string;
  /** Environment variables exposed to the step. */
  env?: Record<string, string | number | boolean>;
  /** Continue the job even if this step fails. */
  'continue-on-error'?: boolean | string;
  /** Step-level timeout in minutes. */
  'timeout-minutes'?: number;
}

/**
 * Action step — references a reusable GitHub Action by `owner/repo@ref` or a
 * local path starting with `./`.
 *
 * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsuses
 */
export interface UsesStep extends StepCommon {
  /** Action reference: `owner/repo@ref` or `./path/to/local`. */
  uses: string;
  /** Input map passed to the action (`with:` block). */
  with?: Record<string, string | number | boolean>;
}

/**
 * Run step — executes a shell command inline.
 *
 * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsrun
 */
export interface RunStep extends StepCommon {
  /** Shell command(s) to execute. May be multi-line. */
  run: string;
  /**
   * Shell to use for this step. Overrides `defaults.run.shell`.
   * Examples: `'bash'`, `'pwsh'`, `'python'`, `'sh'`, `'cmd'`, `'powershell'`.
   */
  shell?: string;
  /** Working directory override for this step. */
  'working-directory'?: string;
}

/** Discriminated union of every step kind. */
export type AnyStep = UsesStep | RunStep;

// ---------- Strategy / Matrix ----------

/**
 * Matrix axis values. Each key maps to a list of values; GHA generates one leg
 * per combination.
 */
export type MatrixValues = Record<string, Array<string | number | boolean | Record<string, unknown>>>;

/**
 * Matrix strategy configuration.
 *
 * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix
 */
export interface MatrixConfig {
  matrix: MatrixValues | string;
  /** Fail the entire matrix if any leg fails. Default: true. */
  'fail-fast'?: boolean;
  /** Maximum number of concurrent matrix legs. */
  'max-parallel'?: number;
}

/** Job execution strategy. */
export type StrategyConfig = MatrixConfig;

// ---------- Container / Services ----------

/**
 * Container or service configuration.
 *
 * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idcontainer
 */
export interface ContainerConfig {
  /** Docker image reference. */
  image: string;
  credentials?: { username: string; password: string };
  env?: Record<string, string | number | boolean>;
  ports?: Array<string | number>;
  volumes?: string[];
  options?: string;
}

// ---------- Environment ----------

/** Deployment environment reference. */
export interface EnvironmentConfig {
  name: string;
  url?: string;
}

/** Job environment: a name string or an object with optional URL. */
export type Environment = string | EnvironmentConfig;

// ---------- Defaults ----------

/** `defaults.run` options for shell and working directory. */
export interface RunDefaults {
  shell?: string;
  'working-directory'?: string;
}

export interface DefaultsConfig {
  run?: RunDefaults;
}

// ---------- Job ----------

/**
 * A single GitHub Actions job. Jobs run in parallel unless `needs:` creates
 * dependencies.
 *
 * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_id
 */
export interface JobObject {
  /** Runner label(s) for the job. */
  'runs-on': string | string[];
  /** Human-readable job name. */
  name?: string;
  /** Jobs that must succeed before this job runs. */
  needs?: string | string[];
  /** Conditional expression. */
  if?: string;
  /** Job-level environment variables. */
  env?: Record<string, string | number | boolean>;
  /** Deployment environment. */
  environment?: Environment;
  /** Job-level concurrency group. */
  concurrency?: Concurrency;
  /** Job-level token permissions. */
  permissions?: Permissions;
  /** Map from output name to step output expression. */
  outputs?: Record<string, string>;
  /** Execution strategy (matrix). */
  strategy?: StrategyConfig;
  /** Continue the workflow if this job fails. */
  'continue-on-error'?: boolean | string;
  /** Job-level timeout in minutes. */
  'timeout-minutes'?: number;
  /** Run the job inside a container. */
  container?: string | ContainerConfig;
  /** Side-car service containers. */
  services?: Record<string, string | ContainerConfig>;
  /** Default shell/working-directory for run steps. */
  defaults?: DefaultsConfig;
  /** Ordered list of steps. */
  steps?: AnyStep[];
  /**
   * Secrets inherited when called as a reusable workflow.
   * Use `'inherit'` to forward all caller secrets.
   */
  secrets?: 'inherit' | Record<string, string>;
  /**
   * `uses:` field for reusable workflow jobs. When set, the job calls another
   * workflow file instead of running steps locally.
   */
  uses?: string;
  /** Input values passed to a reusable workflow (`with:` at job level). */
  with?: Record<string, string | boolean | number>;
}

// ---------- Workflow root ----------

/**
 * Top-level GitHub Actions workflow document. This is what serializes to
 * `.github/workflows/<name>.yml`.
 *
 * @see https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions
 */
export interface WorkflowRoot {
  /** Workflow display name shown in the GitHub Actions UI. */
  name?: string;
  /**
   * Event(s) that trigger this workflow.
   *
   * Note: `on` is the YAML key name. While `on` is valid as a TypeScript
   * property name, you will need `workflow.on` (or `workflow['on']`) to access
   * it programmatically.
   */
  on: WorkflowTriggers;
  /** Workflow-level environment variables available to all jobs and steps. */
  env?: Record<string, string | number | boolean>;
  /** Workflow-level concurrency group. */
  concurrency?: Concurrency;
  /** Default token permissions for all jobs. */
  permissions?: Permissions;
  /** Default shell/working-directory for all run steps. */
  defaults?: DefaultsConfig;
  /** Named jobs keyed by job identifier. */
  jobs: Record<string, JobObject>;
}
