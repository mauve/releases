import { describe, expect, it } from 'vitest';
import {
  diff,
  unified,
  jsonPatch,
  matchGlob,
  pipelineDescriptor,
  releaseDescriptor,
  SERVER_MANAGED_PATHS,
} from '../src/diff/index.js';

describe('diff engine', () => {
  it('returns empty for equal values', () => {
    expect(diff({ a: 1 }, { a: 1 })).toEqual([]);
    expect(diff([1, 2, 3], [1, 2, 3])).toEqual([]);
  });

  it('detects scalar changes', () => {
    const r = diff({ a: 1 }, { a: 2 });
    expect(r).toEqual([{ path: '$.a', kind: 'change', before: 1, after: 2 }]);
  });

  it('detects added and removed keys', () => {
    const r = diff({ a: 1 }, { a: 1, b: 2 });
    expect(r).toEqual([{ path: '$.b', kind: 'add', after: 2 }]);
    const r2 = diff({ a: 1, b: 2 }, { a: 1 });
    expect(r2).toEqual([{ path: '$.b', kind: 'remove', before: 2 }]);
  });

  it('with no descriptor: arrays diff index-by-index', () => {
    const r = diff([1, 2], [1, 9, 3]);
    // Indices 1 and 2 differ.
    expect(r).toEqual([
      { path: '$[1]', kind: 'change', before: 2, after: 9 },
      { path: '$[2]', kind: 'add', after: 3 },
    ]);
  });

  it('with descriptor: pairs by identity, not index', () => {
    const before = { stages: [{ stage: 'A', x: 1 }, { stage: 'B', x: 2 }] };
    const after = { stages: [{ stage: 'B', x: 2 }, { stage: 'A', x: 1 }] };
    const r = diff(before, after, { descriptor: pipelineDescriptor });
    // Reorder is not a change when keyed by identity.
    expect(r).toEqual([]);
  });

  it('reports field-level changes inside identity-keyed elements', () => {
    const before = { stages: [{ stage: 'A', x: 1 }, { stage: 'B', x: 2 }] };
    const after = { stages: [{ stage: 'A', x: 1 }, { stage: 'B', x: 99 }] };
    const r = diff(before, after, { descriptor: pipelineDescriptor });
    expect(r).toEqual([{ path: '$.stages[B].x', kind: 'change', before: 2, after: 99 }]);
  });

  it('honors ignorePaths', () => {
    const r = diff(
      { revision: 1, name: 'a' },
      { revision: 2, name: 'a' },
      { ignorePaths: ['$.revision'] },
    );
    expect(r).toEqual([]);
  });

  it('SERVER_MANAGED_PATHS suppresses Azure-managed fields', () => {
    const before = { id: 5, revision: 12, modifiedOn: '2025-01-01', name: 'r1' };
    const after = { id: 5, revision: 13, modifiedOn: '2025-04-01', name: 'r2' };
    const r = diff(before, after, { ignorePaths: [...SERVER_MANAGED_PATHS] });
    expect(r).toEqual([{ path: '$.name', kind: 'change', before: 'r1', after: 'r2' }]);
  });
});

describe('matchGlob', () => {
  it('matches concrete identity paths against glob', () => {
    expect(matchGlob('$.stages[*]', '$.stages[Build]')).toBe(true);
    expect(matchGlob('$.stages[*]', '$.stages[0]')).toBe(true);
    expect(matchGlob('$.stages[*].jobs[*]', '$.stages[Build].jobs[compile]')).toBe(true);
    expect(matchGlob('$.stages[*]', '$.environments[Build]')).toBe(false);
  });
});

describe('release descriptor pairs environments and tasks correctly', () => {
  const before = {
    environments: [
      {
        name: 'staging',
        rank: 1,
        deployPhases: [
          {
            rank: 1,
            workflowTasks: [
              { taskId: 'guid-a', refName: '', name: 'install', inputs: { v: '20.x' } },
            ],
          },
        ],
      },
    ],
  };
  const after = {
    environments: [
      {
        name: 'staging',
        rank: 1,
        deployPhases: [
          {
            rank: 1,
            workflowTasks: [
              { taskId: 'guid-a', refName: '', name: 'install', inputs: { v: '22.x' } },
            ],
          },
        ],
      },
    ],
  };

  it('reports a single attribute-level change deep inside the structure', () => {
    const r = diff(before, after, { descriptor: releaseDescriptor });
    expect(r).toHaveLength(1);
    expect(r[0]?.path).toBe(
      '$.environments[staging].deployPhases[1].workflowTasks[guid-a@#install].inputs.v',
    );
    expect(r[0]?.kind).toBe('change');
  });
});

describe('renderers', () => {
  it('unified prints a stable, sorted format', () => {
    const nodes = diff({ a: 1, b: 2 }, { a: 1, b: 3, c: 4 });
    const text = unified(nodes);
    expect(text).toContain('@ $.b');
    expect(text).toContain('- 2');
    expect(text).toContain('+ 3');
    expect(text).toContain('@ $.c');
    expect(text).toContain('+ 4');
  });

  it('jsonPatch produces RFC 6902-style ops', () => {
    const nodes = diff({ a: 1 }, { a: 2, b: 3 });
    const ops = jsonPatch(nodes);
    expect(ops).toEqual([
      { op: 'replace', path: '/a', value: 2 },
      { op: 'add', path: '/b', value: 3 },
    ]);
  });

  it('jsonPatch escapes ~ and / in identity segments', () => {
    const nodes = diff({}, { 'a/b~c': 1 });
    expect(jsonPatch(nodes)).toEqual([{ op: 'add', path: '/a~1b~0c', value: 1 }]);
  });
});
