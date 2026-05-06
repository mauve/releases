import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import { ghaToTs } from '@mauvezero/azpipe-convert';

interface GhaImportOpts {
  input: string;
  out: string;
  prettier: boolean;
  help: boolean;
}

function parseArgs(argv: string[]): GhaImportOpts {
  const opts: GhaImportOpts = {
    input: '',
    out: 'workflow.ts',
    prettier: true,
    help: false,
  };
  const positional: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === '-h' || a === '--help') opts.help = true;
    else if (a === '--out' || a === '-o') opts.out = argv[++i] ?? opts.out;
    else if (a === '--no-prettier') opts.prettier = false;
    else if (a.startsWith('-')) throw new Error(`Unknown flag: ${a}`);
    else positional.push(a);
  }
  if (positional[0]) opts.input = positional[0];
  return opts;
}

function usage(): void {
  console.log(`azpipe gha import <workflow.yml> [options]

Convert an existing GitHub Actions workflow YAML file to TypeScript that uses
@mauvezero/ghactions and @mauvezero/ghactions-actions builders.

Options:
  -o, --out <file>    Entry output file (default: workflow.ts)
      --no-prettier   Skip Prettier formatting
  -h, --help          Show this help`);
}

function ensureDir(filePath: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
}

export async function runGhaImport(argv: string[]): Promise<void> {
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
  const outAbs = isAbsolute(opts.out) ? opts.out : resolve(process.cwd(), opts.out);

  const result = await ghaToTs(yamlText, {
    prettier: opts.prettier,
    entryFileName: opts.out,
  });

  for (const w of result.warnings) {
    console.error(`warning: ${w}`);
  }

  ensureDir(outAbs);
  writeFileSync(outAbs, result.files[0]!.contents);
  console.log(`Wrote ${outAbs}`);
}

export async function runGha(argv: string[]): Promise<void> {
  const sub = argv[0];
  if (!sub || sub === '-h' || sub === '--help') {
    console.log(`azpipe gha <subcommand> [options]

Subcommands:
  import <workflow.yml>   Convert a GitHub Actions workflow to TypeScript

Run \`azpipe gha <subcommand> --help\` for subcommand-specific options.`);
    return;
  }
  if (sub === 'import') {
    await runGhaImport(argv.slice(1));
    return;
  }
  console.error(`Unknown gha subcommand: ${sub}`);
  process.exit(2);
}
