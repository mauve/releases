/**
 * `@mauve/azpipe-convert` — convert existing `azure-pipelines.yml` files
 * and Azure DevOps Classic Release definitions into TypeScript that uses the
 * `@mauve/azpipe` and `@mauve/azpipe-releases` builders.
 *
 * Two entry points:
 * - {@link yamlToTs} — accepts YAML text and returns one TS source per file
 *   (entry plus zero or more sibling template files when the YAML uses
 *   `template:` / `extends:` references).
 * - {@link releaseJsonToTs} — accepts a parsed `ReleaseDefinition` and returns
 *   a single TS source. The CLI layer wraps either reading from a JSON file or
 *   fetching live via the REST client.
 *
 * The library is pure: no fs / network. The CLI in `@mauve/azpipe-cli`
 * adds file IO and the live-fetch path for releases.
 *
 * @packageDocumentation
 */

import type { ReleaseDefinition } from '@mauve/azpipe-releases';
import { parsePipelineYaml, type ParseOptions } from './yaml/parse.js';
import { emitPipelineSource, type ReferencedTemplate } from './yaml/emit.js';
import { emitTemplateSource } from './yaml/templates.js';
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
  const { source, referencedTemplates } = emitPipelineSource(pipeline);
  const files: ConvertedFile[] = [];
  const entryName = opts.entryFileName ?? 'pipeline.ts';
  files.push({ path: entryName, contents: await maybeFormat(source, opts.prettier) });

  const emitTemplates = opts.emitTemplates ?? true;
  if (emitTemplates && opts.loadTemplate) {
    for (const ref of referencedTemplates) {
      const yamlSrc = opts.loadTemplate(ref.templatePath);
      if (yamlSrc === undefined) continue;
      const tFile = emitTemplateSource({
        referencePath: ref.templatePath,
        identifier: ref.identifier,
        yamlText: yamlSrc,
        kind: ref.kind,
      });
      files.push({
        path: tFile.filePath,
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

export { stripServerFields } from './release/parse.js';
export type { ReferencedTemplate };
