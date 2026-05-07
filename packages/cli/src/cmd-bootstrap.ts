import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { yamlToTs } from '@mauvezero/azpipe-convert';

// ---------------------------------------------------------------------------
// CLI version — stamped into generated package.json
// ---------------------------------------------------------------------------

const here = dirname(fileURLToPath(import.meta.url));
const cliPkgJson = JSON.parse(
  readFileSync(resolve(here, '../package.json'), 'utf8'),
) as { version: string };
const CLI_VERSION = cliPkgJson.version;

// ---------------------------------------------------------------------------
// Arg parsing
// ---------------------------------------------------------------------------

interface BootstrapOpts {
  yes: boolean;
  outDir: string;
  help: boolean;
}

function parseArgs(argv: string[]): BootstrapOpts {
  const opts: BootstrapOpts = { yes: false, outDir: 'pipelines', help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === '-h' || a === '--help') opts.help = true;
    else if (a === '--yes' || a === '-y') opts.yes = true;
    else if (a === '--out' || a === '-o') opts.outDir = argv[++i] ?? opts.outDir;
    else if (a.startsWith('-')) throw new Error(`Unknown flag: ${a}`);
  }
  return opts;
}

function usage(): void {
  console.log(`azpipe bootstrap [options]

Scaffold a pipelines/ directory in the current git repo with:
  - pipelines/package.json       (build / diff / push scripts)
  - pipelines/tsconfig.json
  - pipelines/README.md
  - pipelines/azure-pipelines.ts (CI pipeline, converted from root yml if present)
  - pipelines/release.ts         (release definition stub)
  - pipelines/release-sync.yml   (YAML pipeline to diff/push releases)
  - <root>/azure-pipelines.yml   (generated from azure-pipelines.ts)

Options:
  -o, --out <dir>   Output directory relative to git root (default: pipelines)
  -y, --yes         Accept all defaults, skip interactive prompts
  -h, --help        Show this help`);
}

// ---------------------------------------------------------------------------
// Git helpers
// ---------------------------------------------------------------------------

function findGitRoot(from: string): string {
  let dir = isAbsolute(from) ? from : resolve(process.cwd(), from);
  while (true) {
    if (existsSync(join(dir, '.git'))) return dir;
    const parent = dirname(dir);
    if (parent === dir) throw new Error('Not inside a git repository.');
    dir = parent;
  }
}

function tryExec(cmd: string): string | undefined {
  try {
    return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'], encoding: 'utf8' }).trim();
  } catch {
    return undefined;
  }
}

function detectDefaultBranch(): string {
  const ref = tryExec('git symbolic-ref refs/remotes/origin/HEAD');
  if (ref) {
    const m = ref.match(/refs\/remotes\/origin\/(.+)/);
    if (m?.[1]) return m[1];
  }
  // Fallback: look for common branch names
  const branches = tryExec('git branch -r');
  if (branches?.includes('origin/main')) return 'main';
  if (branches?.includes('origin/master')) return 'master';
  return 'main';
}

function detectFromGitRemote(): { org?: string; project?: string } {
  const remote = tryExec('git remote get-url origin');
  if (!remote) return {};
  // HTTPS: https://dev.azure.com/ORG/PROJECT/_git/REPO
  const httpsMatch = remote.match(/dev\.azure\.com\/([^/]+)\/([^/]+)/);
  if (httpsMatch) return { org: httpsMatch[1], project: httpsMatch[2] };
  // SSH: git@ssh.dev.azure.com:v3/ORG/PROJECT/REPO
  const sshMatch = remote.match(/v3\/([^/]+)\/([^/]+)/);
  if (sshMatch) return { org: sshMatch[1], project: sshMatch[2] };
  return {};
}

// ---------------------------------------------------------------------------
// Interactive prompt helpers
// ---------------------------------------------------------------------------

type Prompter = (question: string, defaultValue?: string) => Promise<string>;
type YesNoPrompter = (question: string, defaultYes?: boolean) => Promise<boolean>;

