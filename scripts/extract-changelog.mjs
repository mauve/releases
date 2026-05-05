#!/usr/bin/env node
// Print the body of one CHANGELOG.md section to stdout. Used by the publish
// stage of azure-pipelines.yml to feed `GitHubRelease@1`'s release notes.
//
// Usage:  node scripts/extract-changelog.mjs 0.2.0
//
// Exits non-zero with a clear message when the version's section is missing
// (so a typo in the tag fails the publish stage instead of silently shipping
// a release with no notes).
import { readFileSync } from 'node:fs';

const version = process.argv[2];
if (!version) {
  console.error('Usage: extract-changelog.mjs <version>');
  process.exit(2);
}

const md = readFileSync('CHANGELOG.md', 'utf8');

// Walk lines: find `## [VERSION]`, accumulate until the next `## [` heading or EOF.
const lines = md.split('\n');
const headerRe = /^## \[([^\]]+)\]/;
let inSection = false;
const captured = [];
for (const line of lines) {
  const h = headerRe.exec(line);
  if (h) {
    if (inSection) break; // hit the next version
    if (h[1] === version) {
      inSection = true;
      continue;
    }
  }
  if (inSection) captured.push(line);
}
if (captured.length === 0) {
  console.error(`No section for [${version}] in CHANGELOG.md`);
  process.exit(1);
}
const body = captured.join('\n').trim();
if (!body) {
  console.error(`Section [${version}] is empty in CHANGELOG.md`);
  process.exit(1);
}
process.stdout.write(body + '\n');
