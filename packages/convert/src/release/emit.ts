/**
 * Emit TypeScript source from a classic-release {@link ReleaseDefinition}.
 *
 * Mirrors the YAML emitter's strategy: build a top-level fluent expression
 * (`releasePipeline({...}).artifact(...).environment(...)`), collect imports,
 * and let Prettier reformat the output. Artifacts are bound to local consts
 * so triggers can reference them by reference (matching examples/release-minimal).
 */

import type {
  Artifact,
  ApprovalsBlock,
  ConfigurationVariableValue,
  DeployPhase,
  GatesBlock,
  GateStep,
  ReleaseDefinition,
  ReleaseEnvironmentDefinition,
  ReleaseTrigger,
  WorkflowTask,
} from '@mauvezero/azpipe-releases';
import {
  expr,
  isRaw,
  strLit,
  ImportCollector,
} from '../codegen/printer.js';
import { rewriteTree } from '../codegen/predef.js';
import { findTaskFactoryByGuid } from '../codegen/tasks.js';
import { camelCase, IdentifierScope } from '../codegen/identifiers.js';

const RELEASES = '@mauve/azpipe-releases';
const TASKS = '@mauve/azpipe-tasks';
const UTILS = '@mauve/azpipe-utils';
const AZPIPE = '@mauve/azpipe';

export interface ReleaseEmitOptions {
  /** Org local field — not part of the wire definition. */
  org: string;
  /** Project local field. */
  project: string;
  /** Optional resolver for service-connection GUIDs to friendly names. */
  resolveServiceConnections?: (guid: string) => string | undefined;
  /** Optional resolver for queue ids to friendly names. */
  resolveQueueNames?: (queueId: number) => string | undefined;
}

export interface ReleaseEmitResult {
  source: string;
}

interface Ctx {
  imports: ImportCollector;
  scope: IdentifierScope;
  /** alias → const identifier we picked for it. */
  artifactConsts: Map<string, string>;
  opts: ReleaseEmitOptions;
}

/** Convert a release definition to TS source. */
export function emitReleaseSource(
  def: ReleaseDefinition,
  opts: ReleaseEmitOptions,
): ReleaseEmitResult {
  const { value: rewritten, usedNamespaces } = rewriteTree(def, 'release');
  const root = rewritten as ReleaseDefinition;

  const ctx: Ctx = {
    imports: new ImportCollector(),
    scope: new IdentifierScope(),
    artifactConsts: new Map(),
    opts,
  };
  ctx.imports.add(RELEASES, 'releasePipeline');
  if (usedNamespaces.size > 0) ctx.imports.add(UTILS, 'PreDef');

  // 1) Pre-emit any artifact consts so triggers and environments can reference
  // them by name. This matches the canonical release example style.
  const artifactDecls: string[] = [];
  for (const a of root.artifacts ?? []) {
    artifactDecls.push(emitArtifactDecl(a, ctx));
  }

  // 2) Build the main fluent chain.
  const init: Record<string, unknown> = {
    org: opts.org,
    project: opts.project,
    name: root.name,
  };
  if (root.path !== undefined) init['path'] = root.path;
  if (root.description !== undefined) init['description'] = root.description;
  if (root.releaseNameFormat !== undefined) init['releaseNameFormat'] = root.releaseNameFormat;

  const calls: string[] = [];

  for (const a of root.artifacts ?? []) {
    const id = ctx.artifactConsts.get(a.alias);
    if (id) calls.push(`.artifact(${id})`);
  }

  for (const t of root.triggers ?? []) {
    calls.push(`.${renderTriggerMethod(t, ctx)}`);
  }

  if (root.variables) {
    for (const [name, val] of Object.entries(root.variables)) {
      calls.push(renderVariableCall(name, val));
    }
  }
  if (root.variableGroups && root.variableGroups.length > 0) {
    calls.push(`.variableGroups(${root.variableGroups.join(', ')})`);
  }
  if (root.tags && root.tags.length > 0) {
    calls.push(`.tags(${root.tags.map((t) => strLit(t)).join(', ')})`);
  }

  const sortedEnvs = [...(root.environments ?? [])].sort((a, b) => a.rank - b.rank);
  for (const env of sortedEnvs) {
    calls.push(renderEnvironmentCall(env, ctx));
  }

  const initLiteral = expr(init, 0);
  const chainSource =
    `releasePipeline(${initLiteral})\n` +
    calls.map((c) => '  ' + c).join('\n');

  const importBlock = ctx.imports.render();
  const declBlock = artifactDecls.length > 0 ? artifactDecls.join('\n\n') + '\n\n' : '';
  const source =
    (importBlock ? importBlock + '\n\n' : '') +
    declBlock +
    'export default ' + chainSource + ';\n';
  return { source };
}

