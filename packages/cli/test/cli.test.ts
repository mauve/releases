import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const cliBin = resolve(here, '../dist/bin.js');
// Stage scratch files inside this package so node_modules resolution walks up
// to the workspace root and finds @mauve/azpipe.
const scratchRoot = resolve(here, '../.tmp');

let dir: string;

beforeAll(() => {
  dir = mkdtempSync(join(scratchRoot + '-'));
});

afterAll(() => {
  if (dir) rmSync(dir, { recursive: true, force: true });
});

describe('azpipe CLI', () => {
  it('compiles a TS pipeline to a valid YAML file', () => {
    const entry = join(dir, 'pipeline.ts');
    const out = join(dir, 'azure-pipelines.yml');
    writeFileSync(
      entry,
      `import { pipeline, script } from '@mauvezero/azpipe';\n` +
        `export default pipeline()\n` +
        `  .pool({ vmImage: 'ubuntu-latest' })\n` +
        `  .job('a', j => j.step(script('echo hi')));\n`,
    );
    execFileSync('node', [cliBin, 'build', entry, '--out', out], { stdio: 'pipe' });
    const yml = readFileSync(out, 'utf8');
    expect(yml).toContain('jobs:');
    expect(yml).toContain('script: echo hi');
  });

  it('imports a YAML pipeline and round-trips back through build', () => {
    const yamlPath = join(dir, 'azure-pipelines.yml');
    const tsPath = join(dir, 'pipeline.ts');
    const regenPath = join(dir, 'regen.yml');
    writeFileSync(
      yamlPath,
      `name: CI\n` +
        `pool:\n  vmImage: ubuntu-latest\n` +
        `jobs:\n` +
        `  - job: build\n` +
        `    steps:\n` +
        `      - script: npm ci\n` +
        `        displayName: Install\n` +
        `      - task: UseNode@1\n` +
        `        inputs:\n` +
        `          version: 20.x\n`,
    );
    execFileSync('node', [cliBin, 'build', 'import', yamlPath, '--out', tsPath], { stdio: 'pipe' });
    const ts = readFileSync(tsPath, 'utf8');
    expect(ts).toContain('useNodeV1');
    expect(ts).toContain('pipeline()');

    execFileSync('node', [cliBin, 'build', tsPath, '--out', regenPath], { stdio: 'pipe' });
    const regen = readFileSync(regenPath, 'utf8');
    expect(regen).toContain('UseNode@1');
    expect(regen).toContain('script: npm ci');
    expect(regen).toContain('displayName: Install');
    expect(regen).toContain('vmImage: ubuntu-latest');
  });

  it('imports a release JSON via file and round-trips through release diff', () => {
    const jsonPath = join(dir, 'release.json');
    const tsPath = join(dir, 'release.ts');
    writeFileSync(
      jsonPath,
      JSON.stringify({
        name: 'test-release',
        artifacts: [
          {
            alias: 'web',
            type: 'Build',
            isPrimary: true,
            definitionReference: {
              definition: { id: '100', name: '100' },
              defaultVersionType: { id: 'latestType', name: 'latestType' },
            },
          },
        ],
        environments: [
          {
            name: 'staging',
            rank: 1,
            preDeployApprovals: { approvals: [{ rank: 1, isAutomated: true, isNotificationOn: false }] },
            postDeployApprovals: { approvals: [{ rank: 1, isAutomated: true, isNotificationOn: false }] },
            deployPhases: [
              {
                rank: 1,
                phaseType: 'agentBasedDeployment',
                name: 'Agent job',
                workflowTasks: [],
                deploymentInput: { agentSpecification: { identifier: 'ubuntu-latest' } },
              },
            ],
            retentionPolicy: { daysToKeep: 30, releasesToKeep: 3, retainBuild: true },
          },
        ],
      }),
    );
    execFileSync(
      'node',
      [cliBin, 'release', 'import', jsonPath, '--out', tsPath, '--org', 'o', '--project', 'p'],
      { stdio: 'pipe' },
    );
    const ts = readFileSync(tsPath, 'utf8');
    expect(ts).toContain('releasePipeline');
    expect(ts).toContain('buildArtifact');
    expect(ts).toContain("alias: 'web'");
    expect(ts).toContain(".environment('staging'");
  });
});
