import { describe, expect, it } from 'vitest';
import type { ReleaseDefinition } from '@mauvezero/azpipe-releases';
import { releaseJsonToTs } from '../src/index.js';

const baseEnv = {
  rank: 1,
  preDeployApprovals: { approvals: [{ rank: 1, isAutomated: true, isNotificationOn: false }] },
  postDeployApprovals: { approvals: [{ rank: 1, isAutomated: true, isNotificationOn: false }] },
  deployPhases: [],
  retentionPolicy: { daysToKeep: 30, releasesToKeep: 3, retainBuild: true },
};

describe('releaseJsonToTs', () => {
  it('emits a minimal release pipeline', async () => {
    const def: ReleaseDefinition = {
      name: 'web-release',
      releaseNameFormat: 'Release-$(rev:r)',
      artifacts: [
        {
          alias: 'web',
          type: 'Build',
          isPrimary: true,
          definitionReference: {
            definition: { id: '100', name: '100' },
            defaultVersionType: { id: 'latestType', name: 'latestType' },
          },
        },
      ],
      triggers: [{ triggerType: 'artifactSource', artifactAlias: 'web' }],
      environments: [
        {
          ...baseEnv,
          name: 'staging',
          deployPhases: [
            {
              rank: 1,
              phaseType: 'agentBasedDeployment',
              name: 'Deploy to staging',
              workflowTasks: [],
              deploymentInput: {
                queueId: 0,
                agentSpecification: { identifier: 'ubuntu-latest' },
              },
            },
          ],
        },
      ],
    };
    const result = await releaseJsonToTs(def, { org: 'mauve', project: 'platform' });
    const src = result.files[0]!.contents;
    expect(src).toContain('releasePipeline');
    expect(src).toContain('buildArtifact');
    expect(src).toContain("alias: 'web'");
    expect(src).toContain('isPrimary: true');
    expect(src).toContain('.trigger(web)');
    expect(src).toContain(".environment('staging'");
    expect(src).toContain(".agentPhase(");
    expect(src).toContain("vmImage: 'ubuntu-latest'");
  });

  it('preserves dependsOn between environments', async () => {
    const def: ReleaseDefinition = {
      name: 'r',
      environments: [
        { ...baseEnv, name: 'staging', rank: 1 },
        {
          ...baseEnv,
          name: 'prod',
          rank: 2,
          conditions: [{ name: 'staging', conditionType: 'environmentState', value: '4' }],
        },
      ],
    };
    const result = await releaseJsonToTs(def, { org: 'o', project: 'p' });
    const src = result.files[0]!.contents;
    expect(src).toContain(".dependsOn('staging')");
  });

  it('emits approval helpers when approvers are present', async () => {
    const def: ReleaseDefinition = {
      name: 'r',
      environments: [
        {
          ...baseEnv,
          name: 'prod',
          preDeployApprovals: {
            approvals: [
              {
                rank: 1,
                isAutomated: false,
                isNotificationOn: true,
                approver: { displayName: 'lead@x.com', uniqueName: 'lead@x.com' },
              },
            ],
            approvalOptions: { requiredApproverCount: 1, timeoutInMinutes: 60 },
          },
        },
      ],
    };
    const result = await releaseJsonToTs(def, { org: 'o', project: 'p' });
    const src = result.files[0]!.contents;
    expect(src).toContain('approval(');
    expect(src).toContain("'lead@x.com'");
    expect(src).toContain('requiredApproverCount: 1');
    expect(src).toContain('timeoutInMinutes: 60');
  });

  it('decodes typed task factories from GUID + version', async () => {
    const def: ReleaseDefinition = {
      name: 'r',
      environments: [
        {
          ...baseEnv,
          name: 'staging',
          deployPhases: [
            {
              rank: 1,
              phaseType: 'agentBasedDeployment',
              name: 'Agent job',
              workflowTasks: [
                {
                  taskId: '31C75BBB-BCDF-4706-8D7C-4DA6A1959BC2',
                  version: '1.*',
                  enabled: true,
                  inputs: { version: '20.x' },
                  name: 'Install Node',
                },
              ],
            },
          ],
        },
      ],
    };
    const result = await releaseJsonToTs(def, { org: 'o', project: 'p' });
    const src = result.files[0]!.contents;
    expect(src).toContain('useNodeV1');
    expect(src).toContain("from '@mauvezero/azpipe-tasks'");
    expect(src).toContain("displayName: 'Install Node'");
  });

  it('rewrites release-context predefined variables', async () => {
    const def: ReleaseDefinition = {
      name: 'r',
      releaseNameFormat: 'Release-$(Release.ReleaseId)-rev$(rev:r)',
      environments: [{ ...baseEnv, name: 'staging' }],
    };
    const result = await releaseJsonToTs(def, { org: 'o', project: 'p' });
    const src = result.files[0]!.contents;
    expect(src).toContain('PreDef.Release.Release.ReleaseId');
  });

  it('strips server-managed audit fields', async () => {
    const def: ReleaseDefinition = {
      id: 42,
      revision: 17,
      createdBy: { displayName: 'someone' },
      createdOn: '2025-01-01T00:00:00Z',
      url: 'https://example.com',
      _links: { self: { href: 'https://example.com' } },
      name: 'r',
      environments: [{ ...baseEnv, name: 'staging' }],
    };
    const result = await releaseJsonToTs(def, { org: 'o', project: 'p' });
    const src = result.files[0]!.contents;
    expect(src).not.toContain('revision');
    expect(src).not.toContain('createdBy');
    expect(src).not.toContain('_links');
  });

  describe('script extraction', () => {
    const cmdLineTaskId = 'D9BAFED4-0B18-4F58-968D-86655B4D2CE9';

    it('extracts multiline task script input to an external file', async () => {
      const def: ReleaseDefinition = {
        name: 'r',
        environments: [
          {
            ...baseEnv,
            name: 'staging',
            deployPhases: [
              {
                rank: 1,
                phaseType: 'agentBasedDeployment',
                name: 'Agent job',
                workflowTasks: [
                  {
                    taskId: cmdLineTaskId,
                    version: '2.*',
                    enabled: true,
                    name: 'Run deploy script',
                    inputs: {
                      script: 'echo step1\necho step2\necho done\n',
                    },
                  },
                ],
                deploymentInput: { queueId: 0, agentSpecification: { identifier: 'ubuntu-latest' } },
              },
            ],
          },
        ],
      };
      const result = await releaseJsonToTs(def, { org: 'o', project: 'p', prettier: false });
      // Entry file + 1 script file
      expect(result.files).toHaveLength(2);
      const src = result.files[0]!.contents;
      const scriptFile = result.files[1]!;
      expect(src).toContain('include(');
      expect(src).toContain("from '@mauvezero/azpipe'");
      expect(scriptFile.path).toBe('scripts/run-deploy-script.sh');
      expect(scriptFile.contents).toContain('echo step1');
    });

    it('keeps single-line task inputs inline', async () => {
      const def: ReleaseDefinition = {
        name: 'r',
        environments: [
          {
            ...baseEnv,
            name: 'staging',
            deployPhases: [
              {
                rank: 1,
                phaseType: 'agentBasedDeployment',
                name: 'Agent job',
                workflowTasks: [
                  {
                    taskId: cmdLineTaskId,
                    version: '2.*',
                    enabled: true,
                    name: 'Echo',
                    inputs: { script: 'echo hello' },
                  },
                ],
                deploymentInput: { queueId: 0, agentSpecification: { identifier: 'ubuntu-latest' } },
              },
            ],
          },
        ],
      };
      const result = await releaseJsonToTs(def, { org: 'o', project: 'p', prettier: false });
      expect(result.files).toHaveLength(1);
      const src = result.files[0]!.contents;
      expect(src).not.toContain('include(');
      expect(src).toContain("'echo hello'");
    });
  });
});
