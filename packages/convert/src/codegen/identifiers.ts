/**
 * Identifier helpers — convert raw names from YAML/JSON (which permit dashes,
 * spaces, leading digits) into safe TypeScript identifiers, with deduplication
 * to avoid collisions in the emitted file's local scope.
 */

const RE_VALID_FIRST = /^[A-Za-z_$]/;
const RE_VALID_REST = /[^A-Za-z0-9_$]/g;

const RESERVED = new Set([
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
  'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false',
  'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new',
  'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try',
  'typeof', 'var', 'void', 'while', 'with', 'yield',
]);

/** Convert an arbitrary name to a valid camelCase identifier. */
export function camelCase(name: string): string {
  const cleaned = name
    .trim()
    .replace(/[\s\-_/.]+/g, ' ')
    .replace(/[^A-Za-z0-9 ]/g, '')
    .trim();
  if (!cleaned) return '_';
  const parts = cleaned.split(' ');
  const first = parts[0]!.toLowerCase();
  const rest = parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase());
  let out = first + rest.join('');
  if (!RE_VALID_FIRST.test(out)) out = '_' + out;
  out = out.replace(RE_VALID_REST, '_');
  if (RESERVED.has(out)) out = out + '_';
  return out;
}

/**
 * Track identifiers in scope so we can mint unique names. Pass any name you
 * intend to use; the collector returns the same name if free or appends a
 * numeric suffix to disambiguate.
 */
export class IdentifierScope {
  private readonly used = new Set<string>();

  /** Reserve `name` exactly. Returns the actual name picked (suffix appended
   *  on collision). */
  reserve(name: string): string {
    let candidate = name;
    let n = 2;
    while (this.used.has(candidate)) {
      candidate = `${name}${n}`;
      n++;
    }
    this.used.add(candidate);
    return candidate;
  }

  /** Camel-case the input first, then reserve. */
  reserveFromName(rawName: string): string {
    return this.reserve(camelCase(rawName));
  }

  has(name: string): boolean {
    return this.used.has(name);
  }
}
