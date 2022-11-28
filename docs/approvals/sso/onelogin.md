---
sidebar_position: 3
---

# OneLogin

:::info
Common Fate user and group sync requires some credentials to be configured in your identity provider account. Common Fate uses [OAuth2.0 authentication](https://developers.onelogin.com/api-docs/2/oauth20-tokens/generate-tokens-2) to read users and groups from your directory and sync them to an internal database every 5 minutes.
:::

## Setup

### Creating Access Tokens in OneLogin

To set up OneLogin to sync users and groups with Common Fate we will need to create an access token to the developer API.

Sign in to your OneLogin admin portal using a user profile with administrative privileges.

From the home screen hover over the **Developers** tab in the navbar, then from the options select **API Credentials**
![](/img/sso/onelogin/1.png)

On the API Credentials screen there will be a button in the top right of the page to make a **New Credential**, click it to make a new credential.

![](/img/sso/onelogin/2.png)

![](/img/sso/onelogin/3.png)

Give your credential a descriptive name. Make sure _Read users_ is the selected permission and then click Save.

A new pop-up window will open, leave this open and move onto the next steps.

### Running `gdeploy` Commands

This is where we can start up the `gdeploy identity sso enable` command. Run the following to begin the SSO setup:

```bash
gdeploy identity sso enable
```

Select 'OneLogin' when prompted for the identity provider.

```bash
? The SSO provider to deploy with  [Use arrows to move, type to filter]
  Google
  Okta
> OneLogin
```

Head back to your OneLogin admin portal where you left it open, there will be a client ID and Client secret which you will be able to copy.

`gdeploy` will prompt you for IDs relating to your OneLogin tenancy.

1. For the `Base URL` parameter, get your tenancies url. This can be copied from your admin portal. It will have a format like this: `https://{tenantName}.onelogin.com`
2. For the `Client ID` param, copy and paste the **Client ID**.
3. For the `Client Secret` param, copy and paste the **Client Secret**.

You should see an output similar to the below.

```
[✔] SSM Parameters set successfully
[i] The following parameters are required to set up a SAML app in your identity provider
+------------------------+---------------------------------------------------------+
|    OUTPUT PARAMETER    |                          VALUE                          |
+------------------------+---------------------------------------------------------+
| SAML SSO URL (ACS URL) | demo.auth.us-west-2.amazoncognito.com/saml2/idpresponse |
| Audience URI           | urn:amazon:cognito:sp:us-west-2_abcdefghi               |
+------------------------+---------------------------------------------------------+
```

Next you will need to set up a SAML app. When `gdeploy` prompts you for SAML metadata, select the "URL" option.

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

To get started navigate to the **Applications** heading in the navbar, then select **Applications** from the drop down.

![](/img/sso/onelogin/4.png)

Click **Add App**, Then in the search box, search for 'SAML custom connector'. Click on `SAML Custom Connector (Advanced)`.
![](/img/sso/onelogin/5.png)
Enter "Granted SAML SSO" as the display name for the application, then click Save.
![](/img/sso/onelogin/6.png)

Then navigate into the configuration for our newly created application. We will need some values that `gdeploy` has given us.

![](/img/sso/onelogin/7.png)

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

- Set the **Audience (EntityID)** value in Azure AD to be the **Audience URI (Entity ID)** from the gdeploy outputs

- Set the **ACS (Consumer) URL Validator** value in Azure AD to be the **SAML SSO URL (ACS URL)** from `gdeploy`
- Set the **ACS (Consumer) URL** value in Azure AD to be the **SAML SSO URL (ACS URL)** from `gdeploy`

Hit save.

From the same page, in the **Parameters** section we will want to add a SAML claim.
_Note: One parameter (NameID) is already listed—this is expected._

Press the plus symbol on the right of the table and a modal will pop up.

- For the name of the field we want to call it `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`
- Click **Include in SAML assertion** checkbox.
- Click save.
- For value, choose **Email** from the list
- Click save.
  ![](/img/sso/onelogin/8.png)

Click save in the top right again to save these details.

We will need to get the SAML metadata URL. We can get this by heading to the **SSO** section on the same page.

- Copy the **Issuer URL**
  ![](/img/sso/onelogin/9.png)

Paste this URL into the gdeploy prompt asking for `Metadata Url`

Finally you will need to create an adminitrator group with granted. You will be asked for `The ID of the Granted Administrators group in your identity provider:`

To get this group ID we will need to make the administrator group in OneLogin.

_Note: OneLogin's concept of groups is called 'Roles' so we will be refering to Roles from now on._

### Creating Common Fate Administrator Role

In the OneLogin Admin portal, hover on **Users** in the navbar, and then select **Roles** from the list.

- Click the **New Role** button from the top right.

![](/img/sso/onelogin/10.png)

Give the role a name (note: this will be the name of your group of administrators for granted, so we'd suggest using "granted_admins" or similar). Click the green tick and then click save to create the new role.

![](/img/sso/onelogin/11.png)

To add members to this group, visit the edit details page for the Role. Then go to the Users section.
Search for the users and add them to the Role.

![](/img/sso/onelogin/12.png)

`gdeploy` should pull the groups and give a list of ID's that it has found, find the admin group and select the ID that will be used for the admin group. Press enter.

You should see the following:

```
[i] Updating your deployment config
[✔] Successfully completed SSO configuration
[!] Your changes won't be applied until you redeploy. Run 'gdeploy update' to apply the changes to your CloudFormation deployment.

Users and will be synced every 5 minutes from your identity provider. To finish enabling SSO, follow these steps:
 1) Run 'gdeploy update' to apply the changes to your CloudFormation deployment.
 2) Run 'gdeploy identity sync' to trigger an immediate sync of your user directory.
```

You will need to redeploy using `gdeploy update` to update the identity provider changes.
