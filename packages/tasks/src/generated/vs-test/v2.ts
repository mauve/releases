/* eslint-disable */
// Auto-generated from VsTestV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface VSTestV2Inputs {
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
   * - `testAssemblies` — Test assemblies
   * - `testPlan` — Test plan
   * - `testRun` — Test run
   *
   * @default testAssemblies
   *
   * In group: testSelection
   */
  "testSelector": "testAssemblies" | "testPlan" | "testRun";
  /**
   * Test files
   *
   * Run tests from the specified files.<br>Ordered tests and webtests can be run by specifying
   * the .orderedtest and .webtest files respectively. To run .webtest, Visual Studio 2017 Update
   * 4 or higher is needed. <br><br>The file paths are relative to the search folder. Supports
   * multiple lines of minimatch patterns. [More information](https://aka.ms/minimatchexamples)
   *
   * @default **\bin\**\*test.dll
   * **\bin\**\*tests.dll
   *
   * Only meaningful when: `testSelector = testAssemblies`
   *
   * In group: testSelection
   */
  "testAssemblyVer2"?: string;
  /**
   * Test plan
   *
   * Select a test plan containing test suites with automated test cases.
   *
   * Only meaningful when: `testSelector = testPlan`
   *
   * In group: testSelection
   */
  "testPlan"?: string;
  /**
   * Test suite
   *
   * Select one or more test suites containing automated test cases. Test case work items must be
   * associated with an automated test method. [Learn
   * more.](https://go.microsoft.com/fwlink/?linkid=847773
   *
   * Only meaningful when: `testSelector = testPlan`
   *
   * In group: testSelection
   */
  "testSuite"?: string;
  /**
   * Test configuration
   *
   * Select Test Configuration.
   *
   * Only meaningful when: `testSelector = testPlan`
   *
   * In group: testSelection
   */
  "testConfiguration"?: string;
  /**
   * Test Run
   *
   * Test run based selection is used when triggering automated test runs from the test hub. This
   * option cannot be used for running tests in the CI/CD pipeline.
   *
   * @default $(test.RunId)
   *
   * Only meaningful when: `testSelector = testRun`
   *
   * In group: testSelection
   */
  "tcmTestRun"?: string;
  /**
   * Search folder
   *
   * Folder to search for the test assemblies.
   *
   * @default $(System.DefaultWorkingDirectory)
   *
   * In group: testSelection
   */
  "searchFolder": string;
  /**
   * Test results folder
   *
   * Folder to store test results. When this input is not specified, results are stored in
   * $(Agent.TempDirectory)/TestResults by default, which is cleaned at the end of a pipeline
   * run. The results directory will always be cleaned up at the start of the vstest task before
   * the tests are run. Relative folder path if provided will be considered relative to
   * $(Agent.TempDirectory)
   *
   * @default $(Agent.TempDirectory)\TestResults
   *
   * In group: testSelection
   */
  "resultsFolder"?: string;
  /**
   * Test filter criteria
   *
   * Additional criteria to filter tests from Test assemblies. For example:
   * `Priority=1|Name=MyTestMethod`. [More
   * information](https://msdn.microsoft.com/en-us/library/jj155796.aspx)
   *
   * Only meaningful when: `testSelector = testAssemblies`
   *
   * In group: testSelection
   */
  "testFiltercriteria"?: string;
  /**
   * Run only impacted tests
   *
   * Automatically select, and run only the tests needed to validate the code change. [More
   * information](https://aka.ms/tialearnmore)
   *
   * @default False
   *
   * Only meaningful when: `testSelector = testAssemblies`
   *
   * In group: testSelection
   */
  "runOnlyImpactedTests"?: boolean;
  /**
   * Number of builds after which all tests should be run
   *
   * Number of builds after which to automatically run all tests. Test Impact Analysis stores the
   * mapping between test cases and source code. It is recommended to regenerate the mapping by
   * running all tests, on a regular basis.
   *
   * @default 50
   *
   * Only meaningful when: `testSelector = testAssemblies && runOnlyImpactedTests = true`
   *
   * In group: testSelection
   */
  "runAllTestsAfterXBuilds"?: string;
  /**
   * Test mix contains UI tests
   *
   * To run UI tests, ensure that the agent is set to run in interactive mode. Setting up an
   * agent to run interactively must be done before queueing the build / release. Checking this
   * box does <b>not</b> configure the agent in interactive mode automatically. This option in
   * the task is to only serve as a reminder to configure agent appropriately to avoid failures.
   * <br><br> Hosted Windows agents from the VS 2015 and 2017 pools can be used to run UI
   * tests.<br> [More information](https://aka.ms/uitestmoreinfo).
   *
   * @default false
   *
   * In group: testSelection
   */
  "uiTests"?: boolean;
  /**
   * Select test platform using
   *
   * - `version` — Version
   * - `location` — Specific location
   *
   * @default version
   *
   * In group: executionOptions
   */
  "vstestLocationMethod"?: "version" | "location";
  /**
   * Test platform version
   *
   * The version of Visual Studio test to use. If latest is specified it chooses latest Visual
   * Studio version starting from VS2022 followed by VS2019, VS2017 and VS2015 depending on what
   * is installed. Visual Studio 2013 is not supported. To run tests without needing Visual
   * Studio on the agent, use the ‘Installed by tools installer’ option. Be sure to include the
   * ‘Visual Studio Test Platform Installer’ task to acquire the test platform from nuget.
   *
   * - `latest` — Latest
   * - `17.0` — Visual Studio 2022
   * - `16.0` — Visual Studio 2019
   * - `15.0` — Visual Studio 2017
   * - `14.0` — Visual Studio 2015
   * - `toolsInstaller` — Installed by Tools Installer
   *
   * @default latest
   *
   * Only meaningful when: `vstestLocationMethod = version`
   *
   * In group: executionOptions
   */
  "vsTestVersion"?: "latest" | "17.0" | "16.0" | "15.0" | "14.0" | "toolsInstaller";
  /**
   * Path to vstest.console.exe
   *
   * Optionally supply the path to VSTest.
   *
   * Only meaningful when: `vstestLocationMethod = location`
   *
   * In group: executionOptions
   */
  "vstestLocation"?: string;
  /**
   * Settings file
   *
   * Path to runsettings or testsettings file to use with the tests.
   *
   * In group: executionOptions
   */
  "runSettingsFile"?: string;
  /**
   * Override test run parameters
   *
   * Override parameters defined in the `TestRunParameters` section of runsettings file or
   * `Properties` section of testsettings file. For example: `-key1 value1 -key2 value2`. Note:
   * Properties specified in testsettings file can be accessed via the TestContext using Visual
   * Studio 2017 Update 4 or higher
   *
   * In group: executionOptions
   */
  "overrideTestrunParameters"?: string;
  /**
   * Path to custom test adapters
   *
   * Directory path to custom test adapters. Adapters residing in the same folder as the test
   * assemblies are automatically discovered.
   *
   * In group: executionOptions
   */
  "pathtoCustomTestAdapters"?: string;
  /**
   * Run tests in parallel on multi-core machines
   *
   * If set, tests will run in parallel leveraging available cores of the machine. This will
   * override the MaxCpuCount if specified in your runsettings file. [Click
   * here](https://aka.ms/paralleltestexecution) to learn more about how tests are run in
   * parallel.
   *
   * @default False
   *
   * In group: executionOptions
   */
  "runInParallel"?: boolean;
  /**
   * Run tests in isolation
   *
   * Runs the tests in an isolated process. This makes vstest.console.exe process less likely to
   * be stopped on an error in the tests, but tests might run slower. This option currently
   * cannot be used when running with the multi-agent job setting.
   *
   * @default False
   *
   * In group: executionOptions
   */
  "runTestsInIsolation"?: boolean;
  /**
   * Code coverage enabled
   *
   * Collect code coverage information from the test run.
   *
   * @default False
   *
   * In group: executionOptions
   */
  "codeCoverageEnabled"?: boolean;
  /**
   * Other console options
   *
   * Other console options that can be passed to vstest.console.exe, as documented <a
   * href="https://aka.ms/vstestotherconsoleoptions" target="_blank">here</a>. <p>These options
   * are not supported and will be ignored when running tests using the ‘Multi agent’ parallel
   * setting of an agent job or when running tests using ‘Test plan’ or 'Test run' option or when
   * a custom batching option is selected. The options can be specified using a settings file
   * instead.</p>
   *
   * In group: executionOptions
   */
  "otherConsoleOptions"?: string;
  /**
   * Batch tests
   *
   * A batch is a group of tests. A batch of tests runs its tests at the same time and results
   * are published for the batch. If the job in which the task runs is set to use multiple
   * agents, each agent picks up any available batches of tests to run in
   * parallel.<br><br><b>Based on the number of tests and agents:</b> Simple batching based on
   * the number of tests and agents participating in the test run.<br><br><b>Based on past
   * running time of tests:</b> This batching considers past running time to create batches of
   * tests such that each batch has approximately equal running time.<br><br><b>Based on test
   * assemblies:</b> Tests from an assembly are batched together.
   *
   * - `basedOnTestCases` — Based on number of tests and agents
   * - `basedOnExecutionTime` — Based on past running time of tests
   * - `basedOnAssembly` — Based on test assemblies
   *
   * @default basedOnTestCases
   *
   * In group: advancedExecutionOptions
   */
  "distributionBatchType"?: "basedOnTestCases" | "basedOnExecutionTime" | "basedOnAssembly";
  /**
   * Batch options
   *
   * Simple batching based on the number of tests and agents participating in the test run. When
   * the batch size is automatically determined, each batch contains `(total number of tests /
   * number of agents)` tests. If a batch size is specified, each batch will contain the
   * specified number of tests.
   *
   * - `autoBatchSize` — Automatically determine the batch size
   * - `customBatchSize` — Specify a batch size
   *
   * @default autoBatchSize
   *
   * Only meaningful when: `distributionBatchType = basedOnTestCases`
   *
   * In group: advancedExecutionOptions
   */
  "batchingBasedOnAgentsOption"?: "autoBatchSize" | "customBatchSize";
  /**
   * Number of tests per batch
   *
   * Specify batch size
   *
   * @default 10
   *
   * Only meaningful when: `distributionBatchType = basedOnTestCases &&
   * batchingBasedOnAgentsOption = customBatchSize`
   *
   * In group: advancedExecutionOptions
   */
  "customBatchSizeValue"?: string;
  /**
   * Batch options
   *
   * This batching considers past running time to create batches of tests such that each batch
   * has approximately equal running time. Quick running tests will be batched together, while
   * longer running tests may belong to a separate batch. When this option is used with the
   * multi-agent job setting, total test time is reduced to a minimum.
   *
   * - `autoBatchSize` — Automatically determine the batch time
   * - `customTimeBatchSize` — Specify running time per batch
   *
   * @default autoBatchSize
   *
   * Only meaningful when: `distributionBatchType = basedOnExecutionTime`
   *
   * In group: advancedExecutionOptions
   */
  "batchingBasedOnExecutionTimeOption"?: "autoBatchSize" | "customTimeBatchSize";
  /**
   * Running time (sec) per batch
   *
   * Specify the running time (sec) per batch
   *
   * @default 60
   *
   * Only meaningful when: `distributionBatchType = basedOnExecutionTime &&
   * batchingBasedOnExecutionTimeOption = customTimeBatchSize`
   *
   * In group: advancedExecutionOptions
   */
  "customRunTimePerBatchValue"?: string;
  /**
   * Replicate tests instead of distributing when multiple agents are used in the job
   *
   * Choosing this option will not distribute tests across agents when the task is running in a
   * multi-agent job.<br>Each of the selected test(s) will be repeated on each agent.<br>The
   * option is not applicable when the agent job is configured to run with no parallelism or with
   * the multi-config option.
   *
   * @default False
   *
   * In group: advancedExecutionOptions
   */
  "dontDistribute"?: boolean;
  /**
   * Test run title
   *
   * Provide a name for the test run.
   *
   * In group: reportingOptions
   */
  "testRunTitle"?: string;
  /**
   * Build platform
   *
   * Build platform against which the tests should be reported. If you have defined a variable
   * for platform in your build task, use that here.
   *
   * In group: reportingOptions
   */
  "platform"?: string;
  /**
   * Build configuration
   *
   * Build configuration against which the tests should be reported. If you have defined a
   * variable for configuration in your build task, use that here.
   *
   * In group: reportingOptions
   */
  "configuration"?: string;
  /**
   * Upload test attachments
   *
   * Opt in/out of publishing run level attachments.
   *
   * @default true
   *
   * In group: reportingOptions
   */
  "publishRunAttachments"?: boolean;
  /**
   * Fail the task if a minimum number of tests are not run.
   *
   * Selecting this option will fail the task if specified minimum number of tests is not run.
   *
   * @default False
   *
   * In group: reportingOptions
   */
  "failOnMinTestsNotRun"?: boolean;
  /**
   * Minimum # of tests
   *
   * Specify the minimum # of tests that should be run for the task to succeed. Total tests
   * executed is calculated as the sum of passed, failed and aborted tests.
   *
   * @default 1
   *
   * Only meaningful when: `failOnMinTestsNotRun = true`
   *
   * In group: reportingOptions
   */
  "minimumExpectedTests"?: string;
  /**
   * Collect advanced diagnostics in case of catastrophic failures
   *
   * Collect advanced diagnostics in case of catastrophic failures.
   *
   * @default false
   *
   * In group: executionOptions
   */
  "diagnosticsEnabled"?: boolean;
  /**
   * Collect process dump and attach to test run report
   *
   * Collect process dump and attach to test run report.
   *
   * - `onAbortOnly` — On abort only
   * - `always` — Always
   * - `never` — Never
   *
   * @default onAbortOnly
   *
   * Only meaningful when: `diagnosticsEnabled = true`
   *
   * In group: executionOptions
   */
  "collectDumpOn"?: "onAbortOnly" | "always" | "never";
  /**
   * Rerun failed tests
   *
   * Selecting this option will rerun any failed tests until they pass or the maximum # of
   * attempts is reached.
   *
   * @default False
   *
   * In group: executionOptions
   */
  "rerunFailedTests"?: boolean;
  /**
   * Do not rerun if test failures exceed specified threshold
   *
   * Use this option to avoid rerunning tests when failure rate crosses the specified threshold.
   * This is applicable if any environment issues leads to massive failures.<br>You can specify %
   * failures or # of failed tests as a threshold.
   *
   * - `basedOnTestFailurePercentage` — % failure
   * - `basedOnTestFailureCount` — # of failed tests
   *
   * @default basedOnTestFailurePercentage
   *
   * Only meaningful when: `rerunFailedTests = true`
   *
   * In group: executionOptions
   */
  "rerunType"?: "basedOnTestFailurePercentage" | "basedOnTestFailureCount";
  /**
   * % failure
   *
   * Use this option to avoid rerunning tests when failure rate crosses the specified threshold.
   * This is applicable if any environment issues leads to massive failures.
   *
   * @default 30
   *
   * Only meaningful when: `rerunFailedTests = true && rerunType = basedOnTestFailurePercentage`
   *
   * In group: executionOptions
   */
  "rerunFailedThreshold"?: string;
  /**
   * # of failed tests
   *
   * Use this option to avoid rerunning tests when number of failed test cases crosses specified
   * limit. This is applicable if any environment issues leads to massive failures.
   *
   * @default 5
   *
   * Only meaningful when: `rerunFailedTests = true && rerunType = basedOnTestFailureCount`
   *
   * In group: executionOptions
   */
  "rerunFailedTestCasesMaxLimit"?: string;
  /**
   * Maximum # of attempts
   *
   * Specify the maximum # of times a failed test should be retried. If a test passes before the
   * maximum # of attempts is reached, it will not be rerun further.
   *
   * @default 3
   *
   * Only meaningful when: `rerunFailedTests = true`
   *
   * In group: executionOptions
   */
  "rerunMaxAttempts"?: string;
}

/**
 * Visual Studio Test
 *
 * Run unit and functional tests (Selenium, Appium, Coded UI test, etc.) using the Visual
 * Studio Test (VsTest) runner. Test frameworks that have a Visual Studio test adapter such as
 * MsTest, xUnit, NUnit, Chutzpah (for JavaScript tests using QUnit, Mocha and Jasmine), etc.
 * can be run. Tests can be distributed on multiple agents using this task (version 2 and
 * later).
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkId=835764)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/test/vstest
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/VsTestV2
 */
export function vSTestV2(
  inputs: VSTestV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("VSTest@2", inputs as unknown as Record<string, unknown>, opts);
}
