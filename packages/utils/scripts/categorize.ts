import {
  overrideMap,
  type Category,
} from '../src/predef/categorization-overrides.js';
import {
  normalizeDescription,
  type ParsedVariable,
} from './parse-markdown.js';

/** A variable with its final placement decision. */
export interface CategorizedVariable {
  /** Canonical dotted name (e.g. `'Build.SourceBranch'`). */
  name: string;
  /** Description to render as TSDoc. May differ between Pipeline and Release placements. */
  description: string;
  category: Category;
  availableInTemplates?: boolean;
  /** Whether this entry is one half of a Pipeline+Release duplicate. */
  duplicateContext?: 'Pipeline' | 'Release';
}

export interface CategorizeResult {
  pipeline: CategorizedVariable[];
  release: CategorizedVariable[];
  shared: CategorizedVariable[];
  /** How many variables were emitted under both Pipeline and Release because their docs differed. */
  duplicates: number;
}

/**
 * Apply the categorization rule from the plan to a list of parsed variables
 * harvested from build/variables.md and release/variables.md. Manual overrides
 * in `categorization-overrides.ts` take precedence over the heuristic.
 */
export function categorize(
  pipelineVars: ParsedVariable[],
  releaseVars: ParsedVariable[],
): CategorizeResult {
  const pipelineByName = new Map(pipelineVars.map((v) => [v.name, v]));
  const releaseByName = new Map(releaseVars.map((v) => [v.name, v]));
  const allNames = new Set([...pipelineByName.keys(), ...releaseByName.keys()]);

  const pipeline: CategorizedVariable[] = [];
  const release: CategorizedVariable[] = [];
  const shared: CategorizedVariable[] = [];
  let duplicates = 0;

  for (const name of [...allNames].sort()) {
    const inPipeline = pipelineByName.get(name);
    const inRelease = releaseByName.get(name);
    const override = overrideMap.get(name);

    // Manual override wins.
    if (override) {
      const ref = inPipeline ?? inRelease!;
      const entry: CategorizedVariable = {
        name,
        description: ref.description,
        category: override.category,
        ...(ref.availableInTemplates !== undefined
          ? { availableInTemplates: ref.availableInTemplates }
          : {}),
      };
      if (override.category === 'Pipeline') pipeline.push(entry);
      else if (override.category === 'Release') release.push(entry);
      else if (override.category === 'Shared') shared.push(entry);
      else if (override.category === 'Duplicate') {
        // Duplicate is rare for overrides; treat as both.
        if (inPipeline) pipeline.push({ ...entry, description: inPipeline.description, duplicateContext: 'Pipeline' });
        if (inRelease) release.push({ ...entry, description: inRelease.description, duplicateContext: 'Release' });
        if (inPipeline && inRelease) duplicates++;
      }
      continue;
    }

    if (inPipeline && !inRelease) {
      pipeline.push(toCategorized(inPipeline, 'Pipeline'));
    } else if (!inPipeline && inRelease) {
      release.push(toCategorized(inRelease, 'Release'));
    } else if (inPipeline && inRelease) {
      const same =
        normalizeDescription(inPipeline.description) ===
        normalizeDescription(inRelease.description);
      if (same) {
        shared.push(toCategorized(inPipeline, 'Shared'));
      } else {
        pipeline.push({ ...toCategorized(inPipeline, 'Pipeline'), duplicateContext: 'Pipeline' });
        release.push({ ...toCategorized(inRelease, 'Release'), duplicateContext: 'Release' });
        duplicates++;
      }
    }
  }

  return { pipeline, release, shared, duplicates };
}

function toCategorized(v: ParsedVariable, category: Category): CategorizedVariable {
  return {
    name: v.name,
    description: v.description,
    category,
    ...(v.availableInTemplates !== undefined
      ? { availableInTemplates: v.availableInTemplates }
      : {}),
  };
}

/** Group variables by their first dotted segment (`Build`, `System`, `Agent`, …). */
export function groupByCategory(
  vars: CategorizedVariable[],
): Map<string, CategorizedVariable[]> {
  const out = new Map<string, CategorizedVariable[]>();
  for (const v of vars) {
    const dot = v.name.indexOf('.');
    const head = dot < 0 ? v.name : v.name.slice(0, dot);
    const list = out.get(head) ?? [];
    list.push(v);
    out.set(head, list);
  }
  // Stable sort within each group by tail name.
  for (const list of out.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }
  return out;
}
