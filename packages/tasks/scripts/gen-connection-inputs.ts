/**
 * One-shot script: generate task-connection-inputs.ts from the existing generated task files.
 * Run with: node --loader ts-node/esm scripts/gen-connection-inputs.ts
 * Or simply: npx tsx scripts/gen-connection-inputs.ts
 */
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const genDir = join(here, '../src/generated');

// Read canonical task refs from task-ids.ts
const taskIdsContent = readFileSync(join(genDir, 'task-ids.ts'), 'utf8');
const taskIdRe = /"([^"]+@\d+)":\s*\{\s*id:/g;
const taskRefs: string[] = [];
let m: RegExpExecArray | null;
while ((m = taskIdRe.exec(taskIdsContent)) !== null) taskRefs.push(m[1]!);

function toKebab(name: string): string {
    return name
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
        .toLowerCase();
}

const result: Record<string, Record<string, string>> = {};

for (const taskRef of taskRefs) {
    const atIdx = taskRef.lastIndexOf('@');
    const taskName = taskRef.slice(0, atIdx);
    const major = taskRef.slice(atIdx + 1);
    const folder = toKebab(taskName);
    const filePath = join(genDir, folder, `v${major}.ts`);
    if (!existsSync(filePath)) continue;
    const content = readFileSync(filePath, 'utf8');
    const re = /"(\w+)"\??: (\w+Connection);/g;
    let match: RegExpExecArray | null;
    const connections: Record<string, string> = {};
    while ((match = re.exec(content)) !== null) {
        connections[match[1]!] = match[2]!.replace(/Connection$/, '');
    }
    if (Object.keys(connections).length > 0) result[taskRef] = connections;
}

const output = `/* eslint-disable */
// Auto-generated. Do not edit by hand.
// Run: npx tsx scripts/gen-connection-inputs.ts
// Maps taskRef → { canonicalInputName → connectionKind }

export const taskConnectionInputs: Record<string, Record<string, string>> = ${JSON.stringify(result, null, 2)};
`;

writeFileSync(join(genDir, 'task-connection-inputs.ts'), output);
console.log(`Wrote task-connection-inputs.ts with ${Object.keys(result).length} tasks.`);
