import {
  clearUnresolvedQueue,
  readUnresolvedQueue,
  type AgentDeploymentInput,
  type ReleaseDefinition,
} from '@mauve/azpipe-releases';
import type { AgentQueue, ReleaseClient } from './client.js';

/** Thrown when a queue name in the local definition doesn't match any queue in the project. */
export class UnknownQueueError extends Error {
  readonly queueName: string;
  readonly availableQueues: string[];
  constructor(queueName: string, available: string[]) {
    super(
      `No agent queue named ${JSON.stringify(queueName)} in this project. ` +
        `Known queues: ${available.map((n) => JSON.stringify(n)).join(', ')}. ` +
        `Use --org/--project to point at the right project, or use \`pool({ queueId: <n> })\` if you ` +
        `know the numeric id.`,
    );
    this.name = 'UnknownQueueError';
    this.queueName = queueName;
    this.availableQueues = available;
  }
}

/**
 * Walk a release definition's deploy phases and collect every name-based
 * queue reference (added by `AgentPhaseBuilder.pool('Some Name')`).
 */
function collectUnresolvedRefs(
  def: ReleaseDefinition,
): Array<{ name: string; input: AgentDeploymentInput }> {
  const refs: Array<{ name: string; input: AgentDeploymentInput }> = [];
  for (const env of def.environments ?? []) {
    for (const phase of env.deployPhases ?? []) {
      const input = phase.deploymentInput as AgentDeploymentInput | undefined;
      const ref = readUnresolvedQueue(input);
      if (ref && input) refs.push({ name: ref.name, input });
    }
  }
  return refs;
}

/**
 * Resolve every name-based queue reference in `def` to a numeric `queueId`.
 *
 * Mutates `def` in place and clears the unresolved-queue markers. Hits
 * `listQueues` exactly once per call regardless of how many references the
 * definition contains.
 *
 * Idempotent: a definition with no unresolved references makes no API call
 * and returns immediately.
 *
 * @throws {@link UnknownQueueError} when a referenced queue name doesn't
 *   exist in the project.
 */
export async function resolveQueueRefs(
  def: ReleaseDefinition,
  client: ReleaseClient,
): Promise<void> {
  const refs = collectUnresolvedRefs(def);
  if (refs.length === 0) return;

  const queues = await client.listQueues();
  const byName = new Map<string, AgentQueue>();
  for (const q of queues) byName.set(q.name, q);

  // Resolve each reference; collect failures so we report them all at once.
  const missing = new Set<string>();
  for (const { name } of refs) {
    if (!byName.has(name)) missing.add(name);
  }
  if (missing.size > 0) {
    throw new UnknownQueueError([...missing][0]!, queues.map((q) => q.name));
  }

  for (const { name, input } of refs) {
    input.queueId = byName.get(name)!.id;
    clearUnresolvedQueue(input);
  }
}
