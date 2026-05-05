/* eslint-disable */
// Auto-generated from DownloadPipelineArtifactV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface DownloadPipelineArtifactV2Inputs {
  /**
   * Download artifacts produced by
   *
   * Download artifacts produced by the current pipeline run, or from a specific pipeline run.
   *
   * - `current` — Current run
   * - `specific` — Specific run
   *
   * @default current
   */
  "source": "current" | "specific";
  /**
   * Project
   *
   * The project from which to download the pipeline artifacts.
   *
   * Only meaningful when: `source == specific`
   */
  "project"?: string;
  /**
   * Build pipeline
   *
   * Select the build pipeline name.
   *
   * Only meaningful when: `source == specific`
   */
  "pipeline"?: string;
  /**
   * When appropriate, download artifacts from the triggering build.
   *
   * If checked, this build task will try to download artifacts from the triggering build. If
   * there is no triggering build from the specified pipeline, it will download artifacts from
   * the build specified in the options below.
   *
   * @default false
   *
   * Only meaningful when: `source == specific`
   */
  "preferTriggeringPipeline"?: boolean;
  /**
   * Build version to download
   *
   * - `latest` — Latest
   * - `latestFromBranch` — Latest from specific branch and specified Build Tags
   * - `specific` — Specific version
   *
   * @default latest
   *
   * Only meaningful when: `source == specific`
   */
  "runVersion"?: "latest" | "latestFromBranch" | "specific";
  /**
   * Branch name
   *
   * Specify to filter on branch/ref name, for example: ```refs/heads/develop```.
   *
   * @default refs/heads/master
   *
   * Only meaningful when: `source == specific && runVersion == latestFromBranch`
   */
  "runBranch"?: string;
  /**
   * Build
   *
   * The build from which to download the artifacts.
   *
   * Only meaningful when: `source == specific && runVersion == specific`
   */
  "runId"?: string;
  /**
   * Build Tags
   *
   * A comma-delimited list of tags. Only builds with these tags will be returned.
   *
   * Only meaningful when: `source == specific && runVersion != specific`
   */
  "tags"?: string;
  /**
   * Download artifacts from partially succeeded builds.
   *
   * If checked, this build task will try to download artifacts whether the build is succeeded or
   * partially succeeded.
   *
   * @default false
   *
   * Only meaningful when: `source == specific && runVersion != specific`
   */
  "allowPartiallySucceededBuilds"?: boolean;
  /**
   * Download artifacts from failed builds.
   *
   * If checked, this build task will try to download artifacts whether the build is succeeded or
   * failed.
   *
   * @default false
   *
   * Only meaningful when: `source == specific && runVersion != specific`
   */
  "allowFailedBuilds"?: boolean;
  /**
   * Artifact name
   *
   * The name of the artifact to download. If left empty, it will download all artifacts
   * associated to the pipeline run.
   */
  "artifact"?: string;
  /**
   * Matching patterns
   *
   * One or more file matching patterns (new line delimited) that limit which files get
   * downloaded.
   *
   * @default **
   */
  "patterns"?: string;
  /**
   * Destination directory
   *
   * Directory to download the artifact files to. Can be relative to the pipeline workspace
   * directory or absolute. If multi-download option is applied (by leaving an empty artifact
   * name), a sub-directory will be created for each.
   *
   * @default $(Pipeline.Workspace)
   */
  "path": string;
}

/**
 * Download Pipeline Artifacts
 *
 * Download build and pipeline artifacts
 *
 * Download one or more published build or pipeline artifacts.
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/utility/download-pipeline-artifact
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/DownloadPipelineArtifactV2
 */
export function downloadPipelineArtifactV2(
  inputs: DownloadPipelineArtifactV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("DownloadPipelineArtifact@2", inputs as unknown as Record<string, unknown>, opts);
}
