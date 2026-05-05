/**
 * `@mauve/azpipe-releases-client` — REST client for Azure DevOps Classic
 * Releases. Pairs with `@mauve/azpipe-releases` (definition types) and
 * `@mauve/azpipe-utils/diff` (the diff engine).
 *
 * Public surface:
 * - {@link ReleaseClient} — get/list/put against the REST API.
 * - {@link diffAgainstServer} — fetch + diff vs a local definition.
 * - {@link push} — diff-first PUT with interactive confirmation.
 * - {@link getToken} — Entra token acquisition via `DefaultAzureCredential`.
 *
 * @packageDocumentation
 */

export {
  ReleaseClient,
  type ReleaseClientOptions,
  type ListDefinitionsOptions,
  type AgentQueue,
} from './client.js';
export { resolveQueueRefs, UnknownQueueError } from './resolve.js';
export {
  getToken,
  AZURE_DEVOPS_RESOURCE_ID,
  type AuthOptions,
} from './auth.js';
export {
  NotFoundError,
  RevisionMismatchError,
  RateLimitedError,
  AzureDevOpsApiError,
} from './errors.js';
export {
  diffAgainstServer,
  type DiffAgainstServerResult,
} from './diff.js';
export { push, type PushOptions, type PushResult, type PushReason } from './sync.js';
