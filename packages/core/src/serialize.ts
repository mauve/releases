import { Document, type ToStringOptions } from 'yaml';
import { PipelineValidationError, validatePipeline } from './validate.js';

export interface SerializeOptions {
  /** Run schema validation before serializing. Default: true. */
  validate?: boolean;
  /** Override yaml stringify options. */
  yaml?: ToStringOptions;
}

const defaultYamlOptions: ToStringOptions = {
  indent: 2,
  lineWidth: 0,
  minContentWidth: 0,
  doubleQuotedAsJSON: false,
  defaultStringType: 'PLAIN',
  defaultKeyType: 'PLAIN',
};

export function toYaml(pipeline: unknown, opts: SerializeOptions = {}): string {
  if (opts.validate !== false) {
    const result = validatePipeline(pipeline);
    if (!result.ok) throw new PipelineValidationError(result.errors);
  }
  const doc = new Document(pipeline);
  return doc.toString({ ...defaultYamlOptions, ...(opts.yaml ?? {}) });
}

export function toJson(pipeline: unknown, opts: SerializeOptions = {}): string {
  if (opts.validate !== false) {
    const result = validatePipeline(pipeline);
    if (!result.ok) throw new PipelineValidationError(result.errors);
  }
  return JSON.stringify(pipeline, null, 2) + '\n';
}
