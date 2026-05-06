import { describe, expect, it } from 'vitest';
import {
  workflow,
  WorkflowBuilder,
  GHJobBuilder,
  run,
  uses,
  toYaml,
} from '../src/index.js';

describe('WorkflowBuilder', () => {
  it('produces a minimal workflow snapshot', () => {
    const yaml = workflow()
      .name('CI')
      .on({ push: { branches: ['main'] } })
      .job('build', j =>
        j.runsOn('ubuntu-latest')
          .step(uses('actions/checkout@v4'))
          .step(run('npm test')),
      )
      .toYaml();

    expect(yaml).toMatchInlineSnapshot(`
      "name: CI
      on:
        push:
          branches:
            - main
      jobs:
        build:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - run: npm test
      "
    `);
  });

  it('serializes the on: key as a literal (not quoted as a boolean)', () => {
    const yaml = workflow()
      .on({ push: {} })
      .job('x', j => j.runsOn('ubuntu-latest').step(run('x')))
      .toYaml();
    // The YAML key should be `on:`, not `'on':` or `"on":`
    expect(yaml).toMatch(/^on:/m);
  });

  it('supports multiple triggers', () => {
    const yaml = workflow()
      .on({
        push: { branches: ['main'], tags: ['v*'] },
        pull_request: { branches: ['main'], types: ['opened', 'synchronize'] },
        workflow_dispatch: {},
      })
      .job('x', j => j.runsOn('ubuntu-latest').step(run('x')))
      .toYaml();

    expect(yaml).toContain('push:');
    expect(yaml).toContain('pull_request:');
    expect(yaml).toContain('workflow_dispatch:');
    expect(yaml).toContain("- opened");
    expect(yaml).toContain("- synchronize");
  });

  it('supports schedule trigger', () => {
    const yaml = workflow()
      .on({ schedule: [{ cron: '0 2 * * *' }] })
      .job('x', j => j.runsOn('ubuntu-latest').step(run('x')))
      .toYaml();

    expect(yaml).toContain('schedule:');
    expect(yaml).toContain('cron: 0 2 * * *');
  });

  it('supports env at workflow level', () => {
    const yaml = workflow()
      .on({ push: {} })
      .env('NODE_ENV', 'test')
      .envs({ DEBUG: 1, CI: true })
      .job('x', j => j.runsOn('ubuntu-latest').step(run('x')))
      .toYaml();

    expect(yaml).toContain('NODE_ENV: test');
    expect(yaml).toContain('DEBUG: 1');
    expect(yaml).toContain('CI: true');
  });

  it('supports workflow-level concurrency', () => {
    const yaml = workflow()
      .on({ push: {} })
      .concurrency('${{ github.workflow }}-${{ github.ref }}', true)
      .job('x', j => j.runsOn('ubuntu-latest').step(run('x')))
      .toYaml();

    expect(yaml).toContain('concurrency:');
    expect(yaml).toContain('cancel-in-progress: true');
  });

  it('supports permissions block', () => {
    const yaml = workflow()
      .on({ push: {} })
      .permissions({ contents: 'read', 'pull-requests': 'write' })
      .job('x', j => j.runsOn('ubuntu-latest').step(run('x')))
      .toYaml();

    expect(yaml).toContain('permissions:');
    expect(yaml).toContain('contents: read');
    expect(yaml).toContain('pull-requests: write');
  });

  it('throws when .on() is missing', () => {
    const b = new WorkflowBuilder().job('x', j => j.runsOn('ubuntu-latest').step(run('x')));
    expect(() => b.toObject()).toThrow('on()');
  });

  it('throws when no jobs are added', () => {
    const b = new WorkflowBuilder().on({ push: {} });
    expect(() => b.toObject()).toThrow('job()');
  });
});

