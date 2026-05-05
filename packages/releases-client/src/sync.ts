import { createInterface } from 'node:readline';
import type { ReleaseDefinition } from '@mauvezero/azpipe-releases';
import { unified } from '@mauvezero/azpipe-utils/diff';
import type { ReleaseClient } from './client.js';
import { diffAgainstServer } from './diff.js';

export type PushReason = 'no-op' | 'dry-run' | 'declined' | 'applied';

export interface PushOptions {
  client: ReleaseClient;
  /** Skip the interactive prompt (use this in CI). */
  yes?: boolean;
  /** Print the diff but never PUT. */
  dryRun?: boolean;
  /** Stream for diff output. Default `process.stdout`. */
  out?: NodeJS.WritableStream;
  /** Stream used by the interactive prompt. Default `process.stdin`. */
  in?: NodeJS.ReadableStream;
  /** Override prompt for tests. Default reads y/N from stdin. */
  prompt?: (question: string) => Promise<boolean>;
  /** Colorize diff output (default: detect from `out.isTTY`). */
  color?: boolean;
}

export interface PushResult {
  reason: PushReason;
  /** Server revision before/after the operation, when known. */
  before?: number;
  after?: number;
}

/**
 * Diff-first PUT.
 *
 * Steps:
 * 1. Fetch the server's current definition.
 * 2. Diff vs `local` and print to `out`.
 * 3. Bail with `'no-op'` if no diff; `'dry-run'` if `dryRun`; `'declined'` if the prompt is rejected.
 * 4. Otherwise PUT, copying the server revision (or `0` for first-create) into `local.revision`.
 */
export async function push(local: ReleaseDefinition, opts: PushOptions): Promise<PushResult> {
  const out = opts.out ?? process.stdout;
  const color = opts.color ?? Boolean((out as { isTTY?: boolean }).isTTY);

  const { server, nodes } = await diffAgainstServer(local, opts.client);
  out.write(unified(nodes, { color }));

  if (nodes.length === 0) {
    out.write('No changes.\n');
    return { reason: 'no-op', before: server?.revision };
  }
  if (opts.dryRun) return { reason: 'dry-run', before: server?.revision };
  if (!opts.yes) {
    const confirmed = await (opts.prompt ?? defaultPrompt)('Apply? [y/N] ');
    if (!confirmed) return { reason: 'declined', before: server?.revision };
  }

  const toPut: ReleaseDefinition = { ...local, revision: server?.revision ?? 0 };
  if (server?.id !== undefined) toPut.id = server.id;
  const result = await opts.client.putDefinition(toPut);
  return { reason: 'applied', before: server?.revision, after: result.revision };
}

async function defaultPrompt(question: string): Promise<boolean> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const ans = await new Promise<string>((resolve) => rl.question(question, resolve));
    return /^y(es)?$/i.test(ans.trim());
  } finally {
    rl.close();
  }
}
