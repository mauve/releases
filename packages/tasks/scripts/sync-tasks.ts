/**
 * Walks the vendored microsoft/azure-pipelines-tasks submodule, parses every
 * Tasks/<NameVN>/task.json, and emits one TypeScript file per non-deprecated
 * (task, major-version) into packages/tasks/src/generated/.
 *
 * Run via `pnpm sync-tasks` at the repo root (or the package).
 */
import {
  readFileSync,
  writeFileSync,
  rmSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  generateTaskFile,
  generateConnectionsFile,
  generateIndexFile,
  generateTaskIdsFile,
  type TaskJson,
} from './generator.js';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../../..');
const tasksDir = resolve(repoRoot, 'vendor/azure-pipelines-tasks/Tasks');
const outDir = resolve(here, '../src/generated');

interface Discovered {
  taskJson: TaskJson;
  folder: string;
}

function discover(): Discovered[] {
  if (!statSync(tasksDir, { throwIfNoEntry: false })) {
    throw new Error(
      `Submodule not initialized: ${tasksDir} not found.\n` +
        `Run: git submodule update --init vendor/azure-pipelines-tasks`,
    );
  }
  const out: Discovered[] = [];
  for (const entry of readdirSync(tasksDir)) {
    if (entry === 'Common') continue;
    const folder = join(tasksDir, entry);
    if (!statSync(folder).isDirectory()) continue;
    const taskJsonPath = join(folder, 'task.json');
    let raw: string;
    try {
      raw = readFileSync(taskJsonPath, 'utf8');
    } catch {
      continue; // no task.json → not a task folder
    }
    let parsed: TaskJson;
    try {
      parsed = JSON.parse(raw) as TaskJson;
    } catch (err) {
      console.warn(`! skip ${entry}: invalid JSON (${(err as Error).message})`);
      continue;
    }
    out.push({ taskJson: parsed, folder: entry });
  }
  return out;
}

function isLegacy(t: TaskJson): boolean {
  if (t.deprecated === true) return true;
  if (t.removalDate) {
    const removal = new Date(t.removalDate);
    if (!Number.isNaN(removal.getTime()) && removal.getTime() < Date.now()) return true;
  }
  return false;
}

function main(): void {
  const all = discover();
  const live = all.filter((d) => !isLegacy(d.taskJson));
  const skipped = all.length - live.length;
  console.log(`Found ${all.length} tasks (${live.length} live, ${skipped} legacy/deprecated).`);

  // Wipe and recreate.
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  // Collect connection kinds across all tasks.
  const connectionKinds = new Set<string>();
  for (const d of live) {
    for (const input of d.taskJson.inputs ?? []) {
      if (input.type.startsWith('connectedService:')) {
        connectionKinds.add(input.type.slice('connectedService:'.length));
      }
    }
  }

  // Emit connections.ts.
  const connectionsPath = join(outDir, 'connections.ts');
  writeFileSync(connectionsPath, generateConnectionsFile([...connectionKinds].sort()));

  // Emit per-task files. Use a Map to detect duplicates after our naming.
  const emitted: { fnName: string; relPath: string }[] = [];
  const seenFnNames = new Map<string, string>();
  for (const d of live) {
    const result = generateTaskFile(d.taskJson, d.folder, [...connectionKinds]);
    if (!result) continue;
    if (seenFnNames.has(result.fnName)) {
      console.warn(
        `! function-name collision ${result.fnName}: ${seenFnNames.get(result.fnName)} vs ${d.folder}; skipping ${d.folder}`,
      );
      continue;
    }
    seenFnNames.set(result.fnName, d.folder);
    const filePath = join(outDir, result.relPath);
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, result.contents);
    emitted.push({ fnName: result.fnName, relPath: result.relPath });
  }

  // Emit index.ts that re-exports every per-task module.
  const indexPath = join(outDir, 'index.ts');
  writeFileSync(indexPath, generateIndexFile(emitted));

  // Emit task-ids.ts mapping `Name@Major` → { id, major } for the release
  // workflow-task adapter in @mauve/azpipe-releases.
  const idEntries = live
    .filter((d) => d.taskJson.id && d.taskJson.name && typeof d.taskJson.version?.Major === 'number')
    .map((d) => ({
      taskRef: `${d.taskJson.name}@${d.taskJson.version.Major}`,
      id: d.taskJson.id,
      major: d.taskJson.version.Major,
    }));
  const idsPath = join(outDir, 'task-ids.ts');
  writeFileSync(idsPath, generateTaskIdsFile(idEntries));

  console.log(
    `Wrote ${emitted.length} task files + connections.ts + index.ts + task-ids.ts (${idEntries.length} entries) to ${outDir}`,
  );
}

main();
