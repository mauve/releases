/* eslint-disable */
// Auto-generated from google-github-actions/auth@v2/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface GoogleGithubActionsAuthV2Inputs {
  /**
   * ID of the default project to use for future API calls and invocations. If
   * unspecified, this action will attempt to extract the value from other
   * inputs such as "service_account" or "credentials_json".
   */
  "project_id"?: string | boolean | number;
  /**
   * The full identifier of the Workload Identity Provider, including the
   * project number, pool name, and provider name. If provided, this must be
   * the full identifier which includes all parts, for example:
   * "projects/123456789/locations/global/workloadIdentityPools/my-pool/providers/my-provider".
   * This is mutually exclusive with "credentials_json".
   */
  "workload_identity_provider"?: string | boolean | number;
  /**
   * Email address or unique identifier of the Google Cloud service account for
   * which to generate credentials. This is required if
   * "workload_identity_provider" is specified.
   */
  "service_account"?: string | boolean | number;
  /**
   * The value for the audience (aud) parameter in GitHub's generated OIDC
   * token. This value defaults to the value of "workload_identity_provider",
   * which is also the default value Google Cloud expects for the audience
   * parameter on the token.
   */
  "audience"?: string | boolean | number;
  /**
   * The Google Cloud JSON service account key to use for authentication. This
   * is mutually exclusive with "workload_identity_provider".
   */
  "credentials_json"?: string | boolean | number;
  /**
   * If true, the action will securely generate a credentials file which can be
   * used for authentication via gcloud and Google Cloud SDKs.
   *
   * @default true
   */
  "create_credentials_file"?: string | boolean | number;
  /**
   * If true, the action will export common environment variables which are
   * known to be consumed by popular downstream libraries and tools, including:
   *
   * - CLOUDSDK_PROJECT
   * - CLOUDSDK_CORE_PROJECT
   * - GCP_PROJECT
   * - GCLOUD_PROJECT
   * - GOOGLE_CLOUD_PROJECT
   *
   * If "create_credentials_file" is true, additional environment variables are
   * exported:
   *
   * - CLOUDSDK_AUTH_CREDENTIAL_FILE_OVERRIDE
   * - GOOGLE_APPLICATION_CREDENTIALS
   * - GOOGLE_GHA_CREDS_PATH
   *
   * If false, the action will not export any environment variables, meaning
   * future steps are unlikely to be automatically authenticated to Google
   * Cloud.
   *
   * @default true
   */
  "export_environment_variables"?: string | boolean | number;
  /**
   * Output format for the generated authentication token. For OAuth 2.0 access
   * tokens, specify "access_token". For OIDC tokens, specify "id_token". To
   * skip token generation, leave this value empty.
   */
  "token_format"?: string | boolean | number;
  /**
   * List of additional service account emails or unique identities to use for
   * impersonation in the chain.
   */
  "delegates"?: string | boolean | number;
  /**
   * The Google Cloud universe to use for constructing API endpoints. The
   * default universe is "googleapis.com", which corresponds to
   * https://cloud.google.com. Trusted Partner Cloud and Google Distributed
   * Hosted Cloud should set this to their universe address.
   *
   * @default googleapis.com
   */
  "universe"?: string | boolean | number;
  /**
   * An optional Reason Request System Parameter for each API call made by the
   * GitHub Action. This will inject the "X-Goog-Request-Reason" HTTP header,
   * which will provide user-supplied information in Google Cloud audit logs.
   */
  "request_reason"?: string | boolean | number;
  /**
   * If true, the action will remove any created credentials from the
   * filesystem upon completion. This only applies if "create_credentials_file"
   * is true.
   *
   * @default true
   */
  "cleanup_credentials"?: string | boolean | number;
  /**
   * Desired lifetime duration of the access token, in seconds. This must be
   * specified as the number of seconds with a trailing "s" (e.g. 30s). This is
   * only valid when "token_format" is "access_token".
   *
   * @default 3600s
   */
  "access_token_lifetime"?: string | boolean | number;
  /**
   * List of OAuth 2.0 access scopes to be included in the generated token.
   * This is only valid when "token_format" is "access_token".
   *
   * @default https://www.googleapis.com/auth/cloud-platform
   */
  "access_token_scopes"?: string | boolean | number;
  /**
   * Email address of a user to impersonate for Domain-Wide Delegation Access
   * tokens created for Domain-Wide Delegation cannot have a lifetime beyond 1
   * hour. This is only valid when "token_format" is "access_token".
   */
  "access_token_subject"?: string | boolean | number;
  /**
   * Number of times to retry a failed authentication attempt. This is useful
   * for automated pipelines that may execute before IAM permissions are fully
   * propagated.
   */
  "retries"?: string | boolean | number;
  /**
   * Delay time before trying another authentication attempt. This is
   * implemented using a fibonacci backoff method (e.g. 1-1-2-3-5). The default
   * value is 250 milliseconds.
   */
  "backoff"?: string | boolean | number;
  /**
   * Limits the retry backoff to the specified value.
   */
  "backoff_limit"?: string | boolean | number;
  /**
   * The audience (aud) for the generated Google Cloud ID Token. This is only
   * valid when "token_format" is "id_token".
   */
  "id_token_audience"?: string | boolean | number;
  /**
   * Optional parameter of whether to include the service account email in the
   * generated token. If true, the token will contain "email" and
   * "email_verified" claims. This is only valid when "token_format" is
   * "id_token".
   *
   * @default false
   */
  "id_token_include_email"?: string | boolean | number;
}

/**
 * Authenticate to Google Cloud
 *
 * Authenticate to Google Cloud from GitHub Actions via Workload Identity
 * Federation or service account keys.
 *
 * @see https://github.com/google-github-actions/auth
 */
export function googleGithubActionsAuthV2(
  inputs: GoogleGithubActionsAuthV2Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("google-github-actions/auth@v2", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
