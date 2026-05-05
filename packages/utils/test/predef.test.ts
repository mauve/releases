import { describe, expect, it, expectTypeOf } from 'vitest';
import { PreDef, releaseArtifactVar } from '../src/index.js';

describe('PreDef.Pipeline', () => {
  it('exposes Build.* variables as $(Name) macros', () => {
    expect(PreDef.Pipeline.Build.SourceBranch).toBe('$(Build.SourceBranch)');
    expect(PreDef.Pipeline.Build.BuildId).toBe('$(Build.BuildId)');
    expect(PreDef.Pipeline.Build.ArtifactStagingDirectory).toBe(
      '$(Build.ArtifactStagingDirectory)',
    );
  });

  it('exposes Pipeline.Workspace', () => {
    expect(PreDef.Pipeline.Pipeline.Workspace).toBe('$(Pipeline.Workspace)');
  });

  it('exact-string typing on a representative leaf', () => {
    expectTypeOf(PreDef.Pipeline.Build.SourceBranch).toEqualTypeOf<'$(Build.SourceBranch)'>();
  });
});

describe('PreDef.Release', () => {
  it('exposes Release.* variables as $(Name) macros', () => {
    expect(PreDef.Release.Release.ReleaseId).toBe('$(Release.ReleaseId)');
    expect(PreDef.Release.Release.EnvironmentName).toBe('$(Release.EnvironmentName)');
  });

  it('exposes the Artifacts(alias) factory', () => {
    expect(typeof PreDef.Release.Artifacts).toBe('function');
    const v = PreDef.Release.Artifacts('web');
    expect(v.BuildId).toBe('$(Release.Artifacts.web.BuildId)');
    expect(v.SourceBranch).toBe('$(Release.Artifacts.web.SourceBranch)');
  });
});

describe('PreDef.Shared', () => {
  it('contains variables whose meaning is identical across contexts', () => {
    expect(PreDef.Shared.System.AccessToken).toBe('$(System.AccessToken)');
    expect(PreDef.Shared.Agent.OS).toBe('$(Agent.OS)');
    expect(PreDef.Shared.Agent.OSArchitecture).toBe('$(Agent.OSArchitecture)');
  });

  it('TF_BUILD lives at the top level of Shared', () => {
    expect(PreDef.Shared.TF_BUILD).toBe('$(TF_BUILD)');
  });
});

describe('releaseArtifactVar', () => {
  it('returns the same shape as PreDef.Release.Artifacts', () => {
    const a = releaseArtifactVar('web');
    const b = PreDef.Release.Artifacts('web');
    expect(a).toEqual(b);
    // Type identity: both call paths produce the same object type.
    expectTypeOf<ReturnType<typeof releaseArtifactVar>>().toEqualTypeOf<
      ReturnType<typeof PreDef.Release.Artifacts>
    >();
  });

  it('all per-artifact variables interpolate the alias correctly', () => {
    const v = releaseArtifactVar('my-source');
    expect(v.BuildId).toBe('$(Release.Artifacts.my-source.BuildId)');
    expect(v.BuildNumber).toBe('$(Release.Artifacts.my-source.BuildNumber)');
    expect(v.DefinitionName).toBe('$(Release.Artifacts.my-source.DefinitionName)');
    expect(v.SourceBranch).toBe('$(Release.Artifacts.my-source.SourceBranch)');
    expect(v.SourceVersion).toBe('$(Release.Artifacts.my-source.SourceVersion)');
  });
});

describe('TSDoc fidelity (sanity check on a representative entry)', () => {
  it('source files contain the description text', async () => {
    // We can't read TSDoc at runtime; spot-check the generated source instead.
    const { readFileSync } = await import('node:fs');
    const { dirname, resolve } = await import('node:path');
    const { fileURLToPath } = await import('node:url');
    const here = dirname(fileURLToPath(import.meta.url));
    const sharedSrc = readFileSync(
      resolve(here, '../src/predef/shared.ts'),
      'utf8',
    );
    expect(sharedSrc).toContain('@azureDocs');
    expect(sharedSrc).toMatch(/operating system of the agent host/i);
    const pipelineSrc = readFileSync(
      resolve(here, '../src/predef/pipeline.ts'),
      'utf8',
    );
    expect(pipelineSrc).toMatch(/branch.*triggering repo/i);
  });
});
