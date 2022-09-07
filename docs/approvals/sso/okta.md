---
sidebar_position: 3
---

# Okta

## Okta setup

### Creating Access Token

To set up Okta to sync users and groups with Granted Approvals we will need to create an access token to communicate with Okta's API.

Sign in to your Okta organization as a user with [administrator privileges (opens new window)](https://help.okta.com/okta_help.htm?id=ext_Security_Administrators).

:::info
API tokens have the same permissions as the user who creates them, and if the user permissions change, the API token permissions also change.

See the section above on **Privilege level**, regarding the use of a service account when creating an API token, to specifically control the privilege level associated with the token.
:::

In the Admin Console, select **API** from the **Security** menu and then select the **Tokens** tab from within the API page.

![](/img/sso/okta/01.png)

Click **Create Token**.

Name your token and click **Create Token**.

A pop up will appear showing your access token, leave this open and continue with the configure setup below.

### Running Gdeploy Commands

This is where we can start up the `gdeploy identity sso enable` command. Run the following to begin the SSO setup:

```json
> gdeploy identity sso enable
```

You will be prompted to select you identity provider, select Okta.

```json
? The SSO provider to deploy with  [Use arrows to move, type to filter]
  Google
> Okta
```

1. For the `API Token`, copy and paste the token value from the previous steps.

```json
? API Token: ****
```

2. For the `Okta Org URL` set the value to the your okta domain e.g. `https://yourcompany.okta.com`

```
? Okta Org URL: https://yourcompany.okta.com
```

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

Next you will need to setup a SAML app, you will see the below prompt, Okta supports both a URL and XML so choose what suits you.

```
? Would you like to use a metadata URL, an XML string, or load XML from a file?  [Use arrows to move, type to filter]
> URL
  String
  File
```

You will see something like this, follow the [next section](#setting-up-saml-sso) to get the XML Metadata required for this step.

```
? Metadata URL
```

## Setting up SAML SSO

To get started navigate to the **Applications** tab of the admin console in okta.

![](/img/sso/okta/02.png)

Click create a new App Integration in Okta, then select the SAML 2.0 option. Give your integration a name, and upload an app logo. Once done click **next**.

![](/img/sso/okta/03.png)

![](/img/sso/okta/04.png)

On the **Configure SAML** page you will need some of the outputs from the previous step in the CLI workflow.

Look back in your terminal for an output that looks like the below.

```
[i] The following parameters are required to setup a SAML app in your identity provider
+------------------------+---------------------------------------------------------+
|    OUTPUT PARAMETER    |                          VALUE                          |
+------------------------+---------------------------------------------------------+
| SAML SSO URL (ACS URL) | demo.auth.us-west-2.amazoncognito.com/saml2/idpresponse |
| Audience URI           | urn:amazon:cognito:sp:us-west-2_abcdefghi               |
+------------------------+---------------------------------------------------------+
```

On the **Configure SAML** page

- For the **Single sign on URL** copy the `SAML SSO URL (ACS URL)` from the output.
- For the **Audience URI** copy the `Audience URI` from the output.

![](/img/sso/okta/05.png)

### Configuring SAML Attributes

Under **Attribute Statements** add a statement with the following information.

- For Name, enter: **`http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`**
- For Value, enter: `user.email`

Click **Next** and then **Finish** on the Feedback page to create the application.

:::info
You'll need to assign yourself to the application so that you can test the SAML SSO connection.
:::

Follow these steps to assign a user to the application:

On the **Assignments** tab for your Okta app, for **Assign**, choose **Assign to People**.

Choose **Assign** next to the user that you want to assign.**Note:** If this is a new account, the only option available is to choose yourself (the admin) as the user.

(Optional) For **User Name**, enter a user name, or leave it as the user's email address, if you want.

Choose **Save and Go Back,** followed by **Done**.

Next navigate to the **Sign On** tab for your Okta app.

Find the **SAML Signing Certificates** section where you should see a list of signing certificates. Find the most recent active certificate and click the **Actions** drop down in the right hand column.
![](/img/sso/okta/06.png)

From the drop down click **View IdP metadata**, you will be redirected to your metadata, copy the URL address of the redirected site. It should look like this, alternatively, you can copy or download the XML depending on what option you chose in the CLI:

![](/img/sso/okta/07.png)

Copy the URL. eg. `https://demo.okta.com/app/abcd1234/sso/saml/metadata` and paste it into the CLI prompt.

```
? Metadata URL: https://demo.okta.com/app/abcd1234/sso/saml/metadata
```

### Creating Granted Approvals Administrator Group

Finally you will need to create an administrator group with granted. You will be asked for `The ID of the Granted Administrators group in your identity provider:`

- By default granted will set this to `granted_administrators`, press enter to continue this or enter a admin group name of your choice. We will use the name of this newly created group at the next step.

You should see the following prompts

```
[i] Updating your deployment config
[✔] Successfully completed SSO configuration
[!] Your changes won't be applied until you redeploy. Run 'gdeploy update' to apply the changes to your CloudFormation deployment.

Users and will be synced every 5 minutes from your identity provider. To finish enabling SSO, follow these steps:
 1) Run 'gdeploy update' to apply the changes to your CloudFormation deployment.
 2) Run 'gdeploy identity sync' to trigger an immediate sync of your user directory.
```

Once you have set your administrators group name, we will need to create that corresponding group in Okta
In the Okta admin portal, to _Directory>Groups_

![](/img/sso/okta/08.png)

Click the **Add Group** button

![](/img/sso/okta/09.png)

- Name the group the same name as you set in the `gdeploy` config setup.

Add yourself and any others you want to make granted admins to the group in Okta.

You will need to redeploy using `gdeploy update` to update the identity provider changes.
