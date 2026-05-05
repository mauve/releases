/**
 * Branded service-connection types for Mauve-internal Azure DevOps
 * extensions. Mirrors the codegen-emitted brands in
 * `@mauve/azpipe-tasks`'s `connections.ts` so consumers can't mix
 * connection kinds at the call site.
 */

declare const __brand_CalendarGate: unique symbol;

/**
 * Reference to a "calendargate" service connection by name.
 *
 * Custom connection type contributed by the CalendarGate Azure DevOps
 * extension; carries the API URL and API key needed to call the gate
 * service. Created in Azure DevOps under
 * **Project Settings → Service connections → New → CalendarGate**.
 *
 * @see https://github.com/mauve/CalendarGate (extension source)
 */
export type CalendarGateConnection = string & { readonly [__brand_CalendarGate]: void };

/**
 * Construct a typed reference to a CalendarGate service connection by name.
 *
 * @param name - Display name (or id) of the service connection in Azure DevOps.
 *
 * @example
 * ```ts
 * import { calendarGate, calendarGateConnection } from '@mauve/custom';
 *
 * env.preGates(gates({ gates: [
 *   calendarGate({ connection: calendarGateConnection('prod-calendars') }),
 * ]}));
 * ```
 */
export function calendarGateConnection(name: string): CalendarGateConnection {
  return name as CalendarGateConnection;
}
