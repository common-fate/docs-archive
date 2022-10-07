# Connecting to Slack

Granted Approvals integrates with your Slack workspace using a private Slack application which you create and manage. This Slack app has a bot user OAuth token which is what we use to authenticate the application.

When Slack is connected, users will receive notifications when an incoming request needs approval, as shown below:

![A screenshot of an example Slack message sent by Granted Approvals](/img/slack-message.png)

When an approver clicks on the "Approve" or "Close Request" buttons, they will be redirected to the web application to confirm their decision. Users who make requests will also receive notifications when the status of their request changes.

## Prerequisites

Before you can setup the Slack integration you will need to have deployed the Granted Approvals application stack. You can verify this by running `gdeploy status`.

```
➜ gdeploy status
0.7.0.
[✔] Your Granted deployment is online
```

## Setup instructions

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
