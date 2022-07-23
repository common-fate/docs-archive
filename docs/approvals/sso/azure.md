---
sidebar_position: 3
---

# Azure AD

## Azure AD setup

To set up Azure to sync users and groups with Granted we will need to create an access token to communicate with Azure's Graph API.

Sign in to your Azure portal as a user with [administrator privileges (opens new window)](https://portal.azure.com).

In the Console, search or select **App Registrations** from the list of resources on Azure and then select the **New registration** to make a new App.

Name the app 'Granted Directory Sync', Accounts in this organizational directory only (single tenant) for **Supported account types** and then click **Register**.

![](/img/sso/azure/register.png)

Your app will be shown in a table of other owned applications in azure. Click on the newly created app and we will now configure some scopes and create an access token.

Next, click on **API permissions** in the tabs on the left hand side. Click on **Add a permission**

![](/img/sso/azure/perms.png)

- Use Application permissions from **Microsoft Graph**
- Search for **User** and add: `User.Read.All`
- Then search for **Group** and add: `Group.Read.All`
- Finally search for **GroupMember** and add: `GroupMember.Read.All`
- Once you have selected the permissions click **Add permissions** to add them to your application.

This is where we can start up the `gdeploy sso configure` command. Run the following to begin the SSO setup:

```json
gdeploy sso configure
```

Select 'Azure' when prompted for the identity provider.

```json
? The SSO provider to deploy with  [Use arrows to move, type to filter]
  Google
  Okta
> Azure
```

Head back to the **Overview** tab in the Azure portal, and get the first two IDs from the Essentials section.
![](/img/sso/azure/new.png)

`gdeploy` will prompt you for IDs relating to your Azure AD tenancy.

1. For the `Tenant ID` param, copy and paste the **Directory (tenant) ID**.
2. For the `Client ID` param, copy and paste the **Application (client) ID**.

Next we will create a token, for this head into the **Certificates & secrets** tab in the left hand Nav, Under Client secrets. Create a new secret.

Give the secret a descriptive name, like `Granted-token`. It will create a secret and display a table showing the secret value.

Copy the secret value and use it for the **Client Secret** input in the `gdeploy` sso setup.

You should see an output similar to the below.

```
[✔] SSM Parameters set successfully
[i] The following parameters are required to setup a SAML app in your identity provider
+------------------------+---------------------------------------------------------+
|    OUTPUT PARAMETER    |                          VALUE                          |
+------------------------+---------------------------------------------------------+
| SAML SSO URL (ACS URL) | demo.auth.us-west-2.amazoncognito.com/saml2/idpresponse |
| Audience URI           | urn:amazon:cognito:sp:us-west-2_abcdefghi               |
+------------------------+---------------------------------------------------------+
```

Next you will need to setup a SAML app. When`gdeploy` prompts you for SAML metadata, select the "URL" option.

```
? Would you like to use a metadata URL, an XML string, or load XML from a file?  [Use arrows to move, type to filter]
> URL
  String
  File
```

You will see something like this, follow the [next section](#setting-up-saml-sso) to get the XML metadata required for this step.

```
? Metadata URL
```

## Setting up SAML SSO

To get started navigate to the **Enterprise applications** resource in the Azure console.

Click **New application**, then **Create your own application**. Call your app 'Granted SSO', and select the 'Integrate any other application you don't find in the gallery (Non-gallery)' option. Once done click **Create**

In the newly created enterprise application select **Single sign-on** from the left navbar

![](/img/sso/azure/SAML.png)

Then click the **SAML** sign on method from the options.
![](/img/sso/azure/options.png)

Set the **Reply URL (Assertion Consumer Service URL)** value in Azure AD to be the **SAML SSO URL (ACS URL)** from the gdeploy outputs

Set the **Identifier (Entity ID)** value in Azure AD to be the **Audience URI (Entity ID)** from `gdeploy`

The outputs will look like this:

```bash
[!] SAML outputs:
+------------------------+---------------------------------------------------------+
|    OUTPUT PARAMETER    |                          VALUE                          |
+------------------------+---------------------------------------------------------+
| SAML SSO URL (ACS URL) | demo.auth.us-west-2.amazoncognito.com/saml2/idpresponse |
| Audience URI           | urn:amazon:cognito:sp:us-west-2_abcdefghi               |
+------------------------+---------------------------------------------------------+
```

Hit save.

Then from the **SAML Signing Certificate** section, copy the **App Federation metadata Url**

Paste this URL into the gdeploy prompt asking for `SAML Metadata Url`

Finally you will need to create an adminitrator group with granted. You will be asked for `The ID of the Granted Administrators group in your identity provider:` 
- By default granted will set this to `granted_administrators`, press enter to continue with this or enter a admin group name of your choice. We will use the name of this newly created group at the next step.

You should see the following prompts
```
[i] Updating your deployment config
[✔] Successfully completed SSO configuration
[!] Your changes won't be applied until you redeploy. Run 'gdeploy update' to apply the changes to your CloudFormation deployment.

Users and will be synced every 5 minutes from your identity provider. To finish enabling SSO, follow these steps:
 1) Run 'gdeploy update' to apply the changes to your CloudFormation deployment.
 2) Run 'gdeploy users sync' to trigger an immediate sync of your user directory.
```

Once you have set your administrators group name, we will need to create that corresponding group in Azure.
In the Microsoft admin portal, to to *Teams & Groups* in the side nav.

![](/img/sso/azure/groups.png)

Click the **Add a group** button
- Make it a **Microsoft 365 group**


![](/img/sso/azure/admins.png)
- Name the group the same name as you set in the `gdeploy` config setup.

- Add yourself as a owner and any others you want to make granted admins for the members of the group.

![](/img/sso/azure/settings.png)
- Set the privacy type to private and set the email address

Hit **Create Group** at the end to complete.

You will need to redeploy using `gdeploy update` to update the indentity provider changes.

You will need to redeploy using `gdeploy update` to update the indentity provider changes.