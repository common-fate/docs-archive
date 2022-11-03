# Connecting to Slack

Granted Approvals integrates with your Slack workspace using a private Slack application which you create and manage. This Slack app has a bot user OAuth token which is what we use to authenticate the application.

When Slack is connected, users will receive notifications when an incoming request needs approval, as shown below:

![A screenshot of an example Slack message sent by Granted Approvals](/img/slack-message.png)

When an approver clicks on the "Approve" or "Close Request" buttons, they will be redirected to the web application to confirm their decision. Users who make requests will also receive notifications when the status of their request changes.

## Prerequisites

Before you can setup the Slack integration you will need to have deployed the Granted Approvals application stack. You can verify this by running `gdeploy status`.

```
➜ gdeploy status
...
[✔] Your Granted deployment is online
```

## Setup instructions - Slack OAUth

Set up the Slack connection by running the following command:

```
gdeploy notifications slack configure
```

You will be prompted with an install link that is pre-populated with the required API URL.

Copy and Paste this into the browser and follow the prompts to create the app from manifest in your slack workspace. You will need to be an administrator of the slack workspace to complete this.

Once your app is created, navigate to the OAuth & Permissions section and click **Install to Workspace**.

![Slack Oauth & Permissions page](/img/slack-permissions.png)

Once you have installed the app to your workspace, you will see a **Bot User OAuth Token**. Have this token ready for the next step.

The CLI will prompt you for the access token, **Paste** the token in and press **Enter**. You should see a success message indicating that Slack has been configured.

Finally, run `gdeploy update` to push the change to your Granted Approvals deployment:

```
gdeploy update
```

You can test the integration by running

```
gdeploy notifications slack test --email <your_slack_email>
```

This will send a test DM to this email.


## Setup instructions - Slack Webhooks

Granted Approvals also supports a webhook notifier. This requires none of the read permissions that an OAuth installation requires.

Navigate to [https://api.slack.com/apps](https://api.slack.com/apps) and click "Create New App" > “From Scratch”. Give it a name and select the workspace you want to use it in.

![](/img/approvals-getting-started/18-slacksetup.png)


You'll be met with a list of functionality you can add to your app. Click "Incoming Webhooks", "Activate Incoming Webhooks" and then "Add New Webhook to Workspace".

![](/img/approvals-getting-started/19-slack-incoming-webhooks.png)

You'll be prompted to select a channel for the webhook to post to. Select the channel you want and click "Authorize".

![](/img/approvals-getting-started/20-slack-channel-selection.png)

You'll be redirected to the "Incoming Webhooks" page. Click "Copy" next to "Webhook URL" to copy the webhook URL to your clipboard.

To setup webhooks with gdeploy, use the following command:

```
gdeploy notifications slack-webhook configure -c <channel alias>
```

:::info
Pass in a channel alias with `-c` to keep track of which channel is stored in config
:::

Finally, run `gdeploy update` to push the change to your Granted Approvals deployment:

```
gdeploy update
```


