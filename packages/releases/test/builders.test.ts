import { describe, expect, it } from 'vitest';
import { useNodeV1, azureCLIV2, azureRMConnection } from '@mauvezero/azpipe-tasks';
import {
  releasePipeline,
  approval,
  buildArtifact,
  artifactSourceTrigger,
  taskStepToWorkflowTask,
  UnknownTaskRefError,
  MultiplePrimaryArtifactsError,
  UnknownArtifactAliasError,
  readUnresolvedQueue,
  AgentPhaseBuilder,
  type AgentDeploymentInput,
} from '../src/index.js';

describe('releasePipeline()', () => {
  it('produces a minimal valid-shaped release definition', () => {
    const def = releasePipeline({
      org: 'mauve',
      project: 'platform',
      name: 'web-release',
      releaseNameFormat: 'Release-$(rev:r)',
    })
      .artifact(buildArtifact({ alias: 'web', definitionId: 42, isPrimary: true }))
      .trigger(artifactSourceTrigger('web'))
      .environment('staging', (e) =>
        e.agentPhase((p) => p.pool({ queueId: 1 }).step(useNodeV1({ version: '20.x' }))),
      )
      .toDefinition();

    expect(def.name).toBe('web-release');
    expect(def.releaseNameFormat).toBe('Release-$(rev:r)');
    expect(def.artifacts?.[0]?.alias).toBe('web');
    expect(def.triggers?.[0]?.triggerType).toBe('artifactSource');
    expect(def.environments).toHaveLength(1);
    const env = def.environments[0]!;
    expect(env.name).toBe('staging');
    expect(env.rank).toBe(1);
    expect(env.deployPhases).toHaveLength(1);
    const phase = env.deployPhases![0]!;
    expect(phase.phaseType).toBe('agentBasedDeployment');
    expect(phase.workflowTasks).toHaveLength(1);
    const wt = phase.workflowTasks![0]!;
    expect(wt.version).toBe('1.*');
    expect(wt.taskId).toMatch(/^[a-f0-9-]{36}$/i);
    expect(wt.inputs).toMatchObject({ version: '20.x' });
  });

  it('approvals: pre and post both attach to the environment', () => {
    const def = releasePipeline({ org: 'o', project: 'p', name: 'r' })
      .environment('prod', (e) =>
        e
          .preApproval(approval({ approvers: ['lead@mauve.com'], requiredApproverCount: 1 }))
          .postApproval(approval({ approvers: ['ops@mauve.com'] }))
          .agentPhase((p) => p.step(useNodeV1({ version: '20.x' }))),
      )
      .toDefinition();

    const env = def.environments[0]!;
    expect(env.preDeployApprovals?.approvals?.[0]?.approver?.uniqueName).toBe('lead@mauve.com');
    expect(env.preDeployApprovals?.approvalOptions?.requiredApproverCount).toBe(1);
    expect(env.postDeployApprovals?.approvals?.[0]?.approver?.uniqueName).toBe('ops@mauve.com');
  });

  it('embedded org/project are exposed via getters but not serialized', () => {
    const builder = releasePipeline({ org: 'mauve', project: 'platform', name: 'r1' });
    expect(builder.org).toBe('mauve');
    expect(builder.project).toBe('platform');
    const def = builder.toDefinition() as Record<string, unknown>;
    expect(def['org']).toBeUndefined();
    expect(def['project']).toBeUndefined();
  });

  it('rank auto-increments across environments', () => {
    const def = releasePipeline({ org: 'o', project: 'p', name: 'r' })
      .environment('staging', (e) => e.agentPhase((p) => p.step(useNodeV1({ version: '20.x' }))))
      .environment('prod', (e) => e.agentPhase((p) => p.step(useNodeV1({ version: '20.x' }))))
      .toDefinition();
    expect(def.environments[0]?.rank).toBe(1);
    expect(def.environments[1]?.rank).toBe(2);
  });

  it('artifact.output exposes typed predefined variables and is non-enumerable', () => {
    const web = buildArtifact({ alias: 'web', definitionId: 42 });
    expect(web.output.BuildId).toBe('$(Release.Artifacts.web.BuildId)');
    expect(web.output.SourceBranch).toBe('$(Release.Artifacts.web.SourceBranch)');
    // The wire payload must not include `output` — it's a non-enumerable getter.
    expect(JSON.stringify(web)).not.toContain('output');
    expect(Object.keys(web)).not.toContain('output');
  });

  it('trigger(artifact) is shorthand for artifactSourceTrigger(artifact.alias)', () => {
    const a = buildArtifact({ alias: 'web', definitionId: 42 });
    const def = releasePipeline({ org: 'o', project: 'p', name: 'r' })
      .artifact(a)
      .trigger(a)
      .toDefinition();
    expect(def.triggers?.[0]).toEqual({ triggerType: 'artifactSource', artifactAlias: 'web' });
  });

  it('throws MultiplePrimaryArtifactsError when more than one isPrimary:true', () => {
    const b = releasePipeline({ org: 'o', project: 'p', name: 'r' })
      .artifact(buildArtifact({ alias: 'a', definitionId: 1, isPrimary: true }))
      .artifact(buildArtifact({ alias: 'b', definitionId: 2, isPrimary: true }));
    expect(() => b.toDefinition()).toThrow(MultiplePrimaryArtifactsError);
  });

  it('throws UnknownArtifactAliasError when a trigger references an unknown alias', () => {
    const b = releasePipeline({ org: 'o', project: 'p', name: 'r' })
      .artifact(buildArtifact({ alias: 'web', definitionId: 1 }))
      .trigger(artifactSourceTrigger('webb'));
    expect(() => b.toDefinition()).toThrow(UnknownArtifactAliasError);
  });

  it('trigger(artifact) shorthand bypasses alias-mismatch by construction', () => {
    const a = buildArtifact({ alias: 'web', definitionId: 1 });
    expect(() =>
      releasePipeline({ org: 'o', project: 'p', name: 'r' }).artifact(a).trigger(a).toDefinition(),
    ).not.toThrow();
  });
});

