/**
 * Emit TypeScript source from a parsed {@link PipelineRoot}.
 *
 * The emitter walks the document and produces a single fluent-builder
 * expression — `pipeline().method(...).method(...)` — together with a
 * collected import block and an optional list of sibling template files.
 *
 * The output is intentionally not pretty-printed here; the caller runs it
 * through Prettier as a post-step. Indentation is whatever falls out of
 * concatenation, which keeps emit logic short and lets a single source of
 * formatting truth live in Prettier.
 */

import type {
  AnyJob,
  AnyStage,
  CITriggerInput,
  CheckoutStep,
  DeploymentJobObject,
  DownloadStep,
  JobObject,
  PipelineRoot,
  PRTriggerInput,
  PublishStep,
  ScheduleTrigger,
  Step,
  StepTemplateRef,
  TaskStep,
  Variable,
} from '@mauve/azpipe';
import {
  expr,
  isRaw,
  raw,
  strLit,
  ImportCollector,
  type RawExpr,
} from '../codegen/printer.js';
import { rewriteTree } from '../codegen/predef.js';
import { findTaskFactoryByRef } from '../codegen/tasks.js';
import { camelCase, IdentifierScope } from '../codegen/identifiers.js';

const AZPIPE = '@mauve/azpipe';
const TASKS = '@mauve/azpipe-tasks';
const UTILS = '@mauve/azpipe-utils';

/** Result of converting a single YAML pipeline. */
export interface YamlEmitResult {
  /** TS source of the entry file (before Prettier). */
  source: string;
  /** Collected `import` block already rendered. */
  imports: string;
  /** Names of templates referenced by `template:` / `extends:`. The CLI
   *  layer turns these into per-template TS files. */
  referencedTemplates: ReferencedTemplate[];
}

export interface ReferencedTemplate {
  /** Path as written in the YAML, e.g. `'templates/build.yml'`. */
  templatePath: string;
  /** TS identifier we picked for it (used both in the import and in the
   *  caller's `extend(...)`). */
  identifier: string;
  /** Where it was referenced from — informational. */
  kind: 'jobs' | 'stages' | 'steps' | 'variables' | 'extends';
}

interface Ctx {
  imports: ImportCollector;
  scope: IdentifierScope;
  templates: Map<string, ReferencedTemplate>;
}

/** Convert a parsed pipeline to TS source. */
export function emitPipelineSource(pipeline: PipelineRoot): YamlEmitResult {
  // Run a deep predef rewrite on a clone so subsequent walks see RawExprs in
  // place of `$(Build.SourceBranch)` strings.
  const { value: rewritten, usedNamespaces } = rewriteTree(pipeline);
  const root = rewritten as PipelineRoot;

  const ctx: Ctx = {
    imports: new ImportCollector(),
    scope: new IdentifierScope(),
    templates: new Map(),
  };
  ctx.imports.add(AZPIPE, 'pipeline');
  if (usedNamespaces.size > 0) ctx.imports.add(UTILS, 'PreDef');

  const calls: string[] = [];
  if (root.name !== undefined) calls.push(method('name', [valueArg(root.name)]));
  if (root.appendCommitMessageToRunName !== undefined)
    calls.push(method('appendCommitMessageToRunName', [valueArg(root.appendCommitMessageToRunName)]));
  if (root.trigger !== undefined) calls.push(method('trigger', [renderCITrigger(root.trigger)]));
  if (root.pr !== undefined) calls.push(method('pr', [renderPRTrigger(root.pr)]));
  if (root.schedules && root.schedules.length > 0)
    calls.push(method('schedules', [renderArray(root.schedules as ScheduleTrigger[])]));
  if (root.pool !== undefined) calls.push(method('pool', [valueArg(root.pool)]));
  if (root.parameters && root.parameters.length > 0) {
    for (const p of root.parameters) calls.push(method('parameter', [valueArg(p)]));
  }
  if (root.variables) {
    for (const v of root.variables) calls.push(...renderVariableMethod(v, ctx));
  }
  if (root.resources) calls.push(method('resources', [valueArg(root.resources)]));
  if (root.lockBehavior) calls.push(method('lockBehavior', [valueArg(root.lockBehavior)]));

  if (root.extends) {
    const id = registerTemplate(ctx, root.extends.template, 'extends');
    if (root.extends.parameters) {
      ctx.imports.add(UTILS, 'extend');
      calls.push(method('extends_', [
        strLit(root.extends.template),
        valueArg(root.extends.parameters),
      ]));
      void id;
    } else {
      calls.push(method('extends_', [strLit(root.extends.template)]));
    }
  }

  // Body modes: stages > jobs > steps. Mirror what PipelineBuilder picks.
  if (root.stages && root.stages.length > 0) {
    for (const stage of root.stages) {
      calls.push(...renderTopLevelStage(stage, ctx));
    }
  } else if (root.jobs && root.jobs.length > 0) {
    for (const job of root.jobs) {
      calls.push(...renderTopLevelJob(job, ctx));
    }
  } else if (root.steps && root.steps.length > 0) {
    for (const step of root.steps) {
      calls.push(method('step', [renderStep(step, ctx)]));
    }
  }

  const chainSource = ['pipeline()', ...calls.map((c) => '  ' + c)].join('\n');
  const referencedTemplates = [...ctx.templates.values()];

  // Templates that are imported by name need to land in the import block.
  for (const t of referencedTemplates) {
    ctx.imports.add(`./templates/${baseName(t.templatePath)}.js`, t.identifier);
  }

  const importBlock = ctx.imports.render();
  const source =
    (importBlock ? importBlock + '\n\n' : '') +
    'export default ' +
    chainSource +
    ';\n';
  return { source, imports: importBlock, referencedTemplates };
}

