import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
  releasePipeline,
  readUnresolvedQueue,
  type AgentDeploymentInput,
  type ReleaseDefinition,
} from '@mauvezero/azpipe-releases';
import {
  ReleaseClient,
  resolveQueueRefs,
  UnknownQueueError,
  diffAgainstServer,
} from '../src/index.js';

const VSRM = 'https://vsrm.dev.azure.com/mauve/platform/_apis/release/';
const CORE = 'https://dev.azure.com/mauve/platform/_apis/distributedtask/';

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

function client(): ReleaseClient {
  return new ReleaseClient({ org: 'mauve', project: 'platform' });
}

function localDef(): ReleaseDefinition {
  return releasePipeline({ org: 'mauve', project: 'platform', name: 'web-release' })
    .environment('staging', (e) =>
      e.agentPhase((p) =>
        p.pool('Azure Pipelines').workflowTask({ taskId: 'tid', version: '1.*', enabled: true }),
      ),
    )
    .toDefinition();
}

describe('listQueues', () => {
  it('hits dev.azure.com/_apis/distributedtask/queues with the right api-version', async () => {
    let url: string | undefined;
    server.use(
      http.get(`${CORE}queues`, ({ request }) => {
        url = request.url;
        return HttpResponse.json({
          value: [
            { id: 1, name: 'Azure Pipelines' },
            { id: 8, name: 'MyCustomPool' },
          ],
        });
      }),
    );
    const queues = await client().listQueues();
    expect(queues).toEqual([
      { id: 1, name: 'Azure Pipelines' },
      { id: 8, name: 'MyCustomPool' },
    ]);
    expect(new URL(url!).searchParams.get('api-version')).toBe('7.1');
  });
});

describe('resolveQueueRefs', () => {
  it('replaces an unresolved name with the matching numeric id', async () => {
    server.use(
      http.get(`${CORE}queues`, () =>
        HttpResponse.json({
          value: [
            { id: 1, name: 'Azure Pipelines' },
            { id: 8, name: 'MyCustomPool' },
          ],
        }),
      ),
    );
    const def = localDef();
    const input = def.environments[0]!.deployPhases![0]!.deploymentInput as AgentDeploymentInput;
    expect(input.queueId).toBe(0);
    expect(readUnresolvedQueue(input)).toEqual({ name: 'Azure Pipelines' });

    await resolveQueueRefs(def, client());

    expect(input.queueId).toBe(1);
    expect(readUnresolvedQueue(input)).toBeUndefined();
  });

  it('is a no-op when the definition has no name-based references', async () => {
    let called = false;
    server.use(
      http.get(`${CORE}queues`, () => {
        called = true;
        return HttpResponse.json({ value: [] });
      }),
    );
    const def = releasePipeline({ org: 'o', project: 'p', name: 'r' })
      .environment('s', (e) =>
        e.agentPhase((p) => p.pool({ queueId: 42 }).workflowTask({ taskId: 'tid', version: '1.*', enabled: true })),
      )
      .toDefinition();
    await resolveQueueRefs(def, client());
    expect(called).toBe(false);
  });

  it('throws UnknownQueueError listing the available queues', async () => {
    server.use(
      http.get(`${CORE}queues`, () =>
        HttpResponse.json({
          value: [
            { id: 1, name: 'Azure Pipelines' },
            { id: 8, name: 'MyCustomPool' },
          ],
        }),
      ),
    );
    const def = releasePipeline({ org: 'o', project: 'p', name: 'r' })
      .environment('s', (e) =>
        e.agentPhase((p) => p.pool('Nope').workflowTask({ taskId: 'tid', version: '1.*', enabled: true })),
      )
      .toDefinition();
    const err = await resolveQueueRefs(def, client()).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(UnknownQueueError);
    expect((err as UnknownQueueError).queueName).toBe('Nope');
    expect((err as UnknownQueueError).availableQueues).toEqual(['Azure Pipelines', 'MyCustomPool']);
  });

  it('one listQueues call services many references', async () => {
    let calls = 0;
    server.use(
      http.get(`${CORE}queues`, () => {
        calls++;
        return HttpResponse.json({ value: [{ id: 1, name: 'Azure Pipelines' }] });
      }),
    );
    const def = releasePipeline({ org: 'o', project: 'p', name: 'r' })
      .environment('a', (e) =>
        e.agentPhase((p) => p.pool('Azure Pipelines').workflowTask({ taskId: 'tid', version: '1.*', enabled: true })),
      )
      .environment('b', (e) =>
        e.agentPhase((p) => p.pool('Azure Pipelines').workflowTask({ taskId: 'tid', version: '1.*', enabled: true })),
      )
      .toDefinition();
    await resolveQueueRefs(def, client());
    expect(calls).toBe(1);
  });
});

describe('diffAgainstServer auto-resolves before diffing', () => {
  it('resolves queue names so a name-only local diffs cleanly against a numeric server', async () => {
    server.use(
      http.get(`${CORE}queues`, () =>
        HttpResponse.json({ value: [{ id: 1, name: 'Azure Pipelines' }] }),
      ),
      http.get(`${VSRM}definitions`, () =>
        HttpResponse.json({ value: [{ id: 42, name: 'web-release', revision: 3 }] }),
      ),
      http.get(`${VSRM}definitions/42`, () => {
        const def = localDef();
        // Server has the resolved numeric queueId.
        const phase = def.environments[0]!.deployPhases![0]!.deploymentInput as AgentDeploymentInput;
        phase.queueId = 1;
        // Server's def is fully materialized; clear our marker since JSON.parse wouldn't preserve it.
        return HttpResponse.json(JSON.parse(JSON.stringify(def)));
      }),
    );

    const local = localDef();
    const { nodes } = await diffAgainstServer(local, client());
    // After resolution + diff, no spurious queueId mismatch.
    const queueIdNode = nodes.find((n) => n.path.endsWith('.queueId'));
    expect(queueIdNode).toBeUndefined();
  });
});
