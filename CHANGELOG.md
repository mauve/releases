# Changelog

All notable changes to the `@mauve/azpipe-*` packages.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

All packages share a single version: a release tag `vX.Y.Z` bumps every
package to `X.Y.Z` together.

## [Unreleased]

### Added

- **`@mauve/azpipe`**: `.jobs(jobs)` method on `StageBuilder` for adding pre-built job objects.
- **`@mauve/azpipe`**: `.stages(stages)` and `.jobs(jobs)` methods on `PipelineBuilder` for adding pre-built stage/job objects.
- **`@mauve/azpipe-convert`**: `emitInlineTemplateSource()` — converts YAML templates to plain TypeScript functions returning `Step[]`/`AnyJob[]`/`AnyStage[]` instead of `defineTemplate`/`extend`.
- **`@mauve/azpipe-convert`**: Best-effort conversion of `${{ if eq(parameters.x, val) }}` array items to TypeScript conditional spreads (`...(x === val ? [...] : [])`).
- **`@mauve/azpipe-convert`**: Best-effort conversion of `${{ each item in parameters.list }}` to spread of the parameter array.
- **`@mauve/azpipe-convert`**: Inline template step transform — emits typed task factory calls (e.g. `azureCLIV2(...)`) instead of raw `{ task: 'AzureCLI@2' }` object literals, with YAML input alias resolution and branded service-connection parameter types.
- **`@mauve/azpipe-convert`**: Script-like steps (`bash`, `script`, `pwsh`, `powershell`) and `checkout` steps in templates are emitted as builder function calls.
- **`@mauve/azpipe-tasks`**: `taskConnectionInputs` metadata export mapping task refs to their connection-typed inputs.
- **`@mauve/azpipe-cli`**: `--no-inline-templates` flag on `azpipe build import` to opt out of inline function emission and use the legacy `defineTemplate`/`extend` output.

### Changed

- **`@mauve/azpipe-convert`**: `azpipe build import` now emits templates as plain TS functions by default. Call sites use `.steps(fn())`, `.jobs(fn())`, `.stages(fn())` instead of `.jobTemplate(extend(tpl, params))`.
- **`@mauve/azpipe-convert`**: Templates with complex `${{ }}` expressions that can't be converted (e.g. `${{ if }}` in non-array object keys) are still emitted as functions but include a `// TODO` comment and a CLI warning.

### Fixed

- **`@mauve/azpipe-convert`**: Fixed template file path generation when importing YAML files to a different output directory.

### Removed

## [0.1.0] - 2026-05-05

Initial release. Nine packages covering Azure Pipelines (YAML) authoring,
Classic Releases authoring + REST client, predefined-variable symbols, the
diff engine, the YAML/JSON-to-TS converter, and the `azpipe` CLI.

### Packages

- `@mauve/azpipe-core` — schema, validator, YAML/JSON serializer.
- `@mauve/azpipe` — fluent `pipeline()` builder + step factories.
- `@mauve/azpipe-utils` — `defineTemplate` / `extend`, identity-aware diff engine, `PreDef` predefined-variable symbols.
- `@mauve/azpipe-tasks` — typed function per non-deprecated task in `microsoft/azure-pipelines-tasks` (~150 helpers).
- `@mauve/azpipe-releases` — typed builder for Azure DevOps Classic Release definitions.
- `@mauve/azpipe-releases-client` — REST client (Entra auth, get/list/put, diff-first push, queue-name resolution).
- `@mauve/azpipe-convert` — convert existing `azure-pipelines.yml` files and Classic Release JSON definitions into TypeScript that uses the fluent builders. Predefined-variable strings (`$(Build.SourceBranch)`) are rewritten to `PreDef.*` references; marketplace tasks resolve to typed factories from `@mauve/azpipe-tasks` when known (raw `task(...)` fallback otherwise); referenced YAML templates are emitted as sibling `defineTemplate(...)` files. Exposed as `yamlToTs(text, opts)` and `releaseJsonToTs(def, opts)` library functions, and via the CLI as `azpipe build import <yaml>` and `azpipe release import <json|--name X>`.
- `@mauve/custom` — Mauve-only helpers (CalendarGate gate).
- `@mauve/azpipe-cli` — `azpipe build`, `azpipe build import`, `azpipe release {get,diff,push,import}` commands.