// ---- top-level helpers --------------------------------------------------

function renderTopLevelStage(stage: AnyStage, ctx: Ctx): string[] {
  if ('template' in stage) {
    const id = registerTemplate(ctx, stage.template, 'stages');
    if (stage.parameters) {
      ctx.imports.add(UTILS, 'extend');
      return [method('stageTemplateRef', [`extend(${id}, ${valueArg(stage.parameters)})`])];
    }
    return [method('stageTemplate', [strLit(stage.template)])];
  }
  return [method('stage', [strLit(stage.stage), renderStageBody(stage, ctx)])];
}

function renderTopLevelJob(job: AnyJob, ctx: Ctx): string[] {
  if ('template' in job) {
    const id = registerTemplate(ctx, job.template, 'jobs');
    if (job.parameters) {
      ctx.imports.add(UTILS, 'extend');
      return [method('jobTemplate', [`extend(${id}, ${valueArg(job.parameters)})`])];
    }
    return [method('jobTemplate', [strLit(job.template)])];
  }
  if ('deployment' in job) {
    return [renderDeploymentJobCall(job, ctx)];
  }
  return [method('job', [strLit(job.job), renderJobBody(job, ctx)])];
}

// ---- stage body ---------------------------------------------------------

function renderStageBody(stage: Exclude<AnyStage, { template: string }>, ctx: Ctx): string {
  const calls: string[] = [];
  if (stage.displayName !== undefined) calls.push(method('displayName', [valueArg(stage.displayName)]));
  if (stage.dependsOn !== undefined) calls.push(method('dependsOn', [valueArg(stage.dependsOn)]));
  if (stage.condition !== undefined) calls.push(method('condition', [valueArg(stage.condition)]));
  if (stage.pool !== undefined) calls.push(method('pool', [valueArg(stage.pool)]));
  if (stage.lockBehavior !== undefined) calls.push(method('lockBehavior', [valueArg(stage.lockBehavior)]));
  if (stage.trigger !== undefined) calls.push(method('trigger', [valueArg(stage.trigger)]));
  if (stage.variables) {
    for (const v of stage.variables) calls.push(...renderVariableMethod(v, ctx));
  }
  if (stage.jobs) {
    for (const job of stage.jobs) {
      if ('template' in job) {
        const id = registerTemplate(ctx, job.template, 'jobs');
        if (job.parameters) {
          ctx.imports.add(UTILS, 'extend');
          calls.push(method('jobTemplate', [`extend(${id}, ${valueArg(job.parameters)})`]));
        } else {
          calls.push(method('jobTemplate', [strLit(job.template)]));
        }
      } else if ('deployment' in job) {
        calls.push(renderDeploymentJobCall(job, ctx));
      } else {
        calls.push(method('job', [strLit(job.job), renderJobBody(job, ctx)]));
      }
    }
  }
  return arrowExpr('s', calls);
}

// ---- jobs ---------------------------------------------------------------

function renderJobBody(job: JobObject, ctx: Ctx): string {
  const calls: string[] = [];
  if (job.displayName !== undefined) calls.push(method('displayName', [valueArg(job.displayName)]));
  if (job.pool !== undefined) calls.push(method('pool', [valueArg(job.pool)]));
  if (job.dependsOn !== undefined) calls.push(method('dependsOn', [valueArg(job.dependsOn)]));
  if (job.condition !== undefined) calls.push(method('condition', [valueArg(job.condition)]));
  if (job.continueOnError !== undefined) calls.push(method('continueOnError', [valueArg(job.continueOnError)]));
  if (job.timeoutInMinutes !== undefined)
    calls.push(method('timeoutInMinutes', [valueArg(job.timeoutInMinutes)]));
  if (job.strategy !== undefined) calls.push(method('strategy', [valueArg(job.strategy)]));
  if (job.container !== undefined) calls.push(method('container', [valueArg(job.container)]));
  if (job.services !== undefined) calls.push(method('services', [valueArg(job.services)]));
  if (job.variables) {
    for (const v of job.variables) calls.push(...renderVariableMethod(v, ctx));
  }
  if (job.steps) {
    for (const step of job.steps) calls.push(method('step', [renderStep(step, ctx)]));
  }
  return arrowExpr('j', calls);
}

