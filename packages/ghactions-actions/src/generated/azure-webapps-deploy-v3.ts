// Auto-generated from azure/webapps-deploy@v3/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface AzureWebappsDeployV3Inputs {
  /**
   * Name of the Azure Web App
   */
  "app-name": string | boolean | number;
  /**
   * Applies to Web Apps(Windows and Linux) and Web App Containers(linux). Multi container
   * scenario not supported. Publish profile (*.publishsettings) file contents with Web Deploy
   * secrets
   */
  "publish-profile"?: string | boolean | number;
  /**
   * Enter an existing Slot other than the Production slot
   *
   * @default production
   */
  "slot-name"?: string | boolean | number;
  /**
   * Applies to Web App only: Path to package or folder. *.zip, *.war, *.jar or a folder to
   * deploy
   *
   * @default .
   */
  "package"?: string | boolean | number;
  /**
   * Applies to Web App Containers only: Specify the fully qualified container image(s) name. For
   * example, 'myregistry.azurecr.io/nginx:latest' or 'python:3.7.2-alpine/'. For multi-container
   * scenario multiple container image names can be provided (multi-line separated)
   */
  "images"?: string | boolean | number;
  /**
   * Applies to Web App Containers only: Path of the Docker-Compose file. Should be a fully
   * qualified path or relative to the default working directory. Required for multi-container
   * scenario
   */
  "configuration-file"?: string | boolean | number;
  /**
   * Enter the start up command. For ex. dotnet run or dotnet run
   */
  "startup-command"?: string | boolean | number;
  /**
   * Enter the resource group name of the web app
   */
  "resource-group-name"?: string | boolean | number;
  /**
   * Enter deployment type (JAR, WAR, EAR, ZIP, Static)
   */
  "type"?: string | boolean | number;
  /**
   * Target path in the web app. For ex. '/home/site/wwwroot'
   */
  "target-path"?: string | boolean | number;
  /**
   * Delete existing files target directory before deploying
   */
  "clean"?: string | boolean | number;
  /**
   * Restart the app service after deployment
   */
  "restart"?: string | boolean | number;
  /**
   * Applies to Sitecontainers, containes a list of siteContainer specs
   */
  "sitecontainers-config"?: string | boolean | number;
}

/**
 * Azure WebApp
 *
 * Deploy Web Apps/Containerized Web Apps to Azure. github.com/Azure/Actions
 *
 * @see https://github.com/azure/webapps-deploy
 */
export function azureWebappsDeployV3(
  inputs: AzureWebappsDeployV3Inputs,
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("azure/webapps-deploy@v3", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
