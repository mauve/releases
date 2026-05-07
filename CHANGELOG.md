# Changelog

All notable changes to the `@mauvezero/azpipe-*` packages.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

All packages share a single version: a release tag `vX.Y.Z` bumps every
package to `X.Y.Z` together.

## [Unreleased]

### Fixed

- **`@mauvezero/azpipe-cli`** (`azpipe bootstrap`): templates referenced by the source `azure-pipelines.yml` are now recursively converted to TypeScript and written alongside the entry file. Previously `loadTemplate` always returned `undefined` and `emitTemplates` was `false`, so template imports were emitted but the corresponding `.ts` files were never created.
- **`@mauvezero/azpipe-cli`** (`azpipe bootstrap`): extracted script files (`scripts/*.sh`, `scripts/*.ps1`) are now written to the output directory. The bootstrap previously discarded all `result.files` entries beyond the first one.
- **`@mauvezero/azpipe-convert`**: `include()` calls in generated TypeScript no longer pass `import.meta.url` as the second argument. The argument is optional, and emitting it caused TypeScript errors in repositories configured for CommonJS or pre-ES2020 targets.
- **`@mauvezero/azpipe`**: `job()` and `JobBuilder` now accept `null` as the job name. Azure DevOps allows unnamed jobs (`job: ~`); the previous `string`-only type caused type errors in code converted from such pipelines.
- **`@mauvezero/azpipe-convert`**: task inputs are now resolved from their YAML-friendly alias names to the canonical task.json names expected by the typed factory interfaces (e.g. `azureSubscription` → `connectedServiceNameARM` for `AzureCLI@2`). Service-connection inputs are additionally wrapped in their branded factory call (e.g. `azureRMConnection('...')`). This mirrors the alias-resolution logic already present in the template emitter.
- **`@mauvezero/azpipe-tasks`** (generator): task input fields that are `required: true` but carry a non-empty `defaultValue` are now emitted as optional (`?`) in the TypeScript interface. Azure DevOps applies the default when the field is omitted, so callers should not be forced to supply it (e.g. `versioningScheme` on `DotNetCoreCLI@2`). Re-run `pnpm sync-tasks` to apply to the generated files.
- **`@mauvezero/azpipe-convert`**: `$(Build.Repository.Name)` and other predefined variables whose `PreDef` key contains a dot are now emitted with bracket notation (`PreDef.Pipeline.Build["Repository.Name"]`) instead of the invalid dot-notation path (`PreDef.Pipeline.Build.Repository.Name`).

## [0.5.0] - 2026-05-06

### Added

- **`@mauvezero/azpipe-convert`**: `ghaToTs(yamlText, opts?)` — converts a GitHub Actions workflow YAML file to TypeScript using the `@mauvezero/ghactions` and `@mauvezero/ghactions-actions` fluent builders. Known actions (e.g. `actions/checkout@v6`) are emitted as typed factory calls; unknown refs fall back to `uses()`. Supports all common workflow and job fields: triggers, `env`, `concurrency`, `permissions`, `defaults`, `runs-on`, `needs`, `if_`, `strategy`, `container`, `services`, `outputs`, step `name`/`if`/`env`/`with`/`continue-on-error`/`working-directory`/`shell`. Emits a single `workflow.ts` file.

- **`@mauvezero/azpipe-cli`**: `azpipe gha import <workflow.yml>` — new subcommand that wraps `ghaToTs` for use from the command line. Options: `-o/--out <file>` (default: `workflow.ts`), `--no-prettier`.

- **`@mauvezero/ghactions-actions`** _(new package)_: Auto-generated type-safe wrappers for known GitHub Actions. Covers all 40+ public repositories in the `actions/` GitHub org that publish versioned releases, plus a curated set of popular third-party actions (`docker/*`, `aws-actions/*`, `azure/*`, `hashicorp/setup-terraform`, `google-github-actions/*`, `softprops/action-gh-release`, `codecov/codecov-action`, `peter-evans/create-pull-request`, `EndBug/add-and-commit`, `sigstore/cosign-installer`). Each wrapper is a typed factory function (e.g. `actionsCheckoutV6(inputs?, opts?)`) that returns a `UsesStep` with the pinned `uses:` ref and a typed `with:` block. Regenerate with `pnpm sync-actions` (set `GITHUB_TOKEN` to avoid rate limits).

