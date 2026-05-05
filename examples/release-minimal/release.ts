import {
  releasePipeline,
  approval,
  buildArtifact,
  gates,
} from '@mauvezero/azpipe-releases';
import { useNodeV1, azureCLIV2, azureRMConnection } from '@mauvezero/azpipe-tasks';
import { PreDef } from '@mauvezero/azpipe-utils';
import { calendarGate, calendarGateConnection } from '@mauvezero/custom';

const web = buildArtifact({
  alias: 'web',
  definitionId: 100,
  defaultVersionType: 'latestType',
  isPrimary: true,
});

export default releasePipeline({
  org: 'mauve',
  project: 'platform',
  name: 'web-release',
  releaseNameFormat: `Release-${web.output.BuildNumber}-$(rev:r)`,
  description: 'Deploy the web app to staging then prod.',
})
  .artifact(web)
  .trigger(web)
  .environment('staging', (e) =>
    e.agentPhase((p) =>
      p
        .name('Deploy to staging')
        .pool({ vmImage: 'ubuntu-latest' })
        .step(useNodeV1({ version: '20.x' }, { displayName: 'Install Node' }))
        .step(
          azureCLIV2(
            {
              connectedServiceNameARM: azureRMConnection('staging-sub'),
              scriptType: 'bash',
              scriptLocation: 'inlineScript',
              inlineScript: `az webapp deploy --src ${PreDef.Release.System.ArtifactsDirectory}/web/drop --name web-staging`,
            },
            { displayName: 'az webapp deploy' },
          ),
        ),
    ),
  )
  .environment('prod', (e) =>
    e
      .dependsOn('staging')
      .preApproval(
        approval({
          approvers: ['lead@mauve.com'],
          requiredApproverCount: 1,
          timeoutInMinutes: 60,
        }),
      )
      .preGates(
        gates({
          timeout: 240,
          gates: [
            calendarGate({ connection: calendarGateConnection('prod-calendars') }),
          ],
        }),
      )
      .agentPhase((p) =>
        p
          .name('Deploy to prod')
          .pool({ vmImage: 'ubuntu-latest' })
          .step(useNodeV1({ version: '20.x' }))
          .step(
            azureCLIV2(
              {
                connectedServiceNameARM: azureRMConnection('prod-sub'),
                scriptType: 'bash',
                scriptLocation: 'inlineScript',
                inlineScript:
                  `az webapp deploy --src ${PreDef.Release.System.ArtifactsDirectory}/web/drop --name web-prod`,
              },
              { displayName: 'az webapp deploy' },
            ),
          ),
      ),
  );
