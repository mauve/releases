/* eslint-disable */
// Auto-generated from PublishPipelineMetadataV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface PublishPipelineMetadataV0Inputs {}

/**
 * Publish Pipeline Metadata
 *
 * Publish Pipeline Metadata to Evidence store
 *
 * Publish Pipeline Metadata to Evidence store.
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/PublishPipelineMetadataV0
 */
export function publishPipelineMetadataV0(
  inputs: PublishPipelineMetadataV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("PublishPipelineMetadata@0", inputs as unknown as Record<string, unknown>, opts);
}
