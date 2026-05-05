import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import { stringify as yamlStringify } from 'yaml';
import { toYaml, toJson, validatePipeline, formatValidationErrors } from '@mauve/azpipe-core';
import { PipelineBuilder } from '@mauve/azpipe';
import {
  renderTemplateFile,
  type TemplateDefinition,
  type ParamShape,
  type TemplateKind,
} from '@mauve/azpipe-utils';
import { loadEntry } from './loader.js';

interface BuildOpts {
  entry: string;
  out: string;
  format: 'yaml' | 'json';
  validate: boolean;
  templatesDir: string;
  help: boolean;
}

interface BuildEntry {
  default: PipelineBuilder | Record<string, unknown>;
  templates?: TemplateDefinition<ParamShape, TemplateKind>[];
}

function parseArgs(argv: string[]): BuildOpts {
  const opts: BuildOpts = {
    entry: '',
    out: 'azure-pipelines.yml',
    format: 'yaml',
    validate: true,
    templatesDir: '',
    help: false,
  };
  const positional: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === '-h' || a === '--help') opts.help = true;
    else if (a === '--out' || a === '-o') opts.out = argv[++i] ?? opts.out;
    else if (a === '--format' || a === '-f') {
      const v = argv[++i];
      if (v !== 'yaml' && v !== 'json') throw new Error(`--format must be yaml or json, got ${v}`);
      opts.format = v;
    } else if (a === '--no-validate') opts.validate = false;
    else if (a === '--templates-dir') opts.templatesDir = argv[++i] ?? '';
    else if (a.startsWith('-')) throw new Error(`Unknown flag: ${a}`);
    else positional.push(a);
  }
  if (positional[0]) opts.entry = positional[0];
  return opts;
}

function usage(): void {
  console.log(`azpipe build <entry.ts> [options]

Compiles a TypeScript file that default-exports a PipelineBuilder (or plain
pipeline object) into azure-pipelines.yml.

Options:
  -o, --out <file>         Output file (default: azure-pipelines.yml)
  -f, --format yaml|json   Output format (default: yaml)
      --no-validate        Skip schema validation
      --templates-dir <d>  Override directory for emitted typed templates
                           (default: dirname(--out)/templates)
  -h, --help               Show this help`);
}

function pipelineObject(value: PipelineBuilder | Record<string, unknown>): Record<string, unknown> {
  if (value instanceof PipelineBuilder) return value.toObject() as Record<string, unknown>;
  return value;
}

function ensureDir(filePath: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
}

function emitTemplate(
  outRoot: string,
  templatesDir: string,
  def: TemplateDefinition<ParamShape, TemplateKind>,
): string {
  const fileRel = def.path;
  const overridden = templatesDir
    ? resolve(templatesDir, fileRel.replace(/^templates\//, ''))
    : resolve(outRoot, fileRel);
  ensureDir(overridden);
  const obj = renderTemplateFile(def);
  writeFileSync(overridden, yamlStringify(obj, { indent: 2, lineWidth: 0 }));
  return overridden;
}

export async function runBuild(argv: string[]): Promise<void> {
  const opts = parseArgs(argv);
  if (opts.help) {
    usage();
    return;
  }
  if (!opts.entry) {
    console.error('Missing entry file.');
    usage();
    process.exit(2);
  }

  const mod = await loadEntry<BuildEntry>(opts.entry);
  if (!mod.default) throw new Error(`Entry ${opts.entry} must default-export a pipeline.`);
  const obj = pipelineObject(mod.default);

  if (opts.validate) {
    const result = validatePipeline(obj);
    if (!result.ok) {
      console.error('Pipeline failed schema validation:');
      console.error(formatValidationErrors(result.errors));
      process.exit(1);
    }
  }

  const outAbs = isAbsolute(opts.out) ? opts.out : resolve(process.cwd(), opts.out);
  const outRoot = dirname(outAbs);
  ensureDir(outAbs);

  const serialized =
    opts.format === 'yaml' ? toYaml(obj, { validate: false }) : toJson(obj, { validate: false });
  writeFileSync(outAbs, serialized);
  console.log(`Wrote ${outAbs}`);

  for (const t of mod.templates ?? []) {
    const written = emitTemplate(outRoot, opts.templatesDir, t);
    console.log(`Wrote ${written}`);
  }
}