// ---- artifacts ----------------------------------------------------------

function emitArtifactDecl(a: Artifact, ctx: Ctx): string {
  const id = ctx.scope.reserveFromName(a.alias);
  ctx.artifactConsts.set(a.alias, id);
  switch (a.type) {
    case 'Build':
      return emitBuildArtifactDecl(id, a, ctx);
    case 'Git':
      return emitGitArtifactDecl(id, a, ctx);
    case 'GitHub':
      return emitGitHubArtifactDecl(id, a, ctx);
    default:
      // Unknown / unsupported type — fall back to passing the raw object
      // through `releasePipeline().artifact(...)`. We still generate a const
      // so downstream triggers can reference the same alias by identifier.
      return `// TODO: unsupported artifact type ${strLit(a.type)} — review the raw shape\nconst ${id} = ${expr(a, 0)};`;
  }
}

function ref(
  map: Record<string, { name?: string; id?: string }> | undefined,
  key: string,
): string | undefined {
  return map?.[key]?.name ?? map?.[key]?.id;
}

function emitBuildArtifactDecl(id: string, a: Artifact, ctx: Ctx): string {
  ctx.imports.add(RELEASES, 'buildArtifact');
  const dr = a.definitionReference;
  const spec: Record<string, unknown> = {
    alias: a.alias,
    definitionId: maybeNumber(ref(dr, 'definition')),
  };
  const project = ref(dr, 'project');
  if (project) spec['projectId'] = project;
  const dvt = ref(dr, 'defaultVersionType');
  if (dvt) spec['defaultVersionType'] = dvt;
  const dvb = ref(dr, 'defaultVersionBranch');
  if (dvb) spec['defaultVersionBranch'] = dvb;
  if (a.isPrimary) spec['isPrimary'] = true;
  if (a.isRetained) spec['isRetained'] = true;
  return `const ${id} = buildArtifact(${expr(spec, 0)});`;
}

function emitGitArtifactDecl(id: string, a: Artifact, ctx: Ctx): string {
  ctx.imports.add(RELEASES, 'gitArtifact');
  const dr = a.definitionReference;
  const spec: Record<string, unknown> = {
    alias: a.alias,
    projectId: ref(dr, 'project') ?? '',
    definitionId: ref(dr, 'definition') ?? '',
  };
  const dvt = ref(dr, 'defaultVersionType');
  if (dvt) spec['defaultVersionType'] = dvt;
  const dvb = ref(dr, 'defaultVersionBranch');
  if (dvb) spec['defaultVersionBranch'] = dvb;
  if (a.isPrimary) spec['isPrimary'] = true;
  if (a.isRetained) spec['isRetained'] = true;
  return `const ${id} = gitArtifact(${expr(spec, 0)});`;
}

function emitGitHubArtifactDecl(id: string, a: Artifact, ctx: Ctx): string {
  ctx.imports.add(RELEASES, 'gitHubArtifact');
  const dr = a.definitionReference;
  const spec: Record<string, unknown> = {
    alias: a.alias,
    connection: ref(dr, 'connection') ?? '',
    definitionId: ref(dr, 'definition') ?? '',
  };
  const dvt = ref(dr, 'defaultVersionType');
  if (dvt) spec['defaultVersionType'] = dvt;
  const dvb = ref(dr, 'defaultVersionBranch');
  if (dvb) spec['defaultVersionBranch'] = dvb;
  if (a.isPrimary) spec['isPrimary'] = true;
  if (a.isRetained) spec['isRetained'] = true;
  return `const ${id} = gitHubArtifact(${expr(spec, 0)});`;
}

function maybeNumber(s: string | undefined): unknown {
  if (s === undefined) return undefined;
  const n = Number(s);
  return Number.isFinite(n) && String(n) === s ? n : s;
}

// ---- triggers -----------------------------------------------------------

