/* eslint-disable */
// Auto-generated from AzureResourceGroupDeploymentV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection, ExternalTfsConnection } from '../connections.js';

export interface AzureResourceGroupDeploymentV2Inputs {
  /**
   * Azure subscription
   *
   * Select the Azure Resource Manager subscription for the deployment.
   *
   * In group: AzureDetails
   */
  "ConnectedServiceName": AzureRMConnection;
  /**
   * Action
   *
   * Action to be performed on the Azure resources or resource group.
   *
   * - `Create Or Update Resource Group` — Create or update resource group
   * - `Select Resource Group` — Configure virtual machine deployment options
   * - `Start` — Start virtual machines
   * - `Stop` — Stop virtual machines
   * - `StopWithDeallocate` — Stop and deallocate virtual machines
   * - `Restart` — Restart virtual machines
   * - `Delete` — Delete virtual machines
   * - `DeleteRG` — Delete resource group
   *
   * @default Create Or Update Resource Group
   *
   * In group: AzureDetails
   */
  "action": "Create Or Update Resource Group" | "Select Resource Group" | "Start" | "Stop" | "StopWithDeallocate" | "Restart" | "Delete" | "DeleteRG";
  /**
   * Resource group
   *
   * Provide the name of a resource group.
   *
   * In group: AzureDetails
   */
  "resourceGroupName": string;
  /**
   * Location
   *
   * Location for deploying the resource group. If the resource group already exists in the
   * subscription, then this value will be ignored.
   *
   * Only meaningful when: `action = Create Or Update Resource Group`
   *
   * In group: AzureDetails
   */
  "location"?: string;
  /**
   * Template location
   *
   * - `Linked artifact` — Linked artifact
   * - `URL of the file` — URL of the file
   *
   * @default Linked artifact
   *
   * In group: Template
   */
  "templateLocation": "Linked artifact" | "URL of the file";
  /**
   * Template link
   *
   * Specify the URL of the template file. Example:
   * [https://raw.githubusercontent.com/Azure/...](https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/101-vm-simple-windows/azuredeploy.json)
   *
   * To deploy a template stored in a private storage account, retrieve and include the shared
   * access signature (SAS) token in the URL of the template. Example:
   * `<blob_storage_url>/template.json?<SAStoken>` To upload a template file (or a linked
   * template) to a storage account and generate a SAS token, you could use [Azure file
   * copy](https://aka.ms/azurefilecopyreadme) task or follow the steps using
   * [PowerShell](https://go.microsoft.com/fwlink/?linkid=838080) or [Azure
   * CLI](https://go.microsoft.com/fwlink/?linkid=836911).
   *
   * To view the template parameters in a grid, click on “…” next to Override template parameters
   * text box. This feature requires that CORS rules are enabled at the source. If templates are
   * in Azure storage blob, refer to
   * [this](https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/Cross-Origin-Resource-Sharing--CORS--Support-for-the-Azure-Storage-Services?redirectedfrom=MSDN#understanding-cors-requests)
   * to enable CORS.
   *
   * Only meaningful when: `templateLocation = URL of the file`
   *
   * In group: Template
   */
  "csmFileLink"?: string;
  /**
   * Template parameters link
   *
   * Specify the URL of the parameters file. Example:
   * [https://raw.githubusercontent.com/Azure/...](https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/101-vm-simple-windows/azuredeploy.parameters.json)
   *
   * To use a file stored in a private storage account, retrieve and include the shared access
   * signature (SAS) token in the URL of the template. Example:
   * `<blob_storage_url>/template.json?<SAStoken>` To upload a parameters file to a storage
   * account and generate a SAS token, you could use [Azure file
   * copy](https://aka.ms/azurefilecopyreadme) task or follow the steps using
   * [PowerShell](https://go.microsoft.com/fwlink/?linkid=838080) or [Azure
   * CLI](https://go.microsoft.com/fwlink/?linkid=836911).
   *
   * To view the template parameters in a grid, click on “…” next to Override template parameters
   * text box. This feature requires that CORS rules are enabled at the source. If templates are
   * in Azure storage blob, refer to
   * [this](https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/Cross-Origin-Resource-Sharing--CORS--Support-for-the-Azure-Storage-Services?redirectedfrom=MSDN#understanding-cors-requests)
   * to enable CORS.
   *
   * Only meaningful when: ` templateLocation = URL of the file`
   *
   * In group: Template
   */
  "csmParametersFileLink"?: string;
  /**
   * Template
   *
   * Specify the path or a pattern pointing to the Azure Resource Manager template. For more
   * information about the templates see https://aka.ms/azuretemplates. To get started
   * immediately use template https://aka.ms/sampletemplate.
   *
   * Only meaningful when: ` templateLocation = Linked artifact`
   *
   * In group: Template
   */
  "csmFile"?: string;
  /**
   * Template parameters
   *
   * Specify the path or a pattern pointing for the parameters file for the Azure Resource
   * Manager template.
   *
   * Only meaningful when: ` templateLocation = Linked artifact`
   *
   * In group: Template
   */
  "csmParametersFile"?: string;
  /**
   * Override template parameters
   *
   * To view the template parameters in a grid, click on “…” next to Override Parameters textbox.
   * This feature requires that CORS rules are enabled at the source. If templates are in Azure
   * storage blob, refer to
   * [this](https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/Cross-Origin-Resource-Sharing--CORS--Support-for-the-Azure-Storage-Services?redirectedfrom=MSDN#understanding-cors-requests)
   * to enable CORS. Or type the template parameters to override in the textbox. Example,
   * <br>–storageName fabrikam –adminUsername $(vmusername) -adminPassword $(password)
   * –azureKeyVaultName $(fabrikamFibre).<br>If the parameter value you're using has multiple
   * words, enclose them in quotes, even if you're passing them using variables. For example,
   * -name "parameter value" -name2 "$(var)"<br>To override object type parameters use
   * stringified JSON objects. For example, -options ["option1"] -map {"key1": "value1" }.
   *
   * In group: Template
   */
  "overrideParameters"?: string;
  /**
   * Deployment mode
   *
   * Refer to
   * [this](https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-modes) for
   * more details.
   *
   * Incremental mode handles deployments as incremental updates to the resource group. It leaves
   * unchanged resources that exist in the resource group but are not specified in the template.
   *
   * Complete mode deletes resources that are not in your template. Complete mode takes
   * relatively more time than incremental mode. If the task times out, consider increasing the
   * timeout, or changing the mode to 'Incremental'.
   * **[Warning] Complete mode will delete all the existing resources in the resource group that
   * are not specified in the template. Do review if the resource group you're deploying to
   * doesn't contain any necessary resources that are not specified in the template.**
   *
   * Validate mode enables you to find problems with the template before creating actual
   * resources. Validate mode enables you to find problems with the template before creating
   * actual resources. Please note that this mode will anyways create a resource group even if it
   * does not deploy any resource.
   *
   * By default, Incremental mode is used.
   *
   * - `Incremental` — Incremental
   * - `Complete` — Complete
   * - `Validation` — Validation only
   *
   * @default Incremental
   *
   * In group: Template
   */
  "deploymentMode": "Incremental" | "Complete" | "Validation";
  /**
   * Enable prerequisites
   *
   * These options would be applicable only when the Resource group contains virtual machines.
   * <br><br>Choosing Deployment Group option would configure Deployment Group agent on each of
   * the virtual machines. <br><br>Selecting WinRM option configures Windows Remote Management
   * (WinRM) listener over HTTPS protocol on port 5986, using a self-signed certificate. This
   * configuration is required for performing deployment operation on Azure machines. If the
   * target Virtual Machines are backed by a Load balancer, ensure Inbound NAT rules are
   * configured for target port (5986).
   *
   * - `None` — None
   * - `ConfigureVMwithWinRM` — Configure with WinRM agent
   * - `ConfigureVMWithDGAgent` — Configure with Deployment Group agent
   *
   * @default None
   *
   * In group: AdvancedDeploymentOptions
   */
  "enableDeploymentPrerequisites"?: "None" | "ConfigureVMwithWinRM" | "ConfigureVMWithDGAgent";
  /**
   * Azure Pipelines service connection
   *
   * Specify the service connection to connect to an Azure DevOps organization or collection for
   * agent registration.<br><br>You can create a service connection using "+New", and select
   * "Token-based authentication". You need a [personal access
   * token(PAT)](https://docs.microsoft.com/en-us/vsts/accounts/use-personal-access-tokens-to-authenticate?view=vsts)
   * to setup a service connection. <br><br>​Click "Manage" to update the service connection
   * details.
   *
   * Only meaningful when: `enableDeploymentPrerequisites = ConfigureVMWithDGAgent`
   *
   * In group: AdvancedDeploymentOptions
   */
  "deploymentGroupEndpoint"?: ExternalTfsConnection;
  /**
   * Team project
   *
   * Specify the Team Project which has the Deployment Group defined in it​
   *
   * Only meaningful when: `enableDeploymentPrerequisites = ConfigureVMWithDGAgent`
   *
   * In group: AdvancedDeploymentOptions
   */
  "project"?: string;
  /**
   * Deployment Group
   *
   * Specify the Deployment Group against which the agent(s) will be registered. For more
   * guidance, refer to [Deployment Groups](https://aka.ms/832442)
   *
   * Only meaningful when: `enableDeploymentPrerequisites = ConfigureVMWithDGAgent`
   *
   * In group: AdvancedDeploymentOptions
   */
  "deploymentGroupName"?: string;
  /**
   * Copy Azure VM tags to agents
   *
   * Choose if the tags configured on the Azure VM need to be copied to the corresponding
   * Deployment Group agent. <br><br>​By default all Azure tags will be copied following the
   * format “Key: Value”. Example: An Azure Tag “Role : Web” would be copied as-is to the Agent
   * machine. <br><br>For more information on how tag Azure resources refer to
   * [link](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-using-tags​)
   *
   * @default true
   *
   * Only meaningful when: `enableDeploymentPrerequisites = ConfigureVMWithDGAgent`
   *
   * In group: AdvancedDeploymentOptions
   */
  "copyAzureVMTags"?: boolean;
  /**
   * Run agent service as a user
   *
   * Decide whether to run the agent service as a user other than the default. <br>The default
   * user is "NT AUTHORITY\SYSTEM" in Windows and "root" in Linux.
   *
   * @default false
   *
   * Only meaningful when: `enableDeploymentPrerequisites = ConfigureVMWithDGAgent`
   *
   * In group: AdvancedDeploymentOptions
   */
  "runAgentServiceAsUser"?: boolean;
  /**
   * User name
   *
   * The username to run the agent service on the virtual machines. <br>For domain users, please
   * enter values as "domain\username" or "username@domain.com". For local users, please enter
   * just the user name. <br>It is assumed that the same domain user\a local user with the same
   * name, respectively, is present on all the virtual machines in the resource group.
   *
   * Only meaningful when: `enableDeploymentPrerequisites = ConfigureVMWithDGAgent &&
   * runAgentServiceAsUser = true`
   *
   * In group: AdvancedDeploymentOptions
   */
  "userName"?: string;
  /**
   * Password
   *
   * The password for the user to run the agent service on the Windows VMs. <br>It is assumed
   * that the password is the same for the specified user on all the VMs. <br>It can accept
   * variable defined in build or release pipelines as '$(passwordVariable)'. You may mark
   * variable as 'secret' to secure it. <br>For linux VMs, a password is not required and will be
   * ignored.
   *
   * Only meaningful when: `enableDeploymentPrerequisites = ConfigureVMWithDGAgent &&
   * runAgentServiceAsUser = true`
   *
   * In group: AdvancedDeploymentOptions
   */
  "password"?: string;
  /**
   * VM details for WinRM
   *
   * Provide a name for the variable for the resource group. The variable can be used as
   * $(variableName) to refer to the resource group in subsequent tasks like in the PowerShell on
   * Target Machines task for deploying applications. <br>Valid only when the selected action is
   * Create, Update or Select, and required when an existing resource group is selected.
   *
   * Only meaningful when: `enableDeploymentPrerequisites = ConfigureVMwithWinRM ||
   * enableDeploymentPrerequisites = None`
   *
   * In group: AdvancedDeploymentOptions
   */
  "outputVariable"?: string;
  /**
   * Deployment name
   *
   * Specifies the name of the resource group deployment to create.
   *
   * In group: Advanced
   */
  "deploymentName"?: string;
  /**
   * Deployment outputs
   *
   * Provide a name for the variable for the output variable which will contain the outputs
   * section of the current deployment object in string format. You can use the
   * “ConvertFrom-Json” PowerShell cmdlet to parse the JSON object and access the individual
   * output values. For more details refer to
   * [this](https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureResourceGroupDeploymentV2#deployment-outputs)
   *
   * In group: Advanced
   */
  "deploymentOutputs"?: string;
  /**
   * Access service principal details in override parameters
   *
   * Adds service principal id and key of the Azure endpoint you chose to the script's execution
   * environment. You can use these variables: `$servicePrincipalId` and `$servicePrincipalKey`
   * in your override parameters like `-key $servicePrincipalKey`
   *
   * @default false
   *
   * In group: Advanced
   */
  "addSpnToEnvironment"?: boolean;
  /**
   * Use individual output values without JSON.Stringify applied
   *
   * Individual output values are being converted via JSON.Stringify by default. If you want to
   * use the output values as it is without converting them via JSON.Stringify, enable this
   * option. For more details refer to
   * [this](https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureResourceGroupDeploymentV2#deployment-outputs)
   *
   * @default false
   *
   * In group: Advanced
   */
  "useWithoutJSON"?: boolean;
}

/**
 * Azure resource group deployment
 *
 * Deploy an Azure Resource Manager (ARM) template to a resource group and manage virtual
 * machines
 *
 * [Learn more about this task](https://aka.ms/argtaskreadme)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/azure-resource-group-deployment
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureResourceGroupDeploymentV2
 */
export function azureResourceGroupDeploymentV2(
  inputs: AzureResourceGroupDeploymentV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureResourceGroupDeployment@2", inputs as unknown as Record<string, unknown>, opts);
}
