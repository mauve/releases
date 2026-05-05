/* eslint-disable */
// Auto-generated from FtpUploadV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { GenericConnection } from '../connections.js';

export interface FtpUploadV2Inputs {
  /**
   * Authentication Method
   *
   * Use FTP service connection or enter connection credentials.
   *
   * - `serviceEndpoint` — FTP service connection
   * - `inputs` — Enter credentials
   *
   * @default serviceEndpoint
   */
  "credsType": "serviceEndpoint" | "inputs";
  /**
   * FTP Service Connection
   *
   * Select the service connection for your FTP server. To create one, click the Manage link and
   * create a new Generic service connection, enter the FTP server URL for the server URL, e.g.
   * <b>`ftp://server.example.com`</b>, and required credentials.<p>Secure connections will
   * always be made regardless of the specified protocol (<b>`ftp://`</b> or <b>`ftps://`</b>) if
   * the target server supports FTPS. To allow only secure connections, use the <b>`ftps://`</b>
   * protocol, e.g. <b>`ftps://server.example.com`</b>. Connections to servers not supporting
   * FTPS will fail if <b>`ftps://`</b> is specified.
   *
   * Only meaningful when: `credsType = serviceEndpoint`
   */
  "serverEndpoint"?: GenericConnection;
  /**
   * Server URL
   *
   * Only meaningful when: `credsType = inputs`
   */
  "serverUrl"?: string;
  /**
   * Username
   *
   * Only meaningful when: `credsType = inputs`
   */
  "username"?: string;
  /**
   * Password
   *
   * Only meaningful when: `credsType = inputs`
   */
  "password"?: string;
  /**
   * Use implicit FTPS
   *
   * @default false
   */
  "implicitFTPS"?: boolean;
  /**
   * Root folder
   *
   * The source folder to upload files from.
   */
  "rootFolder": string;
  /**
   * File patterns
   *
   * File paths or patterns of the files to upload. Supports multiple lines of minimatch
   * patterns. [More Information](https://go.microsoft.com/fwlink/?LinkId=800269)
   *
   * @default **
   */
  "filePatterns": string;
  /**
   * Remote directory
   *
   * Upload files to this directory on the remote FTP server.
   *
   * @default /upload/$(Build.BuildId)/
   */
  "remotePath": string;
  /**
   * Enable UTF8 support
   *
   * Enables UTF-8 support for the FTP connection ('OPTS UTF8 ON').
   *
   * @default false
   *
   * In group: advanced
   */
  "enableUtf8"?: boolean;
  /**
   * Delete remote directory
   *
   * Delete the remote directory including its contents before uploading.
   *
   * @default false
   *
   * In group: advanced
   */
  "clean": boolean;
  /**
   * Clear remote directory contents
   *
   * Recursively delete all contents of the remote directory before uploading. The existing
   * directory will not be deleted. For better performance, consider using `Delete remote
   * directory` instead.
   *
   * @default false
   *
   * Only meaningful when: `clean = false`
   *
   * In group: advanced
   */
  "cleanContents"?: boolean;
  /**
   * Preserve file paths
   *
   * If selected, the relative local directory structure is recreated under the remote directory
   * where files are uploaded. Otherwise, files are uploaded directly to the remote directory
   * without creating additional subdirectories.<p>For example, suppose your source folder is:
   * <b>`/home/user/source/`</b> and contains the file: <b>`foo/bar/foobar.txt`</b>, and your
   * remote directory is: <b>`/uploads/`</b>.<br>If selected, the file is uploaded to:
   * <b>`/uploads/foo/bar/foobar.txt`</b>. Otherwise, to: <b>`/uploads/foobar.txt`</b>.
   *
   * @default false
   *
   * In group: advanced
   */
  "preservePaths": boolean;
  /**
   * Trust server certificate
   *
   * Selecting this option results in the FTP server's SSL certificate being trusted with
   * ftps://, even if it is self-signed or cannot be validated by a Certificate Authority (CA).
   *
   * @default false
   *
   * In group: advanced
   */
  "trustSSL": boolean;
  /**
   * FTP Commands
   *
   * Optional FTP Commands that will be sent to the remote FTP server upon connection.
   *
   * In group: advanced
   */
  "customCmds"?: string;
}

/**
 * FTP upload
 *
 * Upload files using FTP
 *
 * Upload files to a remote machine using the File Transfer Protocol (FTP), or securely with
 * FTPS. [More Information](http://go.microsoft.com/fwlink/?LinkId=809084).
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/ftp-upload
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/FtpUploadV2
 */
export function ftpUploadV2(
  inputs: FtpUploadV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("FtpUpload@2", inputs as unknown as Record<string, unknown>, opts);
}