function renderDeploymentJobCall(d: DeploymentJobObject, ctx: Ctx): string {
  // DeploymentJobBuilder takes `(name, init, configure?)`. Init must include
  // `environment`; we collect everything else that goes into the init plus a
  // configurator for steps and the like via .runOnce(...).
  const init: Record<string, unknown> = { environment: d.environment };
  if (d.pool !== undefined) init['pool'] = d.pool;
  if (d.displayName !== undefined) init['displayName'] = d.displayName;
  if (d.dependsOn !== undefined) init['dependsOn'] = d.dependsOn;
  if (d.condition !== undefined) init['condition'] = d.condition;
  if (d.continueOnError !== undefined) init['continueOnError'] = d.continueOnError;
  if (d.timeoutInMinutes !== undefined) init['timeoutInMinutes'] = d.timeoutInMinutes;
  if (d.strategy !== undefined) init['strategy'] = d.strategy;
  // variables go through the configurator so PreDef rewrites apply via valueArg
  const subCalls: string[] = [];
  if (d.variables) {
    for (const v of d.variables) subCalls.push(...renderVariableMethod(v, ctx));
  }
  // If runOnce.deploy.steps exist, lift them through .runOnce
  const ro = (d.strategy as { runOnce?: { deploy?: { steps?: Step[] } } } | undefined)?.runOnce;
  if (ro?.deploy?.steps) {
    delete init['strategy'];
    const steps = ro.deploy.steps.map((s) => renderStep(s, ctx)).join(', ');
    subCalls.push(`.runOnce([${steps}])`);
  }
  const args = [strLit(d.deployment), valueArg(init)];
  if (subCalls.length > 0) args.push(arrowExpr('d', subCalls));
  return method('deployment', args);
}

// ---- steps --------------------------------------------------------------

function renderStep(step: Step, ctx: Ctx): string {
  if ('script' in step) return renderScriptLikeStep('script', step.script, step, ctx);
  if ('bash' in step) return renderScriptLikeStep('bash', step.bash, step, ctx);
  if ('pwsh' in step) return renderScriptLikeStep('pwsh', step.pwsh, step, ctx);
  if ('powershell' in step) return renderScriptLikeStep('powershell', step.powershell, step, ctx);
  if ('checkout' in step) return renderCheckoutStep(step, ctx);
  if ('download' in step) return renderDownloadStep(step, ctx);
  if ('publish' in step) return renderPublishStep(step, ctx);
  if ('task' in step) return renderTaskStep(step, ctx);
  if ('template' in step) return renderStepTemplate(step, ctx);
  // Unknown — fall through to a literal object cast.
  return valueArg(step);
}

function renderScriptLikeStep(
  factory: 'script' | 'bash' | 'pwsh' | 'powershell',
  body: string,
  step: object,
  ctx: Ctx,
): string {
  ctx.imports.add(AZPIPE, factory);
  const opts: Record<string, unknown> = { ...(step as Record<string, unknown>) };
  delete opts[factory];
  if (Object.keys(opts).length === 0) return `${factory}(${valueArg(body)})`;
  return `${factory}(${valueArg(body)}, ${valueArg(opts)})`;
}

function renderCheckoutStep(step: CheckoutStep, ctx: Ctx): string {
  ctx.imports.add(AZPIPE, 'checkout');
  const ref = step.checkout;
  const opts: Record<string, unknown> = { ...step };
  delete opts['checkout'];
  if (Object.keys(opts).length === 0) return `checkout(${valueArg(ref)})`;
  return `checkout(${valueArg(ref)}, ${valueArg(opts)})`;
}

function renderDownloadStep(step: DownloadStep, ctx: Ctx): string {
  ctx.imports.add(AZPIPE, 'download');
  const src = step.download;
  const opts: Record<string, unknown> = { ...step };
  delete opts['download'];
  if (Object.keys(opts).length === 0) return `download(${valueArg(src)})`;
  return `download(${valueArg(src)}, ${valueArg(opts)})`;
}

