import { Ajv, type ErrorObject, type ValidateFunction } from 'ajv';
import * as addFormatsNs from 'ajv-formats';
import { azurePipelinesSchema } from './schema.js';

// ajv-formats ships its callable as a CJS default; normalize for ESM nodenext.
type AddFormatsFn = (ajv: Ajv) => Ajv;
const addFormats: AddFormatsFn =
  (addFormatsNs as unknown as { default?: AddFormatsFn }).default ??
  (addFormatsNs as unknown as AddFormatsFn);

export interface ValidationResult {
  ok: boolean;
  errors: ErrorObject[];
}

let cached: ValidateFunction | null = null;

/**
 * Azure's published JSON schema is stricter than the actual server-side validator
 * in two important ways:
 *   1. `string`-typed fields routinely accept numbers/booleans in real pipelines
 *      (e.g. `fetchDepth: 1`).
 *   2. Task validation enumerates known tasks with hard-coded names and per-task
 *      input shapes. Any task or input that's been added/changed since the schema
 *      was last published is rejected — even though Azure runs them fine.
 *
 * We patch the schema in-memory so we don't reject pipelines Azure would run.
 * Per-task input correctness is the responsibility of the typed TypeScript APIs
 * in `@mauvezero/azpipe-tasks`, not the runtime validator.
 */
function relaxSchema(schema: unknown): unknown {
  const cloned = JSON.parse(JSON.stringify(schema)) as {
    definitions?: Record<string, unknown>;
  };
  const defs = cloned.definitions ?? {};

  if (defs['string']) {
    defs['string'] = {
      anyOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
    };
  }
  if (defs['nonEmptyString']) {
    defs['nonEmptyString'] = {
      anyOf: [
        { type: 'string', minLength: 1 },
        { type: 'number' },
        { type: 'boolean' },
      ],
    };
  }
  if (defs['boolean']) {
    defs['boolean'] = {
      anyOf: [{ type: 'boolean' }, { type: 'string' }],
    };
  }

  // Replace the over-specific `task` definition with a permissive shape that
  // accepts any `task: <name>@<n>` and any inputs object. The schema's known-task
  // enumeration becomes outdated quickly; typed task helpers enforce input
  // correctness at compile time instead.
  if (defs['task']) {
    defs['task'] = {
      type: 'object',
      required: ['task'],
      properties: {
        task: { type: 'string' },
        inputs: { type: 'object', additionalProperties: true },
        displayName: { type: 'string' },
        name: { type: 'string' },
        condition: { type: 'string' },
        continueOnError: { anyOf: [{ type: 'boolean' }, { type: 'string' }] },
        enabled: { anyOf: [{ type: 'boolean' }, { type: 'string' }] },
        env: { type: 'object', additionalProperties: { type: 'string' } },
        timeoutInMinutes: { anyOf: [{ type: 'number' }, { type: 'string' }] },
        retryCountOnTaskFailure: { anyOf: [{ type: 'number' }, { type: 'string' }] },
        target: {},
      },
      additionalProperties: false,
    };
  }

  return cloned;
}

function getValidator(): ValidateFunction {
  if (cached) return cached;
  const ajv = new Ajv({
    allErrors: true,
    strict: false,
    allowUnionTypes: true,
    // Azure's schema uses patterns that aren't compatible with the `u` flag
    // (e.g. unnecessary `\/` escapes). Disable unicode regexes to match.
    unicodeRegExp: false,
  });
  addFormats(ajv);
  cached = ajv.compile(relaxSchema(azurePipelinesSchema) as object);
  return cached;
}

export function validatePipeline(value: unknown): ValidationResult {
  const validate = getValidator();
  const ok = validate(value) as boolean;
  return { ok, errors: ok ? [] : (validate.errors ?? []) };
}

export function formatValidationErrors(errors: ErrorObject[]): string {
  if (errors.length === 0) return '';
  return errors
    .map((e) => {
      const path = e.instancePath || '/';
      const detail = e.params ? JSON.stringify(e.params) : '';
      return `  ${path}: ${e.message ?? 'invalid'} ${detail}`.trim();
    })
    .join('\n');
}

export class PipelineValidationError extends Error {
  readonly errors: ErrorObject[];
  constructor(errors: ErrorObject[]) {
    super(`Pipeline failed schema validation:\n${formatValidationErrors(errors)}`);
    this.name = 'PipelineValidationError';
    this.errors = errors;
  }
}
