/**
 * Parse a GitHub Actions workflow YAML document into a typed {@link WorkflowRoot}.
 *
 * The parser is deliberately lenient: it validates that the document looks like
 * a GitHub Actions workflow (has `on:` and `jobs:` keys) but does not perform
 * deep schema validation. The emitter handles gaps gracefully.
 */

import { parse as parseYaml } from 'yaml';
import type { WorkflowRoot } from '@mauvezero/ghactions';

export interface GhaParseResult {
  workflow: WorkflowRoot;
  /** Non-fatal warnings about constructs that may not convert cleanly. */
  warnings: string[];
}

export class GhaParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GhaParseError';
  }
}

/**
 * Parse GitHub Actions workflow YAML text into a {@link WorkflowRoot} object.
 *
 * @throws {GhaParseError} for YAML syntax errors or clearly non-GHA documents.
 */
export function parseGhaYaml(yamlText: string): GhaParseResult {
  let raw: unknown;
  try {
    raw = parseYaml(yamlText);
  } catch (err) {
    throw new GhaParseError(`YAML parse failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new GhaParseError('GitHub Actions workflow YAML root must be a mapping.');
  }

  const doc = raw as Record<string, unknown>;

  if (!('on' in doc) && !('true' in doc)) {
    throw new GhaParseError(
      'Document does not appear to be a GitHub Actions workflow: missing "on:" trigger key.',
    );
  }
  if (!('jobs' in doc) || typeof doc['jobs'] !== 'object' || Array.isArray(doc['jobs'])) {
    throw new GhaParseError(
      'Document does not appear to be a GitHub Actions workflow: missing or invalid "jobs:" key.',
    );
  }

  const warnings: string[] = [];
  const jobs = doc['jobs'] as Record<string, unknown>;
  for (const [jobId, job] of Object.entries(jobs)) {
    if (job !== null && typeof job === 'object' && !Array.isArray(job)) {
      const j = job as Record<string, unknown>;
      // Reusable workflow job — uses a remote workflow file instead of local steps
      if ('uses' in j && !('steps' in j)) {
        warnings.push(
          `Job "${jobId}" calls a reusable workflow (uses: ${String(j['uses'])}). ` +
            'Reusable workflow jobs are emitted as-is and will need manual adjustment.',
        );
      }
      if ('secrets' in j && typeof j['secrets'] === 'string') {
        warnings.push(
          `Job "${jobId}" inherits secrets ("secrets: ${String(j['secrets'])}"). ` +
            'The generated code preserves this field as a plain object property.',
        );
      }
    }
  }

  return { workflow: doc as unknown as WorkflowRoot, warnings };
}
