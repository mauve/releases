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
   */
  credential?: TokenCredential;
  /** Override the resource id (rarely needed). */
  resourceId?: string;
}

/**
 * Acquire a bearer token for the Azure DevOps REST API.
 *
 * Throws if no credential in the chain produces a token — typical fixes are
 * `az login` (locally) or assigning a managed/workload identity (in CI).
 */
export async function getToken(opts: AuthOptions = {}): Promise<string> {
  const credential = opts.credential ?? new DefaultAzureCredential();
  const scope = `${opts.resourceId ?? AZURE_DEVOPS_RESOURCE_ID}/.default`;
  const token = await credential.getToken(scope);
  if (!token) {
    throw new Error(
      'Failed to acquire an Azure DevOps token. ' +
        'Locally: run `az login` and re-try. ' +
        'In CI: ensure a workload identity / managed identity is available, ' +
        'or set the `AZURE_*` env vars consumed by `@azure/identity`.',
    );
  }
  return token.token;
}