function makePrompter(
  rl: ReturnType<typeof createInterface>,
): { prompt: Prompter; yesNo: YesNoPrompter } {
  const prompt: Prompter = (question, defaultValue) =>
    new Promise((resolve) => {
      const suffix = defaultValue ? ` [${defaultValue}]` : '';
      rl.question(`  ${question}${suffix}: `, (answer) => {
        resolve(answer.trim() || defaultValue || '');
      });
    });

  const yesNo: YesNoPrompter = (question, defaultYes = true) =>
    new Promise((resolve) => {
      const suffix = defaultYes ? ' [Y/n]' : ' [y/N]';
      rl.question(`  ${question}${suffix}: `, (answer) => {
        const a = answer.trim().toLowerCase();
        if (a === '') resolve(defaultYes);
        else resolve(a === 'y' || a === 'yes');
      });
    });

  return { prompt, yesNo };
}

// ---------------------------------------------------------------------------
// Template generators
// ---------------------------------------------------------------------------

function packageJsonTemplate(org: string, project: string): string {
  void org; void project; // Reserved for future use (e.g. to embed metadata)
  const deps: Record<string, string> = {
    '@mauvezero/azpipe': CLI_VERSION,
    '@mauvezero/azpipe-releases': CLI_VERSION,
    '@mauvezero/azpipe-tasks': CLI_VERSION,
    '@mauvezero/azpipe-utils': CLI_VERSION,
    '@mauvezero/azpipe-cli': CLI_VERSION,
  };
  const pkg = {
    name: 'pipelines',
    private: true,
    type: 'module',
    scripts: {
      build: 'azpipe build azure-pipelines.ts --out ../azure-pipelines.yml',
      diff: 'azpipe release diff release.ts',
      'push:dry': 'azpipe release push release.ts --dry-run',
      push: 'azpipe release push release.ts',
    },
    dependencies: deps,
  };
  return JSON.stringify(pkg, null, 2) + '\n';
}

function tsconfigTemplate(): string {
  return JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2022',
        module: 'NodeNext',
        moduleResolution: 'NodeNext',
        lib: ['ES2022'],
        strict: true,
        noUncheckedIndexedAccess: true,
        noImplicitOverride: true,
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        skipLibCheck: true,
        noEmit: true,
        resolveJsonModule: true,
      },
      include: ['**/*.ts'],
    },
    null,
    2,
  ) + '\n';
}

function pipelineStubTemplate(): string {
  return `import { pipeline, script, checkout } from '@mauvezero/azpipe';

export default pipeline()
  .name('CI $(Date:yyyyMMdd).$(Rev:r)')
  .trigger({ branches: { include: ['main'] } })
  .pr({ branches: { include: ['main'] } })
  .pool({ vmImage: 'ubuntu-latest' })
  .stage('Build', (s) =>
    s.job('build', (j) =>
      j
        .step(checkout('self', { fetchDepth: 1 }))
        .step(script('echo "Add your build steps here"', { displayName: 'Build' })),
    ),
  );
`;
}

function releaseStubTemplate(org: string, project: string, releaseName: string): string {
  return `import { releasePipeline, buildArtifact } from '@mauvezero/azpipe-releases';

// Replace definitionId with the ID of your Azure Pipelines build pipeline.
const artifact = buildArtifact({
  alias: 'drop',
  definitionId: 0, // TODO: replace with your build pipeline's definition ID
  defaultVersionType: 'latestType',
  isPrimary: true,
});

export default releasePipeline({
  org: '${org}',
  project: '${project}',
  name: '${releaseName}',
  releaseNameFormat: 'Release-$(rev:r)',
  description: 'Managed by azpipe.',
})
  .artifact(artifact)
  .trigger(artifact)
  .environment('staging', (e) =>
    e.agentPhase((p) =>
      p
        .name('Deploy to staging')
        .pool({ vmImage: 'ubuntu-latest' })
        // TODO: add your deployment steps here
    ),
  );
`;
}

