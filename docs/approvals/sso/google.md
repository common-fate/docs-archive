---
sidebar_position: 2
---

# Google Workspace

:::info
Granted user and group sync requires some credentials to be configured in your identity provider account. Granted uses [2LO](https://developers.google.com/identity/protocols/oauth2/service-account) authentication to read users and groups from your directory and sync them to an internal database every 5 minutes.
:::

## Google Setup

Set up a [Project](https://cloud.google.com/resource-manager/docs/creating-managing-projects) in Google Cloud. Enable use of the Admin SDK by visiting [this link](https://console.cloud.google.com/apis/library/admin.googleapis.com) and clicking **Enable**.

![](/img/sso/google/01-enable-sdk.png)

**First, we need to create a service account:**

Start by opening the [Service accounts page](https://console.developers.google.com/iam-admin/serviceaccounts) and select the project you created in the previous steps.

Click  **Create service account,** you will be taken to a page that looks like this.

![](/img/sso/google/02-create-service-account.png)

Under **Service account details**, type a name, ID, and description for the service account, then click **Create and continue**.

**_Optional_**: Under **Grant this service account access to project**, select the IAM roles to grant to the service account.

Then click **Continue,** followed by **Done.** This will now have created a new service account.

You will be redirected back to the Service Accounts page where all the service accounts are listed. Find the service account you just created, use the filter search at the top if there are many service accounts in your project.

Click on the service account you have just created and you will be redirected to a page that looks like this

![](/img/sso/google/03-created-service-account.png)

In the nav bar navigate to **Keys**. Click **ADD KEY**, followed by **Create new key**, then click **Create**. This will download the JSON key to your machine, make sure to remove this from your machine once the setup is complete.

This is where we can start up the `gdeploy sso configure` command.

Run the following to begin the SSO setup

```json
> gdeploy sso configure
```

You will be prompted to select you identity provider, select Google.

```json
? The SSO provider to deploy with  [Use arrows to move, type to filter]
> Google
  Okta
```

1. For the `API Token` param, copy and paste in the JSON string from the downloaded key file.

2. For the `Google Workspace Domain` set the value to the domain that your Google workspace is linked to into eg. `commonfate.io`

3. For the `Google Admin Email` use an admin users email address to the eg. `jack@commonfate.io` We suggest making a new user account that is only linked to this deployment and using that email.

:::info
Due to a limitation in the Google Workspace Directory API, the service account must impersonate an administrative user in order to access the directory. Additionally, the user must have logged in at least once and accepted the Google Workspace Terms of Service.

The scopes provided to the service account are read-only.
:::

Delete the downloaded JSON file from your computer. At this point in the `gdeploy` flow you will be asked for SAML metadata. Leave this for now, we will come back to complete this at a later step.

```bash
? SAML Metadata String:
```

To finish off the service account access we will need to delegate domain-wide authority to the service account. This requires a admin user account to access the Admin console.

From your Google Workspace domain's [Admin console](https://admin.google.com/), go to **Main menu > Security > Access and data control > API Controls**.

![](/img/sso/google/04-domain-delegation.png)

In the **Domain wide delegation** pane, select **Manage Domain Wide Delegation**.Click **Add new**.

In the OAuth **Client ID** field, enter the service account's OAuth **Client ID**. You can find your service account's client ID in the [Service accounts page](https://console.developers.google.com/iam-admin/serviceaccounts).

In the **OAuth scopes (comma-delimited)** field, enter the list of scopes that your application should be granted access to. For us it will be:

```
https://www.googleapis.com/auth/admin.directory.user.readonly,
https://www.googleapis.com/auth/admin.directory.group.readonly,
```

Click **Authorize**.

## SAML SSO

1. From the Admin console Home page, go to **Apps > Web and mobile apps**.

2. Click **Add App > Add custom SAML app**.

3. On the **App Details** page:
   1. Enter the name of the custom app.
   2. (Optional) Upload an **app icon**. The app icon appears on the Web and mobile apps list, on the app settings page, and in the app launcher. If you don't upload an icon, an icon is created using the first two letters of the app name.
   3. Click **Continue**.
   4. You will then be prompted to download the Idp metadata, click download and save it to your machine.

![](/img/sso/google/05.png)

Head back over to gdeploy where the step will be asking for a `SAML Metadata string`. Paste in the text from the file just downloaded to your machine and press enter. You will see the following success message

```bash
[i] You will need to re-deploy using gdeploy update Granted Approvals to see any changes
[✔] completed SSO setup
```

You will need to redeploy using `gdeploy update` to update the indentity provider changes.

Head back over to the google admin app setup and click **Continue.**

On the **Service provider details** page we will first need to head back to our gdeploy setup instance and grab some output values.

Once you had finished the parameters setup in the previous docs, gdeploy output some values which we will now use to complete the SAML configuration.

The outputs will look like this:

```bash
[!] SAML outputs:
+------------------+-----------------------------------------------------------------+
| OUTPUT PARAMETER |                              VALUE                              |
+------------------+-----------------------------------------------------------------+
| CognitoDomain    | granted-login-cf-dev-jack.auth.ap-southeast-2.amazoncognito.com |
| AudienceURI      | urn:amazon:cognito:sp:ap-southeast-2_1K06zSOhJ                  |
+------------------+-----------------------------------------------------------------+
```

For the **ACS URL** use the cognito domain from the output. For the **Entity ID** copy the Audience URI from the output

![](/img/sso/google/06.png)

Click **next**, where we will set up an attribute mapping for emails.

Under **Attributes** add a mapping with the following information

- For Google directory attributes, enter: `user.email`
- For App attributes, enter: **`http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`**

Under **Group membership (optional)** Create an admin group in Google Workspace with the following settings

1. Marked as private group
2. Set to restricted
3. Only invited users

Click **Finish** to create the application.

## Common Issues

If any users in your Google Workspace team encounter an `app_not_configured_for_user` when trying to sign in, they may need to sign out of all Google profiles on their browser and sign back in. This is a known SSO issue with users who have multiple Google accounts on the same web browser.
