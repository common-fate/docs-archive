---
sidebar_position: 3
---

# Okta

## Okta setup

To set up Okta to sync users and groups with Granted we will need to create an access token to communicate with Okta's API.

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

This is where we can start up the `gdeploy sso configure` command. Run the following to begin the SSO setup:

```json
> gdeploy sso configure
```

You will be prompted to select you identity provider, select Okta.

```json
? The SSO provider to deploy with  [Use arrows to move, type to filter]
  Google
> Okta
```

1. For the `API Token` param, copy and paste the token value from the previous steps.
2. For the `Okta Org URL` set the value to the domain that your Okta is linked to into eg. `cf-df-dev.okta.com`

You should see an output similar to the below.

```bash
[✔] SSM Parameters Set Successfully
```

At this point in the gdeploy flow you will be asked for SAML metadata. Leave this for now, we will come back to complete this at a later step

```bash
? SAML Metadata URL:
```

To finish off the SSO SAML setup, go to the **[Configuring SSO SAML](https://www.notion.so/Setting-up-SSO-6b95f6e7bdb84402af6065c27ba718b2)** block.

## Setting up SAML SSO

To get started navigate to the **Applications** tab of the admin console in okta.

![](/img/sso/okta/02.png)

Click create a new App Integration in Okta, then select the SAML 2.0 option. Give your integration a name, and upload an app logo. Once done click **next.**

![](/img/sso/okta/03.png)

![](/img/sso/okta/04.png)

On the **Configure SAML** page we will first need to head back to our gdeploy setup instance and grab some output values.

Once you had finished the parameters setup in the previous steps, gdeploy will output some values which we will now use to complete the SAML configuration.

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

For the **Single sign on URL** use the `CognitoDomain` from the output. For the **Audience URI** copy the `AudienceURI` from the output.

![](/img/sso/okta/05.png)

Under **Attribute Statements** add a statement with the following information.

- For Name, enter: **`http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`**
- For Value, enter: `user.email`

Click **Next** and then **Finish** on the Feedback page to create the application.

:::info
You'll need to assign yourself to the application so that you can test the SAML SSO connection.
:::

To assign a user to the application follow the following:

On the **Assignments** tab for your Okta app, for **Assign**, choose **Assign to People**.

Choose **Assign** next to the user that you want to assign.**Note:** If this is a new account, the only option available is to choose yourself (the admin) as the user.

(Optional) For **User Name**, enter a user name, or leave it as the user's email address, if you want.

Choose **Save and Go Back,** followed by **Done.**

Next we can grab the SAML metadata heading back to the **Sign On** tab for your Okta app.

Head down the the heading **SAML Signing Certificates** where there will be a list of signing certificates. Find the most recent active certificate and click the **Actions** drop down in the right hand column.

![](/img/sso/okta/06.png)

From the drop down click **View IdP metadata**, you will be redirected to your metadata, copy the URL address of the redirected site. It should look like this:

![](/img/sso/okta/07.png)
- Copy the URL. eg. `https://dev-78876384.okta.com/app/exk5bw55gcTlGAcdE5d7/sso/saml/metadata` in this case

Head back over to gdeploy where the step will be asking for a `SAML Metadata Url` paste in the metadata URL we just copied and press enter. You will see the following success message

```bash
[i] You will need to re-deploy using gdeploy deploy Granted Approvals to see any changes
[✔] completed SSO setup
```

You will need to redeploy using `gdeploy deploy` to update the indentity provider changes.
