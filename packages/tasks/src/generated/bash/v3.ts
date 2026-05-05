/* eslint-disable */
// Auto-generated from BashV3/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface BashV3Inputs {
  /**
   * Type
   *
   * Target script type: File Path or Inline
   *
   * - `filePath` — File Path
   * - `inline` — Inline
   *
   * @default filePath
   */
  "targetType"?: "filePath" | "inline";
  /**
   * Script Path
   *
   * Path of the script to execute. Must be a fully qualified path or relative to
   * $(System.DefaultWorkingDirectory).
   *
   * Only meaningful when: `targetType = filePath`
   */
  "filePath"?: string;
  /**
   * Arguments
   *
   * Arguments passed to the shell script. Either ordinal parameters or named parameters.
   *
   * Only meaningful when: `targetType = filePath`
   */
  "arguments"?: string;
  /**
   * Script
   *
   * @default # Write your commands here
   *
   * echo 'Hello world'
   *
   * Only meaningful when: `targetType = inline`
   */
  "script"?: string;
  /**
   * Working Directory
   *
   * In group: advanced
   */
  "workingDirectory"?: string;
  /**
   * Fail on Standard Error
   *
   * If this is true, this task will fail if any errors are written to the StandardError stream.
   *
   * @default false
   *
   * In group: advanced
   */
  "failOnStderr"?: boolean;
  /**
   * Set value for BASH_ENV environment variable
   *
   * If input is specified, it's value is expanded and used as the path of a startup file to
   * execute before running the script. If the environment variable `BASH_ENV` has already been
   * defined, the task will override this variable only for the current task. You can find more
   * details by
   * [link](https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html).
   *
   * In group: advanced
   */
  "bashEnvValue"?: string;
}

/**
 * Bash
 *
 * Run a Bash script on macOS, Linux, or Windows
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=2132213) or [see the
 * Bash documentation](https://www.gnu.org/software/bash/manual/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/bash
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/BashV3
 */
export function bashV3(
  inputs: BashV3Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Bash@3", inputs as unknown as Record<string, unknown>, opts);
}
