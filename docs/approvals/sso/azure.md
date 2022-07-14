---
sidebar_position: 3
---

# Azure AD

## Azure AD setup

To set up Azure to sync users and groups with Granted we will need to create an access token to communicate with Azure's Graph API.

Sign in to your Azure portal as a user with [administrator privileges (opens new window)](https://portal.azure.com).

In the Console, search or select **App Registrations** from the list of resources on Azure and then select the **New registration** to make a new App.

Name the app 'Granted Directory Sync', select single tenant for **Supported account types** and then click **Register**.

![](/img/sso/azure/register.png)

Your app will be shown in a table of other owned applications in azure. Click on the newly created app and we will now configure some scopes and create an access token.

Next, click on **API permissions** in the tabs on the left hand side. Click on **Add a permission**

![](/img/sso/azure/perms.png)

- Use Application permissions from **Microsoft Graph**
- Search for **User** and add: `User.Read.All`
- Then search for **Group** and add: `Group.Read.All`
- Finally search for **GroupMember** and add: `GroupMember.Read.All`
  This is where we can start up the `gdeploy sso configure` command. Run the following to begin the SSO setup:

```json
> gdeploy sso configure
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
+------------------+-------------------------------------------+
| OUTPUT PARAMETER |                   VALUE                   |
+------------------+-------------------------------------------+
| CognitoDomain    | demo.auth.us-west-2.amazoncognito.com     |
| AudienceURI      | urn:amazon:cognito:sp:us-west-2_abcdefg   |
+------------------+-------------------------------------------+
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

Edit the **Identifier (Entity ID)** and **Reply URL (Assertion Consumer Service URL)** with the values found from the `gdeploy` outputs

The outputs will look like this:

```bash
[!] SAML outputs:
+------------------+-----------------------------------------------------------------+
| OUTPUT PARAMETER |                              VALUE                              |
+------------------+-----------------------------------------------------------------+
| CognitoDomain    | granted-login-cf-dev-jack.auth.ap-southeast-2.amazoncognito.com |
| AudienceURI      |                |
+------------------+-----------------------------------------------------------------+
```

Hit save.

Then from the **SAML Signing Certificate** section, copy the **App Federation metadata Url**

Paste this URL into the gdeploy prompt asking for `SAML Metadata Url`

If all goes well, you will see the following confirmation.

```
[i] Updating your deployment config
[✔] Successfully completed SSO configuration
[!] Your changes won't be applied until you redeploy. Run 'gdeploy update' to apply the changes to your CloudFormation deployment.
```

Lastly, we will set up some users and groups that can access Granted Approvals with Azure as SSO.

Select the **Users and Groups** tab in the sidebar, then **Add user/group**.

- From here you will be able to select which users and/or groups you want to provision access to the approvals application.

You will need to redeploy using `gdeploy update` to update the indentity provider changes.
