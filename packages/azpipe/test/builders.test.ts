import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  pipeline,
  script,
  task,
  checkout,
  include,
  JobBuilder,
  DeploymentJobBuilder,
  StageBuilder,
} from '../src/index.js';

describe('PipelineBuilder', () => {
  it('builds a simple stages pipeline and validates', () => {
    const yml = pipeline()
      .name('CI')
      .trigger({ branches: { include: ['main'] } })
      .pool({ vmImage: 'ubuntu-latest' })
      .stage('Build', (s) =>
        s.job('compile', (j) =>
          j.step(checkout('self')).step(script('npm ci')).step(script('npm run build')),
        ),
      )
      .toYaml();

    expect(yml).toContain('stages:');
    expect(yml).toContain('- stage: Build');
    expect(yml).toContain('- job: compile');
    expect(yml).toContain('script: npm ci');
  });

  it('produces stable snapshot output', () => {
    const yml = pipeline()
      .pool({ vmImage: 'ubuntu-latest' })
      .job('a', (j) => j.step(task('NodeTool@0', { inputs: { versionSpec: '20.x' } })))
      .toYaml();
    expect(yml).toMatchInlineSnapshot(`
      "pool:
        vmImage: ubuntu-latest
      jobs:
        - job: a
          steps:
            - task: NodeTool@0
              inputs:
                versionSpec: 20.x
      "
    `);
  });

  it('uses jobs mode when no stages added', () => {
    const obj = pipeline()
      .job('a', (j) => j.step(script('x')))
      .toObject();
    expect(obj.jobs).toBeDefined();
    expect(obj.stages).toBeUndefined();
  });

  it('uses steps mode for single-job pipelines', () => {
    const obj = pipeline().step(script('x')).toObject();
    expect(obj.steps).toBeDefined();
    expect(obj.jobs).toBeUndefined();
  });
});

describe('dependsOn accepts builder references', () => {
  it('resolves a single JobBuilder to its name', () => {
    const compile = new JobBuilder('compile');
    const test = new JobBuilder('test');
    test.dependsOn(compile);
    expect(test.toObject().dependsOn).toBe('compile');
  });

  it('resolves an array of mixed strings and JobBuilders', () => {
    const a = new JobBuilder('a');
    const b = new JobBuilder('b');
    const c = new JobBuilder('c');
    c.dependsOn([a, 'b']);
    expect(c.toObject().dependsOn).toEqual(['a', 'b']);
    void b;
  });

  it('accepts a DeploymentJobBuilder as a job dep', () => {
    const deploy = new DeploymentJobBuilder('deploy', { environment: 'prod' });
    const verify = new JobBuilder('verify');
    verify.dependsOn(deploy);
    expect(verify.toObject().dependsOn).toBe('deploy');
  });

  it('resolves a single StageBuilder to its name', () => {
    const build = new StageBuilder('Build');
    const test = new StageBuilder('Test');
    test.dependsOn(build);
    expect(test.toObject().dependsOn).toBe('Build');
  });

  it('resolves an array of StageBuilders', () => {
    const a = new StageBuilder('A');
    const b = new StageBuilder('B');
    const c = new StageBuilder('C');
    c.dependsOn([a, b]);
    expect(c.toObject().dependsOn).toEqual(['A', 'B']);
  });

  it('exposes a read-only name getter on every builder', () => {
    expect(new StageBuilder('S').name).toBe('S');
    expect(new JobBuilder('J').name).toBe('J');
    expect(new DeploymentJobBuilder('D', { environment: 'prod' }).name).toBe('D');
  });

  it('end-to-end: builder-based dependsOn produces the right YAML', () => {
    const yml = pipeline()
      .stage('Build', (s) => s.job('compile', (j) => j.step(script('npm run build'))))
      .stage('Test', (s) => {
        // declared at the same indent — easier to grab by name from outer scope.
        s.dependsOn('Build').job('unit', (j) => j.step(script('npm test')));
      })
      .toYaml();
    expect(yml).toContain('dependsOn: Build');
  });
});

describe('include()', () => {
  const here = dirname(fileURLToPath(import.meta.url));
  let tmpDir: string;

  it('reads a file given an explicit baseUrl', () => {
    tmpDir = mkdtempSync(join(here, '.tmp-include-'));
    writeFileSync(join(tmpDir, 'hello.sh'), 'echo hello\n');
    const contents = include('./hello.sh', new URL(`file://${tmpDir}/`).href);
    expect(contents).toBe('echo hello\n');
    rmSync(tmpDir, { recursive: true });
  });

  it('infers the caller file URL when baseUrl is omitted', () => {
    // Write a script next to this test file so the implicit resolution works.
    const scriptPath = join(here, 'hello-implicit.sh');
    writeFileSync(scriptPath, 'echo implicit\n');
    try {
      const contents = include('./hello-implicit.sh');
      expect(contents).toBe('echo implicit\n');
    } finally {
      rmSync(scriptPath);
    }
  });
});
