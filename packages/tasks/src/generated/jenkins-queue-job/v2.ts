/* eslint-disable */
// Auto-generated from JenkinsQueueJobV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { JenkinsConnection } from '../connections.js';

export interface JenkinsQueueJobV2Inputs {
  /**
   * Jenkins service connection
   *
   * Select the service connection for your Jenkins instance. To create one, click the Manage
   * link and create a new Jenkins service connection.
   */
  "serverEndpoint": JenkinsConnection;
  /**
   * Job name
   *
   * The name of the Jenkins job to queue. This must exactly match the job name on the Jenkins
   * server.
   */
  "jobName": string;
  /**
   * Job is of multibranch pipeline type
   *
   * This job is of multibranch pipeline type. If selected, enter the appropriate branch name.
   * Requires Team Foundation Server Plugin for Jenkins v5.3.4 or later.
   *
   * @default false
   */
  "isMultibranchJob"?: boolean;
  /**
   * Multibranch pipeline branch
   *
   * Queue this multibranch pipeline job on the specified branch. This requires Team Foundation
   * Server Plugin for Jenkins v5.3.4 or later.
   *
   * Only meaningful when: `isMultibranchJob = true`
   */
  "multibranchPipelineBranch"?: string;
  /**
   * Capture console output and wait for completion
   *
   * If selected, this task will capture the Jenkins build console output, wait for the Jenkins
   * build to complete, and succeed/fail based on the Jenkins build result. Otherwise, once the
   * Jenkins job is successfully queued, this task will successfully complete without waiting for
   * the Jenkins build to run.
   *
   * @default true
   */
  "captureConsole": boolean;
  /**
   * Capture pipeline output and wait for pipeline completion
   *
   * If selected, this task will capture the full Jenkins build pipeline console output, wait for
   * the full Jenkins build pipeline to complete, and succeed/fail based on the Jenkins build
   * pipeline result. Otherwise, once the first Jenkins job completes, this task will
   * successfully complete without waiting for full Jenkins build pipeline to run.
   *
   * @default true
   *
   * Only meaningful when: `captureConsole = true`
   */
  "capturePipeline"?: boolean;
  /**
   * Parameterized job
   *
   * Select if the Jenkins job accepts parameters. This should be selected even if all default
   * parameter values are used and no parameters are actually specified.
   *
   * @default false
   *
   * In group: advanced
   */
  "parameterizedJob": boolean;
  /**
   * Job parameters
   *
   * Specify job parameters, one per line, in the form
   * <b>`<parameterName>=<parameterValue>`</b><p>To set a parameter to an empty value (useful for
   * overriding a default value), leave off the parameter value. For example, specify
   * <b>`<parameterName>=`</b><p>Variables are supported. For example, to set a <b>`commitId`</b>
   * parameter value to the Git commit ID of the build, use:
   * <b>`commitId=$(Build.SourceVersion)`</b>. See the [documentation on
   * variables](https://go.microsoft.com/fwlink/?linkid=875288) for more details.<p>Supported
   * Jenkins parameter types are:
   * <ul><li>`Boolean`</li><li>`Choice`</li><li>`Password`</li><li>`String`</li></ul>
   *
   * Only meaningful when: `parameterizedJob = true`
   *
   * In group: advanced
   */
  "jobParameters"?: string;
  /**
   * Fail on unstable result
   *
   * Specifies strictness of a success definition: whether to consider unstable as a failure or
   * not. False for non-strict, and true for strict version.
   *
   * @default false
   *
   * In group: advanced
   */
  "failOnUnstableResult"?: boolean;
  /**
   * Number of retries for failed connection
   *
   * Specify number of retries on errors or failures
   *
   * @default 3
   *
   * In group: advanced
   */
  "retryCount"?: string;
  /**
   * Time between retries
   *
   * Specify time between retries. This is specified in seconds
   *
   * @default 60
   *
   * In group: advanced
   */
  "delayBetweenRetries"?: string;
}

/**
 * Jenkins queue job
 *
 * Queue a job on a Jenkins server
 *
 * [Learn more about this task](http://go.microsoft.com/fwlink/?LinkId=816956). This task
 * queues a job on a [Jenkins](https://jenkins.io/) server. Full integration capabilities
 * require installation of the [Team Foundation Server
 * Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Team+Foundation+Server+Plugin) on
 * Jenkins.
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/jenkins-queue-job
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/JenkinsQueueJobV2
 */
export function jenkinsQueueJobV2(
  inputs: JenkinsQueueJobV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("JenkinsQueueJob@2", inputs as unknown as Record<string, unknown>, opts);
}
