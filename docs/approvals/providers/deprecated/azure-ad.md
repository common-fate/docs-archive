---
sidebar_position: 4
---

# Azure AD Groups

## Prerequisites

In the Azure AD portal, search or select **App Registrations** from the list of resources on Azure and then select the **New registration** to make a new App.
![](/img/sso/azure/app-registrations.png)

Name the app 'Granted Azure AD Groups Provider', Accounts in this organizational directory only (single tenant) for **Supported account types** and then click **Register**.

![](/img/sso/azure/registernew.png)

Your app will be shown in a table of other owned applications in azure. Click on the newly created app and we will now configure some scopes and create an access token.

Next, click on **API permissions** in the tabs on the left hand side. Click on **Add a permission**

![](/img/sso/azure/perms.png)

- Use Application permissions from **Microsoft Graph**
- Search for **User** and add: `User.ReadWrite.All`
- Then search for **Group** and add: `Group.ReadWrite.All`
- Finally search for **GroupMember** and add: `GroupMember.ReadWrite.All`
- Once you have selected the permissions click **Add permissions** to add them to your application.

Make sure you click **Grant admin consent** above the permissions table and permit the scopes on the application.

## Setup instructions

:::info
Make sure you have AWS credentials before attempting the provider setup.
:::

This is where we can start up the `gdeploy provider add` command. Run the following to begin the Provider setup:

```json
gdeploy provider add
```

Select 'Azure-AD groups (commonfate/azure-ad@v1)' when prompted for the provider.

```json
? What are you trying to grant access to?  [Use arrows to move, type to filter]
> Okta groups (commonfate/okta@v1)
  Azure-AD groups (commonfate/azure-ad@v1)
  AWS SSO PermissionSets (commonfate/aws-sso@v1)
  TestVault - a provider for testing out Granted Approvals (commonfate/testvault@v1)
```

gdeploy will prompt for a ID for the provider, call this `azure-ad`

Head back to the **Overview** tab in the Azure portal, and get the first two IDs from the Essentials section.
![](/img/sso/azure/new.png)

`gdeploy` will prompt you for some ID's and credentials.

1. For the `Client ID` param, copy and paste the **Application (client) ID**.
2. For the `Tenant ID` param, copy and paste the **Directory (tenant) ID**.


Next we will create a token, for this head into the **Certificates & secrets** tab in the left hand Nav, Under Client secrets. Create a new secret.

Give the secret a descriptive name, like `Granted-token`. It will create a secret and display a table showing the secret value.

Copy the secret value and use it for the **Client Secret** input.

Your provider will now be set in your Granted Approvals config. Run `gdeploy update` to push the change to your Granted Approvals deployment.
