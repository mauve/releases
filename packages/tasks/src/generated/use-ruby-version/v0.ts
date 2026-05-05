/* eslint-disable */
// Auto-generated from UseRubyVersionV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface UseRubyVersionV0Inputs {
  /**
   * Version spec
   *
   * Version range or exact version of a Ruby version to use.
   *
   * @default >= 2.4
   */
  "versionSpec": string;
  /**
   * Add to PATH
   *
   * Prepend the retrieved Ruby version to the PATH environment variable to make it available in
   * subsequent tasks or scripts without using the output variable.
   *
   * @default true
   */
  "addToPath"?: boolean;
}

/**
 * Use Ruby version
 *
 * Use the specified version of Ruby from the tool cache, optionally adding it to the PATH
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=2005989) or [see the
 * Ruby documentation](https://www.ruby-lang.org/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/tool/use-ruby-version
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/UseRubyVersionV0
 */
export function useRubyVersionV0(
  inputs: UseRubyVersionV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("UseRubyVersion@0", inputs as unknown as Record<string, unknown>, opts);
}
