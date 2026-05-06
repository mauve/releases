import { describe, expect, it } from 'vitest';
import { generateActionFile, generateIndexFile, fnNameFor, slugFor, inputsTypeNameFor } from '../scripts/generator.js';
import type { ActionEntry, ActionYaml } from '../scripts/generator.js';

const entry: ActionEntry = {
  owner: 'actions',
  repo: 'checkout',
  ref: 'v4',
};

const actionYaml: ActionYaml = {
  name: 'Checkout',
  description: 'Check out a Git repository at a particular version',
  inputs: {
    repository: {
      description: 'Repository name with owner',
      required: false,
      default: '${{ github.repository }}',
    },
    ref: {
      description: 'The branch, tag or SHA to checkout',
      required: false,
    },
    token: {
      description: 'Personal access token used to fetch the repository',
      required: false,
      default: '${{ github.token }}',
    },
    'ssh-key': {
      description: 'SSH key used to fetch the repository',
      required: false,
    },
    'persist-credentials': {
      description: 'Whether to configure the token or SSH key with the local git config',
      required: false,
      default: 'true',
    },
    depth: {
      description: 'Number of commits to fetch',
      required: true,
      default: '1',
    },
  },
};

const actionYamlRequired: ActionYaml = {
  name: 'My Action',
  description: 'An action with required inputs',
  inputs: {
    'required-input': {
      description: 'A required input with no default',
      required: true,
    },
    'optional-input': {
      description: 'An optional input',
      required: false,
    },
    'required-with-default': {
      description: 'Required but has default',
      required: true,
      default: 'some-default',
    },
  },
};

describe('fnNameFor', () => {
  it('produces camelCase + version suffix', () => {
    expect(fnNameFor({ owner: 'actions', repo: 'checkout', ref: 'v4' })).toBe('actionsCheckoutV4');
  });

  it('handles hyphenated repo names', () => {
    expect(fnNameFor({ owner: 'actions', repo: 'setup-node', ref: 'v4' })).toBe('actionsSetupNodeV4');
  });

  it('handles owner with hyphen', () => {
    expect(fnNameFor({ owner: 'aws-actions', repo: 'configure-aws-credentials', ref: 'v4' })).toBe(
      'awsActionsConfigureAwsCredentialsV4',
    );
  });

  it('handles docker org', () => {
    expect(fnNameFor({ owner: 'docker', repo: 'login-action', ref: 'v3' })).toBe('dockerLoginActionV3');
  });
});

describe('slugFor', () => {
  it('produces kebab-case slug', () => {
    expect(slugFor({ owner: 'actions', repo: 'checkout', ref: 'v4' })).toBe('actions-checkout-v4');
  });

  it('handles hyphenated names', () => {
    expect(slugFor({ owner: 'aws-actions', repo: 'configure-aws-credentials', ref: 'v4' })).toBe(
      'aws-actions-configure-aws-credentials-v4',
    );
  });
});

describe('inputsTypeNameFor', () => {
  it('produces PascalCase + Inputs suffix', () => {
    expect(inputsTypeNameFor({ owner: 'actions', repo: 'checkout', ref: 'v4' })).toBe('ActionsCheckoutV4Inputs');
  });
});

