/* eslint-disable */
// Auto-generated from ANTV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface AntV1Inputs {
  /**
   * Ant build file
   *
   * Relative path from the repository root to the Ant build file.
   *
   * @default build.xml
   */
  "antBuildFile": string;
  /**
   * Options
   *
   * Provide any options to pass to the Ant command line. You can provide your own properties
   * (for example, ***-DmyProperty=myPropertyValue***) and also use built-in variables (for
   * example, ***-DcollectionId=$(system.collectionId)***). Alternatively, the built-in variables
   * are already set as environment variables during the build and can be passed directly (for
   * example, ***-DcollectionIdAsEnvVar=%SYSTEM_COLLECTIONID%***).
   */
  "options"?: string;
  /**
   * Target(s)
   *
   * An optional, space-separated list of targets to build. If not specified, the `default`
   * target will be used. If no `default` target is defined, Ant 1.6.0 and later will build all
   * top-level tasks.
   */
  "targets"?: string;
  /**
   * Publish to Azure Pipelines
   *
   * Select this option to publish JUnit test results produced by the Ant build to Azure
   * Pipelines. Each test results file matching `Test Results Files` will be published as a test
   * run in Azure Pipelines.
   *
   * @default true
   *
   * In group: junitTestResults
   */
  "publishJUnitResults": boolean;
  /**
   * Test results files
   *
   * Test results files path. Wildcards can be used ([more
   * information](https://go.microsoft.com/fwlink/?linkid=856077)). For example, `**​/TEST-*.xml`
   * for all XML files whose name starts with TEST-.
   *
   * @default **​/TEST-*.xml
   *
   * Only meaningful when: `publishJUnitResults = true`
   *
   * In group: junitTestResults
   */
  "testResultsFiles"?: string;
  /**
   * Test run title
   *
   * Provide a name for the test run.
   *
   * Only meaningful when: `publishJUnitResults = true`
   *
   * In group: junitTestResults
   */
  "testRunTitle"?: string;
  /**
   * Code coverage tool
   *
   * Select the code coverage tool. For on-premises agent support, refer to the `More
   * Information` link below.
   *
   * - `None` — None
   * - `Cobertura` — Cobertura
   * - `JaCoCo` — JaCoCo
   *
   * @default None
   *
   * In group: codeCoverage
   */
  "codeCoverageTool"?: "None" | "Cobertura" | "JaCoCo";
  /**
   * Class files directories
   *
   * Comma-separated list of relative paths from the Ant build file to directories containing
   * class files and archive files (JAR, WAR, etc.). Code coverage is reported for class files in
   * these directories. For example: target/classes,target/testClasses.
   *
   * @default .
   *
   * Only meaningful when: `codeCoverageTool != None`
   *
   * In group: codeCoverage
   */
  "classFilesDirectories"?: string;
  /**
   * Class inclusion/exclusion filters
   *
   * Comma-separated list of filters to include or exclude classes from collecting code coverage.
   * For example: +:com.*,+:org.*,-:my.app*.*.
   *
   * Only meaningful when: `codeCoverageTool != None`
   *
   * In group: codeCoverage
   */
  "classFilter"?: string;
  /**
   * Source files directories
   *
   * Comma-separated list of relative paths from the Ant build file to source code directories.
   * Code coverage reports will use these to highlight source code. For example:
   * src/java,src/Test.
   *
   * Only meaningful when: `codeCoverageTool != None`
   *
   * In group: codeCoverage
   */
  "srcDirectories"?: string;
  /**
   * Fail when code coverage results are missing
   *
   * Fail the build if code coverage did not produce any results to publish.
   *
   * @default false
   *
   * Only meaningful when: `codeCoverageTool != None`
   *
   * In group: codeCoverage
   */
  "failIfCoverageEmpty"?: boolean;
  /**
   * Set ANT_HOME path
   *
   * If set, overrides any existing ANT_HOME environment variable with the given path.
   *
   * In group: advanced
   */
  "antHomeUserInputPath"?: string;
  /**
   * Set JAVA_HOME by
   *
   * Sets JAVA_HOME either by selecting a JDK version that will be discovered during builds or by
   * manually entering a JDK path.
   *
   * - `JDKVersion` — JDK Version
   * - `Path` — Path
   *
   * @default JDKVersion
   *
   * In group: advanced
   */
  "javaHomeSelection": "JDKVersion" | "Path";
  /**
   * JDK version
   *
   * Will attempt to discover the path to the selected JDK version and set JAVA_HOME accordingly.
   *
   * - `default` — default
   * - `1.25` — JDK 25
   * - `1.21` — JDK 21
   * - `1.17` — JDK 17
   * - `1.11` — JDK 11
   * - `1.10` — JDK 10 (out of support)
   * - `1.9` — JDK 9 (out of support)
   * - `1.8` — JDK 8
   * - `1.7` — JDK 7
   * - `1.6` — JDK 6 (out of support)
   *
   * @default default
   *
   * Only meaningful when: `javaHomeSelection = JDKVersion`
   *
   * In group: advanced
   */
  "jdkVersion"?: "default" | "1.25" | "1.21" | "1.17" | "1.11" | "1.10" | "1.9" | "1.8" | "1.7" | "1.6";
  /**
   * JDK path
   *
   * Sets JAVA_HOME to the given path.
   *
   * Only meaningful when: `javaHomeSelection = Path`
   *
   * In group: advanced
   */
  "jdkUserInputPath"?: string;
  /**
   * JDK architecture
   *
   * Optionally supply the architecture (x86, x64, arm64) of the JDK.
   *
   * - `x86` — x86
   * - `x64` — x64
   * - `arm64` — arm64
   *
   * @default x64
   *
   * Only meaningful when: `jdkVersion != default`
   *
   * In group: advanced
   */
  "jdkArchitecture"?: "x86" | "x64" | "arm64";
}

/**
 * Ant
 *
 * Build with Apache Ant
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613718) or [see the Ant
 * documentation](http://ant.apache.org/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/ant
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/ANTV1
 */
export function antV1(
  inputs: AntV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Ant@1", inputs as unknown as Record<string, unknown>, opts);
}
