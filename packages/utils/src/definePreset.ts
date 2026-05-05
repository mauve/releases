/** Lightweight preset factory: a typed function that returns a pipeline fragment
 *  (steps/jobs/stages) given a parameter object. Useful for derived packages that
 *  ship reusable building blocks without going through the full template machinery. */
export interface PresetDefinition<Params, Output> {
  readonly name: string;
  readonly build: (params: Params) => Output;
}

export function definePreset<Params, Output>(
  name: string,
  build: (params: Params) => Output,
): PresetDefinition<Params, Output> {
  return { name, build };
}
