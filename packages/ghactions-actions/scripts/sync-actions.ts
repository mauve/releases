/**
 * Fetches action.yml files for:
 *   1. ALL repositories in the `actions/` GitHub org that have an action.yml.
 *   2. Popular third-party actions listed in config/extra-actions.json.
 *
 * For each discovered action, determines the latest major-version ref (e.g. v4),
 * generates a typed TypeScript wrapper, and writes it to src/generated/.
 *
 * Run via `pnpm sync-actions` from the package or repo root.
 *
 * Environment variables:
 *   GITHUB_TOKEN — optional; avoids rate-limiting (recommended for the actions/ org enumeration).
 */

import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import {
  generateActionFile,
  generateIndexFile,
  type ActionEntry,
  type ActionYaml,
} from './generator.js';

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(here, '..');
const outDir = resolve(pkgRoot, 'src/generated');
const extraConfigPath = resolve(pkgRoot, 'config/extra-actions.json');
const actionsOrgConfigPath = resolve(pkgRoot, 'config/actions-org.json');

// ---------- GitHub API helpers ----------

const GITHUB_TOKEN = process.env['GITHUB_TOKEN'];

const defaultHeaders: Record<string, string> = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'mauvezero-ghactions-actions-sync/1.0',
};
if (GITHUB_TOKEN) {
  defaultHeaders['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
}

async function githubFetch(url: string): Promise<Response> {
  const res = await fetch(url, { headers: defaultHeaders });
  return res;
}

/** GET /orgs/actions/repos — returns all repo names in the actions org. */
async function listActionsOrgRepos(): Promise<string[]> {
  const repos: string[] = [];
  let page = 1;
  while (true) {
    const url = `https://api.github.com/orgs/actions/repos?per_page=100&page=${page}&type=public`;
    const res = await githubFetch(url);
    if (!res.ok) {
      console.warn(`! Failed to list actions org repos (page ${page}): ${res.status} ${res.statusText}`);
      break;
    }
    const data = await res.json() as Array<{ name: string; archived: boolean }>;
    if (data.length === 0) break;
    for (const r of data) {
      if (!r.archived) repos.push(r.name);
    }
    if (data.length < 100) break;
    page++;
  }
  return repos;
}

/**
 * Fetch the raw content of action.yml (or action.yaml) from a GitHub repo.
 * Returns null if not found.
 */
async function fetchActionYaml(owner: string, repo: string, ref: string): Promise<string | null> {
  for (const filename of ['action.yml', 'action.yaml']) {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/refs/tags/${ref}/${filename}`;
    const res = await githubFetch(url);
    if (res.ok) return res.text();
  }
  // Try using the ref as a branch name too (some actions tag as "v4" which may be a branch).
  for (const filename of ['action.yml', 'action.yaml']) {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${filename}`;
    const res = await githubFetch(url);
    if (res.ok) return res.text();
  }
  return null;
}

/**
 * Find the latest major-version tag for a repo in the `actions/` org.
 * Returns something like "v4". Falls back to "main" if no tags found.
 */
async function findLatestMajorTag(owner: string, repo: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${owner}/${repo}/tags?per_page=100`;
  const res = await githubFetch(url);
  if (!res.ok) return null;

  const tags = await res.json() as Array<{ name: string }>;
  // Find tags that look like "v<N>" (exact major version tags, no minor).
  const majorTags: Array<{ name: string; major: number }> = [];
  for (const tag of tags) {
    const m = /^v(\d+)$/.exec(tag.name);
    if (m) majorTags.push({ name: tag.name, major: parseInt(m[1]!, 10) });
  }
  if (majorTags.length > 0) {
    majorTags.sort((a, b) => b.major - a.major);
    return majorTags[0]!.name;
  }
  // Fall back to highest v<N>.x.x tag.
  const semverTags: Array<{ name: string; major: number }> = [];
  for (const tag of tags) {
    const m = /^v(\d+)\.\d+\.\d+/.exec(tag.name);
    if (m) semverTags.push({ name: `v${m[1]}`, major: parseInt(m[1]!, 10) });
  }
  if (semverTags.length > 0) {
    // Deduplicate by taking the highest major.
    semverTags.sort((a, b) => b.major - a.major);
    return semverTags[0]!.name;
  }
  return null;
}

// ---------- Sync logic ----------

interface ExtraActionConfig {
  owner: string;
  repo: string;
  ref: string;
}

interface ActionsOrgEntry {
  repo: string;
  /** Pinned major ref, e.g. "v4". Null means skip (no versioned release). */
  ref: string | null;
}

async function processEntry(
  entry: ActionEntry,
  seenSlugs: Map<string, string>,
  seenFnNames: Map<string, string>,
  emitted: { fnName: string; inputsTypeName: string; slug: string }[],
): Promise<void> {
  const label = `${entry.owner}/${entry.repo}@${entry.ref}`;
  const raw = await fetchActionYaml(entry.owner, entry.repo, entry.ref);
  if (!raw) {
    console.log(`  skip ${label}: no action.yml found`);
    return;
  }

  let parsed: ActionYaml;
  try {
    parsed = yaml.load(raw) as ActionYaml;
  } catch (err) {
    console.warn(`  ! skip ${label}: invalid YAML (${(err as Error).message})`);
    return;
  }

  const result = generateActionFile(entry, parsed);

  if (seenSlugs.has(result.slug)) {
    console.warn(`  ! slug collision "${result.slug}": ${seenSlugs.get(result.slug)} vs ${label}; skipping`);
    return;
  }
  if (seenFnNames.has(result.fnName)) {
    console.warn(`  ! fnName collision "${result.fnName}": ${seenFnNames.get(result.fnName)} vs ${label}; skipping`);
    return;
  }

  seenSlugs.set(result.slug, label);
  seenFnNames.set(result.fnName, label);

  const filePath = join(outDir, `${result.slug}.ts`);
  writeFileSync(filePath, result.contents);
  emitted.push({ fnName: result.fnName, inputsTypeName: result.inputsTypeName, slug: result.slug });
  console.log(`  + ${result.fnName} → ${result.slug}.ts`);
}

async function main(): Promise<void> {
  if (!GITHUB_TOKEN) {
    console.warn(
      'Warning: GITHUB_TOKEN not set. GitHub API rate limits apply (60 req/hr unauthenticated).\n' +
      'Set GITHUB_TOKEN to a personal access token for higher limits.\n',
    );
  }

  // Wipe and recreate output directory.
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const seenSlugs = new Map<string, string>();
  const seenFnNames = new Map<string, string>();
  const emitted: { fnName: string; inputsTypeName: string; slug: string }[] = [];

  // ---- 1. actions/ org — auto-discover (fallback to config if API unavailable) ----
  console.log('Discovering repositories in the actions/ org…');
  const actionsRepos = await listActionsOrgRepos();

  if (actionsRepos.length === 0) {
    // Rate-limited or unavailable — fall back to pinned config.
    console.log('  API listing returned 0 repos (likely rate-limited). Using config/actions-org.json fallback.');
    const orgConfig: ActionsOrgEntry[] = JSON.parse(
      readFileSync(actionsOrgConfigPath, 'utf8'),
    ) as ActionsOrgEntry[];

    for (const entry of orgConfig) {
      if (!entry.ref) continue; // skip entries with no release
      await processEntry({ owner: 'actions', repo: entry.repo, ref: entry.ref }, seenSlugs, seenFnNames, emitted);
    }
  } else {
    console.log(`  Found ${actionsRepos.length} public non-archived repos`);
    for (const repo of actionsRepos) {
      const ref = await findLatestMajorTag('actions', repo);
      if (!ref) {
        console.log(`  skip actions/${repo}: no version tags`);
        continue;
      }
      await processEntry({ owner: 'actions', repo, ref }, seenSlugs, seenFnNames, emitted);
    }
  }

  // ---- 2. Extra third-party actions ----
  console.log('\nProcessing extra third-party actions…');
  const extras: ExtraActionConfig[] = JSON.parse(readFileSync(extraConfigPath, 'utf8')) as ExtraActionConfig[];
  for (const extra of extras) {
    await processEntry(
      { owner: extra.owner, repo: extra.repo, ref: extra.ref },
      seenSlugs,
      seenFnNames,
      emitted,
    );
  }

  // ---- 3. Write barrel index ----
  const indexPath = join(outDir, 'index.ts');
  writeFileSync(indexPath, generateIndexFile(emitted));

  console.log(`\nDone. Wrote ${emitted.length} action wrappers + index.ts to ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
