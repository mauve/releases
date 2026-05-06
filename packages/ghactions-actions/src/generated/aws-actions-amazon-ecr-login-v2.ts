// Auto-generated from aws-actions/amazon-ecr-login@v2/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface AwsActionsAmazonEcrLoginV2Inputs {
  /**
   * Proxy to use for the AWS SDK agent.
   */
  "http-proxy"?: string | boolean | number;
  /**
   * Mask the docker password to prevent it being printed to action logs if debug logging is
   * enabled. NOTE: This will prevent the Docker password output from being shared between
   * separate jobs. Options: ['true', 'false']
   *
   * @default true
   */
  "mask-password"?: string | boolean | number;
  /**
   * A comma-delimited list of AWS account IDs that are associated with the ECR Private
   * registries. If you do not specify a registry, the default ECR Private registry is assumed.
   * If 'public' is given as input to 'registry-type', this input is ignored.
   */
  "registries"?: string | boolean | number;
  /**
   * Which ECR registry type to log into. Options: [private, public]
   *
   * @default private
   */
  "registry-type"?: string | boolean | number;
  /**
   * Whether to skip explicit logout of the registries during post-job cleanup. Exists for
   * backward compatibility on self-hosted runners. Not recommended. Options: ['true', 'false']
   *
   * @default false
   */
  "skip-logout"?: string | boolean | number;
}

/**
 * Amazon ECR "Login" Action for GitHub Actions
 *
 * Logs in the local Docker client to one or more Amazon ECR Private registries or an Amazon
 * ECR Public registry
 *
 * @see https://github.com/aws-actions/amazon-ecr-login
 */
export function awsActionsAmazonEcrLoginV2(
  inputs: AwsActionsAmazonEcrLoginV2Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("aws-actions/amazon-ecr-login@v2", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
