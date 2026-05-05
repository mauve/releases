import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

// Try dist-relative path first (post-build), fall back to src-relative (during tests/dev).
function loadSchema(): unknown {
  const candidates = [
    resolve(here, '../src/schema/service-schema.json'),
    resolve(here, './schema/service-schema.json'),
    resolve(here, '../schema/service-schema.json'),
  ];
  for (const p of candidates) {
    try {
      return JSON.parse(readFileSync(p, 'utf8'));
    } catch {
      // try next
    }
  }
  throw new Error('Azure Pipelines schema not found. Run `pnpm sync-schema`.');
}

export const azurePipelinesSchema: unknown = loadSchema();
