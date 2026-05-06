/**
 * ScriptExtractor — collects inline scripts during conversion and assigns each
 * a file path so the emitters can reference them via `include()`.
 *
 * Usage:
 *   const extractor = new ScriptExtractor();
 *   const rel = extractor.extract(scriptBody, 'Run tests', '.sh');
 *   // rel === 'scripts/run-tests.sh'
 *   const files = extractor.getFiles();
 *   // files[0] === { path: 'scripts/run-tests.sh', content: '...' }
 */

export interface ExtractedScriptFile {
  /** Relative path from the entry .ts file, e.g. `'scripts/run-tests.sh'`. */
  path: string;
  content: string;
}

/**
 * Turn a display-name string into a safe kebab-case filename stem.
 * Non-alphanumeric runs collapse to a single `-`; leading/trailing dashes
 * are trimmed; the result is lower-cased and capped at 60 characters.
 */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export class ScriptExtractor {
  private readonly files: ExtractedScriptFile[] = [];
  /** Tracks used path stems so we can append -2, -3 on collision. */
  private readonly usedNames = new Map<string, number>();
  /** Dedup: content → already-assigned path. */
  private readonly contentToPath = new Map<string, string>();
  private fallbackCounter = 0;

  /**
   * Register an inline script for extraction.
   *
   * @param content     - Raw script body.
   * @param displayName - Step display name used to derive the file name.
   *                      If empty/undefined, a sequential fallback name is used.
   * @param ext         - File extension including leading dot: `'.sh'` or `'.ps1'`.
   * @returns The relative path (e.g. `'scripts/run-tests.sh'`) to use in the
   *          generated `include('./scripts/run-tests.sh', import.meta.url)` call.
   */
  extract(content: string, displayName: string | undefined, ext: string): string {
    const existing = this.contentToPath.get(content);
    if (existing !== undefined) return existing;

    const stem = displayName ? slugify(displayName) : '';
    const baseStem = stem || `script-${++this.fallbackCounter}`;

    const count = this.usedNames.get(baseStem) ?? 0;
    this.usedNames.set(baseStem, count + 1);
    const uniqueStem = count === 0 ? baseStem : `${baseStem}-${count + 1}`;

    const path = `scripts/${uniqueStem}${ext}`;
    this.files.push({ path, content });
    this.contentToPath.set(content, path);
    return path;
  }

  /** Returns all collected script files in insertion order. */
  getFiles(): ExtractedScriptFile[] {
    return this.files;
  }
}
