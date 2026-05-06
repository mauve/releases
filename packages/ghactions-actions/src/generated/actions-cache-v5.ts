// Auto-generated from actions/cache@v5/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsCacheV5Inputs {
  /**
   * A list of files, directories, and wildcard patterns to cache and restore
   */
  "path": string | boolean | number;
  /**
   * An explicit key for restoring and saving the cache
   */
  "key": string | boolean | number;
  /**
   * An ordered multiline string listing the prefix-matched keys, that are used for restoring
   * stale cache if no cache hit occurred for key. Note `cache-hit` returns false in this case.
   */
  "restore-keys"?: string | boolean | number;
  /**
   * The chunk size used to split up large files during upload, in bytes
   */
  "upload-chunk-size"?: string | boolean | number;
  /**
   * An optional boolean when enabled, allows windows runners to save or restore caches that can
   * be restored or saved respectively on other platforms
   *
   * @default false
   */
  "enableCrossOsArchive"?: string | boolean | number;
  /**
   * Fail the workflow if cache entry is not found
   *
   * @default false
   */
  "fail-on-cache-miss"?: string | boolean | number;
  /**
   * Check if a cache entry exists for the given input(s) (key, restore-keys) without downloading
   * the cache
   *
   * @default false
   */
  "lookup-only"?: string | boolean | number;
  /**
   * Run the post step to save the cache even if another step before fails
   *
   * @default false
   */
  "save-always"?: string | boolean | number;
}

/**
 * Cache
 *
 * Cache artifacts like dependencies and build outputs to improve workflow execution time
 *
 * @see https://github.com/actions/cache
 */
export function actionsCacheV5(
  inputs: ActionsCacheV5Inputs,
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/cache@v5", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
