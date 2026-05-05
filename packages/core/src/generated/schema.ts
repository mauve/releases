/* eslint-disable */
/**
 * Auto-generated from service-schema.json. Do not edit by hand.
 * Run `pnpm sync-schema` to regenerate.
 */

/**
 * A pipeline definition
 */
export type Pipeline = Pipeline1 | string;
export type Pipeline1 =
  | {
      stages: Stages;
      /**
       * Pool where jobs in this pipeline will run unless otherwise specified
       */
      pool?:
        | string
        | {
            /**
             * Name of a pool
             */
            name?: string;
            /**
             * Specify a list of demands for a private pool
             */
            demands?: string | NonEmptyString[];
            /**
             * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
             */
            vmImage?: string;
            [k: string]: unknown | undefined;
          };
      /**
       * Pipeline name
       */
      name?: string;
      /**
       * Append the commit message to the build number
       */
      appendCommitMessageToRunName?: string;
      /**
       * Continuous integration triggers
       */
      trigger?:
        | string
        | BranchFilter[]
        | {
            /**
             * Whether to batch changes per branch
             */
            batch?: string;
            branches?: IncludeExcludeFilters;
            paths?: IncludeExcludeFilters;
            tags?: IncludeExcludeFilters;
          };
      parameters?: PipelineTemplateParameters;
      /**
       * Pull request triggers
       */
      pr?:
        | string
        | BranchFilter[]
        | {
            /**
             * Whether to cancel running PR builds when a new commit lands in the branch
             */
            autoCancel?: string;
            branches?: IncludeExcludeFilters1;
            paths?: IncludeExcludeFilters2;
            /**
             * Whether to start a run when a draft PR is created
             */
            drafts?: string;
          };
      schedules?: Schedules;
      /**
       * Containers and repositories used in the build
       */
      resources?:
        | {
            builds?: BuildResources;
            containers?: ContainerResources;
            pipelines?: PipelineResources;
            repositories?: RepositoryResources;
            webhooks?: WebhookResources;
            packages?: PackageResources;
          }
        | LegacyResource[];
      /**
       * Variables for this pipeline
       */
      variables?:
        | {
            [k: string]: unknown | undefined;
          }
        | Variable[];
      /**
       * Behavior lock requests from this stage should exhibit in relation to other exclusive lock requests
       */
      lockBehavior?: string;
    }
  | {
      extends: Extends;
      /**
       * Pool where jobs in this pipeline will run unless otherwise specified
       */
      pool?:
        | string
        | {
            /**
             * Name of a pool
             */
            name?: string;
            /**
             * Specify a list of demands for a private pool
             */
            demands?: string | NonEmptyString[];
            /**
             * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
             */
            vmImage?: string;
            [k: string]: unknown | undefined;
          };
      /**
       * Pipeline name
       */
      name?: string;
      /**
       * Append the commit message to the build number
       */
      appendCommitMessageToRunName?: string;
      /**
       * Continuous integration triggers
       */
      trigger?:
        | string
        | BranchFilter[]
        | {
            /**
             * Whether to batch changes per branch
             */
            batch?: string;
            branches?: IncludeExcludeFilters;
            paths?: IncludeExcludeFilters;
            tags?: IncludeExcludeFilters;
          };
      parameters?: PipelineTemplateParameters1;
      /**
       * Pull request triggers
       */
      pr?:
        | string
        | BranchFilter[]
        | {
            /**
             * Whether to cancel running PR builds when a new commit lands in the branch
             */
            autoCancel?: string;
            branches?: IncludeExcludeFilters1;
            paths?: IncludeExcludeFilters2;
            /**
             * Whether to start a run when a draft PR is created
             */
            drafts?: string;
          };
      schedules?: Schedules1;
      /**
       * Containers and repositories used in the build
       */
      resources?:
        | {
            builds?: BuildResources;
            containers?: ContainerResources;
            pipelines?: PipelineResources;
            repositories?: RepositoryResources;
            webhooks?: WebhookResources;
            packages?: PackageResources;
          }
        | LegacyResource[];
      /**
       * Variables for this pipeline
       */
      variables?:
        | {
            [k: string]: unknown | undefined;
          }
        | Variable[];
      /**
       * Behavior lock requests from this stage should exhibit in relation to other exclusive lock requests
       */
      lockBehavior?: string;
    }
  | {
      jobs: Jobs1;
      /**
       * Pool where jobs in this pipeline will run unless otherwise specified
       */
      pool?:
        | string
        | {
            /**
             * Name of a pool
             */
            name?: string;
            /**
             * Specify a list of demands for a private pool
             */
            demands?: string | NonEmptyString[];
            /**
             * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
             */
            vmImage?: string;
            [k: string]: unknown | undefined;
          };
      /**
       * Pipeline name
       */
      name?: string;
      /**
       * Append the commit message to the build number
       */
      appendCommitMessageToRunName?: string;
      /**
       * Continuous integration triggers
       */
      trigger?:
        | string
        | BranchFilter[]
        | {
            /**
             * Whether to batch changes per branch
             */
            batch?: string;
            branches?: IncludeExcludeFilters;
            paths?: IncludeExcludeFilters;
            tags?: IncludeExcludeFilters;
          };
      parameters?: PipelineTemplateParameters2;
      /**
       * Pull request triggers
       */
      pr?:
        | string
        | BranchFilter[]
        | {
            /**
             * Whether to cancel running PR builds when a new commit lands in the branch
             */
            autoCancel?: string;
            branches?: IncludeExcludeFilters1;
            paths?: IncludeExcludeFilters2;
            /**
             * Whether to start a run when a draft PR is created
             */
            drafts?: string;
          };
      schedules?: Schedules2;
      /**
       * Containers and repositories used in the build
       */
      resources?:
        | {
            builds?: BuildResources;
            containers?: ContainerResources;
            pipelines?: PipelineResources;
            repositories?: RepositoryResources;
            webhooks?: WebhookResources;
            packages?: PackageResources;
          }
        | LegacyResource[];
      /**
       * Variables for this pipeline
       */
      variables?:
        | {
            [k: string]: unknown | undefined;
          }
        | Variable[];
      /**
       * Behavior lock requests from this stage should exhibit in relation to other exclusive lock requests
       */
      lockBehavior?: string;
    }
  | {
      phases: Phases;
      /**
       * Pipeline name
       */
      name?: string;
      /**
       * Append the commit message to the build number
       */
      appendCommitMessageToRunName?: string;
      /**
       * Continuous integration triggers
       */
      trigger?:
        | string
        | BranchFilter[]
        | {
            /**
             * Whether to batch changes per branch
             */
            batch?: string;
            branches?: IncludeExcludeFilters;
            paths?: IncludeExcludeFilters;
            tags?: IncludeExcludeFilters;
          };
      parameters?: PipelineTemplateParameters3;
      /**
       * Pull request triggers
       */
      pr?:
        | string
        | BranchFilter[]
        | {
            /**
             * Whether to cancel running PR builds when a new commit lands in the branch
             */
            autoCancel?: string;
            branches?: IncludeExcludeFilters1;
            paths?: IncludeExcludeFilters2;
            /**
             * Whether to start a run when a draft PR is created
             */
            drafts?: string;
          };
      schedules?: Schedules3;
      /**
       * Containers and repositories used in the build
       */
      resources?:
        | {
            builds?: BuildResources;
            containers?: ContainerResources;
            pipelines?: PipelineResources;
            repositories?: RepositoryResources;
            webhooks?: WebhookResources;
            packages?: PackageResources;
          }
        | LegacyResource[];
      /**
       * Variables for this pipeline
       */
      variables?:
        | {
            [k: string]: unknown | undefined;
          }
        | Variable[];
      /**
       * Behavior lock requests from this stage should exhibit in relation to other exclusive lock requests
       */
      lockBehavior?: string;
    }
  | {
      /**
       * Execution strategy for this job
       */
      strategy?:
        | {
            /**
             * Matrix defining the job strategy
             */
            matrix?:
              | {
                  [k: string]: unknown | undefined;
                }
              | string;
            /**
             * Maximum number of jobs running in parallel
             */
            maxParallel?: string;
          }
        | {
            /**
             * Run the job this many times
             */
            parallel?: string;
          };
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Pool where this job will run
       */
      pool?:
        | string
        | {
            /**
             * Name of a pool
             */
            name?: string;
            /**
             * Specify a list of demands for a private pool
             */
            demands?: string | NonEmptyString[];
            /**
             * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
             */
            vmImage?: string;
            [k: string]: unknown | undefined;
          };
      /**
       * Container resource name
       */
      container?:
        | string
        | {
            /**
             * The alias of the container resource
             */
            alias?: string;
          }
        | {
            /**
             * ID of the service endpoint connecting to a private container registry
             */
            endpoint?: string;
            env?: MappingOfStringString;
            /**
             * Container image tag
             */
            image: string;
            /**
             * Set this flag to false to force the agent not to setup the /var/run/docker.sock volume on container jobs
             */
            mapDockerSocket?: string;
            /**
             * Options to pass into container host
             */
            options?: string;
            ports?: SequenceOfStringAllowExpressions;
            volumes?: SequenceOfStringAllowExpressions1;
            mountReadOnly?: ReadOnlyMounts;
          };
      services?: JobServices2;
      workspace?: JobWorkspace2;
      steps: Steps9;
      /**
       * Pipeline name
       */
      name?: string;
      /**
       * Append the commit message to the build number
       */
      appendCommitMessageToRunName?: string;
      /**
       * Continuous integration triggers
       */
      trigger?:
        | string
        | BranchFilter[]
        | {
            /**
             * Whether to batch changes per branch
             */
            batch?: string;
            branches?: IncludeExcludeFilters;
            paths?: IncludeExcludeFilters;
            tags?: IncludeExcludeFilters;
          };
      parameters?: PipelineTemplateParameters4;
      /**
       * Pull request triggers
       */
      pr?:
        | string
        | BranchFilter[]
        | {
            /**
             * Whether to cancel running PR builds when a new commit lands in the branch
             */
            autoCancel?: string;
            branches?: IncludeExcludeFilters1;
            paths?: IncludeExcludeFilters2;
            /**
             * Whether to start a run when a draft PR is created
             */
            drafts?: string;
          };
      schedules?: Schedules4;
      /**
       * Containers and repositories used in the build
       */
      resources?:
        | {
            builds?: BuildResources;
            containers?: ContainerResources;
            pipelines?: PipelineResources;
            repositories?: RepositoryResources;
            webhooks?: WebhookResources;
            packages?: PackageResources;
          }
        | LegacyResource[];
      /**
       * Variables for this pipeline
       */
      variables?:
        | {
            [k: string]: unknown | undefined;
          }
        | Variable[];
      /**
       * Behavior lock requests from this stage should exhibit in relation to other exclusive lock requests
       */
      lockBehavior?: string;
    }
  | {
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Queue where this phase will run
       */
      queue?:
        | string
        | {
            /**
             * Time to wait for the phase to cancel before forcibly terminating it
             */
            cancelTimeoutInMinutes?: string;
            /**
             * Container resource name
             */
            container?: string;
            /**
             * List of demands (for a private queue)
             */
            demands?: string | NonEmptyString[];
            matrix?: PhaseTargetMatrix;
            /**
             * Name of a queue
             */
            name?: string;
            /**
             * Maximum number of parallel agent executions
             */
            parallel?: string;
            /**
             * Time to wait before cancelling the phase
             */
            timeoutInMinutes?: string;
            workspace?: PhaseTargetWorkspace;
          };
      steps: Steps10;
      /**
       * Pipeline name
       */
      name?: string;
      /**
       * Append the commit message to the build number
       */
      appendCommitMessageToRunName?: string;
      /**
       * Continuous integration triggers
       */
      trigger?:
        | string
        | BranchFilter[]
        | {
            /**
             * Whether to batch changes per branch
             */
            batch?: string;
            branches?: IncludeExcludeFilters;
            paths?: IncludeExcludeFilters;
            tags?: IncludeExcludeFilters;
          };
      parameters?: PipelineTemplateParameters5;
      /**
       * Pull request triggers
       */
      pr?:
        | string
        | BranchFilter[]
        | {
            /**
             * Whether to cancel running PR builds when a new commit lands in the branch
             */
            autoCancel?: string;
            branches?: IncludeExcludeFilters1;
            paths?: IncludeExcludeFilters2;
            /**
             * Whether to start a run when a draft PR is created
             */
            drafts?: string;
          };
      schedules?: Schedules5;
      /**
       * Containers and repositories used in the build
       */
      resources?:
        | {
            builds?: BuildResources;
            containers?: ContainerResources;
            pipelines?: PipelineResources;
            repositories?: RepositoryResources;
            webhooks?: WebhookResources;
            packages?: PackageResources;
          }
        | LegacyResource[];
      /**
       * Variables for this pipeline
       */
      variables?:
        | {
            [k: string]: unknown | undefined;
          }
        | Variable[];
      /**
       * Behavior lock requests from this stage should exhibit in relation to other exclusive lock requests
       */
      lockBehavior?: string;
    }
  | {
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * True if this is an agent-less phase (runs on server)
       */
      server?:
        | string
        | {
            /**
             * Time to wait for the job to cancel before forcibly terminating it
             */
            cancelTimeoutInMinutes?: string;
            matrix?: PhaseTargetMatrix;
            /**
             * Maximum number of parallel agent executions
             */
            parallel?: string;
            /**
             * Time to wait before cancelling the job
             */
            timeoutInMinutes?: string;
          };
      steps: Steps11;
      /**
       * Pipeline name
       */
      name?: string;
      /**
       * Append the commit message to the build number
       */
      appendCommitMessageToRunName?: string;
      /**
       * Continuous integration triggers
       */
      trigger?:
        | string
        | BranchFilter[]
        | {
            /**
             * Whether to batch changes per branch
             */
            batch?: string;
            branches?: IncludeExcludeFilters;
            paths?: IncludeExcludeFilters;
            tags?: IncludeExcludeFilters;
          };
      parameters?: PipelineTemplateParameters6;
      /**
       * Pull request triggers
       */
      pr?:
        | string
        | BranchFilter[]
        | {
            /**
             * Whether to cancel running PR builds when a new commit lands in the branch
             */
            autoCancel?: string;
            branches?: IncludeExcludeFilters1;
            paths?: IncludeExcludeFilters2;
            /**
             * Whether to start a run when a draft PR is created
             */
            drafts?: string;
          };
      schedules?: Schedules6;
      /**
       * Containers and repositories used in the build
       */
      resources?:
        | {
            builds?: BuildResources;
            containers?: ContainerResources;
            pipelines?: PipelineResources;
            repositories?: RepositoryResources;
            webhooks?: WebhookResources;
            packages?: PackageResources;
          }
        | LegacyResource[];
      /**
       * Variables for this pipeline
       */
      variables?:
        | {
            [k: string]: unknown | undefined;
          }
        | Variable[];
      /**
       * Behavior lock requests from this stage should exhibit in relation to other exclusive lock requests
       */
      lockBehavior?: string;
    };
export type Stage =
  | {
      /**
       * ID of the stage
       */
      stage?: string;
      /**
       * Path to the group which the stage belongs to
       */
      group?: string;
      /**
       * Human-readable name for the stage
       */
      displayName?: string;
      /**
       * Pool where jobs in this stage will run unless otherwise specified
       */
      pool?:
        | string
        | {
            /**
             * Name of a pool
             */
            name?: string;
            /**
             * Specify a list of demands for a private pool
             */
            demands?: string | NonEmptyString[];
            /**
             * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
             */
            vmImage?: string;
            [k: string]: unknown | undefined;
          };
      /**
       * Any stages which must complete before this one
       */
      dependsOn?: string | String[];
      /**
       * Evaluate this condition expression to determine whether to run this stage
       */
      condition?: string;
      /**
       * Stage-specific variables
       */
      variables?:
        | {
            [k: string]: unknown | undefined;
          }
        | Variable[];
      jobs?: Jobs;
      /**
       * Behavior lock requests from this stage should exhibit in relation to other exclusive lock requests
       */
      lockBehavior?: string;
      /**
       * Stage trigger manual or automatic (default)
       */
      trigger?: string;
      /**
       * Setting false prevents the stage from being skipped. By default it's always true
       */
      isSkippable?: string;
      templateContext?: TemplateContext2;
      checks?: Checks;
    }
  | {
      /**
       * Reference to a template for this stage
       */
      template?: string;
      parameters?: Mapping3;
    };
export type NonEmptyString = string;
export type String = string;
export type Variable =
  | {
      name?: NonEmptyString;
      value?: String;
      readonly?: Boolean;
    }
  | {
      group?: NonEmptyString;
    }
  | {
      template?: NonEmptyString;
      parameters?: Mapping;
    };
export type Boolean = string;
export type Job =
  | {
      /**
       * ID of the job
       */
      job?: string;
      /**
       * Human-readable name for the job
       */
      displayName?: string;
      /**
       * Any jobs which must complete before this one
       */
      dependsOn?: string | String[];
      /**
       * Evaluate this condition expression to determine whether to run this job
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Time to wait for this job to complete before the server kills it
       */
      timeoutInMinutes?: string;
      /**
       * Time to wait for the job to cancel before forcibly terminating it
       */
      cancelTimeoutInMinutes?: string;
      /**
       * Job-specific variables
       */
      variables?:
        | {
            [k: string]: unknown | undefined;
          }
        | Variable[];
      /**
       * Execution strategy for this job
       */
      strategy?:
        | {
            /**
             * Matrix defining the job strategy
             */
            matrix?:
              | {
                  [k: string]: unknown | undefined;
                }
              | string;
            /**
             * Maximum number of jobs running in parallel
             */
            maxParallel?: string;
          }
        | {
            /**
             * Run the job this many times
             */
            parallel?: string;
          };
      /**
       * Pool where this job will run
       */
      pool?:
        | string
        | {
            /**
             * Name of a pool
             */
            name?: string;
            /**
             * Specify a list of demands for a private pool
             */
            demands?: string | NonEmptyString[];
            /**
             * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
             */
            vmImage?: string;
            [k: string]: unknown | undefined;
          };
      /**
       * Container resource name
       */
      container?:
        | string
        | {
            /**
             * The alias of the container resource
             */
            alias?: string;
          }
        | {
            /**
             * ID of the service endpoint connecting to a private container registry
             */
            endpoint?: string;
            env?: MappingOfStringString;
            /**
             * Container image tag
             */
            image: string;
            /**
             * Set this flag to false to force the agent not to setup the /var/run/docker.sock volume on container jobs
             */
            mapDockerSocket?: string;
            /**
             * Options to pass into container host
             */
            options?: string;
            ports?: SequenceOfStringAllowExpressions;
            volumes?: SequenceOfStringAllowExpressions1;
            mountReadOnly?: ReadOnlyMounts;
          };
      services?: JobServices;
      workspace?: JobWorkspace;
      uses?: ExplicitResources;
      steps?: Steps;
      templateContext?: TemplateContext;
    }
  | {
      /**
       * Name of the deployment job, A-Z, a-z, 0-9, and underscore. The word deploy is a keyword and is unsupported as the deployment name
       */
      deployment?: string;
      /**
       * Human-readable name for the deployment
       */
      displayName?: string;
      /**
       * Any jobs which must complete before this one
       */
      dependsOn?: string | String[];
      /**
       * Evaluate this condition expression to determine whether to run this deployment
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Time to wait for this job to complete before the server kills it
       */
      timeoutInMinutes?: string;
      /**
       * Time to wait for the job to cancel before forcibly terminating it
       */
      cancelTimeoutInMinutes?: string;
      /**
       * Deployment-specific variables
       */
      variables?:
        | {
            [k: string]: unknown | undefined;
          }
        | Variable[];
      /**
       * Pool where this job will run
       */
      pool?:
        | string
        | {
            /**
             * Name of a pool
             */
            name?: string;
            /**
             * Specify a list of demands for a private pool
             */
            demands?: string | NonEmptyString[];
            /**
             * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
             */
            vmImage?: string;
            [k: string]: unknown | undefined;
          };
      /**
       * Target environment name and optionally a resource name to record the deployment history.
       * Format: environment-name.resource-name
       */
      environment?:
        | string
        | {
            /**
             * Name of environment
             */
            name?: string;
            /**
             * Name of resource
             */
            resourceName?: string;
            /**
             * Id of resource
             */
            resourceId?: string;
            /**
             * Type of environment resource
             */
            resourceType?: string;
            /**
             * List of tag filters
             */
            tags?: string;
          };
      /**
       * Execution strategy for this deployment
       */
      strategy?:
        | {
            runOnce?: RunOnceDeploymentStrategy;
          }
        | {
            rolling?: RollingDeploymentStrategy;
          }
        | {
            canary?: CanaryDeploymentStrategy;
          };
      workspace?: JobWorkspace1;
      uses?: ExplicitResources1;
      /**
       * Container resource name
       */
      container?:
        | string
        | {
            /**
             * The alias of the container resource
             */
            alias?: string;
          }
        | {
            /**
             * ID of the service endpoint connecting to a private container registry
             */
            endpoint?: string;
            env?: MappingOfStringString;
            /**
             * Container image tag
             */
            image: string;
            /**
             * Set this flag to false to force the agent not to setup the /var/run/docker.sock volume on container jobs
             */
            mapDockerSocket?: string;
            /**
             * Options to pass into container host
             */
            options?: string;
            ports?: SequenceOfStringAllowExpressions;
            volumes?: SequenceOfStringAllowExpressions1;
            mountReadOnly?: ReadOnlyMounts;
          };
      services?: JobServices1;
      templateContext?: TemplateContext1;
    }
  | {
      /**
       * Reference to a template for this deployment
       */
      template?: string;
      parameters?: Mapping2;
    };
export type StringAllowExpressions = string;
/**
 * Ports to expose on the container
 */
export type SequenceOfStringAllowExpressions = StringAllowExpressions[];
/**
 * Volumes to mount on the container
 */
export type SequenceOfStringAllowExpressions1 = StringAllowExpressions[];
/**
 * Repository references
 */
export type SequenceOfNonEmptyString = NonEmptyString[];
/**
 * Pool references
 */
export type SequenceOfNonEmptyString1 = NonEmptyString[];
export type Step =
  | Task
  | {
      /**
       * An inline script
       */
      script: string;
      /**
       * Fail the task if output is sent to Stderr?
       */
      failOnStderr?: string;
      /**
       * Start the script with this working directory
       */
      workingDirectory?: string;
      /**
       * Evaluate this condition expression to determine whether to run this task
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Human-readable name for the task
       */
      displayName?: string;
      /**
       * Environment in which to run this task
       */
      target?:
        | string
        | {
            /**
             * Container to target (or 'host' for host machine)
             */
            container?: string;
            /**
             * Set of allowed logging commands ('any' or 'restricted')
             */
            commands?: 'any' | 'restricted';
            /**
             * Restrictions on which variables that can be set
             */
            settableVariables?: string | NonEmptyString[];
          };
      /**
       * Run this task when the job runs?
       */
      enabled?: string;
      env?: MappingOfStringString1;
      /**
       * ID of the step
       */
      name?: string;
      /**
       * Time to wait for this task to complete before the server kills it
       */
      timeoutInMinutes?: string;
      /**
       * Number of retries if the task fails
       */
      retryCountOnTaskFailure?: string;
    }
  | {
      /**
       * Inline PowerShell or reference to a PowerShell file
       */
      powershell: string;
      errorActionPreference?: String;
      /**
       * Fail the task if output is sent to Stderr?
       */
      failOnStderr?: string;
      /**
       * Check the final exit code of the script to determine whether the step succeeded?
       */
      ignoreLASTEXITCODE?: string;
      /**
       * Start the script with this working directory
       */
      workingDirectory?: string;
      /**
       * Evaluate this condition expression to determine whether to run this task
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Human-readable name for the task
       */
      displayName?: string;
      /**
       * Environment in which to run this task
       */
      target?:
        | string
        | {
            /**
             * Container to target (or 'host' for host machine)
             */
            container?: string;
            /**
             * Set of allowed logging commands ('any' or 'restricted')
             */
            commands?: 'any' | 'restricted';
            /**
             * Restrictions on which variables that can be set
             */
            settableVariables?: string | NonEmptyString[];
          };
      /**
       * Run this task when the job runs?
       */
      enabled?: string;
      env?: MappingOfStringString2;
      /**
       * ID of the step
       */
      name?: string;
      /**
       * Time to wait for this task to complete before the server kills it
       */
      timeoutInMinutes?: string;
      /**
       * Number of retries if the task fails
       */
      retryCountOnTaskFailure?: string;
    }
  | {
      /**
       * Inline PowerShell or reference to a PowerShell file
       */
      pwsh: string;
      errorActionPreference?: String;
      /**
       * Fail the task if output is sent to Stderr?
       */
      failOnStderr?: string;
      /**
       * Check the final exit code of the script to determine whether the step succeeded?
       */
      ignoreLASTEXITCODE?: string;
      /**
       * Start the script with this working directory
       */
      workingDirectory?: string;
      /**
       * Evaluate this condition expression to determine whether to run this task
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Human-readable name for the task
       */
      displayName?: string;
      /**
       * Environment in which to run this task
       */
      target?:
        | string
        | {
            /**
             * Container to target (or 'host' for host machine)
             */
            container?: string;
            /**
             * Set of allowed logging commands ('any' or 'restricted')
             */
            commands?: 'any' | 'restricted';
            /**
             * Restrictions on which variables that can be set
             */
            settableVariables?: string | NonEmptyString[];
          };
      /**
       * Run this task when the job runs?
       */
      enabled?: string;
      env?: MappingOfStringString3;
      /**
       * ID of the step
       */
      name?: string;
      /**
       * Time to wait for this task to complete before the server kills it
       */
      timeoutInMinutes?: string;
      /**
       * Number of retries if the task fails
       */
      retryCountOnTaskFailure?: string;
    }
  | {
      /**
       * An inline script
       */
      bash: string;
      /**
       * Fail the task if output is sent to Stderr?
       */
      failOnStderr?: string;
      /**
       * Start the script with this working directory
       */
      workingDirectory?: string;
      /**
       * Evaluate this condition expression to determine whether to run this task
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Human-readable name for the task
       */
      displayName?: string;
      /**
       * Environment in which to run this task
       */
      target?:
        | string
        | {
            /**
             * Container to target (or 'host' for host machine)
             */
            container?: string;
            /**
             * Set of allowed logging commands ('any' or 'restricted')
             */
            commands?: 'any' | 'restricted';
            /**
             * Restrictions on which variables that can be set
             */
            settableVariables?: string | NonEmptyString[];
          };
      /**
       * Run this task when the job runs?
       */
      enabled?: string;
      env?: MappingOfStringString4;
      /**
       * ID of the step
       */
      name?: string;
      /**
       * Time to wait for this task to complete before the server kills it
       */
      timeoutInMinutes?: string;
      /**
       * Number of retries if the task fails
       */
      retryCountOnTaskFailure?: string;
    }
  | {
      /**
       * Alias of the repository resource to check out or 'none'
       */
      checkout?: string;
      /**
       * Scorch the repo before fetching?
       */
      clean?: 'true' | 'false';
      /**
       * Depth of Git graph to fetch
       */
      fetchDepth?: string;
      /**
       * Filter Git history
       */
      fetchFilter?: string;
      /**
       * Fetch tags?
       */
      fetchTags?: string;
      /**
       * Fetch Git-LFS objects?
       */
      lfs?: string;
      /**
       * Keep credentials available for later use?
       */
      persistCredentials?: string;
      /**
       * Check out Git submodules?
       */
      submodules?: string;
      /**
       * Path of the repository to check out
       */
      path?: string;
      /**
       * Directories for sparse checkout in cone mode and prioritized over sparseCheckoutPatterns if both properties are provided
       */
      sparseCheckoutDirectories?: string;
      /**
       * Patterns for sparse checkout in non-cone mode that are ignored if sparseCheckoutDirectories is provided
       */
      sparseCheckoutPatterns?: string;
      /**
       * Make the repository root directory the default working directory?
       */
      workspaceRepo?: 'true' | 'false';
      /**
       * Evaluate this condition expression to determine whether to run this task
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Human-readable name for the task
       */
      displayName?: string;
      /**
       * Environment in which to run this task
       */
      target?:
        | string
        | {
            /**
             * Container to target (or 'host' for host machine)
             */
            container?: string;
            /**
             * Set of allowed logging commands ('any' or 'restricted')
             */
            commands?: 'any' | 'restricted';
            /**
             * Restrictions on which variables that can be set
             */
            settableVariables?: string | NonEmptyString[];
          };
      /**
       * Run this task when the job runs?
       */
      enabled?: string;
      env?: MappingOfStringString5;
      /**
       * ID of the step
       */
      name?: string;
      /**
       * Time to wait for this task to complete before the server kills it
       */
      timeoutInMinutes?: string;
      /**
       * Number of retries if the task fails
       */
      retryCountOnTaskFailure?: string;
    }
  | {
      /**
       * Reference to the pipeline
       */
      download: string;
      /**
       * Name of the artifact to download
       */
      artifact?: string;
      /**
       * Pattern to download files from artifact
       */
      patterns?: string;
      /**
       * Evaluate this condition expression to determine whether to run this task
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Human-readable name for the task
       */
      displayName?: string;
      /**
       * Environment in which to run this task
       */
      target?:
        | string
        | {
            /**
             * Container to target (or 'host' for host machine)
             */
            container?: string;
            /**
             * Set of allowed logging commands ('any' or 'restricted')
             */
            commands?: 'any' | 'restricted';
            /**
             * Restrictions on which variables that can be set
             */
            settableVariables?: string | NonEmptyString[];
          };
      /**
       * Run this task when the job runs?
       */
      enabled?: string;
      env?: MappingOfStringString6;
      /**
       * ID of the step
       */
      name?: string;
      /**
       * Time to wait for this task to complete before the server kills it
       */
      timeoutInMinutes?: string;
      /**
       * Number of retries if the task fails
       */
      retryCountOnTaskFailure?: string;
    }
  | {
      /**
       * ID for the build resource
       */
      downloadBuild?: string;
      /**
       * Name of the artifact to download
       */
      artifact?: string;
      /**
       * Path to download the artifact into
       */
      path?: string;
      /**
       * Downloads the files which matches the patterns
       */
      patterns?: string;
      inputs?: MappingOfStringString7;
      /**
       * Evaluate this condition expression to determine whether to run this task
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Human-readable name for the task
       */
      displayName?: string;
      /**
       * Environment in which to run this task
       */
      target?:
        | string
        | {
            /**
             * Container to target (or 'host' for host machine)
             */
            container?: string;
            /**
             * Set of allowed logging commands ('any' or 'restricted')
             */
            commands?: 'any' | 'restricted';
            /**
             * Restrictions on which variables that can be set
             */
            settableVariables?: string | NonEmptyString[];
          };
      /**
       * Run this task when the job runs?
       */
      enabled?: string;
      env?: MappingOfStringString8;
      /**
       * ID of the step
       */
      name?: string;
      /**
       * Time to wait for this task to complete before the server kills it
       */
      timeoutInMinutes?: string;
      /**
       * Number of retries if the task fails
       */
      retryCountOnTaskFailure?: string;
    }
  | {
      /**
       * ID for the package resource
       */
      getPackage?: string;
      /**
       * Path to download the package into
       */
      path?: string;
      /**
       * Evaluate this condition expression to determine whether to run this task
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Human-readable name for the task
       */
      displayName?: string;
      /**
       * Environment in which to run this task
       */
      target?:
        | string
        | {
            /**
             * Container to target (or 'host' for host machine)
             */
            container?: string;
            /**
             * Set of allowed logging commands ('any' or 'restricted')
             */
            commands?: 'any' | 'restricted';
            /**
             * Restrictions on which variables that can be set
             */
            settableVariables?: string | NonEmptyString[];
          };
      /**
       * Run this task when the job runs?
       */
      enabled?: string;
      env?: MappingOfStringString9;
      /**
       * ID of the step
       */
      name?: string;
      /**
       * Time to wait for this task to complete before the server kills it
       */
      timeoutInMinutes?: string;
      /**
       * Number of retries if the task fails
       */
      retryCountOnTaskFailure?: string;
    }
  | {
      upload?: string;
      artifact?: String;
      /**
       * Evaluate this condition expression to determine whether to run this task
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Human-readable name for the task
       */
      displayName?: string;
      /**
       * Environment in which to run this task
       */
      target?:
        | string
        | {
            /**
             * Container to target (or 'host' for host machine)
             */
            container?: string;
            /**
             * Set of allowed logging commands ('any' or 'restricted')
             */
            commands?: 'any' | 'restricted';
            /**
             * Restrictions on which variables that can be set
             */
            settableVariables?: string | NonEmptyString[];
          };
      /**
       * Run this task when the job runs?
       */
      enabled?: string;
      env?: MappingOfStringString10;
      /**
       * ID of the step
       */
      name?: string;
      /**
       * Time to wait for this task to complete before the server kills it
       */
      timeoutInMinutes?: string;
      /**
       * Number of retries if the task fails
       */
      retryCountOnTaskFailure?: string;
    }
  | {
      publish?: String;
      artifact?: String;
      /**
       * Evaluate this condition expression to determine whether to run this task
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Human-readable name for the task
       */
      displayName?: string;
      /**
       * Environment in which to run this task
       */
      target?:
        | string
        | {
            /**
             * Container to target (or 'host' for host machine)
             */
            container?: string;
            /**
             * Set of allowed logging commands ('any' or 'restricted')
             */
            commands?: 'any' | 'restricted';
            /**
             * Restrictions on which variables that can be set
             */
            settableVariables?: string | NonEmptyString[];
          };
      /**
       * Run this task when the job runs?
       */
      enabled?: string;
      env?: MappingOfStringString11;
      /**
       * ID of the step
       */
      name?: string;
      /**
       * Time to wait for this task to complete before the server kills it
       */
      timeoutInMinutes?: string;
      /**
       * Number of retries if the task fails
       */
      retryCountOnTaskFailure?: string;
    }
  | {
      /**
       * Reference to a template for this step
       */
      template?: string;
      parameters?: Mapping1;
    }
  | {
      reviewApp?: String;
      /**
       * Evaluate this condition expression to determine whether to run this task
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Human-readable name for the task
       */
      displayName?: string;
      /**
       * Environment in which to run this task
       */
      target?:
        | string
        | {
            /**
             * Container to target (or 'host' for host machine)
             */
            container?: string;
            /**
             * Set of allowed logging commands ('any' or 'restricted')
             */
            commands?: 'any' | 'restricted';
            /**
             * Restrictions on which variables that can be set
             */
            settableVariables?: string | NonEmptyString[];
          };
      /**
       * Run this task when the job runs?
       */
      enabled?: string;
      env?: MappingOfStringString12;
      /**
       * ID of the step
       */
      name?: string;
      /**
       * Time to wait for this task to complete before the server kills it
       */
      timeoutInMinutes?: string;
      /**
       * Number of retries if the task fails
       */
      retryCountOnTaskFailure?: string;
    };
export type Task = (
  | {
      /**
       * PowerShell
       *
       * Run a PowerShell script on Linux, macOS, or Windows
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * PowerShell inputs
       */
      inputs?: {
        /**
         * Type
         */
        targetType?: 'filePath' | 'inline';
        /**
         * Script Path
         */
        filePath?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Script
         */
        script?: string;
        /**
         * ErrorActionPreference
         */
        errorActionPreference?: 'default' | 'stop' | 'continue' | 'silentlyContinue';
        /**
         * WarningPreference
         */
        warningPreference?: 'default' | 'stop' | 'continue' | 'silentlyContinue';
        /**
         * InformationPreference
         */
        informationPreference?: 'default' | 'stop' | 'continue' | 'silentlyContinue';
        /**
         * VerbosePreference
         */
        verbosePreference?: 'default' | 'stop' | 'continue' | 'silentlyContinue';
        /**
         * DebugPreference
         */
        debugPreference?: 'default' | 'stop' | 'continue' | 'silentlyContinue';
        /**
         * ProgressPreference
         */
        progressPreference?: 'default' | 'stop' | 'continue' | 'silentlyContinue';
        /**
         * Fail on Standard Error
         */
        failOnStderr?: boolean;
        /**
         * Show warnings as Azure DevOps warnings
         */
        showWarnings?: boolean;
        /**
         * Ignore $LASTEXITCODE
         */
        ignoreLASTEXITCODE?: boolean;
        /**
         * Use PowerShell Core
         */
        pwsh?: boolean;
        /**
         * Working Directory
         */
        workingDirectory?: string;
        /**
         * Run script in the separate scope
         */
        runScriptInSeparateScope?: boolean;
      };
    }
  | {
      /**
       * PowerShell
       *
       * Run a PowerShell script
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * PowerShell inputs
       */
      inputs?: {
        /**
         * Type
         */
        scriptType?: 'inlineScript' | 'filePath';
        /**
         * Script Path
         */
        scriptName?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Working folder
         */
        workingFolder?: string;
        /**
         * Inline Script
         */
        inlineScript?: string;
        /**
         * Fail on Standard Error
         */
        failOnStandardError?: boolean;
      };
    }
  | {
      /**
       * Azure PowerShell
       *
       * Run a PowerShell script within an Azure environment
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure PowerShell inputs
       */
      inputs: {
        /**
         * Azure Subscription
         */
        azureSubscription: string;
        /**
         * Script Type
         */
        ScriptType?: 'FilePath' | 'InlineScript';
        /**
         * Script Path
         */
        ScriptPath?: string;
        /**
         * Inline Script
         */
        Inline?: string;
        /**
         * Script Arguments
         */
        ScriptArguments?: string;
        /**
         * ErrorActionPreference
         */
        errorActionPreference?: 'stop' | 'continue' | 'silentlyContinue';
        /**
         * Fail on Standard Error
         */
        FailOnStandardError?: boolean;
        /**
         * Azure PowerShell Version
         */
        azurePowerShellVersion?: 'LatestVersion' | 'OtherVersion';
        /**
         * Preferred Azure PowerShell Version
         */
        preferredAzurePowerShellVersion?: string;
        /**
         * Use PowerShell Core
         */
        pwsh?: boolean;
        /**
         * Validate script signature
         */
        validateScriptSignature?: boolean;
        /**
         * Working Directory
         */
        workingDirectory?: string;
      };
    }
  | {
      /**
       * Azure PowerShell
       *
       * Run a PowerShell script within an Azure environment
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure PowerShell inputs
       */
      inputs: {
        /**
         * Azure Subscription
         */
        azureSubscription: string;
        /**
         * Script Type
         */
        ScriptType?: 'FilePath' | 'InlineScript';
        /**
         * Script Path
         */
        ScriptPath?: string;
        /**
         * Inline Script
         */
        Inline?: string;
        /**
         * Script Arguments
         */
        ScriptArguments?: string;
        /**
         * ErrorActionPreference
         */
        errorActionPreference?: 'stop' | 'continue' | 'silentlyContinue';
        /**
         * Fail on Standard Error
         */
        FailOnStandardError?: boolean;
        /**
         * Restrict scope of context to current task
         */
        RestrictContextToCurrentTask?: boolean;
        /**
         * Azure PowerShell Version
         */
        azurePowerShellVersion?: 'LatestVersion' | 'OtherVersion';
        /**
         * Preferred Azure PowerShell Version
         */
        preferredAzurePowerShellVersion?: string;
        /**
         * Use PowerShell Core
         */
        pwsh?: boolean;
        /**
         * Validate script signature
         */
        validateScriptSignature?: boolean;
        /**
         * Working Directory
         */
        workingDirectory?: string;
      };
    }
  | {
      /**
       * Azure PowerShell
       *
       * Run a PowerShell script within an Azure environment
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure PowerShell inputs
       */
      inputs?: {
        /**
         * Azure Connection Type
         */
        ConnectedServiceNameSelector?: 'ConnectedServiceName' | 'ConnectedServiceNameARM';
        /**
         * Azure Classic Subscription
         */
        ConnectedServiceName?: string;
        /**
         * Azure Subscription
         */
        ConnectedServiceNameARM?: string;
        /**
         * Script Type
         */
        ScriptType?: 'FilePath' | 'InlineScript';
        /**
         * Script Path
         */
        ScriptPath?: string;
        /**
         * Inline Script
         */
        Inline?: string;
        /**
         * Script Arguments
         */
        ScriptArguments?: string;
      };
    }
  | {
      /**
       * Azure PowerShell
       *
       * Run a PowerShell script within an Azure environment
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure PowerShell inputs
       */
      inputs?: {
        /**
         * Azure Connection Type
         */
        azureConnectionType?: 'ConnectedServiceName' | 'ConnectedServiceNameARM';
        /**
         * Azure Classic Subscription
         */
        azureClassicSubscription?: string;
        /**
         * Azure Subscription
         */
        azureSubscription?: string;
        /**
         * Script Type
         */
        ScriptType?: 'FilePath' | 'InlineScript';
        /**
         * Script Path
         */
        ScriptPath?: string;
        /**
         * Inline Script
         */
        Inline?: string;
        /**
         * Script Arguments
         */
        ScriptArguments?: string;
        /**
         * Azure PowerShell Version
         */
        azurePowerShellVersion?: 'LatestVersion' | 'OtherVersion';
        /**
         * Preferred Azure PowerShell Version
         */
        preferredAzurePowerShellVersion?: string;
      };
    }
  | {
      /**
       * Azure PowerShell
       *
       * Run a PowerShell script within an Azure environment
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure PowerShell inputs
       */
      inputs?: {
        /**
         * Azure Connection Type
         */
        azureConnectionType?: 'ConnectedServiceName' | 'ConnectedServiceNameARM';
        /**
         * Azure Classic Subscription
         */
        azureClassicSubscription?: string;
        /**
         * Azure Subscription
         */
        azureSubscription?: string;
        /**
         * Script Type
         */
        ScriptType?: 'FilePath' | 'InlineScript';
        /**
         * Script Path
         */
        ScriptPath?: string;
        /**
         * Inline Script
         */
        Inline?: string;
        /**
         * Script Arguments
         */
        ScriptArguments?: string;
        /**
         * ErrorActionPreference
         */
        errorActionPreference?: 'stop' | 'continue' | 'silentlyContinue';
        /**
         * Fail on Standard Error
         */
        FailOnStandardError?: boolean;
        /**
         * Azure PowerShell Version
         */
        azurePowerShellVersion?: 'LatestVersion' | 'OtherVersion';
        /**
         * Preferred Azure PowerShell Version
         */
        preferredAzurePowerShellVersion?: string;
        /**
         * Validate script signature
         */
        validateScriptSignature?: boolean;
      };
    }
  | {
      /**
       * MySQL database deploy
       *
       * Run scripts and make changes to a MySQL Database
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * MySQL database deploy inputs
       */
      inputs: {
        /**
         * Deploy MySql Using
         */
        TaskNameSelector?: 'SqlTaskFile' | 'InlineSqlTask';
        /**
         * MySQL Script
         */
        SqlFile?: string;
        /**
         * Inline MySQL Script
         */
        SqlInline?: string;
        /**
         * Host Name
         */
        ServerName?: string;
        /**
         * Database Name
         */
        DatabaseName?: string;
        /**
         * MySQL User Name
         */
        SqlUsername: string;
        /**
         * Password
         */
        SqlPassword: string;
        /**
         * Additional Arguments
         */
        SqlAdditionalArguments?: string;
      };
    }
  | {
      /**
       * Python pip authenticate
       *
       * Authentication task for the pip client used for installing Python distributions
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Python pip authenticate inputs
       */
      inputs?: {
        /**
         * 'Azure DevOps' Service Connection
         */
        azureDevOpsServiceConnection?: string;
        /**
         * Azure Artifacts Feeds url.
         */
        feedUrl?: string;
        /**
         * My feeds (select below)
         */
        artifactFeeds?: string;
        /**
         * Feeds from external organizations
         */
        pythonDownloadServiceConnections?: string;
        /**
         * Don't set primary index URL
         */
        onlyAddExtraIndex?: boolean;
      };
    }
  | {
      /**
       * Python pip authenticate
       *
       * Authentication task for the pip client used for installing Python distributions
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Python pip authenticate inputs
       */
      inputs?: {
        /**
         * My feeds (select below)
         */
        artifactFeeds?: string;
        /**
         * Feeds from external organizations
         */
        externalFeeds?: string;
      };
    }
  | {
      /**
       * Maven
       *
       * Build, test, and deploy with Apache Maven
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Maven inputs
       */
      inputs?: {
        /**
         * Azure Resource Manager connection
         */
        azureSubscription?: string;
        /**
         * Maven POM file
         */
        mavenPomFile?: string;
        /**
         * Goal(s)
         */
        goals?: string;
        /**
         * Options
         */
        options?: string;
        /**
         * Publish to Azure Pipelines
         */
        publishJUnitResults?: boolean;
        /**
         * Test results files
         */
        testResultsFiles?: string;
        /**
         * Test run title
         */
        testRunTitle?: string;
        /**
         * Allow broken symbolic links
         */
        allowBrokenSymlinks?: boolean;
        /**
         * Code coverage tool
         */
        codeCoverageToolOption?: 'None' | 'Cobertura' | 'JaCoCo';
        /**
         * Class inclusion/exclusion filters
         */
        codeCoverageClassFilter?: string;
        /**
         * Class files directories
         */
        codeCoverageClassFilesDirectories?: string;
        /**
         * Source files directories
         */
        codeCoverageSourceDirectories?: string;
        /**
         * Fail when code coverage results are missing
         */
        codeCoverageFailIfEmpty?: boolean;
        /**
         * Restore original pom.xml after task execution
         */
        codeCoverageRestoreOriginalPomXml?: boolean;
        /**
         * Set JAVA_HOME by
         */
        javaHomeOption?: 'JDKVersion' | 'Path';
        /**
         * JDK version
         */
        jdkVersionOption?: 'default' | '1.21' | '1.17' | '1.11' | '1.10' | '1.9' | '1.8' | '1.7' | '1.6';
        /**
         * JDK path
         */
        jdkDirectory?: string;
        /**
         * JDK architecture
         */
        jdkArchitectureOption?: 'x86' | 'x64';
        /**
         * Maven version
         */
        mavenVersionOption?: 'Default' | 'Path';
        /**
         * Maven path
         */
        mavenDirectory?: string;
        /**
         * Set M2_HOME variable
         */
        mavenSetM2Home?: boolean;
        /**
         * Set MAVEN_OPTS to
         */
        mavenOptions?: string;
        /**
         * Authenticate with Artifacts feeds
         */
        mavenAuthenticateFeed?: boolean;
        /**
         * Skip generating effective POM while authenticating with Artifacts feeds
         */
        effectivePomSkip?: boolean;
        /**
         * Run SonarQube or SonarCloud analysis
         */
        sonarQubeRunAnalysis?: boolean;
        /**
         * Use XML Jacoco reports for SonarQube analysis
         */
        isJacocoCoverageReportXML?: boolean;
        /**
         * SonarQube scanner for Maven version
         */
        sqMavenPluginVersionChoice?: 'latest' | 'pom';
        /**
         * Run Checkstyle
         */
        checkStyleRunAnalysis?: boolean;
        /**
         * Run PMD
         */
        pmdRunAnalysis?: boolean;
        /**
         * Run FindBugs
         */
        findBugsRunAnalysis?: boolean;
        /**
         * Run SpotBugs analysis
         */
        spotBugsRunAnalysis?: boolean;
        /**
         * Version number
         */
        spotBugsVersion?: string;
        /**
         * The goal for the spotbugs plugin
         */
        spotBugsGoal?: 'spotbugs' | 'check';
        /**
         * Fail when bugs are found with spotbugs:check
         */
        failWhenBugsFound?: boolean;
      };
    }
  | {
      /**
       * Maven
       *
       * Build, test, and deploy with Apache Maven
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Maven inputs
       */
      inputs?: {
        /**
         * Maven POM file
         */
        mavenPomFile?: string;
        /**
         * Goal(s)
         */
        goals?: string;
        /**
         * Options
         */
        options?: string;
        /**
         * Publish to Azure Pipelines
         */
        publishJUnitResults?: boolean;
        /**
         * Test results files
         */
        testResultsFiles?: string;
        /**
         * Test run title
         */
        testRunTitle?: string;
        /**
         * Allow broken symbolic links
         */
        allowBrokenSymlinks?: boolean;
        /**
         * Code coverage tool
         */
        codeCoverageToolOption?: 'None' | 'Cobertura' | 'JaCoCo';
        /**
         * Class inclusion/exclusion filters
         */
        codeCoverageClassFilter?: string;
        /**
         * Class files directories
         */
        codeCoverageClassFilesDirectories?: string;
        /**
         * Source files directories
         */
        codeCoverageSourceDirectories?: string;
        /**
         * Fail when code coverage results are missing
         */
        codeCoverageFailIfEmpty?: boolean;
        /**
         * Restore original pom.xml after task execution
         */
        codeCoverageRestoreOriginalPomXml?: boolean;
        /**
         * Set JAVA_HOME by
         */
        javaHomeOption?: 'JDKVersion' | 'Path';
        /**
         * JDK version
         */
        jdkVersionOption?: 'default' | '1.21' | '1.17' | '1.11' | '1.10' | '1.9' | '1.8' | '1.7' | '1.6';
        /**
         * JDK path
         */
        jdkDirectory?: string;
        /**
         * JDK architecture
         */
        jdkArchitectureOption?: 'x86' | 'x64';
        /**
         * Maven version
         */
        mavenVersionOption?: 'Default' | 'Path';
        /**
         * Maven path
         */
        mavenDirectory?: string;
        /**
         * Set M2_HOME variable
         */
        mavenSetM2Home?: boolean;
        /**
         * Set MAVEN_OPTS to
         */
        mavenOptions?: string;
        /**
         * Authenticate with Artifacts feeds
         */
        mavenAuthenticateFeed?: boolean;
        /**
         * Run SonarQube or SonarCloud analysis
         */
        sonarQubeRunAnalysis?: boolean;
        /**
         * Use XML Jacoco reports for SonarQube analysis
         */
        isJacocoCoverageReportXML?: boolean;
        /**
         * SonarQube scanner for Maven version
         */
        sqMavenPluginVersionChoice?: 'latest' | 'pom';
        /**
         * Run Checkstyle
         */
        checkStyleRunAnalysis?: boolean;
        /**
         * Run PMD
         */
        pmdRunAnalysis?: boolean;
        /**
         * Run FindBugs
         */
        findBugsRunAnalysis?: boolean;
      };
    }
  | {
      /**
       * Maven
       *
       * Build, test, and deploy with Apache Maven
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Maven inputs
       */
      inputs?: {
        /**
         * Maven POM file
         */
        mavenPomFile?: string;
        /**
         * Goal(s)
         */
        goals?: string;
        /**
         * Options
         */
        options?: string;
        /**
         * Publish to Azure Pipelines
         */
        publishJUnitResults?: boolean;
        /**
         * Test results files
         */
        testResultsFiles?: string;
        /**
         * Test run title
         */
        testRunTitle?: string;
        /**
         * Allow broken symbolic links
         */
        allowBrokenSymlinks?: boolean;
        /**
         * Code coverage tool
         */
        codeCoverageToolOption?: 'None' | 'Cobertura' | 'JaCoCo';
        /**
         * Class inclusion/exclusion filters
         */
        codeCoverageClassFilter?: string;
        /**
         * Class files directories
         */
        codeCoverageClassFilesDirectories?: string;
        /**
         * Source files directories
         */
        codeCoverageSourceDirectories?: string;
        /**
         * Fail when code coverage results are missing
         */
        codeCoverageFailIfEmpty?: boolean;
        /**
         * Restore original pom.xml after task execution
         */
        codeCoverageRestoreOriginalPomXml?: boolean;
        /**
         * Set JAVA_HOME by
         */
        javaHomeOption?: 'JDKVersion' | 'Path';
        /**
         * JDK version
         */
        jdkVersionOption?: 'default' | '1.21' | '1.17' | '1.11' | '1.10' | '1.9' | '1.8' | '1.7' | '1.6';
        /**
         * JDK path
         */
        jdkDirectory?: string;
        /**
         * JDK architecture
         */
        jdkArchitectureOption?: 'x86' | 'x64';
        /**
         * Maven version
         */
        mavenVersionOption?: 'Default' | 'Path';
        /**
         * Maven path
         */
        mavenDirectory?: string;
        /**
         * Set M2_HOME variable
         */
        mavenSetM2Home?: boolean;
        /**
         * Set MAVEN_OPTS to
         */
        mavenOptions?: string;
        /**
         * Authenticate with Artifacts feeds
         */
        mavenAuthenticateFeed?: boolean;
        /**
         * Skip generating effective POM while authenticating with Artifacts feeds
         */
        effectivePomSkip?: boolean;
        /**
         * Run SonarQube or SonarCloud analysis
         */
        sonarQubeRunAnalysis?: boolean;
        /**
         * Use XML Jacoco reports for SonarQube analysis
         */
        isJacocoCoverageReportXML?: boolean;
        /**
         * SonarQube scanner for Maven version
         */
        sqMavenPluginVersionChoice?: 'latest' | 'pom';
        /**
         * Run Checkstyle
         */
        checkStyleRunAnalysis?: boolean;
        /**
         * Run PMD
         */
        pmdRunAnalysis?: boolean;
        /**
         * Run FindBugs
         */
        findBugsRunAnalysis?: boolean;
        /**
         * Run SpotBugs analysis
         */
        spotBugsRunAnalysis?: boolean;
        /**
         * Version number
         */
        spotBugsVersion?: string;
        /**
         * The goal for the spotbugs plugin
         */
        spotBugsGoal?: 'spotbugs' | 'check';
        /**
         * Fail when bugs are found with spotbugs:check
         */
        failWhenBugsFound?: boolean;
      };
    }
  | {
      /**
       * Maven
       *
       * Build with Apache Maven
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Maven inputs
       */
      inputs?: {
        /**
         * Maven POM file
         */
        mavenPomFile?: string;
        /**
         * Goal(s)
         */
        goals?: string;
        /**
         * Options
         */
        options?: string;
        /**
         * Publish to TFS/Team Services
         */
        publishJUnitResults?: boolean;
        /**
         * Test Results Files
         */
        testResultsFiles?: string;
        /**
         * Test Run Title
         */
        testRunTitle?: string;
        /**
         * Code Coverage Tool
         */
        codeCoverageToolOption?: 'None' | 'Cobertura' | 'JaCoCo';
        /**
         * Class Inclusion/Exclusion Filters
         */
        codeCoverageClassFilter?: string;
        /**
         * Class Files Directories
         */
        codeCoverageClassFilesDirectories?: string;
        /**
         * Source Files Directories
         */
        codeCoverageSourceDirectories?: string;
        /**
         * Fail When Code Coverage Results Are Missing
         */
        codeCoverageFailIfEmpty?: boolean;
        /**
         * Set JAVA_HOME by
         */
        javaHomeOption?: 'JDKVersion' | 'Path';
        /**
         * JDK Version
         */
        jdkVersionOption?: 'default' | '1.9' | '1.8' | '1.7' | '1.6';
        /**
         * JDK Path
         */
        jdkDirectory?: string;
        /**
         * JDK Architecture
         */
        jdkArchitectureOption?: 'x86' | 'x64';
        /**
         * Maven Version
         */
        mavenVersionOption?: 'Default' | 'Path';
        /**
         * Maven Path
         */
        mavenDirectory?: string;
        /**
         * Set M2_HOME variable
         */
        mavenSetM2Home?: boolean;
        /**
         * Set MAVEN_OPTS to
         */
        mavenOptions?: string;
        /**
         * Authenticate built-in Maven feeds
         */
        mavenAuthenticateFeed?: boolean;
        /**
         * Run SonarQube Analysis
         */
        sonarQubeRunAnalysis?: boolean;
        /**
         * SonarQube Endpoint
         */
        sonarQubeServiceEndpoint?: string;
        /**
         * SonarQube Project Name
         */
        sonarQubeProjectName?: string;
        /**
         * SonarQube Project Key
         */
        sonarQubeProjectKey?: string;
        /**
         * SonarQube Project Version
         */
        sonarQubeProjectVersion?: string;
        /**
         * The SonarQube server version is lower than 5.2
         */
        sonarQubeSpecifyDB?: boolean;
        /**
         * Db Connection String
         */
        sonarQubeDBUrl?: string;
        /**
         * Db Username
         */
        sonarQubeDBUsername?: string;
        /**
         * Db User Password
         */
        sonarQubeDBPassword?: string;
        /**
         * Include full analysis report in the build summary (SQ 5.3+)
         */
        sonarQubeIncludeFullReport?: boolean;
        /**
         * Fail the build on quality gate failure (SQ 5.3+)
         */
        sonarQubeFailWhenQualityGateFails?: boolean;
        /**
         * Run Checkstyle
         */
        checkStyleRunAnalysis?: boolean;
        /**
         * Run PMD
         */
        pmdRunAnalysis?: boolean;
        /**
         * Run FindBugs
         */
        findBugsRunAnalysis?: boolean;
      };
    }
  | {
      /**
       * .NET Core
       *
       * Build, test, package, or publish a dotnet application, or run a custom dotnet command
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * .NET Core inputs
       */
      inputs?: {
        /**
         * Azure Resource Manager connection
         */
        azureSubscription?: string;
        /**
         * Command
         */
        command?: 'build' | 'push' | 'pack' | 'publish' | 'restore' | 'run' | 'test' | 'custom';
        /**
         * Publish web projects
         */
        publishWebProjects?: boolean;
        /**
         * Path to project(s) or solution(s)
         */
        projects?: string;
        /**
         * Custom command
         */
        custom?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Arguments
         */
        restoreArguments?: string;
        /**
         * Publish test results and code coverage
         */
        publishTestResults?: boolean;
        /**
         * Test run title
         */
        testRunTitle?: string;
        /**
         * Zip published projects
         */
        zipAfterPublish?: boolean;
        /**
         * Add project's folder name to publish path
         */
        modifyOutputPath?: boolean;
        /**
         * Feeds to use
         */
        feedsToUse?: 'select' | 'config';
        /**
         * Use packages from this Azure Artifacts feed. Select from the dropdown or enter [project name/]feed name.
         */
        vstsFeed?: string;
        /**
         * Use packages from NuGet.org
         */
        includeNuGetOrg?: boolean;
        /**
         * Path to NuGet.config
         */
        nugetConfigPath?: string;
        /**
         * Credentials for feeds outside this organization/collection
         */
        externalFeedCredentials?: string;
        /**
         * Disable local cache
         */
        noCache?: boolean;
        /**
         * Destination directory
         */
        restoreDirectory?: string;
        /**
         * Verbosity
         */
        verbosityRestore?: '-' | 'Quiet' | 'Minimal' | 'Normal' | 'Detailed' | 'Diagnostic';
        /**
         * Path to NuGet package(s) to publish
         */
        packagesToPush?: string;
        /**
         * Target feed location
         */
        nuGetFeedType?: 'internal' | 'external';
        /**
         * Target feed
         */
        publishVstsFeed?: string;
        /**
         * Publish pipeline metadata
         */
        publishPackageMetadata?: boolean;
        /**
         * NuGet server
         */
        publishFeedCredentials?: string;
        /**
         * Path to csproj or nuspec file(s) to pack
         */
        packagesToPack?: string;
        /**
         * Configuration to Package
         */
        configuration?: string;
        /**
         * Package Folder
         */
        packDirectory?: string;
        /**
         * Do not build
         */
        nobuild?: boolean;
        /**
         * Include Symbols
         */
        includesymbols?: boolean;
        /**
         * Include Source
         */
        includesource?: boolean;
        /**
         * Automatic package versioning
         */
        versioningScheme?: 'off' | 'byPrereleaseNumber' | 'byEnvVar' | 'byBuildNumber';
        /**
         * Environment variable
         */
        versionEnvVar?: string;
        /**
         * Major
         */
        majorVersion?: string;
        /**
         * Minor
         */
        minorVersion?: string;
        /**
         * Patch
         */
        patchVersion?: string;
        /**
         * Additional build properties
         */
        buildProperties?: string;
        /**
         * Verbosity
         */
        verbosityPack?: '-' | 'Quiet' | 'Minimal' | 'Normal' | 'Detailed' | 'Diagnostic';
        /**
         * Working directory
         */
        workingDirectory?: string;
        /**
         * Set timeout for package download request
         */
        requestTimeout?: number;
      };
    }
  | {
      /**
       * .NET Core (PREVIEW)
       *
       * Build, test and publish using dotnet core command-line.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * .NET Core (PREVIEW) inputs
       */
      inputs?: {
        /**
         * Command
         */
        command?: 'build' | 'publish' | 'restore' | 'test' | 'run';
        /**
         * Publish Web Projects
         */
        publishWebProjects?: boolean;
        /**
         * Project(s)
         */
        projects?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Zip Published Projects
         */
        zipAfterPublish?: boolean;
      };
    }
  | {
      /**
       * .NET Core
       *
       * Build, test and publish using dotnet core command-line.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * .NET Core inputs
       */
      inputs?: {
        /**
         * Command
         */
        command?: 'build' | 'publish' | 'restore' | 'test' | 'run';
        /**
         * Publish Web Projects
         */
        publishWebProjects?: boolean;
        /**
         * Project(s)
         */
        projects?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Zip Published Projects
         */
        zipAfterPublish?: boolean;
      };
    }
  | {
      /**
       * Xamarin Component Restore
       *
       * This task is deprecated. Use 'NuGet' instead.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Xamarin Component Restore inputs
       */
      inputs: {
        /**
         * Path to solution
         */
        solutionFile?: string;
        /**
         * Email
         */
        email: string;
        /**
         * Password
         */
        password: string;
      };
    }
  | {
      /**
       * Azure App Service deploy
       *
       * Deploy to Azure App Service a web, mobile, or API app using Docker, Java, .NET, .NET Core, Node.js, PHP, Python, or Ruby
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure App Service deploy inputs
       */
      inputs?: {
        /**
         * Connection type
         */
        ConnectionType?: 'AzureRM' | 'PublishProfile';
        /**
         * Azure subscription
         */
        azureSubscription?: string;
        /**
         * Publish profile path
         */
        PublishProfilePath?: string;
        /**
         * Publish profile password
         */
        PublishProfilePassword?: string;
        /**
         * App Service type
         */
        appType?:
          | 'webApp'
          | 'webAppLinux'
          | 'webAppContainer'
          | 'webAppHyperVContainer'
          | 'functionApp'
          | 'functionAppLinux'
          | 'functionAppContainer'
          | 'apiApp'
          | 'mobileApp';
        /**
         * App Service name
         */
        WebAppName?: string;
        /**
         * Deploy to Slot or App Service Environment
         */
        deployToSlotOrASE?: boolean;
        /**
         * Resource group
         */
        ResourceGroupName?: string;
        /**
         * Slot
         */
        SlotName?: string;
        /**
         * Registry or Namespace
         */
        DockerNamespace?: string;
        /**
         * Image
         */
        DockerRepository?: string;
        /**
         * Tag
         */
        DockerImageTag?: string;
        /**
         * Virtual application
         */
        VirtualApplication?: string;
        /**
         * Package or folder
         */
        packageForLinux?: string;
        /**
         * Runtime Stack
         */
        RuntimeStack?: string;
        /**
         * Runtime Stack
         */
        RuntimeStackFunction?:
          | 'DOTNET|2.2'
          | 'DOTNET|3.1'
          | 'JAVA|8'
          | 'JAVA|11'
          | 'NODE|8'
          | 'NODE|10'
          | 'NODE|12'
          | 'NODE|14'
          | 'NODE|20'
          | 'NODE|22'
          | 'PYTHON|3.6'
          | 'PYTHON|3.7'
          | 'PYTHON|3.8';
        /**
         * Startup command
         */
        StartupCommand?: string;
        /**
         * Deployment script type
         */
        ScriptType?: '' | 'Inline Script' | 'File Path';
        /**
         * Inline Script
         */
        InlineScript?: string;
        /**
         * Deployment script path
         */
        ScriptPath?: string;
        /**
         * Generate web.config parameters for Python, Node.js, Go and Java apps
         */
        WebConfigParameters?: string;
        /**
         * App settings
         */
        AppSettings?: string;
        /**
         * Configuration settings
         */
        ConfigurationSettings?: string;
        /**
         * Select deployment method
         */
        enableCustomDeployment?: boolean;
        /**
         * Deployment method
         */
        DeploymentType?: 'webDeploy' | 'zipDeploy' | 'runFromZip';
        /**
         * Take App Offline
         */
        TakeAppOfflineFlag?: boolean;
        /**
         * SetParameters file
         */
        SetParametersFile?: string;
        /**
         * Remove additional files at destination
         */
        RemoveAdditionalFilesFlag?: boolean;
        /**
         * Exclude files from the App_Data folder
         */
        ExcludeFilesFromAppDataFlag?: boolean;
        /**
         * Additional arguments
         */
        AdditionalArguments?: string;
        /**
         * Rename locked files
         */
        RenameFilesFlag?: boolean;
        /**
         * XML transformation
         */
        enableXmlTransform?: boolean;
        /**
         * XML variable substitution
         */
        enableXmlVariableSubstitution?: boolean;
        /**
         * JSON variable substitution
         */
        JSONFiles?: string;
      };
    }
  | {
      /**
       * Azure App Service Deploy
       *
       * Update Azure App Service using Web Deploy / Kudu REST APIs
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure App Service Deploy inputs
       */
      inputs: {
        /**
         * Azure Subscription
         */
        ConnectedServiceName: string;
        /**
         * App Service name
         */
        WebAppName: string;
        /**
         * Deploy to slot
         */
        DeployToSlotFlag?: boolean;
        /**
         * Resource group
         */
        ResourceGroupName?: string;
        /**
         * Slot
         */
        SlotName?: string;
        /**
         * Virtual Application
         */
        VirtualApplication?: string;
        /**
         * Package or Folder
         */
        Package?: string;
        /**
         * App Service URL
         */
        WebAppUri?: string;
        /**
         * Publish using Web Deploy
         */
        UseWebDeploy?: boolean;
        /**
         * SetParameters File
         */
        SetParametersFile?: string;
        /**
         * Remove Additional Files at Destination
         */
        RemoveAdditionalFilesFlag?: boolean;
        /**
         * Exclude Files from the App_Data Folder
         */
        ExcludeFilesFromAppDataFlag?: boolean;
        /**
         * Additional Arguments
         */
        AdditionalArguments?: string;
        /**
         * Take App Offline
         */
        TakeAppOfflineFlag?: boolean;
      };
    }
  | {
      /**
       * Azure App Service deploy
       *
       * Deploy to Azure App Service a web, mobile, or API app using Docker, Java, .NET, .NET Core, Node.js, PHP, Python, or Ruby
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure App Service deploy inputs
       */
      inputs?: {
        /**
         * Connection type
         */
        ConnectionType?: 'AzureRM' | 'PublishProfile';
        /**
         * Azure subscription
         */
        azureSubscription?: string;
        /**
         * Publish profile path
         */
        PublishProfilePath?: string;
        /**
         * Publish profile password
         */
        PublishProfilePassword?: string;
        /**
         * App Service type
         */
        appType?:
          | 'webApp'
          | 'webAppLinux'
          | 'webAppContainer'
          | 'webAppHyperVContainer'
          | 'functionApp'
          | 'functionAppLinux'
          | 'functionAppContainer'
          | 'apiApp'
          | 'mobileApp';
        /**
         * App Service name
         */
        WebAppName?: string;
        /**
         * Deploy to Slot or App Service Environment
         */
        deployToSlotOrASE?: boolean;
        /**
         * Resource group
         */
        ResourceGroupName?: string;
        /**
         * Slot
         */
        SlotName?: string;
        /**
         * Registry or Namespace
         */
        DockerNamespace?: string;
        /**
         * Image
         */
        DockerRepository?: string;
        /**
         * Tag
         */
        DockerImageTag?: string;
        /**
         * Virtual application
         */
        VirtualApplication?: string;
        /**
         * Package or folder
         */
        packageForLinux?: string;
        /**
         * Runtime Stack
         */
        RuntimeStack?:
          | 'DOTNETCORE|9.0'
          | 'DOTNETCORE|8.0'
          | 'DOTNETCORE|7.0'
          | 'DOTNETCORE|6.0'
          | 'NODE|22-lts'
          | 'NODE|20-lts'
          | 'NODE|18-lts'
          | 'NODE|16-lts'
          | 'PYTHON|3.13'
          | 'PYTHON|3.12'
          | 'PYTHON|3.11'
          | 'PYTHON|3.10'
          | 'PYTHON|3.9'
          | 'PYTHON|3.8'
          | 'PHP|8.3'
          | 'PHP|8.2'
          | 'PHP|8.1'
          | 'PHP|8.0'
          | 'JAVA|21-java21'
          | 'JAVA|17-java17'
          | 'JAVA|11-java11'
          | 'JAVA|8-jre8'
          | 'JBOSSEAP|8-java17'
          | 'JBOSSEAP|8-java11'
          | 'JBOSSEAP|7-java17'
          | 'JBOSSEAP|7-java11'
          | 'JBOSSEAP|7-java8'
          | 'TOMCAT|10.1-java21'
          | 'TOMCAT|10.1-java17'
          | 'TOMCAT|10.1-java11'
          | 'TOMCAT|10.0-java17'
          | 'TOMCAT|10.0-java11'
          | 'TOMCAT|10.0-jre8'
          | 'TOMCAT|9.0-java21'
          | 'TOMCAT|9.0-java17'
          | 'TOMCAT|9.0-java11'
          | 'TOMCAT|9.0-jre8'
          | 'TOMCAT|8.5-java11'
          | 'TOMCAT|8.5-jre8';
        /**
         * Runtime Stack
         */
        RuntimeStackFunction?:
          | 'DOTNET|2.2'
          | 'DOTNET|3.1'
          | 'JAVA|8'
          | 'JAVA|11'
          | 'NODE|8'
          | 'NODE|10'
          | 'NODE|12'
          | 'NODE|14'
          | 'NODE|20'
          | 'NODE|22'
          | 'PYTHON|3.6'
          | 'PYTHON|3.7'
          | 'PYTHON|3.8';
        /**
         * Startup command
         */
        StartupCommand?: string;
        /**
         * Deployment script type
         */
        ScriptType?: '' | 'Inline Script' | 'File Path';
        /**
         * Inline Script
         */
        InlineScript?: string;
        /**
         * Deployment script path
         */
        ScriptPath?: string;
        /**
         * Generate web.config parameters for Python, Node.js, Go and Java apps
         */
        WebConfigParameters?: string;
        /**
         * App settings
         */
        AppSettings?: string;
        /**
         * Configuration settings
         */
        ConfigurationSettings?: string;
        /**
         * Select deployment method
         */
        enableCustomDeployment?: boolean;
        /**
         * Deployment method
         */
        DeploymentType?: 'webDeploy' | 'zipDeploy' | 'runFromZip';
        /**
         * Take App Offline
         */
        TakeAppOfflineFlag?: boolean;
        /**
         * SetParameters file
         */
        SetParametersFile?: string;
        /**
         * Remove additional files at destination
         */
        RemoveAdditionalFilesFlag?: boolean;
        /**
         * Exclude files from the App_Data folder
         */
        ExcludeFilesFromAppDataFlag?: boolean;
        /**
         * Additional arguments
         */
        AdditionalArguments?: string;
        /**
         * Rename locked files
         */
        RenameFilesFlag?: boolean;
        /**
         * XML transformation
         */
        enableXmlTransform?: boolean;
        /**
         * XML variable substitution
         */
        enableXmlVariableSubstitution?: boolean;
        /**
         * JSON variable substitution
         */
        JSONFiles?: string;
        /**
         * Deployment method
         */
        DeploymentTypeLinux?: 'oneDeploy' | 'zipDeploy';
        /**
         * Enable clean deployment
         */
        CleanDeploymentFlag?: boolean;
      };
    }
  | {
      /**
       * Azure App Service deploy
       *
       * Deploy to Azure App Service a web, mobile, or API app using Docker, Java, .NET, .NET Core, Node.js, PHP, Python, or Ruby
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure App Service deploy inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * App type
         */
        appType?: 'app' | 'applinux' | 'functionapp' | 'api' | 'mobileapp';
        /**
         * App Service name
         */
        WebAppName: string;
        /**
         * Deploy to slot
         */
        DeployToSlotFlag?: boolean;
        /**
         * Resource group
         */
        ResourceGroupName?: string;
        /**
         * Slot
         */
        SlotName?: string;
        /**
         * Image Source
         */
        ImageSource?: 'Registry' | 'Builtin';
        /**
         * Registry
         */
        AzureContainerRegistry?: string;
        /**
         * Registry Login Server Name
         */
        AzureContainerRegistryLoginServer?: string;
        /**
         * Image
         */
        AzureContainerRegistryImage?: string;
        /**
         * Tag
         */
        AzureContainerRegistryTag?: string;
        /**
         * Repository Access
         */
        DockerRepositoryAccess?: 'private' | 'public';
        /**
         * Registry Connection
         */
        dockerRegistryConnection?: string;
        /**
         * Image
         */
        PrivateRegistryImage?: string;
        /**
         * Tag
         */
        PrivateRegistryTag?: string;
        /**
         * Registry or Namespace
         */
        DockerNamespace?: string;
        /**
         * Image
         */
        DockerRepository?: string;
        /**
         * Tag
         */
        DockerImageTag?: string;
        /**
         * Virtual application
         */
        VirtualApplication?: string;
        /**
         * Package or folder
         */
        Package?: string;
        /**
         * Package or folder
         */
        packageForLinux?: string;
        /**
         * Runtime Stack
         */
        RuntimeStack?: string;
        /**
         * Startup command
         */
        StartupCommand?: string;
        /**
         * App Service URL
         */
        WebAppUri?: string;
        /**
         * Deployment script type
         */
        ScriptType?: '' | 'Inline Script' | 'File Path';
        /**
         * Inline Script
         */
        InlineScript?: string;
        /**
         * Deployment script path
         */
        ScriptPath?: string;
        /**
         * Generate Web.config
         */
        GenerateWebConfig?: boolean;
        /**
         * Web.config parameters
         */
        WebConfigParameters?: string;
        /**
         * App settings
         */
        AppSettings?: string;
        /**
         * Configuration settings
         */
        ConfigurationSettings?: string;
        /**
         * Take App Offline
         */
        TakeAppOfflineFlag?: boolean;
        /**
         * Publish using Web Deploy
         */
        UseWebDeploy?: boolean;
        /**
         * SetParameters file
         */
        SetParametersFile?: string;
        /**
         * Remove additional files at destination
         */
        RemoveAdditionalFilesFlag?: boolean;
        /**
         * Exclude files from the App_Data folder
         */
        ExcludeFilesFromAppDataFlag?: boolean;
        /**
         * Additional arguments
         */
        AdditionalArguments?: string;
        /**
         * Rename locked files
         */
        RenameFilesFlag?: boolean;
        /**
         * XML transformation
         */
        enableXmlTransform?: boolean;
        /**
         * XML variable substitution
         */
        enableXmlVariableSubstitution?: boolean;
        /**
         * JSON variable substitution
         */
        JSONFiles?: string;
      };
    }
  | {
      /**
       * PowerShell on target machines
       *
       * Execute PowerShell scripts on remote machines using PSSession and Invoke-Command for remoting
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * PowerShell on target machines inputs
       */
      inputs: {
        /**
         * Machines
         */
        Machines: string;
        /**
         * Username
         */
        UserName?: string;
        /**
         * Password
         */
        UserPassword?: string;
        /**
         * Script Type
         */
        ScriptType?: 'FilePath' | 'Inline';
        /**
         * Script File Path
         */
        ScriptPath?: string;
        /**
         * Script
         */
        InlineScript?: string;
        /**
         * Script Arguments
         */
        ScriptArguments?: string;
        /**
         * Initialization script
         */
        InitializationScript?: string;
        /**
         * Session Variables
         */
        SessionVariables?: string;
        /**
         * Protocol
         */
        CommunicationProtocol?: 'Http' | 'Https';
        /**
         * Authentication
         */
        AuthenticationMechanism?: 'Default' | 'Credssp';
        /**
         * Session Option parameters
         */
        NewPsSessionOptionArguments?: string;
        /**
         * ErrorActionPreference
         */
        ErrorActionPreference?: 'stop' | 'continue' | 'silentlyContinue';
        /**
         * Fail on Standard Error
         */
        failOnStderr?: boolean;
        /**
         * Ignore $LASTEXITCODE
         */
        ignoreLASTEXITCODE?: boolean;
        /**
         * Working Directory
         */
        WorkingDirectory?: string;
        /**
         * Run PowerShell in Parallel
         */
        RunPowershellInParallel?: boolean;
      };
    }
  | {
      /**
       * PowerShell on Target Machines
       *
       * Execute PowerShell scripts on remote machine(s)
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * PowerShell on Target Machines inputs
       */
      inputs: {
        /**
         * Machines
         */
        EnvironmentName: string;
        /**
         * Admin Login
         */
        AdminUserName?: string;
        /**
         * Password
         */
        AdminPassword?: string;
        /**
         * Protocol
         */
        Protocol?: 'Http' | 'Https';
        /**
         * Test Certificate
         */
        TestCertificate?: boolean;
        /**
         * PowerShell Script
         */
        ScriptPath: string;
        /**
         * Script Arguments
         */
        ScriptArguments?: string;
        /**
         * Initialization Script
         */
        InitializationScriptPath?: string;
        /**
         * Session Variables
         */
        SessionVariables?: string;
        /**
         * Run PowerShell in Parallel
         */
        RunPowershellInParallel?: boolean;
        /**
         * Select Machines By
         */
        ResourceFilteringMethod?: 'machineNames' | 'tags';
        /**
         * Filter Criteria
         */
        MachineNames?: string;
      };
    }
  | {
      /**
       * Publish code coverage
       *
       * Publish Cobertura or JaCoCo code coverage results from a build
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Publish code coverage inputs
       */
      inputs: {
        /**
         * Code coverage tool
         */
        codeCoverageTool?: 'Cobertura' | 'JaCoCo';
        /**
         * Summary file
         */
        summaryFileLocation: string;
        /**
         * Path to Source files
         */
        pathToSources?: string;
        /**
         * Report directory
         */
        reportDirectory?: string;
        /**
         * Additional files
         */
        additionalCodeCoverageFiles?: string;
        /**
         * Fail when code coverage results are missing
         */
        failIfCoverageEmpty?: boolean;
      };
    }
  | {
      /**
       * Run functional tests
       *
       * Deprecated: This task and it’s companion task (Visual Studio Test Agent Deployment) are deprecated. Use the 'Visual Studio Test' task instead. The VSTest task can run unit as well as functional tests. Run tests on one or more agents using the multi-agent job setting. Use the 'Visual Studio Test Platform' task to run tests without needing Visual Studio on the agent. VSTest task also brings new capabilities such as automatically rerunning failed tests.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Run functional tests inputs
       */
      inputs: {
        /**
         * Machines
         */
        testMachineGroup: string;
        /**
         * Test Drop Location
         */
        dropLocation: string;
        /**
         * Test Selection
         */
        testSelection?: 'testAssembly' | 'testPlan';
        /**
         * Test Plan
         */
        testPlan?: string;
        /**
         * Test Suite
         */
        testSuite?: string;
        /**
         * Test Configuration
         */
        testConfiguration?: string;
        /**
         * Test Assembly
         */
        sourcefilters?: string;
        /**
         * Test Filter criteria
         */
        testFilterCriteria?: string;
        /**
         * Run Settings File
         */
        runSettingsFile?: string;
        /**
         * Override Test Run Parameters
         */
        overrideRunParams?: string;
        /**
         * Code Coverage Enabled
         */
        codeCoverageEnabled?: boolean;
        /**
         * Distribute tests by number of machines
         */
        customSlicingEnabled?: boolean;
        /**
         * Test Run Title
         */
        testRunTitle?: string;
        /**
         * Platform
         */
        platform?: string;
        /**
         * Configuration
         */
        configuration?: string;
        /**
         * Test Configurations
         */
        testConfigurations?: string;
        /**
         * Application Under Test Machines
         */
        autMachineGroup?: string;
      };
    }
  | {
      /**
       * Manual intervention
       *
       * Pause deployment and wait for manual intervention
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Manual intervention inputs
       */
      inputs?: {
        /**
         * Instructions
         */
        instructions?: string;
        /**
         * Notify users
         */
        emailRecipients?: string;
        /**
         * On timeout
         */
        onTimeout?: 'reject' | 'resume';
      };
    }
  | {
      /**
       * Install Apple provisioning profile
       *
       * Install an Apple provisioning profile required to build on a macOS agent machine
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Install Apple provisioning profile inputs
       */
      inputs?: {
        /**
         * Provisioning profile location
         */
        provisioningProfileLocation?: 'secureFiles' | 'sourceRepository';
        /**
         * Provisioning profile
         */
        provProfileSecureFile?: string;
        /**
         * Provisioning profile
         */
        provProfileSourceRepository?: string;
        /**
         * Remove profile after build
         */
        removeProfile?: boolean;
      };
    }
  | {
      /**
       * Install Apple Provisioning Profile
       *
       * Install an Apple provisioning profile required to build on a macOS agent
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Install Apple Provisioning Profile inputs
       */
      inputs: {
        /**
         * Provisioning Profile
         */
        provProfileSecureFile: string;
        /**
         * Remove Profile After Build
         */
        removeProfile?: boolean;
      };
    }
  | {
      /**
       * SonarQube for MSBuild - End Analysis
       *
       * [DEPRECATED] Finish the analysis and upload the results to SonarQube
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * SonarQube for MSBuild - End Analysis inputs
       */
      inputs?: {};
    }
  | {
      /**
       * PyPI publisher
       *
       * Create and upload an sdist or wheel to a PyPI-compatible index using Twine
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * PyPI publisher inputs
       */
      inputs: {
        /**
         * PyPI service connection
         */
        pypiConnection: string;
        /**
         * Python package directory
         */
        packageDirectory: string;
        /**
         * Also publish a wheel
         */
        alsoPublishWheel?: boolean;
      };
    }
  | {
      /**
       * Chef Knife
       *
       * Run scripts with Knife commands on your Chef workstation
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Chef Knife inputs
       */
      inputs: {
        /**
         * Chef Subscription
         */
        ConnectedServiceName: string;
        /**
         * Script Path
         */
        ScriptPath: string;
        /**
         * Script Arguments
         */
        ScriptArguments?: string;
      };
    }
  | {
      /**
       * Go tool installer
       *
       * Find in cache or download a specific version of Go and add it to the PATH
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Go tool installer inputs
       */
      inputs?: {
        /**
         * Version
         */
        version?: string;
        /**
         * GOPATH
         */
        goPath?: string;
        /**
         * GOBIN
         */
        goBin?: string;
      };
    }
  | {
      /**
       * Xcode Package iOS
       *
       * Generate an .ipa file from Xcode build output using xcrun (Xcode 7 or below)
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Xcode Package iOS inputs
       */
      inputs: {
        /**
         * Name of .app
         */
        appName?: string;
        /**
         * Name of .ipa
         */
        ipaName?: string;
        /**
         * Provisioning Profile Name
         */
        provisioningProfile: string;
        /**
         * SDK
         */
        sdk?: string;
        /**
         * Path to .app
         */
        appPath?: string;
        /**
         * Path to place .ipa
         */
        ipaPath?: string;
      };
    }
  | {
      /**
       * Go
       *
       * Get, build, or test a Go application, or run a custom Go command
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Go inputs
       */
      inputs?: {
        /**
         * Command
         */
        command?: 'get' | 'build' | 'test' | 'custom';
        /**
         * Custom command
         */
        customCommand?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Working directory
         */
        workingDirectory?: string;
      };
    }
  | {
      /**
       * Publish Pipeline Metadata
       *
       * Publish Pipeline Metadata to Evidence store
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Publish Pipeline Metadata inputs
       */
      inputs?: {};
    }
  | {
      /**
       * Docker
       *
       * Build, tag, push, or run Docker images, or run a Docker command
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Docker inputs
       */
      inputs?: {
        /**
         * Container Registry Type
         */
        containerregistrytype?: 'Azure Container Registry' | 'Container Registry';
        /**
         * Docker Registry Service Connection
         */
        dockerRegistryConnection?: string;
        /**
         * Azure subscription
         */
        azureSubscription?: string;
        /**
         * Azure Container Registry
         */
        azureContainerRegistry?: string;
        /**
         * Action
         */
        action?:
          | 'Build an image'
          | 'Tag images'
          | 'Push an image'
          | 'Push images'
          | 'Run an image'
          | 'Run a Docker command';
        /**
         * Docker File
         */
        dockerFile?: string;
        /**
         * Add base image metadata to image(s)
         */
        addBaseImageData?: boolean;
        /**
         * Build Arguments
         */
        buildArguments?: string;
        /**
         * Use Default Build Context
         */
        defaultContext?: boolean;
        /**
         * Build Context
         */
        context?: string;
        /**
         * Image Name
         */
        imageName?: string;
        /**
         * Image Names Path
         */
        imageNamesPath?: string;
        /**
         * Qualify Image Name
         */
        qualifyImageName?: boolean;
        /**
         * Additional Image Tags
         */
        additionalImageTags?: string;
        /**
         * Include Source Tags
         */
        includeSourceTags?: boolean;
        /**
         * Include Latest Tag
         */
        includeLatestTag?: boolean;
        /**
         * Image Digest File
         */
        imageDigestFile?: string;
        /**
         * Container Name
         */
        containerName?: string;
        /**
         * Ports
         */
        ports?: string;
        /**
         * Volumes
         */
        volumes?: string;
        /**
         * Environment Variables
         */
        envVars?: string;
        /**
         * Working Directory
         */
        workDir?: string;
        /**
         * Entry Point Override
         */
        entrypoint?: string;
        /**
         * Command
         */
        containerCommand?: string;
        /**
         * Run In Background
         */
        detached?: boolean;
        /**
         * Restart Policy
         */
        restartPolicy?: 'no' | 'onFailure' | 'always' | 'unlessStopped';
        /**
         * Maximum Restart Retries
         */
        restartMaxRetries?: string;
        /**
         * Command
         */
        customCommand?: string;
        /**
         * Docker Host Service Connection
         */
        dockerHostEndpoint?: string;
        /**
         * Force image name to follow Docker naming convention
         */
        enforceDockerNamingConvention?: boolean;
        /**
         * Working Directory
         */
        workingDirectory?: string;
        /**
         * Memory limit
         */
        memory?: string;
      };
    }
  | {
      /**
       * Docker
       *
       * Build or push Docker images, login or logout, start or stop containers, or run a Docker command
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Docker inputs
       */
      inputs?: {
        /**
         * Container registry
         */
        containerRegistry?: string;
        /**
         * Container repository
         */
        repository?: string;
        /**
         * Command
         */
        command?: 'buildAndPush' | 'build' | 'push' | 'login' | 'logout' | 'start' | 'stop';
        /**
         * Dockerfile
         */
        Dockerfile?: string;
        /**
         * Build context
         */
        buildContext?: string;
        /**
         * Tags
         */
        tags?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Add Pipeline metadata to image(s)
         */
        addPipelineData?: boolean;
        /**
         * Add base image metadata to image(s)
         */
        addBaseImageData?: boolean;
        /**
         * Container
         */
        container?: string;
      };
    }
  | {
      /**
       * Docker
       *
       * Build, tag, push, or run Docker images, or run a Docker command
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Docker inputs
       */
      inputs?: {
        /**
         * Container registry type
         */
        containerregistrytype?: 'Azure Container Registry' | 'Container Registry';
        /**
         * Add base image metadata to image(s)
         */
        addBaseImageData?: boolean;
        /**
         * Docker registry service connection
         */
        dockerRegistryEndpoint?: string;
        /**
         * Azure subscription
         */
        azureSubscriptionEndpoint?: string;
        /**
         * Azure container registry
         */
        azureContainerRegistry?: string;
        /**
         * Command
         */
        command?: 'Build an image' | 'Tag image' | 'Push an image' | 'Run an image' | 'login' | 'logout';
        /**
         * Dockerfile
         */
        dockerFile?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Push multiple images
         */
        pushMultipleImages?: boolean;
        /**
         * Tag multiple images
         */
        tagMultipleImages?: boolean;
        /**
         * Image name
         */
        imageName?: string;
        /**
         * Image names path
         */
        imageNamesPath?: string;
        /**
         * Qualify image name
         */
        qualifyImageName?: boolean;
        /**
         * Qualify source image name
         */
        qualifySourceImageName?: boolean;
        /**
         * Include source tags
         */
        includeSourceTags?: boolean;
        /**
         * Include latest tag
         */
        includeLatestTag?: boolean;
        /**
         * Add default labels
         */
        addDefaultLabels?: boolean;
        /**
         * Use default build context
         */
        useDefaultContext?: boolean;
        /**
         * Build context
         */
        buildContext?: string;
        /**
         * Image digest file
         */
        imageDigestFile?: string;
        /**
         * Container name
         */
        containerName?: string;
        /**
         * Ports
         */
        ports?: string;
        /**
         * Volumes
         */
        volumes?: string;
        /**
         * Environment variables
         */
        envVars?: string;
        /**
         * Working directory
         */
        workingDirectory?: string;
        /**
         * Entry point override
         */
        entrypointOverride?: string;
        /**
         * Container command
         */
        containerCommand?: string;
        /**
         * Run in background
         */
        runInBackground?: boolean;
        /**
         * Restart policy
         */
        restartPolicy?: 'no' | 'onFailure' | 'always' | 'unlessStopped';
        /**
         * Maximum restart retries
         */
        maxRestartRetries?: string;
        /**
         * Docker host service connection
         */
        dockerHostEndpoint?: string;
        /**
         * Force image name to follow Docker naming convention
         */
        enforceDockerNamingConvention?: boolean;
        /**
         * Memory limit
         */
        memoryLimit?: string;
      };
    }
  | {
      /**
       * Jenkins Queue Job
       *
       * Queue a job on a Jenkins server
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Jenkins Queue Job inputs
       */
      inputs: {
        /**
         * Jenkins service endpoint
         */
        serverEndpoint: string;
        /**
         * Job name
         */
        jobName: string;
        /**
         * Job is of Multibranch Pipeline type
         */
        isMultibranchJob?: boolean;
        /**
         * Multibranch Pipeline Branch
         */
        multibranchPipelineBranch?: string;
        /**
         * Capture console output and wait for completion
         */
        captureConsole?: boolean;
        /**
         * Capture pipeline output and wait for pipeline completion
         */
        capturePipeline?: boolean;
        /**
         * Parameterized job
         */
        parameterizedJob?: boolean;
        /**
         * Job parameters
         */
        jobParameters?: string;
      };
    }
  | {
      /**
       * Jenkins queue job
       *
       * Queue a job on a Jenkins server
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Jenkins queue job inputs
       */
      inputs: {
        /**
         * Jenkins service connection
         */
        serverEndpoint: string;
        /**
         * Job name
         */
        jobName: string;
        /**
         * Job is of multibranch pipeline type
         */
        isMultibranchJob?: boolean;
        /**
         * Multibranch pipeline branch
         */
        multibranchPipelineBranch?: string;
        /**
         * Capture console output and wait for completion
         */
        captureConsole?: boolean;
        /**
         * Capture pipeline output and wait for pipeline completion
         */
        capturePipeline?: boolean;
        /**
         * Parameterized job
         */
        isParameterizedJob?: boolean;
        /**
         * Job parameters
         */
        jobParameters?: string;
        /**
         * Fail on unstable result
         */
        failOnUnstableResult?: boolean;
        /**
         * Number of retries for failed connection
         */
        retryCount?: string;
        /**
         * Time between retries
         */
        delayBetweenRetries?: string;
      };
    }
  | {
      /**
       * FTP upload
       *
       * Upload files using FTP
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * FTP upload inputs
       */
      inputs: {
        /**
         * Authentication Method
         */
        credentialsOption?: 'serviceEndpoint' | 'inputs';
        /**
         * FTP Service Connection
         */
        serverEndpoint?: string;
        /**
         * Server URL
         */
        serverUrl?: string;
        /**
         * Username
         */
        username?: string;
        /**
         * Password
         */
        password?: string;
        /**
         * Use implicit FTPS
         */
        implicitFTPS?: boolean;
        /**
         * Root folder
         */
        rootDirectory: string;
        /**
         * File patterns
         */
        filePatterns?: string;
        /**
         * Remote directory
         */
        remoteDirectory?: string;
        /**
         * Enable UTF8 support
         */
        enableUtf8?: boolean;
        /**
         * Delete remote directory
         */
        clean?: boolean;
        /**
         * Clear remote directory contents
         */
        cleanContents?: boolean;
        /**
         * Preserve file paths
         */
        preservePaths?: boolean;
        /**
         * Trust server certificate
         */
        trustSSL?: boolean;
        /**
         * FTP Commands
         */
        customCmds?: string;
      };
    }
  | {
      /**
       * FTP upload
       *
       * Upload files using FTP
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * FTP upload inputs
       */
      inputs: {
        /**
         * Authentication Method
         */
        credentialsOption?: 'serviceEndpoint' | 'inputs';
        /**
         * FTP Service Connection
         */
        serverEndpoint?: string;
        /**
         * Server URL
         */
        serverUrl?: string;
        /**
         * Username
         */
        username?: string;
        /**
         * Password
         */
        password?: string;
        /**
         * Root folder
         */
        rootDirectory: string;
        /**
         * File patterns
         */
        filePatterns?: string;
        /**
         * Remote directory
         */
        remoteDirectory?: string;
        /**
         * Delete remote directory
         */
        clean?: boolean;
        /**
         * Clear remote directory contents
         */
        cleanContents?: boolean;
        /**
         * Overwrite
         */
        overwrite?: boolean;
        /**
         * Preserve file paths
         */
        preservePaths?: boolean;
        /**
         * Trust server certificate
         */
        trustSSL?: boolean;
      };
    }
  | {
      /**
       * Windows machine file copy
       *
       * Copy files to remote Windows machines
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Windows machine file copy inputs
       */
      inputs: {
        /**
         * Source
         */
        SourcePath: string;
        /**
         * Machines
         */
        MachineNames: string;
        /**
         * Admin Login
         */
        AdminUserName: string;
        /**
         * Password
         */
        AdminPassword: string;
        /**
         * Destination Folder
         */
        TargetPath: string;
        /**
         * Clean Target
         */
        CleanTargetBeforeCopy?: boolean;
        /**
         * Copy Files in Parallel
         */
        CopyFilesInParallel?: boolean;
        /**
         * Additional Arguments
         */
        AdditionalArguments?: string;
      };
    }
  | {
      /**
       * Windows machine file copy
       *
       * Copy files to remote Windows machines
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Windows machine file copy inputs
       */
      inputs: {
        /**
         * Source
         */
        SourcePath: string;
        /**
         * Machines
         */
        EnvironmentName?: string;
        /**
         * Admin Login
         */
        AdminUserName?: string;
        /**
         * Password
         */
        AdminPassword?: string;
        /**
         * Destination Folder
         */
        TargetPath: string;
        /**
         * Clean Target
         */
        CleanTargetBeforeCopy?: boolean;
        /**
         * Copy Files in Parallel
         */
        CopyFilesInParallel?: boolean;
        /**
         * Additional Arguments
         */
        AdditionalArguments?: string;
        /**
         * Select Machines By
         */
        ResourceFilteringMethod?: 'machineNames' | 'tags';
        /**
         * Filter Criteria
         */
        MachineNames?: string;
      };
    }
  | {
      /**
       * Android Build
       *
       * [Deprecated]  Use Gradle
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Android Build inputs
       */
      inputs?: {
        /**
         * Location of Gradle Wrapper
         */
        gradleWrapper?: string;
        /**
         * Project Directory
         */
        gradleProj?: string;
        /**
         * Gradle Arguments
         */
        gradleArguments?: string;
        /**
         * Name
         */
        avdName?: string;
        /**
         * Create AVD
         */
        createAvd?: boolean;
        /**
         * AVD Target SDK
         */
        emulatorTarget?: string;
        /**
         * AVD Device
         */
        emulatorDevice?: string;
        /**
         * AVD ABI
         */
        avdAbi?: string;
        /**
         * Overwrite Existing AVD
         */
        avdForce?: boolean;
        /**
         * Create AVD Optional Arguments
         */
        avdOptionalArgs?: string;
        /**
         * Start and Stop Android Emulator
         */
        startEmulator?: boolean;
        /**
         * Timeout in Seconds
         */
        emulatorTimeout?: string;
        /**
         * Headless Display
         */
        emulatorHeadless?: boolean;
        /**
         * Emulator Optional Arguments
         */
        emulatorOptionalArgs?: string;
        /**
         * Delete AVD
         */
        deleteAvd?: boolean;
      };
    }
  | {
      /**
       * Python twine upload authenticate
       *
       * Authenticate for uploading Python distributions using twine. Add '-r FeedName/EndpointName --config-file $(PYPIRC_PATH)' to your twine upload command. For feeds present in this organization, use the feed name as the repository (-r). Otherwise, use the endpoint name defined in the service connection.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Python twine upload authenticate inputs
       */
      inputs?: {
        /**
         * 'Azure DevOps' Service Connection
         */
        azureDevOpsServiceConnection?: string;
        /**
         * Azure Artifacts Feed url.
         */
        feedUrl?: string;
        /**
         * My feed name (select below)
         */
        artifactFeed?: string;
        /**
         * Feed from external organizations
         */
        pythonUploadServiceConnection?: string;
      };
    }
  | {
      /**
       * Python twine upload authenticate
       *
       * Authenticate for uploading Python distributions using twine. Add '-r FeedName/EndpointName --config-file $(PYPIRC_PATH)' to your twine upload command. For feeds present in this organization, use the feed name as the repository (-r). Otherwise, use the endpoint name defined in the service connection.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Python twine upload authenticate inputs
       */
      inputs?: {
        /**
         * My feeds (select below)
         */
        artifactFeeds?: string;
        /**
         * Feeds from external organizations
         */
        externalFeeds?: string;
        /**
         * Publish pipeline metadata
         */
        publishPackageMetadata?: boolean;
      };
    }
  | {
      /**
       * IIS web app deploy
       *
       * Deploy a website or web application using Web Deploy
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * IIS web app deploy inputs
       */
      inputs: {
        /**
         * Website Name
         */
        WebSiteName: string;
        /**
         * Virtual Application
         */
        VirtualApplication?: string;
        /**
         * Package or Folder
         */
        Package?: string;
        /**
         * SetParameters File
         */
        SetParametersFile?: string;
        /**
         * Remove Additional Files at Destination
         */
        RemoveAdditionalFilesFlag?: boolean;
        /**
         * Exclude Files from the App_Data Folder
         */
        ExcludeFilesFromAppDataFlag?: boolean;
        /**
         * Take App Offline
         */
        TakeAppOfflineFlag?: boolean;
        /**
         * Additional Arguments
         */
        AdditionalArguments?: string;
        /**
         * XML transformation
         */
        XmlTransformation?: boolean;
        /**
         * XML variable substitution
         */
        XmlVariableSubstitution?: boolean;
        /**
         * JSON variable substitution
         */
        JSONFiles?: string;
      };
    }
  | {
      /**
       * Python script
       *
       * Run a Python file or inline script
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Python script inputs
       */
      inputs?: {
        /**
         * Script source
         */
        scriptSource?: 'filePath' | 'inline';
        /**
         * Script path
         */
        scriptPath?: string;
        /**
         * Script
         */
        script?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Python interpreter
         */
        pythonInterpreter?: string;
        /**
         * Working directory
         */
        workingDirectory?: string;
        /**
         * Fail on standard error
         */
        failOnStderr?: boolean;
      };
    }
  | {
      /**
       * Helm tool installer
       *
       * Install Helm and Kubernetes on an agent machine
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Helm tool installer inputs
       */
      inputs?: {
        /**
         * Helm Version Spec
         */
        helmVersion?: string;
        /**
         * Check for latest version of Helm
         */
        checkLatestHelmVersion?: boolean;
        /**
         * Install Kubectl
         */
        installKubectl?: boolean;
        /**
         * Kubectl Version Spec
         */
        kubectlVersion?: string;
        /**
         * Check for latest version of kubectl
         */
        checkLatestKubectl?: boolean;
      };
    }
  | {
      /**
       * Helm tool installer
       *
       * Install Helm on an agent machine
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Helm tool installer inputs
       */
      inputs?: {
        /**
         * Helm Version Spec
         */
        helmVersionToInstall?: string;
      };
    }
  | {
      /**
       * Node.js tasks runner installer
       *
       * Install specific Node.js version to run node tasks
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Node.js tasks runner installer inputs
       */
      inputs?: {
        /**
         * Version of runner to install
         */
        nodeVersion?: '6' | '10' | '16';
      };
    }
  | {
      /**
       * Xamarin License
       *
       * [Deprecated] Upgrade to free version of Xamarin: https://store.xamarin.com
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Xamarin License inputs
       */
      inputs: {
        /**
         * Action
         */
        action?: 'Activate' | 'Deactivate';
        /**
         * Email
         */
        email: string;
        /**
         * Password
         */
        password: string;
        /**
         * Xamarin Product
         */
        product?: 'MA' | 'MT' | 'MM';
        /**
         * Timeout in Seconds
         */
        timeout?: string;
      };
    }
  | {
      /**
       * NuGet authenticate
       *
       * This version of the task is deprecated, use NuGetAuthenticateV1 instead. Configure NuGet tools to authenticate with Azure Artifacts and other NuGet repositories. Requires NuGet >= 4.8.5385, dotnet >= 2.1.400, or MSBuild >= 15.8.166.59604.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * NuGet authenticate inputs
       */
      inputs?: {
        /**
         * Service connection credentials for feeds outside this organization
         */
        nuGetServiceConnections?: string;
        /**
         * Reinstall the credential provider even if already installed
         */
        forceReinstallCredentialProvider?: boolean;
      };
    }
  | {
      /**
       * NuGet authenticate
       *
       * Configure NuGet tools to authenticate with Azure Artifacts and other NuGet repositories. Requires NuGet >= 4.8.5385, dotnet >= 6, or MSBuild >= 15.8.166.59604
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * NuGet authenticate inputs
       */
      inputs?: {
        /**
         * 'Azure DevOps' Service Connection
         */
        azureDevOpsServiceConnection?: string;
        /**
         * Azure Artifacts URL
         */
        feedUrl?: string;
        /**
         * Reinstall the credential provider even if already installed
         */
        forceReinstallCredentialProvider?: boolean;
        /**
         * Service connection credentials for feeds outside this organization
         */
        nuGetServiceConnections?: string;
      };
    }
  | {
      /**
       * Download GitHub Nuget Packages
       *
       * Restore your nuget packages using dotnet CLI
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Download GitHub Nuget Packages inputs
       */
      inputs: {
        /**
         * Package Name
         */
        packageName: string;
        /**
         * Package Version
         */
        version: string;
        /**
         * Credentials for feed from GitHub
         */
        externalFeedCredentials?: string;
        /**
         * Destination directory
         */
        restoreDirectory?: string;
      };
    }
  | {
      /**
       * Maven Authenticate
       *
       * Provides credentials for Azure Artifacts feeds and external maven repositories
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Maven Authenticate inputs
       */
      inputs?: {
        /**
         * 'Azure DevOps' Service Connection
         */
        azureDevOpsServiceConnection?: string;
        /**
         * Feeds
         */
        artifactsFeeds?: string;
        /**
         * Credentials for repositories outside this organization/collection
         */
        mavenServiceConnections?: string;
      };
    }
  | {
      /**
       * Azure App Configuration Export
       *
       * Export key-values from Azure App Configuration to task variables in your build or deployment pipelines
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure App Configuration Export inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * App Configuration Endpoint
         */
        AppConfigurationEndpoint: string;
        /**
         * Selection Mode
         */
        SelectionMode?: 'Default' | 'Snapshot';
        /**
         * Key Filter
         */
        KeyFilter?: string;
        /**
         * Label
         */
        Label?: string;
        /**
         * Snapshot name
         */
        SnapshotName?: string;
        /**
         * Trim Key Prefix
         */
        TrimKeyPrefix?: string;
        /**
         * Suppress warning for overridden keys
         */
        SuppressWarningForOverriddenKeys?: boolean;
        /**
         * Treat key vault resolution errors as warnings
         */
        TreatKeyVaultErrorsAsWarning?: boolean;
      };
    }
  | {
      /**
       * Review App
       *
       * Use this task under deploy phase provider to create a resource dynamically
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Review App inputs
       */
      inputs: {
        /**
         * Resource name
         */
        resourceName: string;
        /**
         * Environment name
         */
        baseEnvironmentName?: string;
        /**
         * Review Resource Name
         */
        reviewResourceName?: string;
      };
    }
  | {
      /**
       * Java tool installer
       *
       * Acquire a specific version of Java from a user-supplied Azure blob or the tool cache and sets JAVA_HOME
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Java tool installer inputs
       */
      inputs: {
        /**
         * JDK version
         */
        versionSpec?: string;
        /**
         * JDK architecture
         */
        jdkArchitectureOption: 'x64' | 'x86';
        /**
         * JDK source
         */
        jdkSourceOption: 'AzureStorage' | 'LocalDirectory' | 'PreInstalled';
        /**
         * JDK file
         */
        jdkFile?: string;
        /**
         * Azure subscription
         */
        azureResourceManagerEndpoint?: string;
        /**
         * Storage account name
         */
        azureStorageAccountName?: string;
        /**
         * Container name
         */
        azureContainerName?: string;
        /**
         * Common virtual path
         */
        azureCommonVirtualFile?: string;
        /**
         * Destination directory
         */
        jdkDestinationDirectory?: string;
        /**
         * Resource Group name
         */
        azureResourceGroupName?: string;
        /**
         * Clean destination directory
         */
        cleanDestinationDirectory?: boolean;
        /**
         * Create directory for extracting
         */
        createExtractDirectory?: boolean;
      };
    }
  | {
      /**
       * Chef
       *
       * Deploy to Chef environments by editing environment attributes
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Chef inputs
       */
      inputs: {
        /**
         * Chef Service Connection
         */
        connectedServiceName: string;
        /**
         * Environment
         */
        Environment: string;
        /**
         * Environment Attributes
         */
        Attributes: string;
        /**
         * Wait Time
         */
        chefWaitTime?: string;
      };
    }
  | {
      /**
       * Azure Functions Deploy
       *
       * Update a function app with .NET, Python, JavaScript, PowerShell, Java based web applications
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Functions Deploy inputs
       */
      inputs: {
        /**
         * Azure Resource Manager connection
         */
        connectedServiceNameARM: string;
        /**
         * App type
         */
        appType: 'functionApp' | 'functionAppLinux';
        /**
         * Is Function App on Flex Consumption Plan
         */
        isFlexConsumption?: boolean;
        /**
         * Azure Functions App name
         */
        appName: string;
        /**
         * Deploy to Slot or App Service Environment
         */
        deployToSlotOrASE?: boolean;
        /**
         * Resource group
         */
        resourceGroupName?: string;
        /**
         * Slot
         */
        slotName?: string;
        /**
         * Package or folder
         */
        package?: string;
        /**
         * Runtime stack
         */
        runtimeStack?:
          | 'DOTNET|6.0'
          | 'DOTNET-ISOLATED|6.0'
          | 'DOTNET-ISOLATED|7.0'
          | 'DOTNET-ISOLATED|8.0'
          | 'DOTNET-ISOLATED|9.0'
          | 'JAVA|8'
          | 'JAVA|11'
          | 'JAVA|17'
          | 'JAVA|21'
          | 'NODE|14'
          | 'NODE|16'
          | 'NODE|18'
          | 'NODE|20'
          | 'PYTHON|3.8'
          | 'PYTHON|3.9'
          | 'PYTHON|3.10'
          | 'PYTHON|3.11';
        /**
         * App settings
         */
        appSettings?: string;
        /**
         * Deployment method
         */
        deploymentMethod?: 'auto' | 'zipDeploy' | 'runFromPackage';
      };
    }
  | {
      /**
       * Azure Functions
       *
       * Update a function app with .NET, Python, JavaScript, PowerShell, Java based web applications
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Functions inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * App type
         */
        appType: 'functionApp' | 'functionAppLinux';
        /**
         * Azure Functions App name
         */
        appName: string;
        /**
         * Deploy to Slot or App Service Environment
         */
        deployToSlotOrASE?: boolean;
        /**
         * Resource group
         */
        resourceGroupName?: string;
        /**
         * Slot
         */
        slotName?: string;
        /**
         * Package or folder
         */
        package?: string;
        /**
         * Runtime stack
         */
        runtimeStack?:
          | 'DOTNET|6.0'
          | 'DOTNET-ISOLATED|6.0'
          | 'DOTNET-ISOLATED|7.0'
          | 'DOTNET-ISOLATED|8.0'
          | 'DOTNET-ISOLATED|9.0'
          | 'JAVA|8'
          | 'JAVA|11'
          | 'JAVA|17'
          | 'JAVA|21'
          | 'NODE|14'
          | 'NODE|16'
          | 'NODE|18'
          | 'NODE|20'
          | 'PYTHON|3.8'
          | 'PYTHON|3.9'
          | 'PYTHON|3.10'
          | 'PYTHON|3.11';
        /**
         * Startup command
         */
        startUpCommand?: string;
        /**
         * Generate web.config parameters for Python, Node.js, Go and Java apps
         */
        customWebConfig?: string;
        /**
         * App settings
         */
        appSettings?: string;
        /**
         * Configuration settings
         */
        configurationStrings?: string;
        /**
         * Deployment method
         */
        deploymentMethod?: 'auto' | 'zipDeploy' | 'runFromPackage';
      };
    }
  | {
      /**
       * Azure Functions Deploy
       *
       * Update a function app with .NET, Python, JavaScript, PowerShell, Java based web applications
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Functions Deploy inputs
       */
      inputs: {
        /**
         * Azure Resource Manager connection
         */
        connectedServiceNameARM: string;
        /**
         * App type
         */
        appType: 'functionApp' | 'functionAppLinux';
        /**
         * Is Function App on Flex Consumption Plan
         */
        isFlexConsumption?: boolean;
        /**
         * Azure Functions App name
         */
        appName: string;
        /**
         * Deploy to Slot or App Service Environment
         */
        deployToSlotOrASE?: boolean;
        /**
         * Resource group
         */
        resourceGroupName?: string;
        /**
         * Slot
         */
        slotName?: string;
        /**
         * Package or folder
         */
        package?: string;
        /**
         * Runtime stack
         */
        runtimeStack?:
          | 'DOTNET|6.0'
          | 'DOTNET-ISOLATED|6.0'
          | 'DOTNET-ISOLATED|7.0'
          | 'DOTNET-ISOLATED|8.0'
          | 'JAVA|8'
          | 'JAVA|11'
          | 'JAVA|17'
          | 'JAVA|21'
          | 'NODE|14'
          | 'NODE|16'
          | 'NODE|18'
          | 'NODE|20'
          | 'PYTHON|3.8'
          | 'PYTHON|3.9'
          | 'PYTHON|3.10'
          | 'PYTHON|3.11';
        /**
         * App settings
         */
        appSettings?: string;
        /**
         * Deployment method
         */
        deploymentMethod?: 'auto' | 'zipDeploy' | 'runFromPackage';
      };
    }
  | {
      /**
       * npm authenticate (for task runners)
       *
       * Don't use this task if you're also using the npm task. Provides npm credentials to an .npmrc file in your repository for the scope of the build. This enables npm task runners like gulp and Grunt to authenticate with private registries.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * npm authenticate (for task runners) inputs
       */
      inputs: {
        /**
         * 'Azure DevOps' Service Connection
         */
        azureDevOpsServiceConnection?: string;
        /**
         * Azure Artifacts URL
         */
        feedUrl?: string;
        /**
         * .npmrc file to authenticate
         */
        workingFile: string;
        /**
         * Credentials for registries outside this organization/collection
         */
        customEndpoint?: string;
      };
    }
  | {
      /**
       * MSBuild
       *
       * Build with MSBuild
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * MSBuild inputs
       */
      inputs?: {
        /**
         * Project
         */
        solution?: string;
        /**
         * MSBuild
         */
        msbuildLocationMethod?: 'version' | 'location';
        /**
         * MSBuild Version
         */
        msbuildVersion?: 'latest' | '17.0' | '16.0' | '15.0' | '14.0' | '12.0' | '4.0';
        /**
         * MSBuild Architecture
         */
        msbuildArchitecture?: 'x86' | 'x64';
        /**
         * Path to MSBuild
         */
        msbuildLocation?: string;
        /**
         * Platform
         */
        platform?: string;
        /**
         * Configuration
         */
        configuration?: string;
        /**
         * MSBuild Arguments
         */
        msbuildArguments?: string;
        /**
         * Clean
         */
        clean?: boolean;
        /**
         * Build in Parallel
         */
        maximumCpuCount?: boolean;
        /**
         * Restore NuGet Packages
         */
        restoreNugetPackages?: boolean;
        /**
         * Record Project Details
         */
        logProjectEvents?: boolean;
        /**
         * Create Log File
         */
        createLogFile?: boolean;
        /**
         * Log File Verbosity
         */
        logFileVerbosity?: 'quiet' | 'minimal' | 'normal' | 'detailed' | 'diagnostic';
      };
    }
  | {
      /**
       * Build machine image
       *
       * Build a machine image using Packer, which may be used for Azure Virtual machine scale set deployment
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Build machine image inputs
       */
      inputs: {
        /**
         * Packer template
         */
        templateType?: 'builtin' | 'custom';
        /**
         * Packer template location
         */
        customTemplateLocation?: string;
        /**
         * Template parameters
         */
        customTemplateParameters?: string;
        /**
         * Azure subscription
         */
        ConnectedServiceName: string;
        /**
         * Storage location
         */
        location: string;
        /**
         * Storage account
         */
        storageAccountName: string;
        /**
         * Resource group
         */
        azureResourceGroup: string;
        /**
         * Base image source
         */
        baseImageSource?: 'default' | 'customVhd';
        /**
         * Base image
         */
        baseImage?:
          | 'MicrosoftWindowsServer:WindowsServer:2012-R2-Datacenter:windows'
          | 'MicrosoftWindowsServer:WindowsServer:2016-Datacenter:windows'
          | 'MicrosoftWindowsServer:WindowsServer:2012-Datacenter:windows'
          | 'MicrosoftWindowsServer:WindowsServer:2008-R2-SP1:windows'
          | 'Canonical:UbuntuServer:14.04.4-LTS:linux'
          | 'Canonical:UbuntuServer:16.04-LTS:linux'
          | 'RedHat:RHEL:7.2:linux'
          | 'RedHat:RHEL:6.8:linux'
          | 'OpenLogic:CentOS:7.2:linux'
          | 'OpenLogic:CentOS:6.8:linux'
          | 'credativ:Debian:8:linux'
          | 'credativ:Debian:7:linux'
          | 'SUSE:openSUSE-Leap:42.2:linux'
          | 'SUSE:SLES:12-SP2:linux'
          | 'SUSE:SLES:11-SP4:linux';
        /**
         * Base image URL
         */
        customImageUrl?: string;
        /**
         * Base image OS
         */
        customImageOSType?: 'windows' | 'linux';
        /**
         * Deployment Package
         */
        packagePath: string;
        /**
         * Deployment script
         */
        deployScriptPath: string;
        /**
         * Deployment script arguments
         */
        deployScriptArguments?: string;
        /**
         * Additional Builder parameters
         */
        additionalBuilderParameters?: string;
        /**
         * Skip temporary file cleanup during deprovision
         */
        skipTempFileCleanupDuringVMDeprovision?: boolean;
        /**
         * Image URL
         */
        imageUri?: string;
      };
    }
  | {
      /**
       * Build machine image
       *
       * Build a machine image using Packer, which may be used for Azure Virtual machine scale set deployment
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Build machine image inputs
       */
      inputs: {
        /**
         * Packer template
         */
        templateType?: 'builtin' | 'custom';
        /**
         * Packer template location
         */
        customTemplateLocation?: string;
        /**
         * Template parameters
         */
        customTemplateParameters?: string;
        /**
         * Azure subscription
         */
        ConnectedServiceName: string;
        /**
         * Managed VM disk image
         */
        isManagedImage?: boolean;
        /**
         * Managed VM Disk Image Name
         */
        managedImageName?: string;
        /**
         * Storage location
         */
        location: string;
        /**
         * Storage account
         */
        storageAccountName: string;
        /**
         * Resource group
         */
        azureResourceGroup: string;
        /**
         * Base image source
         */
        baseImageSource?: 'default' | 'customVhd';
        /**
         * Base image
         */
        baseImage?:
          | 'MicrosoftWindowsServer:WindowsServer:2012-R2-Datacenter:windows'
          | 'MicrosoftWindowsServer:WindowsServer:2016-Datacenter:windows'
          | 'MicrosoftWindowsServer:WindowsServer:2012-Datacenter:windows'
          | 'MicrosoftWindowsServer:WindowsServer:2008-R2-SP1:windows'
          | 'Canonical:UbuntuServer:14.04.4-LTS:linux'
          | 'Canonical:UbuntuServer:16.04-LTS:linux'
          | 'Canonical:UbuntuServer:18.04-LTS:linux'
          | 'RedHat:RHEL:7.2:linux'
          | 'RedHat:RHEL:6.8:linux'
          | 'OpenLogic:CentOS:7.2:linux'
          | 'OpenLogic:CentOS:6.8:linux'
          | 'credativ:Debian:8:linux'
          | 'credativ:Debian:7:linux'
          | 'SUSE:openSUSE-Leap:42.2:linux'
          | 'SUSE:SLES:12-SP2:linux'
          | 'SUSE:SLES:11-SP4:linux';
        /**
         * Base image URL
         */
        customImageUrl?: string;
        /**
         * Base image OS
         */
        customImageOSType?: 'windows' | 'linux';
        /**
         * Deployment Package
         */
        packagePath: string;
        /**
         * Deployment script
         */
        deployScriptPath: string;
        /**
         * Deployment script arguments
         */
        deployScriptArguments?: string;
        /**
         * Delete temp folder
         */
        canDeleteTempFolder?: boolean;
        /**
         * Additional Builder parameters
         */
        additionalBuilderParameters?: string;
        /**
         * Skip temporary file cleanup during deprovision
         */
        skipTempFileCleanupDuringVMDeprovision?: boolean;
        /**
         * Packer Version
         */
        packerVersion?: string;
        /**
         * Image URL or Name
         */
        imageUri?: string;
        /**
         * Azure Resource Id
         */
        imageId?: string;
      };
    }
  | {
      /**
       * NuGet packager
       *
       * Deprecated: use the “NuGet” task instead. It works with the new Tool Installer framework so you can easily use new versions of NuGet without waiting for a task update, provides better support for authenticated feeds outside this organization/collection, and uses NuGet 4 by default.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * NuGet packager inputs
       */
      inputs?: {
        /**
         * Path to csproj or nuspec file(s) to pack
         */
        searchPattern?: string;
        /**
         * Package Folder
         */
        outputdir?: string;
        /**
         * Include referenced projects
         */
        includeReferencedProjects?: boolean;
        /**
         * Automatic package versioning
         */
        versionByBuild?: 'false' | 'byPrereleaseNumber' | 'byEnvVar' | 'true';
        /**
         * Environment variable
         */
        versionEnvVar?: string;
        /**
         * Major
         */
        requestedMajorVersion?: string;
        /**
         * Minor
         */
        requestedMinorVersion?: string;
        /**
         * Patch
         */
        requestedPatchVersion?: string;
        /**
         * Configuration to Package
         */
        configurationToPack?: string;
        /**
         * Additional build properties
         */
        buildProperties?: string;
        /**
         * NuGet Arguments
         */
        nuGetAdditionalArgs?: string;
        /**
         * Path to NuGet.exe
         */
        nuGetPath?: string;
      };
    }
  | {
      /**
       * Azure App Configuration Snapshot
       *
       * Create a configuration snapshot in Azure App Configuration through build or deployment pipelines
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure App Configuration Snapshot inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * App Configuration Endpoint
         */
        AppConfigurationEndpoint: string;
        /**
         * Snapshot Name
         */
        SnapshotName: string;
        /**
         * Composition Type
         */
        CompositionType?: 'key' | 'key_label';
        /**
         * Filters for key-values
         */
        Filters: string;
        /**
         * Days to retain archived snapshot
         */
        RetentionPeriod?: number;
        /**
         * Tags
         */
        Tags?: string;
      };
    }
  | {
      /**
       * Duffle tool installer
       *
       * Install a specified version of Duffle for installing and managing CNAB bundles
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Duffle tool installer inputs
       */
      inputs?: {
        /**
         * Version
         */
        version?: string;
        /**
         * Check for latest version
         */
        checkLatestVersion?: boolean;
      };
    }
  | {
      /**
       * Update Service Fabric App Versions
       *
       * Automatically updates the versions of a packaged Service Fabric application.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Update Service Fabric App Versions inputs
       */
      inputs: {
        /**
         * Application Package
         */
        applicationPackagePath: string;
        /**
         * Version Value
         */
        versionSuffix?: string;
        /**
         * Version Behavior
         */
        versionBehavior?: 'Append' | 'Replace';
        /**
         * Update only if changed
         */
        updateOnlyChanged?: boolean;
        /**
         * Package Artifact Name
         */
        pkgArtifactName?: string;
        /**
         * Log all changes
         */
        logAllChanges?: boolean;
        /**
         * Compare against
         */
        compareType?: 'LastSuccessful' | 'Specific';
        /**
         * Build Number
         */
        buildNumber?: string;
      };
    }
  | {
      /**
       * Update Service Fabric manifests
       *
       * Automatically update portions of application and service manifests in a packaged Azure Service Fabric application
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Update Service Fabric manifests inputs
       */
      inputs: {
        /**
         * Update Type
         */
        updateType?: 'Manifest versions' | 'Docker image settings';
        /**
         * Application Package
         */
        applicationPackagePath: string;
        /**
         * Version Value
         */
        versionSuffix?: string;
        /**
         * Version Behavior
         */
        versionBehavior?: 'Append' | 'Replace';
        /**
         * Update only if changed
         */
        updateOnlyChanged?: boolean;
        /**
         * Package Artifact Name
         */
        pkgArtifactName?: string;
        /**
         * Log all changes
         */
        logAllChanges?: boolean;
        /**
         * Compare against
         */
        compareType?: 'LastSuccessful' | 'Specific';
        /**
         * Build Number
         */
        buildNumber?: string;
        /**
         * Overwrite Existing Package Artifact
         */
        overwriteExistingPkgArtifact?: boolean;
        /**
         * Image Names Path
         */
        imageNamesPath?: string;
        /**
         * Image Digests Path
         */
        imageDigestsPath?: string;
      };
    }
  | {
      /**
       * Query Azure Monitor alerts
       *
       * Observe the configured Azure Monitor rules for active alerts
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Query Azure Monitor alerts inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        connectedServiceNameARM: string;
        /**
         * Resource group
         */
        ResourceGroupName: string;
        /**
         * Filter type
         */
        filterType?: 'resource' | 'alertrule' | 'none';
        /**
         * Resource
         */
        resource?: string;
        /**
         * Alert rule
         */
        alertRule?: string;
        /**
         * Severity
         */
        severity?: 'Sev0' | 'Sev1' | 'Sev2' | 'Sev3' | 'Sev4';
        /**
         * Time range
         */
        timeRange?: '1h' | '1d' | '7d' | '30d';
        /**
         * Alert state
         */
        alertState?: 'New' | 'Acknowledged' | 'Closed';
        /**
         * Monitor condition
         */
        monitorCondition?: 'Fired ' | 'Resolved';
      };
    }
  | {
      /**
       * Query Classic Azure Monitor alerts
       *
       * Observe the configured classic Azure Monitor rules for active alerts
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Query Classic Azure Monitor alerts inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        connectedServiceNameARM: string;
        /**
         * Resource group
         */
        ResourceGroupName: string;
        /**
         * Resource type
         */
        ResourceType?:
          | 'Microsoft.Insights/components'
          | 'Microsoft.Web/sites'
          | 'Microsoft.Storage/storageAccounts'
          | 'Microsoft.Compute/virtualMachines';
        /**
         * Resource name
         */
        resourceName: string;
        /**
         * Alert rules
         */
        alertRules: string;
      };
    }
  | {
      /**
       * Notation
       *
       * Azure Pipepine Task for setting up Notation CLI, sign and verify with Notation
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Notation inputs
       */
      inputs?: {
        /**
         * Command to run
         */
        command?: 'install' | 'sign' | 'verify';
        /**
         * Custom Version
         */
        isCustomVersion?: boolean;
        /**
         * Version
         */
        version?: string;
        /**
         * Download URL
         */
        url?: string;
        /**
         * Checksum
         */
        checksum?: string;
        /**
         * Artifact references
         */
        artifactRefs?: string;
        /**
         * Signature Format
         */
        signatureFormat?: 'cose' | 'jws';
        /**
         * [Experimental] Allow Referrers API
         */
        allowReferrersAPI?: boolean;
        /**
         * Plugin
         */
        plugin?: 'azureKeyVault';
        /**
         * Plugin Version
         */
        akvPluginVersion?: string;
        /**
         * Azure Key Vault service connection
         */
        azurekvServiceConection?: string;
        /**
         * Key ID
         */
        keyid?: string;
        /**
         * Certificate Bundle File Path
         */
        caCertBundle?: string;
        /**
         * Self-signed Certificate
         */
        selfSigned?: boolean;
        /**
         * Timestamp URL
         */
        timestampURL?: string;
        /**
         * Timestamp Root Certificate
         */
        timestampRootCert?: string;
        /**
         * Trust Policy File Path
         */
        trustPolicy?: string;
        /**
         * Trust Store Folder Path
         */
        trustStore?: string;
      };
    }
  | {
      /**
       * Azure Network Load Balancer
       *
       * Connect or disconnect an Azure virtual machine's network interface to a Load Balancer's back end address pool
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Network Load Balancer inputs
       */
      inputs: {
        /**
         * Azure Subscription
         */
        azureSubscription: string;
        /**
         * Resource Group
         */
        ResourceGroupName: string;
        /**
         * Load Balancer Name
         */
        LoadBalancer: string;
        /**
         * Action
         */
        Action: 'Disconnect' | 'Connect';
      };
    }
  | {
      /**
       * Docker Compose
       *
       * Build, push or run multi-container Docker applications. Task can be used with Docker or Azure Container registry.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Docker Compose inputs
       */
      inputs?: {
        /**
         * Container Registry Type
         */
        containerregistrytype?: 'Azure Container Registry' | 'Container Registry';
        /**
         * Docker Registry Service Connection
         */
        dockerRegistryEndpoint?: string;
        /**
         * Azure subscription
         */
        azureSubscription?: string;
        /**
         * Azure Container Registry
         */
        azureContainerRegistry?: string;
        /**
         * Docker Compose File
         */
        dockerComposeFile?: string;
        /**
         * Additional Docker Compose Files
         */
        additionalDockerComposeFiles?: string;
        /**
         * Environment Variables
         */
        dockerComposeFileArgs?: string;
        /**
         * Project Name
         */
        projectName?: string;
        /**
         * Qualify Image Names
         */
        qualifyImageNames?: boolean;
        /**
         * Action
         */
        action?:
          | 'Build services'
          | 'Push services'
          | 'Run services'
          | 'Run a specific service'
          | 'Lock services'
          | 'Write service image digests'
          | 'Combine configuration'
          | 'Run a Docker Compose command';
        /**
         * Additional Image Tags
         */
        additionalImageTags?: string;
        /**
         * Include Source Tags
         */
        includeSourceTags?: boolean;
        /**
         * Include Latest Tag
         */
        includeLatestTag?: boolean;
        /**
         * Build Images
         */
        buildImages?: boolean;
        /**
         * Service Name
         */
        serviceName?: string;
        /**
         * Container Name
         */
        containerName?: string;
        /**
         * Ports
         */
        ports?: string;
        /**
         * Working Directory
         */
        workingDirectory?: string;
        /**
         * Entry Point Override
         */
        entrypoint?: string;
        /**
         * Command
         */
        containerCommand?: string;
        /**
         * Run in Background
         */
        detached?: boolean;
        /**
         * Abort on Container Exit
         */
        abortOnContainerExit?: boolean;
        /**
         * Image Digest Compose File
         */
        imageDigestComposeFile?: string;
        /**
         * Remove Build Options
         */
        removeBuildOptions?: boolean;
        /**
         * Base Resolve Directory
         */
        baseResolveDirectory?: string;
        /**
         * Output Docker Compose File
         */
        outputDockerComposeFile?: string;
        /**
         * Command
         */
        dockerComposeCommand?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Docker Host Service Connection
         */
        dockerHostEndpoint?: string;
        /**
         * No-op if no Docker Compose File
         */
        nopIfNoDockerComposeFile?: boolean;
        /**
         * Require Additional Docker Compose Files
         */
        requireAdditionalDockerComposeFiles?: boolean;
        /**
         * Working Directory
         */
        currentWorkingDirectory?: string;
        /**
         * Docker Compose executable Path
         */
        dockerComposePath?: string;
      };
    }
  | {
      /**
       * Azure Monitor alerts (Deprecated)
       *
       * Configure alerts on available metrics for an Azure resource (Deprecated)
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Monitor alerts (Deprecated) inputs
       */
      inputs: {
        /**
         * Azure Subscription
         */
        azureSubscription: string;
        /**
         * Resource Group
         */
        ResourceGroupName: string;
        /**
         * Resource Type
         */
        ResourceType?:
          | 'Microsoft.Insights/components'
          | 'Microsoft.Web/sites'
          | 'Microsoft.Storage/storageAccounts'
          | 'Microsoft.Compute/virtualMachines';
        /**
         * Resource name
         */
        ResourceName: string;
        /**
         * Alert rules
         */
        AlertRules: string;
        /**
         * Subscription owners, contributors and readers
         */
        NotifyServiceOwners?: boolean;
        /**
         * Additional administrator emails
         */
        NotifyEmails?: string;
      };
    }
  | {
      /**
       * Xamarin Test Cloud
       *
       * [Deprecated] Test mobile apps with Xamarin Test Cloud using Xamarin.UITest. Instead, use the 'App Center test' task.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Xamarin Test Cloud inputs
       */
      inputs: {
        /**
         * App file
         */
        appFile: string;
        /**
         * dSYM file (iOS only)
         */
        dsymFile?: string;
        /**
         * Team API key
         */
        teamApiKey: string;
        /**
         * User email
         */
        email: string;
        /**
         * Devices
         */
        devices: string;
        /**
         * Series
         */
        series?: string;
        /**
         * Test assembly directory
         */
        testAssemblyDirectory: string;
        /**
         * Parallelization
         */
        parallelizationOption?: 'none' | '--fixture-chunk' | '--test-chunk';
        /**
         * System language
         */
        localeOption?:
          | 'da_DK'
          | 'nl_NL'
          | 'en_GB'
          | 'en_US'
          | 'fr_FR'
          | 'de_DE'
          | 'ja_JP'
          | 'ru_RU'
          | 'es_MX'
          | 'es_ES'
          | 'user';
        /**
         * Other locale
         */
        userDefinedLocale?: string;
        /**
         * test-cloud.exe location
         */
        testCloudFile?: string;
        /**
         * Optional arguments
         */
        optionalArgs?: string;
        /**
         * Publish results to Azure Pipelines
         */
        publishNUnitResults?: boolean;
      };
    }
  | {
      /**
       * Service Fabric application deployment
       *
       * Deploy an Azure Service Fabric application to a cluster
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Service Fabric application deployment inputs
       */
      inputs: {
        /**
         * Application Package
         */
        applicationPackagePath: string;
        /**
         * Cluster Service Connection
         */
        serviceConnectionName: string;
        /**
         * Publish Profile
         */
        publishProfilePath?: string;
        /**
         * Application Parameters
         */
        applicationParameterPath?: string;
        /**
         * Override Application Parameters
         */
        overrideApplicationParameter?: boolean;
        /**
         * Compress Package
         */
        compressPackage?: boolean;
        /**
         * CopyPackageTimeoutSec
         */
        copyPackageTimeoutSec?: string;
        /**
         * RegisterPackageTimeoutSec
         */
        registerPackageTimeoutSec?: string;
        /**
         * Overwrite Behavior
         */
        overwriteBehavior?: 'Always' | 'Never' | 'SameAppTypeAndVersion';
        /**
         * Skip upgrade for same Type and Version
         */
        skipUpgradeSameTypeAndVersion?: boolean;
        /**
         * Skip package validation
         */
        skipPackageValidation?: boolean;
        /**
         * Use Diff Package
         */
        useDiffPackage?: boolean;
        /**
         * Override All Publish Profile Upgrade Settings
         */
        overridePublishProfileSettings?: boolean;
        /**
         * Upgrade the Application
         */
        isUpgrade?: boolean;
        /**
         * Unregister Unused Versions
         */
        unregisterUnusedVersions?: boolean;
        /**
         * Upgrade Mode
         */
        upgradeMode?: 'Monitored' | 'UnmonitoredAuto' | 'UnmonitoredManual';
        /**
         * FailureAction
         */
        FailureAction?: 'Rollback' | 'Manual';
        /**
         * UpgradeReplicaSetCheckTimeoutSec
         */
        UpgradeReplicaSetCheckTimeoutSec?: string;
        /**
         * TimeoutSec
         */
        TimeoutSec?: string;
        /**
         * ForceRestart
         */
        ForceRestart?: boolean;
        /**
         * HealthCheckRetryTimeoutSec
         */
        HealthCheckRetryTimeoutSec?: string;
        /**
         * HealthCheckWaitDurationSec
         */
        HealthCheckWaitDurationSec?: string;
        /**
         * HealthCheckStableDurationSec
         */
        HealthCheckStableDurationSec?: string;
        /**
         * UpgradeDomainTimeoutSec
         */
        UpgradeDomainTimeoutSec?: string;
        /**
         * ConsiderWarningAsError
         */
        ConsiderWarningAsError?: boolean;
        /**
         * DefaultServiceTypeHealthPolicy
         */
        DefaultServiceTypeHealthPolicy?: string;
        /**
         * MaxPercentUnhealthyDeployedApplications
         */
        MaxPercentUnhealthyDeployedApplications?: string;
        /**
         * UpgradeTimeoutSec
         */
        UpgradeTimeoutSec?: string;
        /**
         * ServiceTypeHealthPolicyMap
         */
        ServiceTypeHealthPolicyMap?: string;
        /**
         * Configure Docker settings
         */
        configureDockerSettings?: boolean;
        /**
         * Registry Credentials Source
         */
        registryCredentials?: 'AzureResourceManagerEndpoint' | 'ContainerRegistryEndpoint' | 'UsernamePassword';
        /**
         * Docker Registry Service Connection
         */
        dockerRegistryConnection?: string;
        /**
         * Azure subscription
         */
        azureSubscription?: string;
        /**
         * Registry User Name
         */
        registryUserName?: string;
        /**
         * Registry Password
         */
        registryPassword?: string;
        /**
         * Password Encrypted
         */
        passwordEncrypted?: boolean;
      };
    }
  | {
      /**
       * Xcode
       *
       * Build, test, or archive an Xcode workspace on macOS. Optionally package an app.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Xcode inputs
       */
      inputs?: {
        /**
         * Actions
         */
        actions?: string;
        /**
         * Configuration
         */
        configuration?: string;
        /**
         * SDK
         */
        sdk?: string;
        /**
         * Workspace or project path
         */
        xcWorkspacePath?: string;
        /**
         * Scheme
         */
        scheme?: string;
        /**
         * Xcode version
         */
        xcodeVersion?: '8' | '9' | '10' | '11' | '12' | '13' | 'default' | 'specifyPath';
        /**
         * Xcode developer path
         */
        xcodeDeveloperDir?: string;
        /**
         * Create app package
         */
        packageApp?: boolean;
        /**
         * Archive path
         */
        archivePath?: string;
        /**
         * Export path
         */
        exportPath?: string;
        /**
         * Export options
         */
        exportOptions?: 'auto' | 'plist' | 'specify';
        /**
         * Export method
         */
        exportMethod?: string;
        /**
         * Team ID
         */
        exportTeamId?: string;
        /**
         * Export options plist
         */
        exportOptionsPlist?: string;
        /**
         * Export arguments
         */
        exportArgs?: string;
        /**
         * Signing style
         */
        signingOption?: 'nosign' | 'default' | 'manual' | 'auto';
        /**
         * Signing identity
         */
        signingIdentity?: string;
        /**
         * Provisioning profile UUID
         */
        provisioningProfileUuid?: string;
        /**
         * Provisioning profile name
         */
        provisioningProfileName?: string;
        /**
         * Team ID
         */
        teamId?: string;
        /**
         * Destination platform
         */
        destinationPlatformOption?: 'default' | 'iOS' | 'tvOS' | 'macOS' | 'custom';
        /**
         * Custom destination platform
         */
        destinationPlatform?: string;
        /**
         * Destination type
         */
        destinationTypeOption?: 'simulators' | 'devices';
        /**
         * Simulator
         */
        destinationSimulators?: string;
        /**
         * Device
         */
        destinationDevices?: string;
        /**
         * Arguments
         */
        args?: string;
        /**
         * Working directory
         */
        workingDirectory?: string;
        /**
         * Use xcpretty
         */
        useXcpretty?: boolean;
        /**
         * Xcpretty arguments
         */
        xcprettyArgs?: string;
        /**
         * Publish test results to Azure Pipelines
         */
        publishJUnitResults?: boolean;
        /**
         * Test run title
         */
        testRunTitle?: string;
      };
    }
  | {
      /**
       * Xcode Build
       *
       * Build an Xcode workspace on macOS
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Xcode Build inputs
       */
      inputs?: {
        /**
         * Actions
         */
        actions?: string;
        /**
         * Configuration
         */
        configuration?: string;
        /**
         * SDK
         */
        sdk?: string;
        /**
         * Workspace/Project Path
         */
        xcWorkspacePath?: string;
        /**
         * Scheme
         */
        scheme?: string;
        /**
         * Create App Package
         */
        packageApp?: boolean;
        /**
         * Archive Path
         */
        archivePath?: string;
        /**
         * Export Path
         */
        exportPath?: string;
        /**
         * Export Options
         */
        exportOptions?: 'auto' | 'plist' | 'specify';
        /**
         * Export Method
         */
        exportMethod?: string;
        /**
         * Team ID
         */
        exportTeamId?: string;
        /**
         * Export Options Plist
         */
        exportOptionsPlist?: string;
        /**
         * Export Arguments
         */
        exportArgs?: string;
        /**
         * Automatic Signing
         */
        xcode8AutomaticSigning?: boolean;
        /**
         * Team ID
         */
        teamId?: string;
        /**
         * Override Using
         */
        signMethod?: 'file' | 'id';
        /**
         * Signing Identity
         */
        iosSigningIdentity?: string;
        /**
         * Unlock Default Keychain
         */
        unlockDefaultKeychain?: boolean;
        /**
         * Default Keychain Password
         */
        defaultKeychainPassword?: string;
        /**
         * Provisioning Profile UUID
         */
        provProfileUuid?: string;
        /**
         * P12 Certificate File
         */
        p12?: string;
        /**
         * P12 Password
         */
        p12pwd?: string;
        /**
         * Provisioning Profile File
         */
        provProfile?: string;
        /**
         * Remove Profile After Build
         */
        removeProfile?: boolean;
        /**
         * Arguments
         */
        args?: string;
        /**
         * Working Directory
         */
        cwd?: string;
        /**
         * Output Directory
         */
        outputPattern?: string;
        /**
         * Xcode Developer Path
         */
        xcodeDeveloperDir?: string;
        /**
         * Use xcpretty
         */
        useXcpretty?: boolean;
        /**
         * Publish to VSTS/TFS
         */
        publishJUnitResults?: boolean;
      };
    }
  | {
      /**
       * Xcode
       *
       * Build, test, or archive an Xcode workspace on macOS. Optionally package an app.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Xcode inputs
       */
      inputs?: {
        /**
         * Actions
         */
        actions?: string;
        /**
         * Configuration
         */
        configuration?: string;
        /**
         * SDK
         */
        sdk?: string;
        /**
         * Workspace or project path
         */
        xcWorkspacePath?: string;
        /**
         * Scheme
         */
        scheme?: string;
        /**
         * Xcode version
         */
        xcodeVersion?: '8' | '9' | 'default' | 'specifyPath';
        /**
         * Xcode developer path
         */
        xcodeDeveloperDir?: string;
        /**
         * Create app package
         */
        packageApp?: boolean;
        /**
         * Archive path
         */
        archivePath?: string;
        /**
         * Export path
         */
        exportPath?: string;
        /**
         * Export options
         */
        exportOptions?: 'auto' | 'plist' | 'specify';
        /**
         * Export method
         */
        exportMethod?: string;
        /**
         * Team ID
         */
        exportTeamId?: string;
        /**
         * Export options plist
         */
        exportOptionsPlist?: string;
        /**
         * Export arguments
         */
        exportArgs?: string;
        /**
         * Signing style
         */
        signingOption?: 'nosign' | 'default' | 'manual' | 'auto';
        /**
         * Signing identity
         */
        signingIdentity?: string;
        /**
         * Provisioning profile UUID
         */
        provisioningProfileUuid?: string;
        /**
         * Team ID
         */
        teamId?: string;
        /**
         * Destination platform
         */
        destinationPlatformOption?: 'default' | 'iOS' | 'tvOS' | 'macOS' | 'custom';
        /**
         * Custom destination platform
         */
        destinationPlatform?: string;
        /**
         * Destination type
         */
        destinationTypeOption?: 'simulators' | 'devices';
        /**
         * Simulator
         */
        destinationSimulators?: string;
        /**
         * Device
         */
        destinationDevices?: string;
        /**
         * Arguments
         */
        args?: string;
        /**
         * Working directory
         */
        workingDirectory?: string;
        /**
         * Output directory
         */
        outputPattern?: string;
        /**
         * Use xcpretty
         */
        useXcpretty?: boolean;
        /**
         * Publish test results to VSTS/TFS
         */
        publishJUnitResults?: boolean;
      };
    }
  | {
      /**
       * Xcode Build
       *
       * Build an Xcode workspace on Mac OS
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Xcode Build inputs
       */
      inputs?: {
        /**
         * Actions
         */
        actions?: string;
        /**
         * Configuration
         */
        configuration?: string;
        /**
         * SDK
         */
        sdk?: string;
        /**
         * Workspace/Project Path
         */
        xcWorkspacePath?: string;
        /**
         * Scheme
         */
        scheme?: string;
        /**
         * Create App Package
         */
        packageApp?: boolean;
        /**
         * Create Package (IPA) using
         */
        packageTool?: 'xcrun' | 'xcodebuild';
        /**
         * Archive Path
         */
        archivePath?: string;
        /**
         * Export Path
         */
        exportPath?: string;
        /**
         * Export Options
         */
        exportOptions?: 'auto' | 'plist' | 'specify';
        /**
         * Export Method
         */
        exportMethod?: string;
        /**
         * Team ID
         */
        exportTeamId?: string;
        /**
         * Export Options Plist
         */
        exportOptionsPlist?: string;
        /**
         * Automatic Signing
         */
        xcode8AutomaticSigning?: boolean;
        /**
         * Team ID
         */
        teamId?: string;
        /**
         * Override Using
         */
        signMethod?: 'file' | 'id';
        /**
         * Signing Identity
         */
        iosSigningIdentity?: string;
        /**
         * Unlock Default Keychain
         */
        unlockDefaultKeychain?: boolean;
        /**
         * Default Keychain Password
         */
        defaultKeychainPassword?: string;
        /**
         * Provisioning Profile UUID
         */
        provProfileUuid?: string;
        /**
         * P12 Certificate File
         */
        p12?: string;
        /**
         * P12 Password
         */
        p12pwd?: string;
        /**
         * Provisioning Profile File
         */
        provProfile?: string;
        /**
         * Remove Profile After Build
         */
        removeProfile?: boolean;
        /**
         * Arguments
         */
        args?: string;
        /**
         * Working Directory
         */
        cwd?: string;
        /**
         * Output Directory
         */
        outputPattern?: string;
        /**
         * Xcode Developer Path
         */
        xcodeDeveloperDir?: string;
        /**
         * Use xcpretty
         */
        useXcpretty?: boolean;
        /**
         * Publish to VSTS/TFS
         */
        publishJUnitResults?: boolean;
        /**
         * Use xctool
         */
        useXctool?: boolean;
        /**
         * xctool Test Reporter Format
         */
        xctoolReporter?: string;
      };
    }
  | {
      /**
       * NuGet publisher
       *
       * Deprecated: use the “NuGet” task instead. It works with the new Tool Installer framework so you can easily use new versions of NuGet without waiting for a task update, provides better support for authenticated feeds outside this organization/collection, and uses NuGet 4 by default.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * NuGet publisher inputs
       */
      inputs?: {
        /**
         * Path/Pattern to nupkg
         */
        searchPattern?: string;
        /**
         * Feed type
         */
        nuGetFeedType?: 'external' | 'internal';
        /**
         * NuGet Service Connection
         */
        connectedServiceName?: string;
        /**
         * Internal Feed URL
         */
        feedName?: string;
        /**
         * NuGet Arguments
         */
        nuGetAdditionalArgs?: string;
        /**
         * Verbosity
         */
        verbosity?: '-' | 'Quiet' | 'Normal' | 'Detailed';
        /**
         * NuGet Version
         */
        nuGetVersion?: '3.3.0' | '3.5.0.1829' | '4.0.0.2283' | 'custom';
        /**
         * Path to NuGet.exe
         */
        nuGetPath?: string;
        /**
         * Continue if no packages match the "Path/Pattern to nupkg"
         */
        continueOnEmptyNupkgMatch?: boolean;
      };
    }
  | {
      /**
       * Query work items
       *
       * Execute a work item query and check the number of items returned
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Query work items inputs
       */
      inputs: {
        /**
         * Query
         */
        queryId: string;
        /**
         * Upper threshold
         */
        maxThreshold?: string;
        /**
         * Lower threshold
         */
        minThreshold?: string;
      };
    }
  | {
      /**
       * Azure Web App for Containers
       *
       * Deploy containers to Azure App Service
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Web App for Containers inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * App name
         */
        appName: string;
        /**
         * Deploy to Slot or App Service Environment
         */
        deployToSlotOrASE?: boolean;
        /**
         * Resource group
         */
        resourceGroupName?: string;
        /**
         * Slot
         */
        slotName?: string;
        /**
         * Image name
         */
        containers?: string;
        /**
         * Configuration File
         */
        multicontainerConfigFile?: string;
        /**
         * Startup command
         */
        containerCommand?: string;
        /**
         * App settings
         */
        appSettings?: string;
        /**
         * Configuration settings
         */
        configurationStrings?: string;
      };
    }
  | {
      /**
       * SQL Server database deploy
       *
       * Deploy a SQL Server database using DACPAC or SQL scripts
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * SQL Server database deploy inputs
       */
      inputs?: {
        /**
         * Deploy SQL Using
         */
        TaskType?: 'dacpac' | 'sqlQuery' | 'sqlInline';
        /**
         * DACPAC File
         */
        DacpacFile?: string;
        /**
         * Sql File
         */
        SqlFile?: string;
        /**
         * Execute within a transaction
         */
        ExecuteInTransaction?: boolean;
        /**
         * Acquire an exclusive app lock while executing script(s)
         */
        ExclusiveLock?: boolean;
        /**
         * App lock name
         */
        AppLockName?: string;
        /**
         * Inline Sql
         */
        InlineSql?: string;
        /**
         * Specify SQL Using
         */
        TargetMethod?: 'server' | 'connectionString' | 'publishProfile';
        /**
         * Server Name
         */
        ServerName?: string;
        /**
         * Database Name
         */
        DatabaseName?: string;
        /**
         * Authentication
         */
        AuthScheme?: 'windowsAuthentication' | 'sqlServerAuthentication';
        /**
         * SQL User name
         */
        SqlUsername?: string;
        /**
         * SQL Password
         */
        SqlPassword?: string;
        /**
         * Connection String
         */
        ConnectionString?: string;
        /**
         * Publish Profile
         */
        PublishProfile?: string;
        /**
         * Additional Arguments
         */
        AdditionalArguments?: string;
        /**
         * Additional Arguments
         */
        AdditionalArgumentsSql?: string;
      };
    }
  | {
      /**
       * Cache (Beta)
       *
       * Cache files between runs
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Cache (Beta) inputs
       */
      inputs: {
        /**
         * Key
         */
        key: string;
        /**
         * Path
         */
        path: string;
        /**
         * Cache hit variable
         */
        cacheHitVar?: string;
        /**
         * Additional restore key prefixes
         */
        restoreKeys?: string;
      };
    }
  | {
      /**
       * Cache (Beta)
       *
       * Cache files between runs
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Cache (Beta) inputs
       */
      inputs: {
        /**
         * Key
         */
        key: string;
        /**
         * Path
         */
        path: string;
        /**
         * Cache hit variable
         */
        cacheHitVar?: string;
      };
    }
  | {
      /**
       * Cache
       *
       * Cache files between runs
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Cache inputs
       */
      inputs: {
        /**
         * Key
         */
        key: string;
        /**
         * Path
         */
        path: string;
        /**
         * Cache hit variable
         */
        cacheHitVar?: string;
        /**
         * Additional restore key prefixes
         */
        restoreKeys?: string;
      };
    }
  | {
      /**
       * CMake
       *
       * Build with the CMake cross-platform build system
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * CMake inputs
       */
      inputs?: {
        /**
         * Working Directory
         */
        workingDirectory?: string;
        /**
         * Arguments
         */
        cmakeArgs?: string;
        /**
         * Run cmake command inside shell
         */
        runInsideShell?: boolean;
      };
    }
  | {
      /**
       * Mobile Center Test
       *
       * Test mobile app packages with Visual Studio Mobile Center.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Mobile Center Test inputs
       */
      inputs: {
        /**
         * Binary Application File Path
         */
        app: string;
        /**
         * Artifacts Directory
         */
        artifactsDir?: string;
        /**
         * Prepare Tests
         */
        enablePrepare?: boolean;
        /**
         * Test Framework
         */
        framework?: 'appium' | 'espresso' | 'calabash' | 'uitest' | 'xcuitest';
        /**
         * Build Directory
         */
        appiumBuildDir?: string;
        /**
         * Build Directory
         */
        espressoBuildDir?: string;
        /**
         * Test APK Path
         */
        espressoTestApkPath?: string;
        /**
         * Project Directory
         */
        calabashProjectDir?: string;
        /**
         * Cucumber Config File
         */
        calabashConfigFile?: string;
        /**
         * Profile to run
         */
        calabashProfile?: string;
        /**
         * Skip Configuration Check
         */
        calabashSkipConfigCheck?: boolean;
        /**
         * Build Directory
         */
        uitestBuildDir?: string;
        /**
         * Store File
         */
        uitestStoreFile?: string;
        /**
         * Store Password
         */
        uitestStorePass?: string;
        /**
         * Key Alias
         */
        uitestKeyAlias?: string;
        /**
         * Key Password
         */
        uitestKeyPass?: string;
        /**
         * Test Tools Directory
         */
        uitestToolsDir?: string;
        /**
         * Signing Information
         */
        signInfo?: string;
        /**
         * Build Directory
         */
        xcuitestBuildDir?: string;
        /**
         * Test IPA Path
         */
        xcuitestTestIpaPath?: string;
        /**
         * Additional Options
         */
        prepareOpts?: string;
        /**
         * Run Tests
         */
        enableRun?: boolean;
        /**
         * Authentication Method
         */
        credsType?: 'serviceEndpoint' | 'inputs';
        /**
         * Mobile Center Connection
         */
        serverEndpoint?: string;
        /**
         * Mobile Center Username
         */
        username?: string;
        /**
         * Mobile Center Password
         */
        password?: string;
        /**
         * App Slug
         */
        appSlug?: string;
        /**
         * Devices
         */
        devices?: string;
        /**
         * Test Series
         */
        series?: string;
        /**
         * dSYM Directory
         */
        dsymDir?: string;
        /**
         * System Language
         */
        locale?:
          | 'da_DK'
          | 'nl_NL'
          | 'en_GB'
          | 'en_US'
          | 'fr_FR'
          | 'de_DE'
          | 'ja_JP'
          | 'ru_RU'
          | 'es_MX'
          | 'es_ES'
          | 'user';
        /**
         * Other Locale
         */
        userDefinedLocale?: string;
        /**
         * Addtional Options for Login
         */
        loginOpts?: string;
        /**
         * Additional Options for Run
         */
        runOpts?: string;
        /**
         * Do not wait for test result
         */
        async?: boolean;
        /**
         * mobile-center CLI Location
         */
        cliLocationOverride?: string;
        /**
         * Enable Debug Output
         */
        debug?: boolean;
      };
    }
  | {
      /**
       * App Center test
       *
       * Test app packages with Visual Studio App Center
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * App Center test inputs
       */
      inputs: {
        /**
         * Binary application file path
         */
        appFile: string;
        /**
         * Artifacts directory
         */
        artifactsDirectory?: string;
        /**
         * Prepare tests
         */
        prepareTests?: boolean;
        /**
         * Test framework
         */
        frameworkOption?: 'appium' | 'espresso' | 'calabash' | 'uitest' | 'xcuitest';
        /**
         * Build directory
         */
        appiumBuildDirectory?: string;
        /**
         * Build directory
         */
        espressoBuildDirectory?: string;
        /**
         * Test APK path
         */
        espressoTestApkFile?: string;
        /**
         * Project directory
         */
        calabashProjectDirectory?: string;
        /**
         * Cucumber config file
         */
        calabashConfigFile?: string;
        /**
         * Profile to run
         */
        calabashProfile?: string;
        /**
         * Skip Configuration Check
         */
        calabashSkipConfigCheck?: boolean;
        /**
         * Build directory
         */
        uiTestBuildDirectory?: string;
        /**
         * Store file
         */
        uitestStorePath?: string;
        /**
         * Store password
         */
        uiTestStorePassword?: string;
        /**
         * Key alias
         */
        uitestKeyAlias?: string;
        /**
         * Key password
         */
        uiTestKeyPassword?: string;
        /**
         * Test tools directory
         */
        uiTestToolsDirectory?: string;
        /**
         * Signing information
         */
        signInfo?: string;
        /**
         * Build directory
         */
        xcUITestBuildDirectory?: string;
        /**
         * Test IPA path
         */
        xcUITestIpaFile?: string;
        /**
         * Additional options
         */
        prepareOptions?: string;
        /**
         * Run tests
         */
        runTests?: boolean;
        /**
         * Authentication method
         */
        credentialsOption?: 'serviceEndpoint' | 'inputs';
        /**
         * App Center service connection
         */
        serverEndpoint?: string;
        /**
         * App Center username
         */
        username?: string;
        /**
         * App Center password
         */
        password?: string;
        /**
         * App slug
         */
        appSlug?: string;
        /**
         * Devices
         */
        devices?: string;
        /**
         * Test series
         */
        series?: string;
        /**
         * dSYM directory
         */
        dsymDirectory?: string;
        /**
         * System language
         */
        localeOption?:
          | 'da_DK'
          | 'nl_NL'
          | 'en_GB'
          | 'en_US'
          | 'fr_FR'
          | 'de_DE'
          | 'ja_JP'
          | 'ru_RU'
          | 'es_MX'
          | 'es_ES'
          | 'user';
        /**
         * Other locale
         */
        userDefinedLocale?: string;
        /**
         * Additional options for login
         */
        loginOptions?: string;
        /**
         * Additional options for run
         */
        runOptions?: string;
        /**
         * Do not wait for test result
         */
        skipWaitingForResults?: boolean;
        /**
         * App Center CLI location
         */
        cliFile?: string;
        /**
         * Enable debug output
         */
        showDebugOutput?: boolean;
      };
    }
  | {
      /**
       * Download secure file
       *
       * Download a secure file to the agent machine
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Download secure file inputs
       */
      inputs: {
        /**
         * Secure File
         */
        secureFile: string;
        /**
         * Retry Count
         */
        retryCount?: string;
        /**
         * Socket Timeout
         */
        socketTimeout?: string;
      };
    }
  | {
      /**
       * Azure Container Apps Deploy
       *
       * An Azure DevOps Task to build and deploy Azure Container Apps.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Container Apps Deploy inputs
       */
      inputs: {
        /**
         * Working Directory
         */
        workingDirectory?: string;
        /**
         * Application source path
         */
        appSourcePath?: string;
        /**
         * Azure Resource Manager connection
         */
        azureSubscription: string;
        /**
         * Azure Container Registry name
         */
        acrName?: string;
        /**
         * Azure Container Registry username
         */
        acrUsername?: string;
        /**
         * Azure Container Registry password
         */
        acrPassword?: string;
        /**
         * Dockerfile path
         */
        dockerfilePath?: string;
        /**
         * Docker image to build
         */
        imageToBuild?: string;
        /**
         * Docker image to deploy
         */
        imageToDeploy?: string;
        /**
         * Azure Container App name
         */
        containerAppName?: string;
        /**
         * Azure resource group name
         */
        resourceGroup?: string;
        /**
         * Azure Container App environment
         */
        containerAppEnvironment?: string;
        /**
         * Application runtime stack
         */
        runtimeStack?: string;
        /**
         * Application target port
         */
        targetPort?: string;
        /**
         * Location of the Container App
         */
        location?: string;
        /**
         * Environment variables
         */
        environmentVariables?: string;
        /**
         * Ingress setting
         */
        ingress?: string;
        /**
         * YAML configuration file path
         */
        yamlConfigPath?: string;
        /**
         * Disable telemetry
         */
        disableTelemetry?: boolean;
      };
    }
  | {
      /**
       * Use Ruby version
       *
       * Use the specified version of Ruby from the tool cache, optionally adding it to the PATH
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Use Ruby version inputs
       */
      inputs?: {
        /**
         * Version spec
         */
        versionSpec?: string;
        /**
         * Add to PATH
         */
        addToPath?: boolean;
      };
    }
  | {
      /**
       * Grunt
       *
       * Run the Grunt JavaScript task runner
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Grunt inputs
       */
      inputs?: {
        /**
         * Grunt File Path
         */
        gruntFile?: string;
        /**
         * Grunt Task(s)
         */
        targets?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Working Directory
         */
        workingDirectory?: string;
        /**
         * grunt-cli location
         */
        gruntCli?: string;
        /**
         * Publish to Azure Pipelines
         */
        publishJUnitResults?: boolean;
        /**
         * Test Results Files
         */
        testResultsFiles?: string;
        /**
         * Test Run Title
         */
        testRunTitle?: string;
        /**
         * Enable Code Coverage
         */
        enableCodeCoverage?: boolean;
        /**
         * Test Framework
         */
        testFramework?: 'Mocha' | 'Jasmine';
        /**
         * Source Files
         */
        srcFiles?: string;
        /**
         * Test Script Files
         */
        testFiles?: string;
      };
    }
  | {
      /**
       * Azure SQL Database deployment
       *
       * Deploy an Azure SQL Database using DACPAC or run scripts using SQLCMD
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure SQL Database deployment inputs
       */
      inputs?: {
        /**
         * Azure Service Connection Type
         */
        azureConnectionType?: 'ConnectedServiceName' | 'ConnectedServiceNameARM';
        /**
         * Azure Classic Subscription
         */
        azureClassicSubscription?: string;
        /**
         * Azure Subscription
         */
        azureSubscription?: string;
        /**
         * Authentication Type
         */
        AuthenticationType?:
          | 'server'
          | 'aadAuthenticationPassword'
          | 'aadAuthenticationIntegrated'
          | 'connectionString'
          | 'servicePrincipal';
        /**
         * Azure SQL Server
         */
        ServerName?: string;
        /**
         * Database
         */
        DatabaseName?: string;
        /**
         * Login
         */
        SqlUsername?: string;
        /**
         * Password
         */
        SqlPassword?: string;
        /**
         * Login
         */
        aadSqlUsername?: string;
        /**
         * Password
         */
        aadSqlPassword?: string;
        /**
         * Connection String
         */
        ConnectionString?: string;
        /**
         * Deploy type
         */
        deployType?: 'DacpacTask' | 'SqlTask' | 'InlineSqlTask';
        /**
         * Action
         */
        DeploymentAction?: 'Publish' | 'Extract' | 'Export' | 'Import' | 'Script' | 'DriftReport' | 'DeployReport';
        /**
         * DACPAC File
         */
        DacpacFile?: string;
        /**
         * BACPAC File
         */
        BacpacFile?: string;
        /**
         * SQL Script
         */
        SqlFile?: string;
        /**
         * Inline SQL Script
         */
        SqlInline?: string;
        /**
         * Publish Profile
         */
        PublishProfile?: string;
        /**
         * Additional SqlPackage.exe Arguments
         */
        AdditionalArguments?: string;
        /**
         * Additional Invoke-Sqlcmd Arguments
         */
        SqlAdditionalArguments?: string;
        /**
         * Additional Invoke-Sqlcmd Arguments
         */
        InlineAdditionalArguments?: string;
        /**
         * Specify Firewall Rules Using
         */
        IpDetectionMethod?: 'AutoDetect' | 'IPAddressRange';
        /**
         * Start IP Address
         */
        StartIpAddress?: string;
        /**
         * End IP Address
         */
        EndIpAddress?: string;
        /**
         * Delete Rule After Task Ends
         */
        DeleteFirewallRule?: boolean;
      };
    }
  | {
      /**
       * Container Structure Test
       *
       * Uses container-structure-test (https://github.com/GoogleContainerTools/container-structure-test) to validate the structure of an image based on four categories of tests - command tests, file existence tests, file content tests and metadata tests
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Container Structure Test inputs
       */
      inputs: {
        /**
         * Docker registry service connection
         */
        dockerRegistryServiceConnection: string;
        /**
         * Container repository
         */
        repository: string;
        /**
         * Tag
         */
        tag?: string;
        /**
         * Config file path
         */
        configFile: string;
        /**
         * Test run title
         */
        testRunTitle?: string;
        /**
         * Fail task if there are test failures
         */
        failTaskOnFailedTests?: boolean;
      };
    }
  | {
      /**
       * [Deprecated] IIS Web App deployment
       *
       * Deploy using MSDeploy, then create/update websites and app pools
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * [Deprecated] IIS Web App deployment inputs
       */
      inputs: {
        /**
         * Machines
         */
        EnvironmentName: string;
        /**
         * Admin Login
         */
        AdminUserName?: string;
        /**
         * Password
         */
        AdminPassword?: string;
        /**
         * Protocol
         */
        WinRMProtocol?: 'Http' | 'Https';
        /**
         * Test Certificate
         */
        TestCertificate?: boolean;
        /**
         * Web Deploy Package
         */
        WebDeployPackage: string;
        /**
         * Web Deploy Parameter File
         */
        WebDeployParamFile?: string;
        /**
         * Override Parameters
         */
        OverRideParams?: string;
        /**
         * Create or Update Website
         */
        CreateWebSite?: boolean;
        /**
         * Website Name
         */
        WebSiteName?: string;
        /**
         * Physical Path
         */
        WebSitePhysicalPath?: string;
        /**
         * Physical Path Authentication
         */
        WebSitePhysicalPathAuth?: 'WebSiteUserPassThrough' | 'WebSiteWindowsAuth';
        /**
         * User Name
         */
        WebSiteAuthUserName?: string;
        /**
         * Password
         */
        WebSiteAuthUserPassword?: string;
        /**
         * Add Binding
         */
        AddBinding?: boolean;
        /**
         * Assign Duplicate Binding
         */
        AssignDuplicateBinding?: boolean;
        /**
         * Protocol
         */
        Protocol?: 'https' | 'http';
        /**
         * IP Address
         */
        IPAddress?: string;
        /**
         * Port
         */
        Port?: string;
        /**
         * Server Name Indication Required
         */
        ServerNameIndication?: boolean;
        /**
         * Host Name
         */
        HostNameWithOutSNI?: string;
        /**
         * Host Name
         */
        HostNameWithHttp?: string;
        /**
         * Host Name
         */
        HostNameWithSNI?: string;
        /**
         * SSL Certificate Thumb Print
         */
        SSLCertThumbPrint?: string;
        /**
         * Create or Update Application Pool
         */
        CreateAppPool?: boolean;
        /**
         * Name
         */
        AppPoolName?: string;
        /**
         * .NET Version
         */
        DotNetVersion?: 'v4.0' | 'v2.0' | 'No Managed Code';
        /**
         * Managed Pipeline Mode
         */
        PipeLineMode?: 'Integrated' | 'Classic';
        /**
         * Identity
         */
        AppPoolIdentity?:
          | 'ApplicationPoolIdentity'
          | 'LocalService'
          | 'LocalSystem'
          | 'NetworkService'
          | 'SpecificUser';
        /**
         * Username
         */
        AppPoolUsername?: string;
        /**
         * Password
         */
        AppPoolPassword?: string;
        /**
         * Additional AppCmd.exe Commands
         */
        AppCmdCommands?: string;
        /**
         * Deploy in Parallel
         */
        DeployInParallel?: boolean;
        /**
         * Select Machines By
         */
        ResourceFilteringMethod?: 'machineNames' | 'tags';
        /**
         * Deploy to Machines
         */
        MachineFilter?: string;
      };
    }
  | {
      /**
       * Kubectl tool installer
       *
       * Install Kubectl on agent machine
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Kubectl tool installer inputs
       */
      inputs?: {
        /**
         * Kubectl Version Spec
         */
        kubectlVersion?: string;
      };
    }
  | {
      /**
       * Command line
       *
       * Run a command line script using Bash on Linux and macOS and cmd.exe on Windows
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Command line inputs
       */
      inputs?: {
        /**
         * Script
         */
        script?: string;
        /**
         * Working Directory
         */
        workingDirectory?: string;
        /**
         * Fail on Standard Error
         */
        failOnStderr?: boolean;
      };
    }
  | {
      /**
       * Command Line
       *
       * Run a command line with arguments
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Command Line inputs
       */
      inputs: {
        /**
         * Tool
         */
        filename: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Working folder
         */
        workingFolder?: string;
        /**
         * Fail on Standard Error
         */
        failOnStandardError?: boolean;
      };
    }
  | {
      /**
       * NuGet command
       *
       * Deprecated: use the “NuGet” task instead. It works with the new Tool Installer framework so you can easily use new versions of NuGet without waiting for a task update, provides better support for authenticated feeds outside this organization/collection, and uses NuGet 4 by default.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * NuGet command inputs
       */
      inputs: {
        /**
         * Command
         */
        command: string;
        /**
         * Arguments
         */
        arguments?: string;
      };
    }
  | {
      /**
       * Container Build
       *
       * Container Build Task
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Container Build inputs
       */
      inputs?: {
        /**
         * Docker registry service connection
         */
        dockerRegistryServiceConnection?: string;
        /**
         * Container repository
         */
        repository?: string;
        /**
         * Dockerfile
         */
        Dockerfile?: string;
        /**
         * Build context
         */
        buildContext?: string;
        /**
         * Tags
         */
        tags?: string;
      };
    }
  | {
      /**
       * NuGet Installer
       *
       * Installs or restores missing NuGet packages. Use NuGetAuthenticate@0 task for latest capabilities.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * NuGet Installer inputs
       */
      inputs?: {
        /**
         * Path to solution or packages.config
         */
        solution?: string;
        /**
         * Path to NuGet.config
         */
        nugetConfigPath?: string;
        /**
         * Installation type
         */
        restoreMode?: 'restore' | 'install';
        /**
         * Disable local cache
         */
        noCache?: boolean;
        /**
         * NuGet arguments
         */
        nuGetRestoreArgs?: string;
        /**
         * Verbosity
         */
        verbosity?: '-' | 'Quiet' | 'Normal' | 'Detailed';
        /**
         * NuGet Version
         */
        nuGetVersion?: '3.3.0' | '3.5.0.1829' | '4.0.0.2283' | 'custom';
        /**
         * Path to NuGet.exe
         */
        nuGetPath?: string;
      };
    }
  | {
      /**
       * NuGet Restore
       *
       * Restores NuGet packages in preparation for a Visual Studio Build step.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * NuGet Restore inputs
       */
      inputs?: {
        /**
         * Path to solution, packages.config, or project.json
         */
        solution?: string;
        /**
         * Feeds to use
         */
        selectOrConfig?: 'select' | 'config';
        /**
         * Use packages from this Azure Artifacts feed
         */
        feed?: string;
        /**
         * Use packages from NuGet.org
         */
        includeNuGetOrg?: boolean;
        /**
         * Path to NuGet.config
         */
        nugetConfigPath?: string;
        /**
         * Disable local cache
         */
        noCache?: boolean;
        /**
         * Destination directory
         */
        packagesDirectory?: string;
        /**
         * Verbosity
         */
        verbosity?: '-' | 'Quiet' | 'Normal' | 'Detailed';
      };
    }
  | {
      /**
       * NuGet
       *
       * Restore, pack, or push NuGet packages, or run a NuGet command. Supports NuGet.org and authenticated feeds like Azure Artifacts and MyGet. Uses NuGet.exe and works with .NET Framework apps. For .NET Core and .NET Standard apps, use the .NET Core task.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * NuGet inputs
       */
      inputs?: {
        /**
         * Command
         */
        command?: 'restore' | 'pack' | 'push' | 'custom';
        /**
         * Path to solution, packages.config, or project.json
         */
        restoreSolution?: string;
        /**
         * Feeds to use
         */
        feedsToUse?: 'select' | 'config';
        /**
         * Use packages from this Azure Artifacts/TFS feed. Select from the dropdown or enter [project name/]feed name.
         */
        vstsFeed?: string;
        /**
         * Use packages from NuGet.org
         */
        includeNuGetOrg?: boolean;
        /**
         * Path to NuGet.config
         */
        nugetConfigPath?: string;
        /**
         * Credentials for feeds outside this organization/collection
         */
        externalFeedCredentials?: string;
        /**
         * Disable local cache
         */
        noCache?: boolean;
        /**
         * Disable parallel processing
         */
        disableParallelProcessing?: boolean;
        /**
         * Destination directory
         */
        restoreDirectory?: string;
        /**
         * Verbosity
         */
        verbosityRestore?: 'Quiet' | 'Normal' | 'Detailed';
        /**
         * Path to NuGet package(s) to publish
         */
        packagesToPush?: string;
        /**
         * Target feed location
         */
        nuGetFeedType?: 'internal' | 'external';
        /**
         * Target feed
         */
        publishVstsFeed?: string;
        /**
         * Publish pipeline metadata
         */
        publishPackageMetadata?: boolean;
        /**
         * Allow duplicates to be skipped
         */
        allowPackageConflicts?: boolean;
        /**
         * NuGet server
         */
        publishFeedCredentials?: string;
        /**
         * Verbosity
         */
        verbosityPush?: 'Quiet' | 'Normal' | 'Detailed';
        /**
         * Path to csproj or nuspec file(s) to pack
         */
        packagesToPack?: string;
        /**
         * Configuration to package
         */
        configuration?: string;
        /**
         * Package folder
         */
        packDestination?: string;
        /**
         * Automatic package versioning
         */
        versioningScheme?: 'off' | 'byPrereleaseNumber' | 'byEnvVar' | 'byBuildNumber';
        /**
         * Include referenced projects
         */
        includeReferencedProjects?: boolean;
        /**
         * Environment variable
         */
        versionEnvVar?: string;
        /**
         * Major
         */
        majorVersion?: string;
        /**
         * Minor
         */
        minorVersion?: string;
        /**
         * Patch
         */
        patchVersion?: string;
        /**
         * Time zone
         */
        packTimezone?: 'utc' | 'local';
        /**
         * Create symbols package
         */
        includeSymbols?: boolean;
        /**
         * Tool Package
         */
        toolPackage?: boolean;
        /**
         * Additional build properties
         */
        buildProperties?: string;
        /**
         * Base path
         */
        basePath?: string;
        /**
         * Verbosity
         */
        verbosityPack?: 'Quiet' | 'Normal' | 'Detailed';
        /**
         * Command and arguments
         */
        arguments?: string;
      };
    }
  | {
      /**
       * Delay
       *
       * Delay further execution of a workflow by a fixed time
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Delay inputs
       */
      inputs?: {
        /**
         * Delay Time (minutes)
         */
        delayForMinutes?: string;
      };
    }
  | {
      /**
       * Xamarin.iOS
       *
       * Build an iOS app with Xamarin on macOS
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Xamarin.iOS inputs
       */
      inputs?: {
        /**
         * Solution
         */
        solutionFile?: string;
        /**
         * Configuration
         */
        configuration?: string;
        /**
         * Clean
         */
        clean?: boolean;
        /**
         * Create app package
         */
        packageApp?: boolean;
        /**
         * Build for iOS Simulator
         */
        buildForSimulator?: boolean;
        /**
         * Run NuGet restore
         */
        runNugetRestore?: boolean;
        /**
         * Arguments
         */
        args?: string;
        /**
         * Working directory
         */
        workingDirectory?: string;
        /**
         * Build tool
         */
        buildToolOption?: 'xbuild' | 'msbuild';
        /**
         * Build tool path
         */
        mdtoolFile?: string;
        /**
         * Override using
         */
        signingOption?: 'file' | 'id';
        /**
         * Signing identity
         */
        signingIdentity?: string;
        /**
         * Unlock default keychain
         */
        signingUnlockDefaultKeychain?: boolean;
        /**
         * Default keychain password
         */
        signingDefaultKeychainPassword?: string;
        /**
         * Provisioning profile UUID
         */
        signingProvisioningProfileID?: string;
        /**
         * P12 certificate file
         */
        signingP12File?: string;
        /**
         * P12 password
         */
        signingP12Password?: string;
        /**
         * Provisioning profile file
         */
        signingProvisioningProfileFile?: string;
        /**
         * Remove profile after build
         */
        signingRemoveProfile?: boolean;
      };
    }
  | {
      /**
       * Xamarin.iOS
       *
       * Build an iOS app with Xamarin on macOS
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Xamarin.iOS inputs
       */
      inputs?: {
        /**
         * Solution
         */
        solutionFile?: string;
        /**
         * Configuration
         */
        configuration?: string;
        /**
         * Clean
         */
        clean?: boolean;
        /**
         * Create app package
         */
        packageApp?: boolean;
        /**
         * Build for iOS Simulator
         */
        buildForSimulator?: boolean;
        /**
         * Run NuGet restore
         */
        runNugetRestore?: boolean;
        /**
         * Arguments
         */
        args?: string;
        /**
         * Working directory
         */
        workingDirectory?: string;
        /**
         * Build tool path
         */
        mdtoolFile?: string;
        /**
         * Signing identity
         */
        signingIdentity?: string;
        /**
         * Provisioning profile UUID
         */
        signingProvisioningProfileID?: string;
      };
    }
  | {
      /**
       * Publish test results
       *
       * Publish test results to Azure Pipelines
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Publish test results inputs
       */
      inputs?: {
        /**
         * Test Result Format
         */
        testRunner?: 'JUnit' | 'NUnit' | 'VSTest' | 'XUnit';
        /**
         * Test Results Files
         */
        testResultsFiles?: string;
        /**
         * Merge Test Results
         */
        mergeTestResults?: boolean;
        /**
         * Test Run Title
         */
        testRunTitle?: string;
        /**
         * Platform
         */
        platform?: string;
        /**
         * Configuration
         */
        configuration?: string;
        /**
         * Upload Test Attachments
         */
        publishRunAttachments?: boolean;
      };
    }
  | {
      /**
       * Publish Test Results
       *
       * Publish test results to Azure Pipelines
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Publish Test Results inputs
       */
      inputs?: {
        /**
         * Test result format
         */
        testResultsFormat?: 'JUnit' | 'NUnit' | 'VSTest' | 'XUnit' | 'CTest';
        /**
         * Test results files
         */
        testResultsFiles?: string;
        /**
         * Search folder
         */
        searchFolder?: string;
        /**
         * Merge test results
         */
        mergeTestResults?: boolean;
        /**
         * Fail if there are test failures
         */
        failTaskOnFailedTests?: boolean;
        /**
         * Fail if there is failure in publishing test results
         */
        failTaskOnFailureToPublishResults?: boolean;
        /**
         * Fail if no result files are found
         */
        failTaskOnMissingResultsFile?: boolean;
        /**
         * Test run title
         */
        testRunTitle?: string;
        /**
         * Build Platform
         */
        buildPlatform?: string;
        /**
         * Build Configuration
         */
        buildConfiguration?: string;
        /**
         * Upload test results files
         */
        publishRunAttachments?: boolean;
      };
    }
  | {
      /**
       * Azure file copy
       *
       * Copy files to Azure Blob Storage or virtual machines
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure file copy inputs
       */
      inputs: {
        /**
         * Source
         */
        SourcePath: string;
        /**
         * Azure Subscription
         */
        azureSubscription: string;
        /**
         * Destination Type
         */
        Destination: 'AzureBlob' | 'AzureVMs';
        /**
         * RM Storage Account
         */
        storage: string;
        /**
         * Container Name
         */
        ContainerName?: string;
        /**
         * Blob Prefix
         */
        BlobPrefix?: string;
        /**
         * Resource Group
         */
        resourceGroup?: string;
        /**
         * Select Machines By
         */
        ResourceFilteringMethod?: 'machineNames' | 'tags';
        /**
         * Filter Criteria
         */
        MachineNames?: string;
        /**
         * Admin Login
         */
        vmsAdminUserName?: string;
        /**
         * Password
         */
        vmsAdminPassword?: string;
        /**
         * Destination Folder
         */
        TargetPath?: string;
        /**
         * Optional Arguments (for uploading files to blob)
         */
        AdditionalArgumentsForBlobCopy?: string;
        /**
         * Optional Arguments (for downloading files to VM)
         */
        AdditionalArgumentsForVMCopy?: string;
        /**
         * Enable Copy Prerequisites
         */
        enableCopyPrerequisites?: boolean;
        /**
         * Copy in Parallel
         */
        CopyFilesInParallel?: boolean;
        /**
         * Clean Target
         */
        CleanTargetBeforeCopy?: boolean;
        /**
         * Test Certificate
         */
        skipCACheck?: boolean;
      };
    }
  | {
      /**
       * Azure file copy
       *
       * Copy files to Azure Blob Storage or virtual machines
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure file copy inputs
       */
      inputs: {
        /**
         * Source
         */
        SourcePath: string;
        /**
         * Azure Subscription
         */
        azureSubscription: string;
        /**
         * Destination Type
         */
        Destination: 'AzureBlob' | 'AzureVMs';
        /**
         * RM Storage Account
         */
        storage: string;
        /**
         * Container Name
         */
        ContainerName?: string;
        /**
         * Blob Prefix
         */
        BlobPrefix?: string;
        /**
         * Resource Group
         */
        resourceGroup?: string;
        /**
         * Select Machines By
         */
        ResourceFilteringMethod?: 'machineNames' | 'tags';
        /**
         * Filter Criteria
         */
        MachineNames?: string;
        /**
         * Admin Login
         */
        vmsAdminUserName?: string;
        /**
         * Password
         */
        vmsAdminPassword?: string;
        /**
         * Destination Folder
         */
        TargetPath?: string;
        /**
         * Optional Arguments (for uploading files to blob)
         */
        AdditionalArgumentsForBlobCopy?: string;
        /**
         * Optional Arguments (for downloading files to VM)
         */
        AdditionalArgumentsForVMCopy?: string;
        /**
         * SAS Token Expiration Period In Minutes
         */
        sasTokenTimeOutInMinutes?: string;
        /**
         * Enable Copy Prerequisites
         */
        enableCopyPrerequisites?: boolean;
        /**
         * Copy in Parallel
         */
        CopyFilesInParallel?: boolean;
        /**
         * Clean Target
         */
        CleanTargetBeforeCopy?: boolean;
        /**
         * Test Certificate
         */
        skipCACheck?: boolean;
      };
    }
  | {
      /**
       * Azure file copy
       *
       * Copy files to Azure Blob Storage or virtual machines
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure file copy inputs
       */
      inputs: {
        /**
         * Source
         */
        SourcePath: string;
        /**
         * Azure Connection Type
         */
        azureConnectionType?: 'ConnectedServiceName' | 'ConnectedServiceNameARM';
        /**
         * Azure Classic Subscription
         */
        azureClassicSubscription?: string;
        /**
         * Azure Subscription
         */
        azureSubscription?: string;
        /**
         * Destination Type
         */
        Destination: 'AzureBlob' | 'AzureVMs';
        /**
         * Classic Storage Account
         */
        classicStorage?: string;
        /**
         * RM Storage Account
         */
        storage?: string;
        /**
         * Container Name
         */
        ContainerName?: string;
        /**
         * Blob Prefix
         */
        BlobPrefix?: string;
        /**
         * Cloud Service
         */
        cloudService?: string;
        /**
         * Resource Group
         */
        resourceGroup?: string;
        /**
         * Select Machines By
         */
        ResourceFilteringMethod?: 'machineNames' | 'tags';
        /**
         * Filter Criteria
         */
        MachineNames?: string;
        /**
         * Admin Login
         */
        vmsAdminUserName?: string;
        /**
         * Password
         */
        vmsAdminPassword?: string;
        /**
         * Destination Folder
         */
        TargetPath?: string;
        /**
         * Optional Arguments (for uploading files to blob)
         */
        AdditionalArgumentsForBlobCopy?: string;
        /**
         * Optional Arguments (for downloading files to VM)
         */
        AdditionalArgumentsForVMCopy?: string;
        /**
         * Enable Copy Prerequisites
         */
        enableCopyPrerequisites?: boolean;
        /**
         * Copy in Parallel
         */
        CopyFilesInParallel?: boolean;
        /**
         * Clean Target
         */
        CleanTargetBeforeCopy?: boolean;
        /**
         * Test Certificate
         */
        skipCACheck?: boolean;
        /**
         * Storage Container URI
         */
        outputStorageUri?: string;
        /**
         * Storage Container SAS Token
         */
        outputStorageContainerSasToken?: string;
      };
    }
  | {
      /**
       * Azure file copy
       *
       * Copy files to Azure Blob Storage or virtual machines
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure file copy inputs
       */
      inputs: {
        /**
         * Source
         */
        SourcePath: string;
        /**
         * Azure Subscription
         */
        azureSubscription: string;
        /**
         * Destination Type
         */
        Destination: 'AzureBlob' | 'AzureVMs';
        /**
         * RM Storage Account
         */
        storage: string;
        /**
         * Container Name
         */
        ContainerName?: string;
        /**
         * Blob Prefix
         */
        BlobPrefix?: string;
        /**
         * Resource Group
         */
        resourceGroup?: string;
        /**
         * Select Machines By
         */
        ResourceFilteringMethod?: 'machineNames' | 'tags';
        /**
         * Filter Criteria
         */
        MachineNames?: string;
        /**
         * Admin Login
         */
        vmsAdminUserName?: string;
        /**
         * Password
         */
        vmsAdminPassword?: string;
        /**
         * Destination Folder
         */
        TargetPath?: string;
        /**
         * Optional Arguments (for uploading files to blob)
         */
        AdditionalArgumentsForBlobCopy?: string;
        /**
         * Optional Arguments (for downloading files to VM)
         */
        AdditionalArgumentsForVMCopy?: string;
        /**
         * Enable Copy Prerequisites
         */
        enableCopyPrerequisites?: boolean;
        /**
         * Copy in Parallel
         */
        CopyFilesInParallel?: boolean;
        /**
         * Clean Target
         */
        CleanTargetBeforeCopy?: boolean;
        /**
         * Test Certificate
         */
        skipCACheck?: boolean;
        /**
         * Storage Container URI
         */
        outputStorageUri?: string;
        /**
         * Storage Container SAS Token
         */
        outputStorageContainerSasToken?: string;
        /**
         * SAS Token Expiration Period In Minutes
         */
        sasTokenTimeOutInMinutes?: string;
      };
    }
  | {
      /**
       * Azure file copy
       *
       * Copy files to Azure Blob Storage or virtual machines
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure file copy inputs
       */
      inputs: {
        /**
         * Source
         */
        SourcePath: string;
        /**
         * Azure Connection Type
         */
        azureConnectionType?: 'ConnectedServiceName' | 'ConnectedServiceNameARM';
        /**
         * Azure Classic Subscription
         */
        azureClassicSubscription?: string;
        /**
         * Azure Subscription
         */
        azureSubscription?: string;
        /**
         * Destination Type
         */
        Destination: 'AzureBlob' | 'AzureVMs';
        /**
         * Classic Storage Account
         */
        classicStorage?: string;
        /**
         * RM Storage Account
         */
        storage?: string;
        /**
         * Container Name
         */
        ContainerName?: string;
        /**
         * Blob Prefix
         */
        BlobPrefix?: string;
        /**
         * Cloud Service
         */
        cloudService?: string;
        /**
         * Resource Group
         */
        resourceGroup?: string;
        /**
         * Select Machines By
         */
        ResourceFilteringMethod?: 'machineNames' | 'tags';
        /**
         * Filter Criteria
         */
        MachineNames?: string;
        /**
         * Admin Login
         */
        vmsAdminUserName?: string;
        /**
         * Password
         */
        vmsAdminPassword?: string;
        /**
         * Destination Folder
         */
        TargetPath?: string;
        /**
         * Additional Arguments
         */
        AdditionalArguments?: string;
        /**
         * Enable Copy Prerequisites
         */
        enableCopyPrerequisites?: boolean;
        /**
         * Copy in Parallel
         */
        CopyFilesInParallel?: boolean;
        /**
         * Clean Target
         */
        CleanTargetBeforeCopy?: boolean;
        /**
         * Test Certificate
         */
        skipCACheck?: boolean;
        /**
         * Storage Container URI
         */
        outputStorageUri?: string;
        /**
         * Storage Container SAS Token
         */
        outputStorageContainerSasToken?: string;
      };
    }
  | {
      /**
       * Index sources and publish symbols
       *
       * Index your source code and publish symbols to a file share or Azure Artifacts symbol server
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Index sources and publish symbols inputs
       */
      inputs?: {
        /**
         * Azure Resource Manager connection
         */
        ConnectedServiceName?: string;
        /**
         * Path to symbols folder
         */
        SymbolsFolder?: string;
        /**
         * Search pattern
         */
        SearchPattern?: string;
        /**
         * Manifest
         */
        Manifest?: string;
        /**
         * Index sources
         */
        IndexSources?: boolean;
        /**
         * Publish symbols
         */
        PublishSymbols?: boolean;
        /**
         * Symbol server type
         */
        SymbolServerType?: ' ' | 'TeamServices' | 'FileShare';
        /**
         * Path to publish symbols
         */
        SymbolsPath?: string;
        /**
         * Compress symbols
         */
        CompressSymbols?: boolean;
        /**
         * Symbol Expiration (in days)
         */
        SymbolExpirationInDays?: string;
        /**
         * Symbol file formats to publish
         */
        IndexableFileFormats?: 'Default' | 'Pdb' | 'SourceMap' | 'All';
        /**
         * Verbose logging
         */
        DetailedLog?: boolean;
        /**
         * Warn if not indexed
         */
        TreatNotIndexedAsWarning?: boolean;
        /**
         * Use NetCore client tool
         */
        UseNetCoreClientTool?: boolean;
        /**
         * Max wait time (min)
         */
        SymbolsMaximumWaitTime?: string;
        /**
         * Product
         */
        SymbolsProduct?: string;
        /**
         * Version
         */
        SymbolsVersion?: string;
        /**
         * Artifact name
         */
        SymbolsArtifactName?: string;
      };
    }
  | {
      /**
       * Index Sources & Publish Symbols
       *
       * Index your source code and publish symbols to a file share
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Index Sources & Publish Symbols inputs
       */
      inputs?: {
        /**
         * Path to publish symbols
         */
        SymbolsPath?: string;
        /**
         * Search pattern
         */
        SearchPattern?: string;
        /**
         * Path to symbols folder
         */
        SymbolsFolder?: string;
        /**
         * Skip indexing
         */
        SkipIndexing?: boolean;
        /**
         * Warn if not indexed
         */
        TreatNotIndexedAsWarning?: boolean;
        /**
         * Max wait time (min)
         */
        SymbolsMaximumWaitTime?: string;
        /**
         * Product
         */
        SymbolsProduct?: string;
        /**
         * Version
         */
        SymbolsVersion?: string;
        /**
         * Artifact name
         */
        SymbolsArtifactName?: string;
      };
    }
  | {
      /**
       * Copy files over SSH
       *
       * Copy files or build artifacts to a remote machine over SSH
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Copy files over SSH inputs
       */
      inputs: {
        /**
         * SSH service connection
         */
        sshEndpoint: string;
        /**
         * Source folder
         */
        sourceFolder?: string;
        /**
         * Contents
         */
        contents?: string;
        /**
         * Target folder
         */
        targetFolder?: string;
        /**
         * Target machine running Windows
         */
        isWindowsOnTarget?: boolean;
        /**
         * Clean target folder
         */
        cleanTargetFolder?: boolean;
        /**
         * Remove hidden files in target folder
         */
        cleanHiddenFilesInTarget?: boolean;
        /**
         * SSH handshake timeout
         */
        readyTimeout?: string;
        /**
         * Overwrite
         */
        overwrite?: boolean;
        /**
         * Fail if no files found to copy
         */
        failOnEmptySource?: boolean;
        /**
         * Flatten folders
         */
        flattenFolders?: boolean;
        /**
         * Number of concurrent uploads when copying files
         */
        concurrentUploads?: string;
        /**
         * Delay between queueing uploads (in milliseconds)
         */
        delayBetweenUploads?: string;
      };
    }
  | {
      /**
       * Gradle
       *
       * Build using a Gradle wrapper script
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Gradle inputs
       */
      inputs?: {
        /**
         * Gradle wrapper
         */
        gradleWrapperFile?: string;
        /**
         * Working directory
         */
        workingDirectory?: string;
        /**
         * Options
         */
        options?: string;
        /**
         * Tasks
         */
        tasks?: string;
        /**
         * Publish to Azure Pipelines
         */
        publishJUnitResults?: boolean;
        /**
         * Test results files
         */
        testResultsFiles?: string;
        /**
         * Test run title
         */
        testRunTitle?: string;
        /**
         * Code coverage tool
         */
        codeCoverageToolOption?: 'None' | 'Cobertura' | 'JaCoCo';
        /**
         * Class files directories
         */
        codeCoverageClassFilesDirectories?: string;
        /**
         * Class inclusion/exclusion filters
         */
        codeCoverageClassFilter?: string;
        /**
         * Fail when code coverage results are missing
         */
        codeCoverageFailIfEmpty?: boolean;
        /**
         * Gradle version >= 5.x
         */
        codeCoverageGradle5xOrHigher?: boolean;
        /**
         * Set JAVA_HOME by
         */
        javaHomeOption?: 'JDKVersion' | 'Path';
        /**
         * JDK version
         */
        jdkVersionOption?: 'default' | '1.17' | '1.11' | '1.10' | '1.9' | '1.8' | '1.7' | '1.6';
        /**
         * JDK path
         */
        jdkDirectory?: string;
        /**
         * JDK architecture
         */
        jdkArchitectureOption?: 'x86' | 'x64';
        /**
         * Set GRADLE_OPTS
         */
        gradleOptions?: string;
        /**
         * Run SonarQube or SonarCloud Analysis
         */
        sonarQubeRunAnalysis?: boolean;
        /**
         * SonarQube scanner for Gradle version
         */
        sqGradlePluginVersionChoice?: 'specify' | 'build';
        /**
         * SonarQube scanner for Gradle plugin version
         */
        sonarQubeGradlePluginVersion?: string;
        /**
         * Run Checkstyle
         */
        checkStyleRunAnalysis?: boolean;
        /**
         * Run FindBugs
         */
        findBugsRunAnalysis?: boolean;
        /**
         * Run PMD
         */
        pmdRunAnalysis?: boolean;
        /**
         * Run SpotBugs
         */
        spotBugsAnalysis?: boolean;
        /**
         * Spotbugs plugin version
         */
        spotBugsGradlePluginVersionChoice?: 'specify' | 'build';
        /**
         * Version number
         */
        spotbugsGradlePluginVersion?: string;
      };
    }
  | {
      /**
       * Gradle
       *
       * Build using a Gradle wrapper script
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Gradle inputs
       */
      inputs?: {
        /**
         * Gradle wrapper
         */
        gradleWrapperFile?: string;
        /**
         * Working directory
         */
        workingDirectory?: string;
        /**
         * Options
         */
        options?: string;
        /**
         * Tasks
         */
        tasks?: string;
        /**
         * Publish to Azure Pipelines
         */
        publishJUnitResults?: boolean;
        /**
         * Test results files
         */
        testResultsFiles?: string;
        /**
         * Test run title
         */
        testRunTitle?: string;
        /**
         * Set JAVA_HOME by
         */
        javaHomeOption?: 'JDKVersion' | 'Path';
        /**
         * JDK version
         */
        jdkVersionOption?: 'default' | '1.17' | '1.11' | '1.10' | '1.9' | '1.8' | '1.7' | '1.6';
        /**
         * JDK path
         */
        jdkDirectory?: string;
        /**
         * JDK architecture
         */
        jdkArchitectureOption?: 'x86' | 'x64';
        /**
         * Set GRADLE_OPTS
         */
        gradleOptions?: string;
        /**
         * Run SonarQube or SonarCloud Analysis
         */
        sonarQubeRunAnalysis?: boolean;
        /**
         * SonarQube scanner for Gradle version
         */
        sqGradlePluginVersionChoice?: 'specify' | 'build';
        /**
         * SonarQube scanner for Gradle plugin version
         */
        sonarQubeGradlePluginVersion?: string;
        /**
         * Run Checkstyle
         */
        checkStyleRunAnalysis?: boolean;
        /**
         * Run FindBugs
         */
        findBugsRunAnalysis?: boolean;
        /**
         * Run PMD
         */
        pmdRunAnalysis?: boolean;
        /**
         * Run SpotBugs
         */
        spotBugsAnalysis?: boolean;
        /**
         * Spotbugs plugin version
         */
        spotBugsGradlePluginVersionChoice?: 'specify' | 'build';
        /**
         * Version number
         */
        spotbugsGradlePluginVersion?: string;
      };
    }
  | {
      /**
       * Gradle
       *
       * Build using a Gradle wrapper script
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Gradle inputs
       */
      inputs?: {
        /**
         * Gradle Wrapper
         */
        gradleWrapperFile?: string;
        /**
         * Options
         */
        options?: string;
        /**
         * Tasks
         */
        tasks?: string;
        /**
         * Working Directory
         */
        workingDirectory?: string;
        /**
         * Publish to TFS/Team Services
         */
        publishJUnitResults?: boolean;
        /**
         * Test Results Files
         */
        testResultsFiles?: string;
        /**
         * Test Run Title
         */
        testRunTitle?: string;
        /**
         * Code Coverage Tool
         */
        codeCoverageToolOption?: 'None' | 'Cobertura' | 'JaCoCo';
        /**
         * Class Files Directories
         */
        codeCoverageClassFilesDirectories?: string;
        /**
         * Class Inclusion/Exclusion Filters
         */
        codeCoverageClassFilter?: string;
        /**
         * Fail When Code Coverage Results Are Missing
         */
        codeCoverageFailIfEmpty?: boolean;
        /**
         * Set JAVA_HOME by
         */
        javaHomeOption?: 'JDKVersion' | 'Path';
        /**
         * JDK Version
         */
        jdkVersionOption?: 'default' | '1.9' | '1.8' | '1.7' | '1.6';
        /**
         * JDK Path
         */
        jdkDirectory?: string;
        /**
         * JDK Architecture
         */
        jdkArchitectureOption?: 'x86' | 'x64';
        /**
         * Set GRADLE_OPTS
         */
        gradleOptions?: string;
        /**
         * Run SonarQube Analysis
         */
        sonarQubeRunAnalysis?: boolean;
        /**
         * SonarQube Endpoint
         */
        sonarQubeServiceEndpoint?: string;
        /**
         * SonarQube Project Name
         */
        sonarQubeProjectName?: string;
        /**
         * SonarQube Project Key
         */
        sonarQubeProjectKey?: string;
        /**
         * SonarQube Project Version
         */
        sonarQubeProjectVersion?: string;
        /**
         * SonarQube Gradle Plugin Version
         */
        sonarQubeGradlePluginVersion?: string;
        /**
         * The SonarQube server version is lower than 5.2
         */
        sonarQubeSpecifyDB?: boolean;
        /**
         * Db Connection String
         */
        sonarQubeDBUrl?: string;
        /**
         * Db Username
         */
        sonarQubeDBUsername?: string;
        /**
         * Db User Password
         */
        sonarQubeDBPassword?: string;
        /**
         * Include full analysis report in the build summary (SQ 5.3+)
         */
        sonarQubeIncludeFullReport?: boolean;
        /**
         * Fail the build on quality gate failure (SQ 5.3+)
         */
        sonarQubeFailWhenQualityGateFails?: boolean;
        /**
         * Run Checkstyle
         */
        checkStyleRunAnalysis?: boolean;
        /**
         * Run FindBugs
         */
        findBugsRunAnalysis?: boolean;
        /**
         * Run PMD
         */
        pmdRunAnalysis?: boolean;
      };
    }
  | {
      /**
       * Azure Test Plan
       *
       * Run manual and automated tests points of test plan for different testing frameworks like Maven and Gradle for Java, PyTest for Python and Jest for JavaScript
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Test Plan inputs
       */
      inputs: {
        /**
         * Azure Resource Manager connection
         */
        azureSubscription?: string;
        /**
         * Test cases to be executed
         */
        testSelector: 'manualTests' | 'automatedTests';
        /**
         * Select tests using
         */
        testPlanOrRunSelector?: 'testPlan' | 'testRun';
        /**
         * Test Run
         */
        testRunId?: string;
        /**
         * Test plan
         */
        testPlan?: string;
        /**
         * Test suite
         */
        testSuite?: string;
        /**
         * Test configuration
         */
        testConfiguration: string;
        /**
         * Select Test framework language
         */
        testLanguageInput?: 'JavaMaven' | 'JavaGradle' | 'Python' | 'JavaScriptJest' | 'Playwright';
        /**
         * Pom file path
         */
        pomFilePath?: string;
        /**
         * Gradle file path
         */
        gradleFilePath?: string;
        /**
         * Upload test results files
         */
        publishRunAttachments?: boolean;
        /**
         * Fail if there are test failures
         */
        failTaskOnFailedTests?: boolean;
        /**
         * Fail if there is failure in publishing test results
         */
        failTaskOnFailureToPublishResults?: boolean;
        /**
         * Fail if no result files are found
         */
        failTaskOnMissingResultsFile?: boolean;
      };
    }
  | {
      /**
       * App Center distribute
       *
       * Distribute app builds to testers and users via Visual Studio App Center
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * App Center distribute inputs
       */
      inputs: {
        /**
         * App Center service connection
         */
        serverEndpoint: string;
        /**
         * App slug
         */
        appSlug: string;
        /**
         * Binary file path
         */
        appFile: string;
        /**
         * Symbols type
         */
        symbolsOption?: 'Apple';
        /**
         * Symbols path
         */
        symbolsPath?: string;
        /**
         * Symbols path (*.pdb)
         */
        symbolsPdbFiles?: string;
        /**
         * dSYM path
         */
        symbolsDsymFiles?: string;
        /**
         * Mapping file
         */
        symbolsMappingTxtFile?: string;
        /**
         * Include all items in parent folder
         */
        symbolsIncludeParentDirectory?: boolean;
        /**
         * Create release notes
         */
        releaseNotesOption?: 'input' | 'file';
        /**
         * Release notes
         */
        releaseNotesInput?: string;
        /**
         * Release notes file
         */
        releaseNotesFile?: string;
        /**
         * Require users to update to this release
         */
        isMandatory?: boolean;
        /**
         * Destination ID
         */
        distributionGroupId?: string;
      };
    }
  | {
      /**
       * App Center distribute
       *
       * Distribute app builds to testers and users via Visual Studio App Center
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * App Center distribute inputs
       */
      inputs: {
        /**
         * App Center service connection
         */
        serverEndpoint: string;
        /**
         * App slug
         */
        appSlug: string;
        /**
         * Binary file path
         */
        appFile: string;
        /**
         * Symbols type
         */
        symbolsOption?: 'Apple';
        /**
         * Symbols path
         */
        symbolsPath?: string;
        /**
         * Symbols path (*.pdb)
         */
        symbolsPdbFiles?: string;
        /**
         * dSYM path
         */
        symbolsDsymFiles?: string;
        /**
         * Mapping file
         */
        symbolsMappingTxtFile?: string;
        /**
         * Include all items in parent folder
         */
        symbolsIncludeParentDirectory?: boolean;
        /**
         * Create release notes
         */
        releaseNotesOption?: 'input' | 'file';
        /**
         * Release notes
         */
        releaseNotesInput?: string;
        /**
         * Release notes file
         */
        releaseNotesFile?: string;
        /**
         * Require users to update to this release
         */
        isMandatory?: boolean;
        /**
         * Destination IDs
         */
        distributionGroupId?: string;
      };
    }
  | {
      /**
       * App Center distribute
       *
       * Distribute app builds to testers and users via Visual Studio App Center
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * App Center distribute inputs
       */
      inputs: {
        /**
         * App Center service connection
         */
        serverEndpoint: string;
        /**
         * App slug
         */
        appSlug: string;
        /**
         * Binary file path
         */
        appFile: string;
        /**
         * Build version
         */
        buildVersion?: string;
        /**
         * Symbols type
         */
        symbolsOption?: 'Apple' | 'Android' | 'UWP';
        /**
         * Symbols path
         */
        symbolsPath?: string;
        /**
         * Symbols path (*.appxsym)
         */
        appxsymPath?: string;
        /**
         * dSYM path
         */
        symbolsDsymFiles?: string;
        /**
         * Mapping file
         */
        symbolsMappingTxtFile?: string;
        /**
         * Native Library File Path
         */
        nativeLibrariesPath?: string;
        /**
         * Include all items in parent folder
         */
        symbolsIncludeParentDirectory?: boolean;
        /**
         * Create release notes
         */
        releaseNotesOption?: 'input' | 'file';
        /**
         * Release notes
         */
        releaseNotesInput?: string;
        /**
         * Release notes file
         */
        releaseNotesFile?: string;
        /**
         * Require users to update to this release
         */
        isMandatory?: boolean;
        /**
         * Release destination
         */
        destinationType?: 'groups' | 'store';
        /**
         * Destination IDs
         */
        distributionGroupId?: string;
        /**
         * Destination ID
         */
        destinationStoreId?: string;
        /**
         * Do not notify testers. Release will still be available to install.
         */
        isSilent?: boolean;
      };
    }
  | {
      /**
       * App Center Distribute
       *
       * Distribute app builds to testers and users via App Center
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * App Center Distribute inputs
       */
      inputs: {
        /**
         * App Center connection
         */
        serverEndpoint: string;
        /**
         * App slug
         */
        appSlug: string;
        /**
         * Binary file path
         */
        appFile: string;
        /**
         * Symbols type
         */
        symbolsOption?: 'Apple';
        /**
         * Symbols path
         */
        symbolsPath?: string;
        /**
         * Symbols path (*.pdb)
         */
        symbolsPdbFiles?: string;
        /**
         * dSYM path
         */
        symbolsDsymFiles?: string;
        /**
         * Mapping file
         */
        symbolsMappingTxtFile?: string;
        /**
         * Include all items in parent folder
         */
        symbolsIncludeParentDirectory?: boolean;
        /**
         * Create release notes
         */
        releaseNotesOption?: 'input' | 'file';
        /**
         * Release notes
         */
        releaseNotesInput?: string;
        /**
         * Release notes file
         */
        releaseNotesFile?: string;
        /**
         * Distribution group ID
         */
        distributionGroupId?: string;
      };
    }
  | {
      /**
       * NuGet tool installer
       *
       * Acquires a specific version of NuGet from the internet or the tools cache and adds it to the PATH. Use this task to change the version of NuGet used in the NuGet tasks.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * NuGet tool installer inputs
       */
      inputs?: {
        /**
         * Version of NuGet.exe to install
         */
        versionSpec?: string;
        /**
         * Always download the latest matching version
         */
        checkLatest?: boolean;
      };
    }
  | {
      /**
       * NuGet tool installer
       *
       * Acquires a specific version of NuGet from the internet or the tools cache and adds it to the PATH. Use this task to change the version of NuGet used in the NuGet tasks.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * NuGet tool installer inputs
       */
      inputs?: {
        /**
         * Version of NuGet.exe to install
         */
        versionSpec?: string;
        /**
         * Always check for new versions
         */
        checkLatest?: boolean;
      };
    }
  | {
      /**
       * Jenkins download artifacts
       *
       * Download artifacts produced by a Jenkins job
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Jenkins download artifacts inputs
       */
      inputs: {
        /**
         * Jenkins service connection
         */
        jenkinsServerConnection: string;
        /**
         * Job name
         */
        jobName: string;
        /**
         * Jenkins job type
         */
        jenkinsJobType?: string;
        /**
         * Save to
         */
        saveTo?: string;
        /**
         * Download artifacts produced by
         */
        jenkinsBuild?: 'LastSuccessfulBuild' | 'BuildNumber';
        /**
         * Jenkins build number
         */
        jenkinsBuildNumber?: string;
        /**
         * Item Pattern
         */
        itemPattern?: string;
        /**
         * Download Commits and WorkItems
         */
        downloadCommitsAndWorkItems?: boolean;
        /**
         * Download commits and work items from
         */
        startJenkinsBuildNumber?: string;
        /**
         * Commit and WorkItem FileName
         */
        artifactDetailsFileNameSuffix?: string;
        /**
         * Artifacts are propagated to Azure
         */
        propagatedArtifacts?: boolean;
        /**
         * Artifact Provider
         */
        artifactProvider?: 'azureStorage';
        /**
         * Azure Subscription
         */
        ConnectedServiceNameARM?: string;
        /**
         * Storage Account Name
         */
        storageAccountName?: string;
        /**
         * Container Name
         */
        containerName?: string;
        /**
         * Common Virtual Path
         */
        commonVirtualPath?: string;
      };
    }
  | {
      /**
       * Azure Functions for container
       *
       * Update a function app with a Docker container
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Functions for container inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * App name
         */
        appName: string;
        /**
         * Deploy to Slot or App Service Environment
         */
        deployToSlotOrASE?: boolean;
        /**
         * Resource group
         */
        resourceGroupName?: string;
        /**
         * Slot
         */
        slotName?: string;
        /**
         * Image name
         */
        imageName: string;
        /**
         * Startup command
         */
        containerCommand?: string;
        /**
         * App settings
         */
        appSettings?: string;
        /**
         * Configuration settings
         */
        configurationStrings?: string;
      };
    }
  | {
      /**
       * Decrypt file (OpenSSL)
       *
       * Decrypt a file using OpenSSL
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Decrypt file (OpenSSL) inputs
       */
      inputs: {
        /**
         * Cypher
         */
        cipher?: string;
        /**
         * Encrypted file
         */
        inFile: string;
        /**
         * Passphrase
         */
        passphrase: string;
        /**
         * Decrypted file path
         */
        outFile?: string;
        /**
         * Working directory
         */
        workingDirectory?: string;
      };
    }
  | {
      /**
       * Package and deploy Helm charts
       *
       * Deploy, configure, update a Kubernetes cluster in Azure Container Service by running helm commands
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Package and deploy Helm charts inputs
       */
      inputs: {
        /**
         * Connection Type
         */
        connectionType?: 'Azure Resource Manager' | 'Kubernetes Service Connection' | 'None';
        /**
         * Azure subscription
         */
        azureSubscription?: string;
        /**
         * Resource group
         */
        azureResourceGroup?: string;
        /**
         * Kubernetes cluster
         */
        kubernetesCluster?: string;
        /**
         * Use cluster admin credentials
         */
        useClusterAdmin?: boolean;
        /**
         * Kubernetes Service Connection
         */
        kubernetesServiceConnection?: string;
        /**
         * Namespace
         */
        namespace?: string;
        /**
         * Azure subscription for Container Registry
         */
        azureSubscriptionForACR: string;
        /**
         * Resource group
         */
        azureResourceGroupForACR: string;
        /**
         * Azure Container Registry
         */
        azureContainerRegistry: string;
        /**
         * Command
         */
        command?:
          | 'create'
          | 'delete'
          | 'expose'
          | 'get'
          | 'init'
          | 'install'
          | 'login'
          | 'logout'
          | 'ls'
          | 'package'
          | 'rollback'
          | 'upgrade'
          | 'uninstall';
        /**
         * Chart Type
         */
        chartType?: 'Name' | 'FilePath';
        /**
         * Chart Name
         */
        chartName?: string;
        /**
         * Chart Path
         */
        chartPath?: string;
        /**
         * Version
         */
        chartVersion?: string;
        /**
         * Release Name
         */
        releaseName?: string;
        /**
         * Set Values
         */
        overrideValues?: string;
        /**
         * Value File
         */
        valueFile?: string;
        /**
         * Destination
         */
        destination?: string;
        /**
         * Use canary image version.
         */
        canaryImage?: boolean;
        /**
         * Upgrade Tiller
         */
        upgradeTiller?: boolean;
        /**
         * Update Dependency
         */
        updateDependency?: boolean;
        /**
         * Save
         */
        save?: boolean;
        /**
         * Install if release not present.
         */
        install?: boolean;
        /**
         * Recreate Pods.
         */
        recreate?: boolean;
        /**
         * Reset Values.
         */
        resetValues?: boolean;
        /**
         * Force
         */
        force?: boolean;
        /**
         * Wait
         */
        waitForExecution?: boolean;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Enable TLS
         */
        enableTls?: boolean;
        /**
         * CA certificate
         */
        caCert?: string;
        /**
         * Certificate
         */
        certificate?: string;
        /**
         * Key
         */
        privatekey?: string;
        /**
         * Tiller namespace
         */
        tillerNamespace?: string;
        /**
         * Fail on Standard Error
         */
        failOnStderr?: boolean;
        /**
         * Publish pipeline metadata
         */
        publishPipelineMetadata?: boolean;
        /**
         * Chart Name For Azure Container Registry
         */
        chartNameForACR?: string;
        /**
         * Chart Path for Azure Container Registry
         */
        chartPathForACR?: string;
      };
    }
  | {
      /**
       * Package and deploy Helm charts
       *
       * Deploy, configure, update a Kubernetes cluster in Azure Container Service by running helm commands
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Package and deploy Helm charts inputs
       */
      inputs: {
        /**
         * Connection Type
         */
        connectionType?: 'Azure Resource Manager' | 'Kubernetes Service Connection' | 'None';
        /**
         * Azure subscription
         */
        azureSubscription?: string;
        /**
         * Resource group
         */
        azureResourceGroup?: string;
        /**
         * Kubernetes cluster
         */
        kubernetesCluster?: string;
        /**
         * Use cluster admin credentials
         */
        useClusterAdmin?: boolean;
        /**
         * Kubernetes Service Connection
         */
        kubernetesServiceConnection?: string;
        /**
         * Namespace
         */
        namespace?: string;
        /**
         * Azure subscription for Container Registry
         */
        azureSubscriptionForACR: string;
        /**
         * Resource group
         */
        azureResourceGroupForACR: string;
        /**
         * Azure Container Registry
         */
        azureContainerRegistry: string;
        /**
         * Command
         */
        command?:
          | 'create'
          | 'delete'
          | 'expose'
          | 'get'
          | 'init'
          | 'install'
          | 'login'
          | 'logout'
          | 'ls'
          | 'push'
          | 'package'
          | 'rollback'
          | 'save'
          | 'upgrade'
          | 'uninstall';
        /**
         * Chart Type
         */
        chartType?: 'Name' | 'FilePath';
        /**
         * Chart Name
         */
        chartName?: string;
        /**
         * Chart Path
         */
        chartPath?: string;
        /**
         * Remote Repo
         */
        remoteRepo?: string;
        /**
         * Version
         */
        chartVersion?: string;
        /**
         * Release Name
         */
        releaseName?: string;
        /**
         * Set Values
         */
        overrideValues?: string;
        /**
         * Value File
         */
        valueFile?: string;
        /**
         * Destination
         */
        destination?: string;
        /**
         * Use canary image version.
         */
        canaryImage?: boolean;
        /**
         * Upgrade Tiller
         */
        upgradeTiller?: boolean;
        /**
         * Update Dependency
         */
        updateDependency?: boolean;
        /**
         * Save
         */
        save?: boolean;
        /**
         * Install if release not present.
         */
        install?: boolean;
        /**
         * Recreate Pods.
         */
        recreate?: boolean;
        /**
         * Reset Values.
         */
        resetValues?: boolean;
        /**
         * Force
         */
        force?: boolean;
        /**
         * Wait
         */
        waitForExecution?: boolean;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Enable TLS
         */
        enableTls?: boolean;
        /**
         * CA certificate
         */
        caCert?: string;
        /**
         * Certificate
         */
        certificate?: string;
        /**
         * Key
         */
        privatekey?: string;
        /**
         * Tiller namespace
         */
        tillerNamespace?: string;
        /**
         * Fail on Standard Error
         */
        failOnStderr?: boolean;
        /**
         * Publish pipeline metadata
         */
        publishPipelineMetadata?: boolean;
        /**
         * Chart Name For Azure Container Registry
         */
        chartNameForACR?: string;
        /**
         * Chart Path for Azure Container Registry
         */
        chartPathForACR?: string;
      };
    }
  | {
      /**
       * Install Apple certificate
       *
       * Install an Apple certificate required to build on a macOS agent machine
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Install Apple certificate inputs
       */
      inputs: {
        /**
         * Certificate (P12)
         */
        certSecureFile: string;
        /**
         * Certificate (P12) password
         */
        certPwd?: string;
        /**
         * Keychain
         */
        keychain?: 'default' | 'temp' | 'custom';
        /**
         * Keychain password
         */
        keychainPassword?: string;
        /**
         * Custom keychain path
         */
        customKeychainPath?: string;
        /**
         * Delete certificate from keychain
         */
        deleteCert?: boolean;
        /**
         * Delete custom keychain
         */
        deleteCustomKeychain?: boolean;
        /**
         * Certificate signing identity
         */
        signingIdentity?: string;
        /**
         * Set up partition_id ACL for the imported private key
         */
        setUpPartitionIdACLForPrivateKey?: boolean;
        /**
         * OpenSSL arguments for PKCS12
         */
        opensslPkcsArgs?: string;
      };
    }
  | {
      /**
       * Install Apple Certificate
       *
       * Install an Apple certificate required to build on a macOS agent
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Install Apple Certificate inputs
       */
      inputs: {
        /**
         * Certificate (P12)
         */
        certSecureFile: string;
        /**
         * Certificate (P12) password
         */
        certPwd?: string;
        /**
         * Keychain
         */
        keychain?: 'default' | 'temp' | 'custom';
        /**
         * Keychain password
         */
        keychainPassword?: string;
        /**
         * Custom keychain path
         */
        customKeychainPath?: string;
        /**
         * Delete certificate from keychain
         */
        deleteCert?: boolean;
        /**
         * Delete custom keychain
         */
        deleteCustomKeychain?: boolean;
        /**
         * Certificate signing identity
         */
        signingIdentity?: string;
      };
    }
  | {
      /**
       * Install Apple Certificate
       *
       * Install an Apple certificate required to build on a macOS agent
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Install Apple Certificate inputs
       */
      inputs: {
        /**
         * Certificate (P12)
         */
        certSecureFile: string;
        /**
         * Certificate (P12) Password
         */
        certPwd?: string;
        /**
         * Keychain
         */
        keychain?: 'default' | 'temp' | 'custom';
        /**
         * Keychain Password
         */
        keychainPassword?: string;
        /**
         * Custom Keychain Path
         */
        customKeychainPath?: string;
        /**
         * Delete Certificate from Keychain
         */
        deleteCert?: boolean;
        /**
         * Delete Custom Keychain
         */
        deleteCustomKeychain?: boolean;
        /**
         * Certificate Signing Identity
         */
        signingIdentity?: string;
      };
    }
  | {
      /**
       * Invoke Azure Function
       *
       * Invoke an Azure Function
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Invoke Azure Function inputs
       */
      inputs: {
        /**
         * Azure function URL
         */
        function: string;
        /**
         * Function key
         */
        key: string;
        /**
         * Method
         */
        method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'PATCH';
        /**
         * Headers
         */
        headers?: string;
        /**
         * Query parameters
         */
        queryParameters?: string;
        /**
         * Body
         */
        body?: string;
        /**
         * Completion event
         */
        waitForCompletion?: 'true' | 'false';
        /**
         * Success criteria
         */
        successCriteria?: string;
      };
    }
  | {
      /**
       * Invoke Azure Function
       *
       * Invoke Azure function as a part of your process.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Invoke Azure Function inputs
       */
      inputs: {
        /**
         * Azure function url
         */
        function: string;
        /**
         * Function key
         */
        key: string;
        /**
         * Method
         */
        method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'PATCH';
        /**
         * Headers
         */
        headers?: string;
        /**
         * Query parameters
         */
        queryParameters?: string;
        /**
         * Body
         */
        body?: string;
        /**
         * Complete based on
         */
        waitForCompletion?: 'true' | 'false';
        /**
         * Success criteria
         */
        successCriteria?: string;
      };
    }
  | {
      /**
       * Open Policy Agent Installer
       *
       * Install Open Policy Agent on agent machine
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Open Policy Agent Installer inputs
       */
      inputs?: {
        /**
         * OPA Version Spec
         */
        opaVersion?: string;
      };
    }
  | {
      /**
       * Download GitHub Release
       *
       * Downloads a GitHub Release from a repository
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Download GitHub Release inputs
       */
      inputs: {
        /**
         * GitHub Connection
         */
        connection: string;
        /**
         * Repository
         */
        userRepository: string;
        /**
         * Default version
         */
        defaultVersionType?: 'latest' | 'specificVersion' | 'specificTag';
        /**
         * Release
         */
        version?: string;
        /**
         * Item Pattern
         */
        itemPattern?: string;
        /**
         * Destination directory
         */
        downloadPath?: string;
      };
    }
  | {
      /**
       * SSH
       *
       * Run shell commands or a script on a remote machine using SSH
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * SSH inputs
       */
      inputs: {
        /**
         * SSH service connection
         */
        sshEndpoint: string;
        /**
         * Run
         */
        runOptions?: 'commands' | 'script' | 'inline';
        /**
         * Commands
         */
        commands?: string;
        /**
         * Shell script path
         */
        scriptPath?: string;
        /**
         * Inline Script
         */
        inline?: string;
        /**
         * Interpreter command
         */
        interpreterCommand?: string;
        /**
         * Arguments
         */
        args?: string;
        /**
         * Fail on STDERR
         */
        failOnStdErr?: boolean;
        /**
         * Enable interactive session
         */
        interactiveSession?: boolean;
        /**
         * SSH handshake timeout
         */
        readyTimeout?: string;
        /**
         * Use interactive-keyboard authentication
         */
        interactiveKeyboardAuthentication?: boolean;
      };
    }
  | {
      /**
       * Publish pipeline artifact
       *
       * Publish a local directory or file as a named artifact for the current pipeline
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Publish pipeline artifact inputs
       */
      inputs: {
        /**
         * The name of this artifact
         */
        artifactName?: string;
        /**
         * Path to publish
         */
        targetPath: string;
        /**
         * Custom properties
         */
        properties?: string;
      };
    }
  | {
      /**
       * Publish Pipeline Artifacts
       *
       * Publish (upload) a file or directory as a named artifact for the current run
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Publish Pipeline Artifacts inputs
       */
      inputs?: {
        /**
         * File or directory path
         */
        targetPath?: string;
        /**
         * Artifact name
         */
        artifact?: string;
        /**
         * Artifact publish location
         */
        publishLocation?: 'pipeline' | 'filepath';
        /**
         * File share path
         */
        fileSharePath?: string;
        /**
         * Parallel copy
         */
        parallel?: boolean;
        /**
         * Parallel count
         */
        parallelCount?: number;
        /**
         * Custom properties
         */
        properties?: string;
      };
    }
  | {
      /**
       * SonarQube for MSBuild - Begin Analysis
       *
       * [DEPRECATED] Fetch the Quality Profile from SonarQube to configure the analysis
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * SonarQube for MSBuild - Begin Analysis inputs
       */
      inputs: {
        /**
         * Project Key
         */
        projectKey: string;
        /**
         * Project Name
         */
        projectName: string;
        /**
         * Project Version
         */
        projectVersion?: string;
        /**
         * SonarQube Endpoint
         */
        connectedServiceName: string;
        /**
         * Db Connection String
         */
        dbUrl?: string;
        /**
         * Db UserName
         */
        dbUsername?: string;
        /**
         * Db User Password
         */
        dbPassword?: string;
        /**
         * Additional Settings
         */
        cmdLineArgs?: string;
        /**
         * Settings File
         */
        configFile?: string;
        /**
         * Include full analysis report in the build summary (SQ 5.3+)
         */
        includeFullReport?: boolean;
        /**
         * Fail the build on quality gate failure (SQ 5.3+)
         */
        breakBuild?: boolean;
      };
    }
  | {
      /**
       * Download artifacts from file share
       *
       * Download artifacts from a file share, like \\share\drop
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Download artifacts from file share inputs
       */
      inputs: {
        /**
         * File share path
         */
        filesharePath: string;
        /**
         * Artifact name
         */
        artifactName: string;
        /**
         * Matching pattern
         */
        itemPattern?: string;
        /**
         * Download path
         */
        downloadPath?: string;
        /**
         * Parallelization limit
         */
        parallelizationLimit?: string;
      };
    }
  | {
      /**
       * Kubectl
       *
       * Deploy, configure, update a Kubernetes cluster in Azure Container Service by running kubectl commands
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Kubectl inputs
       */
      inputs?: {
        /**
         * Service connection type
         */
        connectionType?: 'Azure Resource Manager' | 'Kubernetes Service Connection' | 'None';
        /**
         * Kubernetes service connection
         */
        kubernetesServiceEndpoint?: string;
        /**
         * Azure subscription
         */
        azureSubscriptionEndpoint?: string;
        /**
         * Resource group
         */
        azureResourceGroup?: string;
        /**
         * Kubernetes cluster
         */
        kubernetesCluster?: string;
        /**
         * Use cluster admin credentials
         */
        useClusterAdmin?: boolean;
        /**
         * Namespace
         */
        namespace?: string;
        /**
         * Command
         */
        command?:
          | 'apply'
          | 'create'
          | 'delete'
          | 'exec'
          | 'expose'
          | 'get'
          | 'login'
          | 'logout'
          | 'logs'
          | 'rollout'
          | 'run'
          | 'set'
          | 'top';
        /**
         * Use configuration
         */
        useConfigurationFile?: boolean;
        /**
         * Configuration type
         */
        configurationType?: 'configuration' | 'inline';
        /**
         * File path
         */
        configuration?: string;
        /**
         * Inline configuration
         */
        inline?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Type of secret
         */
        secretType?: 'dockerRegistry' | 'generic';
        /**
         * Arguments
         */
        secretArguments?: string;
        /**
         * Container registry type
         */
        containerRegistryType?: 'Azure Container Registry' | 'Container Registry';
        /**
         * Docker registry service connection
         */
        dockerRegistryEndpoint?: string;
        /**
         * Azure subscription
         */
        azureSubscriptionEndpointForSecrets?: string;
        /**
         * Azure container registry
         */
        azureContainerRegistry?: string;
        /**
         * Secret name
         */
        secretName?: string;
        /**
         * Force update secret
         */
        forceUpdate?: boolean;
        /**
         * ConfigMap name
         */
        configMapName?: string;
        /**
         * Force update configmap
         */
        forceUpdateConfigMap?: boolean;
        /**
         * Use file
         */
        useConfigMapFile?: boolean;
        /**
         * ConfigMap file
         */
        configMapFile?: string;
        /**
         * Arguments
         */
        configMapArguments?: string;
        /**
         * Kubectl
         */
        versionOrLocation?: 'version' | 'location';
        /**
         * Version spec
         */
        versionSpec?: string;
        /**
         * Check for latest version
         */
        checkLatest?: boolean;
        /**
         * Path to kubectl
         */
        specifyLocation?: string;
        /**
         * Working directory
         */
        workingDirectory?: string;
        /**
         * Output format
         */
        outputFormat?: 'json' | 'yaml' | 'none';
      };
    }
  | {
      /**
       * Kubectl
       *
       * Deploy, configure, update a Kubernetes cluster in Azure Container Service by running kubectl commands
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Kubectl inputs
       */
      inputs?: {
        /**
         * Kubernetes service connection
         */
        kubernetesServiceConnection?: string;
        /**
         * Namespace
         */
        namespace?: string;
        /**
         * Command
         */
        command?: 'apply' | 'create' | 'delete' | 'exec' | 'expose' | 'get' | 'logs' | 'run' | 'set' | 'top';
        /**
         * Use Configuration files
         */
        useConfigurationFile?: boolean;
        /**
         * Configuration file
         */
        configuration?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Type of secret
         */
        secretType?: 'dockerRegistry' | 'generic';
        /**
         * Arguments
         */
        secretArguments?: string;
        /**
         * Container Registry type
         */
        containerRegistryType?: 'Azure Container Registry' | 'Container Registry';
        /**
         * Docker Registry service connection
         */
        dockerRegistryConnection?: string;
        /**
         * Azure subscription
         */
        azureSubscription?: string;
        /**
         * Azure Container Registry
         */
        azureContainerRegistry?: string;
        /**
         * Secret name
         */
        secretName?: string;
        /**
         * Force update secret
         */
        forceUpdate?: boolean;
        /**
         * ConfigMap name
         */
        configMapName?: string;
        /**
         * Force update configmap
         */
        forceUpdateConfigMap?: boolean;
        /**
         * Use file
         */
        useConfigMapFile?: boolean;
        /**
         * ConfigMap file
         */
        configMapFile?: string;
        /**
         * Arguments
         */
        configMapArguments?: string;
        /**
         * Kubectl
         */
        versionOrLocation?: 'version' | 'location';
        /**
         * Version spec
         */
        versionSpec?: string;
        /**
         * Check for latest version
         */
        checkLatest?: boolean;
        /**
         * Path to Kubectl
         */
        specifyLocation?: string;
        /**
         * Working directory
         */
        workingDirectory?: string;
        /**
         * Output format
         */
        outputFormat?: 'json' | 'yaml';
        /**
         * Output variable name
         */
        kubectlOutput?: string;
      };
    }
  | {
      /**
       * Azure IoT Edge
       *
       * Build and deploy an Azure IoT Edge image
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure IoT Edge inputs
       */
      inputs?: {
        /**
         * Action
         */
        action?:
          | 'Build module images'
          | 'Push module images'
          | 'Generate deployment manifest'
          | 'Deploy to IoT Edge devices';
        /**
         * Deployment file
         */
        deploymentFilePath?: string;
        /**
         * Azure subscription contains IoT Hub
         */
        azureSubscription?: string;
        /**
         * IoT Hub name
         */
        iothubname?: string;
        /**
         * IoT Edge deployment ID
         */
        deploymentid?: string;
        /**
         * IoT Edge deployment priority
         */
        priority?: string;
        /**
         * Choose single/multiple device
         */
        deviceOption?: 'Single Device' | 'Multiple Devices';
        /**
         * IoT Edge device ID
         */
        deviceId?: string;
        /**
         * IoT Edge device target condition
         */
        targetcondition?: string;
        /**
         * Container registry type
         */
        containerregistrytype?: 'Azure Container Registry' | 'Generic Container Registry';
        /**
         * Docker Registry Connection
         */
        dockerRegistryConnection?: string;
        /**
         * Azure subscription
         */
        azureSubscriptionEndpoint?: string;
        /**
         * Azure Container Registry
         */
        azureContainerRegistry?: string;
        /**
         * .template.json file
         */
        templateFilePath?: string;
        /**
         * Default platform
         */
        defaultPlatform?: 'amd64' | 'windows-amd64' | 'arm32v7' | 'arm64v8';
        /**
         * Add registry credential to deployment manifest
         */
        fillRegistryCredential?: 'true' | 'false';
        /**
         * Output path
         */
        deploymentManifestOutputPath?: string;
        /**
         * Validate the schema of generated deployment manifest
         */
        validateGeneratedDeploymentManifest?: 'true' | 'false';
        /**
         * Bypass module(s)
         */
        bypassModules?: string;
      };
    }
  | {
      /**
       * Service Fabric Compose deploy
       *
       * Deploy a Docker Compose application to an Azure Service Fabric cluster
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Service Fabric Compose deploy inputs
       */
      inputs: {
        /**
         * Cluster Service Connection
         */
        clusterConnection: string;
        /**
         * Compose File Path
         */
        composeFilePath?: string;
        /**
         * Application Name
         */
        applicationName?: string;
        /**
         * Registry Credentials Source
         */
        registryCredentials?:
          | 'AzureResourceManagerEndpoint'
          | 'ContainerRegistryEndpoint'
          | 'UsernamePassword'
          | 'None';
        /**
         * Docker Registry Service Connection
         */
        dockerRegistryConnection?: string;
        /**
         * Azure subscription
         */
        azureSubscription?: string;
        /**
         * Registry User Name
         */
        registryUserName?: string;
        /**
         * Registry Password
         */
        registryPassword?: string;
        /**
         * Password Encrypted
         */
        passwordEncrypted?: boolean;
        /**
         * Upgrade
         */
        upgrade?: boolean;
        /**
         * Deploy Timeout (s)
         */
        deployTimeoutSec?: string;
        /**
         * Remove Timeout (s)
         */
        removeTimeoutSec?: string;
        /**
         * Get Status Timeout (s)
         */
        getStatusTimeoutSec?: string;
      };
    }
  | {
      /**
       * Android Signing
       *
       * Sign and align Android APK files
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Android Signing inputs
       */
      inputs: {
        /**
         * APK Files
         */
        files: string;
        /**
         * Sign the APK
         */
        jarsign?: boolean;
        /**
         * Keystore File
         */
        keystoreFile?: string;
        /**
         * Keystore Password
         */
        keystorePass?: string;
        /**
         * Alias
         */
        keystoreAlias?: string;
        /**
         * Key Password
         */
        keyPass?: string;
        /**
         * Jarsigner Arguments
         */
        jarsignerArguments?: string;
        /**
         * Zipalign
         */
        zipalign?: boolean;
        /**
         * Zipalign Location
         */
        zipalignLocation?: string;
      };
    }
  | {
      /**
       * Android signing
       *
       * Sign and align Android APK files
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Android signing inputs
       */
      inputs?: {
        /**
         * APK files
         */
        apkFiles?: string;
        /**
         * Sign the APK
         */
        jarsign?: boolean;
        /**
         * Keystore file
         */
        jarsignerKeystoreFile?: string;
        /**
         * Keystore password
         */
        jarsignerKeystorePassword?: string;
        /**
         * Alias
         */
        jarsignerKeystoreAlias?: string;
        /**
         * Key password
         */
        jarsignerKeyPassword?: string;
        /**
         * Jarsigner arguments
         */
        jarsignerArguments?: string;
        /**
         * Zipalign
         */
        zipalign?: boolean;
        /**
         * Zipalign location
         */
        zipalignFile?: string;
      };
    }
  | {
      /**
       * Android signing
       *
       * Sign and align Android APK files
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Android signing inputs
       */
      inputs?: {
        /**
         * APK files
         */
        apkFiles?: string;
        /**
         * Sign the APK
         */
        apksign?: boolean;
        /**
         * Keystore file
         */
        apksignerKeystoreFile?: string;
        /**
         * Keystore password
         */
        apksignerKeystorePassword?: string;
        /**
         * Alias
         */
        apksignerKeystoreAlias?: string;
        /**
         * Key password
         */
        apksignerKeyPassword?: string;
        /**
         * apksigner version
         */
        apksignerVersion?: string;
        /**
         * apksigner arguments
         */
        apksignerArguments?: string;
        /**
         * apksigner location
         */
        apksignerFile?: string;
        /**
         * Zipalign
         */
        zipalign?: boolean;
        /**
         * Zipalign version
         */
        zipalignVersion?: string;
        /**
         * Zipalign location
         */
        zipalignFile?: string;
      };
    }
  | {
      /**
       * Download pipeline artifact
       *
       * Downloads an artifact associated with a pipeline
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Download pipeline artifact inputs
       */
      inputs: {
        /**
         * The specific pipeline to download from
         */
        pipelineId?: string;
        /**
         * The name of artifact to download.
         */
        artifactName?: string;
        /**
         * Path to download to
         */
        targetPath: string;
      };
    }
  | {
      /**
       * Download Pipeline Artifacts
       *
       * Download build and pipeline artifacts
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Download Pipeline Artifacts inputs
       */
      inputs?: {
        /**
         * Download artifacts produced by
         */
        buildType?: 'current' | 'specific';
        /**
         * Project
         */
        project?: string;
        /**
         * Build pipeline
         */
        definition?: string;
        /**
         * When appropriate, download artifacts from the triggering build.
         */
        specificBuildWithTriggering?: boolean;
        /**
         * Build version to download
         */
        buildVersionToDownload?: 'latest' | 'latestFromBranch' | 'specific';
        /**
         * Branch name
         */
        branchName?: string;
        /**
         * Build
         */
        pipelineId?: string;
        /**
         * Build Tags
         */
        tags?: string;
        /**
         * Download artifacts from partially succeeded builds.
         */
        allowPartiallySucceededBuilds?: boolean;
        /**
         * Download artifacts from failed builds.
         */
        allowFailedBuilds?: boolean;
        /**
         * Artifact name
         */
        artifactName?: string;
        /**
         * Matching patterns
         */
        itemPattern?: string;
        /**
         * Destination directory
         */
        targetPath?: string;
      };
    }
  | {
      /**
       * Download pipeline artifact
       *
       * Download a named artifact from a pipeline to a local path
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Download pipeline artifact inputs
       */
      inputs?: {
        /**
         * Download artifacts produced by
         */
        buildType?: 'current' | 'specific';
        /**
         * Project
         */
        project?: string;
        /**
         * Build pipeline
         */
        pipeline?: string;
        /**
         * When appropriate, download artifacts from the triggering build.
         */
        specificBuildWithTriggering?: boolean;
        /**
         * Build version to download
         */
        buildVersionToDownload?: 'latest' | 'latestFromBranch' | 'specific';
        /**
         * Branch name
         */
        branchName?: string;
        /**
         * Build
         */
        pipelineId?: string;
        /**
         * Build Tags
         */
        tags?: string;
        /**
         * Artifact name
         */
        artifactName?: string;
        /**
         * Matching pattern
         */
        itemPattern?: string;
        /**
         * Destination directory
         */
        targetPath?: string;
      };
    }
  | {
      /**
       * Use Python version
       *
       * Use the specified version of Python from the tool cache, optionally adding it to the PATH
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Use Python version inputs
       */
      inputs?: {
        /**
         * Version spec
         */
        versionSpec?: string;
        /**
         * Disable downloading releases from the GitHub registry
         */
        disableDownloadFromRegistry?: boolean;
        /**
         * Allow downloading unstable releases
         */
        allowUnstable?: boolean;
        /**
         * GitHub token for GitHub Actions python registry
         */
        githubToken?: string;
        /**
         * Add to PATH
         */
        addToPath?: boolean;
        /**
         * Architecture
         */
        architecture?: 'x86' | 'x64';
      };
    }
  | {
      /**
       * Service Fabric PowerShell
       *
       * Run a PowerShell script in the context of an Azure Service Fabric cluster connection
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Service Fabric PowerShell inputs
       */
      inputs: {
        /**
         * Cluster Service Connection
         */
        clusterConnection: string;
        /**
         * Script Type
         */
        ScriptType?: 'FilePath' | 'InlineScript';
        /**
         * Script Path
         */
        ScriptPath?: string;
        /**
         * Inline Script
         */
        Inline?: string;
        /**
         * Script Arguments
         */
        ScriptArguments?: string;
      };
    }
  | {
      /**
       * Visual Studio Test
       *
       * Run unit and functional tests (Selenium, Appium, Coded UI test, etc.) using the Visual Studio Test (VsTest) runner. Test frameworks that have a Visual Studio test adapter such as MsTest, xUnit, NUnit, Chutzpah (for JavaScript tests using QUnit, Mocha and Jasmine), etc. can be run. Tests can be distributed on multiple agents using this task (version 2 and later).
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Visual Studio Test inputs
       */
      inputs?: {
        /**
         * Select tests using
         */
        testSelector?: 'testAssemblies' | 'testPlan' | 'testRun';
        /**
         * Test files
         */
        testAssemblyVer2?: string;
        /**
         * Test plan
         */
        testPlan?: string;
        /**
         * Test suite
         */
        testSuite?: string;
        /**
         * Test configuration
         */
        testConfiguration?: string;
        /**
         * Test Run
         */
        tcmTestRun?: string;
        /**
         * Search folder
         */
        searchFolder?: string;
        /**
         * Test results folder
         */
        resultsFolder?: string;
        /**
         * Test filter criteria
         */
        testFiltercriteria?: string;
        /**
         * Run only impacted tests
         */
        runOnlyImpactedTests?: boolean;
        /**
         * Number of builds after which all tests should be run
         */
        runAllTestsAfterXBuilds?: string;
        /**
         * Test mix contains UI tests
         */
        uiTests?: boolean;
        /**
         * Select test platform using
         */
        vstestLocationMethod?: 'version' | 'location';
        /**
         * Test platform version
         */
        vsTestVersion?: 'latest' | '17.0' | '16.0' | '15.0' | '14.0' | 'toolsInstaller';
        /**
         * Path to vstest.console.exe
         */
        vstestLocation?: string;
        /**
         * Settings file
         */
        runSettingsFile?: string;
        /**
         * Override test run parameters
         */
        overrideTestrunParameters?: string;
        /**
         * Path to custom test adapters
         */
        pathtoCustomTestAdapters?: string;
        /**
         * Run tests in parallel on multi-core machines
         */
        runInParallel?: boolean;
        /**
         * Run tests in isolation
         */
        runTestsInIsolation?: boolean;
        /**
         * Code coverage enabled
         */
        codeCoverageEnabled?: boolean;
        /**
         * Other console options
         */
        otherConsoleOptions?: string;
        /**
         * Batch tests
         */
        distributionBatchType?: 'basedOnTestCases' | 'basedOnExecutionTime' | 'basedOnAssembly';
        /**
         * Batch options
         */
        batchingBasedOnAgentsOption?: 'autoBatchSize' | 'customBatchSize';
        /**
         * Number of tests per batch
         */
        customBatchSizeValue?: string;
        /**
         * Batch options
         */
        batchingBasedOnExecutionTimeOption?: 'autoBatchSize' | 'customTimeBatchSize';
        /**
         * Running time (sec) per batch
         */
        customRunTimePerBatchValue?: string;
        /**
         * Replicate tests instead of distributing when multiple agents are used in the job
         */
        dontDistribute?: boolean;
        /**
         * Test run title
         */
        testRunTitle?: string;
        /**
         * Build platform
         */
        platform?: string;
        /**
         * Build configuration
         */
        configuration?: string;
        /**
         * Upload test attachments
         */
        publishRunAttachments?: boolean;
        /**
         * Fail the task if a minimum number of tests are not run.
         */
        failOnMinTestsNotRun?: boolean;
        /**
         * Minimum # of tests
         */
        minimumExpectedTests?: string;
        /**
         * Collect advanced diagnostics in case of catastrophic failures
         */
        diagnosticsEnabled?: boolean;
        /**
         * Collect process dump and attach to test run report
         */
        collectDumpOn?: 'onAbortOnly' | 'always' | 'never';
        /**
         * Rerun failed tests
         */
        rerunFailedTests?: boolean;
        /**
         * Do not rerun if test failures exceed specified threshold
         */
        rerunType?: 'basedOnTestFailurePercentage' | 'basedOnTestFailureCount';
        /**
         * % failure
         */
        rerunFailedThreshold?: string;
        /**
         * # of failed tests
         */
        rerunFailedTestCasesMaxLimit?: string;
        /**
         * Maximum # of attempts
         */
        rerunMaxAttempts?: string;
      };
    }
  | {
      /**
       * Visual Studio Test
       *
       * Run unit and functional tests (Selenium, Appium, Coded UI test, etc.) using the Visual Studio Test (VsTest) runner. Test frameworks that have a Visual Studio test adapter such as MsTest, xUnit, NUnit, Chutzpah (for JavaScript tests using QUnit, Mocha and Jasmine), etc. can be run. Tests can be distributed on multiple agents using this task (version 2 and later).
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Visual Studio Test inputs
       */
      inputs?: {
        /**
         * Azure Resource Manager connection
         */
        azureSubscription?: string;
        /**
         * Select tests using
         */
        testSelector?: 'testAssemblies' | 'testPlan' | 'testRun';
        /**
         * Test files
         */
        testAssemblyVer2?: string;
        /**
         * Test plan
         */
        testPlan?: string;
        /**
         * Test suite
         */
        testSuite?: string;
        /**
         * Test configuration
         */
        testConfiguration?: string;
        /**
         * Test Run
         */
        tcmTestRun?: string;
        /**
         * Search folder
         */
        searchFolder?: string;
        /**
         * Test results folder
         */
        resultsFolder?: string;
        /**
         * Test filter criteria
         */
        testFiltercriteria?: string;
        /**
         * Run only impacted tests
         */
        runOnlyImpactedTests?: boolean;
        /**
         * Number of builds after which all tests should be run
         */
        runAllTestsAfterXBuilds?: string;
        /**
         * Test mix contains UI tests
         */
        uiTests?: boolean;
        /**
         * Select test platform using
         */
        vstestLocationMethod?: 'version' | 'location';
        /**
         * Test platform version
         */
        vsTestVersion?: 'latest' | '17.0' | '16.0' | '15.0' | '14.0' | 'toolsInstaller';
        /**
         * Path to vstest.console.exe
         */
        vstestLocation?: string;
        /**
         * Settings file
         */
        runSettingsFile?: string;
        /**
         * Override test run parameters
         */
        overrideTestrunParameters?: string;
        /**
         * Path to custom test adapters
         */
        pathtoCustomTestAdapters?: string;
        /**
         * Run tests in parallel on multi-core machines
         */
        runInParallel?: boolean;
        /**
         * Run tests in isolation
         */
        runTestsInIsolation?: boolean;
        /**
         * Code coverage enabled
         */
        codeCoverageEnabled?: boolean;
        /**
         * Other console options
         */
        otherConsoleOptions?: string;
        /**
         * Batch tests
         */
        distributionBatchType?: 'basedOnTestCases' | 'basedOnExecutionTime' | 'basedOnAssembly';
        /**
         * Batch options
         */
        batchingBasedOnAgentsOption?: 'autoBatchSize' | 'customBatchSize';
        /**
         * Number of tests per batch
         */
        customBatchSizeValue?: string;
        /**
         * Batch options
         */
        batchingBasedOnExecutionTimeOption?: 'autoBatchSize' | 'customTimeBatchSize';
        /**
         * Running time (sec) per batch
         */
        customRunTimePerBatchValue?: string;
        /**
         * Replicate tests instead of distributing when multiple agents are used in the job
         */
        dontDistribute?: boolean;
        /**
         * Test run title
         */
        testRunTitle?: string;
        /**
         * Build platform
         */
        platform?: string;
        /**
         * Build configuration
         */
        configuration?: string;
        /**
         * Custom Logger Configuration
         */
        customLoggerConfig?: string;
        /**
         * Upload test attachments
         */
        publishRunAttachments?: boolean;
        /**
         * Disable publishing test results
         */
        donotPublishTestResults?: boolean;
        /**
         * Fail the task if a minimum number of tests are not run.
         */
        failOnMinTestsNotRun?: boolean;
        /**
         * Minimum # of tests
         */
        minimumExpectedTests?: string;
        /**
         * Collect advanced diagnostics in case of catastrophic failures
         */
        diagnosticsEnabled?: boolean;
        /**
         * Collect process dump and attach to test run report
         */
        collectDumpOn?: 'onAbortOnly' | 'always' | 'never';
        /**
         * Rerun failed tests
         */
        rerunFailedTests?: boolean;
        /**
         * Do not rerun if test failures exceed specified threshold
         */
        rerunType?: 'basedOnTestFailurePercentage' | 'basedOnTestFailureCount';
        /**
         * % failure
         */
        rerunFailedThreshold?: string;
        /**
         * # of failed tests
         */
        rerunFailedTestCasesMaxLimit?: string;
        /**
         * Maximum # of attempts
         */
        rerunMaxAttempts?: string;
      };
    }
  | {
      /**
       * Visual Studio Test
       *
       * Run tests with Visual Studio test runner
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Visual Studio Test inputs
       */
      inputs?: {
        /**
         * Test Assembly
         */
        testAssembly?: string;
        /**
         * Test Filter criteria
         */
        testFiltercriteria?: string;
        /**
         * Run Settings File
         */
        runSettingsFile?: string;
        /**
         * Override TestRun Parameters
         */
        overrideTestrunParameters?: string;
        /**
         * Code Coverage Enabled
         */
        codeCoverageEnabled?: boolean;
        /**
         * Run In Parallel
         */
        runInParallel?: boolean;
        /**
         * VSTest
         */
        vstestLocationMethod?: 'version' | 'location';
        /**
         * VSTest version
         */
        vsTestVersion?: 'latest' | '14.0' | '12.0';
        /**
         * Path to vstest.console.exe
         */
        vstestLocation?: string;
        /**
         * Path to Custom Test Adapters
         */
        pathtoCustomTestAdapters?: string;
        /**
         * Other console options
         */
        otherConsoleOptions?: string;
        /**
         * Test Run Title
         */
        testRunTitle?: string;
        /**
         * Platform
         */
        platform?: string;
        /**
         * Configuration
         */
        configuration?: string;
        /**
         * Upload Test Attachments
         */
        publishRunAttachments?: boolean;
      };
    }
  | {
      /**
       * Manual validation
       *
       * Pause a pipeline run to wait for manual interaction. Works only with YAML pipelines.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Manual validation inputs
       */
      inputs: {
        /**
         * Notify users
         */
        notifyUsers: string;
        /**
         * Approvers
         */
        approvers?: string;
        /**
         * Allow approvers to approve their own run
         */
        allowApproversToApproveTheirOwnRuns?: boolean;
        /**
         * Instructions
         */
        instructions?: string;
        /**
         * On timeout
         */
        onTimeout?: 'reject' | 'resume';
      };
    }
  | {
      /**
       * Ant
       *
       * Build with Apache Ant
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Ant inputs
       */
      inputs?: {
        /**
         * Ant build file
         */
        buildFile?: string;
        /**
         * Options
         */
        options?: string;
        /**
         * Target(s)
         */
        targets?: string;
        /**
         * Publish to Azure Pipelines
         */
        publishJUnitResults?: boolean;
        /**
         * Test results files
         */
        testResultsFiles?: string;
        /**
         * Test run title
         */
        testRunTitle?: string;
        /**
         * Code coverage tool
         */
        codeCoverageToolOptions?: 'None' | 'Cobertura' | 'JaCoCo';
        /**
         * Class files directories
         */
        codeCoverageClassFilesDirectories?: string;
        /**
         * Class inclusion/exclusion filters
         */
        codeCoverageClassFilter?: string;
        /**
         * Source files directories
         */
        codeCoverageSourceDirectories?: string;
        /**
         * Fail when code coverage results are missing
         */
        codeCoverageFailIfEmpty?: boolean;
        /**
         * Set ANT_HOME path
         */
        antHomeDirectory?: string;
        /**
         * Set JAVA_HOME by
         */
        javaHomeOption?: 'JDKVersion' | 'Path';
        /**
         * JDK version
         */
        jdkVersionOption?: 'default' | '1.11' | '1.10' | '1.9' | '1.8' | '1.7' | '1.6';
        /**
         * JDK path
         */
        jdkUserInputDirectory?: string;
        /**
         * JDK architecture
         */
        jdkArchitectureOption?: 'x86' | 'x64';
      };
    }
  | {
      /**
       * Visual Studio test agent deployment
       *
       * Deprecated: Instead, use the 'Visual Studio Test' task to run unit and functional tests
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Visual Studio test agent deployment inputs
       */
      inputs: {
        /**
         * Machines
         */
        testMachines: string;
        /**
         * Admin login
         */
        adminUserName: string;
        /**
         * Admin password
         */
        adminPassword: string;
        /**
         * Protocol
         */
        winRmProtocol?: 'Http' | 'Https';
        /**
         * Test Certificate
         */
        testCertificate?: boolean;
        /**
         * Username
         */
        machineUserName: string;
        /**
         * Password
         */
        machinePassword: string;
        /**
         * Run UI tests
         */
        runAsProcess?: boolean;
        /**
         * Enable data collection only
         */
        isDataCollectionOnly?: boolean;
        /**
         * Test agent version
         */
        testPlatform?: '15.0' | '14.0';
        /**
         * Test agent location
         */
        agentLocation?: string;
        /**
         * Update test agent
         */
        updateTestAgent?: boolean;
      };
    }
  | {
      /**
       * Visual Studio Test Agent Deployment
       *
       * Deploy and configure Test Agent to run tests on a set of machines
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Visual Studio Test Agent Deployment inputs
       */
      inputs: {
        /**
         * Machines
         */
        testMachineGroup: string;
        /**
         * Admin Login
         */
        adminUserName?: string;
        /**
         * Admin Password
         */
        adminPassword?: string;
        /**
         * Protocol
         */
        winRmProtocol?: 'Http' | 'Https';
        /**
         * Test Certificate
         */
        testCertificate?: boolean;
        /**
         * Select Machines By
         */
        resourceFilteringMethod?: 'machineNames' | 'tags';
        /**
         * Filter Criteria
         */
        testMachines?: string;
        /**
         * Username
         */
        machineUserName: string;
        /**
         * Password
         */
        machinePassword: string;
        /**
         * Interactive Process
         */
        runAsProcess?: boolean;
        /**
         * Test Agent Location
         */
        agentLocation?: string;
        /**
         * Update Test Agent
         */
        updateTestAgent?: boolean;
        /**
         * Enable Data Collection Only
         */
        isDataCollectionOnly?: boolean;
      };
    }
  | {
      /**
       * Conda environment
       *
       * Create and activate a Conda environment
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Conda environment inputs
       */
      inputs: {
        /**
         * Environment name
         */
        environmentName: string;
        /**
         * Package specs
         */
        packageSpecs?: string;
        /**
         * Update to the latest Conda
         */
        updateConda?: boolean;
        /**
         * Environment creation options
         */
        createOptions?: string;
        /**
         * Clean the environment
         */
        cleanEnvironment?: boolean;
      };
    }
  | {
      /**
       * Conda environment
       *
       * This task is deprecated. Use `conda` directly in script to work with Anaconda environments.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Conda environment inputs
       */
      inputs?: {
        /**
         * Create a custom environment
         */
        createCustomEnvironment?: boolean;
        /**
         * Environment name
         */
        environmentName?: string;
        /**
         * Package specs
         */
        packageSpecs?: string;
        /**
         * Update to the latest Conda
         */
        updateConda?: boolean;
        /**
         * Other options for `conda install`
         */
        installOptions?: string;
        /**
         * Other options for `conda create`
         */
        createOptions?: string;
        /**
         * Clean the environment
         */
        cleanEnvironment?: boolean;
      };
    }
  | {
      /**
       * Batch script
       *
       * Run a Windows command or batch script and optionally allow it to change the environment
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Batch script inputs
       */
      inputs: {
        /**
         * Path
         */
        filename: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Modify Environment
         */
        modifyEnvironment?: boolean;
        /**
         * Working folder
         */
        workingFolder?: string;
        /**
         * Fail on Standard Error
         */
        failOnStandardError?: boolean;
      };
    }
  | {
      /**
       * Download Github Npm Package
       *
       * Install npm packages from GitHub.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Download Github Npm Package inputs
       */
      inputs: {
        /**
         * Package Name
         */
        packageName: string;
        /**
         * Package Version
         */
        version: string;
        /**
         * Credentials for registry from GitHub
         */
        externalRegistryCredentials: string;
        /**
         * Destination directory
         */
        installDirectory?: string;
      };
    }
  | {
      /**
       * Visual Studio build
       *
       * Build with MSBuild and set the Visual Studio version property
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Visual Studio build inputs
       */
      inputs?: {
        /**
         * Solution
         */
        solution?: string;
        /**
         * Visual Studio Version
         */
        vsVersion?: 'latest' | '17.0' | '16.0' | '15.0' | '14.0' | '12.0' | '11.0';
        /**
         * MSBuild Arguments
         */
        msbuildArgs?: string;
        /**
         * Platform
         */
        platform?: string;
        /**
         * Configuration
         */
        configuration?: string;
        /**
         * Clean
         */
        clean?: boolean;
        /**
         * Build in Parallel
         */
        maximumCpuCount?: boolean;
        /**
         * Restore NuGet Packages
         */
        restoreNugetPackages?: boolean;
        /**
         * MSBuild Architecture
         */
        msbuildArchitecture?: 'x86' | 'x64';
        /**
         * Record Project Details
         */
        logProjectEvents?: boolean;
        /**
         * Create Log File
         */
        createLogFile?: boolean;
        /**
         * Log File Verbosity
         */
        logFileVerbosity?: 'quiet' | 'minimal' | 'normal' | 'detailed' | 'diagnostic';
        /**
         * Enable Default Logger
         */
        enableDefaultLogger?: boolean;
        /**
         * Custom Version
         */
        customVersion?: string;
      };
    }
  | {
      /**
       * Azure Key Vault
       *
       * Download Azure Key Vault secrets
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Key Vault inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * Key vault
         */
        KeyVaultName: string;
        /**
         * Secrets filter
         */
        SecretsFilter?: string;
        /**
         * Make secrets available to whole job
         */
        RunAsPreJob?: boolean;
      };
    }
  | {
      /**
       * Use .NET Core
       *
       * Acquires a specific version of the .NET Core SDK from the internet or the local cache and adds it to the PATH. Use this task to change the version of .NET Core used in subsequent tasks. Additionally provides proxy support.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Use .NET Core inputs
       */
      inputs?: {
        /**
         * Package to install
         */
        packageType?: 'runtime' | 'sdk';
        /**
         * Use global json
         */
        useGlobalJson?: boolean;
        /**
         * Working Directory
         */
        workingDirectory?: string;
        /**
         * Version
         */
        version?: string;
        /**
         * Compatible Visual Studio version
         */
        vsVersion?: string;
        /**
         * Include Preview Versions
         */
        includePreviewVersions?: boolean;
        /**
         * Path To Install .Net Core
         */
        installationPath?: string;
        /**
         * Perform Multi Level Lookup
         */
        performMultiLevelLookup?: boolean;
        /**
         * Set timeout for package download request
         */
        requestTimeout?: number;
      };
    }
  | {
      /**
       * .NET Core SDK/runtime installer
       *
       * Acquire a specific version of the .NET Core SDK from the internet or local cache and add it to the PATH
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * .NET Core SDK/runtime installer inputs
       */
      inputs?: {
        /**
         * Package to install
         */
        packageType?: 'runtime' | 'sdk';
        /**
         * Version
         */
        version?: string;
      };
    }
  | {
      /**
       * .NET Core sdk/runtime installer
       *
       * Acquire a specific version of the .NET Core SDK from the internet or local cache and add it to the PATH
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * .NET Core sdk/runtime installer inputs
       */
      inputs?: {
        /**
         * Package to install
         */
        packageType?: 'runtime' | 'sdk';
        /**
         * Version
         */
        version?: string;
        /**
         * Include Preview Versions
         */
        includePreviewVersions?: boolean;
        /**
         * Path To Install .Net Core
         */
        installationPath?: string;
        /**
         * Perform Multi Level Lookup
         */
        performMultiLevelLookup?: boolean;
      };
    }
  | {
      /**
       * Azure App Configuration Import
       *
       * Import settings from configuration files into Azure App Configuration through build or deployment pipelines
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure App Configuration Import inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * App Configuration Endpoint
         */
        AppConfigurationEndpoint: string;
        /**
         * Configuration File Path
         */
        ConfigurationFile: string;
        /**
         * Use the file path extension to determine the file format
         */
        UseFilePathExtension?: boolean;
        /**
         * File Format
         */
        FileFormat?: 'json' | 'yaml' | 'properties';
        /**
         * File Content Profile
         */
        FileContentProfile?: 'appconfig/default' | 'appconfig/kvset';
        /**
         * Separator
         */
        Separator?: '.' | '/' | ':' | ';' | ',' | '-' | '_' | '__';
        /**
         * Depth
         */
        Depth?: string;
        /**
         * Prefix
         */
        Prefix?: string;
        /**
         * Label
         */
        Label?: string;
        /**
         * Content Type
         */
        ContentType?: string;
        /**
         * Tags
         */
        Tags?: string;
        /**
         * Exclude feature flags
         */
        ExcludeFeatureFlags?: boolean;
        /**
         * Delete key-values that are not included in the configuration file
         */
        Strict?: boolean;
        /**
         * Dry run
         */
        DryRun?: boolean;
        /**
         * Import Mode
         */
        ImportMode?: 'All' | 'Ignore-Match';
      };
    }
  | {
      /**
       * Azure App Service manage
       *
       * Start, stop, restart, slot swap, slot delete, install site extensions or enable continuous monitoring for an Azure App Service
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure App Service manage inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * Action
         */
        Action?:
          | 'Swap Slots'
          | 'Start Azure App Service'
          | 'Stop Azure App Service'
          | 'Restart Azure App Service'
          | 'Start Swap With Preview'
          | 'Complete Swap'
          | 'Cancel Swap'
          | 'Delete Slot'
          | 'Install Extensions'
          | 'Enable Continuous Monitoring'
          | 'Start all continuous webjobs'
          | 'Stop all continuous webjobs';
        /**
         * App Service name
         */
        WebAppName: string;
        /**
         * Specify Slot or App Service Environment
         */
        SpecifySlotOrASE?: boolean;
        /**
         * Resource group
         */
        ResourceGroupName?: string;
        /**
         * Source Slot
         */
        SourceSlot?: string;
        /**
         * Swap with Production
         */
        SwapWithProduction?: boolean;
        /**
         * Target Slot
         */
        TargetSlot?: string;
        /**
         * Preserve Vnet
         */
        PreserveVnet?: boolean;
        /**
         * Slot
         */
        Slot?: string;
        /**
         * Install Extensions
         */
        ExtensionsList?: string;
        /**
         * Output variable
         */
        OutputVariable?: string;
        /**
         * Resource Group name for Application Insights
         */
        AppInsightsResourceGroupName?: string;
        /**
         * Application Insights resource name
         */
        ApplicationInsightsResourceName?: string;
        /**
         * Application Insights web test name
         */
        ApplicationInsightsWebTestName?: string;
      };
    }
  | {
      /**
       * Kubelogin tool installer
       *
       * Helps to install kubelogin
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Kubelogin tool installer inputs
       */
      inputs?: {
        /**
         * kubelogin version
         */
        kubeloginVersion?: string;
        /**
         * GitHub Connection
         */
        gitHubConnection?: string;
      };
    }
  | {
      /**
       * Install Azure Func Core Tools
       *
       * Install Azure Func Core Tools
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Install Azure Func Core Tools inputs
       */
      inputs?: {
        /**
         * Version
         */
        version?: string;
      };
    }
  | {
      /**
       * File transform
       *
       * Replace tokens with variable values in XML or JSON configuration files
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * File transform inputs
       */
      inputs?: {
        /**
         * Package or folder
         */
        folderPath?: string;
        /**
         * XML transformation
         */
        enableXmlTransform?: boolean;
        /**
         * XML Transformation rules
         */
        xmlTransformationRules?: string;
        /**
         * JSON target files
         */
        jsonTargetFiles?: string;
        /**
         * XML target files
         */
        xmlTargetFiles?: string;
        /**
         * Error on empty files and invalid substitution.
         */
        errorOnInvalidSubstitution?: boolean;
      };
    }
  | {
      /**
       * File transform
       *
       * Replace tokens with variable values in XML or JSON configuration files
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * File transform inputs
       */
      inputs?: {
        /**
         * Package or folder
         */
        folderPath?: string;
        /**
         * XML transformation
         */
        enableXmlTransform?: boolean;
        /**
         * Transformation rules
         */
        xmlTransformationRules?: string;
        /**
         * File format
         */
        fileType?: 'xml' | 'json';
        /**
         * Target files
         */
        targetFiles?: string;
      };
    }
  | {
      /**
       * Extract files
       *
       * Extract a variety of archive and compression files such as .7z, .rar, .tar.gz, and .zip
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Extract files inputs
       */
      inputs: {
        /**
         * Archive file patterns
         */
        archiveFilePatterns?: string;
        /**
         * Destination folder
         */
        destinationFolder: string;
        /**
         * Clean destination folder before extracting
         */
        cleanDestinationFolder?: boolean;
        /**
         * Overwrite existing files
         */
        overwriteExistingFiles?: boolean;
        /**
         * Path to 7z utility
         */
        pathToSevenZipTool?: string;
      };
    }
  | {
      /**
       * Xamarin.Android
       *
       * Build an Android app with Xamarin
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Xamarin.Android inputs
       */
      inputs?: {
        /**
         * Project
         */
        projectFile?: string;
        /**
         * Target
         */
        target?: string;
        /**
         * Output directory
         */
        outputDirectory?: string;
        /**
         * Configuration
         */
        configuration?: string;
        /**
         * Create app package
         */
        createAppPackage?: boolean;
        /**
         * Clean
         */
        clean?: boolean;
        /**
         * MSBuild
         */
        msbuildLocationOption?: 'version' | 'location';
        /**
         * MSBuild version
         */
        msbuildVersionOption?: 'latest' | '17.0' | '16.0' | '15.0' | '14.0' | '12.0' | '4.0';
        /**
         * MSBuild location
         */
        msbuildFile?: string;
        /**
         * MSBuild architecture
         */
        msbuildArchitectureOption?: 'x86' | 'x64';
        /**
         * Additional arguments
         */
        msbuildArguments?: string;
        /**
         * Select JDK to use for the build
         */
        jdkOption?: 'JDKVersion' | 'Path';
        /**
         * JDK version
         */
        jdkVersionOption?: 'default' | '1.11' | '1.10' | '1.9' | '1.8' | '1.7' | '1.6';
        /**
         * JDK path
         */
        jdkDirectory?: string;
        /**
         * JDK architecture
         */
        jdkArchitectureOption?: 'x86' | 'x64';
      };
    }
  | {
      /**
       * Copy and Publish Build Artifacts
       *
       * [DEPRECATED] Use the Copy Files task and the Publish Build Artifacts task instead
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Copy and Publish Build Artifacts inputs
       */
      inputs: {
        /**
         * Copy Root
         */
        CopyRoot?: string;
        /**
         * Contents
         */
        Contents: string;
        /**
         * Artifact Name
         */
        ArtifactName: string;
        /**
         * Artifact Type
         */
        ArtifactType: 'Container' | 'FilePath';
        /**
         * Path
         */
        TargetPath?: string;
      };
    }
  | {
      /**
       * Download package
       *
       * Download a package from a package management feed in Azure Artifacts
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Download package inputs
       */
      inputs: {
        /**
         * Feed
         */
        feed: string;
        /**
         * Package
         */
        definition: string;
        /**
         * Version
         */
        version: string;
        /**
         * Destination directory
         */
        downloadPath?: string;
      };
    }
  | {
      /**
       * Download package
       *
       * Download a package from a package management feed in Azure Artifacts
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Download package inputs
       */
      inputs: {
        /**
         * Package Type
         */
        packageType?: 'maven' | 'npm' | 'nuget' | 'pypi' | 'upack' | 'cargo';
        /**
         * Feed
         */
        feed: string;
        /**
         * View
         */
        view?: string;
        /**
         * Package
         */
        definition: string;
        /**
         * Version
         */
        version: string;
        /**
         * Files
         */
        files?: string;
        /**
         * Extract package contents
         */
        extract?: boolean;
        /**
         * Destination directory
         */
        downloadPath?: string;
      };
    }
  | {
      /**
       * Azure Resource Group Deployment
       *
       * Deploy, start, stop, delete Azure Resource Groups
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Resource Group Deployment inputs
       */
      inputs?: {
        /**
         * Azure Connection Type
         */
        ConnectedServiceNameSelector?: 'ConnectedServiceName' | 'ConnectedServiceNameClassic';
        /**
         * Azure Subscription
         */
        ConnectedServiceName?: string;
        /**
         * Azure Classic Subscription
         */
        ConnectedServiceNameClassic?: string;
        /**
         * Action
         */
        action?:
          | 'Create Or Update Resource Group'
          | 'Select Resource Group'
          | 'Start'
          | 'Stop'
          | 'Restart'
          | 'Delete'
          | 'DeleteRG';
        /**
         * Action
         */
        actionClassic?: 'Select Resource Group';
        /**
         * Resource Group
         */
        resourceGroupName?: string;
        /**
         * Cloud Service
         */
        cloudService?: string;
        /**
         * Location
         */
        location?:
          | 'Australia East'
          | 'Australia Southeast'
          | 'Brazil South'
          | 'Canada Central'
          | 'Canada East'
          | 'Central India'
          | 'Central US'
          | 'East Asia'
          | 'East US'
          | 'East US 2 '
          | 'Japan East'
          | 'Japan West'
          | 'North Central US'
          | 'North Europe'
          | 'South Central US'
          | 'South India'
          | 'Southeast Asia'
          | 'UK South'
          | 'UK West'
          | 'West Central US'
          | 'West Europe'
          | 'West India'
          | 'West US'
          | 'West US 2';
        /**
         * Template
         */
        csmFile?: string;
        /**
         * Template Parameters
         */
        csmParametersFile?: string;
        /**
         * Override Template Parameters
         */
        overrideParameters?: string;
        /**
         * Deployment Mode
         */
        deploymentMode?: 'Validation' | 'Incremental' | 'Complete';
        /**
         * Enable Deployment Prerequisites
         */
        enableDeploymentPrerequisitesForCreate?: boolean;
        /**
         * Enable Deployment Prerequisites
         */
        enableDeploymentPrerequisitesForSelect?: boolean;
        /**
         * Resource Group
         */
        outputVariable?: string;
      };
    }
  | {
      /**
       * Azure resource group deployment
       *
       * Deploy an Azure Resource Manager (ARM) template to a resource group and manage virtual machines
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure resource group deployment inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * Action
         */
        action?:
          | 'Create Or Update Resource Group'
          | 'Select Resource Group'
          | 'Start'
          | 'Stop'
          | 'StopWithDeallocate'
          | 'Restart'
          | 'Delete'
          | 'DeleteRG';
        /**
         * Resource group
         */
        resourceGroupName: string;
        /**
         * Location
         */
        location?: string;
        /**
         * Template location
         */
        templateLocation?: 'Linked artifact' | 'URL of the file';
        /**
         * Template link
         */
        csmFileLink?: string;
        /**
         * Template parameters link
         */
        csmParametersFileLink?: string;
        /**
         * Template
         */
        csmFile?: string;
        /**
         * Template parameters
         */
        csmParametersFile?: string;
        /**
         * Override template parameters
         */
        overrideParameters?: string;
        /**
         * Deployment mode
         */
        deploymentMode?: 'Incremental' | 'Complete' | 'Validation';
        /**
         * Enable prerequisites
         */
        enableDeploymentPrerequisites?: 'None' | 'ConfigureVMwithWinRM' | 'ConfigureVMWithDGAgent';
        /**
         * Azure Pipelines service connection
         */
        teamServicesConnection?: string;
        /**
         * Team project
         */
        teamProject?: string;
        /**
         * Deployment Group
         */
        deploymentGroupName?: string;
        /**
         * Copy Azure VM tags to agents
         */
        copyAzureVMTags?: boolean;
        /**
         * Run agent service as a user
         */
        runAgentServiceAsUser?: boolean;
        /**
         * User name
         */
        userName?: string;
        /**
         * Password
         */
        password?: string;
        /**
         * VM details for WinRM
         */
        outputVariable?: string;
        /**
         * Deployment name
         */
        deploymentName?: string;
        /**
         * Deployment outputs
         */
        deploymentOutputs?: string;
        /**
         * Access service principal details in override parameters
         */
        addSpnToEnvironment?: boolean;
        /**
         * Use individual output values without JSON.Stringify applied
         */
        useWithoutJSON?: boolean;
      };
    }
  | {
      /**
       * ARM template deployment
       *
       * Deploy an Azure Resource Manager (ARM) template to all the deployment scopes
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * ARM template deployment inputs
       */
      inputs: {
        /**
         * Deployment scope
         */
        deploymentScope?: 'Management Group' | 'Subscription' | 'Resource Group';
        /**
         * Azure Resource Manager connection
         */
        azureResourceManagerConnection: string;
        /**
         * Subscription
         */
        subscriptionId?: string;
        /**
         * Action
         */
        action?: 'Create Or Update Resource Group' | 'DeleteRG';
        /**
         * Resource group
         */
        resourceGroupName?: string;
        /**
         * Location
         */
        location?: string;
        /**
         * Template location
         */
        templateLocation?: 'Linked artifact' | 'URL of the file';
        /**
         * Template link
         */
        csmFileLink?: string;
        /**
         * Template parameters link
         */
        csmParametersFileLink?: string;
        /**
         * Template
         */
        csmFile?: string;
        /**
         * Template parameters
         */
        csmParametersFile?: string;
        /**
         * Override template parameters
         */
        overrideParameters?: string;
        /**
         * Deployment mode
         */
        deploymentMode?: 'Incremental' | 'Complete' | 'Validation';
        /**
         * Deployment name
         */
        deploymentName?: string;
        /**
         * Deployment outputs
         */
        deploymentOutputs?: string;
        /**
         * Access service principal details in override parameters
         */
        addSpnToEnvironment?: boolean;
        /**
         * Use individual output values without JSON.Stringify applied
         */
        useWithoutJSON?: boolean;
      };
    }
  | {
      /**
       * Invoke REST API
       *
       * Invoke REST API as a part of your process.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Invoke REST API inputs
       */
      inputs: {
        /**
         * Generic endpoint
         */
        serviceConnection: string;
        /**
         * Method
         */
        method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'PATCH';
        /**
         * Headers
         */
        headers?: string;
        /**
         * Body
         */
        body?: string;
        /**
         * Url suffix string
         */
        urlSuffix?: string;
        /**
         * Complete based on
         */
        waitForCompletion?: 'true' | 'false';
        /**
         * Success criteria
         */
        successCriteria?: string;
      };
    }
  | {
      /**
       * Invoke REST API
       *
       * Invoke a REST API as a part of your pipeline.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Invoke REST API inputs
       */
      inputs?: {
        /**
         * Connection type
         */
        connectionType?: 'connectedServiceName' | 'connectedServiceNameARM';
        /**
         * Generic service connection
         */
        serviceConnection?: string;
        /**
         * Azure subscription
         */
        azureServiceConnection?: string;
        /**
         * Method
         */
        method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'PATCH';
        /**
         * Headers
         */
        headers?: string;
        /**
         * Body
         */
        body?: string;
        /**
         * URL suffix and parameters
         */
        urlSuffix?: string;
        /**
         * Completion event
         */
        waitForCompletion?: 'true' | 'false';
        /**
         * Success criteria
         */
        successCriteria?: string;
      };
    }
  | {
      /**
       * Archive Files
       *
       * Archive files using compression formats such as .7z, .rar, .tar.gz, and .zip.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Archive Files inputs
       */
      inputs?: {
        /**
         * Root folder (or file) to archive
         */
        rootFolder?: string;
        /**
         * Prefix root folder name to archive paths
         */
        includeRootFolder?: boolean;
        /**
         * Archive type
         */
        archiveType?: 'default' | '7z' | 'tar' | 'wim';
        /**
         * Tar compression
         */
        tarCompression?: 'gz' | 'bz2' | 'xz' | 'none';
        /**
         * Archive file to create
         */
        archiveFile?: string;
        /**
         * Replace existing archive
         */
        replaceExistingArchive?: boolean;
      };
    }
  | {
      /**
       * Archive files
       *
       * Compress files into .7z, .tar.gz, or .zip
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Archive files inputs
       */
      inputs?: {
        /**
         * Root folder or file to archive
         */
        rootFolderOrFile?: string;
        /**
         * Prepend root folder name to archive paths
         */
        includeRootFolder?: boolean;
        /**
         * Archive type
         */
        archiveType?: 'zip' | '7z' | 'tar' | 'wim';
        /**
         * 7z compression
         */
        sevenZipCompression?: 'ultra' | 'maximum' | 'normal' | 'fast' | 'fastest' | 'none';
        /**
         * Tar compression
         */
        tarCompression?: 'gz' | 'bz2' | 'xz' | 'none';
        /**
         * Archive file to create
         */
        archiveFile?: string;
        /**
         * Replace existing archive
         */
        replaceExistingArchive?: boolean;
        /**
         * Force verbose output
         */
        verbose?: boolean;
        /**
         * Force quiet output
         */
        quiet?: boolean;
      };
    }
  | {
      /**
       * GitHub Comment
       *
       * Write a comment to your Github entity i.e. issue or a Pull Request (PR)
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * GitHub Comment inputs
       */
      inputs: {
        /**
         * GitHub connection (OAuth or PAT)
         */
        gitHubConnection: string;
        /**
         * Repository
         */
        repositoryName?: string;
        /**
         * ID of the github pr/issue
         */
        id?: string;
        /**
         * Comment
         */
        comment?: string;
      };
    }
  | {
      /**
       * Copy files
       *
       * Copy files from a source folder to a target folder using patterns matching file paths (not folder paths)
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Copy files inputs
       */
      inputs: {
        /**
         * Source Folder
         */
        SourceFolder?: string;
        /**
         * Contents
         */
        Contents?: string;
        /**
         * Target Folder
         */
        TargetFolder: string;
        /**
         * Clean Target Folder
         */
        CleanTargetFolder?: boolean;
        /**
         * Overwrite
         */
        OverWrite?: boolean;
        /**
         * Flatten Folders
         */
        flattenFolders?: boolean;
        /**
         * Preserve Target Timestamp
         */
        preserveTimestamp?: boolean;
        /**
         * Retry count to copy the file
         */
        retryCount?: string;
        /**
         * Delay between two retries.
         */
        delayBetweenRetries?: string;
        /**
         * Ignore errors during creation of target folder.
         */
        ignoreMakeDirErrors?: boolean;
      };
    }
  | {
      /**
       * Copy Files
       *
       * Copy files from source folder to target folder using minimatch patterns (The minimatch patterns will only match file paths, not folder paths)
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Copy Files inputs
       */
      inputs: {
        /**
         * Source Folder
         */
        SourceFolder?: string;
        /**
         * Contents
         */
        Contents?: string;
        /**
         * Target Folder
         */
        TargetFolder: string;
        /**
         * Clean Target Folder
         */
        CleanTargetFolder?: boolean;
        /**
         * Overwrite
         */
        OverWrite?: boolean;
        /**
         * Flatten Folders
         */
        flattenFolders?: boolean;
      };
    }
  | {
      /**
       * Azure Database for MySQL deployment
       *
       * Run your scripts and make changes to your Azure Database for MySQL
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Database for MySQL deployment inputs
       */
      inputs: {
        /**
         * Azure Subscription
         */
        azureSubscription: string;
        /**
         * Host Name
         */
        ServerName: string;
        /**
         * Database Name
         */
        DatabaseName?: string;
        /**
         * Server Admin Login
         */
        SqlUsername: string;
        /**
         * Password
         */
        SqlPassword: string;
        /**
         * Type
         */
        TaskNameSelector?: 'SqlTaskFile' | 'InlineSqlTask';
        /**
         * MySQL Script
         */
        SqlFile?: string;
        /**
         * Inline MySQL Script
         */
        SqlInline?: string;
        /**
         * Additional MySQL Arguments
         */
        SqlAdditionalArguments?: string;
        /**
         * Specify Firewall Rules Using
         */
        IpDetectionMethod?: 'AutoDetect' | 'IPAddressRange';
        /**
         * Start IP Address
         */
        StartIpAddress?: string;
        /**
         * End IP Address
         */
        EndIpAddress?: string;
        /**
         * Delete Rule After Task Ends
         */
        DeleteFirewallRule?: boolean;
      };
    }
  | {
      /**
       * npm
       *
       * Install and publish npm packages, or run an npm command. Supports npmjs.com and authenticated registries like Azure Artifacts.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * npm inputs
       */
      inputs?: {
        /**
         * Command
         */
        command?: 'ci' | 'install' | 'publish' | 'custom';
        /**
         * Working folder that contains package.json
         */
        workingDir?: string;
        /**
         * Verbose logging
         */
        verbose?: boolean;
        /**
         * Command and arguments
         */
        customCommand?: string;
        /**
         * Registries to use
         */
        customRegistry?: 'useNpmrc' | 'useFeed';
        /**
         * Use packages from this Azure Artifacts/TFS registry
         */
        customFeed?: string;
        /**
         * Credentials for registries outside this organization/collection
         */
        customEndpoint?: string;
        /**
         * Registry location
         */
        publishRegistry?: 'useExternalRegistry' | 'useFeed';
        /**
         * Target registry
         */
        publishFeed?: string;
        /**
         * Publish pipeline metadata
         */
        publishPackageMetadata?: boolean;
        /**
         * External Registry
         */
        publishEndpoint?: string;
      };
    }
  | {
      /**
       * npm
       *
       * Run an npm command. Use NpmAuthenticate@0 task for latest capabilities.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * npm inputs
       */
      inputs?: {
        /**
         * working folder
         */
        cwd?: string;
        /**
         * npm command
         */
        command?: string;
        /**
         * arguments
         */
        arguments?: string;
      };
    }
  | {
      /**
       * Deploy Azure Static Web App
       *
       * [PREVIEW] Build and deploy an Azure Static Web App
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Deploy Azure Static Web App inputs
       */
      inputs?: {
        /**
         * Working directory
         */
        workingDirectory?: string;
        /**
         * App location
         */
        app_location?: string;
        /**
         * App build command
         */
        app_build_command?: string;
        /**
         * Output location
         */
        output_location?: string;
        /**
         * Api location
         */
        api_location?: string;
        /**
         * Api build command
         */
        api_build_command?: string;
        /**
         * Routes location
         */
        routes_location?: string;
        /**
         * Config file location
         */
        config_file_location?: string;
        /**
         * Skip app build
         */
        skip_app_build?: boolean;
        /**
         * Skip api build
         */
        skip_api_build?: boolean;
        /**
         * Set static export
         */
        is_static_export?: boolean;
        /**
         * Verbose
         */
        verbose?: boolean;
        /**
         * Build timeout in minutes
         */
        build_timeout_in_minutes?: number;
        /**
         * Azure Static Web Apps api token
         */
        azure_static_web_apps_api_token?: string;
        /**
         * Deployment Environment
         */
        deployment_environment?: string;
        /**
         * Production Branch
         */
        production_branch?: string;
        /**
         * Data api location
         */
        data_api_location?: string;
        /**
         * Azure Access Token
         */
        azure_access_token?: string;
        /**
         * Default Hostname
         */
        default_hostname?: string;
      };
    }
  | {
      /**
       * Node.js tool installer
       *
       * Finds or downloads and caches the specified version spec of Node.js and adds it to the PATH
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Node.js tool installer inputs
       */
      inputs?: {
        /**
         * Source of version
         */
        versionSource?: 'spec' | 'fromFile';
        /**
         * Version Spec
         */
        versionSpec?: string;
        /**
         * Path to the .nvmrc file
         */
        versionFilePath?: string;
        /**
         * Check for Latest Version
         */
        checkLatest?: boolean;
        /**
         * Use 32 bit version on x64 agents
         */
        force32bit?: boolean;
        /**
         * Set source for Node.js binaries
         */
        nodejsMirror?: string;
        /**
         * Set retry count when nodes downloads failed
         */
        retryCountOnDownloadFails?: string;
        /**
         * Set delay between retries
         */
        delayBetweenRetries?: string;
      };
    }
  | {
      /**
       * [Deprecated] SQL Server database deploy
       *
       * Deploy a SQL Server database using DACPAC
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * [Deprecated] SQL Server database deploy inputs
       */
      inputs: {
        /**
         * Machines
         */
        EnvironmentName: string;
        /**
         * Admin Login
         */
        AdminUserName?: string;
        /**
         * Password
         */
        AdminPassword?: string;
        /**
         * Protocol
         */
        Protocol?: 'Http' | 'Https';
        /**
         * Test Certificate
         */
        TestCertificate?: boolean;
        /**
         * DACPAC File
         */
        DacpacFile: string;
        /**
         * Specify SQL Using
         */
        TargetMethod?: 'server' | 'connectionString' | 'publishProfile';
        /**
         * Server Name
         */
        ServerName?: string;
        /**
         * Database Name
         */
        DatabaseName?: string;
        /**
         * SQL Username
         */
        SqlUsername?: string;
        /**
         * SQL Password
         */
        SqlPassword?: string;
        /**
         * Connection String
         */
        ConnectionString?: string;
        /**
         * Publish Profile
         */
        PublishProfile?: string;
        /**
         * Additional Arguments
         */
        AdditionalArguments?: string;
        /**
         * Deploy in Parallel
         */
        DeployInParallel?: boolean;
        /**
         * Select Machines By
         */
        ResourceFilteringMethod?: 'machineNames' | 'tags';
        /**
         * Deploy to Machines
         */
        MachineFilter?: string;
      };
    }
  | {
      /**
       * Visual Studio test platform installer
       *
       * Acquire the test platform from nuget.org or the tool cache. Satisfies the ‘vstest’ demand and can be used for running tests and collecting diagnostic data using the Visual Studio Test task.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Visual Studio test platform installer inputs
       */
      inputs?: {
        /**
         * Package Feed
         */
        packageFeedSelector?: 'nugetOrg' | 'customFeed' | 'netShare';
        /**
         * Version
         */
        versionSelector?: 'latestPreRelease' | 'latestStable' | 'specificVersion';
        /**
         * Test Platform Version
         */
        testPlatformVersion?: string;
        /**
         * Package Source
         */
        customFeed?: string;
        /**
         * User Name
         */
        username?: string;
        /**
         * Password
         */
        password?: string;
        /**
         * UNC Path
         */
        netShare?: string;
      };
    }
  | {
      /**
       * Publish To Azure Service Bus
       *
       * Sends a message to Azure Service Bus using a service connection (no agent is required)
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Publish To Azure Service Bus inputs
       */
      inputs: {
        /**
         * Azure Service Bus service connection
         */
        azureSubscription: string;
        /**
         * Message body
         */
        messageBody?: string;
        /**
         * Session Id
         */
        sessionId?: string;
        /**
         * Sign the Message
         */
        signPayload?: boolean;
        /**
         * Certificate Variable
         */
        certificateString?: string;
        /**
         * Signature Property Key
         */
        signatureKey?: string;
        /**
         * Wait for task completion
         */
        waitForCompletion?: boolean;
        /**
         * Use .NET data contract serializer
         */
        useDataContractSerializer?: boolean;
      };
    }
  | {
      /**
       * Publish To Azure Service Bus
       *
       * Sends a message to Azure Service Bus using an Azure Resource Manager service connection (no agent is required)
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Publish To Azure Service Bus inputs
       */
      inputs: {
        /**
         * Azure Resource Manager service connection
         */
        azureSubscription: string;
        /**
         * Azure Service Bus Queue name
         */
        serviceBusQueueName: string;
        /**
         * Azure Service Bus Namespace
         */
        serviceBusNamespace: string;
        /**
         * Message body
         */
        messageBody?: string;
        /**
         * Session Id
         */
        sessionId?: string;
        /**
         * Sign the Message
         */
        signPayload?: boolean;
        /**
         * Certificate Variable
         */
        certificateString?: string;
        /**
         * Signature Property Key
         */
        signatureKey?: string;
        /**
         * Wait for task completion
         */
        waitForCompletion?: boolean;
        /**
         * Use .NET data contract serializer
         */
        useDataContractSerializer?: boolean;
      };
    }
  | {
      /**
       * Publish To Azure Service Bus
       *
       * Sends a message to azure service bus using a service connection (no agent required).
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Publish To Azure Service Bus inputs
       */
      inputs: {
        /**
         * Azure service bus connection
         */
        azureSubscription: string;
        /**
         * Message body
         */
        messageBody?: string;
        /**
         * Wait for task completion
         */
        waitForCompletion?: boolean;
      };
    }
  | {
      /**
       * Deploy to Kubernetes
       *
       * Use Kubernetes manifest files to deploy to clusters or even bake the manifest files to be used for deployments using Helm charts
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Deploy to Kubernetes inputs
       */
      inputs?: {
        /**
         * Action
         */
        action?: 'bake' | 'createSecret' | 'delete' | 'deploy' | 'patch' | 'promote' | 'scale' | 'reject';
        /**
         * Kubernetes service connection
         */
        kubernetesServiceConnection?: string;
        /**
         * Namespace
         */
        namespace?: string;
        /**
         * Strategy
         */
        strategy?: 'canary' | 'none';
        /**
         * Traffic split method
         */
        trafficSplitMethod?: 'pod' | 'smi';
        /**
         * Percentage
         */
        percentage?: string;
        /**
         * Baseline and canary replicas
         */
        baselineAndCanaryReplicas?: string;
        /**
         * Manifests
         */
        manifests?: string;
        /**
         * Containers
         */
        containers?: string;
        /**
         * ImagePullSecrets
         */
        imagePullSecrets?: string;
        /**
         * Render Engine
         */
        renderType?: 'helm' | 'kompose' | 'kustomize';
        /**
         * Path to docker compose file
         */
        dockerComposeFile?: string;
        /**
         * Helm Chart
         */
        helmChart?: string;
        /**
         * Helm Release Name
         */
        releaseName?: string;
        /**
         * Override Files
         */
        overrideFiles?: string;
        /**
         * Overrides
         */
        overrides?: string;
        /**
         * Kustomization Path
         */
        kustomizationPath?: string;
        /**
         * Resource to patch
         */
        resourceToPatch?: 'file' | 'name';
        /**
         * File path
         */
        resourceFileToPatch?: string;
        /**
         * Kind
         */
        kind?: 'deployment' | 'replicaset' | 'statefulset';
        /**
         * Name
         */
        name?: string;
        /**
         * Replica count
         */
        replicas?: string;
        /**
         * Merge Strategy
         */
        mergeStrategy?: 'json' | 'merge' | 'strategic';
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Patch
         */
        patch?: string;
        /**
         * Type of secret
         */
        secretType?: 'dockerRegistry' | 'generic';
        /**
         * Secret name
         */
        secretName?: string;
        /**
         * Arguments
         */
        secretArguments?: string;
        /**
         * Docker registry service connection
         */
        dockerRegistryEndpoint?: string;
        /**
         * Timeout for rollout status
         */
        rolloutStatusTimeout?: string;
      };
    }
  | {
      /**
       * Deploy to Kubernetes
       *
       * Use Kubernetes manifest files to deploy to clusters or even bake the manifest files to be used for deployments using Helm charts
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Deploy to Kubernetes inputs
       */
      inputs?: {
        /**
         * Action
         */
        action?: 'bake' | 'createSecret' | 'delete' | 'deploy' | 'patch' | 'promote' | 'scale' | 'reject';
        /**
         * Service connection type
         */
        connectionType?: 'azureResourceManager' | 'kubernetesServiceConnection';
        /**
         * Kubernetes service connection
         */
        kubernetesServiceConnection?: string;
        /**
         * Azure subscription
         */
        azureSubscriptionConnection?: string;
        /**
         * Resource group
         */
        azureResourceGroup?: string;
        /**
         * Kubernetes cluster
         */
        kubernetesCluster?: string;
        /**
         * Use cluster admin credentials
         */
        useClusterAdmin?: boolean;
        /**
         * Namespace
         */
        namespace?: string;
        /**
         * Strategy
         */
        strategy?: 'canary' | 'none';
        /**
         * Traffic split method
         */
        trafficSplitMethod?: 'pod' | 'smi';
        /**
         * Percentage
         */
        percentage?: string;
        /**
         * Baseline and canary replicas
         */
        baselineAndCanaryReplicas?: string;
        /**
         * Manifests
         */
        manifests?: string;
        /**
         * Containers
         */
        containers?: string;
        /**
         * ImagePullSecrets
         */
        imagePullSecrets?: string;
        /**
         * Render Engine
         */
        renderType?: 'helm' | 'kompose' | 'kustomize';
        /**
         * Path to docker compose file
         */
        dockerComposeFile?: string;
        /**
         * Helm Chart
         */
        helmChart?: string;
        /**
         * Helm Release Name
         */
        releaseName?: string;
        /**
         * Override Files
         */
        overrideFiles?: string;
        /**
         * Overrides
         */
        overrides?: string;
        /**
         * Kustomization Path
         */
        kustomizationPath?: string;
        /**
         * Resource to patch
         */
        resourceToPatch?: 'file' | 'name';
        /**
         * File path
         */
        resourceFileToPatch?: string;
        /**
         * Kind
         */
        kind?: 'deployment' | 'replicaset' | 'statefulset';
        /**
         * Name
         */
        name?: string;
        /**
         * Replica count
         */
        replicas?: string;
        /**
         * Merge Strategy
         */
        mergeStrategy?: 'json' | 'merge' | 'strategic';
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Patch
         */
        patch?: string;
        /**
         * Type of secret
         */
        secretType?: 'dockerRegistry' | 'generic';
        /**
         * Secret name
         */
        secretName?: string;
        /**
         * Arguments
         */
        secretArguments?: string;
        /**
         * Docker registry service connection
         */
        dockerRegistryEndpoint?: string;
        /**
         * Timeout for rollout status
         */
        rolloutStatusTimeout?: string;
        /**
         * Resource type
         */
        resourceType?: string;
      };
    }
  | {
      /**
       * Download build artifacts
       *
       * Download files that were saved as artifacts of a completed build
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Download build artifacts inputs
       */
      inputs?: {
        /**
         * Download artifacts produced by
         */
        buildType?: 'current' | 'specific';
        /**
         * Project
         */
        project?: string;
        /**
         * Build pipeline
         */
        pipeline?: string;
        /**
         * When appropriate, download artifacts from the triggering build.
         */
        specificBuildWithTriggering?: boolean;
        /**
         * Build version to download
         */
        buildVersionToDownload?: 'latest' | 'latestFromBranch' | 'specific';
        /**
         * Download artifacts even from partially succeeded builds.
         */
        allowPartiallySucceededBuilds?: boolean;
        /**
         * Branch name
         */
        branchName?: string;
        /**
         * Build
         */
        buildId?: string;
        /**
         * Build Tags
         */
        tags?: string;
        /**
         * Download type
         */
        downloadType?: 'single' | 'specific';
        /**
         * Artifact name
         */
        artifactName?: string;
        /**
         * Matching pattern
         */
        itemPattern?: string;
        /**
         * Destination directory
         */
        downloadPath?: string;
        /**
         * Clean destination folder
         */
        cleanDestinationFolder?: boolean;
        /**
         * Parallelization limit
         */
        parallelizationLimit?: string;
        /**
         * Check downloaded files
         */
        checkDownloadedFiles?: boolean;
        /**
         * Retry count
         */
        retryDownloadCount?: string;
        /**
         * Retry count for redirect download
         */
        retryRedirectDownloadCount?: string;
        /**
         * Extract all files that are stored inside tar archives
         */
        extractTars?: boolean;
      };
    }
  | {
      /**
       * Download build artifacts
       *
       * Download files that were saved as artifacts of a completed build
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Download build artifacts inputs
       */
      inputs?: {
        /**
         * Download artifacts produced by
         */
        buildType?: 'current' | 'specific';
        /**
         * Project
         */
        project?: string;
        /**
         * Build pipeline
         */
        pipeline?: string;
        /**
         * When appropriate, download artifacts from the triggering build.
         */
        specificBuildWithTriggering?: boolean;
        /**
         * Build version to download
         */
        buildVersionToDownload?: 'latest' | 'latestFromBranch' | 'specific';
        /**
         * Download artifacts even from partially succeeded builds.
         */
        allowPartiallySucceededBuilds?: boolean;
        /**
         * Branch name
         */
        branchName?: string;
        /**
         * Build
         */
        buildId?: string;
        /**
         * Build Tags
         */
        tags?: string;
        /**
         * Download type
         */
        downloadType?: 'single' | 'specific';
        /**
         * Artifact name
         */
        artifactName?: string;
        /**
         * Matching pattern
         */
        itemPattern?: string;
        /**
         * Destination directory
         */
        downloadPath?: string;
        /**
         * Clean destination folder
         */
        cleanDestinationFolder?: boolean;
        /**
         * Parallelization limit
         */
        parallelizationLimit?: string;
        /**
         * Check downloaded files
         */
        checkDownloadedFiles?: boolean;
        /**
         * Retry count
         */
        retryDownloadCount?: string;
        /**
         * Extract all files that are stored inside tar archives
         */
        extractTars?: boolean;
      };
    }
  | {
      /**
       * CocoaPods
       *
       * Install CocoaPods dependencies for Swift and Objective-C Cocoa projects
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * CocoaPods inputs
       */
      inputs?: {
        /**
         * Working directory
         */
        workingDirectory?: string;
        /**
         * Force repo update
         */
        forceRepoUpdate?: boolean;
        /**
         * Project directory
         */
        projectDirectory?: string;
      };
    }
  | {
      /**
       * Azure Spring Apps
       *
       * Deploy applications to Azure Spring Apps and manage deployments.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Spring Apps inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * Action
         */
        Action?: 'Deploy' | 'Set Production' | 'Delete Staging Deployment';
        /**
         * Azure Spring Apps Name
         */
        AzureSpringCloud: string;
        /**
         * App
         */
        AppName: string;
        /**
         * Deployment Type
         */
        DeploymentType?: 'Artifacts' | 'CustomContainer';
        /**
         * Use Staging Deployment
         */
        UseStagingDeployment?: boolean;
        /**
         * Create a new staging deployment if one does not exist.
         */
        CreateNewDeployment?: boolean;
        /**
         * Deployment
         */
        DeploymentName?: string;
        /**
         * Package or folder
         */
        Package?: string;
        /**
         * Builder
         */
        Builder?: string;
        /**
         * Registry Server
         */
        RegistryServer?: string;
        /**
         * Registry Username
         */
        RegistryUsername?: string;
        /**
         * Registry Password
         */
        RegistryPassword?: string;
        /**
         * Image Name and Tag
         */
        ImageName?: string;
        /**
         * Image Command
         */
        ImageCommand?: string;
        /**
         * Image Arguments
         */
        ImageArgs?: string;
        /**
         * Language Framework
         */
        ImageLanguageFramework?: 'springboot' | '';
        /**
         * Environment Variables
         */
        EnvironmentVariables?: string;
        /**
         * JVM Options
         */
        JvmOptions?: string;
        /**
         * Runtime Version
         */
        RuntimeVersion?: 'Java_8' | 'Java_11' | 'Java_17' | 'Java_21' | 'NetCore_31';
        /**
         * Main Entry Path
         */
        DotNetCoreMainEntryPath?: string;
        /**
         * Version
         */
        Version?: string;
      };
    }
  | {
      /**
       * Azure Web App
       *
       * Deploy an Azure Web App for Linux or Windows
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Web App inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * App type
         */
        appType: 'webApp' | 'webAppLinux';
        /**
         * App name
         */
        appName: string;
        /**
         * Deploy to Slot or App Service Environment
         */
        deployToSlotOrASE?: boolean;
        /**
         * Resource group
         */
        resourceGroupName?: string;
        /**
         * Slot
         */
        slotName?: string;
        /**
         * Package or folder
         */
        package?: string;
        /**
         * Custom Deploy Folder
         */
        customDeployFolder?: string;
        /**
         * Runtime stack
         */
        runtimeStack?:
          | 'DOTNETCORE|9.0'
          | 'DOTNETCORE|8.0'
          | 'DOTNETCORE|7.0'
          | 'DOTNETCORE|6.0'
          | 'NODE|22-lts'
          | 'NODE|20-lts'
          | 'NODE|18-lts'
          | 'NODE|16-lts'
          | 'PYTHON|3.13'
          | 'PYTHON|3.12'
          | 'PYTHON|3.11'
          | 'PYTHON|3.10'
          | 'PYTHON|3.9'
          | 'PYTHON|3.8'
          | 'PHP|8.3'
          | 'PHP|8.2'
          | 'PHP|8.1'
          | 'PHP|8.0'
          | 'JAVA|21-java21'
          | 'JAVA|17-java17'
          | 'JAVA|11-java11'
          | 'JAVA|8-jre8'
          | 'JBOSSEAP|8-java17'
          | 'JBOSSEAP|8-java11'
          | 'JBOSSEAP|7-java17'
          | 'JBOSSEAP|7-java11'
          | 'JBOSSEAP|7-java8'
          | 'TOMCAT|10.1-java21'
          | 'TOMCAT|10.1-java17'
          | 'TOMCAT|10.1-java11'
          | 'TOMCAT|10.0-java17'
          | 'TOMCAT|10.0-java11'
          | 'TOMCAT|10.0-jre8'
          | 'TOMCAT|9.0-java21'
          | 'TOMCAT|9.0-java17'
          | 'TOMCAT|9.0-java11'
          | 'TOMCAT|9.0-jre8'
          | 'TOMCAT|8.5-java11'
          | 'TOMCAT|8.5-jre8';
        /**
         * Startup command
         */
        startUpCommand?: string;
        /**
         * Generate web.config parameters for Python, Node.js, Go and Java apps
         */
        customWebConfig?: string;
        /**
         * App settings
         */
        appSettings?: string;
        /**
         * Configuration settings
         */
        configurationStrings?: string;
        /**
         * Deployment method
         */
        deploymentMethod?: 'auto' | 'zipDeploy' | 'runFromPackage';
      };
    }
  | {
      /**
       * Azure CLI
       *
       * Run Azure CLI commands against an Azure subscription in a Shell script when running on Linux agent or Batch script when running on Windows agent.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure CLI inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * Script Location
         */
        scriptLocation?: 'inlineScript' | 'scriptPath';
        /**
         * Script Path
         */
        scriptPath?: string;
        /**
         * Inline Script
         */
        inlineScript?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Access service principal details in script
         */
        addSpnToEnvironment?: boolean;
        /**
         * Use global Azure CLI configuration
         */
        useGlobalConfig?: boolean;
        /**
         * Working Directory
         */
        workingDirectory?: string;
        /**
         * Fail on Standard Error
         */
        failOnStandardError?: boolean;
      };
    }
  | {
      /**
       * Azure CLI
       *
       * Run Azure CLI commands against an Azure subscription in a PowerShell Core/Shell script when running on Linux agent or PowerShell/PowerShell Core/Batch script when running on Windows agent.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure CLI inputs
       */
      inputs: {
        /**
         * Azure Resource Manager connection
         */
        azureSubscription: string;
        /**
         * Script Type
         */
        scriptType: 'ps' | 'pscore' | 'batch' | 'bash';
        /**
         * Script Location
         */
        scriptLocation?: 'inlineScript' | 'scriptPath';
        /**
         * Script Path
         */
        scriptPath?: string;
        /**
         * Inline Script
         */
        inlineScript?: string;
        /**
         * Script Arguments
         */
        arguments?: string;
        /**
         * ErrorActionPreference
         */
        powerShellErrorActionPreference?: 'stop' | 'continue' | 'silentlyContinue';
        /**
         * Access service principal details in script
         */
        addSpnToEnvironment?: boolean;
        /**
         * Use global Azure CLI configuration
         */
        useGlobalConfig?: boolean;
        /**
         * Working Directory
         */
        workingDirectory?: string;
        /**
         * Fail on Standard Error
         */
        failOnStandardError?: boolean;
        /**
         * Ignore $LASTEXITCODE
         */
        powerShellIgnoreLASTEXITCODE?: boolean;
        /**
         * az login output visibility
         */
        visibleAzLogin?: boolean;
        /**
         * [Experimental] Keep Azure CLI session active
         */
        keepAzSessionActive?: boolean;
      };
    }
  | {
      /**
       * Azure CLI Preview
       *
       * Run a Shell or Batch script with Azure CLI commands against an azure subscription
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure CLI Preview inputs
       */
      inputs?: {
        /**
         * Azure Connection Type
         */
        connectedServiceNameSelector?: 'connectedServiceName' | 'connectedServiceNameARM';
        /**
         * AzureRM Subscription
         */
        connectedServiceNameARM?: string;
        /**
         * Azure Classic Subscription
         */
        connectedServiceName?: string;
        /**
         * Script Location
         */
        scriptLocation?: 'inlineScript' | 'scriptPath';
        /**
         * Script Path
         */
        scriptPath?: string;
        /**
         * Inline Script
         */
        inlineScript?: string;
        /**
         * Arguments
         */
        args?: string;
        /**
         * Working Directory
         */
        cwd?: string;
        /**
         * Fail on Standard Error
         */
        failOnStandardError?: boolean;
      };
    }
  | {
      /**
       * GitHub Release
       *
       * Create, edit, or delete a GitHub release
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * GitHub Release inputs
       */
      inputs: {
        /**
         * GitHub connection (OAuth or PAT)
         */
        gitHubConnection: string;
        /**
         * Repository
         */
        repositoryName?: string;
        /**
         * Action
         */
        action?: 'create' | 'edit' | 'delete';
        /**
         * Target
         */
        target?: string;
        /**
         * Tag source
         */
        tagSource?: 'gitTag' | 'userSpecifiedTag';
        /**
         * Tag Pattern
         */
        tagPattern?: string;
        /**
         * Tag
         */
        tag?: string;
        /**
         * Release title
         */
        title?: string;
        /**
         * Release notes source
         */
        releaseNotesSource?: 'filePath' | 'inline';
        /**
         * Release notes file path
         */
        releaseNotesFilePath?: string;
        /**
         * Release notes
         */
        releaseNotesInline?: string;
        /**
         * Assets
         */
        assets?: string;
        /**
         * Asset upload mode
         */
        assetUploadMode?: 'delete' | 'replace';
        /**
         * Draft release
         */
        isDraft?: boolean;
        /**
         * Pre-release
         */
        isPreRelease?: boolean;
        /**
         * Add changelog
         */
        addChangeLog?: boolean;
        /**
         * Compare to
         */
        changeLogCompareToRelease?: 'lastFullRelease' | 'lastNonDraftRelease' | 'lastNonDraftReleaseByTag';
        /**
         * Release Tag
         */
        changeLogCompareToReleaseTag?: string;
        /**
         * Changelog type
         */
        changeLogType?: 'commitBased' | 'issueBased';
        /**
         * Categories
         */
        changeLogLabels?: string;
      };
    }
  | {
      /**
       * GitHub Release
       *
       * Create, edit, or delete a GitHub release
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * GitHub Release inputs
       */
      inputs: {
        /**
         * GitHub connection (OAuth or PAT)
         */
        gitHubConnection: string;
        /**
         * Repository
         */
        repositoryName?: string;
        /**
         * Action
         */
        action?: 'create' | 'edit' | 'delete';
        /**
         * Target
         */
        target?: string;
        /**
         * Tag source
         */
        tagSource?: 'auto' | 'manual';
        /**
         * Tag Pattern
         */
        tagPattern?: string;
        /**
         * Tag
         */
        tag?: string;
        /**
         * Release title
         */
        title?: string;
        /**
         * Release notes source
         */
        releaseNotesSource?: 'file' | 'input';
        /**
         * Release notes file path
         */
        releaseNotesFile?: string;
        /**
         * Release notes
         */
        releaseNotes?: string;
        /**
         * Assets
         */
        assets?: string;
        /**
         * Asset upload mode
         */
        assetUploadMode?: 'delete' | 'replace';
        /**
         * Draft release
         */
        isDraft?: boolean;
        /**
         * Pre-release
         */
        isPreRelease?: boolean;
        /**
         * Add changelog
         */
        addChangeLog?: boolean;
        /**
         * Compare to
         */
        changeLogCompareToRelease?: 'lastFullRelease' | 'lastNonDraftRelease' | 'lastNonDraftReleaseByTag';
        /**
         * Release Tag
         */
        changeLogCompareToReleaseTag?: string;
        /**
         * Changelog type
         */
        changeLogType?: 'commitBased' | 'issueBased';
        /**
         * Categories
         */
        changeLogLabels?: string;
      };
    }
  | {
      /**
       * cURL Upload Files
       *
       * Use cURL to upload files with FTP, FTPS, SFTP, HTTP, and more.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * cURL Upload Files inputs
       */
      inputs: {
        /**
         * Files
         */
        files: string;
        /**
         * Username
         */
        username?: string;
        /**
         * Password
         */
        password?: string;
        /**
         * URL
         */
        url: string;
        /**
         * Optional Arguments
         */
        options?: string;
        /**
         * Redirect Standard Error to Standard Out
         */
        redirectStderr?: boolean;
      };
    }
  | {
      /**
       * cURL upload files
       *
       * Use cURL's supported protocols to upload files
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * cURL upload files inputs
       */
      inputs: {
        /**
         * Files
         */
        files: string;
        /**
         * Authentication Method
         */
        authType?: 'ServiceEndpoint' | 'UserAndPass';
        /**
         * Service Connection
         */
        serviceEndpoint?: string;
        /**
         * Username
         */
        username?: string;
        /**
         * Password
         */
        password?: string;
        /**
         * URL
         */
        url?: string;
        /**
         * Remote Directory
         */
        remotePath?: string;
        /**
         * Optional Arguments
         */
        options?: string;
        /**
         * Redirect Standard Error to Standard Out
         */
        redirectStderr?: boolean;
      };
    }
  | {
      /**
       * Azure App Service Settings
       *
       * Update/Add App settings an Azure Web App for Linux or Windows
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure App Service Settings inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * App Service name
         */
        appName: string;
        /**
         * Resource group
         */
        resourceGroupName: string;
        /**
         * Slot
         */
        slotName?: string;
        /**
         * App settings
         */
        appSettings?: string;
        /**
         * General settings
         */
        generalSettings?: string;
        /**
         * Connection Strings
         */
        connectionStrings?: string;
      };
    }
  | {
      /**
       * Universal packages
       *
       * Download or publish Universal Packages
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Universal packages inputs
       */
      inputs?: {
        /**
         * Command
         */
        command?: 'download' | 'publish';
        /**
         * Destination directory
         */
        downloadDirectory?: string;
        /**
         * Feed location
         */
        feedsToUse?: 'internal' | 'external';
        /**
         * organization/collection connection
         */
        externalFeedCredentials?: string;
        /**
         * Feed
         */
        vstsFeed?: string;
        /**
         * Package name
         */
        vstsFeedPackage?: string;
        /**
         * Version
         */
        vstsPackageVersion?: string;
        /**
         * Feed (or Project/Feed if the feed was created in a project)
         */
        feedDownloadExternal?: string;
        /**
         * Package name
         */
        packageDownloadExternal?: string;
        /**
         * Version
         */
        versionDownloadExternal?: string;
        /**
         * Path to file(s) to publish
         */
        publishDirectory?: string;
        /**
         * Feed location
         */
        feedsToUsePublish?: 'internal' | 'external';
        /**
         * organization/collection connection
         */
        publishFeedCredentials?: string;
        /**
         * Destination Feed
         */
        vstsFeedPublish?: string;
        /**
         * Publish pipeline metadata
         */
        publishPackageMetadata?: boolean;
        /**
         * Package name
         */
        vstsFeedPackagePublish?: string;
        /**
         * Feed (or Project/Feed if the feed was created in a project)
         */
        feedPublishExternal?: string;
        /**
         * Package name
         */
        packagePublishExternal?: string;
        /**
         * Version
         */
        versionOption?: 'major' | 'minor' | 'patch' | 'custom';
        /**
         * Custom version
         */
        versionPublish?: string;
        /**
         * Description
         */
        packagePublishDescription?: string;
        /**
         * Verbosity
         */
        verbosity?: 'None' | 'Trace' | 'Debug' | 'Information' | 'Warning' | 'Error' | 'Critical';
        /**
         * Package Output Variable
         */
        publishedPackageVar?: string;
      };
    }
  | {
      /**
       * Check Azure Policy compliance
       *
       * Security and compliance assessment for Azure Policy
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Check Azure Policy compliance inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * Resource group
         */
        ResourceGroupName?: string;
        /**
         * Resource name
         */
        Resources?: string;
        /**
         * Retry duration
         */
        RetryDuration?: string;
      };
    }
  | {
      /**
       * Azure Function on Kubernetes
       *
       * Deploy Azure function to Kubernetes cluster.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Function on Kubernetes inputs
       */
      inputs: {
        /**
         * Docker registry service connection
         */
        dockerRegistryServiceConnection: string;
        /**
         * Kubernetes service connection
         */
        kubernetesServiceConnection: string;
        /**
         * Kubernetes namespace
         */
        namespace?: string;
        /**
         * Secret Name
         */
        secretName?: string;
        /**
         * Docker Hub namespace
         */
        dockerHubNamespace?: string;
        /**
         * Application Name
         */
        appName: string;
        /**
         * Function root directory
         */
        functionRootDirectory?: string;
        /**
         * Wait for stability
         */
        waitForStability?: boolean;
        /**
         * Arguments
         */
        arguments?: string;
      };
    }
  | {
      /**
       * Azure Function on Kubernetes
       *
       * Deploy Azure function to Kubernetes cluster.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Function on Kubernetes inputs
       */
      inputs: {
        /**
         * Service connection type
         */
        connectionType?: 'Azure Resource Manager' | 'Kubernetes Service Connection';
        /**
         * Docker registry service connection
         */
        dockerRegistryServiceConnection: string;
        /**
         * Kubernetes service connection
         */
        kubernetesServiceConnection?: string;
        /**
         * Azure subscription
         */
        azureSubscriptionConnection?: string;
        /**
         * Resource group
         */
        azureResourceGroup?: string;
        /**
         * Kubernetes cluster
         */
        kubernetesCluster?: string;
        /**
         * Kubernetes namespace
         */
        namespace?: string;
        /**
         * Secret Name
         */
        secretName?: string;
        /**
         * Docker Hub namespace
         */
        dockerHubNamespace?: string;
        /**
         * Application Name
         */
        appName: string;
        /**
         * Function root directory
         */
        functionRootDirectory?: string;
        /**
         * Wait for stability
         */
        waitForStability?: boolean;
        /**
         * Arguments
         */
        arguments?: string;
      };
    }
  | {
      /**
       * Shell script
       *
       * Run a shell script using Bash
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Shell script inputs
       */
      inputs: {
        /**
         * Script Path
         */
        scriptPath: string;
        /**
         * Arguments
         */
        args?: string;
        /**
         * Specify Working Directory
         */
        disableAutoCwd?: boolean;
        /**
         * Working Directory
         */
        cwd?: string;
        /**
         * Fail on Standard Error
         */
        failOnStandardError?: boolean;
      };
    }
  | {
      /**
       * Bash
       *
       * Run a Bash script on macOS, Linux, or Windows
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Bash inputs
       */
      inputs?: {
        /**
         * Type
         */
        targetType?: 'filePath' | 'inline';
        /**
         * Script Path
         */
        filePath?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Script
         */
        script?: string;
        /**
         * Working Directory
         */
        workingDirectory?: string;
        /**
         * Fail on Standard Error
         */
        failOnStderr?: boolean;
        /**
         * Set value for BASH_ENV environment variable
         */
        bashEnvValue?: string;
      };
    }
  | {
      /**
       * Publish build artifacts
       *
       * Publish build artifacts to Azure Pipelines or a Windows file share
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Publish build artifacts inputs
       */
      inputs?: {
        /**
         * Path to publish
         */
        PathtoPublish?: string;
        /**
         * Artifact name
         */
        ArtifactName?: string;
        /**
         * Artifact publish location
         */
        publishLocation?: 'Container' | 'FilePath';
        /**
         * Max Artifact Size
         */
        MaxArtifactSize?: number;
        /**
         * File share path
         */
        TargetPath?: string;
        /**
         * Parallel copy
         */
        Parallel?: boolean;
        /**
         * Parallel count
         */
        ParallelCount?: number;
        /**
         * Tar the artifact before uploading
         */
        StoreAsTar?: boolean;
      };
    }
  | {
      /**
       * Install SSH key
       *
       * Install an SSH key prior to a build or deployment
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Install SSH key inputs
       */
      inputs: {
        /**
         * Known Hosts Entry
         */
        knownHostsEntry: string;
        /**
         * SSH Public Key
         */
        sshPublicKey?: string;
        /**
         * SSH Passphrase
         */
        sshPassphrase?: string;
        /**
         * SSH Key
         */
        sshKeySecureFile: string;
        /**
         * Add entry to SSH config
         */
        addEntryToConfig?: boolean;
        /**
         * Alias
         */
        configHostAlias?: string;
        /**
         * Host name
         */
        configHostname?: string;
        /**
         * User
         */
        configUser?: string;
        /**
         * Port
         */
        configPort?: string;
      };
    }
  | {
      /**
       * Azure VM scale set deployment
       *
       * Deploy a virtual machine scale set image
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure VM scale set deployment inputs
       */
      inputs: {
        /**
         * Azure subscription
         */
        azureSubscription: string;
        /**
         * Action
         */
        action?: 'Update image' | 'Configure application startup';
        /**
         * Virtual Machine scale set name
         */
        vmssName: string;
        /**
         * OS type
         */
        vmssOsType: 'Windows' | 'Linux';
        /**
         * Image URL
         */
        imageUrl: string;
        /**
         * Custom script directory
         */
        customScriptsDirectory?: string;
        /**
         * Command
         */
        customScript?: string;
        /**
         * Arguments
         */
        customScriptArguments?: string;
        /**
         * Azure storage account where custom scripts will be uploaded
         */
        customScriptsStorageAccount?: string;
        /**
         * Skip Archiving custom scripts
         */
        skipArchivingCustomScripts?: boolean;
      };
    }
  | {
      /**
       * Azure App Service: Classic (Deprecated)
       *
       * Create or update Azure App Service using Azure PowerShell
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure App Service: Classic (Deprecated) inputs
       */
      inputs: {
        /**
         * Azure Subscription (Classic)
         */
        ConnectedServiceName: string;
        /**
         * Web App Location
         */
        WebSiteLocation: string;
        /**
         * Web App Name
         */
        WebSiteName: string;
        /**
         * Slot
         */
        Slot?: string;
        /**
         * Web Deploy Package
         */
        Package: string;
        /**
         * Set DoNotDelete flag
         */
        doNotDelete?: boolean;
        /**
         * Additional Arguments
         */
        AdditionalArguments?: string;
      };
    }
  | {
      /**
       * Conda authenticate (for task runners)
       *
       * Authentication task for the conda client
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Conda authenticate (for task runners) inputs
       */
      inputs?: {
        /**
         * 'Azure DevOps' Service Connection
         */
        azureDevOpsServiceConnection?: string;
      };
    }
  | {
      /**
       * Azure Cloud Service deployment
       *
       * Deploy an Azure Cloud Service
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Cloud Service deployment inputs
       */
      inputs: {
        /**
         * Azure subscription (ARM)
         */
        ARMConnectedServiceName: string;
        /**
         * Resource group
         */
        ResourceGroupName: string;
        /**
         * Storage account (ARM)
         */
        ARMStorageAccount: string;
        /**
         * Service name
         */
        ServiceName: string;
        /**
         * Service location
         */
        ServiceLocation: string;
        /**
         * CsCfg
         */
        CsCfg: string;
        /**
         * CsDef
         */
        CsDef: string;
        /**
         * CsPkg
         */
        CsPkg: string;
        /**
         * Azure KeyVault
         */
        KeyVault?: string;
        /**
         * Deployment label
         */
        DeploymentLabel?: string;
        /**
         * Append current date and time
         */
        AppendDateTimeToLabel?: boolean;
        /**
         * Update mode for the cloud service
         */
        UpgradeMode?: string;
        /**
         * Allow upgrade
         */
        AllowUpgrade?: boolean;
        /**
         * Verify role instance status
         */
        VerifyRoleInstanceStatus?: boolean;
        /**
         * Diagnostic storage account keys
         */
        DiagnosticStorageAccountKeys?: string;
      };
    }
  | {
      /**
       * Azure Cloud Service deployment
       *
       * Deploy an Azure Cloud Service
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Azure Cloud Service deployment inputs
       */
      inputs: {
        /**
         * Azure subscription (Classic)
         */
        azureClassicSubscription: string;
        /**
         * Enable ARM storage support
         */
        EnableAdvancedStorageOptions?: boolean;
        /**
         * Storage account (Classic)
         */
        StorageAccount?: string;
        /**
         * Azure subscription (ARM)
         */
        ARMConnectedServiceName?: string;
        /**
         * Storage account (ARM)
         */
        ARMStorageAccount?: string;
        /**
         * Service name
         */
        ServiceName: string;
        /**
         * Service location
         */
        ServiceLocation: string;
        /**
         * CsPkg
         */
        CsPkg: string;
        /**
         * CsCfg
         */
        CsCfg: string;
        /**
         * Environment (Slot)
         */
        slotName?: string;
        /**
         * Deployment label
         */
        DeploymentLabel?: string;
        /**
         * Append current date and time
         */
        AppendDateTimeToLabel?: boolean;
        /**
         * Allow upgrade
         */
        AllowUpgrade?: boolean;
        /**
         * Simultaneous upgrade
         */
        SimultaneousUpgrade?: boolean;
        /**
         * Force upgrade
         */
        ForceUpgrade?: boolean;
        /**
         * Verify role instance status
         */
        VerifyRoleInstanceStatus?: boolean;
        /**
         * Diagnostic storage account keys
         */
        DiagnosticStorageAccountKeys?: string;
        /**
         * Custom certificates to import
         */
        NewServiceCustomCertificates?: string;
        /**
         * Additional arguments
         */
        NewServiceAdditionalArguments?: string;
        /**
         * Affinity group
         */
        NewServiceAffinityGroup?: string;
      };
    }
  | {
      /**
       * Cargo authenticate (for task runners)
       *
       * Authentication task for the cargo client used for installing Cargo crates distribution
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Cargo authenticate (for task runners) inputs
       */
      inputs: {
        /**
         * 'Azure DevOps' Service Connection
         */
        azureDevOpsServiceConnection?: string;
        /**
         * Registry names from config.toml
         */
        registryNames?: string;
        /**
         * config.toml file to authenticate
         */
        configFile: string;
        /**
         * Credentials for registries outside this organization/collection
         */
        cargoServiceConnections?: string;
      };
    }
  | {
      /**
       * Delete files
       *
       * Delete folders, or files matching a pattern
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Delete files inputs
       */
      inputs?: {
        /**
         * Source Folder
         */
        SourceFolder?: string;
        /**
         * Contents
         */
        Contents?: string;
        /**
         * Remove SourceFolder
         */
        RemoveSourceFolder?: boolean;
        /**
         * Remove files starting with a dot
         */
        RemoveDotFiles?: boolean;
      };
    }
  | {
      /**
       * gulp
       *
       * Run the gulp Node.js streaming task-based build system
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * gulp inputs
       */
      inputs?: {
        /**
         * gulp File Path
         */
        gulpFile?: string;
        /**
         * gulp Task(s)
         */
        targets?: string;
        /**
         * Arguments
         */
        arguments?: string;
        /**
         * Working Directory
         */
        workingDirectory?: string;
        /**
         * gulp.js location
         */
        gulpjs?: string;
        /**
         * Publish to Azure Pipelines
         */
        publishJUnitResults?: boolean;
        /**
         * Test Results Files
         */
        testResultsFiles?: string;
        /**
         * Test Run Title
         */
        testRunTitle?: string;
        /**
         * Enable code Coverage
         */
        enableCodeCoverage?: boolean;
        /**
         * Test Framework
         */
        testFramework?: 'Mocha' | 'Jasmine';
        /**
         * Source Files
         */
        srcFiles?: string;
        /**
         * Test Script Files
         */
        testFiles?: string;
      };
    }
  | {
      /**
       * IIS web app manage
       *
       * Create or update websites, web apps, virtual directories, or application pools
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * IIS web app manage inputs
       */
      inputs: {
        /**
         * Enable IIS
         */
        EnableIIS?: boolean;
        /**
         * Configuration type
         */
        IISDeploymentType?: 'IISWebsite' | 'IISWebApplication' | 'IISVirtualDirectory' | 'IISApplicationPool';
        /**
         * Action
         */
        ActionIISWebsite?: 'CreateOrUpdateWebsite' | 'StartWebsite' | 'StopWebsite';
        /**
         * Action
         */
        ActionIISApplicationPool?: 'CreateOrUpdateAppPool' | 'StartAppPool' | 'StopAppPool' | 'RecycleAppPool';
        /**
         * Website name
         */
        StartStopWebsiteName?: string;
        /**
         * Website name
         */
        WebsiteName: string;
        /**
         * Physical path
         */
        WebsitePhysicalPath?: string;
        /**
         * Physical path authentication
         */
        WebsitePhysicalPathAuth?: 'WebsiteUserPassThrough' | 'WebsiteWindowsAuth';
        /**
         * Username
         */
        WebsiteAuthUserName?: string;
        /**
         * Password
         */
        WebsiteAuthUserPassword?: string;
        /**
         * Add binding
         */
        AddBinding?: boolean;
        /**
         * Protocol
         */
        Protocol?: 'https' | 'http';
        /**
         * IP address
         */
        IPAddress?: string;
        /**
         * Port
         */
        Port?: string;
        /**
         * Server Name Indication required
         */
        ServerNameIndication?: boolean;
        /**
         * Host name
         */
        HostNameWithOutSNI?: string;
        /**
         * Host name
         */
        HostNameWithHttp?: string;
        /**
         * Host name
         */
        HostNameWithSNI?: string;
        /**
         * SSL certificate thumbprint
         */
        SSLCertThumbPrint?: string;
        /**
         * Add bindings
         */
        Bindings: string;
        /**
         * Create or update app pool
         */
        CreateOrUpdateAppPoolForWebsite?: boolean;
        /**
         * Configure authentication
         */
        ConfigureAuthenticationForWebsite?: boolean;
        /**
         * Name
         */
        AppPoolNameForWebsite: string;
        /**
         * .NET version
         */
        DotNetVersionForWebsite?: 'v4.0' | 'v2.0' | 'No Managed Code';
        /**
         * Managed pipeline mode
         */
        PipeLineModeForWebsite?: 'Integrated' | 'Classic';
        /**
         * Identity
         */
        AppPoolIdentityForWebsite?:
          | 'ApplicationPoolIdentity'
          | 'LocalService'
          | 'LocalSystem'
          | 'NetworkService'
          | 'SpecificUser';
        /**
         * Username
         */
        AppPoolUsernameForWebsite?: string;
        /**
         * Password
         */
        AppPoolPasswordForWebsite?: string;
        /**
         * Anonymous authentication
         */
        AnonymousAuthenticationForWebsite?: boolean;
        /**
         * Basic authentication
         */
        BasicAuthenticationForWebsite?: boolean;
        /**
         * Windows authentication
         */
        WindowsAuthenticationForWebsite?: boolean;
        /**
         * Parent website name
         */
        ParentWebsiteNameForVD: string;
        /**
         * Virtual path
         */
        VirtualPathForVD: string;
        /**
         * Physical path
         */
        PhysicalPathForVD?: string;
        /**
         * Physical path authentication
         */
        VDPhysicalPathAuth?: 'VDUserPassThrough' | 'VDWindowsAuth';
        /**
         * Username
         */
        VDAuthUserName?: string;
        /**
         * Password
         */
        VDAuthUserPassword?: string;
        /**
         * Parent website name
         */
        ParentWebsiteNameForApplication: string;
        /**
         * Virtual path
         */
        VirtualPathForApplication: string;
        /**
         * Physical path
         */
        PhysicalPathForApplication?: string;
        /**
         * Physical path authentication
         */
        ApplicationPhysicalPathAuth?: 'ApplicationUserPassThrough' | 'ApplicationWindowsAuth';
        /**
         * Username
         */
        ApplicationAuthUserName?: string;
        /**
         * Password
         */
        ApplicationAuthUserPassword?: string;
        /**
         * Create or update app pool
         */
        CreateOrUpdateAppPoolForApplication?: boolean;
        /**
         * Name
         */
        AppPoolNameForApplication: string;
        /**
         * .NET version
         */
        DotNetVersionForApplication?: 'v4.0' | 'v2.0' | 'No Managed Code';
        /**
         * Managed pipeline mode
         */
        PipeLineModeForApplication?: 'Integrated' | 'Classic';
        /**
         * Identity
         */
        AppPoolIdentityForApplication?:
          | 'ApplicationPoolIdentity'
          | 'LocalService'
          | 'LocalSystem'
          | 'NetworkService'
          | 'SpecificUser';
        /**
         * Username
         */
        AppPoolUsernameForApplication?: string;
        /**
         * Password
         */
        AppPoolPasswordForApplication?: string;
        /**
         * Name
         */
        AppPoolName: string;
        /**
         * .NET version
         */
        DotNetVersion?: 'v4.0' | 'v2.0' | 'No Managed Code';
        /**
         * Managed pipeline mode
         */
        PipeLineMode?: 'Integrated' | 'Classic';
        /**
         * Identity
         */
        AppPoolIdentity?:
          | 'ApplicationPoolIdentity'
          | 'LocalService'
          | 'LocalSystem'
          | 'NetworkService'
          | 'SpecificUser';
        /**
         * Username
         */
        AppPoolUsername?: string;
        /**
         * Password
         */
        AppPoolPassword?: string;
        /**
         * Application pool name
         */
        StartStopRecycleAppPoolName?: string;
        /**
         * Additional appcmd.exe commands
         */
        AppCmdCommands?: string;
      };
    }
  | {
      /**
       * Docker CLI installer
       *
       * Install Docker CLI on agent machine.
       */
      task: {
        [k: string]: unknown | undefined;
      };
      /**
       * Docker CLI installer inputs
       */
      inputs?: {
        /**
         * Docker Version
         */
        dockerVersion?: string;
        /**
         * Release type
         */
        releaseType?: 'stable' | 'edge' | 'test' | 'nightly';
      };
    }
) & {
  task?:
    | 'PowerShell@2'
    | 'PowerShell@1'
    | 'AzurePowerShell@5'
    | 'AzurePowerShell@4'
    | 'AzurePowerShell@1'
    | 'AzurePowerShell@2'
    | 'MysqlDeploymentOnMachineGroup@1'
    | 'PipAuthenticate@1'
    | 'PipAuthenticate@0'
    | 'Maven@4'
    | 'Maven@2'
    | 'Maven@3'
    | 'Maven@1'
    | 'DotNetCoreCLI@2'
    | 'DotNetCoreCLI@0'
    | 'DotNetCoreCLI@1'
    | 'XamarinComponentRestore@0'
    | 'AzureRmWebAppDeployment@4'
    | 'AzureRmWebAppDeployment@2'
    | 'AzureRmWebAppDeployment@5'
    | 'AzureRmWebAppDeployment@3'
    | 'PowerShellOnTargetMachines@3'
    | 'PowerShellOnTargetMachines@1'
    | 'PowerShellOnTargetMachines@2'
    | 'PublishCodeCoverageResults@2'
    | 'PublishCodeCoverageResults@1'
    | 'RunVisualStudioTestsusingTestAgent@1'
    | 'ManualIntervention@8'
    | 'InstallAppleProvisioningProfile@1'
    | 'InstallAppleProvisioningProfile@0'
    | 'SonarQubePostTest@1'
    | 'PyPIPublisher@0'
    | 'ChefKnife@1'
    | 'GoTool@0'
    | 'XcodePackageiOS@0'
    | 'Go@0'
    | 'PublishPipelineMetadata@0'
    | 'Docker@0'
    | 'Docker@2'
    | 'Docker@1'
    | 'JenkinsQueueJob@1'
    | 'JenkinsQueueJob@2'
    | 'FtpUpload@2'
    | 'FtpUpload@1'
    | 'WindowsMachineFileCopy@2'
    | 'WindowsMachineFileCopy@1'
    | 'AndroidBuild@1'
    | 'TwineAuthenticate@1'
    | 'TwineAuthenticate@0'
    | 'IISWebAppDeploymentOnMachineGroup@0'
    | 'PythonScript@0'
    | 'HelmInstaller@0'
    | 'HelmInstaller@1'
    | 'NodeTaskRunnerInstaller@0'
    | 'XamarinLicense@1'
    | 'NuGetAuthenticate@0'
    | 'NuGetAuthenticate@1'
    | 'DownloadGitHubNugetPackage@1'
    | 'MavenAuthenticate@0'
    | 'AzureAppConfigurationExport@10'
    | 'ReviewApp@0'
    | 'JavaToolInstaller@0'
    | 'JavaToolInstaller@1'
    | 'Chef@1'
    | 'AzureFunctionApp@1'
    | 'AzureFunctionApp@2'
    | 'npmAuthenticate@0'
    | 'MSBuild@1'
    | 'PackerBuild@0'
    | 'PackerBuild@1'
    | 'NuGetPackager@0'
    | 'AzureAppConfigurationSnapshot@1'
    | 'DuffleInstaller@0'
    | 'ServiceFabricUpdateAppVersions@1'
    | 'ServiceFabricUpdateManifests@2'
    | 'AzureMonitor@1'
    | 'AzureMonitor@0'
    | 'Notation@0'
    | 'AzureNLBManagement@1'
    | 'DockerCompose@0'
    | 'DockerCompose@1'
    | 'AzureMonitorAlerts@0'
    | 'XamarinTestCloud@1'
    | 'ServiceFabricDeploy@1'
    | 'Xcode@5'
    | 'Xcode@3'
    | 'Xcode@4'
    | 'Xcode@2'
    | 'NuGetPublisher@0'
    | 'queryWorkItems@0'
    | 'AzureWebAppContainer@1'
    | 'SqlDacpacDeploymentOnMachineGroup@0'
    | 'CacheBeta@1'
    | 'CacheBeta@0'
    | 'Cache@2'
    | 'CMake@1'
    | 'VSMobileCenterTest@0'
    | 'AppCenterTest@1'
    | 'DownloadSecureFile@1'
    | 'AzureContainerApps@0'
    | 'AzureContainerApps@1'
    | 'UseRubyVersion@0'
    | 'Grunt@0'
    | 'SqlAzureDacpacDeployment@1'
    | 'ContainerStructureTest@0'
    | 'IISWebAppDeployment@1'
    | 'KubectlInstaller@0'
    | 'CmdLine@2'
    | 'CmdLine@1'
    | 'NuGet@0'
    | 'ContainerBuild@0'
    | 'NuGetInstaller@0'
    | 'NuGetRestore@1'
    | 'NuGetCommand@2'
    | 'Delay@1'
    | 'XamariniOS@1'
    | 'XamariniOS@2'
    | 'PublishTestResults@2'
    | 'PublishTestResults@1'
    | 'AzureFileCopy@6'
    | 'AzureFileCopy@4'
    | 'AzureFileCopy@5'
    | 'AzureFileCopy@2'
    | 'AzureFileCopy@3'
    | 'AzureFileCopy@1'
    | 'PublishSymbols@2'
    | 'PublishSymbols@1'
    | 'CopyFilesOverSSH@0'
    | 'Gradle@2'
    | 'Gradle@3'
    | 'Gradle@4'
    | 'Gradle@1'
    | 'AzureTestPlan@0'
    | 'AppCenterDistribute@1'
    | 'AppCenterDistribute@2'
    | 'AppCenterDistribute@3'
    | 'AppCenterDistribute@0'
    | 'NuGetToolInstaller@0'
    | 'NuGetToolInstaller@1'
    | 'JenkinsDownloadArtifacts@2'
    | 'JenkinsDownloadArtifacts@1'
    | 'AzureFunctionAppContainer@1'
    | 'DecryptFile@1'
    | 'HelmDeploy@1'
    | 'HelmDeploy@0'
    | 'InstallAppleCertificate@2'
    | 'InstallAppleCertificate@1'
    | 'InstallAppleCertificate@0'
    | 'AzureFunction@1'
    | 'AzureFunction@0'
    | 'OpenPolicyAgentInstaller@0'
    | 'DownloadGitHubRelease@0'
    | 'SSH@0'
    | 'PublishPipelineArtifact@0'
    | 'PublishPipelineArtifact@1'
    | 'SonarQubePreBuild@1'
    | 'DownloadFileshareArtifacts@1'
    | 'Kubernetes@1'
    | 'Kubernetes@0'
    | 'AzureIoTEdge@2'
    | 'ServiceFabricComposeDeploy@0'
    | 'AndroidSigning@1'
    | 'AndroidSigning@2'
    | 'AndroidSigning@3'
    | 'DownloadPipelineArtifact@0'
    | 'DownloadPipelineArtifact@2'
    | 'DownloadPipelineArtifact@1'
    | 'UsePythonVersion@0'
    | 'ServiceFabricPowerShell@1'
    | 'VSTest@2'
    | 'VSTest@3'
    | 'VSTest@1'
    | 'ManualValidation@1'
    | 'ManualValidation@0'
    | 'Ant@1'
    | 'DeployVisualStudioTestAgent@2'
    | 'DeployVisualStudioTestAgent@1'
    | 'CondaEnvironment@0'
    | 'CondaEnvironment@1'
    | 'BatchScript@1'
    | 'DownloadGithubNpmPackage@1'
    | 'VSBuild@1'
    | 'AzureKeyVault@1'
    | 'AzureKeyVault@2'
    | 'UseDotNet@2'
    | 'DotNetCoreInstaller@0'
    | 'DotNetCoreInstaller@1'
    | 'AzureAppConfigurationImport@10'
    | 'AzureAppServiceManage@0'
    | 'KubeloginInstaller@0'
    | 'FuncToolsInstaller@0'
    | 'FileTransform@2'
    | 'FileTransform@1'
    | 'ExtractFiles@1'
    | 'XamarinAndroid@1'
    | 'CopyPublishBuildArtifacts@1'
    | 'DownloadPackage@0'
    | 'DownloadPackage@1'
    | 'AzureResourceGroupDeployment@1'
    | 'AzureResourceGroupDeployment@2'
    | 'AzureResourceManagerTemplateDeployment@3'
    | 'InvokeRESTAPI@0'
    | 'InvokeRESTAPI@1'
    | 'ArchiveFiles@1'
    | 'ArchiveFiles@2'
    | 'GitHubComment@0'
    | 'CopyFiles@2'
    | 'CopyFiles@1'
    | 'AzureMysqlDeployment@1'
    | 'Npm@1'
    | 'Npm@0'
    | 'AzureStaticWebApp@0'
    | 'UseNode@1'
    | 'NodeTool@0'
    | 'SqlServerDacpacDeployment@1'
    | 'VisualStudioTestPlatformInstaller@1'
    | 'PublishToAzureServiceBus@1'
    | 'PublishToAzureServiceBus@2'
    | 'PublishToAzureServiceBus@0'
    | 'KubernetesManifest@0'
    | 'KubernetesManifest@1'
    | 'DownloadBuildArtifacts@0'
    | 'DownloadBuildArtifacts@1'
    | 'CocoaPods@0'
    | 'AzureSpringCloud@0'
    | 'AzureWebApp@1'
    | 'AzureCLI@1'
    | 'AzureCLI@2'
    | 'AzureCLI@0'
    | 'GitHubRelease@1'
    | 'GitHubRelease@0'
    | 'cURLUploader@1'
    | 'cURLUploader@2'
    | 'AzureAppServiceSettings@1'
    | 'UniversalPackages@0'
    | 'AzurePolicyCheckGate@0'
    | 'AzureFunctionOnKubernetes@0'
    | 'AzureFunctionOnKubernetes@1'
    | 'ShellScript@2'
    | 'Bash@3'
    | 'PublishBuildArtifacts@1'
    | 'InstallSSHKey@0'
    | 'AzureVmssDeployment@0'
    | 'AzureVmssDeployment@1'
    | 'AzureWebPowerShellDeployment@1'
    | 'CondaAuthenticate@0'
    | 'AzureCloudPowerShellDeployment@2'
    | 'AzureCloudPowerShellDeployment@1'
    | 'CargoAuthenticate@0'
    | 'DeleteFiles@1'
    | 'gulp@0'
    | 'gulp@1'
    | 'IISWebAppManagementOnMachineGroup@0'
    | 'DockerInstaller@0';
  /**
   * Human-readable name for the task
   */
  displayName?: string;
  /**
   * ID of the task instance
   */
  name?: string;
  /**
   * Evaluate this condition expression to determine whether to run this task
   */
  condition?: string;
  /**
   * Continue running the parent job even on failure?
   */
  continueOnError?: boolean;
  /**
   * Run this task when the job runs?
   */
  enabled?: string;
  /**
   * Number of retries if the task fails
   */
  retryCountOnTaskFailure?: number;
  /**
   * Time to wait for this task to complete before the server kills it
   */
  timeoutInMinutes?: number;
  /**
   * Task-specific inputs
   */
  inputs?: {};
  /**
   * Variables to map into the process's environment
   */
  env?: {};
};
/**
 * A list of steps to run
 */
export type Steps = Step[];
/**
 * A list of steps to run
 */
export type Steps1 = Step[];
/**
 * A list of steps to run
 */
export type Steps2 = Step[];
/**
 * A list of steps to run
 */
export type Steps3 = Step[];
/**
 * A list of steps to run
 */
export type Steps4 = Step[];
/**
 * A list of steps to run
 */
export type Steps5 = Step[];
/**
 * A list of steps to run
 */
export type Steps6 = Step[];
/**
 * Maximum batch size for deployment
 */
export type CanaryDeploymentIncrements = NonEmptyString[];
/**
 * Jobs which make up the stage
 */
export type Jobs = Job[];
/**
 * Check configurations for the stage
 */
export type Checks = Check[];
/**
 * Stages are groups of jobs that can run without human intervention
 */
export type Stages = Stage[];
/**
 * branch name or prefix filter
 */
export type BranchFilter = string;
export type BranchFilterArray = BranchFilter[];
export type PipelineTemplateParameterType = string;
export type Any =
  | string
  | Any[]
  | {
      [k: string]: unknown | undefined;
    };
/**
 * Allowed list of values (for some data types)
 */
export type SequenceOfNonEmptyString2 = NonEmptyString[];
/**
 * Pipeline template parameters
 */
export type PipelineTemplateParameters = PipelineTemplateParameter[];
/**
 * Scheduled triggers
 */
export type Schedules = Schedule[];
/**
 * List of external build resources
 */
export type BuildResources = BuildResource[];
export type IncludeExcludeStringFilters =
  | NonEmptyString[]
  | {
      include?: SequenceOfNonEmptyString3;
      exclude?: SequenceOfNonEmptyString3;
    };
export type SequenceOfNonEmptyString3 = NonEmptyString[];
/**
 * Ports to expose on the container
 */
export type SequenceOfStringAllowExpressions2 = StringAllowExpressions[];
/**
 * Volumes to mount on the container
 */
export type SequenceOfStringAllowExpressions3 = StringAllowExpressions[];
/**
 * List of container images
 */
export type ContainerResources = ContainerResource[];
/**
 * List of tags required on the pipeline to pick up default artifacts; optional
 */
export type SequenceOfNonEmptyString4 = NonEmptyString[];
/**
 * List of branches to include
 */
export type BranchFilterArray1 = BranchFilter[];
/**
 * List of branches to exclude
 */
export type BranchFilterArray2 = BranchFilter[];
/**
 * List of stages that when matched will trigger the pipeline
 */
export type SequenceOfNonEmptyString5 = NonEmptyString[];
/**
 * List of tags that when matched will trigger the pipeline
 */
export type SequenceOfNonEmptyString6 = NonEmptyString[];
/**
 * List of pipeline resources
 */
export type PipelineResources = PipelineResource[];
export type Trigger =
  | string
  | BranchFilter[]
  | {
      /**
       * Whether to batch changes per branch
       */
      batch?: string;
      branches?: IncludeExcludeFilters;
      paths?: IncludeExcludeFilters;
      tags?: IncludeExcludeFilters;
    };
/**
 * List of external repositories
 */
export type RepositoryResources = RepositoryResource[];
/**
 * List of trigger filters
 */
export type WebhookFilters = WebhookFilter[];
/**
 * List of webhooks
 */
export type WebhookResources = WebhookResource[];
/**
 * List of external packages
 */
export type PackageResources = PackageResource[];
export type LegacyRepoResourceAlias = string;
/**
 * Pipeline template parameters
 */
export type PipelineTemplateParameters1 = PipelineTemplateParameter[];
/**
 * Scheduled triggers
 */
export type Schedules1 = Schedule[];
/**
 * Jobs represent units of work which can be assigned to a single agent or server
 */
export type Jobs1 = Job[];
/**
 * Pipeline template parameters
 */
export type PipelineTemplateParameters2 = PipelineTemplateParameter[];
/**
 * Scheduled triggers
 */
export type Schedules2 = Schedule[];
export type Phase =
  | {
      /**
       * ID of the phase
       */
      phase?: string;
      /**
       * Any phases which must complete before this one
       */
      dependsOn?: string | String[];
      /**
       * Human-readable name of the phase
       */
      displayName?: string;
      /**
       * Evaluate this condition expression to determine whether to run this phase
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * Queue where this phase will run
       */
      queue?:
        | string
        | {
            /**
             * Time to wait for the phase to cancel before forcibly terminating it
             */
            cancelTimeoutInMinutes?: string;
            /**
             * Container resource name
             */
            container?: string;
            /**
             * List of demands (for a private queue)
             */
            demands?: string | NonEmptyString[];
            matrix?: PhaseTargetMatrix;
            /**
             * Name of a queue
             */
            name?: string;
            /**
             * Maximum number of parallel agent executions
             */
            parallel?: string;
            /**
             * Time to wait before cancelling the phase
             */
            timeoutInMinutes?: string;
            workspace?: PhaseTargetWorkspace;
          };
      /**
       * Phase-specific variables
       */
      variables?:
        | {
            [k: string]: unknown | undefined;
          }
        | Variable[];
      steps?: Steps7;
    }
  | {
      /**
       * ID of the phase
       */
      phase?: string;
      /**
       * Any phases which must complete before this one
       */
      dependsOn?: string | String[];
      /**
       * Human-readable name of the phase
       */
      displayName?: string;
      /**
       * Evaluate this condition expression to determine whether to run this phase
       */
      condition?: string;
      /**
       * Continue running even on failure?
       */
      continueOnError?: string;
      /**
       * True if this is an agent-less phase (runs on server)
       */
      server?:
        | string
        | {
            /**
             * Time to wait for the job to cancel before forcibly terminating it
             */
            cancelTimeoutInMinutes?: string;
            matrix?: PhaseTargetMatrix;
            /**
             * Maximum number of parallel agent executions
             */
            parallel?: string;
            /**
             * Time to wait before cancelling the job
             */
            timeoutInMinutes?: string;
          };
      /**
       * Phase-specific variables
       */
      variables?:
        | {
            [k: string]: unknown | undefined;
          }
        | Variable[];
      steps?: Steps8;
    }
  | {
      /**
       * Reference to a template for this phase
       */
      template?: string;
      parameters?: Mapping5;
    };
/**
 * List of permutations of variable values to run
 */
export type PhaseTargetMatrix =
  | {
      [k: string]: unknown | undefined;
    }
  | string;
/**
 * A list of steps to run in this phase
 */
export type Steps7 = Step[];
/**
 * A list of steps to run in this phase
 */
export type Steps8 = Step[];
/**
 * Phases which make up the pipeline
 */
export type Phases = Phase[];
/**
 * Pipeline template parameters
 */
export type PipelineTemplateParameters3 = PipelineTemplateParameter[];
/**
 * Scheduled triggers
 */
export type Schedules3 = Schedule[];
/**
 * A list of steps to run in this job
 */
export type Steps9 = Step[];
/**
 * Pipeline template parameters
 */
export type PipelineTemplateParameters4 = PipelineTemplateParameter[];
/**
 * Scheduled triggers
 */
export type Schedules4 = Schedule[];
/**
 * A list of steps to run in this phase
 */
export type Steps10 = Step[];
/**
 * Pipeline template parameters
 */
export type PipelineTemplateParameters5 = PipelineTemplateParameter[];
/**
 * Scheduled triggers
 */
export type Schedules5 = Schedule[];
/**
 * A list of steps to run in this phase
 */
export type Steps11 = Step[];
/**
 * Pipeline template parameters
 */
export type PipelineTemplateParameters6 = PipelineTemplateParameter[];
/**
 * Scheduled triggers
 */
export type Schedules6 = Schedule[];

export interface Mapping {
  [k: string]: unknown | undefined;
}
/**
 * Variable-value pair to pass in this matrix instance
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[A-Za-z0-9_]+$".
 */
export interface MatrixProperties {
  [k: string]: unknown | undefined;
}
/**
 * Variables to map into the container's environment
 */
export interface MappingOfStringString {
  [k: string]: unknown | undefined;
}
/**
 * Volumes to mount read-only, the default is all false
 */
export interface ReadOnlyMounts {
  /**
   * Mount the work directory as readonly
   */
  work?: string;
  /**
   * Mount the externals directory as readonly
   */
  externals?: string;
  /**
   * Mount the tools directory as readonly
   */
  tools?: string;
  /**
   * Mount the tasks directory as readonly
   */
  tasks?: string;
}
/**
 * Container resources to run as a service container (name/value pairs)
 */
export interface JobServices {
  [k: string]: unknown | undefined;
}
/**
 * Workspace options on the agent
 */
export interface JobWorkspace {
  /**
   * Which parts of the workspace should be scorched before fetching
   */
  clean?: 'outputs' | 'resources' | 'all';
}
/**
 * Any resources required by this job that are not already referenced
 */
export interface ExplicitResources {
  repositories?: SequenceOfNonEmptyString;
  pools?: SequenceOfNonEmptyString1;
}
/**
 * Variables to map into the process's environment
 */
export interface MappingOfStringString1 {
  [k: string]: unknown | undefined;
}
/**
 * Variables to map into the process's environment
 */
export interface MappingOfStringString2 {
  [k: string]: unknown | undefined;
}
/**
 * Variables to map into the process's environment
 */
export interface MappingOfStringString3 {
  [k: string]: unknown | undefined;
}
/**
 * Variables to map into the process's environment
 */
export interface MappingOfStringString4 {
  [k: string]: unknown | undefined;
}
/**
 * Variables to map into the process's environment
 */
export interface MappingOfStringString5 {
  [k: string]: unknown | undefined;
}
/**
 * Variables to map into the process's environment
 */
export interface MappingOfStringString6 {
  [k: string]: unknown | undefined;
}
/**
 * Inputs for the task
 */
export interface MappingOfStringString7 {
  [k: string]: unknown | undefined;
}
/**
 * Variables to map into the process's environment
 */
export interface MappingOfStringString8 {
  [k: string]: unknown | undefined;
}
/**
 * Variables to map into the process's environment
 */
export interface MappingOfStringString9 {
  [k: string]: unknown | undefined;
}
/**
 * Variables to map into the process's environment
 */
export interface MappingOfStringString10 {
  [k: string]: unknown | undefined;
}
/**
 * Variables to map into the process's environment
 */
export interface MappingOfStringString11 {
  [k: string]: unknown | undefined;
}
/**
 * Parameters used in a step template
 */
export interface Mapping1 {
  [k: string]: unknown | undefined;
}
/**
 * Variables to map into the process's environment
 */
export interface MappingOfStringString12 {
  [k: string]: unknown | undefined;
}
/**
 * Job related information passed from a pipeline when extending a template
 */
export interface TemplateContext {
  [k: string]: unknown | undefined;
}
/**
 * RunOnce Deployment strategy
 */
export interface RunOnceDeploymentStrategy {
  preDeploy?: PreDeployHook;
  deploy?: DeployHook;
  routeTraffic?: RouteTrafficHook;
  postRouteTraffic?: PostRouteTrafficHook;
  on?: OnSuccessOrFailureHook;
}
/**
 * Pre deploy hook for runOnce deployment strategy
 */
export interface PreDeployHook {
  steps?: Steps1;
  /**
   * Pool where pre deploy steps will run
   */
  pool?:
    | string
    | {
        /**
         * Name of a pool
         */
        name?: string;
        /**
         * Specify a list of demands for a private pool
         */
        demands?: string | NonEmptyString[];
        /**
         * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
         */
        vmImage?: string;
        [k: string]: unknown | undefined;
      };
}
/**
 * Deploy hook for runOnce deployment strategy
 */
export interface DeployHook {
  steps?: Steps2;
  /**
   * Pool where deploy steps will run
   */
  pool?:
    | string
    | {
        /**
         * Name of a pool
         */
        name?: string;
        /**
         * Specify a list of demands for a private pool
         */
        demands?: string | NonEmptyString[];
        /**
         * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
         */
        vmImage?: string;
        [k: string]: unknown | undefined;
      };
}
/**
 * Route traffic hook for runOnce deployment strategy
 */
export interface RouteTrafficHook {
  steps?: Steps3;
  /**
   * Pool where route traffic steps will run
   */
  pool?:
    | string
    | {
        /**
         * Name of a pool
         */
        name?: string;
        /**
         * Specify a list of demands for a private pool
         */
        demands?: string | NonEmptyString[];
        /**
         * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
         */
        vmImage?: string;
        [k: string]: unknown | undefined;
      };
}
/**
 * Post route traffic hook for runOnce deployment strategy
 */
export interface PostRouteTrafficHook {
  steps?: Steps4;
  /**
   * Pool where post route traffic steps will run
   */
  pool?:
    | string
    | {
        /**
         * Name of a pool
         */
        name?: string;
        /**
         * Specify a list of demands for a private pool
         */
        demands?: string | NonEmptyString[];
        /**
         * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
         */
        vmImage?: string;
        [k: string]: unknown | undefined;
      };
}
/**
 * On success or failure hook for runOnce deployment strategy
 */
export interface OnSuccessOrFailureHook {
  failure?: OnFailureHook;
  success?: OnSuccessHook;
}
/**
 * Runs on failure of any step
 */
export interface OnFailureHook {
  steps?: Steps5;
  /**
   * Pool where post on failure steps will run
   */
  pool?:
    | string
    | {
        /**
         * Name of a pool
         */
        name?: string;
        /**
         * Specify a list of demands for a private pool
         */
        demands?: string | NonEmptyString[];
        /**
         * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
         */
        vmImage?: string;
        [k: string]: unknown | undefined;
      };
}
/**
 * Runs on success of all of the steps
 */
export interface OnSuccessHook {
  steps?: Steps6;
  /**
   * Pool where on success steps will run
   */
  pool?:
    | string
    | {
        /**
         * Name of a pool
         */
        name?: string;
        /**
         * Specify a list of demands for a private pool
         */
        demands?: string | NonEmptyString[];
        /**
         * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
         */
        vmImage?: string;
        [k: string]: unknown | undefined;
      };
}
/**
 * Rolling Deployment strategy
 */
export interface RollingDeploymentStrategy {
  /**
   * Maximum number of jobs running in parallel
   */
  maxParallel?: string;
  preDeploy?: PreDeployHook1;
  deploy?: DeployHook1;
  routeTraffic?: RouteTrafficHook1;
  postRouteTraffic?: PostRouteTrafficHook1;
  on?: OnSuccessOrFailureHook1;
}
/**
 * Pre deploy hook for rolling deployment strategy
 */
export interface PreDeployHook1 {
  steps?: Steps1;
  /**
   * Pool where pre deploy steps will run
   */
  pool?:
    | string
    | {
        /**
         * Name of a pool
         */
        name?: string;
        /**
         * Specify a list of demands for a private pool
         */
        demands?: string | NonEmptyString[];
        /**
         * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
         */
        vmImage?: string;
        [k: string]: unknown | undefined;
      };
}
/**
 * Deploy hook for rolling deployment strategy
 */
export interface DeployHook1 {
  steps?: Steps2;
  /**
   * Pool where deploy steps will run
   */
  pool?:
    | string
    | {
        /**
         * Name of a pool
         */
        name?: string;
        /**
         * Specify a list of demands for a private pool
         */
        demands?: string | NonEmptyString[];
        /**
         * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
         */
        vmImage?: string;
        [k: string]: unknown | undefined;
      };
}
/**
 * Route traffic hook for rolling deployment strategy
 */
export interface RouteTrafficHook1 {
  steps?: Steps3;
  /**
   * Pool where route traffic steps will run
   */
  pool?:
    | string
    | {
        /**
         * Name of a pool
         */
        name?: string;
        /**
         * Specify a list of demands for a private pool
         */
        demands?: string | NonEmptyString[];
        /**
         * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
         */
        vmImage?: string;
        [k: string]: unknown | undefined;
      };
}
/**
 * Post route traffic hook for rolling deployment strategy
 */
export interface PostRouteTrafficHook1 {
  steps?: Steps4;
  /**
   * Pool where post route traffic steps will run
   */
  pool?:
    | string
    | {
        /**
         * Name of a pool
         */
        name?: string;
        /**
         * Specify a list of demands for a private pool
         */
        demands?: string | NonEmptyString[];
        /**
         * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
         */
        vmImage?: string;
        [k: string]: unknown | undefined;
      };
}
/**
 * On success or failure hook for rolling deployment strategy
 */
export interface OnSuccessOrFailureHook1 {
  failure?: OnFailureHook;
  success?: OnSuccessHook;
}
/**
 * Canary Deployment strategy
 */
export interface CanaryDeploymentStrategy {
  increments?: CanaryDeploymentIncrements;
  preDeploy?: PreDeployHook2;
  deploy?: DeployHook2;
  routeTraffic?: RouteTrafficHook2;
  postRouteTraffic?: PostRouteTrafficHook2;
  on?: OnSuccessOrFailureHook2;
}
/**
 * Pre deploy hook for canary deployment strategy
 */
export interface PreDeployHook2 {
  steps?: Steps1;
  /**
   * Pool where pre deploy steps will run
   */
  pool?:
    | string
    | {
        /**
         * Name of a pool
         */
        name?: string;
        /**
         * Specify a list of demands for a private pool
         */
        demands?: string | NonEmptyString[];
        /**
         * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
         */
        vmImage?: string;
        [k: string]: unknown | undefined;
      };
}
/**
 * Deploy hook for canary deployment strategy
 */
export interface DeployHook2 {
  steps?: Steps2;
  /**
   * Pool where deploy steps will run
   */
  pool?:
    | string
    | {
        /**
         * Name of a pool
         */
        name?: string;
        /**
         * Specify a list of demands for a private pool
         */
        demands?: string | NonEmptyString[];
        /**
         * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
         */
        vmImage?: string;
        [k: string]: unknown | undefined;
      };
}
/**
 * Route traffic hook for canary deployment strategy
 */
export interface RouteTrafficHook2 {
  steps?: Steps3;
  /**
   * Pool where route traffic steps will run
   */
  pool?:
    | string
    | {
        /**
         * Name of a pool
         */
        name?: string;
        /**
         * Specify a list of demands for a private pool
         */
        demands?: string | NonEmptyString[];
        /**
         * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
         */
        vmImage?: string;
        [k: string]: unknown | undefined;
      };
}
/**
 * Post route traffic hook for canary deployment strategy
 */
export interface PostRouteTrafficHook2 {
  steps?: Steps4;
  /**
   * Pool where post route traffic steps will run
   */
  pool?:
    | string
    | {
        /**
         * Name of a pool
         */
        name?: string;
        /**
         * Specify a list of demands for a private pool
         */
        demands?: string | NonEmptyString[];
        /**
         * Name of the VM image you want to use; valid only in the Microsoft-hosted pool
         */
        vmImage?: string;
        [k: string]: unknown | undefined;
      };
}
/**
 * On success or failure hook for canary deployment strategy
 */
export interface OnSuccessOrFailureHook2 {
  failure?: OnFailureHook;
  success?: OnSuccessHook;
}
/**
 * What to clean up before the job runs
 */
export interface JobWorkspace1 {
  /**
   * Which parts of the workspace should be scorched before fetching
   */
  clean?: 'outputs' | 'resources' | 'all';
}
/**
 * Any resources required by this job that are not already referenced
 */
export interface ExplicitResources1 {
  repositories?: SequenceOfNonEmptyString;
  pools?: SequenceOfNonEmptyString1;
}
/**
 * Container resources to run as a service container
 */
export interface JobServices1 {
  [k: string]: unknown | undefined;
}
/**
 * Deployment related information passed from a pipeline when extending a template
 */
export interface TemplateContext1 {
  [k: string]: unknown | undefined;
}
/**
 * Parameters used in a deployment template
 */
export interface Mapping2 {
  [k: string]: unknown | undefined;
}
/**
 * Setting false prevents the stage from being skipped. By default it's always true
 */
export interface TemplateContext2 {
  [k: string]: unknown | undefined;
}
export interface Check {
  /**
   * Type of check extension
   */
  type?: string;
}
/**
 * Parameters used in a stage template
 */
export interface Mapping3 {
  [k: string]: unknown | undefined;
}
export interface IncludeExcludeFilters {
  include?: BranchFilterArray;
  exclude?: BranchFilterArray;
}
export interface PipelineTemplateParameter {
  name?: NonEmptyString;
  /**
   * Human-readable name for the parameter
   */
  displayName?: string;
  type?: PipelineTemplateParameterType;
  /**
   * Default value; if no default, then the parameter MUST be given by the user at runtime
   */
  default?:
    | string
    | Any[]
    | {
        [k: string]: unknown | undefined;
      };
  values?: SequenceOfNonEmptyString2;
}
/**
 * Branch names to include or exclude for triggering a run
 */
export interface IncludeExcludeFilters1 {
  include?: BranchFilterArray;
  exclude?: BranchFilterArray;
}
/**
 * File paths to include or exclude for triggering a run
 */
export interface IncludeExcludeFilters2 {
  include?: BranchFilterArray;
  exclude?: BranchFilterArray;
}
export interface Schedule {
  /**
   * Cron syntax defining a schedule in UTC time
   */
  cron?: string;
  /**
   * Optional friendly name given to a specific schedule
   */
  displayName?: string;
  branches?: IncludeExcludeFilters3;
  /**
   * When batch is true, a new pipeline run won't start due to the schedule if a previous pipeline run is still in-progress; the default is false. The batch property is affected by the setting of the always property
   */
  batch?: string;
  /**
   * Whether to always run the pipeline or only if there have been source code or pipeline settings changes since the last successful scheduled run. The default is false
   */
  always?: string;
}
/**
 * Branch names to include or exclude for triggering a run
 */
export interface IncludeExcludeFilters3 {
  include?: BranchFilterArray;
  exclude?: BranchFilterArray;
}
export interface BuildResource {
  /**
   * Alias or name of build artifact
   */
  build: string;
  /**
   * Name of the artifact type
   */
  type: string;
  /**
   * Name of the connection. This connection will be used for all the communication related to this artifact
   */
  connection: string;
  /**
   * Name of the source definition/build/job
   */
  source: string;
  version?: StringAllowExpressions;
  branch?: StringAllowExpressions;
  /**
   * When the artifact mentioned in this build resource completes a build, its allowed to trigger this pipeline
   */
  trigger?: string;
}
export interface ContainerResource {
  /**
   * ID for the container
   */
  container: string;
  /**
   * Type of the registry like ACR or GCR
   */
  type?: string;
  /**
   * Specify none to disable, true to trigger on all image tags, or use the full syntax
   */
  trigger?:
    | string
    | {
        enabled?: Boolean;
        tags?: IncludeExcludeStringFilters;
      };
  /**
   * Azure subscription (ARM service connection) for container registry
   */
  azureSubscription?: string;
  /**
   * Resource group for your ACR
   */
  resourceGroup?: string;
  /**
   * Registry for container images
   */
  registry?: string;
  /**
   * Name of the container image repository in ACR
   */
  repository?: string;
  /**
   * When true, uses a locally tagged image instead of using docker pull to get the image; the default is false
   */
  localImage?: string;
  /**
   * ID of the service endpoint connecting to a private container registry
   */
  endpoint?: string;
  env?: MappingOfStringString13;
  /**
   * Container image tag
   */
  image: string;
  /**
   * Set this flag to false to force the agent not to setup the /var/run/docker.sock volume on container jobs
   */
  mapDockerSocket?: string;
  /**
   * Options to pass into container host
   */
  options?: string;
  ports?: SequenceOfStringAllowExpressions2;
  volumes?: SequenceOfStringAllowExpressions3;
  mountReadOnly?: ReadOnlyMounts1;
  [k: string]: unknown | undefined;
}
/**
 * Variables to map into the container's environment
 */
export interface MappingOfStringString13 {
  [k: string]: unknown | undefined;
}
/**
 * Volumes to mount read-only, the default is all false
 */
export interface ReadOnlyMounts1 {
  /**
   * Mount the work directory as readonly
   */
  work?: string;
  /**
   * Mount the externals directory as readonly
   */
  externals?: string;
  /**
   * Mount the tools directory as readonly
   */
  tools?: string;
  /**
   * Mount the tasks directory as readonly
   */
  tasks?: string;
}
export interface PipelineResource {
  /**
   * ID of the pipeline resource. Acceptable values: [-_A-Za-z0-9]*
   */
  pipeline: string;
  /**
   * Project for the source; defaults to current project
   */
  project?: string;
  /**
   * Name of the pipeline that produces the artifact
   */
  source?: string;
  /**
   * The pipeline run number to pick the artifact, defaults to the latest pipeline successful across all stages
   */
  version?: string;
  /**
   * Branch to pick the artifact. Optional; defaults to all branches
   */
  branch?: string;
  tags?: SequenceOfNonEmptyString4;
  /**
   * Specify none to disable, true to include all branches, or use the full syntax of trigger definition
   */
  trigger?:
    | string
    | {
        /**
         * Whether the trigger is enabled; defaults to true
         */
        enabled?: string;
        /**
         * Branch names to include or exclude for triggering a run
         */
        branches?:
          | {
              include?: BranchFilterArray1;
              exclude?: BranchFilterArray2;
            }
          | BranchFilter[];
        stages?: SequenceOfNonEmptyString5;
        tags?: SequenceOfNonEmptyString6;
      };
}
export interface RepositoryResource {
  /**
   * ID of the external repository
   */
  repository: string;
  /**
   * ID of the service endpoint connecting to this repository
   */
  endpoint?: string;
  trigger?: Trigger;
  checkoutOptions?: RepositoryCheckoutOptions;
  /**
   * Repository name. Format depends on 'type'; does not accept variables
   */
  name?: string;
  /**
   * ref name to checkout; defaults to 'refs/heads/main'. The branch checked out by default whenever the resource trigger fires
   */
  ref?: string;
  /**
   * Type of repository: git, github, githubenterprise, and bitbucket
   */
  type?: 'git' | 'github' | 'githubenterprise' | 'bitbucket';
  [k: string]: unknown | undefined;
}
export interface RepositoryCheckoutOptions {
  /**
   * Scorch the repo before fetching?
   */
  clean?: 'true' | 'false';
  /**
   * Depth of Git graph to fetch
   */
  fetchDepth?: string;
  /**
   * Fetch tags?
   */
  fetchTags?: string;
  /**
   * Fetch and checkout Git LFS objects?
   */
  lfs?: string;
  /**
   * Fetch and checkout submodules?
   */
  submodules?: string;
  /**
   * Keep credentials available for later use?
   */
  persistCredentials?: string;
}
export interface WebhookResource {
  /**
   * Name of the webhook
   */
  webhook: string;
  /**
   * Name of the connection. In case of offline webhook this will be the type of Incoming Webhook otherwise it will be the type of the webhook extension.
   */
  connection: string;
  /**
   * Name of the webhook extension, leave this empty if it is an offline webhook
   */
  type?: string;
  filters?: WebhookFilters;
}
export interface WebhookFilter {
  /**
   * json path to select data from event payload
   */
  path: string;
  /**
   * Expected value for the filter to match
   */
  value: string;
}
export interface PackageResource {
  /**
   * Alias of package artifact
   */
  package: string;
  /**
   * Type of the package. Ex - NuGet, NPM etc.
   */
  type: string;
  /**
   * Name of the connection. This connection will be used for all the communication related to this artifact.
   */
  connection: string;
  /**
   * Name of the package
   */
  name: string;
  version?: StringAllowExpressions;
  tag?: StringAllowExpressions;
  /**
   * Trigger a new pipeline run when a new version of this package is available
   */
  trigger?: string;
}
export interface LegacyResource {
  repo?: LegacyRepoResourceAlias;
  /**
   * Scorch the repo before fetching?
   */
  clean?: 'true' | 'false';
  /**
   * Depth of Git graph to fetch
   */
  fetchDepth?: string;
  /**
   * Fetch and checkout Git LFS objects?
   */
  lfs?: string;
}
/**
 * Extends a template
 */
export interface Extends {
  /**
   * The template referenced by the pipeline to extend
   */
  template?: string;
  parameters?: Mapping4;
}
/**
 * Parameters used in the extend
 */
export interface Mapping4 {
  [k: string]: unknown | undefined;
}
export interface PhaseTargetWorkspace {
  /**
   * Scorch the repo before fetching?
   */
  clean?: 'outputs' | 'resources' | 'all';
}
/**
 * Parameters used in a phase template
 */
export interface Mapping5 {
  [k: string]: unknown | undefined;
}
export interface JobServices2 {
  [k: string]: unknown | undefined;
}
export interface JobWorkspace2 {
  /**
   * Which parts of the workspace should be scorched before fetching
   */
  clean?: 'outputs' | 'resources' | 'all';
}