function renderTriggerMethod(t: ReleaseTrigger, ctx: Ctx): string {
  switch (t.triggerType) {
    case 'artifactSource': {
      const id = ctx.artifactConsts.get(t.artifactAlias);
      if (id) return `trigger(${id})`;
      ctx.imports.add(RELEASES, 'artifactSourceTrigger');
      return `trigger(artifactSourceTrigger(${strLit(t.artifactAlias)}))`;
    }
    case 'schedule': {
      ctx.imports.add(RELEASES, 'scheduleTrigger');
      return `trigger(scheduleTrigger(${expr(t.schedule, 0)}))`;
    }
    case 'sourceRepo': {
      ctx.imports.add(RELEASES, 'sourceRepoTrigger');
      const opts: Record<string, unknown> = {};
      if (t.alias) opts['alias'] = t.alias;
      if (t.branchFilters) opts['branchFilters'] = t.branchFilters;
      return `trigger(sourceRepoTrigger(${expr(opts, 0)}))`;
    }
    case 'pullRequest': {
      ctx.imports.add(RELEASES, 'pullRequestTrigger');
      const id = ctx.artifactConsts.get(t.artifactAlias);
      const arg = id ?? strLit(t.artifactAlias);
      return `trigger(pullRequestTrigger(${arg}))`;
    }
    case 'containerImage': {
      ctx.imports.add(RELEASES, 'containerImageTrigger');
      return `trigger(containerImageTrigger(${strLit(t.alias)}))`;
    }
    case 'package': {
      ctx.imports.add(RELEASES, 'packageTrigger');
      return `trigger(packageTrigger(${strLit(t.alias)}))`;
    }
  }
}

// ---- variables ----------------------------------------------------------

function renderVariableCall(name: string, val: ConfigurationVariableValue): string {
  // If it's just `{ value }` we can pass the bare string. Anything richer
  // (isSecret, allowOverride) goes through as the full object.
  const keys = Object.keys(val);
  if (keys.length === 1 && keys[0] === 'value') {
    return `.variable(${strLit(name)}, ${valueArgRender(val.value ?? '')})`;
  }
  return `.variable(${strLit(name)}, ${expr(val, 0)})`;
}

function valueArgRender(v: unknown): string {
  if (isRaw(v)) return v.source;
  return expr(v, 0);
}

// ---- environments -------------------------------------------------------

function renderEnvironmentCall(env: ReleaseEnvironmentDefinition, ctx: Ctx): string {
  const calls: string[] = [];

  // dependsOn, derived from environmentState conditions.
  const stateConditions = (env.conditions ?? []).filter((c) => c.conditionType === 'environmentState');
  if (stateConditions.length > 0) {
    // Group sources by value (state mask) so we can re-emit dependsOn calls
    // with matching whenStates.
    const groups = new Map<string, string[]>();
    for (const c of stateConditions) {
      const v = c.value ?? '4';
      const list = groups.get(v) ?? [];
      list.push(c.name ?? '');
      groups.set(v, list);
    }
    for (const [v, sources] of groups) {
      const filtered = sources.filter(Boolean);
      if (filtered.length === 0) continue;
      const names = filtered.map((s) => strLit(s)).join(', ');
      const states = stateMaskToOutcomes(v);
      if (states.length === 1 && states[0] === 'Succeeded') {
        calls.push(`.dependsOn(${names})`);
      } else {
        calls.push(
          `.dependsOn([${names}], { whenStates: [${states.map((s) => strLit(s)).join(', ')}] })`,
        );
      }
    }
  }

  // Approvals.
  if (env.preDeployApprovals && hasApprovers(env.preDeployApprovals)) {
    calls.push(renderApprovalCall('preApproval', env.preDeployApprovals, ctx));
  }
  if (env.postDeployApprovals && hasApprovers(env.postDeployApprovals)) {
    calls.push(renderApprovalCall('postApproval', env.postDeployApprovals, ctx));
  }

  // Gates.
  if (env.preDeploymentGates && hasGates(env.preDeploymentGates)) {
    calls.push(renderGatesCall('preGates', env.preDeploymentGates, ctx));
  }
  if (env.postDeploymentGates && hasGates(env.postDeploymentGates)) {
    calls.push(renderGatesCall('postGates', env.postDeploymentGates, ctx));
  }

  // Variables.
  if (env.variables) {
    for (const [name, val] of Object.entries(env.variables)) {
      calls.push(renderVariableCall(name, val));
    }
  }
  if (env.variableGroups && env.variableGroups.length > 0) {
    calls.push(`.variableGroups(${env.variableGroups.join(', ')})`);
  }

  if (env.retentionPolicy) {
    calls.push(`.retention(${expr(env.retentionPolicy, 0)})`);
  }

  // Phases.
  for (const phase of env.deployPhases ?? []) {
    calls.push(renderPhaseCall(phase, ctx));
  }

  return `.environment(${strLit(env.name)}, (e) => e${calls.join('')})`;
}

function hasApprovers(block: ApprovalsBlock): boolean {
  if (!block.approvals) return false;
  return block.approvals.some((a) => a.isAutomated === false);
}

function hasGates(block: GatesBlock): boolean {
  if (!block.gates || block.gates.length === 0) return false;
  return (block.gatesOptions?.isEnabled ?? false) || block.gates.length > 0;
}

