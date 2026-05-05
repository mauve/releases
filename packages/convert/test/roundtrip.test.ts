import { describe, expect, it } from 'vitest';
import { parse as parseYaml } from 'yaml';
import { yamlToTs } from '../src/index.js';

/**
 * Round-trip: convert YAML to TS, dynamically import the TS, materialize the
 * builder back to YAML, then assert deep equality of the parsed structure.
 *
 * The TS output is written to a temp file under packages/convert so the
 * Node.js module resolver walks up to the workspace root and resolves
 * `@mauvezero/azpipe` etc. via pnpm's symlinks.
 */

import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const scratchRoot = resolve(here, '../.tmp-roundtrip');

async function roundTrip(yamlText: string): Promise<{ before: unknown; after: unknown }> {
  const result = await yamlToTs(yamlText, { prettier: false });
  const dir = mkdtempSync(scratchRoot + '-');
  try {
    const entryPath = join(dir, 'pipeline.ts');
    writeFileSync(entryPath, result.files[0]!.contents);
    // Register tsx so .ts extensions resolve under Node.
    const api = await import('tsx/esm/api');
    api.register();
    const mod = (await import(pathToFileURL(entryPath).href)) as { default: { toObject: () => unknown } };
    const after = mod.default.toObject();
    const before = parseYaml(yamlText);
    return { before, after };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

describe('YAML round-trip', () => {
  it('preserves a single-stage single-job pipeline structurally', async () => {
    const yaml = `
name: CI
trigger:
  branches:
    include:
      - main
pool:
  vmImage: ubuntu-latest
stages:
  - stage: Build
    jobs:
      - job: compile
        steps:
          - checkout: self
            fetchDepth: 1
          - script: npm ci
            displayName: Install
          - script: npm run build
            displayName: Build
`;
    const { before, after } = await roundTrip(yaml);
    expect(after).toEqual(before);
  });

  it('round-trips a typed task step', async () => {
    const yaml = `
pool:
  vmImage: ubuntu-latest
jobs:
  - job: a
    steps:
      - task: UseNode@1
        inputs:
          version: 20.x
        displayName: Install Node
`;
    const { before, after } = await roundTrip(yaml);
    expect(after).toEqual(before);
  });
});
