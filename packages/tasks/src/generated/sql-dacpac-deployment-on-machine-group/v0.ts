/* eslint-disable */
// Auto-generated from SqlDacpacDeploymentOnMachineGroupV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface SqlDacpacDeploymentOnMachineGroupV0Inputs {
  /**
   * Deploy SQL Using
   *
   * Specify the way in which you want to deploy DB, either by using Dacpac or by using Sql
   * Script.
   *
   * - `dacpac` — Sql Dacpac
   * - `sqlQuery` — Sql Query File
   * - `sqlInline` — Inline Sql
   *
   * @default dacpac
   */
  "TaskType": "dacpac" | "sqlQuery" | "sqlInline";
  /**
   * DACPAC File
   *
   * Location of the DACPAC file on the target machines or on a UNC path like,
   * \\\\BudgetIT\Web\Deploy\FabrikamDB.dacpac. The UNC path should be accessible to the
   * machine's administrator account. Environment variables are also supported, like $env:windir,
   * $env:systemroot, $env:windir\FabrikamFibre\DB. Wildcards can be used. For example,
   * `**​/*.dacpac` for DACPAC file present in all sub folders.
   *
   * Only meaningful when: `TaskType = dacpac`
   */
  "DacpacFile"?: string;
  /**
   * Sql File
   *
   * Location of the SQL file on the target. Provide semi-colon separated list of SQL script
   * files to execute multiple files. The SQL scripts will be executed in the order given.
   * Location can also be a UNC path like, \\\\BudgetIT\Web\Deploy\FabrikamDB.sql. The UNC path
   * should be accessible to the machine's administrator account. Environment variables are also
   * supported, like $env:windir, $env:systemroot, $env:windir\FabrikamFibre\DB. Wildcards can be
   * used. For example, `**​/*.sql` for sql file present in all sub folders.
   *
   * Only meaningful when: `TaskType = sqlQuery`
   */
  "SqlFile"?: string;
  /**
   * Execute within a transaction
   *
   * Executes SQL script(s) within a transaction
   *
   * @default false
   *
   * Only meaningful when: `TaskType = sqlQuery`
   */
  "ExecuteInTransaction"?: boolean;
  /**
   * Acquire an exclusive app lock while executing script(s)
   *
   * Acquires an exclusive app lock while executing script(s)
   *
   * @default false
   *
   * Only meaningful when: `ExecuteInTransaction = true`
   */
  "ExclusiveLock"?: boolean;
  /**
   * App lock name
   *
   * App lock name
   *
   * Only meaningful when: `ExclusiveLock = true`
   */
  "AppLockName"?: string;
  /**
   * Inline Sql
   *
   * Sql Queries inline
   *
   * Only meaningful when: `TaskType = sqlInline`
   */
  "InlineSql"?: string;
  /**
   * Specify SQL Using
   *
   * Specify the option to connect to the target SQL Server Database. The options are either to
   * provide the SQL Server Database details, or the SQL Server connection string, or the Publish
   * profile XML file.
   *
   * - `server` — Server
   * - `connectionString` — Connection String
   * - `publishProfile` — Publish Profile
   *
   * @default server
   *
   * Only meaningful when: `TaskType = dacpac`
   */
  "TargetMethod"?: "server" | "connectionString" | "publishProfile";
  /**
   * Server Name
   *
   * Provide the SQL Server name like, machinename\FabriakmSQL,1433 or localhost or .\SQL2012R2.
   * Specifying localhost will connect to the Default SQL Server instance on the machine.
   *
   * @default localhost
   *
   * Only meaningful when: `TargetMethod = server || TaskType = sqlQuery || TaskType = sqlInline`
   */
  "ServerName"?: string;
  /**
   * Database Name
   *
   * Provide the name of the SQL Server database.
   *
   * Only meaningful when: `TargetMethod = server || TaskType = sqlQuery || TaskType = sqlInline`
   */
  "DatabaseName"?: string;
  /**
   * Authentication
   *
   * Select the authentication mode for connecting to the SQL Server. In Windows authentication
   * mode, the account used to configure deployment agent, is used to connect to the SQL Server.
   * In SQL Server Authentication mode, the SQL login and Password have to be provided in the
   * parameters below.
   *
   * - `windowsAuthentication` — Windows Authentication
   * - `sqlServerAuthentication` — SQL Server Authentication
   *
   * @default windowsAuthentication
   *
   * Only meaningful when: `TargetMethod = server || TaskType = sqlQuery || TaskType = sqlInline`
   */
  "AuthScheme"?: "windowsAuthentication" | "sqlServerAuthentication";
  /**
   * SQL User name
   *
   * Provide the SQL login to connect to the SQL Server. The option is only available if SQL
   * Server Authentication mode has been selected.
   *
   * Only meaningful when: `AuthScheme = sqlServerAuthentication`
   */
  "SqlUsername"?: string;
  /**
   * SQL Password
   *
   * Provide the Password of the SQL login. The option is only available if SQL Server
   * Authentication mode has been selected.
   *
   * Only meaningful when: `AuthScheme = sqlServerAuthentication`
   */
  "SqlPassword"?: string;
  /**
   * Connection String
   *
   * Specify the SQL Server connection string like "Server=localhost;Database=Fabrikam;User
   * ID=sqluser;Password=password;".
   *
   * Only meaningful when: `TargetMethod = connectionString`
   */
  "ConnectionString"?: string;
  /**
   * Publish Profile
   *
   * Publish profile provide fine-grained control over SQL Server database deployments. Specify
   * the path to the Publish profile XML file on the target machine or on a UNC share that is
   * accessible by the machine administrator's credentials.
   *
   * Only meaningful when: `TaskType = dacpac`
   */
  "PublishProfile"?: string;
  /**
   * Additional Arguments
   *
   * Additional SqlPackage.exe arguments that will be applied when deploying the SQL Server
   * database like, /p:IgnoreAnsiNulls=True /p:IgnoreComments=True. These arguments will override
   * the settings in the Publish profile XML file (if provided).
   *
   * Only meaningful when: `TaskType = dacpac`
   */
  "AdditionalArguments"?: string;
  /**
   * Additional Arguments
   *
   * Additional Invoke-Sqlcmd arguments that will be applied when deploying the SQL Server
   * database.
   *
   * Only meaningful when: `TaskType = sqlQuery || TaskType = sqlInline`
   */
  "AdditionalArgumentsSql"?: string;
}

/**
 * SQL Server database deploy
 *
 * Deploy a SQL Server database using DACPAC or SQL scripts
 *
 * [Learn more about this task](https://aka.ms/sqldacpacmachinegroupreadme)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/sql-dacpac-deployment-on-machine-group
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/SqlDacpacDeploymentOnMachineGroupV0
 */
export function sqlDacpacDeploymentOnMachineGroupV0(
  inputs: SqlDacpacDeploymentOnMachineGroupV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("SqlDacpacDeploymentOnMachineGroup@0", inputs as unknown as Record<string, unknown>, opts);
}
