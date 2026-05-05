/* eslint-disable */
// Auto-generated from SshV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { sshConnection } from '../connections.js';

export interface SSHV0Inputs {
  /**
   * SSH service connection
   *
   * SSH service connection with connection details for the remote machine.
   */
  "sshEndpoint": sshConnection;
  /**
   * Run
   *
   * Choose to either run shell commands or a shell script on the remote machine.
   *
   * - `commands` — Commands
   * - `script` — Script File
   * - `inline` — Inline Script
   *
   * @default commands
   */
  "runOptions": "commands" | "script" | "inline";
  /**
   * Commands
   *
   * Specify the shell commands to run on the remote machine. Enter each command along with its
   * arguments on a new line. To run multiple commands together, enter them on the same line
   * separated by semi-colons (e.g. cd /home/user/myFolder;build).
   *
   * Only meaningful when: `runOptions = commands`
   */
  "commands"?: string;
  /**
   * Shell script path
   *
   * Path to the shell script file to run on the remote machine.
   *
   * Only meaningful when: `runOptions = script`
   */
  "scriptPath"?: string;
  /**
   * Inline Script
   *
   * Write the shell script to run on the remote machine.
   *
   * Only meaningful when: `runOptions = inline`
   */
  "inline"?: string;
  /**
   * Interpreter command
   *
   * Path to the command interpreter used to execute the script. Adds a shebang line to the
   * beginning of the script. Relevant only for UNIX-like operating systems. Please use empty
   * string for Windows-based remote hosts. [See more about shebang
   * (#!)](https://homepages.cwi.nl/~aeb/std/shebang/unix-faq.txt)
   *
   * @default /bin/bash
   *
   * Only meaningful when: `runOptions = inline`
   */
  "interpreterCommand"?: string;
  /**
   * Arguments
   *
   * Arguments to pass to the shell script.
   *
   * Only meaningful when: `runOptions = script`
   */
  "args"?: string;
  /**
   * Fail on STDERR
   *
   * If this option is selected, the build will fail when the remote commands or script write to
   * STDERR.
   *
   * @default true
   *
   * In group: advanced
   */
  "failOnStdErr"?: boolean;
  /**
   * Enable interactive session
   *
   * If this option is selected, interactive session will be started - if there's a password
   * request, it will be filled by user's password. It could be useful to run commands like
   * 'sudo'
   *
   * @default false
   *
   * In group: advanced
   */
  "interactiveSession"?: boolean;
  /**
   * SSH handshake timeout
   *
   * How long (in milliseconds) to wait for the SSH handshake to complete.
   *
   * @default 20000
   *
   * In group: advanced
   */
  "readyTimeout": string;
  /**
   * Use interactive-keyboard authentication
   *
   * Use this value if PasswordAuthentication is disabled on the target machine
   *
   * @default false
   *
   * In group: advanced
   */
  "interactiveKeyboardAuthentication"?: boolean;
}

/**
 * SSH
 *
 * Run shell commands or a script on a remote machine using SSH
 *
 * [Learn more about this task](http://go.microsoft.com/fwlink/?LinkId=821892)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/ssh
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/SshV0
 */
export function sSHV0(
  inputs: SSHV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("SSH@0", inputs as unknown as Record<string, unknown>, opts);
}
