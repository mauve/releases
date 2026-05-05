/**
 * Identity-aware JSON diff used by both `azpipe build --diff` (eventually) and
 * `azpipe release diff`. See `./engine.ts` for design notes.
 */
export {
  diff,
  matchGlob,
  type DiffNode,
  type DiffKind,
  type DiffOptions,
  type IdentityKey,
  type ShapeDescriptor,
} from './engine.js';
export {
  pipelineDescriptor,
  releaseDescriptor,
  SERVER_MANAGED_PATHS,
} from './descriptors.js';
export { unified, jsonPatch, type JsonPatchOp } from './render.js';
