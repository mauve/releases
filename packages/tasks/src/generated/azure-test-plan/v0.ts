/* eslint-disable */
// Auto-generated from AzureTestPlanV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface AzureTestPlanV0Inputs {
  /**
   * Azure Resource Manager connection
   *
   * Select an Azure Resource Manager service connection
   */
  "ConnectedServiceName"?: AzureRMConnection;
  /**
   * Test cases to be executed
   *
   * <ul><li><b>Manual tests: </b>Use this option to trigger manual tests from your test
   * plan.</li><li><b>Automated tests: </b>Use this option to run tests from your test plan that
   * have automated test method associated with it.</li>
   *
   * - `manualTests` — Manual tests
   * - `automatedTests` — Automated tests
   */
  "testSelector": "manualTests" | "automatedTests";
  /**
   * Select tests using
   *
   * <ul><li><b>Test assembly: </b>Use this option to specify one or more test assemblies that
   * contain your tests. You can optionally specify a filter criteria to select only specific
   * tests.</li><li><b>Test plan: </b>Use this option to run tests from your test plan that have
   * an automated test method associated with it.</li><li><b>Test run: </b>Use this option when
   * you are setting up an environment to run tests from the Test hub. This option should not be
   * used when running tests in a continuous integration / continuous deployment (CI/CD)
   * pipeline.</li>
   *
   * - `testPlan` — Test plan
   * - `testRun` — Test run
   *
   * @default testPlan
   */
  "testPlanOrRunSelector": "testPlan" | "testRun";
  /**
   * Test Run
   *
   * Test run based selection is used when triggering automated test runs from the test hub,
   * value for this should be kept as it is
   *
   * @default $(test.RunId)
   *
   * Only meaningful when: `testPlanOrRunSelector = testRun`
   */
  "testRunId"?: string;
  /**
   * Test plan
   *
   * Type or paste the test plan ID containing test suites with test cases.
   *
   * Only meaningful when: `testPlanOrRunSelector = testPlan`
   */
  "testPlan"?: string;
  /**
   * Test suite
   *
   * Select one or more test suites containing test cases.
   *
   * Only meaningful when: `testPlanOrRunSelector = testPlan`
   */
  "testSuite"?: string;
  /**
   * Test configuration
   *
   * Select Test Configuration.
   */
  "testConfiguration": string;
  /**
   * Select Test framework language
   *
   * Test Framework Language of automated tests in test plan
   *
   * - `JavaMaven` — Java - Maven
   * - `JavaGradle` — Java - Gradle
   * - `Python` — Python - PyTest
   * - `JavaScriptJest` — JavaScript - Jest
   * - `Playwright` — JavaScript/TypeScript - Playwright
   */
  "testLanguageInput"?: "JavaMaven" | "JavaGradle" | "Python" | "JavaScriptJest" | "Playwright";
  /**
   * Pom file path
   *
   * Relative path from the repository root to the Maven POM file.
   *
   * Only meaningful when: `testLanguageInput = JavaMaven`
   */
  "pomFilePath"?: string;
  /**
   * Gradle file path
   *
   * Relative path from the repository root to the build.gradle file.
   *
   * Only meaningful when: `testLanguageInput = JavaGradle`
   */
  "gradleFilePath"?: string;
  /**
   * Upload test results files
   *
   * Upload logs and other files containing diagnostic information collected when the tests were
   * run.
   *
   * @default true
   *
   * In group: advanced
   */
  "publishRunAttachments"?: boolean;
  /**
   * Fail if there are test failures
   *
   * Fail the task if there are any test failures. Check this option to fail the task if test
   * failures are detected in the result files.
   *
   * @default true
   */
  "failTaskOnFailedTests"?: boolean;
  /**
   * Fail if there is failure in publishing test results
   *
   * Fail if there is failure in publishing test results. Check this option to fail the task if
   * publishing test results is failed partially.
   *
   * @default false
   */
  "failTaskOnFailureToPublishResults"?: boolean;
  /**
   * Fail if no result files are found
   *
   * Fail the task if no result files are found.
   *
   * @default false
   */
  "failTaskOnMissingResultsFile"?: boolean;
}

/**
 * Azure Test Plan
 *
 * Run manual and automated tests points of test plan for different testing frameworks like
 * Maven and Gradle for Java, PyTest for Python and Jest for JavaScript
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613742)
 *
 * @see
 * https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/azure-test-plan-v0?view=azure-pipelines
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/AzureTestPlanV0
 */
export function azureTestPlanV0(
  inputs: AzureTestPlanV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("AzureTestPlan@0", inputs as unknown as Record<string, unknown>, opts);
}
