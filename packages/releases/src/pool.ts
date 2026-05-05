import type { AgentDeploymentInput } from './raw.js';

/**
 * Microsoft-hosted agent image identifiers accepted by the `'Azure Pipelines'`
 * queue's `agentSpecification.identifier` field.
 *
 * The literal union covers the documented current images and gives editor
 * autocomplete; the trailing `(string & {})` keeps the type permissive so
 * brand-new MS images (or self-hosted custom values) don't fail to compile.
 *
 * @see https://learn.microsoft.com/azure/devops/pipelines/agents/hosted
 */
export type HostedVmImage =
  | 'ubuntu-latest'
  | 'ubuntu-24.04'
  | 'ubuntu-22.04'
  | 'ubuntu-20.04'
  | 'windows-latest'
  | 'windows-2025'
  | 'windows-2022'
  | 'windows-2019'
  | 'macos-latest'
  | 'macos-15'
  | 'macos-14'
  | 'macos-13'
  // The `(string & {})` trick keeps the literal-union autocomplete while
  // still accepting any string at compile time. Standard pattern.
  | (string & Record<never, never>);

/** Default queue used when only `vmImage` is supplied. */
export const HOSTED_QUEUE_NAME = 'Azure Pipelines';

/**
 * Reference an agent queue by name. The REST client resolves the name to a
 * numeric `queueId` at push time via the `distributedtask/queues` API.
 */
export interface ReleasePoolByName {
  /**
   * Queue name as it appears in **Project Settings → Agent pools** (the queue,
   * not the pool). For Microsoft-hosted agents this is typically
   * `'Azure Pipelines'`; for private pools it's the name you gave the queue.
   */
  name: string;
  /** Agent capability demands (e.g. `['Agent.OS -equals Linux']`). */
  demands?: string[];
  /**
   * Pin a specific Microsoft-hosted image (e.g. `'ubuntu-22.04'`,
   * `'macos-13'`). Only meaningful when `name` is the `'Azure Pipelines'`
   * hosted queue; Azure ignores it on private pools.
   */
  vmImage?: HostedVmImage;
}

/**
 * Reference the Microsoft-hosted queue purely via image identifier.
 * `name` is implicit (`'Azure Pipelines'`); use this when you don't care
 * about the queue, only the OS / image version.
 */
export interface ReleasePoolByVmImage {
  /** Microsoft-hosted image identifier. */
  vmImage: HostedVmImage;
  /** Additional capability demands beyond the implicit ones. */
  demands?: string[];
}

/**
 * Reference an agent queue by numeric ID — escape hatch for cases where you
 * already have the ID (or the name lookup is unavailable).
 */
export interface ReleasePoolById {
  queueId: number;
  demands?: string[];
}

/**
 * What `AgentPhaseBuilder.pool(...)` accepts. Strings are shorthand for
 * `{ name }`. Use the object form when you also need demands or want to pin
 * a specific image.
 *
 * Examples:
 *
 * ```ts
 * .pool('Azure Pipelines')                                  // hosted queue, no constraints
 * .pool({ name: 'MyPrivatePool' })                          // private pool
 * .pool({ name: 'Azure Pipelines', demands: ['Foo'] })      // queue + demands
 * .pool({ vmImage: 'ubuntu-22.04' })                        // hosted, pinned image
 * .pool({ name: 'Azure Pipelines', vmImage: 'macos-13' })   // explicit + pinned
 * .pool({ queueId: 42 })                                    // numeric escape hatch
 * ```
 */
export type ReleasePoolSpec =
  | string
  | ReleasePoolByName
  | ReleasePoolByVmImage
  | ReleasePoolById;

/**
 * Symbol used to tag an `AgentDeploymentInput` whose `queueId` couldn't be
 * resolved at builder time (because we only have a name). The REST client
 * walks for this symbol and replaces `queueId` with a real number before PUT.
 *
 * Symbols are dropped by `JSON.stringify`, so this metadata never reaches the
 * wire.
 */
export const UNRESOLVED_QUEUE: unique symbol = Symbol.for(
  '@mauve/azpipe-releases#unresolvedQueue',
);

export interface UnresolvedQueueRef {
  /** Queue name to look up. */
  name: string;
}

/**
 * Read the unresolved-queue marker from a `deploymentInput`, if present.
 * Returns `undefined` when the queue is already a numeric ID.
 */
export function readUnresolvedQueue(
  input: AgentDeploymentInput | undefined,
): UnresolvedQueueRef | undefined {
  if (!input) return undefined;
  return (input as Record<typeof UNRESOLVED_QUEUE, UnresolvedQueueRef | undefined>)[
    UNRESOLVED_QUEUE
  ];
}

/** Attach an unresolved-queue marker (used by builders). */
export function markUnresolvedQueue(input: AgentDeploymentInput, name: string): void {
  (input as Record<typeof UNRESOLVED_QUEUE, UnresolvedQueueRef>)[UNRESOLVED_QUEUE] = { name };
}

/** Remove the unresolved-queue marker (used by the resolver post-lookup). */
export function clearUnresolvedQueue(input: AgentDeploymentInput): void {
  delete (input as Record<typeof UNRESOLVED_QUEUE, UnresolvedQueueRef | undefined>)[
    UNRESOLVED_QUEUE
  ];
}

interface NormalizedSpec {
  /** Either an unresolved name or a numeric ID. */
  queue: { name: string } | { queueId: number };
  demands?: string[];
  vmImage?: string;
}

function normalize(spec: ReleasePoolSpec): NormalizedSpec {
  if (typeof spec === 'string') return { queue: { name: spec } };
  if ('queueId' in spec) {
    const out: NormalizedSpec = { queue: { queueId: spec.queueId } };
    if (spec.demands) out.demands = spec.demands;
    return out;
  }
  if ('name' in spec) {
    const out: NormalizedSpec = { queue: { name: spec.name } };
    if (spec.demands) out.demands = spec.demands;
    if (spec.vmImage) out.vmImage = spec.vmImage;
    return out;
  }
  // ReleasePoolByVmImage — queue defaults to the hosted pool.
  const out: NormalizedSpec = {
    queue: { name: HOSTED_QUEUE_NAME },
    vmImage: spec.vmImage,
  };
  if (spec.demands) out.demands = spec.demands;
  return out;
}

/**
 * Apply a {@link ReleasePoolSpec} to an `AgentDeploymentInput`, taking care
 * of the queueId vs. unresolved-name split, merging demands, and writing
 * `agentSpecification.identifier` when `vmImage` is supplied.
 */
export function applyPoolSpec(
  input: AgentDeploymentInput,
  spec: ReleasePoolSpec,
): void {
  const n = normalize(spec);

  if ('queueId' in n.queue) {
    input.queueId = n.queue.queueId;
    clearUnresolvedQueue(input);
  } else {
    input.queueId = 0;
    markUnresolvedQueue(input, n.queue.name);
  }
  if (n.demands && n.demands.length > 0) {
    input.demands = [...(input.demands ?? []), ...n.demands];
  }
  if (n.vmImage) {
    input.agentSpecification = { identifier: n.vmImage };
  }
}
