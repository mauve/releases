import { afterEach, describe, expect, it, vi } from 'vitest';
import { getToken, SystemAccessTokenCredential } from '../src/auth.js';

// Stub DefaultAzureCredential so tests never talk to Entra.
vi.mock('@azure/identity', () => ({
  DefaultAzureCredential: class {
    async getToken() {
      return { token: 'entra-token', expiresOnTimestamp: Date.now() + 3_600_000 };
    }
  },
}));

afterEach(() => {
  delete process.env['SYSTEM_ACCESSTOKEN'];
});

describe('getToken()', () => {
  it('uses an explicit credential when provided', async () => {
    const cred = new SystemAccessTokenCredential('explicit-sat');
    const token = await getToken({ credential: cred });
    expect(token).toBe('explicit-sat');
  });

  it('returns SYSTEM_ACCESSTOKEN when set in env (no Entra round-trip)', async () => {
    process.env['SYSTEM_ACCESSTOKEN'] = 'pipeline-job-token';
    const token = await getToken();
    expect(token).toBe('pipeline-job-token');
  });

  it('falls back to DefaultAzureCredential when SYSTEM_ACCESSTOKEN is absent', async () => {
    const token = await getToken();
    expect(token).toBe('entra-token');
  });

  it('explicit credential takes precedence over SYSTEM_ACCESSTOKEN', async () => {
    process.env['SYSTEM_ACCESSTOKEN'] = 'ignored-sat';
    const cred = new SystemAccessTokenCredential('explicit-wins');
    const token = await getToken({ credential: cred });
    expect(token).toBe('explicit-wins');
  });
});

describe('SystemAccessTokenCredential', () => {
  it('returns the wrapped token regardless of scope argument', async () => {
    const cred = new SystemAccessTokenCredential('my-sat');
    const result = await cred.getToken('https://resource/.default');
    expect(result?.token).toBe('my-sat');
    expect(result?.expiresOnTimestamp).toBeGreaterThan(Date.now());
  });
});
