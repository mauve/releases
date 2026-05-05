/* eslint-disable */
// Auto-generated from PublishSymbolsV2/task.json. Do not edit by hand.
// Run `pnpm sync-tasks` to regenerate.

import { makeTask, type TaskStepOptions } from '../../runtime.js';
import type { AzureRMConnection } from '../connections.js';

export interface PublishSymbolsV2Inputs {
  /**
   * Azure Resource Manager connection
   *
   * Name of the Azure Resource Manager service connection. Supported authentication type is
   * currently only workload identity federation.
   */
  "ConnectedServiceName"?: AzureRMConnection;
  /**
   * Path to symbols folder
   *
   * The path to the folder that is searched for symbol files. The default is
   * $(Build.SourcesDirectory). Otherwise specify a rooted path, for example:
   * $(Build.BinariesDirectory)/MyProject
   *
   * @default $(Build.SourcesDirectory)
   */
  "SymbolsFolder"?: string;
  /**
   * Search pattern
   *
   * The pattern used to discover the pdb files to publish.
   *
   * @default **​/bin/**​/*.pdb
   */
  "SearchPattern": string;
  /**
   * Manifest
   *
   * The path to a file containing more symbol client keys to publish.
   */
  "Manifest"?: string;
  /**
   * Index sources
   *
   * Indicates whether to inject source server information into the PDB files. This option is
   * only supported on Windows agents.
   *
   * @default true
   */
  "IndexSources"?: boolean;
  /**
   * Publish symbols
   *
   * Indicates whether to publish the symbol files.
   *
   * @default true
   */
  "PublishSymbols"?: boolean;
  /**
   * Symbol server type
   *
   * Choose where to publish symbols. Symbols published to the Azure Artifacts symbol server are
   * accessible by any user with access to the organization/collection. Azure DevOps Server only
   * supports the "File share" option. Follow [these
   * instructions](https://go.microsoft.com/fwlink/?linkid=846265) to use Symbol Server in Azure
   * Artifacts.
   *
   * - ` ` — Select one
   * - `TeamServices` — Symbol Server in this organization/collection (requires Azure Artifacts)
   * - `FileShare` — File share
   *
   * @default
   *
   * Only meaningful when: `PublishSymbols = true`
   */
  "SymbolServerType"?: " " | "TeamServices" | "FileShare";
  /**
   * Path to publish symbols
   *
   * The file share that hosts your symbols. This value will be used in the call to `symstore.exe
   * add` as the `/s` parameter.
   *
   * Only meaningful when: `PublishSymbols = true && SymbolServerType = FileShare`
   */
  "SymbolsPath"?: string;
  /**
   * Compress symbols
   *
   * Compress symbols when publishing to file share.
   *
   * @default false
   *
   * Only meaningful when: `SymbolServerType = FileShare`
   */
  "CompressSymbols"?: boolean;
  /**
   * Symbol Expiration (in days)
   *
   * The number of days that symbols should be retained.
   *
   * @default 36530
   *
   * Only meaningful when: `PublishSymbols = true && SymbolServerType = TeamServices`
   */
  "SymbolExpirationInDays"?: string;
  /**
   * Symbol file formats to publish
   *
   * Which debug formats to publish to the symbol server
   *
   * - `Default` — The Default set of symbols to upload
   * - `Pdb` — Only Pdb based symbols Windows pdb's and managed Portable pdb's.
   * - `SourceMap` — Only JavaScript based SourceMap symbols (*.js.map)
   * - `All` — All supported symbol formats
   *
   * @default Default
   *
   * Only meaningful when: `PublishSymbols = true && SymbolServerType = TeamServices`
   *
   * In group: advanced
   */
  "IndexableFileFormats"?: "Default" | "Pdb" | "SourceMap" | "All";
  /**
   * Verbose logging
   *
   * Use verbose logging.
   *
   * @default true
   *
   * In group: advanced
   */
  "DetailedLog"?: boolean;
  /**
   * Warn if not indexed
   *
   * Indicates whether to warn if sources are not indexed for a PDB file. Otherwise the messages
   * are logged as normal output.
   *
   * @default false
   *
   * In group: advanced
   */
  "TreatNotIndexedAsWarning"?: boolean;
  /**
   * Use NetCore client tool
   *
   * Indicates whether to use version of the symbol upload tool that supports DWARF and ELF
   * files. This option only matters on Windows agents. On non-Windows agents, the version of the
   * symbol upload tool that supports DWARF and ELF files will always be used.
   *
   * @default false
   *
   * In group: advanced
   */
  "UseNetCoreClientTool"?: boolean;
  /**
   * Max wait time (min)
   *
   * The number of minutes to wait before failing this task.
   *
   * In group: advanced
   */
  "SymbolsMaximumWaitTime"?: string;
  /**
   * Product
   *
   * Specify the product parameter to symstore.exe. The default is $(Build.DefinitionName)
   *
   * In group: advanced
   */
  "SymbolsProduct"?: string;
  /**
   * Version
   *
   * Specify the version parameter to symstore.exe. The default is $(Build.BuildNumber)
   *
   * In group: advanced
   */
  "SymbolsVersion"?: string;
  /**
   * Artifact name
   *
   * Specify the artifact name to use for the Symbols artifact. The default is
   * Symbols_$(BuildConfiguration)
   *
   * @default Symbols_$(BuildConfiguration)
   *
   * In group: advanced
   */
  "SymbolsArtifactName"?: string;
}

/**
 * Index sources and publish symbols
 *
 * Index your source code and publish symbols to a file share or Azure Artifacts symbol server
 *
 * See [more information](https://go.microsoft.com/fwlink/?LinkID=613722) on how to use this
 * task.
 *
 * @see
 * https://docs.microsoft.com/azure/devops/pipelines/tasks/build/index-sources-publish-symbols
 *
 * @see https://github.com/microsoft/azure-pipelines-tasks/tree/master/Tasks/PublishSymbolsV2
 */
export function publishSymbolsV2(
  inputs: PublishSymbolsV2Inputs,
  opts: TaskStepOptions = {},
): ReturnType<typeof makeTask> {
  return makeTask("PublishSymbols@2", inputs as unknown as Record<string, unknown>, opts);
}
