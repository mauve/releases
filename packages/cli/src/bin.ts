#!/usr/bin/env node
import { runBuild } from './cmd-build.js';
import { runBuildImport } from './cmd-build-import.js';
import { runRelease } from './cmd-release.js';
import { runBootstrap } from './cmd-bootstrap.js';
import { runGha } from './cmd-gha-import.js';

function topLevelUsage(): void {
  console.log(`azpipe <command> [options]

Commands:
  build <entry.ts>           Compile a TS pipeline to azure-pipelines.yml
  build import <yaml>        Convert an existing YAML to TypeScript
  release get <name>         Fetch a release definition from Azure DevOps
  release diff <entry.ts>    Show what \`push\` would change
  release push <entry.ts>    Diff-first PUT (interactive by default)
  release import <json>      Convert a classic-release JSON to TypeScript
  gha import <workflow.yml>  Convert a GitHub Actions workflow to TypeScript
  bootstrap                  Scaffold a pipelines/ directory in the current repo

Run \`azpipe <command> --help\` for command-specific options.`);
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const command = argv[0];
  if (!command || command === '-h' || command === '--help') {
    topLevelUsage();
    return;
  }
  switch (command) {
    case 'build':
      if (argv[1] === 'import') {
        await runBuildImport(argv.slice(2));
      } else {
        await runBuild(argv.slice(1));
      }
      return;
    case 'release':
      await runRelease(argv.slice(1));
      return;
    case 'gha':
      await runGha(argv.slice(1));
      return;
    case 'bootstrap':
      await runBootstrap(argv.slice(1));
      return;
    default:
      console.error(`Unknown command: ${command}`);
      topLevelUsage();
      process.exit(2);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
