# azpipe

Typesafe, programmatic authoring of Azure Pipelines (`azure-pipelines.yml`) in TypeScript.

## Why this exists

Azure Pipelines YAML is large, repetitive, and easy to get subtly wrong. Hand-written YAML drifts across repos, copy-pasted templates rot, and breakage usually shows up at the wrong moment — minutes into a CI run, not in your editor.

`azpipe` flips the authoring model: you declare the pipeline in TypeScript with full IDE assistance, validation runs at build time against Microsoft's own JSON schema, and the YAML is a generated artifact you commit alongside the source.

The library is intentionally generic. Its primary purpose is to be the foundation for *derived packages* that encode an org's conventions — typed templates for "build a Node service", "release to staging then prod with approvals", "run our shared security scan" — exposed as small, type-checked APIs that consumers can't misuse.

### What you get

- **Compile-time safety.** The fluent builder and step factories are typed against a curated facade layered on top of the generated schema. Misnamed step kinds, wrong-shaped inputs, missing required fields — all caught by `tsc`.
- **Runtime validation.** Every `.toYaml()` validates against the Azure JSON schema before serializing. Dynamically-built pipelines (loops, conditionals, programmatic generation) are checked just like static ones.
- **Typed templates.** `defineTemplate` declares a template with a parameter shape; `extend()` references it with type-checked parameters. Derived packages ship templates as ordinary TypeScript exports — consumers get autocomplete on parameter names and IDE errors on bad values.
- **A thin CLI.** `azpipe build pipeline.ts` compiles a TS entry point to YAML and writes any referenced typed templates alongside it.
- **Multiple output formats.** YAML (the default), JSON, or just the in-memory object — pick based on what your tooling consumes.

### What it is not

- Primarily a generator, not a parser — though `@mauve/azpipe-convert` /
  `azpipe build import` / `azpipe release import` will turn an existing
  `azure-pipelines.yml` or classic-release JSON into TypeScript when adopting
  the toolchain on an existing pipeline.
- Not a runner. It produces the YAML; Azure DevOps runs it.
- Not opinionated. It exposes the full schema. Opinions belong in derived packages.

## Architecture

A small monorepo (pnpm workspaces + turborepo, ESM-only, Node ≥ 20):

| Package                       | Role                                                                |
| ----------------------------- | ------------------------------------------------------------------- |
| `@mauve/azpipe-core`     | Vendored schema, generated TS types, ajv validator, YAML serializer |
| `@mauve/azpipe`          | Fluent `pipeline()` builder and step factories — the main API       |
| `@mauve/azpipe-utils`    | `defineTemplate`, `extend`, merges, identity-aware diff engine, `PreDef` predefined-variable symbols |
| `@mauve/azpipe-tasks`    | Typed function per non-deprecated task in `azure-pipelines-tasks`   |
| `@mauve/azpipe-releases` | Typesafe builder for Azure DevOps Classic Release definitions       |
| `@mauve/azpipe-releases-client` | REST client for releases (Entra auth, get/list/put, diff, push) |
| `@mauve/azpipe-convert`  | Convert existing `azure-pipelines.yml` and classic-release JSON to TS |
| `@mauve/custom`          | Mauve-only helpers (custom gates / tasks / presets) — currently CalendarGate |
| `@mauve/azpipe-cli`      | `azpipe build`, `azpipe build import`, `azpipe release {get,diff,push,import}` commands |

Derived packages typically depend on `@mauve/azpipe` + `@mauve/azpipe-utils` and re-export typed building blocks for their consumers.

## Installing / running the CLI

The packages aren't published to a public registry yet. To run the CLI, clone
the repo and build from source:

```bash
git clone https://github.com/mauve/releases.git
cd releases
pnpm install
pnpm -r build

node packages/cli/dist/bin.js build pipeline.ts --out azure-pipelines.yml
node packages/cli/dist/bin.js build import azure-pipelines.yml --out pipeline.ts
node packages/cli/dist/bin.js release import --name web-release --org mauve --project platform
```

## Quick example

```ts
// pipeline.ts
import { pipeline, script, task, checkout } from '@mauve/azpipe';

export default pipeline()
  .name('CI $(Date:yyyyMMdd).$(Rev:r)')
  .trigger({ branches: { include: ['main'] } })
  .pool({ vmImage: 'ubuntu-latest' })
  .stage('Build', (s) =>
    s.job('compile', (j) =>
      j
        .step(checkout('self', { fetchDepth: 1 }))
        .step(task('NodeTool@0', { inputs: { versionSpec: '20.x' } }))
        .step(script('npm ci'))
        .step(script('npm run build')),
    ),
  );
```

