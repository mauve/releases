/* eslint-disable */
// Auto-generated from actions/setup-java@v5/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsSetupJavaV5Inputs {
  /**
   * The Java version to set up. Takes a whole or semver Java version. See examples of supported
   * syntax in README file
   */
  "java-version"?: string | boolean | number;
  /**
   * The path to the `.java-version` file. See examples of supported syntax in README file
   */
  "java-version-file"?: string | boolean | number;
  /**
   * Java distribution. See the list of supported distributions in README file
   */
  "distribution": string | boolean | number;
  /**
   * The package type (jdk, jre, jdk+fx, jre+fx)
   *
   * @default jdk
   */
  "java-package"?: string | boolean | number;
  /**
   * The architecture of the package (defaults to the action runner's architecture)
   */
  "architecture"?: string | boolean | number;
  /**
   * Path to where the compressed JDK is located
   */
  "jdkFile"?: string | boolean | number;
  /**
   * Set this option if you want the action to check for the latest available version that
   * satisfies the version spec
   *
   * @default false
   */
  "check-latest"?: string | boolean | number;
  /**
   * ID of the distributionManagement repository in the pom.xml file. Default is `github`
   *
   * @default github
   */
  "server-id"?: string | boolean | number;
  /**
   * Environment variable name for the username for authentication to the Apache Maven
   * repository. Default is $GITHUB_ACTOR
   *
   * @default GITHUB_ACTOR
   */
  "server-username"?: string | boolean | number;
  /**
   * Environment variable name for password or token for authentication to the Apache Maven
   * repository. Default is $GITHUB_TOKEN
   *
   * @default GITHUB_TOKEN
   */
  "server-password"?: string | boolean | number;
  /**
   * Path to where the settings.xml file will be written. Default is ~/.m2.
   */
  "settings-path"?: string | boolean | number;
  /**
   * Overwrite the settings.xml file if it exists. Default is "true".
   *
   * @default true
   */
  "overwrite-settings"?: string | boolean | number;
  /**
   * GPG private key to import. Default is empty string.
   */
  "gpg-private-key"?: string | boolean | number;
  /**
   * Environment variable name for the GPG private key passphrase. Default is $GPG_PASSPHRASE.
   */
  "gpg-passphrase"?: string | boolean | number;
  /**
   * Name of the build platform to cache dependencies. It can be "maven", "gradle" or "sbt".
   */
  "cache"?: string | boolean | number;
  /**
   * The path to a dependency file: pom.xml, build.gradle, build.sbt, etc. This option can be
   * used with the `cache` option. If this option is omitted, the action searches for the
   * dependency file in the entire repository. This option supports wildcards and a list of file
   * names for caching multiple dependencies.
   */
  "cache-dependency-path"?: string | boolean | number;
  /**
   * Workaround to pass job status to post job step. This variable is not intended for manual
   * setting
   *
   * @default ${{ job.status }}
   */
  "job-status"?: string | boolean | number;
  /**
   * The token used to authenticate when fetching version manifests hosted on github.com, such as
   * for the Microsoft Build of OpenJDK. When running this action on github.com, the default
   * value is sufficient. When running on GHES, you can pass a personal access token for
   * github.com if you are experiencing rate limiting.
   *
   * @default ${{ github.server_url == 'https://github.com' && github.token || '' }}
   */
  "token"?: string | boolean | number;
  /**
   * Name of Maven Toolchain ID if the default name of "${distribution}_${java-version}" is not
   * wanted. See examples of supported syntax in Advanced Usage file
   */
  "mvn-toolchain-id"?: string | boolean | number;
  /**
   * Name of Maven Toolchain Vendor if the default name of "${distribution}" is not wanted. See
   * examples of supported syntax in Advanced Usage file
   */
  "mvn-toolchain-vendor"?: string | boolean | number;
}

/**
 * Setup Java JDK
 *
 * Set up a specific version of the Java JDK and add the command-line tools to the PATH
 *
 * @see https://github.com/actions/setup-java
 */
export function actionsSetupJavaV5(
  inputs: ActionsSetupJavaV5Inputs,
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/setup-java@v5", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
