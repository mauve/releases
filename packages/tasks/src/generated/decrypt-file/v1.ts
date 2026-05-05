/* eslint-disable */
// Auto-generated from DecryptFileV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface DecryptFileV1Inputs {
  /**
   * Cypher
   *
   * Encryption cypher to use. See [cypher suite
   * names](https://go.microsoft.com/fwlink/?LinkID=627129) for a complete list of possible
   * values.
   *
   * @default des3
   */
  "cipher": string;
  /**
   * Encrypted file
   *
   * Relative path of file to decrypt.
   */
  "inFile": string;
  /**
   * Passphrase
   *
   * Passphrase to use for decryption. **Use a Variable to encrypt the passphrase.**
   */
  "passphrase": string;
  /**
   * Decrypted file path
   *
   * Optional filename for decrypted file. Defaults to the Encrypted File with a ".out" extension
   */
  "outFile"?: string;
  /**
   * Working directory
   *
   * Working directory for decryption. Defaults to the root of the repository.
   *
   * In group: advanced
   */
  "cwd"?: string;
}

/**
 * Decrypt file (OpenSSL)
 *
 * Decrypt a file using OpenSSL
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/decrypt-file
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DecryptFileV1
 */
export function decryptFileV1(
  inputs: DecryptFileV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("DecryptFile@1", inputs as unknown as Record<string, unknown>, opts);
}
