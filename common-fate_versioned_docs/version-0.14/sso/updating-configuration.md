---
sidebar_position: 4
---

# Updating your SSO configuration

## Updating parameters

From time to time you may wish to update your SSO configuration, for example if you need to rotate application secrets.

First, run `gdeploy identity sso update`

Your current identity provider type should be selected, if not, select it now.
Enter 'y' and press enter.

```
[i] Updating configuration for <your_identity_provider>
[i] You can follow our <your_identity_provider> setup guide at: https://docs.commonfate.io/common-fate/sso/<your_identity_provider> for detailed instruction on setting up SSO
```

Next you can update or use the existing values for your provider. You will be prompted to enter each one.

:::info
You will have to provide a value for all secrets when prompted.
:::

Finally, you can either change or use the existing value when prompted for an administrator group id.

You will need to redeploy using `gdeploy update` to update the indentity provider changes.

## Changing Identity Provider

If you instead wish to change your identity provider altogether then run the following commands:

1. First, run `gdeploy identity sso disable`

```
Are you sure you want to disable SSO? (y/N)
```

This will prompt you to confirm your intent to disable current identity provider. Enter 'y' and press enter.

```
[✔] Successfully disabled SSO
[!] SSO has been disabled and your deployment will now use the default Cognito user pool for logins. To finish disabling SSO, follow these steps:

                1) Run 'gdeploy update' to apply the changes to your CloudFormation deployment.
                2) Run 'gdeploy identity sync' to trigger an immediate sync of your cognito user pool.
```

You should see a message like above.

2. Next, run `gdeploy identity sso enable` to add new sets of configuration. Follow [this link](/common-fate/sso/sso-setup/#setting-up-sso) for more instruction on setting up SSO.

3. Finally, run `gdeploy update` to apply the changes to your CloudFormation deployment.