function renderPublishStep(step: PublishStep, ctx: Ctx): string {
  ctx.imports.add(AZPIPE, 'publish');
  const path = step.publish;
  const opts: Record<string, unknown> = { ...step };
  delete opts['publish'];
  if (Object.keys(opts).length === 0) return `publish(${valueArg(path)})`;
  return `publish(${valueArg(path)}, ${valueArg(opts)})`;
}

function renderTaskStep(step: TaskStep, ctx: Ctx): string {
  const match = findTaskFactoryByRef(step.task);
  const opts: Record<string, unknown> = { ...step };
  delete opts['task'];
  delete opts['inputs'];
  if (match) {
    ctx.imports.add(TASKS, match.factory);
    const inputsArg = step.inputs ? valueArg(step.inputs) : '{}';
    if (Object.keys(opts).length === 0) return `${match.factory}(${inputsArg})`;
    return `${match.factory}(${inputsArg}, ${valueArg(opts)})`;
  }
  // Unknown task — fall back to raw `task('Foo@1', { inputs, ... })`.
  ctx.imports.add(AZPIPE, 'task');
  const allOpts: Record<string, unknown> = { ...opts };
  if (step.inputs) allOpts['inputs'] = step.inputs;
  if (Object.keys(allOpts).length === 0) return `task(${valueArg(step.task)})`;
  return `task(${valueArg(step.task)}, ${valueArg(allOpts)})`;
}

function renderStepTemplate(step: StepTemplateRef, ctx: Ctx): string {
  const id = registerTemplate(ctx, step.template, 'steps');
  if (step.parameters) {
    ctx.imports.add(UTILS, 'extend');
    return `extend(${id}, ${valueArg(step.parameters)})`;
  }
  ctx.imports.add(AZPIPE, 'stepTemplate');
  return `stepTemplate(${valueArg(step.template)})`;
}

// ---- variables ----------------------------------------------------------

function renderVariableMethod(v: Variable, ctx: Ctx): string[] {
  if ('group' in v) return [method('variableGroup', [valueArg(v.group)])];
  if ('template' in v) {
    const id = registerTemplate(ctx, v.template, 'variables');
    if (v.parameters) {
      ctx.imports.add(UTILS, 'extend');
      return [method('variables', [`[extend(${id}, ${valueArg(v.parameters)})]`])];
    }
    return [method('variables', [`[{ template: ${valueArg(v.template)} }]`])];
  }
  // Inline name/value variable.
  const args: string[] = [strLit(v.name), valueArg(v.value)];
  if ('readonly' in v && v.readonly !== undefined) args.push(valueArg(v.readonly));
  return [method('variable', args)];
}

// ---- triggers -----------------------------------------------------------

function renderCITrigger(trigger: CITriggerInput): string {
  return valueArg(trigger);
}

function renderPRTrigger(trigger: PRTriggerInput): string {
  return valueArg(trigger);
}

// ---- helpers ------------------------------------------------------------

function method(name: string, args: string[]): string {
  return '.' + name + '(' + args.join(', ') + ')';
}

/** Render a chain of method-call strings into a `(p) => p<calls>` arrow. */
function arrowExpr(param: string, calls: string[]): string {
  if (calls.length === 0) return `(${param}) => ${param}`;
  return `(${param}) => ${param}` + calls.join('');
}

/** Render a value that may already be a {@link RawExpr} (from predef rewrite)
 *  or a regular JS value. Non-RawExpr values flow through `expr()`. */
function valueArg(v: unknown): string {
  if (isRaw(v)) return v.source;
  return expr(v, 0);
}

function renderArray(arr: unknown[]): string {
  if (arr.length === 0) return '[]';
  return '[' + arr.map((v) => valueArg(v)).join(', ') + ']';
}

function registerTemplate(
  ctx: Ctx,
  templatePath: string,
  kind: ReferencedTemplate['kind'],
): string {
  const existing = ctx.templates.get(templatePath);
  if (existing) return existing.identifier;
  const baseId = camelCase(stripAtRepo(baseName(templatePath)));
  const identifier = ctx.scope.reserve(baseId || 'tpl');
  ctx.templates.set(templatePath, { templatePath, identifier, kind });
  return identifier;
}

function stripAtRepo(s: string): string {
  const at = s.indexOf('@');
  return at >= 0 ? s.slice(0, at) : s;
}

function baseName(p: string): string {
  // Trim @repo, then strip directories and extension.
  const noAt = stripAtRepo(p);
  const slash = noAt.lastIndexOf('/');
  const tail = slash >= 0 ? noAt.slice(slash + 1) : noAt;
  return tail.replace(/\.ya?ml$/i, '');
}

// Re-export for tests.
export { type RawExpr, raw };
