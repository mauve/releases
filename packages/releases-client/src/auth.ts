import { DefaultAzureCredential, type TokenCredential } from '@azure/identity';

/**
 * Azure DevOps' first-party Entra application id. Tokens issued for this
 * resource are accepted by `dev.azure.com` and `vsrm.dev.azure.com`.
 *
 * @see https://learn.microsoft.com/azure/devops/integrate/get-started/authentication/entra
 */
export const AZURE_DEVOPS_RESOURCE_ID = '499b84ac-1321-427f-aa17-267ca6975798';

export interface AuthOptions {
  /**
   * Pre-built credential. Default: a fresh {@link DefaultAzureCredential}
   * (managed identity → workload identity → `az` CLI → env vars).
   *
   * In Azure Pipelines you can instead expose `$(System.AccessToken)` as the
   * `SYSTEM_ACCESSTOKEN` env var on your step and omit this field entirely —
   * {@link getToken} detects the env var and uses it automatically.
   */
  credential?: TokenCredential;
  /** Override the resource id (rarely needed). */
  resourceId?: string;
}

/**
 * A {@link TokenCredential} that wraps an Azure Pipelines `SYSTEM_ACCESSTOKEN`.
 *
 * Azure DevOps REST APIs (including `vsrm.dev.azure.com`) accept the pipeline
 * job token as a Bearer token directly — no Entra round-trip needed.
 *
 * @example
 * ```ts
 * const client = new ReleaseClient({
 *   org, project,
 *   auth: { credential: new SystemAccessTokenCredential(process.env.SYSTEM_ACCESSTOKEN!) },
 * });
 * ```
 */
export class SystemAccessTokenCredential implements TokenCredential {
  constructor(private readonly token: string) {}

  getToken(
    _scopes: string | string[],
  ): Promise<{ token: string; expiresOnTimestamp: number }> {
    // SYSTEM_ACCESSTOKEN does not carry an expiry — use a generous window so
    // the @azure/identity cache does not immediately discard it.
    return Promise.resolve({
      token: this.token,
      expiresOnTimestamp: Date.now() + 3_600_000,
    });
  }
}

/**
 * Acquire a bearer token for the Azure DevOps REST API.
 *
 * Resolution order (first match wins):
 * 1. `opts.credential` if provided.
 * 2. `SYSTEM_ACCESSTOKEN` env var — set by Azure Pipelines when you map
 *    `env: SYSTEM_ACCESSTOKEN: $(System.AccessToken)` on the step.
 * 3. {@link DefaultAzureCredential} (managed identity → workload identity →
 *    `az` CLI → `AZURE_*` env vars).
 *
 * Throws if none of the above produces a token.
 */
export async function getToken(opts: AuthOptions = {}): Promise<string> {
  if (opts.credential) {
    const scope = `${opts.resourceId ?? AZURE_DEVOPS_RESOURCE_ID}/.default`;
    const token = await opts.credential.getToken(scope);
    if (!token) throw new Error('Provided credential returned no token.');
    return token.token;
  }

  // Auto-detect Azure Pipelines job token.
  const sat = process.env['SYSTEM_ACCESSTOKEN'];
  if (sat) return sat;

  const credential = new DefaultAzureCredential();
  const scope = `${opts.resourceId ?? AZURE_DEVOPS_RESOURCE_ID}/.default`;
  const token = await credential.getToken(scope);
  if (!token) {
    throw new Error(
      'Failed to acquire an Azure DevOps token. ' +
        'Locally: run `az login` and re-try. ' +
        'In CI (Azure Pipelines): add `env: SYSTEM_ACCESSTOKEN: $(System.AccessToken)` ' +
        'to your step and grant the build service account "Release Definition Contributor". ' +
        'Alternatively set the `AZURE_*` env vars consumed by `@azure/identity`.',
    );
  }
  return token.token;
}
