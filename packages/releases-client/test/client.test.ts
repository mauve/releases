import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ReleaseClient,
  RevisionMismatchError,
  RateLimitedError,
  AzureDevOpsApiError,
} from '../src/index.js';
import type { ReleaseDefinition } from '@mauvezero/azpipe-releases';

const here = dirname(fileURLToPath(import.meta.url));
const fixture = JSON.parse(
  readFileSync(resolve(here, 'fixtures/release.json'), 'utf8'),
) as ReleaseDefinition;

const BASE = 'https://vsrm.dev.azure.com/mauve/platform/_apis/release/';

// Stub auth so tests don't talk to Entra.
vi.mock('@azure/identity', () => ({
  DefaultAzureCredential: class {
    async getToken() {
      return { token: 'fake-token', expiresOnTimestamp: Date.now() + 3600_000 };
    }
  },
}));

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function client(): ReleaseClient {
  return new ReleaseClient({ org: 'mauve', project: 'platform' });
}

describe('ReleaseClient', () => {
  it('getDefinitionByName: returns the matching definition', async () => {
    server.use(
      http.get(`${BASE}definitions`, ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get('searchText')).toBe('web-release');
        return HttpResponse.json({ value: [{ id: 42, name: 'web-release', revision: 7 }] });
      }),
      http.get(`${BASE}definitions/42`, () => HttpResponse.json(fixture)),
    );
    const def = await client().getDefinitionByName('web-release');
    expect(def?.name).toBe('web-release');
    expect(def?.revision).toBe(7);
  });

  it('getDefinitionByName: returns null on miss', async () => {
    server.use(
      http.get(`${BASE}definitions`, () => HttpResponse.json({ value: [] })),
    );
    expect(await client().getDefinitionByName('does-not-exist')).toBeNull();
  });

  it('listDefinitions: passes searchText/path/$top params', async () => {
    server.use(
      http.get(`${BASE}definitions`, ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get('searchText')).toBe('web');
        expect(url.searchParams.get('path')).toBe('\\releases');
        expect(url.searchParams.get('$top')).toBe('25');
        expect(url.searchParams.get('api-version')).toBe('7.1');
        return HttpResponse.json({ value: [] });
      }),
    );
    await client().listDefinitions({ searchText: 'web', path: '\\releases', top: 25 });
  });

  it('putDefinition: PUTs the body and returns the updated definition', async () => {
    server.use(
      http.put(`${BASE}definitions`, async ({ request }) => {
        const body = (await request.json()) as ReleaseDefinition;
        expect(body.name).toBe('web-release');
        return HttpResponse.json({ ...body, revision: (body.revision ?? 0) + 1 });
      }),
    );
    const r = await client().putDefinition(fixture);
    expect(r.revision).toBe(8);
  });

  it('PUT 409: throws RevisionMismatchError', async () => {
    server.use(
      http.put(`${BASE}definitions`, () =>
        HttpResponse.text('current revision 9, sent 7', { status: 409 }),
      ),
    );
    await expect(client().putDefinition(fixture)).rejects.toBeInstanceOf(RevisionMismatchError);
  });

  it('429: throws RateLimitedError with retry-after seconds', async () => {
    server.use(
      http.get(`${BASE}definitions/42`, () =>
        HttpResponse.text('throttled', { status: 429, headers: { 'Retry-After': '12' } }),
      ),
    );
    const err = await client()
      .getDefinition(42)
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(RateLimitedError);
    expect((err as RateLimitedError).retryAfterSeconds).toBe(12);
  });

  it('500: throws AzureDevOpsApiError', async () => {
    server.use(
      http.get(`${BASE}definitions/42`, () =>
        HttpResponse.text('internal error', { status: 500 }),
      ),
    );
    await expect(client().getDefinition(42)).rejects.toBeInstanceOf(AzureDevOpsApiError);
  });
});
