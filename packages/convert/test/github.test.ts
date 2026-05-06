import { describe, expect, it } from 'vitest';
import { ghaToTs } from '../src/index.js';

describe('ghaToTs', () => {
  it('converts a single-job workflow with run steps', async () => {
    const yaml = `
name: CI
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Install
        run: npm ci
      - name: Build
        run: npm run build
`;
    const result = await ghaToTs(yaml);
    expect(result.files).toHaveLength(1);
    expect(result.files[0]!.path).toBe('workflow.ts');
    const src = result.files[0]!.contents;
    expect(src).toContain("from '@mauvezero/ghactions'");
    expect(src).toContain('workflow()');
    expect(src).toContain(".name('CI')");
    expect(src).toContain('.on(');
    expect(src).toContain("'ubuntu-latest'");
    expect(src).toContain("run('npm ci'");
    expect(src).toContain("run('npm run build'");
    expect(result.warnings).toHaveLength(0);
  });

  it('emits push and pull_request triggers correctly', async () => {
    const yaml = `
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test
`;
    const result = await ghaToTs(yaml, { prettier: false });
    const src = result.files[0]!.contents;
    expect(src).toContain('push');
    expect(src).toContain('pull_request');
    expect(src).toContain("'main'");
    expect(src).toContain("'develop'");
  });

  it('emits typed factory for a known action', async () => {
    const yaml = `
on:
  push: {}
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
`;
    const result = await ghaToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain("from '@mauvezero/ghactions-actions'");
    expect(src).toContain('actionsCheckoutV6');
    expect(src).not.toContain("uses('actions/checkout@v6'");
  });

  it('falls back to uses() for an unknown action ref', async () => {
    const yaml = `
on:
  push: {}
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: my-org/custom-action@v1
        with:
          token: my-token
`;
    const result = await ghaToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain("uses('my-org/custom-action@v1'");
    // 'token' is a valid identifier so expr() emits it unquoted
    expect(src).toContain('token');
    expect(src).not.toContain("from '@mauvezero/ghactions-actions'");
  });

  it('passes with: inputs to typed action factory', async () => {
    const yaml = `
on:
  push: {}
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-node@v6
        with:
          node-version: '20'
          cache: pnpm
`;
    const result = await ghaToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain('actionsSetupNodeV6');
    // 'node-version' has a hyphen → quoted key; 'cache' is valid → unquoted
    expect(src).toContain("'node-version'");
    expect(src).toContain("'20'");
    // cache is a valid identifier key, emitted unquoted
    expect(src).toContain('cache');
    expect(src).toContain("'pnpm'");
  });

  it('converts multi-job workflow with needs: dependency', async () => {
    const yaml = `
on:
  push: {}
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
  test:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - run: npm test
  deploy:
    runs-on: ubuntu-latest
    needs: [build, test]
    steps:
      - run: ./deploy.sh
`;
    const result = await ghaToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain(".job('build'");
    expect(src).toContain(".job('test'");
    expect(src).toContain(".job('deploy'");
    expect(src).toContain(".needs([");
    expect(src).toContain("'build'");
    expect(src).toContain("'test'");
  });

  it('emits top-level env as .envs()', async () => {
    const yaml = `
on:
  push: {}
env:
  NODE_VERSION: '20'
  CI: 'true'
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: node --version
`;
    const result = await ghaToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain('.envs(');
    // Valid identifier keys are emitted unquoted by expr()
    expect(src).toContain('NODE_VERSION');
    expect(src).toContain("'20'");
  });

  it('emits job-level env as .envs()', async () => {
    const yaml = `
on:
  push: {}
jobs:
  build:
    runs-on: ubuntu-latest
    env:
      FOO: bar
    steps:
      - run: echo $FOO
`;
    const result = await ghaToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain('.envs(');
    // Valid identifier keys are emitted unquoted
    expect(src).toContain('FOO');
    expect(src).toContain("'bar'");
  });

  it('keeps multi-line run: scripts as inline template literals', async () => {
    const yaml = `
on:
  push: {}
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Build
        run: |
          npm ci
          npm run build
`;
    const result = await ghaToTs(yaml);
    expect(result.files).toHaveLength(1); // no extracted script files
    const src = result.files[0]!.contents;
    expect(src).toContain('npm ci');
    expect(src).toContain('npm run build');
  });

  it('emits workflow_dispatch trigger with inputs', async () => {
    const yaml = `
on:
  workflow_dispatch:
    inputs:
      environment:
        description: Target environment
        required: true
        type: string
        default: staging
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh
`;
    const result = await ghaToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain('workflow_dispatch');
    // 'environment' is a valid identifier key → unquoted; 'staging' is a value → quoted
    expect(src).toContain('environment');
    expect(src).toContain("'staging'");
  });

  it('emits step name, if, and env in step opts', async () => {
    const yaml = `
on:
  push: {}
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Build step
        if: github.ref == 'refs/heads/main'
        run: npm run build
        env:
          API_KEY: secret
`;
    const result = await ghaToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain("'Build step'");
    // if value contains single quotes so strLit uses double-quotes for the string
    expect(src).toContain('github.ref');
    // API_KEY is a valid identifier → unquoted key
    expect(src).toContain('API_KEY');
  });

  it('emits job if_ condition', async () => {
    const yaml = `
on:
  push: {}
jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - run: ./deploy.sh
`;
    const result = await ghaToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain('.if_(');
    expect(src).toContain("refs/heads/main");
  });

  it('uses a custom entryFileName when provided', async () => {
    const yaml = `
on:
  push: {}
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm test
`;
    const result = await ghaToTs(yaml, { entryFileName: 'ci.ts' });
    expect(result.files[0]!.path).toBe('ci.ts');
  });

  it('emits schedule trigger correctly', async () => {
    const yaml = `
on:
  schedule:
    - cron: '0 3 * * 1'
jobs:
  nightly:
    runs-on: ubuntu-latest
    steps:
      - run: npm run nightly
`;
    const result = await ghaToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain('schedule');
    expect(src).toContain("'0 3 * * 1'");
  });

  it('emits strategy.matrix correctly', async () => {
    const yaml = `
on:
  push: {}
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: ['18', '20', '22']
    steps:
      - run: npm test
`;
    const result = await ghaToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain('.strategy(');
    // 'matrix' and 'node' are valid identifiers → unquoted keys
    expect(src).toContain('matrix');
    expect(src).toContain("'18'");
    expect(src).toContain("'20'");
  });

  it('emits container configuration', async () => {
    const yaml = `
on:
  push: {}
jobs:
  build:
    runs-on: ubuntu-latest
    container:
      image: node:20
    steps:
      - run: npm test
`;
    const result = await ghaToTs(yaml);
    const src = result.files[0]!.contents;
    expect(src).toContain('.container(');
    expect(src).toContain("'node:20'");
  });

  it('throws on non-GHA YAML missing on: key', async () => {
    const yaml = `
trigger:
  branches:
    include: [main]
jobs:
  - job: build
    steps:
      - script: npm test
`;
    await expect(ghaToTs(yaml)).rejects.toThrow('missing "on:" trigger key');
  });

  it('warns about reusable workflow jobs', async () => {
    const yaml = `
on:
  push: {}
jobs:
  reuse:
    uses: org/repo/.github/workflows/shared.yml@main
`;
    const result = await ghaToTs(yaml);
    expect(result.warnings.some((w) => w.includes('reusable workflow'))).toBe(true);
  });
});
