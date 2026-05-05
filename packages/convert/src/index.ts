/**
 * `@mauvezero/azpipe-convert` — convert existing `azure-pipelines.yml` files
 * and Azure DevOps Classic Release definitions into TypeScript that uses the
 * `@mauvezero/azpipe` and `@mauvezero/azpipe-releases` builders.
 *
 * Two entry points:
 * - {@link yamlToTs} — accepts YAML text and returns one TS source per file
 *   (entry plus zero or more sibling template files when the YAML uses
 *   `template:` / `extends:` references).
 * - {@link releaseJsonToTs} — accepts a parsed `ReleaseDefinition` and returns
 *   a single TS source. The CLI layer wraps either reading from a JSON file or
 *   fetching live via the REST client.
 *
 * The library is pure: no fs / network. The CLI in `@mauvezero/azpipe-cli`
 * adds file IO and the live-fetch path for releases.
 *
 * @packageDocumentation
 */

import type { ReleaseDefinition } from '@mauvezero/azpipe-releases';
import { posix as path } from 'node:path';
import { parsePipelineYaml, type ParseOptions } from './yaml/parse.js';
import { emitPipelineSource, type ReferencedTemplate } from './yaml/emit.js';
import { emitTemplateSource, emitInlineTemplateSource } from './yaml/templates.js';
import { stripServerFields } from './release/parse.js';
import { emitReleaseSource, type ReleaseEmitOptions } from './release/emit.js';
import { formatTs } from './codegen/prettier.js';

export interface ConvertedFile {
  /** Path the file should be written to, relative to the entry. */
  path: string;
  contents: string;
}

export interface ConvertResult {
  files: ConvertedFile[];
  /** Validation warnings surfaced during parsing (empty in the happy path). */
  warnings: string[];
}

export interface YamlConvertOptions extends ParseOptions {
  /** Run Prettier on emitted files. Default: true. */
  prettier?: boolean;
  /**
   * Resolve `template:` references to their YAML source. Pass a function
   * that receives the path as written in the YAML and returns the raw YAML
   * text. Return `undefined` to skip template emission for that ref (the
   * converter will emit a TODO stub instead).
   */
  loadTemplate?: (templatePath: string) => string | undefined;
  /** When false, do not recursively emit template files (TODO stubs only).
   *  Default: true (when a `loadTemplate` callback is provided). */
  emitTemplates?: boolean;
  /** Output filename for the entry pipeline. Default: `'pipeline.ts'`. */
  entryFileName?: string;
  /**
   * When true (default), templates are converted to plain TS functions
   * returning `Step[]`/`Job[]`/`Stage[]`. When false, uses the legacy
   * `defineTemplate`/`extend` pattern.
   */
  inlineTemplates?: boolean;
  /**
   * Relative path from the input YAML directory to the output entry directory.
   * Used to rebase template paths so imports are correct relative to the
   * output entry. Default: `'.'` (same directory).
   *
   * For example, if YAML is at `repo/azure-pipelines.yml` and output is
   * `repo/pipelines/pipeline.ts`, pass `'pipelines'`.
   */
  outputDir?: string;
}

export interface ReleaseConvertLibraryOptions extends ReleaseEmitOptions {
  prettier?: boolean;
  /** Output filename. Default: `'release.ts'`. */
  entryFileName?: string;
}

/**
 * Convert YAML pipeline text to TypeScript.
 *
 * The result includes the entry file and one TypeScript file per referenced
 * template (when {@link YamlConvertOptions.emitTemplates} is true and a
 * {@link YamlConvertOptions.loadTemplate} resolver was provided).
 */
export async function yamlToTs(
  yamlText: string,
  opts: YamlConvertOptions = {},
): Promise<ConvertResult> {
  const { pipeline, warnings } = parsePipelineYaml(yamlText, opts);
  const outputDir = opts.outputDir ?? '.';
  const inlineTemplates = opts.inlineTemplates ?? true;
  const { source, referencedTemplates } = emitPipelineSource(pipeline, { outputDir, inlineTemplates });
  const files: ConvertedFile[] = [];
  const entryName = opts.entryFileName ?? 'pipeline.ts';
  files.push({ path: entryName, contents: await maybeFormat(source, opts.prettier) });

  const emitTemplates = opts.emitTemplates ?? true;
  if (emitTemplates && opts.loadTemplate) {
    for (const ref of referencedTemplates) {
      const yamlSrc = opts.loadTemplate(ref.templatePath);
      if (yamlSrc === undefined) continue;
      const input = {
        referencePath: ref.templatePath,
        identifier: ref.identifier,
        yamlText: yamlSrc,
        kind: ref.kind,
      };
      let tFile;
      if (inlineTemplates) {
        const result = emitInlineTemplateSource(input);
        if (result.hasComplexExpressions) {
          console.error(`warning: template ${ref.templatePath} has complex expressions that need manual conversion`);
        }
        tFile = result;
      } else {
        tFile = emitTemplateSource(input);
      }
      // Rebase template file path from input-relative to output-relative.
      const rebasedPath = rebasePath(tFile.filePath, outputDir);
      files.push({
        path: rebasedPath,
        contents: await maybeFormat(tFile.source, opts.prettier),
      });
    }
  }
  return { files, warnings };
}

/**
 * Convert a classic-release {@link ReleaseDefinition} JSON object to
 * TypeScript.
 *
 * Strips server-managed audit fields (`id`, `revision`, timestamps, etc.) so
 * the emitted TS is suitable for `azpipe release diff` / `release push`
 * round-trips.
 */
export async function releaseJsonToTs(
  def: ReleaseDefinition,
  opts: ReleaseConvertLibraryOptions,
): Promise<ConvertResult> {
  const cleaned = stripServerFields(def);
  const { source } = emitReleaseSource(cleaned, opts);
  const entryName = opts.entryFileName ?? 'release.ts';
  return {
    files: [{ path: entryName, contents: await maybeFormat(source, opts.prettier) }],
    warnings: [],
  };
}

async function maybeFormat(source: string, prettier?: boolean): Promise<string> {
  if (prettier === false) return source;
  return formatTs(source);
}

/** Rebase a path from input-YAML-relative to output-entry-relative. */
function rebasePath(filePath: string, outputDir: string): string {
  if (outputDir === '.') return filePath;
  return path.relative(outputDir, filePath);
}

export { stripServerFields } from './release/parse.js';
export type { ReferencedTemplate };
