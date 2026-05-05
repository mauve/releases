/**
 * `@mauve/custom` — Mauve-only helpers for the azpipe suite.
 *
 * What lives here:
 * - **`gates/`** — typed wrappers for custom Azure DevOps extension *gates*
 *   we run. Currently: CalendarGate.
 * - **`tasks/`** — typed wrappers for custom *agent* tasks (none yet).
 * - **`presets/`** — reusable building blocks that compose the above with
 *   pieces from `@mauve/azpipe` / `azpipe-releases` / `azpipe-utils`.
 * - **`connections.ts`** — branded service-connection types for custom
 *   connection kinds (e.g. {@link CalendarGateConnection}).
 *
 * What does *not* live here: anything reusable across organizations. If a
 * helper would be useful to teams that don't run Mauve's extensions,
 * push it upstream into `@mauve/azpipe-utils`, `azpipe-tasks`, or
 * `azpipe-releases` instead.
 *
 * @packageDocumentation
 */

export * from './connections.js';
export * from './gates/index.js';
export * from './tasks/index.js';
export * from './presets/index.js';
