/* eslint-disable */
// Auto-generated from NpmV1/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { externalnpmregistryConnection } from '../connections.js';

export interface NpmV1Inputs {
  /**
   * Command
   *
   * The command and arguments which will be passed to npm for execution.
   *
   * If your arguments contain double quotes ("), escape them with a slash (\\), and surround the
   * escaped string with double quotes (").
   *
   * - `ci` — ci
   * - `install` — install
   * - `publish` — publish
   * - `custom` — custom
   *
   * @default install
   */
  "command": "ci" | "install" | "publish" | "custom";
  /**
   * Working folder that contains package.json
   *
   * Path to the folder containing the target package.json and .npmrc files. Select the folder,
   * not the file e.g. "/packages/mypackage".
   */
  "workingDir"?: string;
  /**
   * Verbose logging
   *
   * Select to print more information to the console on run
   *
   * In group: advanced
   */
  "verbose"?: boolean;
  /**
   * Command and arguments
   *
   * Custom command to run, e.g. "dist-tag ls mypackage".
   *
   * Only meaningful when: `command = custom`
   */
  "customCommand"?: string;
  /**
   * Registries to use
   *
   * You can either commit a .npmrc file to your source code repository and set its path here or
   * select a registry from Azure Artifacts here.
   *
   * - `useNpmrc` — Registries in my .npmrc
   * - `useFeed` — Registry I select here
   *
   * @default useNpmrc
   *
   * In group: customRegistries
   */
  "customRegistry"?: "useNpmrc" | "useFeed";
  /**
   * Use packages from this Azure Artifacts/TFS registry
   *
   * Include the selected feed in the generated .npmrc.
   *
   * Only meaningful when: `customRegistry = useFeed`
   *
   * In group: customRegistries
   */
  "customFeed"?: string;
  /**
   * Credentials for registries outside this organization/collection
   *
   * Credentials to use for external registries located in the project's .npmrc. For registries
   * in this organization/collection, leave this blank; the build’s credentials are used
   * automatically.
   *
   * Only meaningful when: `customRegistry = useNpmrc`
   *
   * In group: customRegistries
   */
  "customEndpoint"?: externalnpmregistryConnection;
  /**
   * Registry location
   *
   * Registry the command will target.
   *
   * - `useExternalRegistry` — External npm registry (including other accounts/collections)
   * - `useFeed` — Registry I select here
   *
   * @default useExternalRegistry
   *
   * In group: publishRegistries
   */
  "publishRegistry"?: "useExternalRegistry" | "useFeed";
  /**
   * Target registry
   *
   * Select a registry hosted in this account. You must have Azure Artifacts installed and
   * licensed to select a registry here.
   *
   * Only meaningful when: `publishRegistry = useFeed`
   *
   * In group: publishRegistries
   */
  "publishFeed"?: string;
  /**
   * Publish pipeline metadata
   *
   * Associate this build/release pipeline’s metadata (run #, source code information) with the
   * package
   *
   * @default true
   *
   * Only meaningful when: `command = publish && publishRegistry = useFeed`
   *
   * In group: advanced
   */
  "publishPackageMetadata"?: boolean;
  /**
   * External Registry
   *
   * Credentials to use for publishing to an external registry.
   *
   * Only meaningful when: `publishRegistry = useExternalRegistry`
   *
   * In group: publishRegistries
   */
  "publishEndpoint"?: externalnpmregistryConnection;
}

/**
 * npm
 *
 * Install and publish npm packages, or run an npm command. Supports npmjs.com and
 * authenticated registries like Azure Artifacts.
 *
 * [Learn more about this task](https://go.microsoft.com/fwlink/?LinkID=613746) or [see the npm
 * documentation](https://docs.npmjs.com/)
 *
 * @see https://docs.microsoft.com/azure/devops/pipelines/tasks/package/npm
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/NpmV1
 */
export function npmV1(
  inputs: NpmV1Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Npm@1", inputs as unknown as Record<string, unknown>, opts);
}
