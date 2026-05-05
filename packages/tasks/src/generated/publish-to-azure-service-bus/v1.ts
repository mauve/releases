/* eslint-disable */
// Auto-generated from PublishToAzureServiceBusV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureServiceBusConnection } from '../connections.js';

export interface PublishToAzureServiceBusV1Inputs {
  /**
   * Azure Service Bus service connection
   *
   * Select an Azure Service Bus service connection.
   */
  "connectedServiceName": AzureServiceBusConnection;
  /**
   * Message body
   *
   * Enter the json messageBody.
   */
  "messageBody"?: string;
  /**
   * Session Id
   *
   * Session id with which message is published. For session based queues, publishing fails if
   * value not specified. For Non Session Based Queues, it will not matter.
   *
   * In group: advancedProperties
   */
  "sessionId"?: string;
  /**
   * Sign the Message
   *
   * If this is set to true, message will be signed provided a private certificate.
   *
   * @default false
   *
   * In group: advancedProperties
   */
  "signPayload": boolean;
  /**
   * Certificate Variable
   *
   * Specify the secret variable that contains the certificate content. This can also be a
   * certificate stored in an Azure key vault that is
   * [linked](https://docs.microsoft.com/en-us/vsts/pipelines/library/variable-groups?view=vsts#link-secrets-from-an-azure-key-vault-as-variables)
   * to a Variable Group used by this release pipeline.
   *
   * Only meaningful when: `signPayload = true`
   *
   * In group: advancedProperties
   */
  "certificateString"?: string;
  /**
   * Signature Property Key
   *
   * Key where you want signature to be in Message Properties. If left Empty, default is
   * 'signature' in message properties
   *
   * @default signature
   *
   * Only meaningful when: `signPayload = true`
   *
   * In group: advancedProperties
   */
  "signatureKey"?: string;
  /**
   * Wait for task completion
   *
   * If this is true, this task will wait for TaskCompleted event for the specified task timeout.
   *
   * @default false
   */
  "waitForCompletion": boolean;
  /**
   * Use .NET data contract serializer
   *
   * For more details go to task documentation
   *
   * @default true
   */
  "useDataContractSerializer": boolean;
}

/**
 * Publish To Azure Service Bus
 *
 * Sends a message to Azure Service Bus using a service connection (no agent is required)
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?linkid=870237)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/publish-to-azure-service-bus
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/PublishToAzureServiceBusV1
 */
export function publishToAzureServiceBusV1(
  inputs: PublishToAzureServiceBusV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("PublishToAzureServiceBus@1", inputs as unknown as Record<string, unknown>, opts);
}
