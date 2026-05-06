/**
 * Integration smoke tests for @mauvezero/ghactions-actions.
 *
 * For each major generated action wrapper, asserts that:
 *  1. The function returns an object with the correct `uses:` field.
 *  2. Passing no inputs produces a clean step (no spurious `with:` key).
 *  3. Passing inputs populates `with:` correctly.
 *  4. Step-level options (name, id, if, etc.) are forwarded.
 */

import { describe, expect, it } from 'vitest';
import {
  actionsCheckoutV6,
  actionsSetupNodeV6,
  actionsSetupPythonV6,
  actionsSetupJavaV5,
  actionsSetupGoV6,
  actionsCacheV5,
  actionsUploadArtifactV7,
  actionsDownloadArtifactV8,
  actionsGithubScriptV9,
  dockerLoginActionV3,
  dockerBuildPushActionV6,
  dockerSetupBuildxActionV3,
  awsActionsConfigureAwsCredentialsV4,
  hashicorpSetupTerraformV3,
  codecovCodecovActionV5,
} from '../src/index.js';

describe('actionsCheckoutV6', () => {
  it('returns a UsesStep with correct uses: ref', () => {
    const step = actionsCheckoutV6();
    expect(step.uses).toBe('actions/checkout@v6');
  });

  it('omits with: when no inputs are provided', () => {
    const step = actionsCheckoutV6();
    expect(step.with).toBeUndefined();
  });

  it('populates with: when inputs are provided', () => {
    const step = actionsCheckoutV6({ ref: 'main', depth: 0 });
    expect(step.with).toEqual({ ref: 'main', depth: 0 });
  });

  it('forwards step-level options', () => {
    const step = actionsCheckoutV6({}, { name: 'Checkout', id: 'checkout-step' });
    expect(step.name).toBe('Checkout');
    expect(step.id).toBe('checkout-step');
  });
});

describe('actionsSetupNodeV6', () => {
  it('returns correct uses: ref', () => {
    expect(actionsSetupNodeV6().uses).toBe('actions/setup-node@v6');
  });

  it('passes node-version input', () => {
    const step = actionsSetupNodeV6({ 'node-version': '20' });
    expect(step.with?.['node-version']).toBe('20');
  });
});

describe('actionsSetupPythonV6', () => {
  it('returns correct uses: ref', () => {
    expect(actionsSetupPythonV6().uses).toBe('actions/setup-python@v6');
  });
});

describe('actionsSetupJavaV5', () => {
  it('returns correct uses: ref', () => {
    expect(actionsSetupJavaV5({ distribution: 'temurin' }).uses).toBe('actions/setup-java@v5');
  });
});

describe('actionsSetupGoV6', () => {
  it('returns correct uses: ref', () => {
    expect(actionsSetupGoV6().uses).toBe('actions/setup-go@v6');
  });
});

describe('actionsCacheV5', () => {
  it('returns correct uses: ref', () => {
    // path and key are required inputs
    expect(actionsCacheV5({ path: '.', key: 'cache-key' }).uses).toBe('actions/cache@v5');
  });

  it('passes key and path inputs', () => {
    const step = actionsCacheV5({ key: 'npm-${{ hashFiles(...) }}', path: 'node_modules' });
    expect(step.with?.['key']).toBe('npm-${{ hashFiles(...) }}');
    expect(step.with?.['path']).toBe('node_modules');
  });
});

describe('actionsUploadArtifactV7', () => {
  it('returns correct uses: ref', () => {
    // path is required
    expect(actionsUploadArtifactV7({ path: './dist' }).uses).toBe('actions/upload-artifact@v7');
  });
});

describe('actionsDownloadArtifactV8', () => {
  it('returns correct uses: ref', () => {
    expect(actionsDownloadArtifactV8().uses).toBe('actions/download-artifact@v8');
  });
});

describe('actionsGithubScriptV9', () => {
  it('returns correct uses: ref', () => {
    expect(actionsGithubScriptV9({ script: '' }).uses).toBe('actions/github-script@v9');
  });

  it('passes script input', () => {
    const step = actionsGithubScriptV9({ script: 'console.log("hi")' });
    expect(step.with?.['script']).toBe('console.log("hi")');
  });
});

describe('dockerLoginActionV3', () => {
  it('returns correct uses: ref', () => {
    expect(dockerLoginActionV3().uses).toBe('docker/login-action@v3');
  });

  it('passes registry and username inputs', () => {
    const step = dockerLoginActionV3({ registry: 'ghcr.io', username: '${{ github.actor }}' });
    expect(step.with?.['registry']).toBe('ghcr.io');
    expect(step.with?.['username']).toBe('${{ github.actor }}');
  });
});

describe('dockerBuildPushActionV6', () => {
  it('returns correct uses: ref', () => {
    expect(dockerBuildPushActionV6().uses).toBe('docker/build-push-action@v6');
  });

  it('passes push input (boolean)', () => {
    const step = dockerBuildPushActionV6({ push: true });
    expect(step.with?.['push']).toBe(true);
  });
});

describe('dockerSetupBuildxActionV3', () => {
  it('returns correct uses: ref', () => {
    expect(dockerSetupBuildxActionV3().uses).toBe('docker/setup-buildx-action@v3');
  });
});

describe('awsActionsConfigureAwsCredentialsV4', () => {
  it('returns correct uses: ref', () => {
    expect(awsActionsConfigureAwsCredentialsV4({ 'aws-region': 'us-east-1' }).uses).toBe(
      'aws-actions/configure-aws-credentials@v4',
    );
  });
});

describe('hashicorpSetupTerraformV3', () => {
  it('returns correct uses: ref', () => {
    expect(hashicorpSetupTerraformV3().uses).toBe('hashicorp/setup-terraform@v3');
  });
});

describe('codecovCodecovActionV5', () => {
  it('returns correct uses: ref', () => {
    expect(codecovCodecovActionV5().uses).toBe('codecov/codecov-action@v5');
  });
});

describe('step composition with workflow builder', () => {
  it('can be passed to uses() or directly to .step()', async () => {
    // Import dynamically to avoid breaking the test suite if ghactions is not built yet.
    const { workflow, run } = await import('@mauvezero/ghactions');

    const yaml = workflow()
      .name('CI')
      .on({ push: { branches: ['main'] } })
      .job('build', j =>
        j
          .runsOn('ubuntu-latest')
          .step(actionsCheckoutV6())
          .step(actionsSetupNodeV6({ 'node-version': '20' }))
          .step(run('npm test')),
      )
      .toYaml();

    expect(yaml).toContain('uses: actions/checkout@v6');
    expect(yaml).toContain('uses: actions/setup-node@v6');
    // YAML serializes string '20' with double quotes; match either form.
    expect(yaml).toMatch(/node-version: ['"]20['"]/);
    expect(yaml).toContain('run: npm test');
  });
});