- **`@mauvezero/ghactions`** _(new package)_: Typesafe fluent builder for GitHub Actions workflow YAML. Entry point is `workflow()` which returns a `WorkflowBuilder`. Supports all common triggers (`push`, `pull_request`, `schedule`, `workflow_dispatch`, `workflow_call`, `release`), job-level settings (`runsOn`, `needs`, `if_`, `env`, `environment`, `concurrency`, `permissions`, `outputs`, `strategy`, `continueOnError`, `timeoutMinutes`, `container`, `services`, `defaults`), and step factories `run()` (shell command) and `uses()` (action reference) with full per-step option coverage. Serializes to YAML via `.toYaml()`.
- **`@mauvezero/azpipe-cli`**: `azpipe build` now auto-detects a `WorkflowBuilder` default export and routes to GitHub Actions serialization. Default output path is `.github/workflows/<slug>.yml` (derived from the workflow name); override with `--out`. Azure Pipelines behaviour is unchanged.

- **`@mauvezero/azpipe`**: `include(relativePath, baseUrl)` — reads a script file synchronously and returns its contents as a string. Pass `import.meta.url` as `baseUrl` so the path resolves relative to the calling TypeScript file regardless of the working directory. Useful in generated pipeline/release files to keep large scripts out of the TypeScript source.
- **`@mauvezero/azpipe-convert`**: `azpipe build import` and `azpipe release import` now extract multiline inline scripts to external files in a `scripts/` subdirectory alongside the generated TypeScript. The entry file references each script via `include('./scripts/…', import.meta.url)` instead of embedding a template literal. Single-line scripts remain inline. Script filenames are derived from the step's `displayName` (kebab-cased), with a `script-N` fallback when no display name is present. Files with identical content are deduplicated to a single path. Applies to `script`, `bash`, `pwsh`, `powershell` steps and to multiline task input values (e.g. `CmdLine@2`, `PowerShell@2`, `AzurePowerShell`). Extension is `.sh` for shell steps and `.ps1` for PowerShell-family tasks.
- **`@mauvezero/azpipe-releases-client`**: `getToken()` now auto-detects the `SYSTEM_ACCESSTOKEN` environment variable set by Azure Pipelines and uses it directly as a Bearer token, bypassing `DefaultAzureCredential`. No service principal or service connection required when running as a pipeline job — grant the pipeline's build service account (`<project> Build Service (<org>)`) the **Release Definition Contributor** permission instead. The new `SystemAccessTokenCredential` class is also exported for explicit use.
- **`@mauvezero/azpipe-cli`**: `release-sync.yml` generated by `azpipe bootstrap` now authenticates via `SYSTEM_ACCESSTOKEN` (`$(System.AccessToken)`). The banner comment guides the user to grant `<project> Build Service (<org>)` the **Release Definition Contributor** permission after registering the pipeline — no service principal, client secret, or service connection needed.

## [0.4.0] - 2026-05-06

### Added

- **`@mauvezero/azpipe-cli`**: `azpipe bootstrap` command — scaffolds a `pipelines/` directory in the current git repo with a `package.json` (build/diff/push scripts), `tsconfig.json`, `README.md`, a CI pipeline stub (`azure-pipelines.ts`, or converted from an existing root `azure-pipelines.yml`), a release pipeline stub (`release.ts`), and a `release-sync.yml` YAML pipeline that diffs on PRs and pushes on the default branch. Detects org, project, and default branch from environment variables and the git remote URL. Supports `--yes` for non-interactive / `npx` usage.

## [0.3.0] - 2026-05-06

### Added

- **`@mauvezero/azpipe`**: `DownloadStep.patterns` now accepts `string | string[]`. An array of globs is more idiomatic in TypeScript than a newline-delimited string.
- **`@mauvezero/azpipe-core`**: `toYaml` / `toJson` automatically join a `patterns: string[]` on download steps into the newline-delimited string Azure Pipelines expects, so both forms round-trip correctly.
- **`@mauvezero/azpipe-convert`**: YAML→TS conversion of `download` steps with more than one glob pattern now emits a `string[]` array instead of a raw newline-delimited template literal.

### Changed

