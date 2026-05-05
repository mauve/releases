/* eslint-disable */
// Auto-generated. Do not edit by hand.
// Run: npx tsx scripts/gen-connection-inputs.ts
// Maps taskRef → { canonicalInputName → connectionKind }

export const taskConnectionInputs: Record<string, Record<string, string>> = {
  "AppCenterDistribute@3": {
    "serverEndpoint": "vsmobilecenter"
  },
  "AppCenterTest@1": {
    "serverEndpoint": "vsmobilecenter"
  },
  "AzureAppConfigurationExport@10": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzureAppConfigurationImport@10": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzureAppConfigurationSnapshot@1": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzureAppServiceManage@0": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzureAppServiceSettings@1": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzureCLI@2": {
    "connectedServiceNameARM": "AzureRM"
  },
  "AzureCLI@3": {
    "connectedServiceNameARM": "AzureRM",
    "azureDevOpsServiceConnection": "WorkloadIdentityUser"
  },
  "AzureContainerApps@1": {
    "connectedServiceNameARM": "AzureRM"
  },
  "AzureFileCopy@4": {
    "ConnectedServiceNameARM": "AzureRM"
  },
  "AzureFileCopy@5": {
    "ConnectedServiceNameARM": "AzureRM"
  },
  "AzureFileCopy@6": {
    "ConnectedServiceNameARM": "AzureRM"
  },
  "AzureFunction@2": {
    "azureServiceConnection": "AzureRM"
  },
  "AzureFunctionApp@1": {
    "azureSubscription": "AzureRM"
  },
  "AzureFunctionApp@2": {
    "azureSubscription": "AzureRM"
  },
  "AzureFunctionAppContainer@1": {
    "azureSubscription": "AzureRM"
  },
  "AzureFunctionOnKubernetes@1": {
    "dockerRegistryServiceConnection": "dockerregistry",
    "kubernetesServiceEndpoint": "kubernetes",
    "azureSubscriptionEndpoint": "AzureRM"
  },
  "AzureIoTEdge@2": {
    "connectedServiceNameARM": "AzureRM",
    "dockerRegistryEndpoint": "dockerregistry",
    "azureSubscriptionEndpoint": "AzureRM"
  },
  "AzureKeyVault@2": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzureMonitor@1": {
    "connectedServiceNameARM": "AzureRM"
  },
  "AzureMysqlDeployment@2": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzurePolicyCheckGate@0": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzurePowerShell@4": {
    "ConnectedServiceNameARM": "AzureRM"
  },
  "AzurePowerShell@5": {
    "ConnectedServiceNameARM": "AzureRM"
  },
  "AzureResourceGroupDeployment@2": {
    "ConnectedServiceName": "AzureRM",
    "deploymentGroupEndpoint": "ExternalTfs"
  },
  "AzureResourceManagerTemplateDeployment@3": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzureRmWebAppDeployment@4": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzureRmWebAppDeployment@5": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzureSpringCloud@0": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzureTestPlan@0": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzureVmssDeployment@0": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzureVmssDeployment@1": {
    "ConnectedServiceName": "AzureRM"
  },
  "AzureWebApp@1": {
    "azureSubscription": "AzureRM"
  },
  "AzureWebAppContainer@1": {
    "azureSubscription": "AzureRM"
  },
  "BicepDeploy@0": {
    "ConnectedServiceName": "AzureRM"
  },
  "CargoAuthenticate@0": {
    "cargoServiceConnections": "externalcargorepository"
  },
  "ContainerBuild@0": {
    "dockerRegistryServiceConnection": "dockerregistry"
  },
  "CopyFilesOverSSH@0": {
    "sshEndpoint": "ssh"
  },
  "cURLUploader@2": {
    "serviceEndpoint": "Generic"
  },
  "Docker@1": {
    "dockerRegistryEndpoint": "dockerregistry",
    "azureSubscriptionEndpoint": "AzureRM",
    "dockerHostEndpoint": "dockerhost"
  },
  "Docker@2": {
    "containerRegistry": "dockerregistry"
  },
  "DockerCompose@1": {
    "dockerRegistryEndpoint": "dockerregistry",
    "azureSubscriptionEndpoint": "AzureRM",
    "dockerHostEndpoint": "dockerhost"
  },
  "DotNetCoreCLI@2": {
    "ConnectedServiceName": "AzureRM",
    "externalEndpoints": "ExternalNuGetFeed",
    "externalEndpoint": "ExternalNuGetFeed"
  },
  "DownloadGitHubRelease@0": {
    "connection": "github"
  },
  "FtpUpload@2": {
    "serverEndpoint": "Generic"
  },
  "GitHubComment@0": {
    "gitHubConnection": "github_OAuth_PersonalAccessToken_InstallationToken_Token"
  },
  "GitHubRelease@1": {
    "gitHubConnection": "github_OAuth_OAuth2_PersonalAccessToken_InstallationToken_Token"
  },
  "HelmDeploy@0": {
    "azureSubscriptionEndpoint": "AzureRM",
    "kubernetesServiceEndpoint": "kubernetes",
    "azureSubscriptionEndpointForACR": "AzureRM"
  },
  "HelmDeploy@1": {
    "azureSubscriptionEndpoint": "AzureRM",
    "kubernetesServiceEndpoint": "kubernetes",
    "azureSubscriptionEndpointForACR": "AzureRM"
  },
  "InvokeRESTAPI@1": {
    "connectedServiceName": "Generic",
    "connectedServiceNameARM": "AzureRM"
  },
  "JavaToolInstaller@0": {
    "azureResourceManagerEndpoint": "AzureRM"
  },
  "JavaToolInstaller@1": {
    "azureResourceManagerEndpoint": "AzureRM"
  },
  "JenkinsDownloadArtifacts@1": {
    "serverEndpoint": "Jenkins",
    "ConnectedServiceNameARM": "AzureRM"
  },
  "JenkinsDownloadArtifacts@2": {
    "serverEndpoint": "Jenkins",
    "ConnectedServiceNameARM": "AzureRM"
  },
  "JenkinsQueueJob@2": {
    "serverEndpoint": "Jenkins"
  },
  "KubeloginInstaller@0": {
    "gitHubConnection": "github_OAuth_OAuth2_PersonalAccessToken_InstallationToken_Token"
  },
  "Kubernetes@1": {
    "kubernetesServiceEndpoint": "kubernetes",
    "azureSubscriptionEndpoint": "AzureRM",
    "dockerRegistryEndpoint": "dockerregistry",
    "azureSubscriptionEndpointForSecrets": "AzureRM"
  },
  "KubernetesManifest@1": {
    "kubernetesServiceEndpoint": "kubernetes",
    "azureSubscriptionEndpoint": "AzureRM",
    "dockerRegistryEndpoint": "dockerregistry"
  },
  "Maven@4": {
    "ConnectedServiceName": "AzureRM"
  },
  "MavenAuthenticate@0": {
    "mavenServiceConnections": "externalmavenrepository"
  },
  "Notation@0": {
    "azurekvServiceConection": "AzureRM"
  },
  "Npm@1": {
    "customEndpoint": "externalnpmregistry",
    "publishEndpoint": "externalnpmregistry"
  },
  "npmAuthenticate@0": {
    "customEndpoint": "externalnpmregistry"
  },
  "NuGetAuthenticate@1": {
    "nuGetServiceConnections": "ExternalNuGetFeed"
  },
  "NuGetCommand@2": {
    "externalEndpoints": "ExternalNuGetFeed",
    "externalEndpoint": "ExternalNuGetFeed"
  },
  "PackerBuild@1": {
    "ConnectedServiceName": "AzureRM"
  },
  "PipAuthenticate@0": {
    "externalSources": "externalPythonDownloadFeed"
  },
  "PipAuthenticate@1": {
    "pythonDownloadServiceConnections": "externalPythonDownloadFeed"
  },
  "PublishSymbols@2": {
    "ConnectedServiceName": "AzureRM"
  },
  "PublishToAzureServiceBus@1": {
    "connectedServiceName": "AzureServiceBus"
  },
  "PublishToAzureServiceBus@2": {
    "connectedServiceName": "AzureRM"
  },
  "ServiceFabricDeploy@1": {
    "serviceConnectionName": "servicefabric",
    "dockerRegistryEndpoint": "dockerregistry",
    "azureSubscriptionEndpoint": "AzureRM"
  },
  "ServiceFabricPowerShell@1": {
    "serviceConnectionName": "servicefabric"
  },
  "SqlAzureDacpacDeployment@1": {
    "ConnectedServiceName": "Azure",
    "ConnectedServiceNameARM": "AzureRM"
  },
  "SSH@0": {
    "sshEndpoint": "ssh"
  },
  "TwineAuthenticate@0": {
    "externalSources": "externalPythonUploadFeed"
  },
  "TwineAuthenticate@1": {
    "pythonUploadServiceConnection": "externalPythonUploadFeed"
  },
  "UniversalPackages@0": {
    "externalEndpoint": "externaltfs",
    "externalEndpoints": "externaltfs"
  },
  "VSTest@3": {
    "ConnectedServiceName": "AzureRM"
  }
};
