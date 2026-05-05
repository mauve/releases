import { existsSync } from 'node:fs';
import { isAbsolute, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

let registered = false;

/**
 * Dynamically import a TypeScript entry file. tsx is registered once on first
 * call so subsequent loads share the loader.
 */
export async function loadEntry<T = unknown>(entryPath: string): Promise<T> {
  const abs = isAbsolute(entryPath) ? entryPath : resolve(process.cwd(), entryPath);
  if (!existsSync(abs)) throw new Error(`Entry file not found: ${abs}`);
  if (!registered) {
    const api = await import('tsx/esm/api');
    api.register();
    registered = true;
  }
  return (await import(pathToFileURL(abs).href)) as T;
}
