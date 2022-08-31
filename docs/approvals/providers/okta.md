---
sidebar_position: 2
---

# Okta Groups

## Prerequisites

In the Okta admin portal, in the side bar. Navigate to **Security -> API**
![](/img/providers/okta/app.png)

On the API page, go to the **Tokens** tab and create a new API token by pressing **Create Token**

![](/img/providers/okta/token.png)

Give the API token a descriptive name, like "granted-provider" and click **Create Token**
![](/img/providers/okta/token-name.png)

This is all we will need for the Okta prerequisites, head to Setup instructions below to continue.

## Setup instructions

:::info
Make sure you have AWS credentials before attempting the provider setup.
:::

This is where we can start up the `gdeploy provider add` command. Run the following to begin the Provider setup:

```json
gdeploy provider add
```

Select 'Okta groups (commonfate/okta@v1)' when prompted for the provider.

```json
? What are you trying to grant access to?  [Use arrows to move, type to filter]
> Okta groups (commonfate/okta@v1)
  Azure-AD groups (commonfate/azure-ad@v1)
  AWS SSO PermissionSets (commonfate/aws-sso@v1)
  TestVault - a provider for testing out Granted Approvals (commonfate/testvault@v1)
```

gdeploy will prompt for a ID for the provider, call this `okta` (default will be okta)

Then we need to get the okta url, this can be found in the top right dropdown. See more [here](https://developer.okta.com/docs/guides/find-your-domain/main/)

- **Make sure to add 'https://' to the url you copy from the okta portal as Granted Approvals will be expecting a link**

Lastly we paste in the copied API token from the prerequisites for the API token input.

Your provider will now be set in your Granted Approvals config. Run gdeploy update to push the change to your Granted Approvals deployment.
