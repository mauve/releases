/* eslint-disable */
// Auto-generated from AzureStaticWebAppV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface AzureStaticWebAppV0Inputs {
  /**
   * Working directory
   *
   * Specify the absolute working directory in which to execute this task. If left empty, the
   * default working directory will be used.
   *
   * @default $(System.DefaultWorkingDirectory)
   */
  "cwd"?: string;
  /**
   * App location
   *
   * Directory location of the application source code relative to working directory
   */
  "app_location"?: string;
  /**
   * App build command
   *
   * Custom command for Oryx to run when building application source code
   */
  "app_build_command"?: string;
  /**
   * Output location
   *
   * Directory location of the compiled application code after building
   */
  "output_location"?: string;
  /**
   * Api location
   *
   * Directory location of the Azure Functions source code relative to working directory
   */
  "api_location"?: string;
  /**
   * Api build command
   *
   * Custom command for Oryx to run when building Azure Functions source code
   */
  "api_build_command"?: string;
  /**
   * Routes location
   *
   * Directory location where the routes.json file can be found, relative to working directory.
   * Note: routes.json is deprecated, use staticwebapp.config.json
   */
  "routes_location"?: string;
  /**
   * Config file location
   *
   * Directory location where the staticwebapp.config.json file can be found, relative to working
   * directory
   */
  "config_file_location"?: string;
  /**
   * Skip app build
   *
   * Skips Oryx build for app folder
   */
  "skip_app_build"?: boolean;
  /**
   * Skip api build
   *
   * Skips Oryx build for api folder
   */
  "skip_api_build"?: boolean;
  /**
   * Set static export
   *
   * Set this flag to true when your application is configured to export to static HTML, i.e.
   * when if you're using `next export`.
   */
  "is_static_export"?: boolean;
  /**
   * Verbose
   *
   * Enables verbose logging
   */
  "verbose"?: boolean;
  /**
   * Build timeout in minutes
   *
   * Time limit of Oryx app folder build in minutes
   */
  "build_timeout_in_minutes"?: number;
  /**
   * Azure Static Web Apps api token
   *
   * Api token for deployment. Not required if passed as an environment variable
   */
  "azure_static_web_apps_api_token"?: string;
  /**
   * Deployment Environment
   *
   * Environment to deploy to. Leave blank for production environment. Takes precedence over
   * Production Branch
   */
  "deployment_environment"?: string;
  /**
   * Production Branch
   *
   * Production branch. When specified and Deployment Environment is empty, deployments from
   * other branches will be preview environments
   */
  "production_branch"?: string;
  /**
   * Data api location
   *
   * Directory location of the Data API source files relative to working directory
   */
  "data_api_location"?: string;
  /**
   * Azure Access Token
   *
   * Access Token used for deployment. Not required if passed as a variable
   */
  "azure_access_token"?: string;
  /**
   * Default Hostname
   *
   * Default hostname for deployment. Not required if passed as an environment variable
   */
  "default_hostname"?: string;
}

/**
 * Deploy Azure Static Web App
 *
 * [PREVIEW] Build and deploy an Azure Static Web App
 *
 * [Learn more about Azure Static Web Apps](https://aka.ms/swadocs)
 *
 * @see https://aka.ms/swadocs
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureStaticWebAppV0
 */
export function azureStaticWebAppV0(
  inputs: AzureStaticWebAppV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureStaticWebApp@0", inputs as unknown as Record<string, unknown>, opts);
}
