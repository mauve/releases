/**
 * `@mauvezero/ghactions-actions` — type-safe wrappers for known GitHub Actions.
 *
 * Every exported function corresponds to a single GitHub Action at a pinned
 * major-version ref (e.g. `actions/checkout@v4`). Functions accept a typed
 * inputs object and optional step-level options, and return a {@link UsesStep}
 * ready to pass to {@link GHJobBuilder.step}.
 *
 * @example
 * ```ts
 * import { workflow } from '@mauvezero/ghactions';
 * import { actionsCheckoutV4, actionsSetupNodeV4 } from '@mauvezero/ghactions-actions';
 *
 * export default workflow()
 *   .name('CI')
 *   .on({ push: { branches: ['main'] } })
 *   .job('build', j =>
 *     j.runsOn('ubuntu-latest')
 *      .step(actionsCheckoutV4())
 *      .step(actionsSetupNodeV4({ 'node-version': '20', cache: 'pnpm' }))
 *      .step({ run: 'pnpm test' }));
 * ```
 *
 * @packageDocumentation
 */

export { makeAction, type ActionStepOptions } from './runtime.js';
export * from './generated/index.js';