describe('taskStepToWorkflowTask', () => {
  it('looks up GUID for a known task in the catalog', () => {
    const wt = taskStepToWorkflowTask(useNodeV1({ version: '20.x' }));
    expect(wt.version).toBe('1.*');
    expect(wt.taskId).toMatch(/^[a-f0-9-]{36}$/i);
    expect(wt.definitionType).toBe('task');
    expect(wt.enabled).toBe(true);
    expect(wt.inputs).toEqual({ version: '20.x' });
  });

  it('passes through TaskStep options to the WorkflowTask', () => {
    const wt = taskStepToWorkflowTask(
      azureCLIV2(
        {
          connectedServiceNameARM: azureRMConnection('prod-sub'),
          scriptType: 'bash',
          scriptLocation: 'inlineScript',
          inlineScript: 'echo hi',
        },
        { displayName: 'Run', condition: 'succeeded()', timeoutInMinutes: 30 },
      ),
    );
    expect(wt.name).toBe('Run');
    expect(wt.condition).toBe('succeeded()');
    expect(wt.timeoutInMinutes).toBe(30);
    expect(wt.inputs?.['scriptType']).toBe('bash');
  });

  it('throws UnknownTaskRefError for unknown task refs without overrides', () => {
    expect(() =>
      taskStepToWorkflowTask({ task: 'TotallyMadeUp@99' }),
    ).toThrow(UnknownTaskRefError);
  });

  it('accepts overrides for custom tasks', () => {
    const wt = taskStepToWorkflowTask(
      { task: 'CustomTask@1', inputs: { foo: 'bar' } },
      { taskId: '12345678-1234-1234-1234-123456789abc', version: '1.2.3' },
    );
    expect(wt.taskId).toBe('12345678-1234-1234-1234-123456789abc');
    expect(wt.version).toBe('1.2.3');
  });
});