```bash
azpipe build pipeline.ts --out azure-pipelines.yml
```

A typed task with autocomplete on every input (label, help text, picklist values, defaults all hover from `task.json`):

```ts
import { pipeline } from '@mauve/azpipe';
import { azureCLIV2, azureRMConnection, useNodeV1 } from '@mauve/azpipe-tasks';

export default pipeline()
  .pool({ vmImage: 'ubuntu-latest' })
  .job('release', (j) =>
    j
      .step(useNodeV1({ versionSpec: '20.x' }, { displayName: 'Install Node' }))
      .step(
        azureCLIV2(
          {
            connectedServiceNameARM: azureRMConnection('prod-subscription'),
            scriptType: 'bash',                  // 'ps' | 'pscore' | 'batch' | 'bash'
            scriptLocation: 'inlineScript',
            inlineScript: 'az group list',
          },
          { displayName: 'List groups' },
        ),
      ),
  );
```

A typed template:

```ts
// templates.ts
import { defineTemplate } from '@mauve/azpipe-utils';

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
        steps: [
          { task: 'NodeTool@0', inputs: { versionSpec: nodeVersion as unknown as string } },
          { script: 'npm ci' },
          ...(runLint ? [{ script: 'npm run lint' } as const] : []),
          { script: 'npm test' },
        ],
      },
    ],
  }),
});
```

```ts
// pipeline.ts
import { pipeline } from '@mauve/azpipe';
import { extend } from '@mauve/azpipe-utils';
import { buildAndTest } from './templates.js';

export default pipeline()
  .stage('Test', (s) =>
    s.jobTemplate(extend(buildAndTest, { runLint: false })),
  );

export const templates = [buildAndTest];
```

The CLI emits both `azure-pipelines.yml` and `templates/build-and-test.yml`, and the `extend()` call is type-checked against the template's parameter shape.

## Classic Release pipelines

Define release pipelines in TS using the same typed task helpers, then diff and push to Azure DevOps:

```ts
// release.ts
import {
  releasePipeline, approval, buildArtifact,
} from '@mauve/azpipe-releases';
import { useNodeV1, azureCLIV2, azureRMConnection } from '@mauve/azpipe-tasks';

const web = buildArtifact({ alias: 'web', definitionId: 100, isPrimary: true });

export default releasePipeline({
  org: 'mauve',
  project: 'platform',
  name: 'web-release',
  releaseNameFormat: `Release-${web.output.BuildNumber}-$(rev:r)`,
})
  .artifact(web)
  .trigger(web)                                       // shorthand for artifactSourceTrigger(web)
  .environment('staging', e => e.agentPhase(p => p
    .pool({ vmImage: 'ubuntu-22.04' })
    .step(useNodeV1({ version: '20.x' }))
    .step(azureCLIV2({
      connectedServiceNameARM: azureRMConnection('staging-sub'),
      scriptType: 'bash',
      scriptLocation: 'inlineScript',
      inlineScript: 'az webapp deploy ...',
    }))))
  .environment('prod', e => e
    .preApproval(approval({ approvers: ['lead@mauve.com'], requiredApproverCount: 1 }))
    .agentPhase(p => p.pool('MyPrivatePool').step(useNodeV1({ version: '20.x' }))));
```

### Artifact sources

`.artifact(...)` accepts the output of one of three factories. Hold the
returned artifact in a `const` so you can pass it directly to `.trigger(...)`
and read its predefined variables via `artifact.output.*` — the alias is
written once at construction and reused everywhere else.

Set `isPrimary: true` on exactly one artifact — that one drives the
`Build.*` predefined variables and the default release-name token sources.
The builder throws `MultiplePrimaryArtifactsError` at `toDefinition()` time
if more than one is marked primary, and `UnknownArtifactAliasError` if a
trigger references an alias no artifact registered.

```ts
import { buildArtifact, gitArtifact, gitHubArtifact } from '@mauve/azpipe-releases';

// Build pipeline. definitionId is the numeric build pipeline id —
// find it in the URL of the build pipeline (.../_build?definitionId=N).
const web = buildArtifact({ alias: 'web', definitionId: 100, isPrimary: true });

// Azure Repos Git. definitionId is the repo id (GUID) or repo name.
const infra = gitArtifact({
  alias: 'infra',
  projectId: '00000000-0000-0000-0000-000000000000',
  definitionId: 'infra-repo',
  defaultVersionBranch: 'refs/heads/main',
});

// GitHub. definitionId is the `owner/repo` slug; connection is the
// service-connection id for the GitHub endpoint in this project.
const site = gitHubArtifact({
  alias: 'site',
  connection: 'github-neko',
  definitionId: 'mauve/web',
  defaultVersionBranch: 'refs/heads/main',
});

// Bind once, reuse everywhere — no copy-pasted alias strings.
releasePipeline({ /* ... */ })
  .artifact(web)
  .trigger(web)                          // == artifactSourceTrigger(web)
  // …or with triggerConditions:
  // .trigger(artifactSourceTrigger(web))
  .variable('artifact_build', web.output.BuildId);   // → '$(Release.Artifacts.web.BuildId)'
```

