import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { yamlToTs } from '@mauve/azpipe-convert';

interface ImportOpts {
  input: string;
  out: string;
  templatesDir: string;
  emitTemplates: boolean;
  prettier: boolean;
  inlineTemplates: boolean;
  help: boolean;
}

function parseArgs(argv: string[]): ImportOpts {
  const opts: ImportOpts = {
    input: '',
    out: 'pipeline.ts',
    templatesDir: '',
    emitTemplates: true,
    prettier: true,
    inlineTemplates: true,
    help: false,
  };
  const positional: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === '-h' || a === '--help') opts.help = true;
    else if (a === '--out' || a === '-o') opts.out = argv[++i] ?? opts.out;
    else if (a === '--templates-dir') opts.templatesDir = argv[++i] ?? '';
    else if (a === '--no-templates') opts.emitTemplates = false;
    else if (a === '--no-prettier') opts.prettier = false;
    else if (a === '--no-inline-templates') opts.inlineTemplates = false;
    else if (a.startsWith('-')) throw new Error(`Unknown flag: ${a}`);
    else positional.push(a);
  }
  if (positional[0]) opts.input = positional[0];
  return opts;
}

function usage(): void {
  console.log(`azpipe build import <azure-pipelines.yml> [options]

Convert an existing Azure Pipelines YAML file to TypeScript that uses
@mauve/azpipe builders.

Options:
  -o, --out <file>         Entry output file (default: pipeline.ts)
      --templates-dir <d>  Output directory for converted templates
                           (default: dirname(--out)/templates)
      --no-templates       Don't recursively convert template:/extends: files
      --no-inline-templates Emit defineTemplate/extend instead of plain functions
      --no-prettier        Skip Prettier formatting
  -h, --help               Show this help`);
}

function ensureDir(filePath: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
}

export async function runBuildImport(argv: string[]): Promise<void> {
  const opts = parseArgs(argv);
  if (opts.help) {
    usage();
    return;
  }
  if (!opts.input) {
    console.error('Missing input YAML path.');
    usage();
    process.exit(2);
  }
  const inputAbs = isAbsolute(opts.input) ? opts.input : resolve(process.cwd(), opts.input);
  if (!existsSync(inputAbs)) {
    console.error(`Input file not found: ${inputAbs}`);
    process.exit(1);
  }
  const yamlText = readFileSync(inputAbs, 'utf8');
  const inputDir = dirname(inputAbs);

  const outAbs = isAbsolute(opts.out) ? opts.out : resolve(process.cwd(), opts.out);
  const outDir = dirname(outAbs);

  // Relative path from input dir to output dir — used to rebase template paths.
  const outputDirRel = relative(inputDir, outDir) || '.';

  const result = await yamlToTs(yamlText, {
    prettier: opts.prettier,
    emitTemplates: opts.emitTemplates,
    inlineTemplates: opts.inlineTemplates,
    entryFileName: opts.out,
    outputDir: outputDirRel,
    loadTemplate: (templatePath) => {
      const at = templatePath.indexOf('@');
      if (at >= 0) return undefined; // template@repo refers to another repo — skip
      const tplAbs = resolve(inputDir, templatePath);
      if (!existsSync(tplAbs)) return undefined;
      return readFileSync(tplAbs, 'utf8');
    },
  });

  for (const w of result.warnings) {
    console.error(`warning: ${w}`);
  }

  // Write entry file.
  ensureDir(outAbs);
  writeFileSync(outAbs, result.files[0]!.contents);
  console.log(`Wrote ${outAbs}`);

  // Write any template files. result.files[0] is the entry; the rest are
  // templates with relative `path` like `'templates/foo.ts'`.
  for (const file of result.files.slice(1)) {
    const targetDir = opts.templatesDir
      ? resolve(opts.templatesDir, file.path.replace(/^templates\//, ''))
      : resolve(outDir, file.path);
    ensureDir(targetDir);
    writeFileSync(targetDir, file.contents);
    console.log(`Wrote ${targetDir}`);
    void join;
  }
}
