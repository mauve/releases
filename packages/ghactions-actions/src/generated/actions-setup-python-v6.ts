/* eslint-disable */
// Auto-generated from actions/setup-python@v6/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface ActionsSetupPythonV6Inputs {
  /**
   * Version range or exact version of Python or PyPy to use, using SemVer's version range
   * syntax. Reads from .python-version if unset.
   */
  "python-version"?: string | boolean | number;
  /**
   * File containing the Python version to use. Example: .python-version
   */
  "python-version-file"?: string | boolean | number;
  /**
   * Used to specify a package manager for caching in the default directory. Supported values:
   * pip, pipenv, poetry.
   */
  "cache"?: string | boolean | number;
  /**
   * The target architecture (x86, x64, arm64) of the Python or PyPy interpreter.
   */
  "architecture"?: string | boolean | number;
  /**
   * Set this option if you want the action to check for the latest available version that
   * satisfies the version spec.
   *
   * @default false
   */
  "check-latest"?: string | boolean | number;
  /**
   * The token used to authenticate when fetching Python distributions from
   * https://github.com/actions/python-versions. When running this action on github.com, the
   * default value is sufficient. When running on GHES, you can pass a personal access token for
   * github.com if you are experiencing rate limiting.
   *
   * @default ${{ github.server_url == 'https://github.com' && github.token || '' }}
   */
  "token"?: string | boolean | number;
  /**
   * Used to specify the path to dependency files. Supports wildcards or a list of file names for
   * caching multiple dependencies.
   */
  "cache-dependency-path"?: string | boolean | number;
  /**
   * Set this option if you want the action to update environment variables.
   *
   * @default true
   */
  "update-environment"?: string | boolean | number;
  /**
   * When 'true', a version range passed to 'python-version' input will match prerelease versions
   * if no GA versions are found. Only 'x.y' version range is supported for CPython.
   *
   * @default false
   */
  "allow-prereleases"?: string | boolean | number;
  /**
   * When 'true', use the freethreaded version of Python.
   *
   * @default false
   */
  "freethreaded"?: string | boolean | number;
  /**
   * Used to specify the version of pip to install with the Python. Supported format:
   * major[.minor][.patch].
   */
  "pip-version"?: string | boolean | number;
  /**
   * Used to specify the packages to install with pip after setting up Python. Can be a
   * requirements file or package names.
   */
  "pip-install"?: string | boolean | number;
}

/**
 * Setup Python
 *
 * Set up a specific version of Python and add the command-line tools to the PATH.
 *
 * @see https://github.com/actions/setup-python
 */
export function actionsSetupPythonV6(
  inputs: ActionsSetupPythonV6Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("actions/setup-python@v6", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
