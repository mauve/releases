import { defineTemplate } from '@mauvezero/azpipe-utils';

export const buildAndTest = defineTemplate({
  name: 'build-and-test',
  kind: 'jobs',
  parameters: {
    nodeVersion: { type: 'string', default: '20.x' },
    runLint: { type: 'boolean', default: true },
  },
  body: ({ nodeVersion, runLint }) => ({
    jobs: [
      {
        job: 'build_and_test',
        displayName: 'Build & Test',
        pool: { vmImage: 'ubuntu-latest' },
        steps: [
          { task: 'NodeTool@0', inputs: { versionSpec: nodeVersion as unknown as string } },
          { script: 'npm ci', displayName: 'Install' },
          ...(runLint ? [{ script: 'npm run lint', displayName: 'Lint' } as const] : []),
          { script: 'npm run build', displayName: 'Build' },
          { script: 'npm test', displayName: 'Test' },
        ],
      },
    ],
  }),
});
