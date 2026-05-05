/**
 * Optional Prettier post-formatting. The converter emits indentation that's
 * already sane, but Prettier normalizes line breaks, trailing commas, and the
 * fluent-chain wrapping so output matches the rest of the workspace.
 *
 * Failures (Prettier missing, syntax errors in our generated source) fall
 * back to the raw input — the user can still read what came out, and tests
 * that opt into formatting will surface a Prettier exception.
 */

import { format as prettierFormat } from 'prettier';

/** Format `source` as TypeScript. Returns the input unchanged when Prettier
 *  errors so a malformed emit is still readable. */
export async function formatTs(source: string): Promise<string> {
  try {
    return await prettierFormat(source, {
      parser: 'typescript',
      singleQuote: true,
      semi: true,
      trailingComma: 'all',
      printWidth: 100,
    });
  } catch {
    return source;
  }
}
