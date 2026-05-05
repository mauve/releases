import type { ShapeDescriptor } from './engine.js';

/**
 * Identity-key descriptor for Azure Pipelines YAML documents (the shape
 * produced by {@link "PipelineBuilder.toObject"} from `@mauve/azpipe`).
 *
 * Descriptor keys are JSONPath globs naming an *array element* (with `[*]`
 * as the wildcard); values are the field on that element that uniquely
 * identifies it.
 */
export const pipelineDescriptor: ShapeDescriptor = {
  '$.stages[*]': 'stage',
  '$.stages[*].jobs[*]': (v) => identifyJob(v),
  '$.jobs[*]': (v) => identifyJob(v),
  '$.stages[*].jobs[*].steps[*]': (v) => identifyStep(v),
  '$.jobs[*].steps[*]': (v) => identifyStep(v),
  '$.steps[*]': (v) => identifyStep(v),
  '$.variables[*]': (v) => identifyVariable(v),
  '$.stages[*].variables[*]': (v) => identifyVariable(v),
  '$.jobs[*].variables[*]': (v) => identifyVariable(v),
  '$.stages[*].jobs[*].variables[*]': (v) => identifyVariable(v),
  '$.resources.repositories[*]': 'repository',
  '$.resources.pipelines[*]': 'pipeline',
  '$.resources.containers[*]': 'container',
  '$.resources.packages[*]': 'package',
  '$.parameters[*]': 'name',
  '$.schedules[*]': (v) => (isObj(v) && typeof v.cron === 'string' ? v.cron : '#'),
};

/**
 * Identity-key descriptor for Azure DevOps Classic Release definitions
 * (the JSON shape returned by `GET /_apis/release/definitions/{id}`).
 */
export const releaseDescriptor: ShapeDescriptor = {
  '$.environments[*]': (v) => (isObj(v) && typeof v.name === 'string' ? v.name : '#'),
  '$.environments[*].deployPhases[*]': (v) =>
    isObj(v) && typeof v.rank === 'number' ? String(v.rank) : '#',
  '$.environments[*].deployPhases[*].workflowTasks[*]': (v) =>
    isObj(v) ? `${v.taskId ?? '?'}@${v.refName ?? ''}#${v.name ?? ''}` : '#',
  '$.environments[*].preDeployApprovals.approvals[*]': (v) =>
    isObj(v) && typeof v.rank === 'number' ? String(v.rank) : '#',
  '$.environments[*].postDeployApprovals.approvals[*]': (v) =>
    isObj(v) && typeof v.rank === 'number' ? String(v.rank) : '#',
  '$.environments[*].preDeploymentGates.gates[*]': (v) =>
    isObj(v) && typeof v.name === 'string' ? v.name : '#',
  '$.environments[*].postDeploymentGates.gates[*]': (v) =>
    isObj(v) && typeof v.name === 'string' ? v.name : '#',
  '$.artifacts[*]': 'alias',
  '$.triggers[*]': (v) =>
    isObj(v) ? `${v.triggerType ?? '?'}#${v.artifactAlias ?? v.alias ?? ''}` : '#',
  '$.environments[*].variableGroups[*]': (v) => String(v),
  '$.variableGroups[*]': (v) => String(v),
  '$.tags[*]': (v) => String(v),
};

/**
 * Server-managed fields that always differ between a captured local definition
 * and a freshly-fetched server one. Diff-time consumers should pass these to
 * `diff(..., { ignorePaths: SERVER_MANAGED_PATHS })` when comparing against the
 * Azure DevOps Releases REST API.
 */
export const SERVER_MANAGED_PATHS: readonly string[] = [
  '$.id',
  '$.url',
  '$.revision',
  '$.createdBy',
  '$.createdOn',
  '$.modifiedBy',
  '$.modifiedOn',
  '$._links',
  '$.environments[*].id',
  '$.environments[*].owner',
  '$.environments[*].badgeUrl',
  '$.environments[*].currentRelease',
];

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function identifyJob(v: unknown): string {
  if (!isObj(v)) return '#';
  if (typeof v.job === 'string') return `job:${v.job}`;
  if (typeof v.deployment === 'string') return `deployment:${v.deployment}`;
  if (typeof v.template === 'string') return `template:${v.template}`;
  return '#';
}

function identifyStep(v: unknown): string {
  if (!isObj(v)) return '#';
  // Step kinds are discriminated by which "kind" key is present.
  const kinds = [
    'script', 'bash', 'pwsh', 'powershell', 'checkout', 'download', 'publish', 'task', 'template',
  ] as const;
  for (const k of kinds) {
    if (typeof v[k] === 'string') {
      // Use displayName for stability when present, else the kind+value pair.
      if (typeof v.displayName === 'string') return `${k}:${v.displayName}`;
      return `${k}:${String(v[k]).slice(0, 40)}`;
    }
  }
  return '#';
}

function identifyVariable(v: unknown): string {
  if (!isObj(v)) return '#';
  if (typeof v.name === 'string') return `name:${v.name}`;
  if (typeof v.group === 'string') return `group:${v.group}`;
  if (typeof v.template === 'string') return `template:${v.template}`;
  return '#';
}
