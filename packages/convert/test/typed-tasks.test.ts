import { describe, it, expect } from 'vitest';
import { emitInlineTemplateSource } from '../src/yaml/templates.js';

describe('emitInlineTemplateSource – typed task factories', () => {
    it('converts AzureCLI@2 to azureCLIV2 with alias remapping and connection wrapping', () => {
        const yaml = `
parameters:
  - name: azureSubscription
    type: string
  - name: scriptType
    type: string
    default: bash

steps:
  - task: AzureCLI@2
    inputs:
      azureSubscription: \${{ parameters.azureSubscription }}
      scriptType: \${{ parameters.scriptType }}
      scriptLocation: inlineScript
      inlineScript: echo hello
    displayName: Run Azure CLI
`;
        const result = emitInlineTemplateSource({
            referencePath: 'templates/azure-cli-step.yml',
            identifier: 'azureCliStep',
            yamlText: yaml,
            kind: 'steps',
        });
        // Should import the typed factory
        expect(result.source).toContain("azureCLIV2");
        expect(result.source).toContain("from '@mauvezero/azpipe-tasks'");
        // Should import the connection TYPE (parameter is branded)
        expect(result.source).toContain("AzureRMConnection");
        // Parameter should be typed as connection type
        expect(result.source).toContain("azureSubscription: AzureRMConnection");
        // Should use the canonical input name (not the yaml alias)
        expect(result.source).toContain("connectedServiceNameARM");
        // Connection param passed directly (no factory wrapper needed since param is branded)
        expect(result.source).toContain("connectedServiceNameARM: azureSubscription");
        // Should NOT contain the raw task object literal
        expect(result.source).not.toContain("task: 'AzureCLI@2'");
    });

    it('converts script-like steps to builder calls', () => {
        const yaml = `
parameters:
  - name: message
    type: string

steps:
  - bash: echo \${{ parameters.message }}
    displayName: Say something
`;
        const result = emitInlineTemplateSource({
            referencePath: 'templates/bash-step.yml',
            identifier: 'bashStep',
            yamlText: yaml,
            kind: 'steps',
        });
        expect(result.source).toContain("bash");
        expect(result.source).toContain("from '@mauvezero/azpipe'");
        expect(result.source).toContain("bash(");
        expect(result.source).not.toContain("bash: ");
    });

    it('falls back to task() for unknown tasks', () => {
        const yaml = `
parameters:
  - name: input1
    type: string

steps:
  - task: SomeUnknownTask@99
    inputs:
      input1: \${{ parameters.input1 }}
`;
        const result = emitInlineTemplateSource({
            referencePath: 'templates/unknown-task.yml',
            identifier: 'unknownTask',
            yamlText: yaml,
            kind: 'steps',
        });
        expect(result.source).toContain("task");
        expect(result.source).toContain("from '@mauvezero/azpipe'");
        expect(result.source).toContain("task('SomeUnknownTask@99'");
    });

    it('wraps hardcoded connection string values with factory', () => {
        const yaml = `
steps:
  - task: AzureCLI@2
    inputs:
      azureSubscription: my-service-connection
      scriptType: bash
      scriptLocation: inlineScript
      inlineScript: echo hello
`;
        const result = emitInlineTemplateSource({
            referencePath: 'templates/hardcoded-conn.yml',
            identifier: 'hardcodedConn',
            yamlText: yaml,
            kind: 'steps',
        });
        // Hardcoded string should be wrapped with connection factory
        expect(result.source).toContain("azureRMConnection('my-service-connection')");
        expect(result.source).toContain("connectedServiceNameARM: azureRMConnection(");
    });
});
