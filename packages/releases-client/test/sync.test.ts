import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Writable } from 'node:stream';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ReleaseDefinition } from '@mauve/azpipe-releases';
import { ReleaseClient, push } from '../src/index.js';

const here = dirname(fileURLToPath(import.meta.url));
const fixture = JSON.parse(
  readFileSync(resolve(here, 'fixtures/release.json'), 'utf8'),
) as ReleaseDefinition;

const BASE = 'https://vsrm.dev.azure.com/mauve/platform/_apis/release/';

vi.mock('@azure/identity', () => ({
  DefaultAzureCredential: class {
    async getToken() {
      return { token: 'fake', expiresOnTimestamp: Date.now() + 3600_000 };
    }
  },
}));

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function captureStream(): Writable & { contents: () => string } {
  const chunks: Buffer[] = [];
  const w = new Writable({
    write(chunk, _enc, cb) {
      chunks.push(Buffer.from(chunk));
      cb();
    },
  }) as Writable & { contents: () => string };
  w.contents = () => Buffer.concat(chunks).toString('utf8');
  return w;
}

function clientForFixture(): ReleaseClient {
  return new ReleaseClient({ org: 'mauve', project: 'platform' });
}

describe('push()', () => {
  it('returns no-op when local matches the server', async () => {
    server.use(
      http.get(`${BASE}definitions`, () =>
        HttpResponse.json({ value: [{ id: 42, name: 'web-release', revision: 7 }] }),
      ),
      http.get(`${BASE}definitions/42`, () => HttpResponse.json(fixture)),
    );
    const out = captureStream();
    const r = await push(fixture, { client: clientForFixture(), out, yes: true });
    expect(r.reason).toBe('no-op');
    expect(out.contents()).toContain('No changes.');
  });

  it('dry-run prints the diff but does not PUT', async () => {
    server.use(
      http.get(`${BASE}definitions`, () =>
        HttpResponse.json({ value: [{ id: 42, name: 'web-release', revision: 7 }] }),
      ),
      http.get(`${BASE}definitions/42`, () => HttpResponse.json(fixture)),
      http.put(`${BASE}definitions`, () => HttpResponse.error()),
    );
    const local = { ...fixture, releaseNameFormat: 'changed-$(rev:r)' };
    const out = captureStream();
    const r = await push(local, { client: clientForFixture(), out, dryRun: true });
    expect(r.reason).toBe('dry-run');
    expect(out.contents()).toContain('releaseNameFormat');
  });

  it('declined prompt aborts the PUT', async () => {
    server.use(
      http.get(`${BASE}definitions`, () =>
        HttpResponse.json({ value: [{ id: 42, name: 'web-release', revision: 7 }] }),
      ),
      http.get(`${BASE}definitions/42`, () => HttpResponse.json(fixture)),
      http.put(`${BASE}definitions`, () => HttpResponse.error()),
    );
    const local = { ...fixture, releaseNameFormat: 'changed-$(rev:r)' };
    const out = captureStream();
    const r = await push(local, {
      client: clientForFixture(),
      out,
      prompt: async () => false,
    });
    expect(r.reason).toBe('declined');
  });

  it('applied: confirms then PUTs with the server revision and id copied in', async () => {
    let putBody: ReleaseDefinition | undefined;
    server.use(
      http.get(`${BASE}definitions`, () =>
        HttpResponse.json({ value: [{ id: 42, name: 'web-release', revision: 7 }] }),
      ),
      http.get(`${BASE}definitions/42`, () => HttpResponse.json(fixture)),
      http.put(`${BASE}definitions`, async ({ request }) => {
        putBody = (await request.json()) as ReleaseDefinition;
        return HttpResponse.json({ ...putBody, revision: (putBody.revision ?? 0) + 1 });
      }),
    );
    const local: ReleaseDefinition = {
      ...fixture,
      // Strip server-managed bits to simulate a fresh local definition.
      id: undefined,
      revision: undefined,
      releaseNameFormat: 'updated-$(rev:r)',
    };
    const out = captureStream();
    const r = await push(local, { client: clientForFixture(), out, yes: true });
    expect(r.reason).toBe('applied');
    expect(r.before).toBe(7);
    expect(r.after).toBe(8);
    // Revision and id from server were applied to the PUT body.
    expect(putBody?.revision).toBe(7);
    expect(putBody?.id).toBe(42);
    expect(putBody?.releaseNameFormat).toBe('updated-$(rev:r)');
  });

  it('first-time create: revision defaults to 0 when no server definition exists', async () => {
    let putBody: ReleaseDefinition | undefined;
    server.use(
      http.get(`${BASE}definitions`, () => HttpResponse.json({ value: [] })),
      http.put(`${BASE}definitions`, async ({ request }) => {
        putBody = (await request.json()) as ReleaseDefinition;
        return HttpResponse.json({ ...putBody, id: 99, revision: 1 });
      }),
    );
    const out = captureStream();
    const r = await push({ ...fixture, id: undefined, revision: undefined }, {
      client: clientForFixture(),
      out,
      yes: true,
    });
    expect(r.reason).toBe('applied');
    expect(putBody?.revision).toBe(0);
    expect(putBody?.id).toBeUndefined();
  });
});
