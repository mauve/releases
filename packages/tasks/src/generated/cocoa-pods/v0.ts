/* eslint-disable */
// Auto-generated from CocoaPodsV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface CocoaPodsV0Inputs {
  /**
   * Working directory
   *
   * Specify the working directory in which to execute this task. If left empty, the repository
   * directory will be used.
   */
  "cwd"?: string;
  /**
   * Force repo update
   *
   * Selecting this option will force running 'pod repo update' before install.
   *
   * @default false
   *
   * In group: advanced
   */
  "forceRepoUpdate": boolean;
  /**
   * Project directory
   *
   * Optionally specify the path to the root of the project directory. If left empty, the project
   * specified in the Podfile will be used. If no project is specified, then a search for an
   * Xcode project will be made. If more than one Xcode project is found, an error will occur.
   *
   * In group: advanced
   */
  "projectDirectory"?: string;
}

/**
 * CocoaPods
 *
 * Install CocoaPods dependencies for Swift and Objective-C Cocoa projects
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613745)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/package/cocoapods
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/CocoaPodsV0
 */
export function cocoaPodsV0(
  inputs: CocoaPodsV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("CocoaPods@0", inputs as unknown as Record<string, unknown>, opts);
}
