/**
 * Fetches the upstream Azure Pipelines JSON schema and regenerates TS types.
 * Run via `pnpm sync-schema` at the repo root.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'json-schema-to-typescript';

const SCHEMA_URL =
  'https://raw.githubusercontent.com/microsoft/azure-pipelines-vscode/main/service-schema.json';

const here = dirname(fileURLToPath(import.meta.url));
const SCHEMA_OUT = resolve(here, '../src/schema/service-schema.json');
const TYPES_OUT = resolve(here, '../src/generated/schema.ts');

async function main(): Promise<void> {
  console.log(`Fetching ${SCHEMA_URL} ...`);
  const res = await fetch(SCHEMA_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const text = await res.text();
  const schema = JSON.parse(text);

  mkdirSync(dirname(SCHEMA_OUT), { recursive: true });
  writeFileSync(SCHEMA_OUT, JSON.stringify(schema, null, 2) + '\n');
  console.log(`Wrote ${SCHEMA_OUT}`);

  // Top-level title becomes the root type name.
  schema.title = 'Pipeline';

  const types = await compile(schema, 'Pipeline', {
    bannerComment:
      '/* eslint-disable */\n/**\n * Auto-generated from service-schema.json. Do not edit by hand.\n * Run `pnpm sync-schema` to regenerate.\n */',
    additionalProperties: false,
    strictIndexSignatures: true,
    unreachableDefinitions: true,
    style: { singleQuote: true, semi: true },
  });

  mkdirSync(dirname(TYPES_OUT), { recursive: true });
  writeFileSync(TYPES_OUT, types);
  console.log(`Wrote ${TYPES_OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
