# Tutorial: Bootstrap a repo with azpipe

This tutorial walks you through using `azpipe bootstrap` to set up a brand-new
`pipelines/` directory in an existing repo. After completing it you will have:

- A TypeScript-authored CI pipeline (`azure-pipelines.ts`) that compiles to
  `azure-pipelines.yml`.
- A typed release pipeline definition (`release.ts`) that you can diff and push
  to Azure DevOps Classic Releases.
- A `release-sync.yml` Azure Pipelines YAML that keeps the release definition in
  sync automatically — diffs on every PR, pushes on merge.

---

## Prerequisites

- **Node ≥ 20** and **npm** (or pnpm/yarn — but the generated `pipelines/` uses npm scripts).
- The repo you are bootstrapping must be inside a **git repository**.
- To push release definitions you need access to an Azure DevOps project and must
  be able to authenticate via `DefaultAzureCredential`. Locally, `az login` is the
  easiest path.

---

## Step 1 — Run bootstrap

From **anywhere inside the git repo** (it walks up to find the root automatically):

```bash
npx @mauvezero/azpipe-cli bootstrap
```

The wizard auto-detects what it can and asks you to confirm:

```
Detected repo root:      /home/you/acme-api
Detected default branch: main
Detected org:            acme   (from AZURE_DEVOPS_ORG)
  Azure DevOps org [acme]:
Detected project:        platform   (from AZURE_DEVOPS_PROJECT)
  Azure DevOps project [platform]:
  Sync pipeline name (Azure DevOps display name) [platformReleasesSync]:
  Release definition name (e.g. my-service-release): acme-api-release
Existing azure-pipelines.yml detected at repo root.
  Convert it to TypeScript? [Y/n]:
  Create/overwrite files in pipelines/? [Y/n]:
```

**Tips:**

- If `AZURE_DEVOPS_ORG` / `AZURE_DEVOPS_PROJECT` are not set, type the values at
  the prompts. You can always edit the generated files afterwards.
- The *sync pipeline name* is the display name used when you register
  `release-sync.yml` as a pipeline in Azure DevOps (Step 5). The suggested
  `{Project}ReleasesSync` is a convention, not a requirement.
- The *release definition name* is the name that will appear in the **Releases**
  section of Azure DevOps. You can manage multiple release definitions by creating
  additional `.ts` files later.
- Add `--yes` to skip all prompts and accept defaults (useful in scripts).

---

## Step 2 — Understand what was generated

```
<repo-root>/
  azure-pipelines.yml          ← generated; do not edit by hand
  pipelines/
    package.json               ← build / diff / push scripts
    tsconfig.json              ← self-contained TypeScript config
    README.md                  ← quick-reference for the pipelines/ directory
    azure-pipelines.ts         ← CI pipeline source
    release.ts                 ← release pipeline source
    release-sync.yml           ← YAML pipeline for release-definition sync
```

### `azure-pipelines.ts` and `azure-pipelines.yml`

If you answered **Y** to *"Convert it to TypeScript?"*, bootstrap ran
`azpipe build import` on your existing YAML and stored the result in
`azure-pipelines.ts`. The original `azure-pipelines.yml` now has a large
generated-file banner prepended:

```yaml
# ============================================================
# GENERATED FILE – do not edit by hand.
# Source: pipelines/azure-pipelines.ts
# Regenerate: cd pipelines && npm run build
# ============================================================
…rest of your pipeline…
```

If there was no existing YAML, bootstrap emitted a minimal stub you can expand.

### `release.ts`

A stub release pipeline pre-populated with the org, project, and release name
you provided. It has one placeholder environment with a `TODO` comment. You will
flesh this out in Step 4.

### `release-sync.yml`

A plain YAML pipeline (not compiled from TypeScript) that:

1. Runs `azpipe release diff release.ts` on every push and PR that touches
   `pipelines/**`. Non-zero exit means drift — your PR description will mention
   pending changes.
2. Runs `azpipe release push release.ts --yes` **only on the default branch**
   (not on PRs), so changes are applied automatically after merge.

The generated file uses the branch name detected during bootstrap (`main` or
`master`, or whatever your remote HEAD points to).

---

## Step 3 — Install dependencies and rebuild the CI pipeline

```bash
cd pipelines
npm install
npm run build   # compiles azure-pipelines.ts → ../azure-pipelines.yml
```

`npm run build` is a thin wrapper around `azpipe build azure-pipelines.ts --out ../azure-pipelines.yml`. Run it whenever you change `azure-pipelines.ts`; commit both files together.

Verify the output looks right:

```bash
cat ../azure-pipelines.yml
```

---

## Step 4 — Author the release definition

Open `pipelines/release.ts`. The stub looks like this:

```ts
import { releasePipeline, buildArtifact } from '@mauvezero/azpipe-releases';

const artifact = buildArtifact({
  alias: 'drop',
  definitionId: 0, // TODO: replace with your build pipeline's definition ID
  defaultVersionType: 'latestType',
  isPrimary: true,
});

export default releasePipeline({
  org: 'acme',
  project: 'platform',
  name: 'acme-api-release',
  releaseNameFormat: 'Release-$(rev:r)',
  description: 'Managed by azpipe.',
})
  .artifact(artifact)
  .trigger(artifact)
  .environment('staging', (e) =>
    e.agentPhase((p) =>
      p
        .name('Deploy to staging')
        .pool({ vmImage: 'ubuntu-latest' })
        // TODO: add your deployment steps here
    ),
  );
```

### Find your build pipeline ID

The `definitionId` is the numeric ID of the Azure Pipelines build pipeline whose
artifacts this release should consume. Find it in the browser URL when viewing the
build pipeline:

