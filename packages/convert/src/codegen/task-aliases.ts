/**
 * Input-name alias map extracted from the Azure Pipelines service schema.
 *
 * The schema defines per-task input properties with optional `aliases` arrays.
 * In YAML, users write the "friendly" name (e.g. `azureSubscription`); the
 * task.json canonical name is in the aliases (e.g. `connectedServiceNameARM`).
 *
 * This module provides:
 * - `resolveInputName(taskRef, yamlName)` — returns canonical task.json name.
 * - `getConnectionKind(taskRef, canonicalName)` — returns connection kind if input is a service connection.
 */

import { azurePipelinesSchema } from '@mauve/azpipe-core';
import { taskConnectionInputs } from '@mauve/azpipe-tasks';

/** Map: taskRef → { yamlName → canonicalName } */
type AliasMap = Map<string, Map<string, string>>;

let aliasMap: AliasMap | undefined;

interface SchemaInputProp {
  type?: string;
  aliases?: string[];
  description?: string;
}

function buildAliasMap(): void {
  aliasMap = new Map();

  // Walk the entire schema looking for objects with task.pattern and inputs.properties.
  walkSchema(azurePipelinesSchema);
}

function walkSchema(obj: unknown): void {
  if (obj === null || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    for (const item of obj) walkSchema(item);
    return;
  }
  const record = obj as Record<string, unknown>;
  // Check if this is a task entry with pattern + inputs
  if (record['properties'] && typeof record['properties'] === 'object') {
    const props = record['properties'] as Record<string, unknown>;
    const taskProp = props['task'] as { pattern?: string } | undefined;
    const inputsProp = props['inputs'] as { properties?: Record<string, SchemaInputProp> } | undefined;
    if (taskProp?.pattern && inputsProp?.properties) {
      // Extract taskRef from pattern like "^AzureCLI@2$"
      const m = /^\^(.+)\$$/.exec(taskProp.pattern);
      if (m) {
        const taskRef = m[1]!;
        processTaskInputs(taskRef, inputsProp.properties);
      }
    }
  }
  // Recurse into all values
  for (const val of Object.values(record)) {
    walkSchema(val);
  }
}

function processTaskInputs(taskRef: string, inputs: Record<string, SchemaInputProp>): void {
  // Only store if we don't already have this taskRef (avoid duplicates from schema)
  if (aliasMap!.has(taskRef)) return;

  const aliases = new Map<string, string>();
  for (const [yamlName, prop] of Object.entries(inputs)) {
    if (prop.aliases && prop.aliases.length > 0) {
      // The alias is the canonical task.json name.
      aliases.set(yamlName, prop.aliases[0]!);
    }
  }
  if (aliases.size > 0) {
    aliasMap!.set(taskRef, aliases);
  }
}

function ensureAliasMap(): void {
  if (!aliasMap) buildAliasMap();
}

/**
 * Resolve a YAML input name to its canonical task.json name.
 * Returns the canonical name if an alias exists, otherwise the original name.
 */
export function resolveInputName(taskRef: string, yamlName: string): string {
  ensureAliasMap();
  const taskAliases = aliasMap!.get(taskRef);
  if (!taskAliases) return yamlName;
  return taskAliases.get(yamlName) ?? yamlName;
}

/**
 * Get all input aliases for a task.
 * Returns a Map of yamlName → canonicalName, or undefined if no aliases.
 */
export function getInputAliases(taskRef: string): ReadonlyMap<string, string> | undefined {
  ensureAliasMap();
  return aliasMap!.get(taskRef);
}

/**
 * Check if a canonical input name is a service connection for the given task.
 * Returns the connection kind (e.g. 'AzureRM') or undefined.
 */
export function getConnectionKind(taskRef: string, canonicalName: string): string | undefined {
  const taskInputs = taskConnectionInputs[taskRef];
  if (!taskInputs) return undefined;
  return taskInputs[canonicalName];
}

/**
 * Get the branded connection type name for a connection kind.
 * E.g. 'AzureRM' → 'AzureRMConnection'
 */
export function connectionTypeName(kind: string): string {
  return kind.charAt(0).toUpperCase() + kind.slice(1) + 'Connection';
}

/**
 * Get the factory function name for creating a connection reference.
 * E.g. 'AzureRM' → 'azureRMConnection'
 */
export function connectionFactoryName(kind: string): string {
  return kind.charAt(0).toLowerCase() + kind.slice(1) + 'Connection';
}
