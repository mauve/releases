import type {
  ReleaseDefinition,
  ReleaseDefinitionShallow,
} from '@mauvezero/azpipe-releases';
import { getToken, type AuthOptions } from './auth.js';
import {
  AzureDevOpsApiError,
  NotFoundError,
  RateLimitedError,
  RevisionMismatchError,
} from './errors.js';

const API_VERSION = '7.1';

/**
 * One agent queue in the project (the project-scoped binding to a pool).
 *
 * @see https://learn.microsoft.com/rest/api/azure/devops/distributedtask/queues
 */
export interface AgentQueue {
  id: number;
  name: string;
  pool?: { id?: number; name?: string };
  projectId?: string;
}

export interface ReleaseClientOptions {
  org: string;
  project: string;
  /** Override base URL (e.g. for self-hosted Azure DevOps Server). */
  baseUrl?: string;
  auth?: AuthOptions;
  /** Inject a fetch implementation (default: globalThis.fetch). Used by tests. */
  fetch?: typeof fetch;
}

export interface ListDefinitionsOptions {
  searchText?: string;
  path?: string;
  /** Page size (`$top`). Default 100. */
  top?: number;
}

/**
 * Thin client over the Azure DevOps Classic Releases REST API. All methods
 * acquire an Entra token through {@link getToken} on each call (the underlying
 * credential caches tokens per its own policy).
 *
 * @see https://learn.microsoft.com/rest/api/azure/devops/release/definitions
 */
export class ReleaseClient {
  private readonly opts: Required<Pick<ReleaseClientOptions, 'org' | 'project'>> & ReleaseClientOptions;

  constructor(opts: ReleaseClientOptions) {
    this.opts = { ...opts };
  }

  /** Fetch a definition by numeric id. */
  async getDefinition(id: number): Promise<ReleaseDefinition> {
    const r = await this.request<ReleaseDefinition>(`definitions/${id}`);
    if (r === null) throw new NotFoundError(`Release definition id ${id} not found.`);
    return r;
  }

  /**
   * Fetch a definition by name. Returns `null` if no match.
   *
   * Implemented as `GET /definitions?searchText=<name>` filtered exactly on
   * `name`, then a follow-up `GET /definitions/{id}` because list responses
   * omit `environments` and other large fields.
   */
  async getDefinitionByName(name: string): Promise<ReleaseDefinition | null> {
    const list = await this.listDefinitions({ searchText: name });
    const match = list.find((d) => d.name === name);
    if (!match) return null;
    return this.getDefinition(match.id);
  }

  async listDefinitions(opts: ListDefinitionsOptions = {}): Promise<ReleaseDefinitionShallow[]> {
    const params = new URLSearchParams();
    if (opts.searchText) params.set('searchText', opts.searchText);
    if (opts.path) params.set('path', opts.path);
    params.set('$top', String(opts.top ?? 100));
    const r = await this.request<{ value: ReleaseDefinitionShallow[] }>(
      `definitions?${params.toString()}`,
    );
    if (r === null) throw new NotFoundError(`Project ${this.opts.project} not found.`);
    return r.value;
  }

  /**
   * Create or update a release definition.
   *
   * The `revision` field carries optimistic-concurrency semantics — the
   * server rejects the PUT (HTTP 409) if it doesn't match the current
   * revision. Callers using {@link "push"} from `./sync.js` get this handled
   * automatically.
   */
  async putDefinition(def: ReleaseDefinition): Promise<ReleaseDefinition> {
    const r = await this.request<ReleaseDefinition>('definitions', {
      method: 'PUT',
      body: JSON.stringify(def),
    });
    if (r === null) throw new NotFoundError('PUT release definition returned 404.');
    return r;
  }

  /**
   * List the agent queues in this project. Used to resolve queue names (e.g.
   * `'Azure Pipelines'`) to numeric `queueId`s before pushing a release
   * definition.
   *
   * @see https://learn.microsoft.com/rest/api/azure/devops/distributedtask/queues/list
   */
  async listQueues(): Promise<AgentQueue[]> {
    const url = `https://dev.azure.com/${encodeURIComponent(this.opts.org)}/${encodeURIComponent(
      this.opts.project,
    )}/_apis/distributedtask/queues?api-version=${API_VERSION}`;
    const r = await this.fetchJson<{ value: AgentQueue[] }>(url);
    if (r === null) throw new NotFoundError(`Project ${this.opts.project} not found.`);
    return r.value;
  }

  // ---- internals --------------------------------------------------------

  private async request<T>(
    pathAndQuery: string,
    init: { method?: string; body?: string } = {},
  ): Promise<T | null> {
    const sep = pathAndQuery.includes('?') ? '&' : '?';
    const url =
      (this.opts.baseUrl ?? `https://vsrm.dev.azure.com/${encodeURIComponent(this.opts.org)}/${encodeURIComponent(this.opts.project)}/_apis/release/`) +
      pathAndQuery +
      `${sep}api-version=${API_VERSION}`;
    return this.fetchJson<T>(url, init);
  }

  private async fetchJson<T>(
    url: string,
    init: { method?: string; body?: string } = {},
  ): Promise<T | null> {
    const token = await getToken(this.opts.auth);
    const fetchImpl = this.opts.fetch ?? globalThis.fetch;
    const res = await fetchImpl(url, {
      method: init.method ?? 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: init.body,
    });

    if (res.status === 404) return null;
    if (res.status === 409) {
      const body = await res.text();
      const m = /current revision (\d+)/i.exec(body);
      throw new RevisionMismatchError(m ? Number(m[1]) : undefined, undefined);
    }
    if (res.status === 429) {
      const ra = res.headers.get('retry-after');
      throw new RateLimitedError(ra ? Number(ra) : undefined);
    }
    if (!res.ok) throw new AzureDevOpsApiError(res.status, await res.text());
    return (await res.json()) as T;
  }
}
