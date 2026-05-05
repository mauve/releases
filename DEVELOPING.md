# Developing

## Prerequisites

- Node.js ≥ 20
- pnpm ≥ 10 (Corepack-managed or installed globally)

If `pnpm` isn't on your `PATH`, install it however you prefer. One option that doesn't need root:

```bash
npm config set prefix ~/.npm-global
npm install -g pnpm
export PATH=~/.npm-global/bin:$PATH   # add to your shell profile to persist
```

## Install

```bash
git submodule update --init vendor/azure-pipelines-tasks
pnpm install
```

The submodule check-out is sparse — only `Tasks/**/task.json` and `LICENSE.txt` populate the working tree (~3 MB instead of ~170 MB). This is configured automatically when you run `git submodule update --init`. If you ever need to reset the sparse config:

```bash
git -C vendor/azure-pipelines-tasks sparse-checkout init --no-cone
git -C vendor/azure-pipelines-tasks sparse-checkout set 'Tasks/**/task.json' 'LICENSE.txt'
git -C vendor/azure-pipelines-tasks read-tree -mu HEAD
```

`pnpm install` then installs all workspace dependencies and links the five packages to each other.

## Build

```bash
pnpm -r build           # build everything (uses TypeScript project references)
pnpm --filter @mauve/azpipe-core build    # build a single package
```

Build output goes to `packages/<name>/dist/`. The CLI's executable lands at `packages/cli/dist/bin.js`.

## Test

```bash
pnpm -r test            # all packages
pnpm --filter @mauve/azpipe test          # one package
```

