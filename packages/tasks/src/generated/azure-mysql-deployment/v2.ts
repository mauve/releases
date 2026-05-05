/* eslint-disable */
// Auto-generated from AzureMysqlDeploymentV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureMysqlDeploymentV2Inputs {
  /**
   * Azure Subscription
   *
   * This is needed to connect to your Azure account.<br>To configure new service connection,
   * select the Azure subscription from the list and click 'Authorize'.<br>If your subscription
   * is not listed or if you want to use an existing Service Principal, you can setup an Azure
   * service connection using 'Add' or 'Manage' button.
   */
  "ConnectedServiceName": AzureRMConnection;
  /**
   * Host Name
   *
   * Server name of 'Azure Database for MySQL Flexible Server'. Example:
   * fabrikam.mysql.database.azure.com. When you connect using MySQL Workbench, this is the same
   * value that is used for 'Hostname' in 'Parameters'.
   *
   * In group: target
   */
  "ServerName": string;
  /**
   * Database Name
   *
   * The name of database, if you already have one, on which the below script is needed to be
   * run, else the script itself can be used to create the database.
   *
   * In group: target
   */
  "DatabaseName"?: string;
  /**
   * Server Admin Login
   *
   * Azure Database for MySQL Flexible Server supports native MySQL authentication. You can
   * connect and authenticate to a server with the server's admin login. Example: bbo1. When you
   * connect using MySQL Workbench, this is the same value that is used for 'Username' in
   * 'Parameters'.
   *
   * In group: target
   */
  "SqlUsername": string;
  /**
   * Password
   *
   * Administrator password for Azure Database for MySQL. In case you don't recall the password
   * you can change the password from [Azure
   * portal](https://learn.microsoft.com/azure/mysql/flexible-server/how-to-manage-server-portal).<br>It
   * can be variable defined in the pipeline. Example : $(password).<br>Also, you may mark the
   * variable type as 'secret' to secure it.
   *
   * In group: target
   */
  "SqlPassword": string;
  /**
   * Type
   *
   * Select one of the options between Script File & Inline Script.
   *
   * - `SqlTaskFile` — MySQL Script File
   * - `InlineSqlTask` — Inline MySQL Script
   *
   * @default SqlTaskFile
   *
   * In group: taskDetails
   */
  "TaskNameSelector"?: "SqlTaskFile" | "InlineSqlTask";
  /**
   * MySQL Script
   *
   * Full path of the script file on the automation agent or on a UNC path accessible to the
   * automation agent like, \\\\BudgetIT\DeployBuilds\script.sql. Also, predefined system
   * variables like, $(agent.releaseDirectory) can also be used here. A file containing SQL
   * statements can be used here.​
   *
   * Only meaningful when: `TaskNameSelector = SqlTaskFile`
   *
   * In group: taskDetails
   */
  "SqlFile"?: string;
  /**
   * Inline MySQL Script
   *
   * Enter the MySQL script to execute on the Database selected above.
   *
   * Only meaningful when: `TaskNameSelector = InlineSqlTask`
   *
   * In group: taskDetails
   */
  "SqlInline"?: string;
  /**
   * Additional MySQL Arguments
   *
   * Additional options supported by MySQL simple SQL shell. These options will be applied when
   * executing the given file on the Azure Database for MySQL.​<br>Example: You can change to
   * default tab separated output format to HTML or even XML format. Or if you have problems due
   * to insufficient memory for large result sets, use the --quick option.​
   *
   * In group: taskDetails
   */
  "SqlAdditionalArguments"?: string;
  /**
   * Specify Firewall Rules Using
   *
   * For successful execution of the task, we need to enable administrators to access the Azure
   * Database for MySQL Flexible Server from the IP Address of the automation agent.<br>By
   * selecting auto-detect you can automatically add firewall exception for range of possible IP
   * Address of automation agent ​or else you can specify the range explicitly.
   *
   * - `AutoDetect` — AutoDetect
   * - `IPAddressRange` — IPAddressRange
   *
   * @default AutoDetect
   *
   * In group: firewall
   */
  "IpDetectionMethod": "AutoDetect" | "IPAddressRange";
  /**
   * Start IP Address
   *
   * The starting IP Address of the automation agent machine pool like 196.21.30.50 .
   *
   * Only meaningful when: `IpDetectionMethod = IPAddressRange`
   *
   * In group: firewall
   */
  "StartIpAddress"?: string;
  /**
   * End IP Address
   *
   * The ending IP Address of the automation agent machine pool like 196.21.30.65 .
   *
   * Only meaningful when: `IpDetectionMethod = IPAddressRange`
   *
   * In group: firewall
   */
  "EndIpAddress"?: string;
  /**
   * Delete Rule After Task Ends
   *
   * If selected, the added exception for IP addresses of the automation agent will be removed
   * for corresponding Azure Database for MySQL.
   *
   * @default true
   *
   * In group: firewall
   */
  "DeleteFirewallRule"?: boolean;
}

/**
 * Azure Database for MySQL deployment
 *
 * Run your scripts and make changes to your Azure Database for MySQL Flexible Server
 *
 * [Learn more about this
 * task](https://github.com/microsoft/azure-pipelines-tasks/blob/master/Tasks/AzureMysqlDeploymentV2/README.md)
 *
 * @see
 * https://learn.microsoft.com/azure/devops/pipelines/tasks/reference/azure-mysql-deployment-v2
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureMysqlDeploymentV2
 */
export function azureMysqlDeploymentV2(
  inputs: AzureMysqlDeploymentV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureMysqlDeployment@2", inputs as unknown as Record<string, unknown>, opts);
}
