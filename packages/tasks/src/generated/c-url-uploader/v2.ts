/* eslint-disable */
// Auto-generated from CUrlUploaderV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { GenericConnection } from '../connections.js';

export interface CURLUploaderV2Inputs {
  /**
   * Files
   *
   * File(s) to be uploaded. Wildcards can be used. For example, `**​/*.zip` for all ZIP files in
   * all subfolders.
   */
  "files": string;
  /**
   * Authentication Method
   *
   * - `ServiceEndpoint` — Service connection
   * - `UserAndPass` — Username and password
   *
   * @default ServiceEndpoint
   */
  "authType"?: "ServiceEndpoint" | "UserAndPass";
  /**
   * Service Connection
   *
   * The service connection with the credentials for the server authentication. Use the Generic
   * service connection type for the service connection.
   *
   * Only meaningful when: `authType = ServiceEndpoint`
   */
  "serviceEndpoint"?: GenericConnection;
  /**
   * Username
   *
   * Specify the username for server authentication.
   *
   * Only meaningful when: `authType = UserAndPass`
   */
  "username"?: string;
  /**
   * Password
   *
   * Specify the password for server authentication. Use a new build variable with its lock
   * enabled on the Variables tab to encrypt this value.
   *
   * Only meaningful when: `authType = UserAndPass`
   */
  "password"?: string;
  /**
   * URL
   *
   * Specify the URL to where the file(s) will be uploaded. The directory should end with a
   * trailing slash. Possible URL protocols include `DICT://`, `FILE://`, `FTP://`, `FTPS://`,
   * `GOPHER://`, `HTTP://`, `HTTPS://`, `IMAP://`, `IMAPS://`, `LDAP://`, `LDAPS://`, `POP3://`,
   * `POP3S://`, `RTMP://`, `RTSP://`, `SCP://`, `SFTP://`, `SMTP://`, `SMTPS://`, `TELNET://`
   * and `TFTP://`.
   *
   * Only meaningful when: `authType = UserAndPass`
   */
  "url"?: string;
  /**
   * Remote Directory
   *
   * If supplied, this is the sub-folder on the remote server for the URL supplied in the
   * credentials.
   *
   * @default upload/$(Build.BuildId)/
   */
  "remotePath"?: string;
  /**
   * Optional Arguments
   *
   * Additional arguments that will be passed to cURL.
   */
  "options"?: string;
  /**
   * Redirect Standard Error to Standard Out
   *
   * Adds '--stderr -' as an argument to cURL. By default, cURL writes its progress bar to
   * stderr, which is interpreted by the build as error output. Enabling this checkbox suppresses
   * that behavior.
   *
   * @default true
   *
   * In group: advanced
   */
  "redirectStderr"?: boolean;
}

/**
 * cURL upload files
 *
 * Use cURL's supported protocols to upload files
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=627418)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/curl-upload-files
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/CUrlUploaderV2
 */
export function cURLUploaderV2(
  inputs: CURLUploaderV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("cURLUploader@2", inputs as unknown as Record<string, unknown>, opts);
}
