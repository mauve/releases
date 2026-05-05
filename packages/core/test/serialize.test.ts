import { describe, expect, it } from 'vitest';
import { toYaml, toJson, validatePipeline, PipelineValidationError } from '../src/index.js';

describe('core serialize/validate', () => {
  it('emits valid YAML for a minimal jobs-only pipeline', () => {
    const yml = toYaml({
      jobs: [{ job: 'compile', steps: [{ script: 'echo hi' }] }],
    });
    expect(yml).toContain('jobs:');
    expect(yml).toContain('- job: compile');
    expect(yml).toContain('script: echo hi');
  });

  it('emits JSON ending in a newline', () => {
    const json = toJson({ jobs: [{ job: 'a', steps: [{ script: 'x' }] }] });
    expect(json.endsWith('\n')).toBe(true);
    expect(JSON.parse(json)).toEqual({ jobs: [{ job: 'a', steps: [{ script: 'x' }] }] });
  });

  it('accepts a stage-mode pipeline', () => {
    const r = validatePipeline({
      stages: [
        { stage: 'A', jobs: [{ job: 'a', steps: [{ script: 'x' }] }] },
      ],
    });
    expect(r.ok).toBe(true);
  });

  it('accepts numbers in string-typed fields (Azure-server-style coercion)', () => {
    const r = validatePipeline({
      jobs: [
        {
          job: 'a',
          steps: [{ checkout: 'self', fetchDepth: 1 }],
        },
      ],
    });
    expect(r.ok).toBe(true);
  });

  it('throws on invalid input when validation enabled', () => {
    expect(() => toYaml({ jobs: 42 })).toThrow(PipelineValidationError);
  });

  it('skips validation when validate=false', () => {
    expect(() => toYaml({ jobs: 42 }, { validate: false })).not.toThrow();
  });
});
