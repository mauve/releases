// Auto-generated from sigstore/cosign-installer@v3/action.yml. Do not edit by hand.
// Run `pnpm sync-actions` to regenerate.

import type { UsesStep } from '@mauvezero/ghactions';
import { makeAction, type ActionStepOptions } from '../runtime.js';

export interface SigstoreCosignInstallerV3Inputs {
  /**
   * cosign release version to be installed
   *
   * @default v2.5.2
   */
  "cosign-release"?: string | boolean | number;
  /**
   * Where to install the cosign binary
   *
   * @default $HOME/.cosign
   */
  "install-dir"?: string | boolean | number;
  /**
   * set to true if install-dir location requires sudo privs
   *
   * @default false
   */
  "use-sudo"?: string | boolean | number;
}

/**
 * cosign-installer
 *
 * Installs cosign and includes it in your path
 *
 * @see https://github.com/sigstore/cosign-installer
 */
export function sigstoreCosignInstallerV3(
  inputs: SigstoreCosignInstallerV3Inputs = {},
  opts: ActionStepOptions = {},
): UsesStep {
  return makeAction("sigstore/cosign-installer@v3", inputs as unknown as Record<string, string | boolean | number | undefined>, opts);
}
