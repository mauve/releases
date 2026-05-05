/* eslint-disable */
// Auto-generated from MavenV4/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface MavenV4Inputs {
  /**
   * Azure Resource Manager connection
   *
   * Select an Azure Resource Manager service connection
   */
  "ConnectedServiceName"?: AzureRMConnection;
  /**
   * Maven POM file
   *
   * Relative path from the repository root to the Maven POM file.
   *
   * @default pom.xml
   */
  "mavenPOMFile": string;
  /**
   * Goal(s)
   *
   * @default package
   */
  "goals"?: string;
  /**
   * Options
   */
  "options"?: string;
  /**
   * Publish to Azure Pipelines
   *
   * Select this option to publish JUnit test results produced by the Maven build to Azure
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
   * Specify the path and pattern of test results files to publish. Wildcards can be used ([more
   * information](https://go.microsoft.com/fwlink/?linkid=856077)). For example, `**​/TEST-*.xml`
   * for all XML files whose name starts with `TEST-`. If no root path is specified, files are
   * matched beneath the default working directory, the value of which is available in the
   * variable: $(System.DefaultWorkingDirectory). For example, a value of '**​/TEST-*.xml' will
   * actually result in matching files from '$(System.DefaultWorkingDirectory)/**​/TEST-*.xml'.
   *
   * @default **​/surefire-reports/TEST-*.xml
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
   * Allow broken symbolic links
   *
   * Set false to fail build when task finds broken symbolic link during publishing tests result
   *
   * @default true
   *
   * Only meaningful when: `publishJUnitResults = true`
   *
   * In group: junitTestResults
   */
  "allowBrokenSymbolicLinks"?: boolean;
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
   * Class files directories
   *
   * This field is required for a multi-module project. Specify a comma-separated list of
   * relative paths from the Maven POM file to directories containing class files and archive
   * files (JAR, WAR, etc.). Code coverage is reported for class files in these directories. For
   * example: target/classes,target/testClasses.
   *
   * Only meaningful when: `codeCoverageTool = JaCoCo`
   *
   * In group: codeCoverage
   */
  "classFilesDirectories"?: string;
  /**
   * Source files directories
   *
   * This field is required for a multi-module project. Specify a comma-separated list of
   * relative paths from the Maven POM file to source code directories. Code coverage reports
   * will use these to highlight source code. For example: src/java,src/Test.
   *
   * Only meaningful when: `codeCoverageTool = JaCoCo`
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
   * Restore original pom.xml after task execution
   *
   * Code coverage modifies pom.xml to produce results. Use this option if you need to keep
   * original pom.xml.
   *
   * @default false
   *
   * Only meaningful when: `codeCoverageTool != None`
   *
   * In group: codeCoverage
   */
  "restoreOriginalPomXml"?: boolean;
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
  "jdkVersion"?: "default" | "1.21" | "1.17" | "1.11" | "1.10" | "1.9" | "1.8" | "1.7" | "1.6";
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
   * Maven version
   *
   * Uses either the default Maven version or the version in the specified custom path.
   *
   * - `Default` — Default
   * - `Path` — Custom Path
   *
   * @default Default
   *
   * In group: advanced
   */
  "mavenVersionSelection": "Default" | "Path";
  /**
   * Maven path
   *
   * Supply the custom path to the Maven installation (e.g., /usr/share/maven).
   *
   * Only meaningful when: `mavenVersionSelection = Path`
   *
   * In group: advanced
   */
  "mavenPath"?: string;
  /**
   * Set M2_HOME variable
   *
   * Sets the M2_HOME variable to a custom Maven installation path.
   *
   * @default false
   *
   * Only meaningful when: `mavenVersionSelection = Path`
   *
   * In group: advanced
   */
  "mavenSetM2Home"?: boolean;
  /**
   * Set MAVEN_OPTS to
   *
   * Sets the MAVEN_OPTS environment variable, which is used to send command-line arguments to
   * start the JVM. The -Xmx flag specifies the maximum memory available to the JVM.
   *
   * @default -Xmx1024m
   *
   * In group: advanced
   */
  "mavenOpts"?: string;
  /**
   * Authenticate with Artifacts feeds
   *
   * Automatically authenticates with Azure Artifacts feeds. If Artifacts feeds are not in use,
   * deselect this option for faster builds.
   *
   * @default false
   *
   * In group: advanced
   */
  "mavenFeedAuthenticate": boolean;
  /**
   * Skip generating effective POM while authenticating with Artifacts feeds
   *
   * Authenticates with Artifacts feeds using the POM only.
   *
   * @default false
   *
   * In group: advanced
   */
  "skipEffectivePom": boolean;
  /**
   * Run SonarQube or SonarCloud analysis
   *
   * This option has changed from version 1 of the **Maven** task to use the
   * [SonarQube](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarqube) and
   * [SonarCloud](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarcloud)
   * marketplace extensions. Enable this option to run [SonarQube or SonarCloud
   * analysis](http://redirect.sonarsource.com/doc/install-configure-scanner-tfs-ts.html) after
   * executing goals in the **Goals** field. The **install** or **package** goal should run
   * first. You must also add a **Prepare Analysis Configuration** task from one of the
   * extensions to the build pipeline before this Maven task.
   *
   * @default false
   *
   * In group: CodeAnalysis
   */
  "sqAnalysisEnabled": boolean;
  /**
   * Use XML Jacoco reports for SonarQube analysis
   *
   * Use XML Jacoco reports for SonarQube analysis. [More
   * info](https://docs.sonarqube.org/latest/analysis/coverage/)
   *
   * @default false
   *
   * Only meaningful when: `sqAnalysisEnabled = true && codeCoverageTool = JaCoCo`
   *
   * In group: CodeAnalysis
   */
  "isJacocoCoverageReportXML"?: boolean;
  /**
   * SonarQube scanner for Maven version
   *
   * The SonarQube Maven plugin version to use. You can use latest version, or rely on the
   * version in your pom.xml.
   *
   * - `latest` — Use latest release
   * - `pom` — Use version declared in your pom.xml
   *
   * @default latest
   *
   * Only meaningful when: `sqAnalysisEnabled = true`
   *
   * In group: CodeAnalysis
   */
  "sqMavenPluginVersionChoice"?: "latest" | "pom";
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
   * Run PMD
   *
   * Use the PMD static analysis tool to look for bugs in the code. Results are uploaded as build
   * artifacts.
   *
   * @default false
   *
   * In group: CodeAnalysis
   */
  "pmdAnalysisEnabled"?: boolean;
  /**
   * Run FindBugs
   *
   * Use the FindBugs static analysis tool to look for bugs in the code. Results are uploaded as
   * build artifacts.
   *
   * @default false
   *
   * In group: CodeAnalysis
   */
  "findbugsAnalysisEnabled"?: boolean;
  /**
   * Run SpotBugs analysis
   *
   * Enable this option to run spotBugs code analysis plugin. [More
   * info](https://spotbugs.github.io/spotbugs-maven-plugin)
   *
   * @default false
   *
   * In group: CodeAnalysis
   */
  "spotBugsAnalysisEnabled"?: boolean;
  /**
   * Version number
   *
   * Refer to https://mvnrepository.com/artifact/com.github.spotbugs/spotbugs-maven-plugin for
   * all available versions.
   *
   * @default 4.5.3.0
   *
   * Only meaningful when: `spotBugsAnalysisEnabled = true`
   *
   * In group: CodeAnalysis
   */
  "spotBugsMavenPluginVersion"?: string;
  /**
   * The goal for the spotbugs plugin
   *
   * Select the goal of the plugin. Refer
   * https://spotbugs.readthedocs.io/en/stable/maven.html#goals-of-spotbugs-maven-plugin to for
   * more detailed description.
   *
   * - `spotbugs` — "spotbugs" - Creates a report on found bugs
   * - `check` — "check" - Pipeline fails if bugs were detected
   *
   * @default spotbugs
   *
   * Only meaningful when: `spotBugsAnalysisEnabled = true`
   *
   * In group: CodeAnalysis
   */
  "spotBugsGoal"?: "spotbugs" | "check";
  /**
   * Fail when bugs are found with spotbugs:check
   *
   * Fail when the bugs found when check goal specified. Refers to
   * https://spotbugs.github.io/spotbugs-maven-plugin/check-mojo.html#failonerror for more
   * detailed description.
   *
   * @default true
   *
   * Only meaningful when: `spotBugsAnalysisEnabled = true && spotBugsGoal = check`
   *
   * In group: CodeAnalysis
   */
  "spotBugsFailWhenBugsFound"?: boolean;
}

/**
 * Maven
 *
 * Build, test, and deploy with Apache Maven
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613723) or [see the
 * Maven documentation](http://maven.apache.org/guides/index.html)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/build/maven
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/MavenV4
 */
export function mavenV4(
  inputs: MavenV4Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Maven@4", inputs as unknown as Record<string, unknown>, opts);
}