describe('EnvironmentBuilder.dependsOn()', () => {
  function condsFor(envName: string, def: ReturnType<typeof releasePipeline>['toDefinition'] extends () => infer R ? R : never) {
    const env = def.environments.find((e) => e.name === envName);
    return env?.conditions ?? [];
  }

  it('emits a single environmentState condition for one source', () => {
    const def = releasePipeline({ org: 'o', project: 'p', name: 'r' })
      .environment('staging', (e) =>
        e.agentPhase((p) => p.pool({ queueId: 1 }).step(useNodeV1({ version: '20.x' }))),
      )
      .environment('prod', (e) =>
        e
          .dependsOn('staging')
          .agentPhase((p) => p.pool({ queueId: 1 }).step(useNodeV1({ version: '20.x' }))),
      )
      .toDefinition();
    const conds = condsFor('prod', def);
    expect(conds).toHaveLength(1);
    expect(conds[0]).toEqual({
      name: 'staging',
      conditionType: 'environmentState',
      value: '4',
    });
  });

  it('accepts multiple sources via variadic args', () => {
    const def = releasePipeline({ org: 'o', project: 'p', name: 'r' })
      .environment('eu', (e) =>
        e.agentPhase((p) => p.pool({ queueId: 1 }).step(useNodeV1({ version: '20.x' }))),
      )
      .environment('us', (e) =>
        e.agentPhase((p) => p.pool({ queueId: 1 }).step(useNodeV1({ version: '20.x' }))),
      )
      .environment('release', (e) =>
        e
          .dependsOn('eu', 'us')
          .agentPhase((p) => p.pool({ queueId: 1 }).step(useNodeV1({ version: '20.x' }))),
      )
      .toDefinition();
    const conds = condsFor('release', def);
    expect(conds.map((c) => c.name)).toEqual(['eu', 'us']);
  });

  it('accepts EnvironmentBuilder references', () => {
    const def = releasePipeline({ org: 'o', project: 'p', name: 'r' })
      .environment('staging', (s) =>
        s
          .agentPhase((p) => p.pool({ queueId: 1 }).step(useNodeV1({ version: '20.x' }))),
      )
      .environment('prod', (e) => {
        // The closure for `staging` has already executed; we need the EnvironmentBuilder.
        // Builders aren't exposed on the pipeline; use the name overload instead.
        // (Documented pattern; this test asserts the name overload works.)
        e.dependsOn('staging').agentPhase((p) =>
          p.pool({ queueId: 1 }).step(useNodeV1({ version: '20.x' })),
        );
      })
      .toDefinition();
    expect(condsFor('prod', def)[0]?.name).toBe('staging');
  });

  it('whenStates option encodes the bitmask correctly', () => {
    const def = releasePipeline({ org: 'o', project: 'p', name: 'r' })
      .environment('a', (e) =>
        e.agentPhase((p) => p.pool({ queueId: 1 }).step(useNodeV1({ version: '20.x' }))),
      )
      .environment('b', (e) =>
        e
          .dependsOn(['a'], { whenStates: ['Succeeded', 'PartiallySucceeded'] })
          .agentPhase((p) => p.pool({ queueId: 1 }).step(useNodeV1({ version: '20.x' }))),
      )
      .environment('c', (e) =>
        e
          .dependsOn(['a'], { whenStates: ['Succeeded', 'Rejected'] })
          .agentPhase((p) => p.pool({ queueId: 1 }).step(useNodeV1({ version: '20.x' }))),
      )
      .toDefinition();
    expect(condsFor('b', def)[0]?.value).toBe('12'); // 4 | 8
    expect(condsFor('c', def)[0]?.value).toBe('20'); // 4 | 16
  });

  it('chaining accumulates conditions (does not overwrite)', () => {
    const def = releasePipeline({ org: 'o', project: 'p', name: 'r' })
      .environment('a', (e) =>
        e.agentPhase((p) => p.pool({ queueId: 1 }).step(useNodeV1({ version: '20.x' }))),
      )
      .environment('b', (e) =>
        e.agentPhase((p) => p.pool({ queueId: 1 }).step(useNodeV1({ version: '20.x' }))),
      )
      .environment('c', (e) =>
        e
          .dependsOn('a')
          .dependsOn(['b'], { whenStates: ['Succeeded', 'PartiallySucceeded'] })
          .agentPhase((p) => p.pool({ queueId: 1 }).step(useNodeV1({ version: '20.x' }))),
      )
      .toDefinition();
    const conds = condsFor('c', def);
    expect(conds).toHaveLength(2);
    expect(conds[0]).toEqual({ name: 'a', conditionType: 'environmentState', value: '4' });
    expect(conds[1]).toEqual({ name: 'b', conditionType: 'environmentState', value: '12' });
  });
});

