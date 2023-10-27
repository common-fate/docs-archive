---
sidebar_position: 2
---

# Google Workspace

:::info
Glide user and group sync requires some credentials to be configured in your identity provider account. Glide uses [2LO](https://developers.google.com/identity/protocols/oauth2/service-account) authentication to read users and groups from your directory and sync them to an internal database every 5 minutes.
:::

## Setup

Set up a [Project](https://cloud.google.com/resource-manager/docs/creating-managing-projects) in Google Cloud. Enable use of the Admin SDK by visiting [this link](https://console.cloud.google.com/apis/library/admin.googleapis.com) and clicking **Enable**.

![](/img/sso/google/01-enablesdk.png)

### Create Service Account

First, we need to create a service account:

Start by opening the [Service accounts page](https://console.developers.google.com/iam-admin/serviceaccounts) and select the project you created in the previous steps.

Click  **Create service account,** you will be taken to a page that looks like this.

![](/img/sso/google/02-createserviceaccount.png)

Under **Service account details**, type a name, ID, and description for the service account, then click **Create and continue**.

**_Optional_**: Under **Grant this service account access to project**, select the IAM roles to grant to the service account.

Then click **Continue,** followed by **Done**. This will now have created a new service account.

Next, you will need to delegate domain-wide authority to the service account.

:::note
To complete this step you require an admin user account, enabling you to access the admin console.
:::

From your Google Workspace domain's [Admin console](https://admin.google.com/) (different to your GCP admin console), go to **Main menu > Security > Access and data control > API Controls**.

![](/img/sso/google/04-domain-delegation.png)

In the **Domain wide delegation** pane, select **Manage Domain Wide Delegation**.Click **Add new**.

In the OAuth **Client ID** field, enter the service account's OAuth **Client ID**. You can find your service account's client ID in the [Service accounts page](https://console.developers.google.com/iam-admin/serviceaccounts).

In the **OAuth scopes (comma-delimited)** field, enter the list of scopes that your application should be granted access to. For us it will be:

```
https://www.googleapis.com/auth/admin.directory.user.readonly,
https://www.googleapis.com/auth/admin.directory.group.readonly,
```

Click **Authorize**.

Head back over to the Service Accounts page in GCP where all the service accounts are listed. Find the service account you just created, use the filter search at the top if there are many service accounts in your project.
s
Click on the service account you have just created and you will be redirected to a page that looks like this

![](/img/sso/google/03-createdserviceaccount.png)

### Create Keys

In the nav bar navigate to **Keys**. Click **ADD KEY**, followed by **Create new key**.

![](/img/sso/google/04-createkey.png)

Click **Create**. This will download the JSON key to your machine, make sure to remove this from your machine once the set up is complete.

![](/img/sso/google/05-createjsonkey.png)

### Running Gdeploy Commands

Open a terminal in the same folder as your `deployment.yml` file, and then run:

```
gdeploy identity sso enable
```

You will be prompted to select you identity provider, select Google.

```
? The SSO provider to deploy with  [Use arrows to move, type to filter]
> Google
  Okta
```

1.  For the `Google Workspace Domain` set the value to the domain that your Google workspace is linked to into eg. `commonfate.io`

```
? Google Workspace Domain: commonfate.io
```

2. For the `Google Admin Email` use an admin users email address to the eg. `admin@acmecorp.io` We suggest making a new user account that is only linked to this deployment and using that email.

:::info
This user will need to be an admin in the [Admin console](https://admin.google.com/)
:::

```json
? Google Admin Email: admin@acmecorp.io
```

3. For the `API Token` parameter, gdeploy will ask for the path to the previously downloaded JSON key. Enter the path to where it was downloaded or move it into the same directory as gdeploy is running and enter `./{filename}.json`

```
? API Token: ****
```

:::info
Due to a limitation in the Google Workspace Directory API, the service account must impersonate an administrative user in order to access the directory. Additionally, the user must have logged in at least once and accepted the Google Workspace Terms of Service.

The scopes provided to the service account are read-only.
:::

Delete the downloaded JSON file from your computer.

### Configuring SSO Scopes

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

Next, you will need to set up a SAML app, you will see the below prompt. Google supplies only XML, select **String** or **File**.

```
? Would you like to use a metadata URL, an XML string, or load XML from a file?  [Use arrows to move, type to filter]
> URL
  String
  File
```

You will a similar output, follow the [next section](#setting-up-saml-sso) to get the XML Metadata required for this step.

```
? Metadata URL
```

## Setting Up SAML SSO

1. From the Admin console Home page, go to **Apps > Web and mobile apps**.

2. Click **Add App > Add custom SAML app**.

3. On the **App Details** page:
   1. Enter the name of the custom app.
   2. (Optional) Upload an **app icon**. The app icon appears on the Web and mobile apps list, on the app settings page, and in the app launcher. If you don't upload an icon, an icon is created using the first two letters of the app name.
   3. Click **Continue**.
   4. You will then be prompted to download the Idp metadata, click download and save it to your machine.

![](/img/sso/google/05.png)

Click **Continue**.

On the **Service provider details** page you will need some of the outputs from the previous step in the CLI workflow.

Look back in your terminal for an output that looks like the below.

```
[i] The following parameters are required to set up a SAML app in your identity provider
+------------------------+---------------------------------------------------------+
|    OUTPUT PARAMETER    |                          VALUE                          |
+------------------------+---------------------------------------------------------+
| SAML SSO URL (ACS URL) | demo.auth.us-west-2.amazoncognito.com/saml2/idpresponse |
| Audience URI           | urn:amazon:cognito:sp:us-west-2_abcdefghi               |
+------------------------+---------------------------------------------------------+
```

On the **Service provider details** page

- For the **ACS URL** copy the `SAML SSO URL (ACS URL)` from the output.
- For the **Entity ID** copy the `Audience URI ` from the output.

![](/img/sso/google/06.png)

Click **Next**, where we will set up an attribute mapping for emails.

Under **Attributes** add a mapping with the following information

- For Google directory attributes, find `Primary email`
- For App attributes, enter: **`http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`**

![](/img/sso/google/attribute-mapping.png)

Leave **Group membership (optional)** empty.

Click **Finish** to create the application.

### Assign the SAML App to All Users

Before users can sign in using Google, they need to have access to the SAML app.

From the `Web and mobile apps` page, click on the app we just created.

There should be a panel with the heading 'User access', Click on this panel and you will be taken to an detailed screen.

![](/img/sso/google/enable-user-access1.png)

Click on service status and change this to `ON for everyone`

![](/img/sso/google/enable-user-access2.png)

Click save.

### Creating Glide Administrator Group

In the Google admin portal, to to _Directory>Groups_

![](/img/sso/google/07.png)

Click the **Create Group** button

![](/img/sso/google/08.png)

- Name the group something descriptive like `granted_administrators`

Add yourself and any others you want to make granted admins to the group in Google.

For the group settings make sure:

- Set the **Access type** to Custom
- Set the join policy of the group to Invite only.
  ![](/img/sso/google/09.png)

Then click **Create Group**

Finally, back in the terminal, select either String or File then use the metadata that you downloaded.

```
? Metadata XML file: google-metatdata.xml
```

You will be asked for `The ID of the Granted Administrators group in your identity provider:`

- Enter the name of the admin group you made at the previous step.

You should see the following prompts

```
[i] Updating your deployment config
[✔] Successfully completed SSO configuration
[!] Your changes won't be applied until you redeploy. Run 'gdeploy update' to apply the changes to your CloudFormation deployment.

Users and will be synced every 5 minutes from your identity provider. To finish enabling SSO, follow these steps:
 1) Run 'gdeploy update' to apply the changes to your CloudFormation deployment.
 2) Run 'gdeploy identity sync' to trigger an immediate sync of your user directory.
```

## Common Issues

If any users in your Google Workspace team encounter an `app_not_configured_for_user` when trying to sign in, they may need to sign out of all Google profiles on their browser and sign back in. This is a known SSO issue with users who have multiple Google accounts on the same web browser.
