/**
 * Task-name resolver.
 *
 * Maps marketplace task references to the typed factory function exposed by
 * `@mauve/azpipe-tasks`. The forward map (`'AzureCLI@2'` → `azureCLIV2`)
 * is used by the YAML converter; the inverse (GUID + major → factory) is used
 * by the release converter to undo `taskStepToWorkflowTask`.
 *
 * Factory naming follows the codegen rule in `packages/tasks/scripts/generator.ts`:
 * camelCase the task name, then append `V<major>`. For most tasks this is
 * mechanical (`UseNode` → `useNodeV1`, `AzureCLI` → `azureCLIV2`). A handful of
 * historical anomalies are caught at module load by cross-checking against the
 * generated module's actual exports.
 */

import * as taskMod from '@mauve/azpipe-tasks';
import { taskIds, type TaskIdEntry } from '@mauve/azpipe-tasks';

/** Forward and reverse lookups for a task. */
export interface TaskMatch {
  /** Task ref like `'AzureCLI@2'`. */
  taskRef: string;
  /** Factory name exported by `@mauve/azpipe-tasks`, e.g. `'azureCLIV2'`. */
  factory: string;
  /** GUID. */
  taskId: string;
  /** Major version. */
  major: number;
}

const allFactories: Set<string> = new Set(
  Object.keys(taskMod).filter((k) => typeof (taskMod as Record<string, unknown>)[k] === 'function'),
);

function camelCaseTaskName(raw: string): string {
  // Mirror packages/tasks/scripts/generator.ts: split on word boundaries,
  // lower-case the first chunk, capitalise subsequent chunks. Numbers and
  // mixed case (e.g. AzureIoTEdge → azureIoTEdge) are preserved by treating
  // adjacent capitals as one chunk only when followed by lowercase.
  const parts = raw
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);
  if (parts.length === 0) return '';
  const head = parts[0]!;
  const tail = parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1));
  return head.charAt(0).toLowerCase() + head.slice(1) + tail.join('');
}

function factoryFor(taskRef: string): string | undefined {
  const at = taskRef.lastIndexOf('@');
  if (at < 0) return undefined;
  const name = taskRef.slice(0, at);
  const major = taskRef.slice(at + 1);
  const candidate = camelCaseTaskName(name) + 'V' + major;
  if (allFactories.has(candidate)) return candidate;
  // Some legacy tasks have one-off names. Try a couple of fallbacks.
  const altA = name.charAt(0).toLowerCase() + name.slice(1) + 'V' + major;
  if (allFactories.has(altA)) return altA;
  return undefined;
}

const FORWARD: ReadonlyMap<string, TaskMatch> = (() => {
  const m = new Map<string, TaskMatch>();
  for (const [taskRef, entry] of Object.entries(taskIds) as Array<[string, TaskIdEntry]>) {
    const factory = factoryFor(taskRef);
    if (factory === undefined) continue;
    m.set(taskRef, { taskRef, factory, taskId: entry.id, major: entry.major });
  }
  return m;
})();

const INVERSE: ReadonlyMap<string, TaskMatch> = (() => {
  const m = new Map<string, TaskMatch>();
  for (const match of FORWARD.values()) {
    m.set(`${match.taskId.toLowerCase()}@${match.major}`, match);
  }
  return m;
})();

/** Look up a typed factory for a `'AzureCLI@2'`-style ref. */
export function findTaskFactoryByRef(taskRef: string): TaskMatch | undefined {
  return FORWARD.get(taskRef);
}

/**
 * Look up a typed factory for a GUID + version pair from a release workflow
 * task. Versions are matched by major; classic releases store `'2.*'` or full
 * triples like `'2.198.0'` — both yield the same major.
 */
export function findTaskFactoryByGuid(taskId: string, version: string): TaskMatch | undefined {
  const dot = version.indexOf('.');
  const major = parseInt(dot >= 0 ? version.slice(0, dot) : version, 10);
  if (Number.isNaN(major)) return undefined;
  return INVERSE.get(`${taskId.toLowerCase()}@${major}`);
}
