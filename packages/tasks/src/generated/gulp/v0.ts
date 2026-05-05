/* eslint-disable */
// Auto-generated from GulpV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface GulpV0Inputs {
  /**
   * gulp File Path
   *
   * Relative path from repo root of the gulp file script file to run.
   *
   * @default gulpfile.js
   */
  "gulpFile": string;
  /**
   * gulp Task(s)
   *
   * Optional. Space delimited list of tasks to run. If not specified, the default task will run.
   */
  "targets"?: string;
  /**
   * Arguments
   *
   * Additional arguments passed to gulp. --gulpfile is not needed since already added via
   * gulpFile input above.
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
   * gulp.js location
   *
   * gulp.js to run when agent can't find global installed gulp. Defaults to the gulp.js under
   * node_modules folder of the working directory.
   *
   * @default node_modules/gulp/bin/gulp.js
   *
   * In group: advanced
   */
  "gulpjs": string;
  /**
   * Publish to Azure Pipelines
   *
   * Select this option to publish JUnit test results produced by the gulp build to Azure
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
   * Enable code Coverage
   *
   * Select this option to enable Code Coverage using Istanbul.
   *
   * @default false
   *
   * In group: codeCoverage
   */
  "enableCodeCoverage": boolean;
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
 * gulp
 *
 * Run the gulp Node.js streaming task-based build system
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613721)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/gulp
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/GulpV0
 */
export function gulpV0(
  inputs: GulpV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("gulp@0", inputs as unknown as Record<string, unknown>, opts);
}
