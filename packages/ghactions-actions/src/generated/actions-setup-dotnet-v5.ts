// Auto-generated from actions/setup-dotnet@v5/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsSetupDotnetV5Inputs {
  /**
   * Optional SDK version(s) to use. If not provided, will install global.json version when
   * available. Examples: 2.2.104, 3.1, 3.1.x, 3.x, 6.0.2xx
   */
  "dotnet-version"?: string | boolean | number;
  /**
   * Optional quality of the build. The possible values are: daily, signed, validated, preview,
   * ga.
   */
  "dotnet-quality"?: string | boolean | number;
  /**
   * Optional global.json location, if your global.json isn't located in the root of the repo.
   */
  "global-json-file"?: string | boolean | number;
  /**
   * Optional package source for which to set up authentication. Will consult any existing
   * NuGet.config in the root of the repo and provide a temporary NuGet.config using the
   * NUGET_AUTH_TOKEN environment variable as a ClearTextPassword
   */
  "source-url"?: string | boolean | number;
  /**
   * Optional OWNER for using packages from GitHub Package Registry organizations/users other
   * than the current repository's owner. Only used if a GPR URL is also provided in source-url
   */
  "owner"?: string | boolean | number;
  /**
   * Optional NuGet.config location, if your NuGet.config isn't located in the root of the repo.
   */
  "config-file"?: string | boolean | number;
  /**
   * Optional input to enable caching of the NuGet global-packages folder
   *
   * @default false
   */
  "cache"?: string | boolean | number;
  /**
   * Used to specify the path to a dependency file: packages.lock.json. Supports wildcards or a
   * list of file names for caching multiple dependencies.
   */
  "cache-dependency-path"?: string | boolean | number;
  /**
   * Optional SDK workloads to install for additional platform support. Examples: wasm-tools,
   * maui, aspire.
   */
  "workloads"?: string | boolean | number;
  /**
   * Optional architecture for the .NET install. Supported values: x64, x86, arm64, amd64, arm,
   * s390x, ppc64le, riscv64. If not set, the installer auto-detects the current system
   * architecture.
   */
  "architecture"?: string | boolean | number;
}

/**
 * Setup .NET Core SDK
 *
 * Used to build and publish .NET source. Set up a specific version of the .NET and
 * authentication to private NuGet repository
 *
 * @see https://github.com/actions/setup-dotnet
 */
export function actionsSetupDotnetV5(
  inputs: ActionsSetupDotnetV5Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/setup-dotnet@v5", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
