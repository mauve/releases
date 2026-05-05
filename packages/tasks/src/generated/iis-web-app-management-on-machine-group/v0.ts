/* eslint-disable */
// Auto-generated from IISWebAppManagementOnMachineGroupV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface IISWebAppManagementOnMachineGroupV0Inputs {
  /**
   * Enable IIS
   *
   * Check this if you want to install IIS on the machine.
   *
   * @default false
   */
  "EnableIIS"?: boolean;
  /**
   * Configuration type
   *
   * You can create or update sites, applications, virtual directories, and application pools.
   *
   * - `IISWebsite` — IIS Website
   * - `IISWebApplication` — IIS Web Application
   * - `IISVirtualDirectory` — IIS Virtual Directory
   * - `IISApplicationPool` — IIS Application Pool
   *
   * @default IISWebsite
   */
  "IISDeploymentType": "IISWebsite" | "IISWebApplication" | "IISVirtualDirectory" | "IISApplicationPool";
  /**
   * Action
   *
   * Select the appropriate action that you want to perform on an IIS website.
   *
   * "Create Or Update" will create a website or update an existing website.
   *
   * Start, Stop will start or stop the website respectively.
   *
   * - `CreateOrUpdateWebsite` — Create Or Update
   * - `StartWebsite` — Start
   * - `StopWebsite` — Stop
   *
   * @default CreateOrUpdateWebsite
   *
   * Only meaningful when: `IISDeploymentType = IISWebsite`
   */
  "ActionIISWebsite"?: "CreateOrUpdateWebsite" | "StartWebsite" | "StopWebsite";
  /**
   * Action
   *
   * Select the appropriate action that you want to perform on an IIS Application Pool.
   *
   * "Create Or Update" will create app-pool or update an existing one.
   *
   * Start, Stop, Recycle will start, stop or recycle the application pool respectively.
   *
   * - `CreateOrUpdateAppPool` — Create Or Update
   * - `StartAppPool` — Start
   * - `StopAppPool` — Stop
   * - `RecycleAppPool` — Recycle
   *
   * @default CreateOrUpdateAppPool
   *
   * Only meaningful when: `IISDeploymentType = IISApplicationPool`
   */
  "ActionIISApplicationPool"?: "CreateOrUpdateAppPool" | "StartAppPool" | "StopAppPool" | "RecycleAppPool";
  /**
   * Website name
   *
   * Provide the name of the IIS website.
   *
   * Only meaningful when: `ActionIISWebsite = StartWebsite || ActionIISWebsite = StopWebsite`
   */
  "StartStopWebsiteName"?: string;
  /**
   * Website name
   *
   * Provide the name of the IIS website to create or update.
   *
   * In group: Website
   */
  "WebsiteName": string;
  /**
   * Physical path
   *
   * Provide the physical path where the website content will be stored. The content can reside
   * on the local Computer, or in a remote directory, or on a network share, like C:\Fabrikam or
   * \\\\ContentShare\Fabrikam.
   *
   * @default %SystemDrive%\inetpub\wwwroot
   *
   * In group: Website
   */
  "WebsitePhysicalPath": string;
  /**
   * Physical path authentication
   *
   * Select the authentication mechanism that will be used to access the physical path of the
   * website.
   *
   * - `WebsiteUserPassThrough` — Application User (Pass-through)
   * - `WebsiteWindowsAuth` — Windows Authentication
   *
   * @default WebsiteUserPassThrough
   *
   * In group: Website
   */
  "WebsitePhysicalPathAuth": "WebsiteUserPassThrough" | "WebsiteWindowsAuth";
  /**
   * Username
   *
   * Provide the user name that will be used to access the website's physical path.
   *
   * Only meaningful when: `WebsitePhysicalPathAuth = WebsiteWindowsAuth`
   *
   * In group: Website
   */
  "WebsiteAuthUserName"?: string;
  /**
   * Password
   *
   * Provide the user's password that will be used to access the website's physical path.
   * <br/>The best practice is to create a variable in the build or release pipeline, and mark it
   * as 'Secret' to secure it, and then use it here, like '$(userCredentials)'. <br> Note:
   * Special characters in password are interpreted as per <a
   * href="https://go.microsoft.com/fwlink/?linkid=843470">command-line arguments</a>
   *
   * Only meaningful when: `WebsitePhysicalPathAuth = WebsiteWindowsAuth`
   *
   * In group: Website
   */
  "WebsiteAuthUserPassword"?: string;
  /**
   * Add binding
   *
   * Select the option to add port binding for the website.
   *
   * @default false
   *
   * In group: Website
   */
  "AddBinding"?: boolean;
  /**
   * Protocol
   *
   * Select HTTP for the website to have an HTTP binding, or select HTTPS for the website to have
   * a Secure Sockets Layer (SSL) binding.
   *
   * - `https` — https
   * - `http` — http
   *
   * @default http
   *
   * Only meaningful when: `IISDeploymentType = randomDeployment`
   */
  "Protocol"?: "https" | "http";
  /**
   * IP address
   *
   * Provide an IP address that end-users can use to access this website. <br>If 'All Unassigned'
   * is selected, then the website will respond to requests for all IP addresses on the port and
   * for the host name, unless another website on the server has a binding on the same port but
   * with a specific IP address.<br>
   *
   * @default All Unassigned
   *
   * Only meaningful when: `IISDeploymentType = randomDeployment`
   */
  "IPAddress"?: string;
  /**
   * Port
   *
   * Provide the port, where the Hypertext Transfer Protocol Stack (HTTP.sys) will listen to the
   * website requests.
   *
   * @default 80
   *
   * Only meaningful when: `IISDeploymentType = randomDeployment`
   */
  "Port"?: string;
  /**
   * Server Name Indication required
   *
   * Select the option to set the Server Name Indication (SNI) for the website. <br>SNI extends
   * the SSL and TLS protocols to indicate the host name that the clients are attempting to
   * connect to. It allows, multiple secure websites with different certificates, to use the same
   * IP address.<br>
   *
   * @default false
   *
   * Only meaningful when: `IISDeploymentType = randomDeployment`
   */
  "ServerNameIndication"?: boolean;
  /**
   * Host name
   *
   * Enter a host name (or domain name) for the website. <br>If a host name is specified, then
   * the clients must use the host name instead of the IP address to access the website.<br>
   *
   * Only meaningful when: `IISDeploymentType = randomDeployment`
   */
  "HostNameWithOutSNI"?: string;
  /**
   * Host name
   *
   * Enter a host name (or domain name) for the website. <br>If a host name is specified, then
   * the clients must use the host name instead of the IP address to access the website.<br>
   *
   * Only meaningful when: `IISDeploymentType = randomDeployment`
   */
  "HostNameWithHttp"?: string;
  /**
   * Host name
   *
   * Enter a host name (or domain name) for the website. <br>If a host name is specified, then
   * the clients must use the host name instead of the IP address to access the website.<br>
   *
   * Only meaningful when: `IISDeploymentType = randomDeployment`
   */
  "HostNameWithSNI"?: string;
  /**
   * SSL certificate thumbprint
   *
   * Provide the thumb-print of the Secure Socket Layer certificate that the website is going to
   * use for the HTTPS communication as a 40 character long hexadecimal string. The SSL
   * certificate should be already installed on the Computer, at Local Computer, Personal store.
   *
   * Only meaningful when: `IISDeploymentType = randomDeployment`
   */
  "SSLCertThumbPrint"?: string;
  /**
   * Add bindings
   *
   * Click on the extension [...] button to add bindings for the website.
   *
   * In group: IISBindings
   */
  "Bindings": string;
  /**
   * Create or update app pool
   *
   * Select the option to create or update an application pool. If checked, the website will be
   * created in the specified app pool.
   *
   * @default false
   *
   * In group: Website
   */
  "CreateOrUpdateAppPoolForWebsite"?: boolean;
  /**
   * Configure authentication
   *
   * Select the option to configure authentication for website.
   *
   * @default false
   *
   * In group: Website
   */
  "ConfigureAuthenticationForWebsite"?: boolean;
  /**
   * Name
   *
   * Provide the name of the IIS application pool to create or update.
   *
   * In group: ApplicationPoolForWebsite
   */
  "AppPoolNameForWebsite": string;
  /**
   * .NET version
   *
   * Select the version of the .NET Framework that is loaded by the application pool. <br>If the
   * applications assigned to this application pool do not contain managed code, then select the
   * 'No Managed Code' option from the list.<br>
   *
   * - `v4.0` — v4.0
   * - `v2.0` — v2.0
   * - `No Managed Code` — No Managed Code
   *
   * @default v4.0
   *
   * In group: ApplicationPoolForWebsite
   */
  "DotNetVersionForWebsite": "v4.0" | "v2.0" | "No Managed Code";
  /**
   * Managed pipeline mode
   *
   * Select the managed pipeline mode that specifies how IIS processes requests for managed
   * content. Use classic mode only when the applications in the application pool cannot run in
   * the Integrated mode.
   *
   * - `Integrated` — Integrated
   * - `Classic` — Classic
   *
   * @default Integrated
   *
   * In group: ApplicationPoolForWebsite
   */
  "PipeLineModeForWebsite": "Integrated" | "Classic";
  /**
   * Identity
   *
   * Configure the account under which an application pool's worker process runs. Select one of
   * the predefined security accounts or configure a custom account.
   *
   * - `ApplicationPoolIdentity` — Application Pool Identity
   * - `LocalService` — Local Service
   * - `LocalSystem` — Local System
   * - `NetworkService` — Network Service
   * - `SpecificUser` — Custom Account
   *
   * @default ApplicationPoolIdentity
   *
   * In group: ApplicationPoolForWebsite
   */
  "AppPoolIdentityForWebsite": "ApplicationPoolIdentity" | "LocalService" | "LocalSystem" | "NetworkService" | "SpecificUser";
  /**
   * Username
   *
   * Provide the username of the custom account that you want to use.
   *
   * Only meaningful when: `AppPoolIdentityForWebsite = SpecificUser`
   *
   * In group: ApplicationPoolForWebsite
   */
  "AppPoolUsernameForWebsite"?: string;
  /**
   * Password
   *
   * Provide the password for custom account. <br/>The best practice is to create a variable in
   * the build or release pipeline, and mark it as 'Secret' to secure it, and then use it here,
   * like '$(userCredentials)'. <br> Note: Special characters in password are interpreted as per
   * <a href="https://go.microsoft.com/fwlink/?linkid=843470">command-line arguments</a>
   *
   * Only meaningful when: `AppPoolIdentityForWebsite = SpecificUser`
   *
   * In group: ApplicationPoolForWebsite
   */
  "AppPoolPasswordForWebsite"?: string;
  /**
   * Anonymous authentication
   *
   * Select the option to enable anonymous authentication for website.
   *
   * @default false
   *
   * In group: IISWebsiteAuthentication
   */
  "AnonymousAuthenticationForWebsite"?: boolean;
  /**
   * Basic authentication
   *
   * Select the option to enable basic authentication for website.
   *
   * @default false
   *
   * In group: IISWebsiteAuthentication
   */
  "BasicAuthenticationForWebsite"?: boolean;
  /**
   * Windows authentication
   *
   * Select the option to enable windows authentication for website.
   *
   * @default true
   *
   * In group: IISWebsiteAuthentication
   */
  "WindowsAuthenticationForWebsite"?: boolean;
  /**
   * Parent website name
   *
   * Provide the name of the parent Website of the virtual directory.
   *
   * In group: VirtualDirectory
   */
  "ParentWebsiteNameForVD": string;
  /**
   * Virtual path
   *
   * Provide the virtual path of the virtual directory.
   *
   * Example: To create a virtual directory Site/Application/VDir enter /Application/Vdir. The
   * parent website and application should be already existing.
   *
   * In group: VirtualDirectory
   */
  "VirtualPathForVD": string;
  /**
   * Physical path
   *
   * Provide the physical path where the virtual directory's content will be stored. The content
   * can reside on the local Computer, or in a remote directory, or on a network share, like
   * C:\Fabrikam or \\\\ContentShare\Fabrikam.
   *
   * @default %SystemDrive%\inetpub\wwwroot
   *
   * In group: VirtualDirectory
   */
  "PhysicalPathForVD": string;
  /**
   * Physical path authentication
   *
   * Select the authentication mechanism that will be used to access the physical path of the
   * virtual directory.
   *
   * - `VDUserPassThrough` — Application User (Pass-through)
   * - `VDWindowsAuth` — Windows Authentication
   *
   * @default VDUserPassThrough
   *
   * In group: VirtualDirectory
   */
  "VDPhysicalPathAuth"?: "VDUserPassThrough" | "VDWindowsAuth";
  /**
   * Username
   *
   * Provide the user name that will be used to access the virtual directory's physical path.
   *
   * Only meaningful when: `VDPhysicalPathAuth = VDWindowsAuth`
   *
   * In group: VirtualDirectory
   */
  "VDAuthUserName"?: string;
  /**
   * Password
   *
   * Provide the user's password that will be used to access the virtual directory's physical
   * path. <br/>The best practice is to create a variable in the build or release pipeline, and
   * mark it as 'Secret' to secure it, and then use it here, like '$(userCredentials)'. <br>
   * Note: Special characters in password are interpreted as per <a
   * href="https://go.microsoft.com/fwlink/?linkid=843470">command-line arguments</a>
   *
   * Only meaningful when: `VDPhysicalPathAuth = VDWindowsAuth`
   *
   * In group: VirtualDirectory
   */
  "VDAuthUserPassword"?: string;
  /**
   * Parent website name
   *
   * Provide the name of the parent Website under which the application will be created or
   * updated.
   *
   * In group: WebApplication
   */
  "ParentWebsiteNameForApplication": string;
  /**
   * Virtual path
   *
   * Provide the virtual path of the application.
   *
   * Example: To create an application Site/Application enter /Application. The parent website
   * should be already existing.
   *
   * In group: WebApplication
   */
  "VirtualPathForApplication": string;
  /**
   * Physical path
   *
   * Provide the physical path where the application's content will be stored. The content can
   * reside on the local Computer, or in a remote directory, or on a network share, like
   * C:\Fabrikam or \\\\ContentShare\Fabrikam.
   *
   * @default %SystemDrive%\inetpub\wwwroot
   *
   * In group: WebApplication
   */
  "PhysicalPathForApplication": string;
  /**
   * Physical path authentication
   *
   * Select the authentication mechanism that will be used to access the physical path of the
   * application.
   *
   * - `ApplicationUserPassThrough` — Application User (Pass-through)
   * - `ApplicationWindowsAuth` — Windows Authentication
   *
   * @default ApplicationUserPassThrough
   *
   * In group: WebApplication
   */
  "ApplicationPhysicalPathAuth"?: "ApplicationUserPassThrough" | "ApplicationWindowsAuth";
  /**
   * Username
   *
   * Provide the user name that will be used to access the application's physical path.
   *
   * Only meaningful when: `ApplicationPhysicalPathAuth = ApplicationWindowsAuth`
   *
   * In group: WebApplication
   */
  "ApplicationAuthUserName"?: string;
  /**
   * Password
   *
   * Provide the user's password that will be used to access the application's physical path.
   * <br/>The best practice is to create a variable in the build or release pipeline, and mark it
   * as 'Secret' to secure it, and then use it here, like '$(userCredentials)'. <br> Note:
   * Special characters in password are interpreted as per <a
   * href="https://go.microsoft.com/fwlink/?linkid=843470">command-line arguments</a>
   *
   * Only meaningful when: `ApplicationPhysicalPathAuth = ApplicationWindowsAuth`
   *
   * In group: WebApplication
   */
  "ApplicationAuthUserPassword"?: string;
  /**
   * Create or update app pool
   *
   * Select the option to create or update an application pool. If checked, the application will
   * be created in the specified app pool.
   *
   * @default false
   *
   * In group: WebApplication
   */
  "CreateOrUpdateAppPoolForApplication"?: boolean;
  /**
   * Name
   *
   * Provide the name of the IIS application pool to create or update.
   *
   * In group: ApplicationPoolForApplication
   */
  "AppPoolNameForApplication": string;
  /**
   * .NET version
   *
   * Select the version of the .NET Framework that is loaded by the application pool. <br>If the
   * applications assigned to this application pool do not contain managed code, then select the
   * 'No Managed Code' option from the list.<br>
   *
   * - `v4.0` — v4.0
   * - `v2.0` — v2.0
   * - `No Managed Code` — No Managed Code
   *
   * @default v4.0
   *
   * In group: ApplicationPoolForApplication
   */
  "DotNetVersionForApplication": "v4.0" | "v2.0" | "No Managed Code";
  /**
   * Managed pipeline mode
   *
   * Select the managed pipeline mode that specifies how IIS processes requests for managed
   * content. Use classic mode only when the applications in the application pool cannot run in
   * the Integrated mode.
   *
   * - `Integrated` — Integrated
   * - `Classic` — Classic
   *
   * @default Integrated
   *
   * In group: ApplicationPoolForApplication
   */
  "PipeLineModeForApplication": "Integrated" | "Classic";
  /**
   * Identity
   *
   * Configure the account under which an application pool's worker process runs. Select one of
   * the predefined security accounts or configure a custom account.
   *
   * - `ApplicationPoolIdentity` — Application Pool Identity
   * - `LocalService` — Local Service
   * - `LocalSystem` — Local System
   * - `NetworkService` — Network Service
   * - `SpecificUser` — Custom Account
   *
   * @default ApplicationPoolIdentity
   *
   * In group: ApplicationPoolForApplication
   */
  "AppPoolIdentityForApplication": "ApplicationPoolIdentity" | "LocalService" | "LocalSystem" | "NetworkService" | "SpecificUser";
  /**
   * Username
   *
   * Provide the username of the custom account that you want to use.
   *
   * Only meaningful when: `AppPoolIdentityForApplication = SpecificUser`
   *
   * In group: ApplicationPoolForApplication
   */
  "AppPoolUsernameForApplication"?: string;
  /**
   * Password
   *
   * Provide the password for custom account. <br/>The best practice is to create a variable in
   * the build or release pipeline, and mark it as 'Secret' to secure it, and then use it here,
   * like '$(userCredentials)'. <br> Note: Special characters in password are interpreted as per
   * <a href="https://go.microsoft.com/fwlink/?linkid=843470">command-line arguments</a>
   *
   * Only meaningful when: `AppPoolIdentityForApplication = SpecificUser`
   *
   * In group: ApplicationPoolForApplication
   */
  "AppPoolPasswordForApplication"?: string;
  /**
   * Name
   *
   * Provide the name of the IIS application pool to create or update.
   *
   * In group: ApplicationPool
   */
  "AppPoolName": string;
  /**
   * .NET version
   *
   * Select the version of the .NET Framework that is loaded by the application pool. <br>If the
   * applications assigned to this application pool do not contain managed code, then select the
   * 'No Managed Code' option from the list.<br>
   *
   * - `v4.0` — v4.0
   * - `v2.0` — v2.0
   * - `No Managed Code` — No Managed Code
   *
   * @default v4.0
   *
   * In group: ApplicationPool
   */
  "DotNetVersion": "v4.0" | "v2.0" | "No Managed Code";
  /**
   * Managed pipeline mode
   *
   * Select the managed pipeline mode that specifies how IIS processes requests for managed
   * content. Use classic mode only when the applications in the application pool cannot run in
   * the Integrated mode.
   *
   * - `Integrated` — Integrated
   * - `Classic` — Classic
   *
   * @default Integrated
   *
   * In group: ApplicationPool
   */
  "PipeLineMode": "Integrated" | "Classic";
  /**
   * Identity
   *
   * Configure the account under which an application pool's worker process runs. Select one of
   * the predefined security accounts or configure a custom account.
   *
   * - `ApplicationPoolIdentity` — Application Pool Identity
   * - `LocalService` — Local Service
   * - `LocalSystem` — Local System
   * - `NetworkService` — Network Service
   * - `SpecificUser` — Custom Account
   *
   * @default ApplicationPoolIdentity
   *
   * In group: ApplicationPool
   */
  "AppPoolIdentity": "ApplicationPoolIdentity" | "LocalService" | "LocalSystem" | "NetworkService" | "SpecificUser";
  /**
   * Username
   *
   * Provide the username of the custom account that you want to use.
   *
   * Only meaningful when: `AppPoolIdentity = SpecificUser`
   *
   * In group: ApplicationPool
   */
  "AppPoolUsername"?: string;
  /**
   * Password
   *
   * Provide the password for custom account. <br/>The best practice is to create a variable in
   * the build or release pipeline, and mark it as 'Secret' to secure it, and then use it here,
   * like '$(userCredentials)'. <br> Note: Special characters in password are interpreted as per
   * <a href="https://go.microsoft.com/fwlink/?linkid=843470">command-line arguments</a>
   *
   * Only meaningful when: `AppPoolIdentity = SpecificUser`
   *
   * In group: ApplicationPool
   */
  "AppPoolPassword"?: string;
  /**
   * Application pool name
   *
   * Provide the name of the IIS application pool.
   *
   * Only meaningful when: `ActionIISApplicationPool = StartAppPool || ActionIISApplicationPool =
   * StopAppPool || ActionIISApplicationPool = RecycleAppPool`
   */
  "StartStopRecycleAppPoolName"?: string;
  /**
   * Additional appcmd.exe commands
   *
   * Enter additional AppCmd.exe commands. For more than one command use a line separator, like
   * <br/> list apppools <br/> list sites<br/> recycle apppool /apppool.name:ExampleAppPoolName
   *
   * In group: Advanced
   */
  "AppCmdCommands"?: string;
}

/**
 * IIS web app manage
 *
 * Create or update websites, web apps, virtual directories, or application pools
 *
 * [Learn more about this task](https://aka.ms/iis-webapp-management-readme)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/iis-web-app-management-on-machine-group
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/IISWebAppManagementOnMachineGroupV0
 */
export function iISWebAppManagementOnMachineGroupV0(
  inputs: IISWebAppManagementOnMachineGroupV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("IISWebAppManagementOnMachineGroup@0", inputs as unknown as Record<string, unknown>, opts);
}