Tests use [Vitest](https://vitest.dev). Snapshot tests live alongside unit tests in each package's `test/` directory.

The CLI test spins up a temporary directory inside `packages/cli/.tmp-*`, writes a small TS pipeline, runs the built `bin.js`, and asserts on the emitted YAML.

## Typecheck only

```bash
pnpm -r typecheck
```

## Sync the Azure schema

The Azure Pipelines JSON schema (the source of truth for our generated TS types and runtime validator) lives in `packages/core/src/schema/service-schema.json` and is committed to the repo. Regenerate it when you want to pick up upstream changes:

```bash
pnpm sync-schema
```

That runs `packages/core/scripts/sync-schema.ts`, which:

1. Fetches the latest [`service-schema.json`](https://raw.githubusercontent.com/microsoft/azure-pipelines-vscode/main/service-schema.json) from the `azure-pipelines-vscode` repo.
2. Writes it to `packages/core/src/schema/service-schema.json`.
3. Regenerates `packages/core/src/generated/schema.ts` via `json-schema-to-typescript`.

Both files are committed. After a sync:

```bash
pnpm -r build
pnpm -r test
```

…and review any type-shape changes in the generated file (and any test diffs) before committing.

## Sync the task definitions

`@mauve/azpipe-tasks` ships a typed function per non-deprecated task in [`microsoft/azure-pipelines-tasks`](https://github.com/microsoft/azure-pipelines-tasks). The generated TypeScript lives in `packages/tasks/src/generated/` and is committed.

To pick up upstream changes:

```bash
# 1. Bump the submodule pin to the latest commit on the upstream main branch
git submodule update --remote vendor/azure-pipelines-tasks

# 2. Regenerate the TypeScript helpers from the new task.json files
pnpm sync-tasks

# 3. Build and test
pnpm -r build
pnpm -r test
```

`pnpm sync-tasks` runs `packages/tasks/scripts/sync-tasks.ts`, which:

1. Walks `vendor/azure-pipelines-tasks/Tasks/<NameVN>/task.json`.
2. Skips tasks where `deprecated === true` or `removalDate` is in the past.
3. Emits one TypeScript file per `(task, major-version)` into `packages/tasks/src/generated/<kebab-case>/v<N>.ts`.
4. Emits a `connections.ts` with branded types/constructors per `connectedService:<Kind>`.
5. Re-exports everything via `packages/tasks/src/generated/index.ts`.
6. Emits `packages/tasks/src/generated/task-ids.ts` mapping `'AzureCLI@2' → { id, major }`. This is consumed by `@mauve/azpipe-releases`'s workflow-task adapter so a `useNodeV1(...)` call in a release definition resolves to the right GUID.

TSDoc on every generated function and field is copied from the upstream `task.json` (`label`, `helpMarkDown`, picklist labels, `defaultValue`, `visibleRule`) so consumers see the same documentation Azure DevOps shows in its task editor.

Review the diff of `packages/tasks/src/generated/` before committing — the submodule pin and the generated files should land in the same commit so they stay in lockstep.

## Sync the predefined-variable catalog

`@mauve/azpipe-utils` exposes `PreDef` — typed symbols for every predefined Azure DevOps variable (`PreDef.Pipeline.Build.SourceBranch === '$(Build.SourceBranch)'`). The list is generated from MS Learn's source markdown; refresh it when Microsoft adds or rephrases entries:

```bash
pnpm sync-vars
pnpm -r build
pnpm -r test
```

That script (`packages/utils/scripts/sync-vars.ts`):

1. Fetches `pipelines/build/variables.md` and `pipelines/release/variables.md` from `MicrosoftDocs/azure-devops-docs` (recursively expanding `[!INCLUDE]` references — the bulk of the build catalog lives in `includes/variables-hosted.md`).
2. Strips `::: moniker range="…"` blocks for non-current Azure DevOps Server versions.
3. Parses the GFM tables and applies the categorization rule (Build-page-only → `PreDef.Pipeline`, Release-page-only → `PreDef.Release`, both pages with identical descriptions → `PreDef.Shared`, both with different descriptions → duplicated under `Pipeline` and `Release`).
4. Emits `packages/utils/src/predef/{pipeline,release,shared}.ts` with TSDoc copied verbatim from the source.

When the heuristic gets a categorization wrong, add a hand-pin to `packages/utils/src/predef/categorization-overrides.ts` rather than editing the generated files (they'll be regenerated on the next sync).

`PreDef.Release.Artifacts(alias)` and `releaseArtifactVar(alias)` are hand-written (alias is user-chosen; `packages/utils/src/predef/artifacts.ts`). If MS adds new fields to the `Release.Artifacts.{alias}.*` table, update the field list there.

## Working with Release definitions

`@mauve/azpipe-releases` ships definition types + builders; `@mauve/azpipe-releases-client` adds the REST client. They have **no** code-generation step — types are hand-written from the [Azure DevOps Releases REST reference](https://learn.microsoft.com/rest/api/azure/devops/release/definitions).

### Authentication

The client uses `@azure/identity`'s `DefaultAzureCredential`. The chain it tries (in order):

1. Environment variables (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, etc.)
2. Workload identity (federated CI runners)
3. Managed identity (Azure-hosted services)
4. The `az` CLI (whatever account `az login` set up)

The token is requested for resource id `499b84ac-1321-427f-aa17-267ca6975798` (the Azure DevOps first-party app).

For local development: `az login` and you're done.

### Capturing a fixture from a real release

The releases-client tests use msw with JSON fixtures captured from a real Azure DevOps environment. To refresh / add fixtures:

```bash
# 1. Authenticate
az login

# 2. Fetch a definition by name and save the JSON
pnpm exec azpipe release get <release-name> \
  --org <your-org> --project <your-project> \
  --out packages/releases-client/test/fixtures/<name>.json

# 3. Scrub anything sensitive (org-internal connection IDs, internal display names) before committing.
```

Treat fixtures as test data — keep them small and focused (one fixture per scenario rather than a big shared one).

## Custom helpers (`@mauve/custom`)

Some Azure DevOps tasks and gates are contributed by Mauve-internal extensions and aren't part of the public marketplace catalog `@mauve/azpipe-tasks` generates from. `@mauve/custom` is the home for hand-written typed wrappers around those helpers.

### What goes here vs. upstream

- **`@mauve/custom`** — anything specific to a Mauve-internal extension or convention. Hand-written, low-volume, evolves with the extensions.
- **`@mauve/azpipe-utils`** / **`azpipe-tasks`** / **`azpipe-releases`** — anything reusable across orgs. If a helper would be useful to a team that doesn't run Mauve's extensions, push it upstream instead.

### Layout

```
packages/custom/src/
  connections.ts   # Branded service-connection types per custom kind
  gates/           # Custom Azure DevOps release gates (ServerGate tasks)
  tasks/           # Custom agent tasks
  presets/         # Reusable building blocks composing the above
```

### What ships today

- **`gates/calendar-gate.ts`** — typed wrapper around the [CalendarGate extension](https://github.com/mauve/CalendarGate) (`/home/mikael/repos/CalendarGate/CalendarGate.Extension` is the canonical source for its `task.json`). Exposes:
  - `calendarGateCheck(inputs, opts)` — low-level, returns a `WorkflowTask`. Use when stacking multiple checks under one gate step.
  - `calendarGate(inputs, opts)` — high-level, returns a complete `GateStep`. Drop directly into `gates({ gates: [calendarGate(...)] })`.
  - `calendarGateConnection(name)` — branded constructor for the custom `calendargate` service-connection kind.

The CalendarGate task ID and version live in `packages/custom/src/gates/calendar-gate.ts` as `CALENDAR_GATE_TASK_ID` and `CALENDAR_GATE_VERSION`. If the upstream extension bumps its major version, update those constants and add tests for the new shape.

### Adding a new custom helper

1. **Find the task definition.** For a gate or task contributed by a Mauve-internal extension, locate its `task.json` in the extension's source repo. You need:
   - `id` (GUID)
   - `version.Major` (the wildcard `<major>.*` is what we emit)
   - `runsOn` (`['ServerGate']` for gates, `['Agent']` for agent tasks)
   - `inputs[]` — for each input: `name`, `type`, `required`, `defaultValue`, `helpMarkDown`, `options` (for picklists)
2. **Pick the slot.** `gates/` for `runsOn: [ServerGate]`; `tasks/` for `runsOn: [Agent]`; `presets/` for compositions.
3. **Write the factory.** TS interface for the inputs (required vs. optional from `task.json`); factory returns either a `WorkflowTask` (gates) or a `TaskStep` (tasks). Copy the upstream `description` and per-input `helpMarkDown` into TSDoc verbatim, with an `@see` to the extension source.
4. **Branded connection.** If the task uses a custom `connectedService:<Kind>`, add a brand + constructor in `connections.ts` (mirror the existing `CalendarGateConnection`).
5. **Tests.** Vitest in `test/`: assert the GUID, version, defaults, brand round-trip, and a composability sanity check (e.g. drop into `gates({...})` and inspect the result).

### Why not codegen?

`@mauve/azpipe-tasks` generates from a vendored submodule of `microsoft/azure-pipelines-tasks` because that catalog is large (~150 tasks) and changes frequently. Internal extensions are few, low-churn, and live in different repos that aren't safe to vendor wholesale. Hand-writing wins until we're maintaining more than a handful.

## Run the examples

YAML pipeline:

```bash
cd examples/minimal
pnpm exec azpipe build pipeline.ts --out azure-pipelines.yml
```

Outputs `azure-pipelines.yml` and `templates/build-and-test.yml` next to the entry file.

Release definition (requires `az login` and an org/project you can write to):

```bash
cd examples/release-minimal
pnpm exec azpipe release diff release.ts             # show drift
pnpm exec azpipe release push release.ts --dry-run   # diff without writing
pnpm exec azpipe release push release.ts --yes       # apply
```

## Adding a new package

1. Create `packages/<name>/` with `package.json`, `tsconfig.json` (extend `../../tsconfig.base.json`, add references to deps), and `src/`.
2. Add `dependencies` on `@mauve/azpipe` / `@mauve/azpipe-core` / `@mauve/azpipe-utils` using `workspace:*`.
3. `pnpm install` from the repo root to register the new package and link workspace deps.
4. Add `build`, `test`, `typecheck`, `clean` scripts that mirror the existing packages.

## Layout

```
releases/
  packages/
    core/             # @mauve/azpipe-core   — schema + validator + serializer
    azpipe/           # @mauve/azpipe        — fluent builders for YAML pipelines
    utils/            # @mauve/azpipe-utils  — defineTemplate, merges, diff engine
    tasks/            # @mauve/azpipe-tasks  — typed function per Azure task
    releases/         # @mauve/azpipe-releases         — release-definition builders
    releases-client/  # @mauve/azpipe-releases-client  — REST + Entra auth + push
    custom/           # @mauve/custom        — Mauve-only gates / tasks / presets
    cli/              # @mauve/azpipe-cli    — `azpipe build` and `azpipe release ...`
  examples/
    minimal/                                 # working example pipeline + template
  vendor/
    azure-pipelines-tasks/                   # sparse submodule; only Tasks/**/task.json
  tsconfig.base.json
  pnpm-workspace.yaml
  turbo.json
```

## Releasing

The nine `@mauve/azpipe-*` packages share a single version. A release is one tag, one CHANGELOG entry, one set of identical version bumps. CI is GitHub Actions: `.github/workflows/ci.yml` runs on PR + master push, `.github/workflows/release.yml` runs on `v*` tag push and creates a GitHub release.

### Workflow

1. **During development**, every PR adds one bullet to `## [Unreleased]` in `CHANGELOG.md` under the right section (`Added` / `Changed` / `Fixed` / `Removed` / `Deprecated` / `Security`). Reviewers ensure user-visible changes have an entry.

2. **When you're ready to cut a release**, on a clean `master`:

   ```bash
   ./scripts/release.sh 0.2.0
   ```

   The script:
   - bumps every `@mauve/*` package.json to `0.2.0`,
   - opens `CHANGELOG.md` in `$EDITOR` so you can rename `## [Unreleased]` to `## [0.2.0] - YYYY-MM-DD` and add a fresh empty `Unreleased` block at the top,
   - commits the changes and tags `v0.2.0`.

3. **Push to publish**:

   ```bash
   git push && git push --tags
   ```

   The `v0.2.0` tag triggers `.github/workflows/release.yml`:
   - re-builds,
   - verifies the tag (`v0.2.0`) matches `packages/core/package.json` version (`0.2.0`),
   - extracts the matching CHANGELOG section and creates a GitHub release (`v0.2.0`) via `gh release create` using the workflow's built-in `GITHUB_TOKEN`.

The release workflow needs no extra secrets — `GITHUB_TOKEN` is auto-provisioned and the workflow already declares `permissions: contents: write`.

### What CI does on PRs

`.github/workflows/ci.yml` runs on every PR targeting `master` and every push to `master`:

- `pnpm install --frozen-lockfile`
- `pnpm -r build` (`tsc -b` across all packages)
- `pnpm -r test` (vitest)
- `pnpm -r typecheck` (`tsc --noEmit`)
- `pnpm lint` (eslint, `--max-warnings 0`)
- `tsc --noEmit` smoke-checks on `examples/minimal` and `examples/release-minimal`

A newer commit on the same PR / branch supersedes any in-flight run via the workflow's `concurrency` group.

## Common tasks

| What                          | How                                              |
| ----------------------------- | ------------------------------------------------ |
| Build everything              | `pnpm -r build`                                  |
| Run all tests                 | `pnpm -r test`                                   |
| Lint                          | `pnpm lint`                                      |
| Refresh the Azure schema      | `pnpm sync-schema && pnpm -r build`              |
| Refresh the task definitions  | `git submodule update --remote vendor/azure-pipelines-tasks && pnpm sync-tasks && pnpm -r build` |
| Refresh the predef-var catalog | `pnpm sync-vars && pnpm -r build`                |
| Cut a release                 | `./scripts/release.sh <version> && git push && git push --tags` |
| Rebuild the example           | `cd examples/minimal && pnpm exec azpipe build pipeline.ts` |
| Clean all build artifacts     | `pnpm -r clean`                                  |
