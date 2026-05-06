/**
 * Emit TypeScript source from a parsed GitHub Actions {@link WorkflowRoot}.
 *
 * The emitter walks the workflow document and produces a single fluent-builder
 * expression:
 *
 * ```ts
 * export default workflow()
 *   .name('CI')
 *   .on({ push: { branches: ['main'] } })
 *   .job('build', j =>
 *     j.runsOn('ubuntu-latest')
 *      .step(actionsCheckoutV6())
 *      .step(run('npm test', { name: 'Test' })));
 * ```
 *
 * Known actions from `@mauvezero/ghactions-actions` are emitted as typed
 * factory calls; unknown ones fall back to `uses('owner/repo@ref', opts)`.
 * Multi-line `run:` steps keep the script content inline as a template literal.
 */

import type {
  AnyStep,
  JobObject,
  RunStep,
  UsesStep,
  WorkflowRoot,
} from '@mauvezero/ghactions';
import {
  expr,
  strLit,
  ImportCollector,
} from '../codegen/printer.js';
import { findActionFactory } from './actions.js';

const GHACTIONS = '@mauvezero/ghactions';
const GHACTIONS_ACTIONS = '@mauvezero/ghactions-actions';

export interface GhaEmitOptions {
  // reserved for future per-option extensions
}

export interface GhaEmitResult {
  /** TS source of the entry file (before Prettier). */
  source: string;
}

interface Ctx {
  imports: ImportCollector;
}

// ---- public entry point --------------------------------------------------

/** Convert a parsed GitHub Actions {@link WorkflowRoot} to TS source. */
export function emitGhaSource(workflow: WorkflowRoot, _opts: GhaEmitOptions = {}): GhaEmitResult {
  const ctx: Ctx = { imports: new ImportCollector() };
  ctx.imports.add(GHACTIONS, 'workflow');

  const calls: string[] = [];

  // name
  if (workflow.name !== undefined) {
    calls.push(method('name', [strLit(workflow.name)]));
  }

  // on (triggers)
  const triggers = (workflow as unknown as Record<string, unknown>)['on'];
  if (triggers !== undefined) {
    calls.push(method('on', [expr(triggers)]));
  }

  // env
  if (workflow.env && Object.keys(workflow.env).length > 0) {
    calls.push(method('envs', [expr(workflow.env)]));
  }

  // concurrency
  if (workflow.concurrency !== undefined) {
    if (typeof workflow.concurrency === 'string') {
      calls.push(method('concurrency', [strLit(workflow.concurrency)]));
    } else {
      const c = workflow.concurrency;
      const args: string[] = [strLit(c.group)];
      if (c['cancel-in-progress'] !== undefined) args.push(expr(c['cancel-in-progress']));
      calls.push(method('concurrency', args));
    }
  }

  // permissions
  if (workflow.permissions !== undefined) {
    calls.push(method('permissions', [expr(workflow.permissions)]));
  }

  // defaults
  if (workflow.defaults?.run !== undefined) {
    calls.push(method('defaults', [expr(workflow.defaults.run)]));
  }

  // jobs
  for (const [jobId, job] of Object.entries(workflow.jobs)) {
    calls.push(renderJob(jobId, job, ctx));
  }

  const chainSource = ['workflow()', ...calls.map((c) => '  ' + c)].join('\n');
  const importBlock = ctx.imports.render();
  const source =
    (importBlock ? importBlock + '\n\n' : '') +
    'export default ' +
    chainSource +
    ';\n';

  return { source };
}

// ---- job -----------------------------------------------------------------

