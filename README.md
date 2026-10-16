# PowerZebraFrontend

## Deploying the frontend container to Azure

The deployment workflow builds `Meetly.Frontend/Dockerfile`, pushes an image
tagged with the commit SHA to Azure Container Registry (ACR), and configures
the Linux Azure Web App `meetly-frontend` to run that image.

### GitHub configuration

Add these repository variables under **Settings > Secrets and variables >
Actions > Variables**:

- `ACR_NAME`: the ACR resource name, without `.azurecr.io`.
- `AZURE_RESOURCE_GROUP`: the resource group containing the Web App.
- `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`: the Entra
  application/service principal used by the workflow to sign in with OIDC.

Configure a federated credential on that Entra application for this GitHub
repository's `main` branch. Use the subject
`repo:Pontusthoren-del/PowerZebraFrontend:ref:refs/heads/main` and audience
`api://AzureADTokenExchange`. Grant the service principal the `AcrPush` role
on the ACR and the `Website Contributor` role on the Web App.

### One-time Azure setup

The Web App must use a Linux App Service plan. Enable its system-assigned
identity and grant that identity permission to pull from ACR:

```sh
az webapp identity assign --resource-group <resource-group> --name meetly-frontend --query principalId --output tsv
az acr show --name <acr-name> --query id --output tsv
az role assignment create --assignee <web-app-principal-id> --scope <acr-resource-id> --role AcrPull
az acr config authentication-as-arm update --registry <acr-name> --status enabled
```

Replace the placeholders with the values returned by the preceding commands.
The workflow configures the Web App to use this identity, sets its container
port to `8080`, and restarts it after each deployment.
