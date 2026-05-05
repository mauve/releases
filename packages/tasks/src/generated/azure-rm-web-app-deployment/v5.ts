/* eslint-disable */
// Auto-generated from AzureRmWebAppDeploymentV5/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureRmWebAppDeploymentV5Inputs {
  /**
   * Connection type
   *
   * Select the service connection type to use to deploy the Web App.<br />Select Publish Profile
   * for using Visual Studio created Publish profile. [More
   * Information](https://aka.ms/vsPublishProfile).
   *
   * - `AzureRM` — Azure Resource Manager
   * - `PublishProfile` — Publish Profile
   *
   * @default AzureRM
   */
  "ConnectionType": "AzureRM" | "PublishProfile";
  /**
   * Azure subscription
   *
   * Select the Azure Resource Manager subscription for the deployment.
   *
   * Only meaningful when: `ConnectionType = AzureRM`
   */
  "ConnectedServiceName"?: AzureRMConnection;
  /**
   * Publish profile path
   *
   * Path of the Publish profile created from Visual Studio
   *
   * @default $(System.DefaultWorkingDirectory)/**​/*.pubxml
   *
   * Only meaningful when: `ConnectionType = PublishProfile`
   */
  "PublishProfilePath"?: string;
  /**
   * Publish profile password
   *
   * It is recommended to store password in a secret variable and use that variable here e.g.
   * $(Password).
   *
   * Only meaningful when: `ConnectionType = PublishProfile`
   */
  "PublishProfilePassword"?: string;
  /**
   * App Service type
   *
   * Choose from Web App On Windows, Web App On Linux, Web App for Containers, Function App,
   * Function App on Linux, Function App for Containers and Mobile App.
   *
   * - `webApp` — Web App on Windows
   * - `webAppLinux` — Web App on Linux
   * - `webAppContainer` — Web App for Containers (Linux)
   * - `webAppHyperVContainer` — Web App for Containers (Windows)
   * - `functionApp` — Function App on Windows (Not Recommended, Use Azure Functions Task)
   * - `functionAppLinux` — Function App on Linux (Not Recommended, Use Azure Functions Task)
   * - `functionAppContainer` — Function App for Containers (Linux) (Not Recommended, Use Azure
   * Functions for container Task)
   * - `apiApp` — API App
   * - `mobileApp` — Mobile App
   *
   * @default webApp
   *
   * Only meaningful when: `ConnectionType = AzureRM`
   */
  "WebAppKind"?: "webApp" | "webAppLinux" | "webAppContainer" | "webAppHyperVContainer" | "functionApp" | "functionAppLinux" | "functionAppContainer" | "apiApp" | "mobileApp";
  /**
   * App Service name
   *
   * Enter or Select the name of an existing Azure App Service. App services based on selected
   * app type will only be listed.
   *
   * Only meaningful when: `ConnectionType = AzureRM`
   */
  "WebAppName"?: string;
  /**
   * Deploy to Slot or App Service Environment
   *
   * Select the option to deploy to an existing deployment slot or Azure App Service
   * Environment.<br />For both the targets, the task needs Resource group name.<br />In case the
   * deployment target is a slot, by default the deployment is done to the production slot. Any
   * other existing slot name can also be provided.<br />In case the deployment target is an
   * Azure App Service environment, leave the slot name as ‘production’ and just specify the
   * Resource group name.
   *
   * @default false
   *
   * Only meaningful when: `ConnectionType = AzureRM && WebAppKind != ""`
   */
  "DeployToSlotOrASEFlag"?: boolean;
  /**
   * Resource group
   *
   * The Resource group name is required when the deployment target is either a deployment slot
   * or an App Service Environment.<br />Enter or Select the Azure Resource group that contains
   * the Azure App Service specified above.
   *
   * Only meaningful when: `DeployToSlotOrASEFlag = true`
   */
  "ResourceGroupName"?: string;
  /**
   * Slot
   *
   * Enter or Select an existing Slot other than the Production slot.
   *
   * @default production
   *
   * Only meaningful when: `DeployToSlotOrASEFlag = true`
   */
  "SlotName"?: string;
  /**
   * Registry or Namespace
   *
   * A globally unique top-level domain name for your specific registry or namespace.<br/> Note:
   * Fully qualified image name will be of the format: '<b>`<registry or
   * namespace`></b>/`<repository`>:`<tag`>'. For example,
   * '<b>myregistry.azurecr.io</b>/nginx:latest'.
   *
   * Only meaningful when: `WebAppKind = webAppContainer || WebAppkind = functionAppContainer ||
   * WebAppKind = webAppHyperVContainer`
   */
  "DockerNamespace"?: string;
  /**
   * Image
   *
   * Name of the repository where the container images are stored.<br/> Note: Fully qualified
   * image name will be of the format: '`<registry or namespace`>/<b>`<repository`></b>:`<tag`>'.
   * For example, 'myregistry.azurecr.io/<b>nginx</b>:latest'.
   *
   * Only meaningful when: `WebAppKind = webAppContainer || WebAppkind = functionAppContainer ||
   * WebAppKind = webAppHyperVContainer`
   */
  "DockerRepository"?: string;
  /**
   * Tag
   *
   * Tags are optional, it is the mechanism that registries use to give Docker images a
   * version.<br/> Note: Fully qualified image name will be of the format: '`<registry or
   * namespace`>/`<repository`>:<b>`<tag`></b>'. For example,
   * 'myregistry.azurecr.io/nginx:<b>latest</b>'.
   *
   * Only meaningful when: `WebAppKind = webAppContainer || WebAppkind = functionAppContainer ||
   * WebAppKind = webAppHyperVContainer`
   */
  "DockerImageTag"?: string;
  /**
   * Virtual application
   *
   * Specify the name of the Virtual application that has been configured in the Azure portal.
   * The option is not required for deployments to the App Service root.
   *
   * Only meaningful when: `WebAppKind != webAppLinux && WebAppKind != webAppContainer &&
   * WebAppKind != webAppHyperVContainer && WebAppkind != functionAppContainer && WebAppKind !=
   * functionApp && webAppKind != functionAppLinux && WebAppKind != ""`
   */
  "VirtualApplication"?: string;
  /**
   * Package or folder
   *
   * File path to the package or a folder containing app service contents generated by MSBuild or
   * a compressed zip or war file.<br />Variables (
   * [Build](https://docs.microsoft.com/vsts/pipelines/build/variables) |
   * [Release](https://docs.microsoft.com/vsts/pipelines/release/variables#default-variables)),
   * wildcards are supported. <br/> For example, $(System.DefaultWorkingDirectory)/\*\*​/\*.zip
   * or $(System.DefaultWorkingDirectory)/\*\*​/\*.war.
   *
   * @default $(System.DefaultWorkingDirectory)/**​/*.zip
   *
   * Only meaningful when: `ConnectionType = PublishProfile || WebAppKind = webApp || WebAppKind
   * = apiApp || WebAppKind = functionApp || WebAppKind = mobileApp || WebAppKind = webAppLinux
   * || webAppKind = functionAppLinux`
   */
  "Package"?: string;
  /**
   * Runtime Stack
   *
   * Select the framework and version.
   *
   * - `DOTNETCORE|10.0` — .NET 10.0
   * - `DOTNETCORE|9.0` — .NET 9.0
   * - `DOTNETCORE|8.0` — .NET 8.0
   * - `DOTNETCORE|7.0` — .NET 7.0
   * - `DOTNETCORE|6.0` — .NET 6.0
   * - `NODE|22-lts` — Node 22 LTS
   * - `NODE|20-lts` — Node 20 LTS
   * - `NODE|18-lts` — Node 18 LTS
   * - `NODE|16-lts` — Node 16 LTS
   * - `PYTHON|3.13` — Python 3.13
   * - `PYTHON|3.12` — Python 3.12
   * - `PYTHON|3.11` — Python 3.11
   * - `PYTHON|3.10` — Python 3.10
   * - `PYTHON|3.9` — Python 3.9
   * - `PYTHON|3.8` — Python 3.8
   * - `PHP|8.3` — PHP 8.3
   * - `PHP|8.2` — PHP 8.2
   * - `PHP|8.1` — PHP 8.1
   * - `PHP|8.0` — PHP 8.0
   * - `JAVA|21-java21` — Java 21
   * - `JAVA|17-java17` — Java 17
   * - `JAVA|11-java11` — Java 11
   * - `JAVA|8-jre8` — Java 8
   * - `JBOSSEAP|8-java17` — JBoss EAP 8 (Java 17)
   * - `JBOSSEAP|8-java11` — JBoss EAP 8 (Java 11)
   * - `JBOSSEAP|7-java17` — JBoss EAP 7 (Java 17)
   * - `JBOSSEAP|7-java11` — JBoss EAP 7 (Java 11)
   * - `JBOSSEAP|7-java8` — JBoss EAP 7 (Java 8)
   * - `TOMCAT|10.1-java21` — Tomcat 10.1 (Java 21)
   * - `TOMCAT|10.1-java17` — Tomcat 10.1 (Java 17)
   * - `TOMCAT|10.1-java11` — Tomcat 10.1 (Java 11)
   * - `TOMCAT|10.0-java17` — Tomcat 10.0 (Java 17)
   * - `TOMCAT|10.0-java11` — Tomcat 10.0 (Java 11)
   * - `TOMCAT|10.0-jre8` — Tomcat 10.0 (Java 8)
   * - `TOMCAT|9.0-java21` — Tomcat 9.0 (Java 21)
   * - `TOMCAT|9.0-java17` — Tomcat 9.0 (Java 17)
   * - `TOMCAT|9.0-java11` — Tomcat 9.0 (Java 11)
   * - `TOMCAT|9.0-jre8` — Tomcat 9.0 (Java 8)
   * - `TOMCAT|8.5-java11` — Tomcat 8.5 (Java 11)
   * - `TOMCAT|8.5-jre8` — Tomcat 8.5 (Java 8)
   *
   * Only meaningful when: `WebAppKind = webAppLinux`
   */
  "RuntimeStack"?: "DOTNETCORE|10.0" | "DOTNETCORE|9.0" | "DOTNETCORE|8.0" | "DOTNETCORE|7.0" | "DOTNETCORE|6.0" | "NODE|22-lts" | "NODE|20-lts" | "NODE|18-lts" | "NODE|16-lts" | "PYTHON|3.13" | "PYTHON|3.12" | "PYTHON|3.11" | "PYTHON|3.10" | "PYTHON|3.9" | "PYTHON|3.8" | "PHP|8.3" | "PHP|8.2" | "PHP|8.1" | "PHP|8.0" | "JAVA|21-java21" | "JAVA|17-java17" | "JAVA|11-java11" | "JAVA|8-jre8" | "JBOSSEAP|8-java17" | "JBOSSEAP|8-java11" | "JBOSSEAP|7-java17" | "JBOSSEAP|7-java11" | "JBOSSEAP|7-java8" | "TOMCAT|10.1-java21" | "TOMCAT|10.1-java17" | "TOMCAT|10.1-java11" | "TOMCAT|10.0-java17" | "TOMCAT|10.0-java11" | "TOMCAT|10.0-jre8" | "TOMCAT|9.0-java21" | "TOMCAT|9.0-java17" | "TOMCAT|9.0-java11" | "TOMCAT|9.0-jre8" | "TOMCAT|8.5-java11" | "TOMCAT|8.5-jre8";
  /**
   * Runtime Stack
   *
   * Select the framework and version. Refer [this
   * doc](https://docs.microsoft.com/azure/azure-functions/functions-versions#languages) for
   * supported runtime versions. Old values like `DOCKER|microsoft/azure-functions-*` are
   * deprecated, please use the new values from dropdown.
   *
   * - `DOTNET|2.2` — DOTNET|2.2 (functionapp v2)
   * - `DOTNET|3.1` — DOTNET|3.1 (functionapp v3)
   * - `JAVA|8` — JAVA|8 (functionapp v2/v3)
   * - `JAVA|11` — JAVA|11 (functionapp v3)
   * - `NODE|8` — NODE|8 (functionapp v2)
   * - `NODE|10` — NODE|10 (functionapp v2/v3)
   * - `NODE|12` — NODE|12 (functionapp v3)
   * - `NODE|14` — NODE|14 (functionapp v3)
   * - `NODE|20` — NODE|20 (functionapp v4)
   * - `NODE|22` — NODE|22 (functionapp v4)
   * - `PYTHON|3.6` — PYTHON|3.6 (functionapp v2/v3)
   * - `PYTHON|3.7` — PYTHON|3.7 (functionapp v2/v3)
   * - `PYTHON|3.8` — PYTHON|3.8 (functionapp v3)
   *
   * Only meaningful when: `WebAppKind = functionAppLinux`
   */
  "RuntimeStackFunction"?: "DOTNET|2.2" | "DOTNET|3.1" | "JAVA|8" | "JAVA|11" | "NODE|8" | "NODE|10" | "NODE|12" | "NODE|14" | "NODE|20" | "NODE|22" | "PYTHON|3.6" | "PYTHON|3.7" | "PYTHON|3.8";
  /**
   * Startup command
   *
   * Enter the start up command. For ex.<br/>dotnet exec filename.dll<br/>dotnet filename.dll
   *
   * Only meaningful when: `WebAppKind = webAppLinux || WebAppKind = webAppContainer ||
   * WebAppkind = functionAppContainer || WebAppKind = functionAppLinux || WebAppKind =
   * webAppHyperVContainer`
   */
  "StartupCommand"?: string;
  /**
   * Deployment script type
   *
   * Customize the deployment by providing a script that will run on the Azure App service once
   * the task has completed the deployment successfully . For example restore packages for Node,
   * PHP, Python applications. [Learn more](https://go.microsoft.com/fwlink/?linkid=843471).
   *
   * - `` — Select deployment script type (inline or file)
   * - `Inline Script` — Inline Script
   * - `File Path` — Script File Path
   *
   * In group: PostDeploymentAction
   */
  "ScriptType"?: "" | "Inline Script" | "File Path";
  /**
   * Inline Script
   *
   * @default :: You can provide your deployment commands here. One command per line.
   *
   * Only meaningful when: `ScriptType == Inline Script`
   *
   * In group: PostDeploymentAction
   */
  "InlineScript"?: string;
  /**
   * Deployment script path
   *
   * Only meaningful when: `ScriptType == File Path`
   *
   * In group: PostDeploymentAction
   */
  "ScriptPath"?: string;
  /**
   * Generate web.config parameters for Python, Node.js, Go and Java apps
   *
   * A standard Web.config will be generated and deployed to Azure App Service if the application
   * does not have one. The values in web.config can be edited and vary based on the application
   * framework. For example for node.js application, web.config will have startup file and
   * iis_node module values. This edit feature is only for the generated web.config. [Learn
   * more](https://go.microsoft.com/fwlink/?linkid=843469).
   *
   * In group: FileTransformsAndVariableSubstitution
   */
  "WebConfigParameters"?: string;
  /**
   * App settings
   *
   * Edit web app application settings following the syntax -key value . Value containing spaces
   * should be enclosed in double quotes.<br /> <b>Example</b> : -Port 5000 -RequestTimeout 5000
   * <br /> -WEBSITE_TIME_ZONE "Eastern Standard Time"
   *
   * In group: ApplicationAndConfigurationSettings
   */
  "AppSettings"?: string;
  /**
   * Configuration settings
   *
   * Edit web app configuration settings following the syntax -key value. Value containing spaces
   * should be enclosed in double quotes.<br /> Example : -phpVersion 5.6 -linuxFxVersion:
   * node|6.11
   *
   * In group: ApplicationAndConfigurationSettings
   */
  "ConfigurationSettings"?: string;
  /**
   * Select deployment method
   *
   * If unchecked we will auto-detect the best deployment method based on your app type, package
   * format and other parameters. <br>Select the option to view the supported deployment methods
   * and choose one for deploying your app.
   *
   * @default false
   *
   * In group: AdditionalDeploymentOptions
   */
  "UseWebDeploy"?: boolean;
  /**
   * Deployment method
   *
   * Choose the deployment method for the app.
   *
   * - `webDeploy` — Web Deploy
   * - `zipDeploy` — Zip Deploy
   * - `runFromZip` — Run From Package
   *
   * @default webDeploy
   *
   * Only meaningful when: `UseWebDeploy == true`
   *
   * In group: AdditionalDeploymentOptions
   */
  "DeploymentType"?: "webDeploy" | "zipDeploy" | "runFromZip";
  /**
   * Take App Offline
   *
   * Select the option to take the Azure App Service offline by placing an app_offline.htm file
   * in the root directory of the App Service before the sync operation begins. The file will be
   * removed after the sync operation completes successfully.
   *
   * @default true
   *
   * Only meaningful when: `UseWebDeploy == true && DeploymentType != runFromZip`
   *
   * In group: AdditionalDeploymentOptions
   */
  "TakeAppOfflineFlag"?: boolean;
  /**
   * SetParameters file
   *
   * Optional: location of the SetParameters.xml file to use.
   *
   * Only meaningful when: `UseWebDeploy == true && DeploymentType == webDeploy`
   *
   * In group: AdditionalDeploymentOptions
   */
  "SetParametersFile"?: string;
  /**
   * Remove additional files at destination
   *
   * Select the option to delete files on the Azure App Service that have no matching files in
   * the App Service package or folder.<br /><br />Note: This will also remove all files related
   * to any extension installed on this Azure App Service. To prevent this, select 'Exclude files
   * from App_Data folder' checkbox.
   *
   * @default false
   *
   * Only meaningful when: `UseWebDeploy == true && DeploymentType == webDeploy`
   *
   * In group: AdditionalDeploymentOptions
   */
  "RemoveAdditionalFilesFlag"?: boolean;
  /**
   * Exclude files from the App_Data folder
   *
   * Select the option to prevent files in the App_Data folder from being deployed to/ deleted
   * from the Azure App Service.
   *
   * @default true
   *
   * Only meaningful when: `UseWebDeploy == true && DeploymentType == webDeploy`
   *
   * In group: AdditionalDeploymentOptions
   */
  "ExcludeFilesFromAppDataFlag"?: boolean;
  /**
   * Additional arguments
   *
   * Additional Web Deploy arguments following the syntax -key:value .<br />These will be applied
   * when deploying the Azure App Service. Example: -disableLink:AppPoolExtension
   * -disableLink:ContentExtension.<br />For more examples of Web Deploy operation settings,
   * refer to [this](https://go.microsoft.com/fwlink/?linkid=838471).
   *
   * @default -retryAttempts:6 -retryInterval:10000
   *
   * Only meaningful when: `UseWebDeploy == true && DeploymentType == webDeploy`
   *
   * In group: AdditionalDeploymentOptions
   */
  "AdditionalArguments"?: string;
  /**
   * Rename locked files
   *
   * Select the option to enable msdeploy flag MSDEPLOY_RENAME_LOCKED_FILES=1 in Azure App
   * Service application settings. The option if set enables msdeploy to rename locked files that
   * are locked during app deployment
   *
   * @default true
   *
   * Only meaningful when: `UseWebDeploy == true && DeploymentType == webDeploy`
   *
   * In group: AdditionalDeploymentOptions
   */
  "RenameFilesFlag"?: boolean;
  /**
   * XML transformation
   *
   * The config transforms will be run for `*.Release.config` and `*.<EnvironmentName>.config` on
   * the `*.config file`.<br/> Config transforms will be run prior to the Variable
   * Substitution.<br/>XML transformations are supported only for Windows platform.
   *
   * @default false
   *
   * In group: FileTransformsAndVariableSubstitution
   */
  "XmlTransformation"?: boolean;
  /**
   * XML variable substitution
   *
   * Variables defined in the build or release pipelines will be matched against the 'key' or
   * 'name' entries in the appSettings, applicationSettings, and connectionStrings sections of
   * any config file and parameters.xml. Variable Substitution is run after config transforms.
   * <br/><br/> Note: If same variables are defined in the release pipeline and in the
   * environment, then the environment variables will supersede the release pipeline
   * variables.<br/>
   *
   * @default false
   *
   * In group: FileTransformsAndVariableSubstitution
   */
  "XmlVariableSubstitution"?: boolean;
  /**
   * JSON variable substitution
   *
   * Provide new line separated list of JSON files to substitute the variable values. Files names
   * are to be provided relative to the root folder. <br/> To substitute JSON variables that are
   * nested or hierarchical, specify them using JSONPath expressions. <br/> <br/> For example, to
   * replace the value of ‘ConnectionString’ in the sample below, you need to define a variable
   * as ‘Data.DefaultConnection.ConnectionString’ in the build or release pipeline (or release
   * pipeline's environment). <br/> {<br/>&nbsp;&nbsp;"Data":
   * {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"DefaultConnection":
   * {<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ConnectionString":
   * "Server=(localdb)\SQLEXPRESS;Database=MyDB;Trusted_Connection=True"<br/>&nbsp;&nbsp;&nbsp;&nbsp;}<br/>&nbsp;&nbsp;}<br/>
   * }<br/> Variable Substitution is run after configuration transforms. <br/><br/> Note:
   * pipeline variables are excluded in substitution.
   *
   * In group: FileTransformsAndVariableSubstitution
   */
  "JSONFiles"?: string;
  /**
   * Deployment method
   *
   * Choose the deployment method for the app.
   *
   * - `oneDeploy` — One Deploy
   * - `zipDeploy` — Zip Deploy
   *
   * @default oneDeploy
   *
   * In group: AdditionalDeploymentOptionsLinux
   */
  "DeploymentTypeLinux": "oneDeploy" | "zipDeploy";
  /**
   * Enable clean deployment
   *
   * Deployment mode for complete sync (clean) deployment
   *
   * @default true
   *
   * Only meaningful when: `DeploymentTypeLinux == oneDeploy`
   *
   * In group: AdditionalDeploymentOptionsLinux
   */
  "CleanDeploymentFlag"?: boolean;
}

/**
 * Azure App Service deploy
 *
 * Deploy to Azure App Service a web, mobile, or API app using Docker, Java, .NET, .NET Core,
 * Node.js, PHP, Python, or Ruby
 *
 * [Learn more about this task](https://aka.ms/azurermwebdeployreadme)
 *
 * @see https://aka.ms/azureappservicetroubleshooting
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureRmWebAppDeploymentV5
 */
export function azureRmWebAppDeploymentV5(
  inputs: AzureRmWebAppDeploymentV5Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureRmWebAppDeployment@5", inputs as unknown as Record<string, unknown>, opts);
}
