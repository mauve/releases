/* eslint-disable */
// Auto-generated from hashicorp/setup-terraform@v3/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface HashicorpSetupTerraformV3Inputs {
  /**
   * The hostname of a HCP Terraform/Terraform Enterprise instance to place within the
   * credentials block of the Terraform CLI configuration file. Defaults to `app.terraform.io`.
   *
   * @default app.terraform.io
   */
  "cli_config_credentials_hostname"?: string | boolean | number;
  /**
   * The API token for a HCP Terraform/Terraform Enterprise instance to place within the
   * credentials block of the Terraform CLI configuration file.
   */
  "cli_config_credentials_token"?: string | boolean | number;
  /**
   * The version of Terraform CLI to install. Instead of full version string you can also specify
   * constraint string starting with "<" (for example `<1.13.0`) to install the latest version
   * satisfying the constraint. A value of `latest` will install the latest version of Terraform
   * CLI. Defaults to `latest`.
   *
   * @default latest
   */
  "terraform_version"?: string | boolean | number;
  /**
   * Whether or not to install a wrapper to wrap subsequent calls of the `terraform` binary and
   * expose its STDOUT, STDERR, and exit code as outputs named `stdout`, `stderr`, and `exitcode`
   * respectively. Defaults to `true`.
   *
   * @default true
   */
  "terraform_wrapper"?: string | boolean | number;
}

/**
 * HashiCorp - Setup Terraform
 *
 * Sets up Terraform CLI in your GitHub Actions workflow.
 *
 * @see https://github.com/hashicorp/setup-terraform
 */
export function hashicorpSetupTerraformV3(
  inputs: HashicorpSetupTerraformV3Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("hashicorp/setup-terraform@v3", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