function renderApprovalCall(method: 'preApproval' | 'postApproval', block: ApprovalsBlock, ctx: Ctx): string {
  ctx.imports.add(RELEASES, 'approval');
  const approverParts: string[] = [];
  for (const a of block.approvals ?? []) {
    if (a.isAutomated) continue;
    if (a.approver) {
      const display = a.approver.displayName;
      const upn = a.approver.uniqueName;
      if (typeof display === 'string' && typeof upn === 'string' && display === upn) {
        approverParts.push(strLit(display));
      } else {
        approverParts.push(expr(a.approver, 0));
      }
    }
  }

  const opts = block.approvalOptions ?? {};
  const trailers: string[] = [];
  if (opts.requiredApproverCount !== undefined && opts.requiredApproverCount !== 0)
    trailers.push(`requiredApproverCount: ${opts.requiredApproverCount}`);
  if (opts.releaseCreatorCanBeApprover === true)
    trailers.push(`releaseCreatorCanBeApprover: true`);
  if (opts.timeoutInMinutes !== undefined && opts.timeoutInMinutes !== 0)
    trailers.push(`timeoutInMinutes: ${opts.timeoutInMinutes}`);
  if (opts.executionOrder !== undefined && opts.executionOrder !== 'beforeGates')
    trailers.push(`executionOrder: ${strLit(opts.executionOrder)}`);

  const approversLit = `[${approverParts.join(', ')}]`;
  const objBody = [`approvers: ${approversLit}`, ...trailers].join(', ');
  return `.${method}(approval({ ${objBody} }))`;
}

function renderGatesCall(method: 'preGates' | 'postGates', block: GatesBlock, ctx: Ctx): string {
  ctx.imports.add(RELEASES, 'gates');
  ctx.imports.add(RELEASES, 'gate');
  const opts = block.gatesOptions ?? {};
  const gateExprs: string[] = [];
  for (const g of block.gates ?? []) {
    gateExprs.push(renderGateStep(g, ctx));
  }
  const parts: string[] = [];
  if (opts.timeout !== undefined) parts.push(`timeout: ${opts.timeout}`);
  if (opts.samplingInterval !== undefined && opts.samplingInterval !== 5)
    parts.push(`samplingInterval: ${opts.samplingInterval}`);
  if (opts.minimumSuccessDuration !== undefined && opts.minimumSuccessDuration !== 0)
    parts.push(`minimumSuccessDuration: ${opts.minimumSuccessDuration}`);
  if (opts.stabilizationTime !== undefined && opts.stabilizationTime !== 0)
    parts.push(`stabilizationTime: ${opts.stabilizationTime}`);
  parts.push(`gates: [${gateExprs.join(', ')}]`);
  return `.${method}(gates({ ${parts.join(', ')} }))`;
}

function renderGateStep(g: GateStep, ctx: Ctx): string {
  const tasks: string[] = [];
  for (const t of g.tasks ?? []) {
    tasks.push(renderWorkflowTaskAsTaskStep(t, ctx, /* allowGate */ true));
  }
  return `gate(${strLit(g.name ?? '')}${tasks.length > 0 ? ', ' + tasks.join(', ') : ''})`;
}

// ---- phases -------------------------------------------------------------

function renderPhaseCall(phase: DeployPhase, ctx: Ctx): string {
  switch (phase.phaseType) {
    case 'agentBasedDeployment':
      return renderAgentPhaseCall(phase, ctx);
    case 'runOnServer':
      return renderServerPhaseCall(phase, ctx);
    case 'deploymentGates':
      // Gates-only phase — no first-class builder helper, fall through to a
      // raw shape via the escape hatch.
      return `.phase(${expr(phase, 0)})`;
    default:
      return `.phase(${expr(phase, 0)})`;
  }
}

