// Auto-generated from codecov/codecov-action@v5/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface CodecovCodecovActionV5Inputs {
  /**
   * The base SHA to select. This is only used in the "pr-base-picking" run command
   */
  "base_sha"?: string | boolean | number;
  /**
   * The file location of a pre-downloaded version of the CLI. If specified, integrity checking
   * will be bypassed.
   */
  "binary"?: string | boolean | number;
  /**
   * The location of the codecov.yml file. This is crrently ONLY used for automated test
   * selection (https://docs.codecov.com/docs/getting-started-with-ats). Note that for all other
   * cases, the Codecov yaml will need to be located as described here:
   * https://docs.codecov.com/docs/codecov-yaml#can-i-name-the-file-codecovyml
   */
  "codecov_yml_path"?: string | boolean | number;
  /**
   * SHA (with 40 chars) of what should be the parent of this commit.
   */
  "commit_parent"?: string | boolean | number;
  /**
   * Folder to search for coverage files. Default to the current working directory
   */
  "directory"?: string | boolean | number;
  /**
   * Disable file fixes to ignore common lines from coverage (e.g. blank lines or empty
   * brackets). Read more here https://docs.codecov.com/docs/fixing-reports
   *
   * @default false
   */
  "disable_file_fixes"?: string | boolean | number;
  /**
   * Disable search for coverage files. This is helpful when specifying what files you want to
   * upload with the files option.
   *
   * @default false
   */
  "disable_search"?: string | boolean | number;
  /**
   * Disable setting safe directory. Set to true to disable.
   *
   * @default false
   */
  "disable_safe_directory"?: string | boolean | number;
  /**
   * Disable sending telemetry data to Codecov. Set to true to disable.
   *
   * @default false
   */
  "disable_telem"?: string | boolean | number;
  /**
   * Don't upload files to Codecov
   *
   * @default false
   */
  "dry_run"?: string | boolean | number;
  /**
   * Environment variables to tag the upload with (e.g. PYTHON | OS,PYTHON)
   */
  "env_vars"?: string | boolean | number;
  /**
   * Comma-separated list of folders to exclude from search.
   */
  "exclude"?: string | boolean | number;
  /**
   * On error, exit with non-zero code
   *
   * @default false
   */
  "fail_ci_if_error"?: string | boolean | number;
  /**
   * Comma-separated list of explicit files to upload. These will be added to the coverage files
   * found for upload. If you wish to only upload the specified files, please consider using
   * disable_search to disable uploading other files.
   */
  "files"?: string | boolean | number;
  /**
   * Comma-separated list of flags to upload to group coverage metrics.
   */
  "flags"?: string | boolean | number;
  /**
   * Only used for empty-upload run command
   */
  "force"?: string | boolean | number;
  /**
   * Override the git_service (e.g. github_enterprise)
   *
   * @default github
   */
  "git_service"?: string | boolean | number;
  /**
   * Extra arguments to pass to gcov
   */
  "gcov_args"?: string | boolean | number;
  /**
   * gcov executable to run. Defaults to 'gcov'
   *
   * @default gcov
   */
  "gcov_executable"?: string | boolean | number;
  /**
   * Paths to ignore during gcov gathering
   */
  "gcov_ignore"?: string | boolean | number;
  /**
   * Paths to include during gcov gathering
   */
  "gcov_include"?: string | boolean | number;
  /**
   * If no coverage reports are found, do not raise an exception.
   *
   * @default false
   */
  "handle_no_reports_found"?: string | boolean | number;
  "job_code"?: string | boolean | number;
  /**
   * Custom defined name of the upload. Visible in the Codecov UI
   */
  "name"?: string | boolean | number;
  /**
   * Specify a filter on the files listed in the network section of the Codecov report. This will
   * only add files whose path begin with the specified filter. Useful for upload-specific path
   * fixing.
   */
  "network_filter"?: string | boolean | number;
  /**
   * Specify a prefix on files listed in the network section of the Codecov report. Useful to
   * help resolve path fixing.
   */
  "network_prefix"?: string | boolean | number;
  /**
   * Override the assumed OS. Options available at cli.codecov.io
   */
  "os"?: string | boolean | number;
  /**
   * Specify the branch to be displayed with this commit on Codecov
   */
  "override_branch"?: string | boolean | number;
  /**
   * Specify the build number manually
   */
  "override_build"?: string | boolean | number;
  /**
   * The URL of the build where this is running
   */
  "override_build_url"?: string | boolean | number;
  /**
   * Commit SHA (with 40 chars)
   */
  "override_commit"?: string | boolean | number;
  /**
   * Specify the pull request number manually. Used to override pre-existing CI environment
   * variables.
   */
  "override_pr"?: string | boolean | number;
  /**
   * Comma-separated list of plugins to run. Specify `noop` to turn off all plugins
   */
  "plugins"?: string | boolean | number;
  /**
   * Whether to enumerate files inside of submodules for path-fixing purposes. Off by default.
   *
   * @default false
   */
  "recurse_submodules"?: string | boolean | number;
  /**
   * The code of the report if using local upload. If unsure, leave default. Read more here
   * https://docs.codecov.com/docs/the-codecov-cli#how-to-use-local-upload
   */
  "report_code"?: string | boolean | number;
  /**
   * The type of file to upload, coverage by default. Possible values are "test_results",
   * "coverage".
   */
  "report_type"?: string | boolean | number;
  /**
   * Root folder from which to consider paths on the network section. Defaults to current working
   * directory.
   */
  "root_dir"?: string | boolean | number;
  /**
   * Choose which CLI command to run. Options are "upload-coverage", "empty-upload",
   * "pr-base-picking", "send-notifications". "upload-coverage" is run by default.
   *
   * @default upload-coverage
   */
  "run_command"?: string | boolean | number;
  /**
   * Skip integrity checking of the CLI. This is NOT recommended.
   *
   * @default false
   */
  "skip_validation"?: string | boolean | number;
  /**
   * [Required when using the org token] Set to the owner/repo slug used instead of the private
   * repo token. Only applicable to some Enterprise users.
   */
  "slug"?: string | boolean | number;
  /**
   * Specify the swift project name. Useful for optimization.
   */
  "swift_project"?: string | boolean | number;
  /**
   * Repository Codecov token. Used to authorize report uploads
   */
  "token"?: string | boolean | number;
  /**
   * Set to the Codecov instance URl. Used by Dedicated Enterprise Cloud customers.
   */
  "url"?: string | boolean | number;
  /**
   * Use the legacy upload endpoint.
   *
   * @default false
   */
  "use_legacy_upload_endpoint"?: string | boolean | number;
  /**
   * Use OIDC instead of token. This will ignore any token supplied
   *
   * @default false
   */
  "use_oidc"?: string | boolean | number;
  /**
   * Use the pypi version of the CLI instead of from cli.codecov.io
   *
   * @default false
   */
  "use_pypi"?: string | boolean | number;
  /**
   * Enable verbose logging
   *
   * @default false
   */
  "verbose"?: string | boolean | number;
  /**
   * Which version of the Codecov CLI to use (defaults to 'latest')
   *
   * @default latest
   */
  "version"?: string | boolean | number;
  /**
   * Directory in which to execute codecov.sh
   */
  "working-directory"?: string | boolean | number;
}

/**
 * Codecov
 *
 * GitHub Action that uploads coverage reports for your repository to codecov.io
 *
 * @see https://github.com/codecov/codecov-action
 */
export function codecovCodecovActionV5(
  inputs: CodecovCodecovActionV5Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("codecov/codecov-action@v5", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
