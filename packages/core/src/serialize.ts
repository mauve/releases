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

/**
 * Recursively normalize `patterns: string[]` on download steps to the
 * newline-delimited string that Azure Pipelines expects. Only objects that
 * carry a `download` key (i.e. `DownloadStep`-shaped nodes) are touched so
 * unrelated `patterns` fields are left alone.
 */
function normalizePatterns(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalizePatterns);
  if (value !== null && typeof value === 'object') {
    const rec = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(rec)) {
      if (k === 'patterns' && Array.isArray(v) && 'download' in rec) {
        out[k] = (v as string[]).join('\n');
      } else {
        out[k] = normalizePatterns(v);
      }
    }
    return out;
  }
  return value;
}

export function toYaml(pipeline: unknown, opts: SerializeOptions = {}): string {
  const normalized = normalizePatterns(pipeline);
  if (opts.validate !== false) {
    const result = validatePipeline(normalized);
    if (!result.ok) throw new PipelineValidationError(result.errors);
  }
  const doc = new Document(normalized);
  return doc.toString({ ...defaultYamlOptions, ...(opts.yaml ?? {}) });
}

export function toJson(pipeline: unknown, opts: SerializeOptions = {}): string {
  const normalized = normalizePatterns(pipeline);
  if (opts.validate !== false) {
    const result = validatePipeline(normalized);
    if (!result.ok) throw new PipelineValidationError(result.errors);
  }
  return JSON.stringify(normalized, null, 2) + '\n';
}
