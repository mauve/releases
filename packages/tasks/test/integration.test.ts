import { describe, expect, it } from 'vitest';
import { pipeline, validatePipeline } from '@mauvezero/azpipe';
import { useNodeV1, azureCLIV2, azureRMConnection } from '../src/index.js';

describe('generated tasks integrate with @mauvezero/azpipe', () => {
  it('useNodeV1 produces a TaskStep that validates against the Azure schema', () => {
    const obj = pipeline()
      .pool({ vmImage: 'ubuntu-latest' })
      .job('build', (j) => j.step(useNodeV1({ version: '20.x' })))
      .toObject();
    const r = validatePipeline(obj);
    expect(r.ok).toBe(true);
  });

  it('azureCLIV2 with branded connection and picklist literals validates', () => {
    const obj = pipeline()
      .pool({ vmImage: 'ubuntu-latest' })
      .job('release', (j) =>
        j.step(
          azureCLIV2(
            {
              connectedServiceNameARM: azureRMConnection('prod-subscription'),
              scriptType: 'bash',
              scriptLocation: 'inlineScript',
              inlineScript: 'az group list',
            },
            { displayName: 'List groups' },
          ),
        ),
      )
      .toObject();
    const r = validatePipeline(obj);
    expect(r.ok).toBe(true);
  });

  it('serializes to expected YAML shape', () => {
    const yml = pipeline()
      .pool({ vmImage: 'ubuntu-latest' })
      .job('build', (j) =>
        j.step(useNodeV1({ version: '20.x' }, { displayName: 'Install Node' })),
      )
      .toYaml();
    expect(yml).toContain('task: UseNode@1');
    expect(yml).toContain('version: 20.x');
    expect(yml).toContain('displayName: Install Node');
  });
});