- All packages renamed from `@mauve/*` to `@mauvezero/*` scope.

## [0.2.0] - 2026-05-05

### Added

- **`@mauvezero/azpipe`**: `.jobs(jobs)` method on `StageBuilder` for adding pre-built job objects.
- **`@mauvezero/azpipe`**: `.stages(stages)` and `.jobs(jobs)` methods on `PipelineBuilder` for adding pre-built stage/job objects.
- **`@mauvezero/azpipe-convert`**: `emitInlineTemplateSource()` — converts YAML templates to plain TypeScript functions returning `Step[]`/`AnyJob[]`/`AnyStage[]` instead of `defineTemplate`/`extend`.
- **`@mauvezero/azpipe-convert`**: Best-effort conversion of `${{ if eq(parameters.x, val) }}` array items to TypeScript conditional spreads (`...(x === val ? [...] : [])`).
- **`@mauvezero/azpipe-convert`**: Best-effort conversion of `${{ each item in parameters.list }}` to spread of the parameter array.
- **`@mauvezero/azpipe-convert`**: Inline template step transform — emits typed task factory calls (e.g. `azureCLIV2(...)`) instead of raw `{ task: 'AzureCLI@2' }` object literals, with YAML input alias resolution and branded service-connection parameter types.
- **`@mauvezero/azpipe-convert`**: Script-like steps (`bash`, `script`, `pwsh`, `powershell`) and `checkout` steps in templates are emitted as builder function calls.
- **`@mauvezero/azpipe-tasks`**: `taskConnectionInputs` metadata export mapping task refs to their connection-typed inputs.
- **`@mauvezero/azpipe-cli`**: `--no-inline-templates` flag on `azpipe build import` to opt out of inline function emission and use the legacy `defineTemplate`/`extend` output.

### Changed

- **`@mauvezero/azpipe-convert`**: `azpipe build import` now emits templates as plain TS functions by default. Call sites use `.steps(fn())`, `.jobs(fn())`, `.stages(fn())` instead of `.jobTemplate(extend(tpl, params))`.
- **`@mauvezero/azpipe-convert`**: Templates with complex `${{ }}` expressions that can't be converted (e.g. `${{ if }}` in non-array object keys) are still emitted as functions but include a `// TODO` comment and a CLI warning.

### Fixed

- **`@mauvezero/azpipe-convert`**: Fixed template file path generation when importing YAML files to a different output directory.

### Removed

## [0.1.0] - 2026-05-05

Initial release. Nine packages covering Azure Pipelines (YAML) authoring,
Classic Releases authoring + REST client, predefined-variable symbols, the
diff engine, the YAML/JSON-to-TS converter, and the `azpipe` CLI.

### Packages

- `@mauvezero/azpipe-core` — schema, validator, YAML/JSON serializer.
- `@mauvezero/azpipe` — fluent `pipeline()` builder + step factories.
- `@mauvezero/azpipe-utils` — `defineTemplate` / `extend`, identity-aware diff engine, `PreDef` predefined-variable symbols.
- `@mauvezero/azpipe-tasks` — typed function per non-deprecated task in `microsoft/azure-pipelines-tasks` (~150 helpers).
- `@mauvezero/azpipe-releases` — typed builder for Azure DevOps Classic Release definitions.
- `@mauvezero/azpipe-releases-client` — REST client (Entra auth, get/list/put, diff-first push, queue-name resolution).
- `@mauvezero/azpipe-convert` — convert existing `azure-pipelines.yml` files and Classic Release JSON definitions into TypeScript that uses the fluent builders. Predefined-variable strings (`$(Build.SourceBranch)`) are rewritten to `PreDef.*` references; marketplace tasks resolve to typed factories from `@mauvezero/azpipe-tasks` when known (raw `task(...)` fallback otherwise); referenced YAML templates are emitted as sibling `defineTemplate(...)` files. Exposed as `yamlToTs(text, opts)` and `releaseJsonToTs(def, opts)` library functions, and via the CLI as `azpipe build import <yaml>` and `azpipe release import <json|--name X>`.
- `@mauvezero/custom` — Mauve-only helpers (CalendarGate gate).
- `@mauvezero/azpipe-cli` — `azpipe build`, `azpipe build import`, `azpipe release {get,diff,push,import}` commands.
