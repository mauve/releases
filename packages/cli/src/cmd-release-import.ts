import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import { releaseJsonToTs } from '@mauvezero/azpipe-convert';
import { ReleaseClient } from '@mauvezero/azpipe-releases-client';
import type { ReleaseDefinition } from '@mauvezero/azpipe-releases';

interface ImportOpts {
  inputFile: string;
  name: string;
  org: string;
  project: string;
  out: string;
  resolveQueues: boolean;
  prettier: boolean;
  help: boolean;
}

function parseArgs(argv: string[]): ImportOpts {
  const opts: ImportOpts = {
    inputFile: '',
    name: '',
    org: process.env['AZURE_DEVOPS_ORG'] ?? '',
    project: process.env['AZURE_DEVOPS_PROJECT'] ?? '',
    out: 'release.ts',
    resolveQueues: false,
    prettier: true,
    help: false,
  };
  const positional: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === '-h' || a === '--help') opts.help = true;
    else if (a === '--name') opts.name = argv[++i] ?? '';
    else if (a === '--org') opts.org = argv[++i] ?? opts.org;
    else if (a === '--project') opts.project = argv[++i] ?? opts.project;
    else if (a === '--out' || a === '-o') opts.out = argv[++i] ?? opts.out;
    else if (a === '--resolve-queues') opts.resolveQueues = true;
    else if (a === '--no-prettier') opts.prettier = false;
    else if (a.startsWith('-')) throw new Error(`Unknown flag: ${a}`);
    else positional.push(a);
  }
  if (positional[0]) opts.inputFile = positional[0];
  return opts;
}

function usage(): void {
  console.log(`azpipe release import <input.json> [options]
azpipe release import --name <name> --org <org> --project <project> [options]

Convert an existing classic-release JSON definition to TypeScript using
@mauve/azpipe-releases builders. Either pass a JSON file (typically
exported via \`azpipe release get\`) or fetch live by name.

Options:
  -o, --out <file>         Entry output file (default: release.ts)
      --name <n>           Definition name (live fetch)
      --org <o>            Azure DevOps org   (live fetch; or AZURE_DEVOPS_ORG)
      --project <p>        Project            (live fetch; or AZURE_DEVOPS_PROJECT)
      --resolve-queues     Resolve queueId→name via REST so pools render by name
      --no-prettier        Skip Prettier formatting
  -h, --help               Show this help`);
}

function ensureDir(filePath: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
}

export async function runReleaseImport(argv: string[]): Promise<void> {
  const opts = parseArgs(argv);
  if (opts.help) {
    usage();
    return;
  }
  if (!opts.inputFile && !opts.name) {
    console.error('Provide either an input JSON file or --name (with --org and --project).');
    usage();
    process.exit(2);
  }
  if (opts.name && (!opts.org || !opts.project)) {
    console.error('Live fetch requires both --org and --project (or AZURE_DEVOPS_ORG / AZURE_DEVOPS_PROJECT).');
    process.exit(2);
  }

  let def: ReleaseDefinition;
  let org = opts.org;
  let project = opts.project;
  let queueResolver: ((id: number) => string | undefined) | undefined;

  if (opts.inputFile) {
    const abs = isAbsolute(opts.inputFile) ? opts.inputFile : resolve(process.cwd(), opts.inputFile);
    if (!existsSync(abs)) {
      console.error(`Input file not found: ${abs}`);
      process.exit(1);
    }
    def = JSON.parse(readFileSync(abs, 'utf8')) as ReleaseDefinition;
    if (!org) org = process.env['AZURE_DEVOPS_ORG'] ?? '';
    if (!project) project = def['projectReference']?.name ?? process.env['AZURE_DEVOPS_PROJECT'] ?? '';
    if (opts.resolveQueues && org && project) {
      const client = new ReleaseClient({ org, project });
      const queues = await listQueuesSafe(client);
      queueResolver = (id) => queues.get(id);
    }
  } else {
    const client = new ReleaseClient({ org, project });
    const fetched = await client.getDefinitionByName(opts.name);
    if (!fetched) {
      console.error(`Release definition not found: ${opts.name}`);
      process.exit(1);
    }
    def = fetched;
    if (opts.resolveQueues) {
      const queues = await listQueuesSafe(client);
      queueResolver = (id) => queues.get(id);
    }
  }

  if (!org || !project) {
    console.error('Could not determine org/project. Pass --org and --project.');
    process.exit(2);
  }

  const result = await releaseJsonToTs(def, {
    org,
    project,
    prettier: opts.prettier,
    entryFileName: opts.out,
    ...(queueResolver ? { resolveQueueNames: queueResolver } : {}),
  });

  const outAbs = isAbsolute(opts.out) ? opts.out : resolve(process.cwd(), opts.out);
  ensureDir(outAbs);
  writeFileSync(outAbs, result.files[0]!.contents);
  console.log(`Wrote ${outAbs}`);
}

async function listQueuesSafe(client: ReleaseClient): Promise<Map<number, string>> {
  const queues = await client.listQueues();
  const m = new Map<number, string>();
  for (const q of queues) m.set(q.id, q.name);
  return m;
}
