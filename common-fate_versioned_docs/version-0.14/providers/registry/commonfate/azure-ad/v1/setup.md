# Setup
## commonfate/azure-ad@v1
:::info
When setting up a provider for your deployment, we recommend using the [interactive setup workflow](../../../interactive-setup.md) which is available from the Providers tab of your admin dashboard.
:::
## Example granted_deployment.yml
```yaml
version: 2
deployment:
  stackName: example
  account: "12345678912"
  region: ap-southeast-2
  release: v0.12.0
  parameters:
    CognitoDomainPrefix: example
    AdministratorGroupID: granted_administrators
    ProviderConfiguration:
      azure-ad:
        uses: commonfate/azure-ad@v1
        with:
          clientId: ""
          clientSecret: '*****'
          tenantId: ""

```
## Create a new app in Azure
### Configuration Fields
This step will guide you through collecting the values for these fields required to setup your provider.

| Field | Description |
| ----------- | ----------- |
| tenantId | the azure tenant ID |
| clientId | the azure client ID |
In the Azure portal, search or select **App Registrations** from the list of resources on Azure and then select the **New registration** to make a new App.
![](https://static.commonfate.io/providers/azure/app-registrations.png)

Name the app 'Common Fate Azure AD Groups Provider', Accounts in this organizational directory only (single tenant) for **Supported account types** and then click **Register**.

![](https://static.commonfate.io/providers/azure/registernew.png)

Your app will be shown in a table of other owned applications in azure. Click on the newly created app and we will now configure some scopes and create an access token.

Next, click on **API permissions** in the tabs on the left hand side. Click on **Add a permission**

![](https://static.commonfate.io/providers/azure/perms.png)

Use Application permissions from **Microsoft Graph**

Search for **User** and add: `User.ReadWrite.All`

Then search for **Group** and add: `Group.ReadWrite.All`

Finally search for **GroupMember** and add: `GroupMember.ReadWrite.All`

Once you have selected the permissions click **Add permissions** to add them to your application.

Make sure you click **Grant admin consent** above the permissions table and permit the scopes on the application.

Navigate to the **Overview** tab in the Azure portal, and get the first two IDs from the Essentials section.
![](https://static.commonfate.io/providers/azure/new.png)
## Create a new client secret
### Configuration Fields
This step will guide you through collecting the values for these fields required to setup your provider.

| Field | Description |
| ----------- | ----------- |
| clientSecret | the azure API token |
Navigate to the **Certificates & secrets** tab in the left hand Nav of the Azure portal.

Under Client secrets, **click** Create a new secret.

Give the secret a descriptive name, like `Common-Fate-Token`. It will create a secret and display a table showing the secret value.

Copy the secret value and use it for the **clientSecret** input.
