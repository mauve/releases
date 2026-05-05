import { describe, expect, it } from 'vitest';
import {
  defineTemplate,
  extend,
  renderTemplateFile,
  mergeTriggers,
  mergeVariables,
} from '../src/index.js';

describe('defineTemplate', () => {
  const buildAndTest = defineTemplate({
    name: 'build-and-test',
    kind: 'jobs',
    parameters: {
      nodeVersion: { type: 'string', default: '20.x' },
      runLint: { type: 'boolean', default: true },
    },
    body: ({ nodeVersion }) => ({
      jobs: [
        {
          job: 'build',
          steps: [{ task: 'NodeTool@0', inputs: { versionSpec: nodeVersion as unknown as string } }],
        },
      ],
    }),
  });

  it('uses templates/<name>.yml as the default path', () => {
    expect(buildAndTest.path).toBe('templates/build-and-test.yml');
  });

  it('extend() returns a typed { template, parameters } reference', () => {
    const ref = extend(buildAndTest, { runLint: false });
    expect(ref.template).toBe('templates/build-and-test.yml');
    expect(ref.parameters).toEqual({ runLint: false });
  });

  it('renderTemplateFile() emits parameters block plus body with placeholders', () => {
    const file = renderTemplateFile(buildAndTest);
    expect(file['parameters']).toEqual([
      { name: 'nodeVersion', type: 'string', default: '20.x' },
      { name: 'runLint', type: 'boolean', default: true },
    ]);
    const jobs = file['jobs'] as Array<{ steps: Array<{ inputs: { versionSpec: string } }> }>;
    expect(jobs[0]?.steps[0]?.inputs.versionSpec).toBe('${{ parameters.nodeVersion }}');
  });
});

describe('mergeTriggers', () => {
  it('returns "none" if either side is "none"', () => {
    expect(mergeTriggers('none', { branches: { include: ['main'] } })).toBe('none');
    expect(mergeTriggers(['main'], 'none')).toBe('none');
  });

  it('unions include lists', () => {
    const r = mergeTriggers(['main'], ['develop']) as { branches: { include: string[] } };
    expect(r.branches.include.sort()).toEqual(['develop', 'main']);
  });
});

describe('mergeVariables', () => {
  it('later named vars override earlier', () => {
    const out = mergeVariables(
      [{ name: 'A', value: '1' }],
      [{ name: 'A', value: '2' }, { group: 'g' }],
    );
    expect(out).toEqual([{ group: 'g' }, { name: 'A', value: '2' }]);
  });
});