function renderAgentPhaseCall(phase: DeployPhase, ctx: Ctx): string {
  const calls: string[] = [];
  if (phase.name && phase.name !== 'Agent job') calls.push(`.name(${strLit(phase.name)})`);
  if (phase.refName) calls.push(`.refName(${strLit(phase.refName)})`);

  const di = (phase.deploymentInput ?? {}) as Record<string, unknown> & {
    queueId?: number;
    agentSpecification?: { identifier: string };
    demands?: string[];
    skipArtifactsDownload?: boolean;
    timeoutInMinutes?: number;
    enableAccessToken?: boolean;
  };
  // Pool resolution: prefer vmImage when agentSpecification is present,
  // otherwise resolve queueId via callback.
  const poolSpec: Record<string, unknown> = {};
  if (di.agentSpecification?.identifier) poolSpec['vmImage'] = di.agentSpecification.identifier;
  if (di.queueId !== undefined) {
    const name = ctx.opts.resolveQueueNames?.(di.queueId);
    if (name) poolSpec['name'] = name;
    else poolSpec['queueId'] = di.queueId;
  }
  if (di.demands && di.demands.length > 0) poolSpec['demands'] = di.demands;
  if (Object.keys(poolSpec).length > 0) calls.push(`.pool(${expr(poolSpec, 0)})`);
  if (di.skipArtifactsDownload) calls.push(`.skipArtifactsDownload()`);
  if (di.timeoutInMinutes !== undefined) calls.push(`.timeoutInMinutes(${di.timeoutInMinutes})`);
  if (di.enableAccessToken) calls.push(`.enableAccessToken()`);

  for (const t of phase.workflowTasks ?? []) {
    calls.push(renderWorkflowTaskMethod(t, ctx));
  }
  return `.agentPhase((p) => p${calls.join('')})`;
}

function renderServerPhaseCall(phase: DeployPhase, ctx: Ctx): string {
  const calls: string[] = [];
  if (phase.name && phase.name !== 'Agentless job') calls.push(`.name(${strLit(phase.name)})`);
  const di = (phase.deploymentInput ?? {}) as { timeoutInMinutes?: number };
  if (di.timeoutInMinutes !== undefined) calls.push(`.timeoutInMinutes(${di.timeoutInMinutes})`);
  for (const t of phase.workflowTasks ?? []) {
    calls.push(renderWorkflowTaskMethod(t, ctx));
  }
  return `.serverPhase((p) => p${calls.join('')})`;
}

// ---- workflow tasks (typed factory or raw fallback) --------------------

function renderWorkflowTaskMethod(task: WorkflowTask, ctx: Ctx): string {
  const taskExpr = renderWorkflowTaskAsTaskStep(task, ctx, /* allowGate */ false);
  if (taskExpr.startsWith('/* TODO ')) {
    // Raw passthrough — splice through .workflowTask().
    return `.workflowTask(${expr(task, 0)})`;
  }
  return `.step(${taskExpr})`;
}

function renderWorkflowTaskAsTaskStep(task: WorkflowTask, ctx: Ctx, allowGate: boolean): string {
  const match = findTaskFactoryByGuid(task.taskId, task.version);
  if (!match) {
    if (allowGate) {
      // Fall through with a fenced TODO so the user knows to wire up a custom helper.
      return `/* TODO unknown taskId ${task.taskId}@${task.version} */ ${strLit(`UNKNOWN:${task.taskId}@${task.version}`)}`;
    }
    return `/* TODO unknown taskId ${task.taskId}@${task.version} */`;
  }
  ctx.imports.add(TASKS, match.factory);
  const inputsObj = task.inputs ?? {};
  // Run predef rewrite on inputs values too.
  const rewritten = rewriteTree(inputsObj, 'release').value;
  const inputsExpr = expr(rewritten, 0);

  const opts: Record<string, unknown> = {};
  if (task.name) opts['displayName'] = task.name;
  if (task.refName) opts['name'] = task.refName;
  if (task.condition) opts['condition'] = task.condition;
  if (task.continueOnError) opts['continueOnError'] = task.continueOnError;
  if (task.timeoutInMinutes !== undefined) opts['timeoutInMinutes'] = task.timeoutInMinutes;
  if (task.retryCountOnTaskFailure !== undefined) opts['retryCountOnTaskFailure'] = task.retryCountOnTaskFailure;
  if (task.enabled === false) opts['enabled'] = false;

  if (Object.keys(opts).length === 0) return `${match.factory}(${inputsExpr})`;
  void AZPIPE;
  return `${match.factory}(${inputsExpr}, ${expr(opts, 0)})`;
}

// ---- environment-state mask helpers ------------------------------------

const OUTCOME_BITS: Record<string, number> = {
  Succeeded: 4,
  PartiallySucceeded: 8,
  Rejected: 16,
  Canceled: 32,
  Skipped: 64,
};
const OUTCOMES_BY_BIT = Object.entries(OUTCOME_BITS).reduce((m, [name, bit]) => {
  m.set(bit, name);
  return m;
}, new Map<number, string>());

function stateMaskToOutcomes(value: string): string[] {
  const mask = parseInt(value, 10);
  if (!Number.isFinite(mask)) return ['Succeeded'];
  const out: string[] = [];
  for (const [bit, name] of OUTCOMES_BY_BIT) {
    if ((mask & bit) !== 0) out.push(name);
  }
  return out.length > 0 ? out : ['Succeeded'];
}

void camelCase;