function releaseSyncYmlTemplate(
  defaultBranch: string,
  syncPipelineName: string,
  org: string,
  project: string,
): string {
  return `# ============================================================
# Source: pipelines/release-sync.yml
# This file is NOT compiled from TypeScript — it IS the source.
#
# Pipeline name in Azure DevOps: ${syncPipelineName}
#
# After registering this pipeline in Azure DevOps, grant the
# build service account "Release Definition Contributor" in:
#   ${project} project → Project Settings → Permissions
#   Search for: "${project} Build Service (${org})"
# ============================================================
name: ${syncPipelineName}

trigger:
  branches:
    include:
      - ${defaultBranch}
  paths:
    include:
      - pipelines/**

pr:
  branches:
    include:
      - ${defaultBranch}
  paths:
    include:
      - pipelines/**

pool:
  vmImage: ubuntu-latest

variables:
  AZURE_DEVOPS_ORG: '${org}'
  AZURE_DEVOPS_PROJECT: '${project}'

steps:
  - checkout: self

  - task: NodeTool@0
    inputs:
      versionSpec: '20.x'
    displayName: Install Node

  - script: npm ci
    workingDirectory: pipelines
    displayName: Install dependencies

  - script: npx azpipe release diff release.ts
    workingDirectory: pipelines
    displayName: Diff release definitions
    # Non-zero exit means drift detected. On a PR this is expected and informational.
    continueOnError: true
    env:
      AZURE_DEVOPS_ORG: $(AZURE_DEVOPS_ORG)
      AZURE_DEVOPS_PROJECT: $(AZURE_DEVOPS_PROJECT)
      SYSTEM_ACCESSTOKEN: $(System.AccessToken)

  - script: npx azpipe release push release.ts --yes
    workingDirectory: pipelines
    displayName: Push release definitions
    # Only runs on the default branch, not on PRs.
    condition: and(succeeded(), ne(variables['Build.Reason'], 'PullRequest'))
    env:
      AZURE_DEVOPS_ORG: $(AZURE_DEVOPS_ORG)
      AZURE_DEVOPS_PROJECT: $(AZURE_DEVOPS_PROJECT)
      SYSTEM_ACCESSTOKEN: $(System.AccessToken)
`;
}

const GENERATED_BANNER = `# ============================================================
# GENERATED FILE – do not edit by hand.
# Source: pipelines/azure-pipelines.ts
# Regenerate: cd pipelines && npm run build
# ============================================================
`;

