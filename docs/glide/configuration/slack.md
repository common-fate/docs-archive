# Connecting to Slack

Glide integrates with your Slack workspace using a private Slack application which you create and manage. This Slack app has a bot user OAuth token which is what we use to authenticate the application.

When Slack is connected, users will receive notifications when an incoming request needs approval, as shown below:

![A screenshot of an example Slack message sent by Glide](/img/slack/00-approvalmessage.png)

When an approver clicks on the "Approve" or "Close Request" buttons, they will be redirected to the web application to confirm their decision. Users who make requests will also receive notifications when the status of their request changes.

## Prerequisites

Before you can setup the Slack integration you will need to have deployed the Glide application stack. You can verify this by running:

```bash
gdeploy status
```

A successful deployment will output the following:

```bash
[✔] Your Granted deployment is online
```

## Setup instructions - Slack OAUth

Set up the Slack connection by running the following command:

```bash
gdeploy notifications slack configure
```

You will be prompted with an install link that is pre-populated with the required API URL.

**Copy and paste** this into the browser and follow the prompts to create the app from the manifest in your Slack workspace.

:::note
You will need to be an administrator of the Slack workspace to complete this process.
:::

Once your Slack app is created, navigate to the **OAuth & Permissions** section of the menu and click **Install to Workspace**.

![Slack Oauth & Permissions page](/img/slack/01-oauthpermissions.png)

Once you have installed the app to your workspace, you will see a **Bot User OAuth Token**. Have this token ready for the next step.

The CLI will prompt you for the access token, **Paste** the token in and press **Enter**. You should see a success message indicating that Slack has been configured.

Finally, run the following command to push the change to your Glide deployment:

```bash
gdeploy update
```

You can test the integration by running:

```bash
gdeploy notifications slack test --email <your_slack_email>
```

This will send a test DM to this email.

## Setup instructions - Slack Webhooks

Glide also supports a webhook notifier, using [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks). This requires none of the read permissions that an OAuth installation requires.

Navigate to [https://api.slack.com/apps](https://api.slack.com/apps) and click **Create New App** > **From Scratch**. Give the app a name and select the workspace you wish to use it in.

![](/img/slack/02-createapp.png)

You'll be met with a list of functionality you can add to your app. From the menu click **Incoming Webhooks**, Toogle the switch to **Activate Incoming Webhooks** and then "Add New Webhook to Workspace".

![](/img/slack/03-incomingwebhooks.png)

You'll be prompted to select a channel for the webhook to post to. Select the channel you want and click **Allow**.

![](/img/slack/04-configurechannel.png)

You'll be redirected to the **Incoming Webhooks** page. Scroll to the **Webhook URL** section and click **Copy**.

![](/img/slack/05-webhookurl.png)

To instead set up webhooks with `gdeploy`, run the following command:

```
gdeploy notifications slack-webhook configure -c <channel alias>
```

Where `<channel alias>` is an identifier for your webhook. We recommend using the name of the channel the webhook is configured to post to.

Finally, push the change to your Glide deployment with the following command:

```bash
gdeploy update
```
