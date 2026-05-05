/* eslint-disable */
// Auto-generated from AzureResourceManagerTemplateDeploymentV3/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureResourceManagerTemplateDeploymentV3Inputs {
  /**
   * Deployment scope
   *
   * Deployment scope of the deployment. To know more abour deployment scopes, refer this
   * [link](https://docs.microsoft.com/bs-latn-ba/Azure/azure-resource-manager/resource-group-template-deploy-rest#deployment-scope)
   *
   * - `Management Group` — Management Group
   * - `Subscription` — Subscription
   * - `Resource Group` — Resource Group
   *
   * @default Resource Group
   *
   * In group: AzureDetails
   */
  "deploymentScope"?: "Management Group" | "Subscription" | "Resource Group";
  /**
   * Azure Resource Manager connection
   *
   * Select the Azure Resource Manager service connection having access to the selected
   * deployment scope.
   *
   * In group: AzureDetails
   */
  "ConnectedServiceName": AzureRMConnection;
  /**
   * Subscription
   *
   * Select the Azure subscription
   *
   * Only meaningful when: `deploymentScope != Management Group`
   *
   * In group: AzureDetails
   */
  "subscriptionName"?: string;
  /**
   * Action
   *
   * Action to be performed on the Azure resources or resource group.
   *
   * - `Create Or Update Resource Group` — Create or update resource group
   * - `DeleteRG` — Delete resource group
   *
   * @default Create Or Update Resource Group
   *
   * Only meaningful when: `deploymentScope = Resource Group`
   *
   * In group: AzureDetails
   */
  "action"?: "Create Or Update Resource Group" | "DeleteRG";
  /**
   * Resource group
   *
   * Provide the name of a resource group.
   *
   * Only meaningful when: `deploymentScope = Resource Group`
   *
   * In group: AzureDetails
   */
  "resourceGroupName"?: string;
  /**
   * Location
   *
   * For Resource Group deployment scope: Location for deploying the resource group. If the
   * resource group already exists in the subscription, then this value will be ignored.
   * For other deployment scope: Location to store deployment metadata.
   *
   * Only meaningful when: `action = Create Or Update Resource Group || deploymentScope !=
   * Resource Group`
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
   * immediately use template https://aka.ms/sampletemplate. 'Linked artifact' also has support
   * for Bicep files when the Azure CLI version > 2.20.0
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
   * Manager template. 'Linked artifact' also has support for Bicep files when the Azure CLI
   * version > 2.20.0
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
   * [this](https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureResourceManagerTemplateDeploymentV3#deployment-outputs)
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
   * [this](https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureResourceManagerTemplateDeploymentV3#deployment-outputs)
   *
   * @default false
   *
   * In group: Advanced
   */
  "useWithoutJSON"?: boolean;
}

/**
 * ARM template deployment
 *
 * Deploy an Azure Resource Manager (ARM) template to all the deployment scopes
 *
 * [Learn more about this task](https://aka.ms/armtaskreadme)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/azure-resource-group-deployment
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureResourceManagerTemplateDeploymentV3
 */
export function azureResourceManagerTemplateDeploymentV3(
  inputs: AzureResourceManagerTemplateDeploymentV3Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureResourceManagerTemplateDeployment@3", inputs as unknown as Record<string, unknown>, opts);
}
