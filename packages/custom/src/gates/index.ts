/**
 * Custom release gates contributed by Mauve-internal Azure DevOps
 * extensions. Each helper returns either a {@link "WorkflowTask"} (low-level)
 * or a {@link "GateStep"} (high-level, drop into `gates({ gates: [...] })`).
 */
export {
  calendarGate,
  calendarGateCheck,
  CALENDAR_GATE_TASK_ID,
  CALENDAR_GATE_VERSION,
  type CalendarGateInputs,
  type CalendarGateOptions,
  type CalendarGateTaskOptions,
} from './calendar-gate.js';