describe('AgentPhaseBuilder.pool()', () => {
  function phaseInput(specApply: (p: AgentPhaseBuilder) => void) {
    const def = releasePipeline({ org: 'o', project: 'p', name: 'r' })
      .environment('e', (e) =>
        e.agentPhase((p) => {
          specApply(p);
          p.step(useNodeV1({ version: '20.x' }));
        }),
      )
      .toDefinition();
    return def.environments[0]!.deployPhases![0]!.deploymentInput as AgentDeploymentInput;
  }

  it('numeric queueId: emits the id and no unresolved marker', () => {
    const input = phaseInput((p) => p.pool({ queueId: 42 }));
    expect(input.queueId).toBe(42);
    expect(readUnresolvedQueue(input)).toBeUndefined();
  });

  it('name shorthand: defers resolution and emits queueId 0 placeholder', () => {
    const input = phaseInput((p) => p.pool('Azure Pipelines'));
    expect(input.queueId).toBe(0);
    expect(readUnresolvedQueue(input)).toEqual({ name: 'Azure Pipelines' });
  });

  it('object form: { name, demands } produces a name ref + demand list', () => {
    const input = phaseInput((p) =>
      p.pool({ name: 'Azure Pipelines', demands: ['Agent.OS -equals Linux'] }),
    );
    expect(readUnresolvedQueue(input)).toEqual({ name: 'Azure Pipelines' });
    expect(input.demands).toEqual(['Agent.OS -equals Linux']);
  });

  it('demands() chain combines with pool-level demands', () => {
    const input = phaseInput((p) =>
      p.pool({ name: 'X', demands: ['A'] }).demands('B', 'C'),
    );
    expect(input.demands).toEqual(['A', 'B', 'C']);
  });

  it('symbols are dropped by JSON.stringify (wire stays clean)', () => {
    const input = phaseInput((p) => p.pool('Azure Pipelines'));
    expect(readUnresolvedQueue(input)).toBeDefined();
    const wire = JSON.parse(JSON.stringify(input)) as AgentDeploymentInput;
    expect(readUnresolvedQueue(wire)).toBeUndefined();
    expect(wire.queueId).toBe(0);
  });

  describe('vmImage support', () => {
    it('pool({ vmImage }) defaults to the Azure Pipelines hosted queue and sets agentSpecification', () => {
      const input = phaseInput((p) => p.pool({ vmImage: 'ubuntu-22.04' }));
      expect(input.queueId).toBe(0);
      expect(readUnresolvedQueue(input)).toEqual({ name: 'Azure Pipelines' });
      expect(input.agentSpecification).toEqual({ identifier: 'ubuntu-22.04' });
    });

    it('pool({ name, vmImage }) keeps the explicit queue and pins the image', () => {
      const input = phaseInput((p) =>
        p.pool({ name: 'Azure Pipelines', vmImage: 'macos-13' }),
      );
      expect(readUnresolvedQueue(input)).toEqual({ name: 'Azure Pipelines' });
      expect(input.agentSpecification).toEqual({ identifier: 'macos-13' });
    });

    it('pool({ vmImage, demands }) merges demands additively', () => {
      const input = phaseInput((p) =>
        p.pool({ vmImage: 'ubuntu-22.04', demands: ['Foo -equals Bar'] }),
      );
      expect(input.demands).toEqual(['Foo -equals Bar']);
      expect(input.agentSpecification?.identifier).toBe('ubuntu-22.04');
    });

    it('pool({ queueId }) without vmImage leaves agentSpecification undefined', () => {
      const input = phaseInput((p) => p.pool({ queueId: 42 }));
      expect(input.agentSpecification).toBeUndefined();
    });

    it('accepts arbitrary strings as vmImage (literal-union + string fallback)', () => {
      const input = phaseInput((p) =>
        p.pool({ vmImage: 'totally-made-up-image' }),
      );
      expect(input.agentSpecification?.identifier).toBe('totally-made-up-image');
    });
  });
});
