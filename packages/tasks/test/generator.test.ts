import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  generateTaskFile,
  generateConnectionsFile,
  type TaskJson,
} from '../scripts/generator.js';

const here = dirname(fileURLToPath(import.meta.url));
const fixture = JSON.parse(
  readFileSync(resolve(here, 'fixtures/sample-task.json'), 'utf8'),
) as TaskJson;

describe('generator', () => {
  const result = generateTaskFile(fixture, 'SampleTaskV2', ['AzureRM']);
  if (!result) throw new Error('generator returned null');
  const { fnName, relPath, contents } = result;

  it('derives the function name from task name + major version', () => {
    expect(fnName).toBe('sampleTaskV2');
  });

  it('writes to a kebab-case folder', () => {
    expect(relPath).toBe('sample-task/v2.ts');
  });

  it('imports runtime and connection types', () => {
    expect(contents).toContain(
      `import { makeTask, type TaskStepOptions } from '../../runtime.js';`,
    );
    expect(contents).toContain(
      `import type { AzureRMConnection } from '../connections.js';`,
    );
  });

  it('emits a typed Inputs interface with required vs optional honoured', () => {
    expect(contents).toContain('export interface SampleTaskV2Inputs {');
    // required: true, no visibleRule → required
    expect(contents).toMatch(/"subscription":\s*AzureRMConnection;/);
    expect(contents).toMatch(/"scriptType":\s*"ps" \| "bash" \| "pscore";/);
    // required: true BUT has visibleRule → optional
    expect(contents).toMatch(/"inlineScript"\?:\s*string;/);
    // not required → optional
    expect(contents).toMatch(/"timeoutSeconds"\?:\s*number;/);
    expect(contents).toMatch(/"ignoreErrors"\?:\s*boolean;/);
  });

  it('copies the input label and helpMarkDown into TSDoc', () => {
    expect(contents).toContain('* Azure subscription');
    expect(contents).toContain('* Pick the subscription.');
    expect(contents).toContain('* Script Type');
    expect(contents).toContain('* Type of script to run.');
  });

  it('renders picklist value labels as TSDoc bullets', () => {
    expect(contents).toContain('* - `ps` — PowerShell');
    expect(contents).toContain('* - `bash` — Shell script');
    expect(contents).toContain('* - `pscore` — PowerShell Core');
  });

  it('emits @default tags when defaultValue is present', () => {
    expect(contents).toContain('* @default bash');
    expect(contents).toContain('* @default 30');
  });

  it('annotates inputs with a visibleRule constraint', () => {
    expect(contents).toContain('* Only meaningful when: `scriptLocation = inlineScript`');
  });

  it('annotates inputs with their groupName', () => {
    expect(contents).toContain('* In group: advanced');
  });

  it('emits a top-level TSDoc block with friendlyName, description, and @see links', () => {
    expect(contents).toContain('* Sample Task (test fixture)');
    expect(contents).toContain('* Hand-crafted task fixture used by the generator test suite.');
    expect(contents).toContain('* @see https://example.com/sample-task');
    expect(contents).toContain(
      '* @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/SampleTaskV2',
    );
  });

  it('escapes literal `*/` in source text so the comment block does not close', () => {
    // helpMarkDown contains `*/` — must not appear unescaped after a `*` of our own.
    // We insert a zero-width space (U+200B) between `*` and `/`.
    expect(contents).toMatch(/\*\u200B\//);
    // Still no raw `*/` followed by code that would be outside the comment.
    expect(contents).not.toMatch(/Help with `\*\//);
  });

  it('emits a function returning makeTask with the right task ref', () => {
    expect(contents).toContain('export function sampleTaskV2(');
    expect(contents).toContain('"SampleTask@2"');
  });
});

describe('connections file', () => {
  it('emits a branded type and constructor per kind', () => {
    const out = generateConnectionsFile(['AzureRM', 'GitHub']);
    expect(out).toContain('export type AzureRMConnection = string &');
    expect(out).toContain('export function azureRMConnection(name: string): AzureRMConnection');
    expect(out).toContain('export type GitHubConnection = string &');
    expect(out).toContain('export function gitHubConnection(name: string): GitHubConnection');
  });
});