function readmeTemplate(
  org: string,
  project: string,
  syncPipelineName: string,
  defaultBranch: string,
): string {
  return `# pipelines/

This directory is managed by [azpipe](https://github.com/mauve/releases).
It contains TypeScript sources for Azure Pipelines CI and Classic Release definitions.

## Contents

| File | Description |
|---|---|
| \`azure-pipelines.ts\` | CI pipeline source (TypeScript) |
| \`release.ts\` | Release definition source (TypeScript) |
| \`release-sync.yml\` | Azure Pipelines YAML that diffs and pushes release definitions |
| \`package.json\` | npm scripts to build, diff, and push |
| \`tsconfig.json\` | TypeScript config (self-contained) |

## Regenerate \`azure-pipelines.yml\`

The root \`azure-pipelines.yml\` is **generated** from \`azure-pipelines.ts\`. Never edit it by hand.

\`\`\`bash
cd pipelines
npm install
npm run build        # writes ../azure-pipelines.yml
\`\`\`

Commit both \`azure-pipelines.ts\` and the regenerated \`azure-pipelines.yml\`.

## Managing release definitions

Release definitions are authored as TypeScript files and pushed to Azure DevOps via the CLI.

\`\`\`bash
cd pipelines
npm run diff         # show drift between local and server
npm run push:dry     # dry run – shows what would change
npm run push         # interactive push
\`\`\`

## Adding a new release pipeline

1. Create a new \`.ts\` file (e.g. \`release-backend.ts\`) using \`releasePipeline()\`.
2. Add a \`diff\` and \`push\` step for it in \`release-sync.yml\`.
3. Open a PR — the \`${syncPipelineName}\` pipeline will diff and report drift.
4. On merge to \`${defaultBranch}\`, the pipeline pushes the definition automatically.

## Credentials

\`release-sync.yml\` uses the pipeline's built-in job token (\`SYSTEM_ACCESSTOKEN\`) to
authenticate against the Azure DevOps Releases API — no service principal or client
secret required.

One-time setup after registering the pipeline:

1. Go to **${org}** → **${project}** → Project Settings → **Permissions**.
2. Search for **${project} Build Service (${org})**.
3. Grant it the **Release Definition Contributor** role.
`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export async function runBootstrap(argv: string[]): Promise<void> {
  const opts = parseArgs(argv);
  if (opts.help) {
    usage();
    return;
  }

  // -- Detect git root -------------------------------------------------------
  const gitRoot = findGitRoot(process.cwd());
  console.log(`Detected repo root: ${gitRoot}`);

  // -- Detect default branch -------------------------------------------------
  const defaultBranch = detectDefaultBranch();
  console.log(`Detected default branch: ${defaultBranch}`);

  // -- Detect org / project --------------------------------------------------
  const fromRemote = detectFromGitRemote();
  const detectedOrg = process.env['AZURE_DEVOPS_ORG'] ?? fromRemote.org ?? '';
  const detectedProject = process.env['AZURE_DEVOPS_PROJECT'] ?? fromRemote.project ?? '';
  if (detectedOrg) console.log(`Detected org: ${detectedOrg}`);
  if (detectedProject) console.log(`Detected project: ${detectedProject}`);

  // -- Detect existing azure-pipelines.yml -----------------------------------
  const rootYml = join(gitRoot, 'azure-pipelines.yml');
  const hasRootYml = existsSync(rootYml);
  if (hasRootYml) console.log(`Detected existing azure-pipelines.yml at repo root.`);

  // -- Interactive wizard ----------------------------------------------------
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const { prompt, yesNo } = makePrompter(rl);

  let org = detectedOrg;
  let project = detectedProject;
  let releaseName = '';
  let syncPipelineName = '';
  let convertYml = hasRootYml;

  if (!opts.yes) {
    org = await prompt('Azure DevOps org', detectedOrg || undefined);
    project = await prompt('Azure DevOps project', detectedProject || undefined);
    const defaultSyncName = project
      ? `${project.charAt(0).toUpperCase()}${project.slice(1)}ReleasesSync`
      : 'ReleasesSync';
    syncPipelineName = await prompt('Sync pipeline name (Azure DevOps display name)', defaultSyncName);
    releaseName = await prompt('Release definition name (e.g. my-service-release)');
    if (hasRootYml) {
      convertYml = await yesNo('Convert existing azure-pipelines.yml to TypeScript?', true);
    }
    const proceed = await yesNo('Create/overwrite files in pipelines/?', true);
    rl.close();
    if (!proceed) {
      console.log('Aborted.');
      return;
    }
  } else {
    rl.close();
    org = org || '';
    project = project || '';
    const defaultSyncName = project
      ? `${project.charAt(0).toUpperCase()}${project.slice(1)}ReleasesSync`
      : 'ReleasesSync';
    syncPipelineName = defaultSyncName;
    releaseName = `${project || 'my-service'}-release`;
  }

  if (!org) {
    console.error(
      'Org is required. Set AZURE_DEVOPS_ORG or pass it when prompted.\n' +
      'You can also edit pipelines/release.ts and pipelines/release-sync.yml manually.',
    );
  }
  if (!project) {
    console.error(
      'Project is required. Set AZURE_DEVOPS_PROJECT or pass it when prompted.\n' +
      'You can also edit pipelines/release.ts and pipelines/release-sync.yml manually.',
    );
  }

  // -- Prepare output directory ----------------------------------------------
  const outDir = isAbsolute(opts.outDir)
    ? opts.outDir
    : join(gitRoot, opts.outDir);
  mkdirSync(outDir, { recursive: true });

  // -- Generate azure-pipelines.ts (convert or stub) -------------------------
  // Extra files produced by conversion (templates, extracted scripts). Collected
  // here so they can all be written after the main output-dir is created.
  const extraConvertedFiles: Array<{ path: string; contents: string }> = [];
  let pipelineTs: string;
  if (convertYml && hasRootYml) {
    console.log('Converting azure-pipelines.yml → azure-pipelines.ts…');
    const yamlText = readFileSync(rootYml, 'utf8');
    const yamlDir = dirname(rootYml);
    const result = await yamlToTs(yamlText, {
      prettier: true,
      emitTemplates: true,
      inlineTemplates: false,
      entryFileName: 'azure-pipelines.ts',
      outputDir: '.',
      loadTemplate: (templatePath) => {
        try {
          return readFileSync(join(yamlDir, templatePath), 'utf8');
        } catch {
          return undefined;
        }
      },
    });
    for (const w of result.warnings) console.error(`  warning: ${w}`);
    const [entryFile, ...siblingFiles] = result.files;
    pipelineTs = entryFile?.contents ?? pipelineStubTemplate();
    extraConvertedFiles.push(...siblingFiles);
  } else {
    pipelineTs = pipelineStubTemplate();
  }

  // -- Generate azure-pipelines.yml at repo root (stub pipeline serialized) --
  // We do a best-effort in-process build using the stub as source.
  // For the converted case, we don't re-emit from TS (that requires tsx at
  // bootstrap time); instead we copy the original YAML with a banner prepended.
  let rootYmlContent: string;
  if (convertYml && hasRootYml) {
    // Prepend the banner to the original YAML.
    const originalYml = readFileSync(rootYml, 'utf8');
    if (!originalYml.startsWith('# ===')) {
      rootYmlContent = GENERATED_BANNER + originalYml;
    } else {
      rootYmlContent = originalYml; // Already has the banner
    }
  } else {
    // Generate a minimal YAML for the stub pipeline.
    rootYmlContent =
      GENERATED_BANNER +
      [
        'name: CI $(Date:yyyyMMdd).$(Rev:r)',
        'trigger:',
        '  branches:',
        '    include:',
        '      - main',
        'pr:',
        '  branches:',
        '    include:',
        '      - main',
        'pool:',
        "  vmImage: ubuntu-latest",
        'stages:',
        '  - stage: Build',
        '    jobs:',
        '      - job: build',
        '        steps:',
        "          - checkout: self",
        "          - script: echo \"Add your build steps here\"",
        '            displayName: Build',
      ].join('\n') + '\n';
  }

  // -- Write all files -------------------------------------------------------
  function write(filePath: string, content: string): void {
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content, 'utf8');
    console.log(`  Wrote ${filePath}`);
  }

  write(join(outDir, 'package.json'), packageJsonTemplate(org, project));
  write(join(outDir, 'tsconfig.json'), tsconfigTemplate());
  write(join(outDir, 'README.md'), readmeTemplate(org, project, syncPipelineName, defaultBranch));
  write(join(outDir, 'azure-pipelines.ts'), pipelineTs);
  write(join(outDir, 'release.ts'), releaseStubTemplate(org, project, releaseName));
  write(join(outDir, 'release-sync.yml'), releaseSyncYmlTemplate(defaultBranch, syncPipelineName, org, project));
  write(rootYml, rootYmlContent);

  // Write template and script files produced by the converter.
  for (const f of extraConvertedFiles) {
    write(join(outDir, f.path), f.contents);
  }

  console.log(`
Bootstrap complete!

Next steps:
  1. cd ${opts.outDir} && npm install
  2. npm run build           # regenerate azure-pipelines.yml
  3. Edit release.ts         # add your artifact source and environments
  4. npm run diff            # check drift vs Azure DevOps
  5. Register release-sync.yml in Azure DevOps as a new pipeline
     (point it at: pipelines/release-sync.yml)
  6. Grant the build service account permission to manage releases:
     ${org ? `https://dev.azure.com/${org}/${project || '<project>'}/_settings/permissions` : '<org>/<project> → Project Settings → Permissions'}
     Search for: "${project || '<project>'} Build Service (${org || '<org>'})"
     Grant role: Release Definition Contributor

See pipelines/README.md for full documentation.`);
}
