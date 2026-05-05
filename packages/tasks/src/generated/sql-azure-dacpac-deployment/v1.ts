/* eslint-disable */
// Auto-generated from SqlAzureDacpacDeploymentV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureConnection, AzureRMConnection } from '../connections.js';

export interface SqlAzureDacpacDeploymentV1Inputs {
  /**
   * Azure Service Connection Type
   *
   * - `ConnectedServiceName` — Azure Classic
   * - `ConnectedServiceNameARM` — Azure Resource Manager
   *
   * @default ConnectedServiceNameARM
   */
  "ConnectedServiceNameSelector"?: "ConnectedServiceName" | "ConnectedServiceNameARM";
  /**
   * Azure Classic Subscription
   *
   * Target Azure Classic subscription for deploying SQL files
   *
   * Only meaningful when: `ConnectedServiceNameSelector = ConnectedServiceName`
   */
  "ConnectedServiceName"?: AzureConnection;
  /**
   * Azure Subscription
   *
   * Target Azure Resource Manager subscription for deploying SQL files
   *
   * Only meaningful when: `ConnectedServiceNameSelector = ConnectedServiceNameARM`
   */
  "ConnectedServiceNameARM"?: AzureRMConnection;
  /**
   * Authentication Type
   *
   * Specify the option to connect to the Azure SQL Server Database. The options are either to
   * provide the Azure SQL Server Database details, or the SQL Server connection string, or AAD
   * Authentication password or integrated or use a Service Principal. For SQL server
   * authentication, use SQL server's user credentials and for AD authentication, use credentials
   * of AD user configured to SQL server.
   *
   * - `server` — SQL Server Authentication
   * - `aadAuthenticationPassword` — Active Directory - Password
   * - `aadAuthenticationIntegrated` — Active Directory - Integrated
   * - `connectionString` — Connection String
   * - `servicePrincipal` — Service Principal
   *
   * @default server
   *
   * In group: target
   */
  "AuthenticationType": "server" | "aadAuthenticationPassword" | "aadAuthenticationIntegrated" | "connectionString" | "servicePrincipal";
  /**
   * Azure SQL Server
   *
   * Azure SQL Server name, like Fabrikam.database.windows.net,1433 or
   * Fabrikam.database.windows.net.
   *
   * Only meaningful when: `AuthenticationType = server || AuthenticationType =
   * aadAuthenticationPassword || AuthenticationType = aadAuthenticationIntegrated ||
   * AuthenticationType = servicePrincipal`
   *
   * In group: target
   */
  "ServerName"?: string;
  /**
   * Database
   *
   * Name of the Azure SQL Database, where the files will be deployed.
   *
   * Only meaningful when: `AuthenticationType = server || AuthenticationType =
   * aadAuthenticationPassword || AuthenticationType = aadAuthenticationIntegrated ||
   * AuthenticationType = servicePrincipal`
   *
   * In group: target
   */
  "DatabaseName"?: string;
  /**
   * Login
   *
   * Specify the Azure SQL Server administrator login.
   *
   * Only meaningful when: `AuthenticationType = server`
   *
   * In group: target
   */
  "SqlUsername"?: string;
  /**
   * Password
   *
   * Password for the Azure SQL Server administrator.<br>It can accept variable defined in build
   * or release pipelines as '$(passwordVariable)'.<br>You may mark the variable type as 'secret'
   * to secure it.
   *
   * Only meaningful when: `AuthenticationType = server`
   *
   * In group: target
   */
  "SqlPassword"?: string;
  /**
   * Login
   *
   * Specify the Active directory username.
   *
   * Only meaningful when: `AuthenticationType = aadAuthenticationPassword`
   *
   * In group: target
   */
  "aadSqlUsername"?: string;
  /**
   * Password
   *
   * Password for the Active directory user.<br>It can accept variable defined in build or
   * release pipelines as '$(passwordVariable)'.<br>You may mark the variable type as 'secret' to
   * secure it.
   *
   * Only meaningful when: `AuthenticationType = aadAuthenticationPassword`
   *
   * In group: target
   */
  "aadSqlPassword"?: string;
  /**
   * Connection String
   *
   * Specify the Azure SQL Server connection string like
   * "Server=testServer.database.windows.net;Database=testdb;User
   * ID=sqluser;Password=$(securePassword);".
   *
   * Only meaningful when: `AuthenticationType = connectionString`
   *
   * In group: target
   */
  "ConnectionString"?: string;
  /**
   * Deploy type
   *
   * - `DacpacTask` — SQL DACPAC File
   * - `SqlTask` — SQL Script File
   * - `InlineSqlTask` — Inline SQL Script
   *
   * @default DacpacTask
   *
   * In group: taskDetails
   */
  "TaskNameSelector": "DacpacTask" | "SqlTask" | "InlineSqlTask";
  /**
   * Action
   *
   * Choose one of the SQL Actions from the list. For more details refer <a
   * href="https://go.microsoft.com/fwlink/?linkid=875177">link</a>.​
   *
   * @default Publish
   *
   * Only meaningful when: `TaskNameSelector = DacpacTask`
   *
   * In group: taskDetails
   */
  "DeploymentAction"?: string /* TODO: unknown task input type "picklist" */;
  /**
   * DACPAC File
   *
   * Location of the DACPAC file on the automation agent or on a UNC path accessible to the
   * automation agent like, \\\\BudgetIT\Web\Deploy\FabrikamDB.dacpac. Predefined system
   * variables like, $(agent.releaseDirectory) can also be used here.
   *
   * Only meaningful when: `DeploymentAction = Publish || DeploymentAction = Script ||
   * DeploymentAction = DeployReport`
   *
   * In group: taskDetails
   */
  "DacpacFile"?: string;
  /**
   * BACPAC File
   *
   * Location of the BACPAC file on the automation agent or on a UNC path accessible to the
   * automation agent like, \\\\BudgetIT\Web\Deploy\FabrikamDB.bacpac. Predefined system
   * variables like, $(agent.releaseDirectory) can also be used here.
   *
   * Only meaningful when: `DeploymentAction = Import`
   *
   * In group: taskDetails
   */
  "BacpacFile"?: string;
  /**
   * SQL Script
   *
   * Location of the SQL script file on the automation agent or on a UNC path accessible to the
   * automation agent like, \\\\BudgetIT\Web\Deploy\FabrikamDB.sql. Predefined system variables
   * like, $(agent.releaseDirectory) can also be used here.
   *
   * Only meaningful when: `TaskNameSelector = SqlTask`
   *
   * In group: taskDetails
   */
  "SqlFile"?: string;
  /**
   * Inline SQL Script
   *
   * Enter the SQL script to execute on the Database selected above.
   *
   * Only meaningful when: `TaskNameSelector = InlineSqlTask`
   *
   * In group: taskDetails
   */
  "SqlInline"?: string;
  /**
   * Publish Profile
   *
   * Publish profile provides fine-grained control over Azure SQL Database creation or upgrades.
   * Specify the path to the Publish profile XML file on the automation agent or on a UNC share.
   * Predefined system variables like, $(agent.buildDirectory) or $(agent.releaseDirectory) can
   * also be used here.
   *
   * Only meaningful when: `TaskNameSelector = DacpacTask || DeploymentAction = Script ||
   * DeploymentAction = DeployReport`
   *
   * In group: taskDetails
   */
  "PublishProfile"?: string;
  /**
   * Additional SqlPackage.exe Arguments
   *
   * Additional SqlPackage.exe arguments that will be applied when deploying the Azure SQL
   * Database, in case DACPAC option is selected like, /p:IgnoreAnsiNulls=True
   * /p:IgnoreComments=True. These arguments will override the settings in the Publish profile
   * XML file (if provided).
   *
   * Only meaningful when: `TaskNameSelector = DacpacTask || DeploymentAction = Extract ||
   * DeploymentAction = Export || DeploymentAction = Import || DeploymentAction = Script ||
   * DeploymentAction = DeployReport || DeploymentAction = DriftReport`
   *
   * In group: taskDetails
   */
  "AdditionalArguments"?: string;
  /**
   * Additional Invoke-Sqlcmd Arguments
   *
   * Additional Invoke-Sqlcmd arguments that will be applied when executing the given SQL query
   * on the Azure SQL Database like, -ConnectionTimeout 100 -OutputSqlErrors.
   *
   * Only meaningful when: `TaskNameSelector = SqlTask`
   *
   * In group: taskDetails
   */
  "SqlAdditionalArguments"?: string;
  /**
   * Additional Invoke-Sqlcmd Arguments
   *
   * Additional Invoke-Sqlcmd arguments that will be applied when executing the given SQL query
   * on the Azure SQL Database like, -ConnectionTimeout 100 -OutputSqlErrors
   *
   * Only meaningful when: `TaskNameSelector = InlineSqlTask`
   *
   * In group: taskDetails
   */
  "InlineAdditionalArguments"?: string;
  /**
   * Specify Firewall Rules Using
   *
   * For the task to run, the IP Address of the automation agent has to be added to the 'Allowed
   * IP Addresses' in the Azure SQL Server's Firewall. Select auto-detect to automatically add
   * firewall exception for range of possible IP Address of automation agent or specify the range
   * explicitly.
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
   * The starting IP Address of the automation agent machine pool like 196.21.30.50.
   *
   * Only meaningful when: `IpDetectionMethod = IPAddressRange`
   *
   * In group: firewall
   */
  "StartIpAddress"?: string;
  /**
   * End IP Address
   *
   * The ending IP Address of the automation agent machine pool like 196.21.30.65.
   *
   * Only meaningful when: `IpDetectionMethod = IPAddressRange`
   *
   * In group: firewall
   */
  "EndIpAddress"?: string;
  /**
   * Delete Rule After Task Ends
   *
   * If selected, then after the task ends, the IP Addresses specified here are deleted from the
   * 'Allowed IP Addresses' list of the Azure SQL Server's Firewall.
   *
   * @default true
   *
   * In group: firewall
   */
  "DeleteFirewallRule"?: boolean;
}

/**
 * Azure SQL Database deployment
 *
 * Deploy an Azure SQL Database using DACPAC or run scripts using SQLCMD
 *
 * [Learn more about this task](https://aka.ms/sqlazuredeployreadme)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/sql-azure-dacpac-deployment
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/SqlAzureDacpacDeploymentV1
 */
export function sqlAzureDacpacDeploymentV1(
  inputs: SqlAzureDacpacDeploymentV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("SqlAzureDacpacDeployment@1", inputs as unknown as Record<string, unknown>, opts);
}
