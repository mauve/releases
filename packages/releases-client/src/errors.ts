/** Thrown when a requested release definition does not exist. */
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

/**
 * Thrown when PUT fails because the local definition's `revision` no longer
 * matches the server's. The fix is to re-fetch and re-diff before pushing.
 */
export class RevisionMismatchError extends Error {
  readonly serverRevision: number | undefined;
  readonly localRevision: number | undefined;
  constructor(serverRevision: number | undefined, localRevision: number | undefined) {
    super(
      `Revision mismatch: server is at ${serverRevision ?? '?'}, local sent ${localRevision ?? '?'}. ` +
        `Re-run \`azpipe release diff\` to refresh, then push again.`,
    );
    this.name = 'RevisionMismatchError';
    this.serverRevision = serverRevision;
    this.localRevision = localRevision;
  }
}

/** Thrown when Azure DevOps replies 429; carries `Retry-After` when present. */
export class RateLimitedError extends Error {
  readonly retryAfterSeconds: number | undefined;
  constructor(retryAfterSeconds: number | undefined) {
    super(
      `Azure DevOps rate-limited the request${
        retryAfterSeconds !== undefined ? ` (retry after ${retryAfterSeconds}s)` : ''
      }.`,
    );
    this.name = 'RateLimitedError';
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

/** Thrown for any other non-2xx response. */
export class AzureDevOpsApiError extends Error {
  readonly status: number;
  readonly body: string;
  constructor(status: number, body: string) {
    super(`Azure DevOps API error ${status}: ${body.slice(0, 400)}`);
    this.name = 'AzureDevOpsApiError';
    this.status = status;
    this.body = body;
  }
}
