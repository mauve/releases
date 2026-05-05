import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  keepLatestMoniker,
  normalizeDescription,
  parseVariablesPage,
} from '../scripts/parse-markdown.js';

const here = dirname(fileURLToPath(import.meta.url));
const buildMd = readFileSync(resolve(here, 'fixtures/sample-build-vars.md'), 'utf8');
const releaseMd = readFileSync(resolve(here, 'fixtures/sample-release-vars.md'), 'utf8');

describe('keepLatestMoniker', () => {
  it('drops blocks that do not include the latest moniker', () => {
    const filtered = keepLatestMoniker(buildMd);
    expect(filtered).toContain('Build.BuildId');
    expect(filtered).not.toContain('Old.Variable');
  });

  it('returns markdown unchanged when there are no moniker blocks', () => {
    const md = '# header\n| A | B |\n|---|---|\n| x | y |\n';
    expect(keepLatestMoniker(md)).toBe(md);
  });
});

describe('parseVariablesPage', () => {
  it('extracts variable rows from the build fixture', () => {
    const vars = parseVariablesPage(buildMd, 'pipeline');
    const names = vars.map((v) => v.name).sort();
    expect(names).toEqual(['Agent.OS', 'Build.BuildId', 'Build.SourceBranch', 'System.AccessToken', 'TF_BUILD']);
  });

  it('captures the description and `availableInTemplates` when present', () => {
    const vars = parseVariablesPage(buildMd, 'pipeline');
    const buildId = vars.find((v) => v.name === 'Build.BuildId')!;
    expect(buildId.description).toBe('The ID of the record for the completed build.');
    expect(buildId.availableInTemplates).toBe(true);
    const branch = vars.find((v) => v.name === 'Build.SourceBranch')!;
    expect(branch.availableInTemplates).toBe(false);
  });

  it('parses a 2-column table without the templates column', () => {
    const vars = parseVariablesPage(releaseMd, 'release');
    const rid = vars.find((v) => v.name === 'Release.ReleaseId')!;
    expect(rid.description).toBe('The identifier of the current release record.');
    expect(rid.availableInTemplates).toBeUndefined();
  });

  it('marks the source page on every variable', () => {
    expect(parseVariablesPage(buildMd, 'pipeline').every((v) => v.source === 'pipeline')).toBe(
      true,
    );
    expect(parseVariablesPage(releaseMd, 'release').every((v) => v.source === 'release')).toBe(
      true,
    );
  });

  it('skips rows whose first cell is not a recognizable variable name', () => {
    const md = `| Variable | Description |\n|----------|-------------|\n| **Section header** | not a var |\n| **Build.X** | a real var |\n`;
    const vars = parseVariablesPage(md, 'pipeline');
    expect(vars.map((v) => v.name)).toEqual(['Build.X']);
  });

  it('keeps TF_BUILD even though it has no dot', () => {
    const vars = parseVariablesPage(buildMd, 'pipeline');
    expect(vars.find((v) => v.name === 'TF_BUILD')).toBeDefined();
  });
});

describe('normalizeDescription', () => {
  it('returns identical strings for descriptions that differ only in formatting', () => {
    const a = 'The ID of the record for the **completed** build.';
    const b = 'The id of the record for the completed build.';
    expect(normalizeDescription(a)).toBe(normalizeDescription(b));
  });

  it('strips markdown links to their text', () => {
    const s = normalizeDescription('See [the docs](https://example.com).');
    expect(s).toBe('see the docs.');
  });
});
