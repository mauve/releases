/**
 * Parse `azure-pipelines.yml` text into a {@link PipelineRoot}-shaped JS
 * object. Strict mode delegates to the workspace's existing AJV validator and
 * surfaces issues; lenient mode (the default for the converter) returns
 * whatever YAML.parse produced and lets the emit step handle gaps gracefully.
 */

import { parse as parseYaml } from 'yaml';
import { validatePipeline, formatValidationErrors } from '@mauvezero/azpipe-core';
import type { PipelineRoot } from '@mauvezero/azpipe';

export interface ParseOptions {
  /** When true, throw on schema-validation failures. Default: false (warnings
   *  are returned via {@link ParseResult.warnings}). */
  strict?: boolean;
}

export interface ParseResult {
  pipeline: PipelineRoot;
  /** Schema validation warnings (informational unless `strict: true`). */
  warnings: string[];
}

export class YamlParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'YamlParseError';
  }
}

/** Parse YAML and (optionally strictly) validate. */
export function parsePipelineYaml(yamlText: string, opts: ParseOptions = {}): ParseResult {
  let raw: unknown;
  try {
    raw = parseYaml(yamlText);
  } catch (err) {
    throw new YamlParseError(`YAML parse failed: ${err instanceof Error ? err.message : String(err)}`);
  }
  if (raw === null || typeof raw !== 'object') {
    throw new YamlParseError('YAML root must be a mapping');
  }
  const warnings: string[] = [];
  const result = validatePipeline(raw);
  if (!result.ok) {
    const msg = formatValidationErrors(result.errors);
    if (opts.strict) {
      throw new YamlParseError('Pipeline failed schema validation:\n' + msg);
    }
    warnings.push(msg);
  }
  return { pipeline: raw as PipelineRoot, warnings };
}
