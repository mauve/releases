import { describe, expect, it, expectTypeOf } from 'vitest';
import {
  calendarGate,
  calendarGateCheck,
  calendarGateConnection,
  CALENDAR_GATE_TASK_ID,
  CALENDAR_GATE_VERSION,
  type CalendarGateConnection,
} from '../src/index.js';
import type { GateStep, WorkflowTask } from '@mauve/azpipe-releases';

describe('calendarGateConnection', () => {
  it('returns a branded value usable where CalendarGateConnection is expected', () => {
    const c = calendarGateConnection('prod-cal');
    expect(c).toBe('prod-cal');
    expectTypeOf(c).toEqualTypeOf<CalendarGateConnection>();
  });
});

describe('calendarGateCheck (low-level WorkflowTask)', () => {
  const conn = calendarGateConnection('prod-cal');

  it('produces a valid WorkflowTask with the right GUID and version', () => {
    const wt = calendarGateCheck({ connection: conn });
    expect(wt.taskId).toBe(CALENDAR_GATE_TASK_ID);
    expect(wt.version).toBe(CALENDAR_GATE_VERSION);
    expect(wt.definitionType).toBe('task');
    expect(wt.enabled).toBe(true);
    expect(wt.name).toBe('CalendarGate Freeze Check');
  });

  it('defaults pipelineName and environmentName to release variables', () => {
    const wt = calendarGateCheck({ connection: conn });
    expect(wt.inputs).toEqual({
      connectedServiceName: 'prod-cal',
      pipelineName: '$(Release.DefinitionName)',
      environmentName: '$(Release.EnvironmentName)',
    });
  });

  it('honours overrides for pipelineName and environmentName', () => {
    const wt = calendarGateCheck({
      connection: conn,
      pipelineName: 'web-release',
      environmentName: 'prod',
    });
    expect(wt.inputs?.['pipelineName']).toBe('web-release');
    expect(wt.inputs?.['environmentName']).toBe('prod');
  });

  it('passes displayName, condition, timeoutInMinutes through', () => {
    const wt = calendarGateCheck(
      { connection: conn },
      { displayName: 'Custom name', condition: "succeeded()", timeoutInMinutes: 30, enabled: false },
    );
    expect(wt.name).toBe('Custom name');
    expect(wt.condition).toBe('succeeded()');
    expect(wt.timeoutInMinutes).toBe(30);
    expect(wt.enabled).toBe(false);
  });

  it('expectTypeOf: returns a WorkflowTask', () => {
    expectTypeOf(calendarGateCheck({ connection: conn })).toEqualTypeOf<WorkflowTask>();
  });
});

describe('calendarGate (high-level GateStep)', () => {
  const conn = calendarGateConnection('prod-cal');

  it('returns a GateStep with the right shape', () => {
    const step = calendarGate({ connection: conn });
    expect(step.name).toBe('Calendar freeze check');
    expect(step.tasks).toHaveLength(1);
    expect(step.tasks?.[0]?.taskId).toBe(CALENDAR_GATE_TASK_ID);
  });

  it('honours a custom gate-step name', () => {
    const step = calendarGate({ connection: conn }, { name: 'Freeze + on-call' });
    expect(step.name).toBe('Freeze + on-call');
  });

  it('expectTypeOf: returns a GateStep', () => {
    expectTypeOf(calendarGate({ connection: conn })).toEqualTypeOf<GateStep>();
  });
});

describe('integration with @mauve/azpipe-releases', () => {
  it('drops into a `gates(...)` block cleanly', async () => {
    const { gates: gatesBlock } = await import('@mauve/azpipe-releases');
    const block = gatesBlock({
      timeout: 240,
      gates: [calendarGate({ connection: calendarGateConnection('prod-cal') })],
    });
    expect(block.gatesOptions?.isEnabled).toBe(true);
    expect(block.gates).toHaveLength(1);
    expect(block.gates?.[0]?.tasks?.[0]?.taskId).toBe(CALENDAR_GATE_TASK_ID);
  });

  it("works with the widened gate() helper accepting WorkflowTasks", async () => {
    const { gate } = await import('@mauve/azpipe-releases');
    const step = gate('Combined', calendarGateCheck({ connection: calendarGateConnection('c') }));
    expect(step.tasks).toHaveLength(1);
    expect(step.tasks?.[0]?.taskId).toBe(CALENDAR_GATE_TASK_ID);
  });
});