describe('generateActionFile', () => {
  const result = generateActionFile(entry, actionYaml);

  it('derives the correct function name', () => {
    expect(result.fnName).toBe('actionsCheckoutV4');
  });

  it('derives the correct slug', () => {
    expect(result.slug).toBe('actions-checkout-v4');
  });

  it('derives the correct inputs type name', () => {
    expect(result.inputsTypeName).toBe('ActionsCheckoutV4Inputs');
  });

  it('emits correct imports', () => {
    expect(result.contents).toContain("import type { UsesStep } from '@mauvezero/ghactions';");
    expect(result.contents).toContain("import { makeAction, type ActionStepOptions } from '../runtime.js';");
  });

  it('emits the Inputs interface', () => {
    expect(result.contents).toContain('export interface ActionsCheckoutV4Inputs {');
  });

  it('marks inputs with no required:true and no default as optional', () => {
    // ref: required: false → optional
    expect(result.contents).toMatch(/"ref"\?:/);
    // ssh-key: required: false → optional
    expect(result.contents).toMatch(/"ssh-key"\?:/);
  });

  it('marks inputs with required:true but a default as optional', () => {
    // depth: required: true BUT has default "1" → should be optional
    expect(result.contents).toMatch(/"depth"\?:/);
    // repository: required: false with default → optional
    expect(result.contents).toMatch(/"repository"\?:/);
  });

  it('emits the factory function returning UsesStep', () => {
    expect(result.contents).toContain('export function actionsCheckoutV4(');
    expect(result.contents).toContain('): UsesStep {');
    expect(result.contents).toContain('"actions/checkout@v4"');
  });

  it('includes input descriptions in TSDoc', () => {
    expect(result.contents).toContain('Repository name with owner');
    expect(result.contents).toContain('The branch, tag or SHA to checkout');
  });

  it('includes @default tag for inputs with defaults', () => {
    expect(result.contents).toContain('@default ${{ github.repository }}');
  });

  it('has correct banner comment', () => {
    expect(result.contents).toContain('// Auto-generated from actions/checkout@v4/action.yml.');
    expect(result.contents).toContain('// Run `pnpm sync-actions` to regenerate.');
  });
});

describe('generateActionFile — required inputs', () => {
  const result = generateActionFile(
    { owner: 'my', repo: 'my-action', ref: 'v1' },
    actionYamlRequired,
  );

  it('marks required-input (no default) as required in TS', () => {
    // Should NOT have "?:" for required-input
    expect(result.contents).toMatch(/"required-input": string \| boolean \| number;/);
  });

  it('marks optional-input as optional', () => {
    expect(result.contents).toMatch(/"optional-input"\?: string \| boolean \| number;/);
  });

  it('marks required-with-default as optional (has default)', () => {
    expect(result.contents).toMatch(/"required-with-default"\?: string \| boolean \| number;/);
  });
});

describe('generateActionFile — empty inputs', () => {
  it('emits an empty interface when action has no inputs', () => {
    const result = generateActionFile(
      { owner: 'actions', repo: 'no-inputs', ref: 'v1' },
      { name: 'No Inputs', description: 'An action with no inputs' },
    );
    expect(result.contents).toContain('export interface ActionsNoInputsV1Inputs {}');
  });
});

describe('generateIndexFile', () => {
  it('produces correct export lines', () => {
    const index = generateIndexFile([
      { fnName: 'actionsCheckoutV4', inputsTypeName: 'ActionsCheckoutV4Inputs', slug: 'actions-checkout-v4' },
      { fnName: 'actionsSetupNodeV4', inputsTypeName: 'ActionsSetupNodeV4Inputs', slug: 'actions-setup-node-v4' },
    ]);
    expect(index).toContain("export { actionsCheckoutV4 } from './actions-checkout-v4.js';");
    expect(index).toContain("export type { ActionsCheckoutV4Inputs } from './actions-checkout-v4.js';");
    expect(index).toContain("export { actionsSetupNodeV4 } from './actions-setup-node-v4.js';");
    expect(index).toContain("export type { ActionsSetupNodeV4Inputs } from './actions-setup-node-v4.js';");
  });

  it('sorts exports alphabetically by function name', () => {
    const index = generateIndexFile([
      { fnName: 'zAction', inputsTypeName: 'ZActionInputs', slug: 'z-action-v1' },
      { fnName: 'aAction', inputsTypeName: 'AActionInputs', slug: 'a-action-v1' },
    ]);
    const zPos = index.indexOf('zAction');
    const aPos = index.indexOf('aAction');
    expect(aPos).toBeLessThan(zPos);
  });
});
