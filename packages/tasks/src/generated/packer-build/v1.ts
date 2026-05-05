/* eslint-disable */
// Auto-generated from PackerBuildV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface PackerBuildV1Inputs {
  /**
   * Packer template
   *
   * Select whether you want the task to auto generate Packer template or use custom template
   * provided by you.
   *
   * - `builtin` — Auto generated
   * - `custom` — User provided
   *
   * @default builtin
   */
  "templateType": "builtin" | "custom";
  /**
   * Packer template location
   *
   * Path to a custom user-provided template.
   *
   * Only meaningful when: `templateType = custom`
   */
  "customTemplateLocation"?: string;
  /**
   * Template parameters
   *
   * Specify parameters which will be passed to Packer for building custom template. This should
   * map to "variables" section in your custom template. E.g. if the template has a variable
   * named "drop-location", then add a parameter here with name "drop-location" and a value which
   * you want to use. You can link the value to a release variable as well. To view/edit the
   * additional parameters in a grid, click on "…" next to text box.
   *
   * @default {}
   *
   * Only meaningful when: `templateType = custom`
   */
  "customTemplateParameters"?: string;
  /**
   * Azure subscription
   *
   * Select the Azure Resource Manager subscription for baking and storing the machine image.
   *
   * In group: AzureDetails
   */
  "ConnectedServiceName": AzureRMConnection;
  /**
   * Managed VM disk image
   *
   * Check if generated image should be a managed image.
   *
   * @default true
   *
   * In group: AzureDetails
   */
  "isManagedImage": boolean;
  /**
   * Managed VM Disk Image Name
   *
   * The Name of the Managed disk image for Auto Generated Templates.
   *
   * Only meaningful when: `isManagedImage = true`
   *
   * In group: AzureDetails
   */
  "managedImageName"?: string;
  /**
   * Storage location
   *
   * Location for storing the built machine image. This location will also be used to create a
   * temporary VM for the purpose of building image.
   *
   * In group: AzureDetails
   */
  "location": string;
  /**
   * Storage account
   *
   * Storage account for storing the built machine image. This storage account must be
   * pre-existing in the location selected.
   *
   * In group: AzureDetails
   */
  "storageAccountName": string;
  /**
   * Resource group
   *
   * Azure Resource group that contains the selected storage account.
   *
   * In group: AzureDetails
   */
  "azureResourceGroup": string;
  /**
   * Base image source
   *
   * Select the source of base image. You can either choose from a curated gallery of OS images
   * or provide URL of your custom VHD image. <br/>Please note that if you have selected option
   * to create a Managed image by checking 'Managed VM disk image' option, then you should only
   * choose 'Gallery' option here. 'Custom' source is not supported to create a managed image.
   *
   * - `default` — Gallery
   * - `customVhd` — Custom
   *
   * @default default
   *
   * In group: DeploymentInputs
   */
  "baseImageSource": "default" | "customVhd";
  /**
   * Base image
   *
   * Choose from curated list of OS images. This will be used for installing pre-requisite(s) and
   * application(s) before capturing machine image.
   *
   * - `MicrosoftWindowsServer:WindowsServer:2012-R2-Datacenter:windows` — Windows
   * 2012-R2-Datacenter
   * - `MicrosoftWindowsServer:WindowsServer:2016-Datacenter:windows` — Windows 2016-Datacenter
   * - `MicrosoftWindowsServer:WindowsServer:2012-Datacenter:windows` — Windows 2012-Datacenter
   * - `MicrosoftWindowsServer:WindowsServer:2008-R2-SP1:windows` — Windows 2008-R2-SP1
   * - `Canonical:UbuntuServer:14.04.4-LTS:linux` — Ubuntu 14.04.4-LTS
   * - `Canonical:UbuntuServer:16.04-LTS:linux` — Ubuntu 16.04-LTS
   * - `Canonical:UbuntuServer:18.04-LTS:linux` — Ubuntu 18.04-LTS
   * - `RedHat:RHEL:7.2:linux` — RHEL 7.2
   * - `RedHat:RHEL:6.8:linux` — RHEL 6.8
   * - `OpenLogic:CentOS:7.2:linux` — CentOS 7.2
   * - `OpenLogic:CentOS:6.8:linux` — CentOS 6.8
   * - `credativ:Debian:8:linux` — Debian 8
   * - `credativ:Debian:7:linux` — Debian 7
   * - `SUSE:openSUSE-Leap:42.2:linux` — openSUSE-Leap 42.2
   * - `SUSE:SLES:12-SP2:linux` — SLES 12-SP2
   * - `SUSE:SLES:11-SP4:linux` — SLES 11-SP4
   *
   * @default MicrosoftWindowsServer:WindowsServer:2012-R2-Datacenter:windows
   *
   * Only meaningful when: `baseImageSource = default`
   *
   * In group: DeploymentInputs
   */
  "baseImage"?: "MicrosoftWindowsServer:WindowsServer:2012-R2-Datacenter:windows" | "MicrosoftWindowsServer:WindowsServer:2016-Datacenter:windows" | "MicrosoftWindowsServer:WindowsServer:2012-Datacenter:windows" | "MicrosoftWindowsServer:WindowsServer:2008-R2-SP1:windows" | "Canonical:UbuntuServer:14.04.4-LTS:linux" | "Canonical:UbuntuServer:16.04-LTS:linux" | "Canonical:UbuntuServer:18.04-LTS:linux" | "RedHat:RHEL:7.2:linux" | "RedHat:RHEL:6.8:linux" | "OpenLogic:CentOS:7.2:linux" | "OpenLogic:CentOS:6.8:linux" | "credativ:Debian:8:linux" | "credativ:Debian:7:linux" | "SUSE:openSUSE-Leap:42.2:linux" | "SUSE:SLES:12-SP2:linux" | "SUSE:SLES:11-SP4:linux";
  /**
   * Base image URL
   *
   * Specify URL of base image. This will be used for installing pre-requisite(s) and
   * application(s) before capturing machine image.
   *
   * Only meaningful when: `baseImageSource = customVhd`
   *
   * In group: DeploymentInputs
   */
  "customImageUrl"?: string;
  /**
   * Base image OS
   *
   * - `windows` — Windows
   * - `linux` — Linux
   *
   * @default windows
   *
   * Only meaningful when: `baseImageSource = customVhd`
   *
   * In group: DeploymentInputs
   */
  "customImageOSType"?: "windows" | "linux";
  /**
   * Deployment Package
   *
   * Specify the path for deployment package directory relative to
   * $(System.DefaultWorkingDirectory). Supports minimatch pattern. Example path:
   * FrontendWebApp/**​/GalleryApp <br/> Please note that this package will be copied to
   * temporary virtual machine which Packer creates. If the package contains large number of
   * files and/or the files are very large in size, the upload can take quite long time (possibly
   * running into few hours). To optimize the upload time, please see if size of the package can
   * be meaningfully reduced. Another alternative is to use an intermediary Azure storage
   * account. Upload the package to a storage account prior to running this task. And for this
   * task, use a package containing a script which will download the required package from the
   * storage account.
   *
   * In group: DeploymentInputs
   */
  "packagePath": string;
  /**
   * Deployment script
   *
   * Specify the relative path to powershell script(for Windows) or shell script(for Linux) which
   * deploys the package. This script should be contained in the package path selected above.
   * Supports minimatch pattern. Example path: deploy/**​/scripts/windows/deploy.ps1
   *
   * In group: DeploymentInputs
   */
  "deployScriptPath": string;
  /**
   * Deployment script arguments
   *
   * Specify the arguments to be passed to deployment script.
   *
   * In group: DeploymentInputs
   */
  "deployScriptArguments"?: string;
  /**
   * Delete temp folder
   *
   * This option allows you to remove temporary folder
   *
   * @default false
   *
   * In group: DeploymentInputs
   */
  "canDeleteTempFolder": boolean;
  /**
   * Additional Builder parameters
   *
   * In auto generated Packer template mode the task creates a Packer template with an Azure
   * builder. This builder is used to generate a machine image. You can add keys to the Azure
   * builder to customize the generated Packer template. For example setting ssh_tty=true in case
   * you are using a CentOS base image and you need to have a tty to run sudo.<br/>To view/edit
   * the additional parameters in a grid, click on “…” next to text box.
   *
   * @default {"vm_size":"Standard_D3_v2"}
   *
   * Only meaningful when: `templateType = builtin`
   *
   * In group: Advanced
   */
  "additionalBuilderParameters"?: string;
  /**
   * Skip temporary file cleanup during deprovision
   *
   * During deprovisioning of VM, skip clean-up of temporary files uploaded to VM. Refer
   * [here](https://www.packer.io/docs/builders/azure.html#skip_clean)
   *
   * @default true
   *
   * Only meaningful when: `templateType = builtin`
   *
   * In group: Advanced
   */
  "skipTempFileCleanupDuringVMDeprovision"?: boolean;
  /**
   * Packer Version
   *
   * Specify the version of Packer to install. This will work only with custom templates.
   *
   * Only meaningful when: `templateType = custom`
   *
   * In group: Advanced
   */
  "packerVersion"?: string;
  /**
   * Image URL or Name
   *
   * Provide a name for the output variable which will store generated machine image VHD url for
   * un-managed VM image or image name for managed VM image.
   *
   * In group: Output
   */
  "imageUri"?: string;
  /**
   * Azure Resource Id
   *
   * Provide a name for the output variable which will store the azure resource id for the newly
   * created image. This is for managed images only.
   *
   * In group: Output
   */
  "imageId"?: string;
}

/**
 * Build machine image
 *
 * Build a machine image using Packer, which may be used for Azure Virtual machine scale set
 * deployment
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=845329) or [see the
 * Packer documentation](https://www.packer.io/docs/index.html)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/deploy/packer-build
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/PackerBuildV1
 */
export function packerBuildV1(
  inputs: PackerBuildV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("PackerBuild@1", inputs as unknown as Record<string, unknown>, opts);
}
