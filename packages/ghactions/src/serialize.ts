import { toYaml as coreToYaml, type SerializeOptions } from '@mauvezero/azpipe-core';

export type WorkflowSerializeOptions = Pick<SerializeOptions, 'yaml'>;

/**
 * Serialize a GitHub Actions workflow object to YAML.
 *
 * No schema validation is performed; TypeScript types enforce correctness at
 * compile time.
 *
 * @param workflow - A plain workflow object (typically from
 *   {@link "WorkflowBuilder.toObject"}) or any serializable value.
 * @param opts - Optional YAML serialization overrides.
 * @returns YAML string with a trailing newline.
 */
export function toYaml(workflow: unknown, opts: WorkflowSerializeOptions = {}): string {
  // Pass validate: false — Azure schema validation is not applicable to GHA.
  // The core normalizePatterns pass only touches nodes with a `download` key,
  // which GHA workflows never contain.
  return coreToYaml(workflow, { validate: false, ...opts });
}
