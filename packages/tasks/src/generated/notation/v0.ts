/* eslint-disable */
// Auto-generated from NotationV0/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface NotationV0Inputs {
  /**
   * Command to run
   *
   * example: install
   *
   * - `install` — Install
   * - `sign` — Sign
   * - `verify` — Verify
   *
   * @default install
   */
  "command": "install" | "sign" | "verify";
  /**
   * Custom Version
   *
   * If checked, you can provide a custom version for the task
   *
   * @default false
   *
   * Only meaningful when: `command = install`
   *
   * In group: commandConfig
   */
  "isCustomVersion"?: boolean;
  /**
   * Version
   *
   * The version of Notation to install. Example: 1.0.0, 1, 1.0, 1.0.0
   *
   * @default 1.3.2
   *
   * Only meaningful when: `command = install && isCustomVersion = false`
   *
   * In group: commandConfig
   */
  "version"?: string;
  /**
   * Download URL
   *
   * example:
   * https://github.com/notaryproject/notation/releases/download/v1.0.0/notation_1.0.0_linux_amd64.tar.gz
   *
   * Only meaningful when: `command = install && isCustomVersion = true`
   *
   * In group: commandConfig
   */
  "url"?: string;
  /**
   * Checksum
   *
   * The SHA-256 checksum of the downloaded file
   *
   * Only meaningful when: `command = install && isCustomVersion = true`
   *
   * In group: commandConfig
   */
  "checksum"?: string;
  /**
   * Artifact references
   *
   * Container artifact references for signing. If it was not specified, use the artifact
   * reference from previous Docker push task. Example: <registry name>/<repository
   * name>@<digest> If multiple, separate by comma.
   *
   * Only meaningful when: `command = verify || command = sign`
   *
   * In group: commandConfig
   */
  "artifactRefs"?: string;
  /**
   * Signature Format
   *
   * Signature envelope format, options: "jws", "cose" (default "jws")
   *
   * - `cose` — COSE
   * - `jws` — JWS
   *
   * @default cose
   *
   * Only meaningful when: `command = sign`
   *
   * In group: advancedConfig
   */
  "signatureFormat"?: "cose" | "jws";
  /**
   * [Experimental] Allow Referrers API
   *
   * Use the Referrers API to sign signatures, if not supported (returns 404), fallback to the
   * Referrers tag schema.
   *
   * @default false
   *
   * Only meaningful when: `command = sign || command = verify`
   *
   * In group: advancedConfig
   */
  "allowReferrersAPI"?: boolean;
  /**
   * Plugin
   *
   * - `azureKeyVault` — Azure Key Vault Plugin
   *
   * @default azureKeyVault
   *
   * In group: pluginConfig
   */
  "plugin": "azureKeyVault";
  /**
   * Plugin Version
   *
   * The version of the Azure Key Vault plugin to be installed. please visit the [release
   * page](https://github.com/Azure/notation-azure-kv/releases) for the available versions.
   *
   * @default 1.2.1
   *
   * Only meaningful when: `plugin = azureKeyVault`
   *
   * In group: pluginConfig
   */
  "akvPluginVersion"?: string;
  /**
   * Azure Key Vault service connection
   *
   * Select the Azure subscription for the key vault if prefer to use service connection for
   * authentication.
   *
   * Only meaningful when: `plugin = azureKeyVault`
   *
   * In group: pluginConfig
   */
  "azurekvServiceConection"?: AzureRMConnection;
  /**
   * Key ID
   *
   * The Key ID is the key or certificate identifier for Azure Key Vault.
   *
   * Only meaningful when: `plugin = azureKeyVault`
   *
   * In group: pluginConfig
   */
  "keyid"?: string;
  /**
   * Certificate Bundle File Path
   *
   * A file with root and all intermediate certificates, starting from the root certificate,
   * following the order in the certificate chain.
   *
   * Only meaningful when: `plugin = azureKeyVault`
   *
   * In group: pluginConfig
   */
  "caCertBundle"?: string;
  /**
   * Self-signed Certificate
   *
   * @default false
   *
   * Only meaningful when: `plugin = azureKeyVault`
   *
   * In group: pluginConfig
   */
  "selfSigned"?: boolean;
  /**
   * Timestamp URL
   *
   * RFC 3161 Timestamping Authority (TSA) server URL. (Require Notation v1.2.0 or later)
   *
   * Only meaningful when: `command = sign`
   *
   * In group: timestamp
   */
  "timestampURL"?: string;
  /**
   * Timestamp Root Certificate
   *
   * filepath of timestamp authority root certificate. (Require Notation v1.2.0 or later)
   *
   * Only meaningful when: `command = sign`
   *
   * In group: timestamp
   */
  "timestampRootCert"?: string;
  /**
   * Trust Policy File Path
   *
   * The path to the [trust
   * policy](https://github.com/notaryproject/specifications/blob/v1.0.0/specs/trust-store-trust-policy.md#trust-policy)
   * file relative to the repository. Example: ./path/to/trust-policy.json
   *
   * Only meaningful when: `command = verify`
   *
   * In group: commandConfig
   */
  "trustPolicy"?: string;
  /**
   * Trust Store Folder Path
   *
   * The path to the directory containing the [trust
   * store](https://github.com/notaryproject/specifications/blob/v1.0.0/specs/trust-store-trust-policy.md#trust-store)
   * relative to the repository. Example: ./path/to/truststore/
   *
   * Only meaningful when: `command = verify`
   *
   * In group: commandConfig
   */
  "trustStore"?: string;
}

/**
 * Notation
 *
 * Azure Pipepine Task for setting up Notation CLI, sign and verify with Notation
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/NotationV0
 */
export function notationV0(
  inputs: NotationV0Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("Notation@0", inputs as unknown as Record<string, unknown>, opts);
}