function renderJob(jobId: string, job: JobObject, ctx: Ctx): string {
  const jCalls: string[] = [];

  if (job['runs-on'] !== undefined) {
    jCalls.push(method('runsOn', [expr(job['runs-on'])]));
  }
  if (job.name !== undefined) {
    jCalls.push(method('name', [strLit(job.name)]));
  }
  if (job.needs !== undefined) {
    const needs = Array.isArray(job.needs) ? job.needs : [job.needs];
    jCalls.push(method('needs', [expr(needs)]));
  }
  if (job.if !== undefined) {
    jCalls.push(method('if_', [strLit(job.if)]));
  }
  if (job.env && Object.keys(job.env).length > 0) {
    jCalls.push(method('envs', [expr(job.env)]));
  }
  if (job.environment !== undefined) {
    jCalls.push(method('environment', [expr(job.environment)]));
  }
  if (job.concurrency !== undefined) {
    if (typeof job.concurrency === 'string') {
      jCalls.push(method('concurrency', [strLit(job.concurrency)]));
    } else {
      const c = job.concurrency;
      const args: string[] = [strLit(c.group)];
      if (c['cancel-in-progress'] !== undefined) args.push(expr(c['cancel-in-progress']));
      jCalls.push(method('concurrency', args));
    }
  }
  if (job.permissions !== undefined) {
    jCalls.push(method('permissions', [expr(job.permissions)]));
  }
  if (job.outputs && Object.keys(job.outputs).length > 0) {
    jCalls.push(method('outputs', [expr(job.outputs)]));
  }
  if (job.strategy !== undefined) {
    jCalls.push(method('strategy', [expr(job.strategy)]));
  }
  if (job['continue-on-error'] !== undefined) {
    jCalls.push(method('continueOnError', [expr(job['continue-on-error'])]));
  }
  if (job['timeout-minutes'] !== undefined) {
    jCalls.push(method('timeoutMinutes', [expr(job['timeout-minutes'])]));
  }
  if (job.container !== undefined) {
    jCalls.push(method('container', [expr(job.container)]));
  }
  if (job.services !== undefined) {
    jCalls.push(method('services', [expr(job.services)]));
  }
  if (job.defaults?.run !== undefined) {
    jCalls.push(method('defaults', [expr(job.defaults.run)]));
  }

  // steps
  if (job.steps && job.steps.length > 0) {
    for (const step of job.steps) {
      jCalls.push(method('step', [renderStep(step, ctx)]));
    }
  }

  const jChain = ['j', ...jCalls.map((c) => '    ' + c)].join('\n      .');
  return method('job', [strLit(jobId), `j =>\n    j.${jChain}`]);
}

// ---- steps ---------------------------------------------------------------

function renderStep(step: AnyStep, ctx: Ctx): string {
  if ('uses' in step) return renderUsesStep(step, ctx);
  return renderRunStep(step, ctx);
}

function renderUsesStep(step: UsesStep, ctx: Ctx): string {
  const match = findActionFactory(step.uses);
  const stepOpts = buildStepOpts(step);

  if (match !== undefined) {
    ctx.imports.add(GHACTIONS_ACTIONS, match.factory);
    const inputsArg = step.with && Object.keys(step.with).length > 0 ? expr(step.with) : '{}';
    const optsArg = Object.keys(stepOpts).length > 0 ? `, ${expr(stepOpts)}` : '';
    return `${match.factory}(${inputsArg}${optsArg})`;
  }

  // Fallback: generic uses() factory
  ctx.imports.add(GHACTIONS, 'uses');
  const allOpts: Record<string, unknown> = { ...stepOpts };
  if (step.with && Object.keys(step.with).length > 0) {
    allOpts['with'] = step.with;
  }
  const optsArg = Object.keys(allOpts).length > 0 ? `, ${expr(allOpts)}` : '';
  return `uses(${strLit(step.uses)}${optsArg})`;
}

function renderRunStep(step: RunStep, ctx: Ctx): string {
  ctx.imports.add(GHACTIONS, 'run');
  const scriptArg = strLit(step.run);
  const stepOpts = buildStepOpts(step);
  if (step.shell !== undefined) stepOpts['shell'] = step.shell;
  if (step['working-directory'] !== undefined) stepOpts['working-directory'] = step['working-directory'];
  const optsArg = Object.keys(stepOpts).length > 0 ? `, ${expr(stepOpts)}` : '';
  return `run(${scriptArg}${optsArg})`;
}

/** Collect step-level options that are common to all step kinds. */
function buildStepOpts(step: AnyStep): Record<string, unknown> {
  const opts: Record<string, unknown> = {};
  if (step.id !== undefined) opts['id'] = step.id;
  if (step.name !== undefined) opts['name'] = step.name;
  if (step.if !== undefined) opts['if'] = step.if;
  if (step.env !== undefined && Object.keys(step.env).length > 0) opts['env'] = step.env;
  if (step['continue-on-error'] !== undefined) opts['continue-on-error'] = step['continue-on-error'];
  if (step['timeout-minutes'] !== undefined) opts['timeout-minutes'] = step['timeout-minutes'];
  return opts;
}

// ---- helpers -------------------------------------------------------------

/** Render a `.methodName(arg1, arg2, ...)` chain link. */
function method(name: string, args: string[]): string {
  return `.${name}(${args.join(', ')})`;
}
