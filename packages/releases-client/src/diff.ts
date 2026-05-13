import type { ReleaseDefinition } from '@mauvezero/azpipe-releases';
import {
  diff,
  releaseDescriptor,
  SERVER_MANAGED_PATHS,
  type DiffNode,
} from '@mauvezero/azpipe-utils/diff';
import type { ReleaseClient } from './client.js';
import { resolveQueueRefs } from './resolve.js';

export interface DiffAgainstServerResult {
  /** The release definition currently on the server (null if not yet created). */
  server: ReleaseDefinition | null;
  /** Difference nodes from server → local. Empty when the local def matches. */
  nodes: DiffNode[];
}

/**
 * Fetch the server's current release definition and diff it against the local one.
 *
 * Lookup prefers `local.id` when set (stable across renames); falls back to
 * `local.name`. Before diffing, name-based queue references in `local` (set
 * via `AgentPhaseBuilder.pool('Queue Name')`) are resolved to numeric
 * `queueId`s. Server-managed fields (`revision`, `id`, audit timestamps) are
 * ignored.
 */
export async function diffAgainstServer(
  local: ReleaseDefinition,
  client: ReleaseClient,
): Promise<DiffAgainstServerResult> {
  await resolveQueueRefs(local, client);
  const server = local.id !== undefined
    ? await client.getDefinition(local.id).catch(() => null)
    : await client.getDefinitionByName(local.name);
  const nodes = diff(server ?? {}, local, {
    descriptor: releaseDescriptor,
    ignorePaths: [...SERVER_MANAGED_PATHS],
  });
  return { server, nodes };
}
