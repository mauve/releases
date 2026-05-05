/* eslint-disable */
// Auto-generated from GruntV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface GruntV0Inputs {
  /**
   * Grunt File Path
   *
   * Relative path from repo root of the grunt file script file to run.
   *
   * @default gruntfile.js
   */
  "gruntFile": string;
  /**
   * Grunt Task(s)
   *
   * Optional. Space delimited list of tasks to run. If not specified, the default task will run.
   */
  "targets"?: string;
  /**
   * Arguments
   *
   * Additional arguments passed to grunt. --gruntfile is not needed since already added via
   * gruntFile input above.
   */
  "arguments"?: string;
  /**
   * Working Directory
   *
   * Current working directory when script is run. Defaults to the folder where the script is
   * located.
   *
   * In group: advanced
   */
  "cwd"?: string;
  /**
   * grunt-cli location
   *
   * grunt-cli to run when agent can't find global installed grunt-cli Defaults to the grunt-cli
   * under node_modules folder of the working directory.
   *
   * @default node_modules/grunt-cli/bin/grunt
   *
   * In group: advanced
   */
  "gruntCli": string;
  /**
   * Publish to Azure Pipelines
   *
   * Select this option to publish JUnit test results produced by the Grunt build to Azure
   * Pipelines.
   *
   * @default false
   *
   * In group: junitTestResults
   */
  "publishJUnitResults"?: boolean;
  /**
   * Test Results Files
   *
   * Test results files path. Wildcards can be used. For example, `**​/TEST-*.xml` for all XML
   * files whose name starts with TEST-.
   *
   * @default **​/TEST-*.xml
   *
   * Only meaningful when: `publishJUnitResults = true`
   *
   * In group: junitTestResults
   */
  "testResultsFiles"?: string;
  /**
   * Test Run Title
   *
   * Provide a name for the test run.
   *
   * Only meaningful when: `publishJUnitResults = true`
   *
   * In group: junitTestResults
   */
  "testRunTitle"?: string;
  /**
   * Enable Code Coverage
   *
   * Select this option to enable Code Coverage using Istanbul.
   *
   * @default false
   *
   * In group: codeCoverage
   */
  "enableCodeCoverage"?: boolean;
  /**
   * Test Framework
   *
   * Select your test framework.
   *
   * - `Mocha` — Mocha
   * - `Jasmine` — Jasmine
   *
   * @default Mocha
   *
   * Only meaningful when: `enableCodeCoverage = true`
   *
   * In group: codeCoverage
   */
  "testFramework"?: "Mocha" | "Jasmine";
  /**
   * Source Files
   *
   * Provide the path to your source files which you want to hookRequire()
   *
   * Only meaningful when: `enableCodeCoverage = true`
   *
   * In group: codeCoverage
   */
  "srcFiles"?: string;
  /**
   * Test Script Files
   *
   * Provide the path to your test script files
   *
   * @default test/*.js
   *
   * Only meaningful when: `enableCodeCoverage = true`
   *
   * In group: codeCoverage
   */
  "testFiles"?: string;
}

/**
 * Grunt
 *
 * Run the Grunt JavaScript task runner
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=627413) or [see the
 * Grunt documentation](https://gruntjs.com/getting-started)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/grunt
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/GruntV0
 */
export function gruntV0(
  inputs: GruntV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Grunt@0", inputs as unknown as Record<string, unknown>, opts);
}
