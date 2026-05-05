/* eslint-disable */
// Auto-generated from GradleV3/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';

export interface GradleV3Inputs {
  /**
   * Gradle wrapper
   *
   * Relative path from the repository root to the Gradle Wrapper script.
   *
   * @default gradlew
   */
  "wrapperScript": string;
  /**
   * Working directory
   *
   * Working directory in which to run the Gradle build. If not specified, the repository root
   * directory is used.
   */
  "cwd"?: string;
  /**
   * Options
   */
  "options"?: string;
  /**
   * Tasks
   *
   * @default build
   */
  "tasks": string;
  /**
   * Publish to Azure Pipelines
   *
   * Select this option to publish JUnit test results produced by the Gradle build to Azure
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
   * Select the code coverage tool.
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
   * Comma-separated list of directories containing class files and archive files (JAR, WAR,
   * etc.). Code coverage is reported for class files in these directories. Normally, classes
   * under `build/classes/java/main` (for Gradle 4+) are searched, which is the default class
   * directory for Gradle builds
   *
   * @default build/classes/main/
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
   * Gradle version >= 5.x
   *
   * Set this to 'true' if gradle version is >= 5.x.'True' by default.
   *
   * @default true
   *
   * Only meaningful when: `codeCoverageTool = JaCoCo`
   *
   * In group: codeCoverage
   */
  "gradle5xOrHigher"?: boolean;
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
  "jdkVersion"?: "default" | "1.17" | "1.11" | "1.10" | "1.9" | "1.8" | "1.7" | "1.6";
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
  /**
   * Set GRADLE_OPTS
   *
   * Sets the GRADLE_OPTS environment variable, which is used to send command-line arguments to
   * start the JVM. The xmx flag specifies the maximum memory available to the JVM.
   *
   * @default -Xmx1024m
   *
   * In group: advanced
   */
  "gradleOpts"?: string;
  /**
   * Run SonarQube or SonarCloud Analysis
   *
   * This option has changed from version 1 of the **Gradle** task to use the
   * [SonarQube](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarqube) and
   * [SonarCloud](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarcloud)
   * marketplace extensions. Enable this option to run [SonarQube or SonarCloud
   * analysis](http://redirect.sonarsource.com/doc/install-configure-scanner-tfs-ts.html) after
   * executing tasks in the **Tasks** field. You must also add a **Prepare Analysis
   * Configuration** task from one of the extensions to the build pipeline before this Gradle
   * task.
   *
   * @default false
   *
   * In group: CodeAnalysis
   */
  "sqAnalysisEnabled": boolean;
  /**
   * SonarQube scanner for Gradle version
   *
   * The SonarQube Gradle plugin version to use. You can declare it in your Gradle configuration
   * file, or specify a version here.
   *
   * - `specify` — Specify version number
   * - `build` — Use plugin applied in your build.gradle
   *
   * @default specify
   *
   * Only meaningful when: `sqAnalysisEnabled = true`
   *
   * In group: CodeAnalysis
   */
  "sqGradlePluginVersionChoice"?: "specify" | "build";
  /**
   * SonarQube scanner for Gradle plugin version
   *
   * Refer to https://plugins.gradle.org/plugin/org.sonarqube for all available versions.
   *
   * @default 2.6.1
   *
   * Only meaningful when: `sqAnalysisEnabled = true && sqGradlePluginVersionChoice = specify`
   *
   * In group: CodeAnalysis
   */
  "sqGradlePluginVersion"?: string;
  /**
   * Run Checkstyle
   *
   * Run the Checkstyle tool with the default Sun checks. Results are uploaded as build
   * artifacts.
   *
   * @default false
   *
   * In group: CodeAnalysis
   */
  "checkstyleAnalysisEnabled"?: boolean;
  /**
   * Run FindBugs
   *
   * Use the FindBugs static analysis tool to look for bugs in the code. Results are uploaded as
   * build artifacts. In Gradle 6.0 this plugin was removed. Use spotbugs plugin instead. [More
   * info](https://docs.gradle.org/current/userguide/upgrading_version_5.html#the_findbugs_plugin_has_been_removed)
   *
   * @default false
   *
   * In group: CodeAnalysis
   */
  "findbugsAnalysisEnabled"?: boolean;
  /**
   * Run PMD
   *
   * Use the PMD Java static analysis tool to look for bugs in the code. Results are uploaded as
   * build artifacts.
   *
   * @default false
   *
   * In group: CodeAnalysis
   */
  "pmdAnalysisEnabled"?: boolean;
  /**
   * Run SpotBugs
   *
   * Enable this option to run spotBugs. This plugin works with Gradle v5.6 or later. [More
   * info](https://spotbugs.readthedocs.io/en/stable/gradle.html#use-spotbugs-gradle-plugin)
   *
   * @default false
   *
   * In group: CodeAnalysis
   */
  "spotBugsAnalysisEnabled": boolean;
  /**
   * Spotbugs plugin version
   *
   * The Spotbugs Gradle plugin version to use. You can declare it in your Gradle configuration
   * file, or specify a version here.
   *
   * - `specify` — Specify version number
   * - `build` — Use plugin applied in your build.gradle
   *
   * @default specify
   *
   * Only meaningful when: `spotBugsAnalysisEnabled = true`
   *
   * In group: CodeAnalysis
   */
  "spotBugsGradlePluginVersionChoice"?: "specify" | "build";
  /**
   * Version number
   *
   * Refer to https://plugins.gradle.org/plugin/com.github.spotbugs for all available versions.
   *
   * @default 4.7.0
   *
   * Only meaningful when: `spotBugsAnalysisEnabled = true && spotBugsGradlePluginVersionChoice =
   * specify`
   *
   * In group: CodeAnalysis
   */
  "spotbugsGradlePluginVersion"?: string;
}

/**
 * Gradle
 *
 * Build using a Gradle wrapper script
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613720) or [see the
 * Gradle documentation](https://docs.gradle.org/current/userguide/userguide.html)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/gradle
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/GradleV3
 */
export function gradleV3(
  inputs: GradleV3Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Gradle@3", inputs as unknown as Record<string, unknown>, opts);
}
