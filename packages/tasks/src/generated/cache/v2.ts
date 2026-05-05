/* eslint-disable */
// Auto-generated from CacheV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface CacheV2Inputs {
  /**
   * Key
   *
   * Key (unique identifier) for the cache. This should be a string that can be segmented using
   * '|'. File paths can be absolute or relative to $(System.DefaultWorkingDirectory).
   */
  "key": string;
  /**
   * Path
   *
   * Path of the folder to cache. Can be fully-qualified or relative to
   * $(System.DefaultWorkingDirectory). Wildcards are not supported.
   * [Variables](https://go.microsoft.com/fwlink/?LinkID=550988) are supported.
   */
  "path": string;
  /**
   * Cache hit variable
   *
   * Variable to set to 'true' when the cache is restored (i.e. a cache hit), otherwise set to
   * 'false'.
   */
  "cacheHitVar"?: string;
  /**
   * Additional restore key prefixes
   *
   * Additional restore key prefixes that are used if the primary key misses. This can be a
   * newline-delimited list of key prefixes.
   */
  "restoreKeys"?: string;
}

/**
 * Cache
 *
 * Cache files between runs
 *
 * Improve build performance by caching files, like dependencies, between pipeline runs.
 *
 * @see https://aka.ms/pipeline-caching-docs
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/CacheV2
 */
export function cacheV2(
  inputs: CacheV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Cache@2", inputs as unknown as Record<string, unknown>, opts);
}
