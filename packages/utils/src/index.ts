export {
  defineTemplate,
  extend,
  renderTemplateFile,
  type ParamSpec,
  type ParamShape,
  type ParamType,
  type ParamsOf,
  type TemplateDefinition,
  type TemplateKind,
  type TemplateOutput,
  type DefineTemplateOptions,
} from './defineTemplate.js';
export { mergeTriggers, mergeVariables, composeStages } from './merge.js';
export { definePreset, type PresetDefinition } from './definePreset.js';
export * as diff from './diff/index.js';
export {
  PreDef,
  releaseArtifactVar,
  type Pipeline as PreDefPipeline,
  type ReleaseNS as PreDefRelease,
  type SharedNS as PreDefShared,
  type ReleaseArtifactVars,
} from './predef/index.js';
