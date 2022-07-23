---
sidebar_position: 4
---

# Updating your SSO configuration

## Updating parameters

From time to time you may wish to update your SSO configuration, for example if you need to rotate application secrets.

First, run `gdeploy sso configure`

Your current identity provider type should be selected, if not, select it now.
Enter 'y' and press enter.

```
? The SSO provider to deploy with Azure
? Azure is currently set as your identity provider, do you want to update the configuration? (y/N)
```

Next you can update or use the existing values for your provider. You will be prompted to enter each one.

:::info
You will have to provide a value for all secrets when prompted.
:::

Finally, you can either change or use the existing value when prompted for an administrator group id.

You will need to redeploy using `gdeploy update` to update the indentity provider changes.
