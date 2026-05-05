/**
 * Helpers around classic-release JSON input. Strips server-managed audit
 * fields (`id`, `revision`, timestamps, `_links`, `createdBy`, etc.) so the
 * emitted TS round-trips cleanly through `azpipe release diff`.
 *
 * The actual JSON.parse step happens in the CLI/library entry point; this
 * module just normalizes shape for the emitter.
 */

import type { ReleaseDefinition } from '@mauvezero/azpipe-releases';

const SERVER_MANAGED_TOP: ReadonlyArray<keyof ReleaseDefinition> = [
  'id',
  'revision',
  'createdBy',
  'createdOn',
  'modifiedBy',
  'modifiedOn',
  'url',
  '_links',
  'isDeleted',
  'projectReference',
  'source',
] as ReadonlyArray<keyof ReleaseDefinition>;

/**
 * Strip server-managed fields from a raw {@link ReleaseDefinition}. The
 * returned definition is safe to feed into `releasePipeline(...)` — sending
 * an audit-stripped definition through `release push` will create or update
 * with no surprise diffs against the audit fields.
 */
export function stripServerFields(def: ReleaseDefinition): ReleaseDefinition {
  const out: ReleaseDefinition = { ...def };
  for (const k of SERVER_MANAGED_TOP) {
    delete out[k];
  }
  // Drop env-level audit + assigned ids too.
  if (out.environments) {
    out.environments = out.environments.map((env) => {
      const e = { ...env };
      delete e.id;
      delete e.badgeUrl;
      delete e.currentRelease;
      // Owner is server-supplied; keep null so we don't overwrite.
      return e;
    });
  }
  return out;
}