`artifact.output` is a typed bundle of every `Release.Artifacts.<alias>.*`
variable (see [Predefined variables](#predefined-variables) below) — handy
for log messages, release-name formats, and downstream task inputs without
having to type the alias string a second time.

Pool references accept queue names (resolved at push time via `listQueues`), numeric IDs, or hosted-image identifiers — same `vmImage` ergonomics as the YAML pipeline side:

```ts
.pool('Azure Pipelines')                              // hosted, no constraints
.pool({ name: 'MyPrivatePool' })                      // private pool
.pool({ vmImage: 'ubuntu-22.04' })                    // hosted, pinned image
.pool({ vmImage: 'macos-13' })
.pool({ name: 'Azure Pipelines', vmImage: 'ubuntu-latest', demands: ['Foo'] })
.pool({ queueId: 12 })                                // numeric escape hatch
```

`vmImage` writes the release-specific `agentSpecification.identifier` field; the queue defaults to `'Azure Pipelines'` (the hosted pool that honors the override). Use `demands` for arbitrary agent capabilities.

```bash
# Show what would change vs the server (exit non-zero if any drift).
azpipe release diff release.ts

# Diff first, prompt to confirm, then PUT. --yes for CI; --dry-run to inspect only.
azpipe release push release.ts

# Fetch and dump a definition by name.
azpipe release get web-release --org mauve --project platform --out web-release.json
```

Authentication uses [`@azure/identity`'s `DefaultAzureCredential`](https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential) — managed identity → workload identity → `az` CLI → env vars. Locally, run `az login` and you're set.

The same typed task helpers from `@mauve/azpipe-tasks` work in both YAML pipelines and Release definitions: the release-side adapter looks up each task's GUID from the generated catalog and emits the right `workflowTask` shape.

## Predefined variables

Type predefined variables instead of typing strings. Hovering an entry in your editor shows the same description Microsoft publishes:

```ts
import { PreDef, releaseArtifactVar } from '@mauve/azpipe-utils';

PreDef.Pipeline.Build.SourceBranch       // → '$(Build.SourceBranch)'
PreDef.Release.Release.ReleaseId         // → '$(Release.ReleaseId)'
PreDef.Shared.System.AccessToken         // → '$(System.AccessToken)' (same in both contexts)
PreDef.Shared.Agent.OS                   // → '$(Agent.OS)'

PreDef.Release.Artifacts('web').BuildId  // → '$(Release.Artifacts.web.BuildId)'
releaseArtifactVar('web').BuildId        // same — top-level export for ergonomic import
```

Three top-level namespaces:

- `PreDef.Pipeline` — variables in YAML/build runs (`Build.*`, `Pipeline.*`, plus the build-context value of `System.*` and `Agent.*`).
- `PreDef.Release` — variables in classic Release runs (`Release.*`, plus the release-context value of `System.*` and `Agent.*`).
- `PreDef.Shared` — variables whose meaning is identical in both (`System.AccessToken`, `Agent.OS`, `TF_BUILD`, …).

The catalog is generated from MicrosoftDocs/azure-devops-docs (`pnpm sync-vars`); descriptions are copied verbatim from the source pages.

## A note on the schema

Microsoft's published JSON schema (the one used by the VS Code extension) is stricter than Azure's actual server-side validator. In particular, `string`-typed fields routinely accept numbers and booleans in real pipelines (`fetchDepth: 1`, `failOnStderr: false` as a string, etc.). To avoid rejecting pipelines Azure would happily run, the validator relaxes `string`, `nonEmptyString`, and `boolean` definitions at load time. See `packages/core/src/validate.ts` `relaxSchema()`.

If a pipeline this library accepts is later rejected by Azure, please open an issue with the offending input — it likely points to a real validator gap, not just schema strictness.

## Status

Early — `0.1.0`. API may change. The public surface is the fluent builder, step factories, `defineTemplate`/`extend`, and the CLI; everything else is implementation detail.

See [CHANGELOG.md](./CHANGELOG.md) for release history and [DEVELOPING.md](./DEVELOPING.md) for build, test, schema-sync, and release instructions.
