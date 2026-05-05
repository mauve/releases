import type { AnyJob, AnyStage, Step, Variable } from '@mauvezero/azpipe';

/** Spec for a single template parameter. The TS type of `default` is the
 *  inferred parameter type when consumers call `extend(...)`. */
export type ParamType = 'string' | 'number' | 'boolean' | 'object' | 'stepList' | 'jobList' | 'stageList';

export interface ParamSpec<T> {
  type: ParamType;
  default?: T;
  values?: readonly T[];
  displayName?: string;
}

export type ParamShape = Record<string, ParamSpec<unknown>>;

// Map a ParamSpec back to its TS value type.
type ParamValue<S> = S extends ParamSpec<infer T> ? T : never;

// The object passed to a template body — all params, with optionals where defaults exist.
export type ParamsOf<P extends ParamShape> = {
  [K in keyof P as P[K] extends { default: unknown } ? K : never]?: ParamValue<P[K]>;
} & {
  [K in keyof P as P[K] extends { default: unknown } ? never : K]: ParamValue<P[K]>;
};

// What a template body may emit — fragments to splice into the consumer.
export interface TemplateOutput {
  stages?: AnyStage[];
  jobs?: AnyJob[];
  steps?: Step[];
  variables?: Variable[];
}

export type TemplateKind = 'steps' | 'jobs' | 'stages' | 'variables' | 'extends';

export interface TemplateDefinition<P extends ParamShape, K extends TemplateKind> {
  /** Stable name. Used as the on-disk filename when emitted. */
  readonly name: string;
  readonly kind: K;
  readonly parameters: P;
  readonly body: (params: ParamsOf<P>) => TemplateOutput;
  /** Path used when this template is referenced via `template:` — e.g. `templates/build.yml`. */
  readonly path: string;
}

export interface DefineTemplateOptions<P extends ParamShape, K extends TemplateKind> {
  name: string;
  kind: K;
  parameters: P;
  body: (params: ParamsOf<P>) => TemplateOutput;
  /** Override the default `templates/<name>.yml` path. */
  path?: string;
}

export function defineTemplate<P extends ParamShape, K extends TemplateKind>(
  opts: DefineTemplateOptions<P, K>,
): TemplateDefinition<P, K> {
  return {
    name: opts.name,
    kind: opts.kind,
    parameters: opts.parameters,
    body: opts.body,
    path: opts.path ?? `templates/${opts.name}.yml`,
  };
}

/** Render a template definition to a YAML-serializable object including
 *  the Azure-style `parameters:` block. Used by the CLI when emitting
 *  template files alongside the main pipeline. */
export function renderTemplateFile<P extends ParamShape, K extends TemplateKind>(
  def: TemplateDefinition<P, K>,
): Record<string, unknown> {
  const parameters = Object.entries(def.parameters).map(([name, spec]) => {
    const out: Record<string, unknown> = { name, type: spec.type };
    if ('default' in spec && spec.default !== undefined) out['default'] = spec.default;
    if (spec.values) out['values'] = spec.values;
    if (spec.displayName) out['displayName'] = spec.displayName;
    return out;
  });
  // Build the body using the parameter defaults (for shape only — parameter
  // references in actual values are user-supplied as `${{ parameters.X }}`).
  const placeholders = Object.fromEntries(
    Object.entries(def.parameters).map(([k]) => [k, `\${{ parameters.${k} }}`]),
  ) as ParamsOf<P>;
  const body = def.body(placeholders);
  return { parameters, ...body };
}

/** Build a `template:` reference object with type-checked parameters. */
export function extend<P extends ParamShape, K extends TemplateKind>(
  def: TemplateDefinition<P, K>,
  params: ParamsOf<P>,
): { template: string; parameters: ParamsOf<P> } {
  return { template: def.path, parameters: params };
}
