import type { GateStep, WorkflowTask } from '@mauvezero/azpipe-releases';
import type { CalendarGateConnection } from '../connections.js';

/** GUID of the `CalendarGateCheck` task contributed by the CalendarGate extension. */
export const CALENDAR_GATE_TASK_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

/** Major version of the gate task. The runtime resolves the latest matching minor.patch. */
export const CALENDAR_GATE_VERSION = '1.*';

/** Inputs accepted by {@link calendarGateCheck} and {@link calendarGate}. */
export interface CalendarGateInputs {
  /**
   * Service connection authorizing the gate to call the CalendarGate API.
   * Construct via {@link "calendarGateConnection"} so the brand prevents
   * accidentally passing an unrelated connection name.
   */
  connection: CalendarGateConnection;

  /**
   * Pipeline name(s) to check. Comma-separated; wildcards (`MyPipe*`,
   * `*Pipeline`, `*Pipe*`) are supported. Defaults to
   * `$(Release.DefinitionName)` (the running release definition's name).
   */
  pipelineName?: string;

  /**
   * Environment name to check. Wildcard matching (e.g. `prod*`) is supported.
   * Defaults to `$(Release.EnvironmentName)` (the running stage's name).
   */
  environmentName?: string;
}

/** Step-level options for the gate task itself. */
export interface CalendarGateTaskOptions {
  /** Display name shown in Azure DevOps. Default: `'CalendarGate Freeze Check'`. */
  displayName?: string;
  /** Whether the gate task is enabled. Default: `true`. */
  enabled?: boolean;
  /** Conditional expression. Skips the task when it evaluates to false. */
  condition?: string;
  /** Per-task wall-clock cap in minutes. */
  timeoutInMinutes?: number;
}

/**
 * CalendarGate Freeze Check (low-level).
 *
 * Checks Outlook calendars for active deployment freeze events via the
 * CalendarGate API. If a freeze is active for the given pipeline and
 * environment, the gate fails.
 *
 * Configure a CalendarGate service connection. The gate checks all configured
 * calendars for FREEZE events matching the pipeline and environment. A single
 * calendar event can target multiple scopes: `(FREEZE: PipeA, PipeB/prod)`.
 *
 * Returns the raw {@link WorkflowTask}; useful when you want to stack several
 * checks under one gate step. For the common single-task case, prefer
 * {@link calendarGate}.
 *
 * @see https://github.com/mauve/CalendarGate (extension source)
 *
 * @example
 * ```ts
 * import { gates } from '@mauvezero/azpipe-releases';
 * import { calendarGateCheck, calendarGateConnection } from '@mauvezero/custom';
 *
 * env.preGates(gates({
 *   gates: [{
 *     name: 'Freeze + on-call check',
 *     tasks: [
 *       calendarGateCheck({ connection: calendarGateConnection('prod-cal') }),
 *       // …other gate tasks here
 *     ],
 *   }],
 * }));
 * ```
 */
export function calendarGateCheck(
  inputs: CalendarGateInputs,
  opts: CalendarGateTaskOptions = {},
): WorkflowTask {
  return {
    taskId: CALENDAR_GATE_TASK_ID,
    version: CALENDAR_GATE_VERSION,
    definitionType: 'task',
    enabled: opts.enabled ?? true,
    name: opts.displayName ?? 'CalendarGate Freeze Check',
    ...(opts.condition !== undefined ? { condition: opts.condition } : {}),
    ...(opts.timeoutInMinutes !== undefined ? { timeoutInMinutes: opts.timeoutInMinutes } : {}),
    inputs: {
      connectedServiceName: inputs.connection,
      pipelineName: inputs.pipelineName ?? '$(Release.DefinitionName)',
      environmentName: inputs.environmentName ?? '$(Release.EnvironmentName)',
    },
  };
}

/** Options accepted by {@link calendarGate} (extends the task options with a gate-step name). */
export interface CalendarGateOptions extends CalendarGateTaskOptions {
  /** Gate-step display name (the parent of the task in the gate-step list). Default: `'Calendar freeze check'`. */
  name?: string;
}

/**
 * CalendarGate Freeze Check (high-level).
 *
 * Builds a complete {@link GateStep} containing exactly one
 * {@link calendarGateCheck} task. Ready to drop into
 * `gates({ gates: [calendarGate(...)] })` from `@mauve/azpipe-releases`.
 *
 * Same semantics as {@link calendarGateCheck}: blocks deployment when a
 * freeze event matches the running pipeline + environment. See the upstream
 * extension for setup (deploy CalendarGate API → Azure Container Apps,
 * create the service connection, configure calendar sources).
 *
 * @example
 * ```ts
 * import { releasePipeline, gates } from '@mauvezero/azpipe-releases';
 * import { calendarGate, calendarGateConnection } from '@mauvezero/custom';
 *
 * export default releasePipeline({ org: 'neko', project: 'platform', name: 'web-release' })
 *   .environment('prod', e => e
 *     .preGates(gates({
 *       timeout: 240,
 *       gates: [calendarGate({ connection: calendarGateConnection('prod-cal') })],
 *     }))
 *     .agentPhase(p => p.queueId(1).step(useNodeV1({ version: '20.x' }))));
 * ```
 *
 * @see https://github.com/mauve/CalendarGate (extension source)
 */
export function calendarGate(
  inputs: CalendarGateInputs,
  opts: CalendarGateOptions = {},
): GateStep {
  return {
    name: opts.name ?? 'Calendar freeze check',
    tasks: [calendarGateCheck(inputs, opts)],
  };
}