describe('GHJobBuilder', () => {
  it('sets runs-on correctly', () => {
    const yaml = workflow()
      .on({ push: {} })
      .job('j', j => j.runsOn('windows-latest').step(run('dir')))
      .toYaml();

    expect(yaml).toContain('runs-on: windows-latest');
  });

  it('supports runs-on with array of labels', () => {
    const yaml = workflow()
      .on({ push: {} })
      .job('j', j => j.runsOn(['self-hosted', 'linux', 'x64']).step(run('echo hi')))
      .toYaml();

    expect(yaml).toContain('runs-on:');
    expect(yaml).toContain('- self-hosted');
    expect(yaml).toContain('- linux');
  });

  it('supports needs with string', () => {
    const yaml = workflow()
      .on({ push: {} })
      .job('build', j => j.runsOn('ubuntu-latest').step(run('npm run build')))
      .job('test', j => j.runsOn('ubuntu-latest').needs('build').step(run('npm test')))
      .toYaml();

    expect(yaml).toContain('needs: build');
  });

  it('supports needs with GHJobBuilder reference', () => {
    const buildJob = new GHJobBuilder('build');
    const yaml = workflow()
      .on({ push: {} })
      .job('build', j => {
        j.runsOn('ubuntu-latest').step(run('npm run build'));
        // copy state to reuse buildJob as needs ref
        buildJob.runsOn('ubuntu-latest').step(run('npm run build'));
      })
      .job('test', j => j.runsOn('ubuntu-latest').needs(buildJob).step(run('npm test')))
      .toYaml();

    expect(yaml).toContain('needs: build');
  });

  it('supports needs with array', () => {
    const yaml = workflow()
      .on({ push: {} })
      .job('build', j => j.runsOn('ubuntu-latest').step(run('npm run build')))
      .job('lint', j => j.runsOn('ubuntu-latest').step(run('npm run lint')))
      .job('test', j => j.runsOn('ubuntu-latest').needs(['build', 'lint']).step(run('npm test')))
      .toYaml();

    expect(yaml).toContain('needs:');
    expect(yaml).toContain('- build');
    expect(yaml).toContain('- lint');
  });

  it('supports if_() condition', () => {
    const yaml = workflow()
      .on({ push: {} })
      .job('deploy', j =>
        j.runsOn('ubuntu-latest')
          .if_("github.ref == 'refs/heads/main'")
          .step(run('./deploy.sh')),
      )
      .toYaml();

    expect(yaml).toContain("if: github.ref == 'refs/heads/main'");
  });

  it('supports matrix strategy', () => {
    const yaml = workflow()
      .on({ push: {} })
      .job('test', j =>
        j.runsOn('ubuntu-latest')
          .strategy({
            matrix: { node: [18, 20, 22] },
            'fail-fast': false,
          })
          .step(uses('actions/setup-node@v4', { with: { 'node-version': '${{ matrix.node }}' } }))
          .step(run('npm test')),
      )
      .toYaml();

    expect(yaml).toContain('strategy:');
    expect(yaml).toContain('matrix:');
    expect(yaml).toContain('- 18');
    expect(yaml).toContain('fail-fast: false');
  });

  it('supports timeout-minutes', () => {
    const yaml = workflow()
      .on({ push: {} })
      .job('j', j => j.runsOn('ubuntu-latest').timeoutMinutes(30).step(run('x')))
      .toYaml();

    expect(yaml).toContain('timeout-minutes: 30');
  });

  it('supports continue-on-error', () => {
    const yaml = workflow()
      .on({ push: {} })
      .job('j', j => j.runsOn('ubuntu-latest').continueOnError().step(run('x')))
      .toYaml();

    expect(yaml).toContain('continue-on-error: true');
  });

  it('supports environment', () => {
    const yaml = workflow()
      .on({ push: {} })
      .job('deploy', j =>
        j.runsOn('ubuntu-latest')
          .environment({ name: 'production', url: 'https://example.com' })
          .step(run('./deploy.sh')),
      )
      .toYaml();

    expect(yaml).toContain('environment:');
    expect(yaml).toContain('name: production');
    expect(yaml).toContain('url: https://example.com');
  });

  it('supports job-level env and outputs', () => {
    const yaml = workflow()
      .on({ push: {} })
      .job('j', j =>
        j.runsOn('ubuntu-latest')
          .env('MY_VAR', 'hello')
          .outputs({ result: '${{ steps.s.outputs.value }}' })
          .step(run('echo hello', { id: 's' })),
      )
      .toYaml();

    expect(yaml).toContain('MY_VAR: hello');
    expect(yaml).toContain('outputs:');
    expect(yaml).toContain('result: ${{ steps.s.outputs.value }}');
  });

  it('supports container configuration', () => {
    const yaml = workflow()
      .on({ push: {} })
      .job('j', j =>
        j.runsOn('ubuntu-latest')
          .container({ image: 'node:20', options: '--user 1001' })
          .step(run('npm test')),
      )
      .toYaml();

    expect(yaml).toContain('container:');
    expect(yaml).toContain('image: node:20');
    expect(yaml).toContain('options: --user 1001');
  });

  it('throws when runsOn is not set', () => {
    const b = new GHJobBuilder('j');
    b.step(run('x'));
    expect(() => b.toObject()).toThrow('runsOn()');
  });
});

describe('step factories', () => {
  it('run() creates a RunStep', () => {
    const step = run('npm test');
    expect(step).toEqual({ run: 'npm test' });
  });

  it('run() with all options', () => {
    const step = run('make build', {
      name: 'Build',
      shell: 'bash',
      'working-directory': './packages/core',
      id: 'build-step',
      if: "runner.os == 'Linux'",
      env: { CC: 'gcc' },
      'continue-on-error': true,
      'timeout-minutes': 10,
    });

    expect(step.run).toBe('make build');
    expect(step.name).toBe('Build');
    expect(step.shell).toBe('bash');
    expect(step['working-directory']).toBe('./packages/core');
    expect(step['continue-on-error']).toBe(true);
    expect(step['timeout-minutes']).toBe(10);
  });

  it('uses() creates a UsesStep', () => {
    const step = uses('actions/checkout@v4');
    expect(step).toEqual({ uses: 'actions/checkout@v4' });
  });

  it('uses() with with: block', () => {
    const step = uses('actions/setup-node@v4', {
      with: { 'node-version': '20', cache: 'npm' },
    });

    expect(step.uses).toBe('actions/setup-node@v4');
    expect(step.with?.['node-version']).toBe('20');
    expect(step.with?.['cache']).toBe('npm');
  });
});

describe('toYaml()', () => {
  it('serializes a workflow object directly', () => {
    const obj = {
      name: 'Test',
      on: { push: {} },
      jobs: {
        build: {
          'runs-on': 'ubuntu-latest',
          steps: [{ run: 'echo hi' }],
        },
      },
    };
    const yaml = toYaml(obj);
    expect(yaml).toContain('name: Test');
    expect(yaml).toContain('on:');
    expect(yaml).toContain('runs-on: ubuntu-latest');
  });
});
