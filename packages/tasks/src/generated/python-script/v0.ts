/* eslint-disable */
// Auto-generated from PythonScriptV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface PythonScriptV0Inputs {
  /**
   * Script source
   *
   * Whether the script is a file in the source tree or is written inline in this task.
   *
   * - `filePath` — File path
   * - `inline` — Inline
   *
   * @default filePath
   */
  "scriptSource": "filePath" | "inline";
  /**
   * Script path
   *
   * Path of the script to execute. Must be a fully qualified path or relative to
   * `$(System.DefaultWorkingDirectory)`.
   *
   * Only meaningful when: `scriptSource = filePath`
   */
  "scriptPath"?: string;
  /**
   * Script
   *
   * The Python script to run
   *
   * Only meaningful when: `scriptSource = inline`
   */
  "script"?: string;
  /**
   * Arguments
   *
   * Arguments passed to the script execution, available through `sys.argv`.
   */
  "arguments"?: string;
  /**
   * Python interpreter
   *
   * Absolute path to the Python interpreter to use. If not specified, the task will use the
   * interpreter in PATH.<br /> Run the [Use Python
   * Version](https://go.microsoft.com/fwlink/?linkid=871498) task to add a version of Python to
   * PATH.
   *
   * In group: advanced
   */
  "pythonInterpreter"?: string;
  /**
   * Working directory
   *
   * The working directory where the script will run. If not specified, the value of
   * `System.DefaultWorkingDirectory` will be used. For builds, this variable defaults to the
   * root of the repository. For releases, it defaults to the root of the artifacts directory.
   *
   * In group: advanced
   */
  "workingDirectory"?: string;
  /**
   * Fail on standard error
   *
   * If this is true, this task will fail if any text is written to the stderr stream.
   *
   * @default false
   *
   * In group: advanced
   */
  "failOnStderr"?: boolean;
}

/**
 * Python script
 *
 * Run a Python file or inline script
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=2006181) or [see the
 * Python documentation](https://www.python.org/doc/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/python-script
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/PythonScriptV0
 */
export function pythonScriptV0(
  inputs: PythonScriptV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("PythonScript@0", inputs as unknown as Record<string, unknown>, opts);
}
