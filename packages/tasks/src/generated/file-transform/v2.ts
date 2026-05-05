/* eslint-disable */
// Auto-generated from FileTransformV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface FileTransformV2Inputs {
  /**
   * Package or folder
   *
   * File path to the package or a folder.<br />Variables (
   * [Build](https://docs.microsoft.com/vsts/pipelines/build/variables) |
   * [Release](https://docs.microsoft.com/vsts/pipelines/release/variables#default-variables)),
   * wildcards are supported. <br/> For example, $(System.DefaultWorkingDirectory)/\*\*​/\*.zip.
   *
   * @default $(System.DefaultWorkingDirectory)/**​/*.zip
   */
  "folderPath": string;
  /**
   * XML transformation
   *
   * Config transforms will be run prior to the Variable Substitution.<br/>XML transformations
   * are supported only for Windows platform.
   *
   * @default true
   */
  "enableXmlTransform"?: boolean;
  /**
   * XML Transformation rules
   *
   * Provide new line separated list of transformation file rules using the syntax:
   * <br/>-transform <pathToTransformFile> -xml <pathToSourceConfigurationFile>
   *
   * @default -transform **\*.Release.config -xml **\*.config
   *
   * Only meaningful when: `enableXmlTransform == true`
   */
  "xmlTransformationRules"?: string;
  /**
   * JSON target files
   *
   * Provide new line separated list of files to substitute the variable values. Files names are
   * to be provided relative to the root folder. <br/> <br/> For example, to replace the value of
   * ‘ConnectionString’ in the sample below, you need to define a variable as
   * ‘Data.DefaultConnection.ConnectionString’ in the build or release pipeline (or release
   * pipeline's environment). <br/> {<br/>&nbsp;&nbsp;"Data":
   * {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"DefaultConnection":
   * {<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ConnectionString":
   * "Server=(localdb)\SQLEXPRESS;Database=MyDB;Trusted_Connection=True"<br/>&nbsp;&nbsp;&nbsp;&nbsp;}<br/>&nbsp;&nbsp;}<br/>
   * } <br/> Variable Substitution is run after configuration transforms. </br> </br> Note: Only
   * custom variables defined in build/release pipelines are used in substitution. Default/system
   * defined pipeline variables are excluded. <br/>Note: If same variables are defined in the
   * release pipeline and in the stage, then the stage variables will supersede the release
   * pipeline variables.
   *
   * In group: VariableSubstitution
   */
  "jsonTargetFiles"?: string;
  /**
   * XML target files
   *
   * Provide new line separated list of files to substitute the variable values. Files names are
   * to be provided relative to the root folder. <br/>For XML, Variables defined in the build or
   * release pipelines will be matched against the 'key' or 'name' entries in the appSettings,
   * applicationSettings, and connectionStrings sections of any config file and parameters.xml.
   * <br/> Variable Substitution is run after configuration transforms. </br> Note: Only custom
   * variables defined in build/release pipelines are used in substitution. Default/system
   * defined pipeline variables are excluded. <br/>Note: If same variables are defined in the
   * release pipeline and in the stage, then the stage variables will supersede the release
   * pipeline variables. <br/>Note: We are replacing double quotes with single quotes in the XML
   * to avoid escaping issues that can occur in XML.
   *
   * In group: VariableSubstitution
   */
  "xmlTargetFiles"?: string;
  /**
   * Error on empty files and invalid substitution.
   *
   * If selected, the pipeline fails if the target files are empty or if the substitution fails.
   *
   * @default false
   */
  "errorOnInvalidSubstitution"?: boolean;
}

/**
 * File transform
 *
 * Replace tokens with variable values in XML or JSON configuration files
 *
 * File transformation and variable substitution task: Update tokens in your XML based
 * configuration files and then replaces those tokens with variable values. <br/>Currently only
 * XML, JSON file formats are supported for variable substitution. </br> [Learn more about this
 * task](https://aka.ms/AA5xp1v)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/file-transform
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/FileTransformV2
 */
export function fileTransformV2(
  inputs: FileTransformV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("FileTransform@2", inputs as unknown as Record<string, unknown>, opts);
}
