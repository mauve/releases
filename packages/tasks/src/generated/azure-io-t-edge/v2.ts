/* eslint-disable */
// Auto-generated from AzureIoTEdgeV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection, dockerregistryConnection } from '../connections.js';

export interface AzureIoTEdgeV2Inputs {
  /**
   * Action
   *
   * Select an Azure IoT Edge action.
   * **Build module images** will only build modules (You can use it to check compilation error).
   * **Push module images** will push modules to container registry.
   * **Deploy to IoT Edge devices** will deploy the generated deployment file to IoT Hub. (We
   * recommend to put **Deploy** task in release pipeline).
   *
   * - `Build module images` — Build module images
   * - `Push module images` — Push module images
   * - `Generate deployment manifest` — Generate deployment manifest
   * - `Deploy to IoT Edge devices` — Deploy to IoT Edge devices
   *
   * @default Build module images
   */
  "action": "Build module images" | "Push module images" | "Generate deployment manifest" | "Deploy to IoT Edge devices";
  /**
   * Deployment file
   *
   * Select the deployment json file.
   * If this task is in **release pipeline**, you need to set the location of deployment file in
   * artifact.(The default value works for most conditions).
   * If this task is in **build pipeline**, you need to set it to the path of **Path of output
   * deployment file**.
   *
   * @default $(System.DefaultWorkingDirectory)/config/deployment.json
   *
   * Only meaningful when: `action == Deploy to IoT Edge devices`
   */
  "deploymentFilePath"?: string;
  /**
   * Azure subscription contains IoT Hub
   *
   * Select an **Azure subscription** that contains IoT Hub
   *
   * Only meaningful when: `action == Deploy to IoT Edge devices`
   */
  "connectedServiceNameARM"?: AzureRMConnection;
  /**
   * IoT Hub name
   *
   * Select the **IoT Hub**
   *
   * Only meaningful when: `action == Deploy to IoT Edge devices`
   */
  "iothubname"?: string;
  /**
   * IoT Edge deployment ID
   *
   * Input the **IoT Edge Deployment ID**, if ID exists, it will be overridden.
   * Up to 128 lowercase letters, numbers and the following characters are allowed [
   * -:+%_#*?!(),=@;' ].
   * Check more information for [Azure IoT Edge
   * deployment](https://docs.microsoft.com/azure/iot-edge/how-to-deploy-monitor#monitor-a-deployment)
   *
   * @default $(System.TeamProject)-devops-deployment
   *
   * In group: advanced_deploy
   */
  "deploymentid": string;
  /**
   * IoT Edge deployment priority
   *
   * Set the **priority** to a positive integer to resolve deployment conflicts: when targeted by
   * multiple deployments a device will use the one with highest priority or (in case of two
   * deployments with the same priority) latest creation time.
   * Check more information for [Azure IoT Edge
   * deployment](https://docs.microsoft.com/azure/iot-edge/how-to-deploy-monitor#monitor-a-deployment)
   *
   * @default 0
   *
   * In group: advanced_deploy
   */
  "priority": string;
  /**
   * Choose single/multiple device
   *
   * Choose to deploy to single or multiple(by tags) devices
   *
   * - `Single Device` — Single Device
   * - `Multiple Devices` — Multiple Devices
   *
   * Only meaningful when: `action == Deploy to IoT Edge devices`
   */
  "deviceOption"?: "Single Device" | "Multiple Devices";
  /**
   * IoT Edge device ID
   *
   * Input the IoT Edge **device ID**
   *
   * Only meaningful when: `deviceOption == Single Device`
   */
  "deviceId"?: string;
  /**
   * IoT Edge device target condition
   *
   * Input the **target condition** of devices you would like to deploy. Do not use double quote.
   * Example: **tags.building=9 and tags.environment='test'**.
   * Check more information for [Azure IoT Edge
   * deployment](https://docs.microsoft.com/azure/iot-edge/how-to-deploy-monitor#monitor-a-deployment)
   *
   * Only meaningful when: `deviceOption == Multiple Devices`
   */
  "targetcondition"?: string;
  /**
   * Container registry type
   *
   * Select a **Container Registry Type**.
   * **Azure Container Registry** for ACR and **Generic Container Registry** for generic
   * registries including docker hub.
   *
   * - `Azure Container Registry` — Azure Container Registry
   * - `Generic Container Registry` — Generic Container Registry
   *
   * @default Azure Container Registry
   *
   * Only meaningful when: `action = Push module images`
   */
  "containerregistrytype"?: "Azure Container Registry" | "Generic Container Registry";
  /**
   * Docker Registry Connection
   *
   * Select a generic **Docker registry connection**. Required for **Build and Push**.
   *
   * Only meaningful when: `containerregistrytype = Generic Container Registry`
   */
  "dockerRegistryEndpoint"?: dockerregistryConnection;
  /**
   * Azure subscription
   *
   * Select an Azure subscription
   *
   * Only meaningful when: `containerregistrytype = Azure Container Registry`
   */
  "azureSubscriptionEndpoint"?: AzureRMConnection;
  /**
   * Azure Container Registry
   *
   * Select an **Azure Container Registry**
   *
   * Only meaningful when: `containerregistrytype = Azure Container Registry`
   */
  "azureContainerRegistry"?: string;
  /**
   * .template.json file
   *
   * The path of Azure IoT Edge solution **.template.json**. This file defines the modules and
   * routes in Azure IoT Edge solution, file name must end with **.template.json**
   *
   * @default deployment.template.json
   *
   * Only meaningful when: `action = Build module images || action = Push module images || action
   * = Generate deployment manifest`
   */
  "templateFilePath"?: string;
  /**
   * Default platform
   *
   * In your **.template.json**, you can leave the modules platform unspecified. For these
   * modules, the **default platform** will be used.
   *
   * - `amd64` — amd64
   * - `windows-amd64` — windows-amd64
   * - `arm32v7` — arm32v7
   * - `arm64v8` — arm64v8
   *
   * @default amd64
   *
   * Only meaningful when: `action = Build module images || action = Push module images || action
   * = Generate deployment manifest`
   */
  "defaultPlatform"?: "amd64" | "windows-amd64" | "arm32v7" | "arm64v8";
  /**
   * Add registry credential to deployment manifest
   *
   * Add registry credential for pushing docker images to deployment manifest
   *
   * - `true` — true
   * - `false` — false
   *
   * @default true
   *
   * Only meaningful when: `action = Push module images`
   */
  "fillRegistryCredential"?: "true" | "false";
  /**
   * Output path
   *
   * The output path of generated deployment manifest
   *
   * @default $(System.DefaultWorkingDirectory)/config/deployment.json
   *
   * Only meaningful when: `action == Generate deployment manifest`
   */
  "deploymentManifestOutputPath"?: string;
  /**
   * Validate the schema of generated deployment manifest
   *
   * Fail this step if the generated deployment manifest does not pass schema validation. You can
   * search `Azure IoT Edge deployment` in [JSON Schema Store](http://schemastore.org/json/) to
   * find latest schema.
   *
   * - `true` — true
   * - `false` — false
   *
   * @default false
   *
   * Only meaningful when: `action = Generate deployment manifest`
   */
  "validateGeneratedDeploymentManifest"?: "true" | "false";
  /**
   * Bypass module(s)
   *
   * Select the module(s) that you **DO NOT** need to build(or push) in the .template.json,
   * specify module names and separate with comma.
   * Example: if you have 2 modules **SampleModule1,SampleModule2** in your .template.json, you
   * want to just build or push **SampleModule1**, then you set the bypass modules as
   * **SampleModule2**. Leave empty if you would like to build all the modules in .template.json.
   *
   * In group: advanced_push
   */
  "bypassModules"?: string;
}

/**
 * Azure IoT Edge
 *
 * Build and deploy an Azure IoT Edge image
 *
 * Visit the
 * [documentation](https://docs.microsoft.com/en-us/azure/iot-edge/how-to-continuous-integration-continuous-deployment)
 * for help.
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/azure-iot-edge
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureIoTEdgeV2
 */
export function azureIoTEdgeV2(
  inputs: AzureIoTEdgeV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureIoTEdge@2", inputs as unknown as Record<string, unknown>, opts);
}
