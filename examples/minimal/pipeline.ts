import { pipeline, script, checkout } from '@mauve/azpipe';
import { useNodeV1 } from '@mauve/azpipe-tasks';
import { extend } from '@mauve/azpipe-utils';
import { buildAndTest } from './templates.js';

export default pipeline()
  .name('CI $(Date:yyyyMMdd).$(Rev:r)')
  .trigger({ branches: { include: ['main'] } })
  .pr({ branches: { include: ['main'] } })
  .pool({ vmImage: 'ubuntu-latest' })
  .variable('NODE_VERSION', '20.x')
  .variableGroup('shared-secrets')
  .stage('Build', (s) =>
    s
      .displayName('Build')
      .job('compile', (j) =>
        j
          .pool({ vmImage: 'ubuntu-latest' })
          .step(checkout('self', { fetchDepth: 1 }))
          .step(useNodeV1({ version: '$(NODE_VERSION)' }, { displayName: 'Install Node' }))
          .step(script('npm ci', { displayName: 'Install' }))
          .step(script('npm run build', { displayName: 'Build' })),
      ),
  )
  .stage('Test', (s) =>
    s.dependsOn('Build').jobTemplate(extend(buildAndTest, { runLint: true })),
  );

export const templates = [buildAndTest];
