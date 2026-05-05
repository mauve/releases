import { writeFileSync } from 'node:fs';
import {
  ReleasePipelineBuilder,
  type ReleaseDefinition,
} from '@mauve/azpipe-releases';
import {
  ReleaseClient,
  diffAgainstServer,
  push as pushDefinition,
} from '@mauve/azpipe-releases-client';
import { unified } from '@mauve/azpipe-utils/diff';
import { loadEntry } from './loader.js';
import { runReleaseImport } from './cmd-release-import.js';

interface ReleaseEntry {
  default: ReleasePipelineBuilder | (ReleaseDefinition & { org: string; project: string });
}

function topUsage(): void {
  console.log(`azpipe release <subcommand>

Subcommands:
  get <name>             Fetch a release definition (writes JSON to stdout or --out)
  diff <entry.ts>        Show what \`push\` would change vs the server
  push <entry.ts>        Diff first, prompt to confirm, then PUT (interactive)
  import <json>          Convert a classic-release JSON definition to TypeScript

Run \`azpipe release <subcommand> --help\` for details.`);
}

export async function runRelease(argv: string[]): Promise<void> {
  const sub = argv[0];
  if (!sub || sub === '-h' || sub === '--help') {
    topUsage();
    return;
  }
  switch (sub) {
    case 'get':
      await runGet(argv.slice(1));
      return;
    case 'diff':
      await runDiff(argv.slice(1));
      return;
    case 'push':
      await runPush(argv.slice(1));
      return;
    case 'import':
      await runReleaseImport(argv.slice(1));
      return;
    default:
      console.error(`Unknown release subcommand: ${sub}`);
      topUsage();
      process.exit(2);
  }
}

// ---- get -------------------------------------------------------------

interface GetOpts {
  name: string;
  org: string;
  project: string;
  out: string;
  help: boolean;
}

function parseGet(argv: string[]): GetOpts {
  const opts: GetOpts = {
    name: '',
    org: process.env['AZURE_DEVOPS_ORG'] ?? '',
    project: process.env['AZURE_DEVOPS_PROJECT'] ?? '',
    out: '',
    help: false,
  };
  const positional: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === '-h' || a === '--help') opts.help = true;
    else if (a === '--org') opts.org = argv[++i] ?? opts.org;
    else if (a === '--project') opts.project = argv[++i] ?? opts.project;
    else if (a === '--out' || a === '-o') opts.out = argv[++i] ?? opts.out;
    else if (a.startsWith('-')) throw new Error(`Unknown flag: ${a}`);
    else positional.push(a);
  }
  if (positional[0]) opts.name = positional[0];
  return opts;
}

async function runGet(argv: string[]): Promise<void> {
  const opts = parseGet(argv);
  if (opts.help) {
    console.log(`azpipe release get <name> [--org X] [--project Y] [--out file.json]`);
    return;
  }
  if (!opts.name) {
    console.error('Missing release definition name.');
    process.exit(2);
  }
  if (!opts.org || !opts.project) {
    console.error(
      'Missing --org and/or --project. Set AZURE_DEVOPS_ORG / AZURE_DEVOPS_PROJECT or pass flags.',
    );
    process.exit(2);
  }
  const client = new ReleaseClient({ org: opts.org, project: opts.project });
  const def = await client.getDefinitionByName(opts.name);
  if (!def) {
    console.error(`Release definition not found: ${opts.name}`);
    process.exit(1);
  }
  const json = JSON.stringify(def, null, 2) + '\n';
  if (opts.out) {
    writeFileSync(opts.out, json);
    console.log(`Wrote ${opts.out}`);
  } else {
    process.stdout.write(json);
  }
}

// ---- diff / push helpers --------------------------------------------

async function loadReleaseEntry(entry: string): Promise<{
  definition: ReleaseDefinition;
  org: string;
  project: string;
}> {
  const mod = await loadEntry<ReleaseEntry>(entry);
  if (!mod.default) throw new Error(`Entry ${entry} must default-export a release pipeline.`);
  if (mod.default instanceof ReleasePipelineBuilder) {
    return {
      definition: mod.default.toDefinition(),
      org: mod.default.org,
      project: mod.default.project,
    };
  }
  const raw = mod.default;
  if (!raw.org || !raw.project || !raw.name) {
    throw new Error(
      `Entry ${entry} default export must include { org, project, name } (either via releasePipeline(...) or as fields on the plain object).`,
    );
  }
  // Strip the org/project local fields before returning the definition body.
  const { org, project, ...rest } = raw as ReleaseDefinition & { org: string; project: string };
  return { definition: rest as ReleaseDefinition, org, project };
}

// ---- diff ----------------------------------------------------------

async function runDiff(argv: string[]): Promise<void> {
  if (argv[0] === '-h' || argv[0] === '--help' || !argv[0]) {
    console.log(`azpipe release diff <entry.ts>`);
    if (!argv[0]) process.exit(2);
    return;
  }
  const { definition, org, project } = await loadReleaseEntry(argv[0]);
  const client = new ReleaseClient({ org, project });
  const { nodes } = await diffAgainstServer(definition, client);
  process.stdout.write(unified(nodes, { color: process.stdout.isTTY }));
  if (nodes.length === 0) process.stdout.write('No changes.\n');
  else process.exitCode = 1; // diff non-empty → non-zero, conventional for "drift detected"
}

// ---- push ----------------------------------------------------------

interface PushOpts {
  entry: string;
  yes: boolean;
  dryRun: boolean;
  help: boolean;
}

function parsePush(argv: string[]): PushOpts {
  const opts: PushOpts = { entry: '', yes: false, dryRun: false, help: false };
  const positional: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === '-h' || a === '--help') opts.help = true;
    else if (a === '--yes' || a === '-y') opts.yes = true;
    else if (a === '--dry-run') opts.dryRun = true;
    else if (a.startsWith('-')) throw new Error(`Unknown flag: ${a}`);
    else positional.push(a);
  }
  if (positional[0]) opts.entry = positional[0];
  return opts;
}

async function runPush(argv: string[]): Promise<void> {
  const opts = parsePush(argv);
  if (opts.help) {
    console.log(`azpipe release push <entry.ts> [--yes] [--dry-run]`);
    return;
  }
  if (!opts.entry) {
    console.error('Missing entry file.');
    process.exit(2);
  }
  const { definition, org, project } = await loadReleaseEntry(opts.entry);
  const client = new ReleaseClient({ org, project });
  const r = await pushDefinition(definition, {
    client,
    yes: opts.yes,
    dryRun: opts.dryRun,
    color: process.stdout.isTTY,
  });
  switch (r.reason) {
    case 'no-op':
      return;
    case 'dry-run':
      process.exitCode = 1;
      return;
    case 'declined':
      console.error('Aborted.');
      process.exitCode = 1;
      return;
    case 'applied':
      console.log(`Applied. Revision ${r.before ?? 0} → ${r.after ?? '?'}.`);
      return;
  }
}
