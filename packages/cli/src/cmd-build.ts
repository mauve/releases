import { writeFileSync, mkdirSync } from 'node:fs';
import { basename, dirname, extname, isAbsolute, resolve } from 'node:path';
import { stringify as yamlStringify } from 'yaml';
import { toYaml, toJson, validatePipeline, formatValidationErrors } from '@mauvezero/azpipe-core';
import { PipelineBuilder } from '@mauvezero/azpipe';
import { WorkflowBuilder } from '@mauvezero/ghactions';
import {
  renderTemplateFile,
  type TemplateDefinition,
  type ParamShape,
  type TemplateKind,
} from '@mauvezero/azpipe-utils';
import { loadEntry } from './loader.js';

interface BuildOpts {
  entry: string;
  out: string;
  format: 'yaml' | 'json';
  validate: boolean;
  templatesDir: string;
  help: boolean;
  /** When true, --out was explicitly provided and overrides the default. */
  outExplicit: boolean;
}

interface BuildEntry {
  default: PipelineBuilder | WorkflowBuilder | Record<string, unknown>;
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
    outExplicit: false,
  };
  const positional: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === '-h' || a === '--help') opts.help = true;
    else if (a === '--out' || a === '-o') {
      opts.out = argv[++i] ?? opts.out;
      opts.outExplicit = true;
    } else if (a === '--format' || a === '-f') {
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
pipeline object) into azure-pipelines.yml, or a WorkflowBuilder into a
GitHub Actions workflow YAML file.

Options:
  -o, --out <file>         Output file
                           Azure Pipelines default: azure-pipelines.yml
                           GitHub Actions default:  .github/workflows/<name>.yml
  -f, --format yaml|json   Output format (default: yaml; Azure Pipelines only)
      --no-validate        Skip schema validation (Azure Pipelines only)
      --templates-dir <d>  Override directory for emitted typed templates
                           (default: dirname(--out)/templates; Azure Pipelines only)
  -h, --help               Show this help`);
}

function pipelineObject(value: PipelineBuilder | Record<string, unknown>): Record<string, unknown> {
  if (value instanceof PipelineBuilder) return value.toObject() as Record<string, unknown>;
  return value;
}

/**
 * Derive a default output path for a GitHub Actions workflow.
 * If the builder has a name, slugify it; otherwise fall back to the entry
 * file stem. Always resolves under `.github/workflows/`.
 */
function defaultWorkflowOut(
  workflowName: string | undefined,
  entry: string,
): string {
  const slug = (workflowName ?? basename(entry, extname(entry)))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `.github/workflows/${slug || 'workflow'}.yml`;
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

  // ---------- GitHub Actions path ----------
  if (mod.default instanceof WorkflowBuilder) {
    const workflowObj = mod.default.toObject();
    const outPath = opts.outExplicit
      ? opts.out
      : defaultWorkflowOut(workflowObj.name, opts.entry);
    const outAbs = isAbsolute(outPath) ? outPath : resolve(process.cwd(), outPath);
    ensureDir(outAbs);
    writeFileSync(outAbs, mod.default.toYaml());
    console.log(`Wrote ${outAbs}`);
    return;
  }

  // ---------- Azure Pipelines path ----------
  const obj = pipelineObject(mod.default as PipelineBuilder | Record<string, unknown>);

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
