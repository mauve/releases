import { describe, expect, it } from 'vitest';
import { yamlToTs } from '../src/index.js';

describe('yamlToTs', () => {
  it('converts a single-job pipeline with script + checkout steps', async () => {
    const yaml = `
name: CI
trigger:
  branches:
    include:
      - main
pool:
  vmImage: ubuntu-latest
jobs:
  - job: build
    steps:
      - checkout: self
        fetchDepth: 1
      - script: npm ci
        displayName: Install
      - script: npm run build
        displayName: Build
`;
    const result = await yamlToTs(yaml);
    expect(result.files).toHaveLength(1);
    expect(result.files[0]!.path).toBe('pipeline.ts');
    const src = result.files[0]!.contents;
    expect(src).toContain("from '@mauvezero/azpipe'");
    expect(src).toContain('pipeline()');
    expect(src).toContain(".name('CI')");
    expect(src).toContain('checkout(');
    expect(src).toContain("script('npm ci'");
    expect(src).toContain('vmImage');
  });

  it('rewrites known PreDef tokens', async () => {
    const yaml = `
pool: { vmImage: ubuntu-latest }
jobs:
  - job: a
    steps:
      - script: echo $(Build.SourceBranch)
`;
    const result = await yamlToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain('PreDef');
    expect(src).toContain('PreDef.Pipeline.Build.SourceBranch');
    expect(src).toContain("from '@mauvezero/azpipe-utils'");
  });

  it('emits typed task factories when the task is in the catalog', async () => {
    const yaml = `
pool: { vmImage: ubuntu-latest }
jobs:
  - job: a
    steps:
      - task: UseNode@1
        inputs:
          version: '20.x'
        displayName: Install Node
`;
    const result = await yamlToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain("from '@mauvezero/azpipe-tasks'");
    expect(src).toContain('useNodeV1');
    expect(src).not.toContain("task('UseNode@1'");
  });

  it('falls back to raw task() for known refs not in the typed catalog', async () => {
    const yaml = `
pool: { vmImage: ubuntu-latest }
jobs:
  - job: a
    steps:
      - task: NodeTool@0
        inputs:
          versionSpec: '20.x'
`;
    const result = await yamlToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain("task('NodeTool@0'");
  });

  it('falls back to raw task() for unknown task refs', async () => {
    const yaml = `
pool: { vmImage: ubuntu-latest }
jobs:
  - job: a
    steps:
      - task: SomeCustomTask@1
        inputs: { x: y }
`;
    const result = await yamlToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain("task('SomeCustomTask@1'");
    expect(src).toContain('inputs:');
  });

  it('emits stage configurator for multi-stage pipelines', async () => {
    const yaml = `
pool: { vmImage: ubuntu-latest }
stages:
  - stage: Build
    displayName: Build
    jobs:
      - job: compile
        steps:
          - script: npm run build
  - stage: Test
    dependsOn: Build
    jobs:
      - job: t
        steps:
          - script: npm test
`;
    const result = await yamlToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain(".stage('Build'");
    expect(src).toContain(".dependsOn('Build')");
    expect(src).toContain(".stage('Test'");
  });

  it('quotes object keys that need it', async () => {
    const yaml = `
variables:
  - name: weird-name
    value: hi
pool: { vmImage: ubuntu-latest }
steps:
  - script: echo ok
`;
    const result = await yamlToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain(".variable('weird-name', 'hi')");
  });

  it('emits a sibling template file when loadTemplate provides one', async () => {
    const main = `
pool: { vmImage: ubuntu-latest }
stages:
  - stage: Test
    jobs:
      - template: templates/build-and-test.yml
        parameters:
          runLint: true
`;
    const tplYaml = `parameters:
  - name: runLint
    type: boolean
    default: true
jobs:
  - job: build_and_test
    steps:
      - script: npm test
`;
    const result = await yamlToTs(main, {
      loadTemplate: (p) => (p === 'templates/build-and-test.yml' ? tplYaml : undefined),
    });
    expect(result.files).toHaveLength(2);
    const entry = result.files[0]!.contents;
    const tpl = result.files[1]!.contents;
    // Default inline mode: template becomes a function call.
    expect(entry).toContain('buildAndTest(');
    expect(entry).toContain('.jobs(');
    expect(tpl).toContain('export function buildAndTest');
    expect(tpl).toContain('AnyJob[]');
  });

  it('emits defineTemplate/extend when inlineTemplates is false', async () => {
    const main = `
pool: { vmImage: ubuntu-latest }
stages:
  - stage: Test
    jobs:
      - template: templates/build-and-test.yml
        parameters:
          runLint: true
`;
    const tplYaml = `parameters:
  - name: runLint
    type: boolean
    default: true
jobs:
  - job: build_and_test
    steps:
      - script: npm test
`;
    const result = await yamlToTs(main, {
      inlineTemplates: false,
      loadTemplate: (p) => (p === 'templates/build-and-test.yml' ? tplYaml : undefined),
    });
    expect(result.files).toHaveLength(2);
    const entry = result.files[0]!.contents;
    const tpl = result.files[1]!.contents;
    expect(entry).toContain('extend(buildAndTest');
    expect(tpl).toContain('defineTemplate');
    expect(tpl).toContain("kind: 'jobs'");
  });
});
