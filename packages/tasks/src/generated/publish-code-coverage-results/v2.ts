/* eslint-disable */
// Auto-generated from PublishCodeCoverageResultsV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface PublishCodeCoverageResultsV2Inputs {
  /**
   * Path to summary files
   *
   * Paths to summary files containing code coverage statistics, such as line, method, and class
   * coverage. Multiple summary files will be merged into a single report. Supports multiple
   * lines of minimatch patterns. [More information](https://aka.ms/minimatchexamples)
   */
  "summaryFileLocation": string;
  /**
   * Path to Source files
   *
   * Path to source files is required when coverage XML reports do not contain absolute path to
   * source files. For e.g., JaCoCo reports do not use absolute paths and when publishing JaCoCo
   * coverage for Java apps, the pattern would be similar to
   * `$(System.DefaultWorkingDirectory)/MyApp/src/main/java/`.<br />This input is also needed if
   * tests are run in a docker container. This input should point to absolute path to source
   * files on the host. For e.g., `$(System.DefaultWorkingDirectory)/MyApp/`
   */
  "pathToSources"?: string;
  /**
   * Fail if code coverage results are missing
   *
   * Fail the task if code coverage did not produce any results to publish.
   *
   * @default false
   */
  "failIfCoverageEmpty"?: boolean;
}

/**
 * Publish code coverage results v2
 *
 * Publish any of the code coverage results from a build
 *
 * [Learn more about this
 * task](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/publish-code-coverage-results-v2?view=azure-pipelines)
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/test/publish-code-coverage-results
 *
 * @see
 * https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/PublishCodeCoverageResultsV2
 */
export function publishCodeCoverageResultsV2(
  inputs: PublishCodeCoverageResultsV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("PublishCodeCoverageResults@2", inputs as unknown as Record<string, unknown>, opts);
}