```
https://dev.azure.com/acme/platform/_build?definitionId=42
                                                          ^^
```

Set `definitionId: 42`.

### Add environments

Add environments using the fluent builder. Here is a staging → prod pattern with
a manual approval gate on prod:

```ts
import {
  releasePipeline, buildArtifact, approval,
} from '@mauvezero/azpipe-releases';
import { useNodeV1, azureCLIV2, azureRMConnection } from '@mauvezero/azpipe-tasks';

const artifact = buildArtifact({
  alias: 'drop',
  definitionId: 42,
  defaultVersionType: 'latestType',
  isPrimary: true,
});

export default releasePipeline({
  org: 'acme',
  project: 'platform',
  name: 'acme-api-release',
  releaseNameFormat: `Release-${artifact.output.BuildNumber}-$(rev:r)`,
})
  .artifact(artifact)
  .trigger(artifact)
  .environment('staging', (e) =>
    e.agentPhase((p) =>
      p
        .name('Deploy to staging')
        .pool({ vmImage: 'ubuntu-latest' })
        .step(useNodeV1({ version: '20.x' }))
        .step(
          azureCLIV2({
            connectedServiceNameARM: azureRMConnection('staging-sub'),
            scriptType: 'bash',
            scriptLocation: 'inlineScript',
            inlineScript: 'az webapp deploy --name acme-api-staging ...',
          }),
        ),
    ),
  )
  .environment('prod', (e) =>
    e
      .dependsOn('staging')
      .preApproval(
        approval({
          approvers: ['lead@acme.com'],
          requiredApproverCount: 1,
          timeoutInMinutes: 60,
        }),
      )
      .agentPhase((p) =>
        p
          .name('Deploy to prod')
          .pool({ vmImage: 'ubuntu-latest' })
          .step(useNodeV1({ version: '20.x' }))
          .step(
            azureCLIV2({
              connectedServiceNameARM: azureRMConnection('prod-sub'),
              scriptType: 'bash',
              scriptLocation: 'inlineScript',
              inlineScript: 'az webapp deploy --name acme-api-prod ...',
            }),
          ),
      ),
  );
```

---

## Step 5 — Check drift and do a first push

```bash
cd pipelines
npm run diff      # shows what azpipe would create/change on the server
```

On first run there will be a large diff because the definition doesn't exist yet
on the server. That's expected. Push it:

```bash
npm run push      # prompts "Apply? [y/N]" before writing
# or:
npm run push:dry  # dry run — prints the diff but doesn't write anything
```

Your release definition now exists in Azure DevOps. Open the Releases section to
confirm.

---

## Step 6 — Register `release-sync.yml` in Azure DevOps

This is a one-time manual step in the Azure DevOps UI:

1. In your Azure DevOps project, go to **Pipelines → Pipelines → New pipeline**.
2. Choose **Azure Repos Git** (or GitHub, wherever the repo lives) and select the repo.
3. Under *"Where is your YAML file?"*, select **Existing Azure Pipelines YAML file**.
4. Set the path to `pipelines/release-sync.yml`.
5. Name the pipeline **`{Project}ReleasesSync`** (or whatever you chose during bootstrap).
6. Set the pipeline variables:
   - `AZURE_DEVOPS_ORG` → your org name
   - `AZURE_DEVOPS_PROJECT` → your project name
7. Grant the pipeline's identity **Release Definition Contributor** permission in
   **Project Settings → Permissions**.

From this point on:
- Every PR that touches `pipelines/**` triggers a diff run and posts the result.
- Merging to the default branch automatically pushes the definition.

---

## Step 7 — Commit and push

```bash
git add pipelines/ azure-pipelines.yml
git commit -m "chore: add azpipe-managed pipelines"
git push
```

---

## Adding more release pipelines

To manage a second release definition:

1. Create `pipelines/release-backend.ts` (copy `release.ts` as a starting point,
   change the `name:` and environments).
2. Add diff and push steps to `release-sync.yml`:

   ```yaml
   - script: npx azpipe release diff release-backend.ts
     workingDirectory: pipelines
     displayName: Diff release-backend
     continueOnError: true
     env:
       AZURE_DEVOPS_ORG: $(AZURE_DEVOPS_ORG)
       AZURE_DEVOPS_PROJECT: $(AZURE_DEVOPS_PROJECT)

   - script: npx azpipe release push release-backend.ts --yes
     workingDirectory: pipelines
     displayName: Push release-backend
     condition: and(succeeded(), ne(variables['Build.Reason'], 'PullRequest'))
     env:
       AZURE_DEVOPS_ORG: $(AZURE_DEVOPS_ORG)
       AZURE_DEVOPS_PROJECT: $(AZURE_DEVOPS_PROJECT)
   ```

3. Commit and open a PR — the sync pipeline will diff both definitions.

---

## Importing an existing release definition

If you already have a classic release definition on the server and want to bring it
under azpipe management:

```bash
# Fetch from the server and convert to TypeScript in one step:
azpipe release import --name acme-api-release \
  --org acme --project platform \
  --out pipelines/release.ts \
  --resolve-queues   # resolves numeric queue IDs to readable pool names
```

Review the generated `release.ts`, then follow from Step 5.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Not inside a git repository` | Run bootstrap from inside a git repo. |
| `Org is required` | Set `AZURE_DEVOPS_ORG` or answer the org prompt. |
| `Entry file not found` when running diff/push | Make sure you're in the `pipelines/` directory (`cd pipelines`). |
| Auth error during push | Run `az login` locally; for CI, configure workload identity federation. |
| Drift never applied on merge | Check that the sync pipeline's identity has **Release Definition Contributor** permission. |
