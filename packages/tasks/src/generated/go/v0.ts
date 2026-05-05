/* eslint-disable */
// Auto-generated from GoV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface GoV0Inputs {
  /**
   * Command
   *
   * Select a Go command to run. Select 'Custom' to use a command not listed here.
   *
   * - `get` — get
   * - `build` — build
   * - `test` — test
   * - `custom` — custom
   *
   * @default get
   */
  "command": "get" | "build" | "test" | "custom";
  /**
   * Custom command
   *
   * A custom Go command to execute. For example, to execute 'go version', enter 'version'.
   *
   * Only meaningful when: `command == custom`
   */
  "customCommand"?: string;
  /**
   * Arguments
   *
   * Optional arguments to the selected command. For example, build-time arguments for the 'go
   * build' command.
   */
  "arguments"?: string;
  /**
   * Working directory
   *
   * The working directory where the command will run. When empty, the root of the repository
   * (for builds) or artifacts (for releases) is used, which is the value of
   * '$(System.DefaultWorkingDirectory)'.
   *
   * In group: advanced
   */
  "workingDirectory"?: string;
}

/**
 * Go
 *
 * Get, build, or test a Go application, or run a custom Go command
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=867582)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/go
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/GoV0
 */
export function goV0(
  inputs: GoV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Go@0", inputs as unknown as Record<string, unknown>, opts);
}
