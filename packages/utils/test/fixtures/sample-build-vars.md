# Predefined variables

::: moniker range="azure-devops"

| Variable | Description | Available in templates? |
|----------|-------------|-------------------------|
| **`Build.BuildId`** | The ID of the record for the completed build. | Yes |
| **`Build.SourceBranch`** | The branch of the triggering repo the build was queued for. | No |
| **`System.AccessToken`** | Special variable carrying the security token used by the running build. | Yes |
| **`Agent.OS`** | The operating system of the agent host. | Yes |
| **`TF_BUILD`** | Set to `True` when the script is being run by a build task. | No |

::: moniker-end

::: moniker range="< azure-devops-2019"

| Variable | Description |
|----------|-------------|
| **Old.Variable** | Should not appear in output. |

::: moniker-end
