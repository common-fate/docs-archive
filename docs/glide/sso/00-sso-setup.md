---
slug: sso-setup
---

# Single Sign On

In this guide, you'll use the `gdeploy` CLI to enable Single Sign On (SSO) for your Glide deployment. SSO with Glide consists of two components:

1. Team members use their corporate credentials to authenticate to Glide. This is achieved using the [SAML2.0](https://en.wikipedia.org/wiki/SAML_2.0) protocol.

2. Users and groups from your corporate identity provider are synchronized with Glide. This allows you to define access rules that reference your corporate groups, and use your corporate identity provider as the single source of truth for user and group membership.

## Before you start

Wait for the `gdeploy update` command to be completed and your stack has been provisioned. You can verify this by running:

```bash
gdeploy status
```

If your stack is running you will see a similar output:

```bash
[✔] Your Granted deployment is online
```

By default Glide will set the identity provider to an AWS Cognito user pool, so that you can test it out without connecting it to your corporate identity provider. Glide supports the following corporate identity providers:

- Google Workspaces
- Okta
- Azure AD
- AWS IAM Identity Centre (formerly AWS Single Sign On)

## Setting up SSO

To begin set up of your SSO provider, `gdeploy` will be used to configure all parameters. To get started run the command below and follow the prompts for your identity provider.

```bash
gdeploy identity sso enable
```

You should see a similar output of options:

```bash
The SSO provider to deploy with  [Use arrows to move, type to filter]
> Google
  Okta
  Azure
  AWS Single Sign On
```

As part of setting up SSO and user directory sync, you'll be prompted for parameters to connect to your identity provider. Follow the guides below based on your corporate identity provider:

- [Google Workspace](/glide/sso/google)
- [Okta](/glide/sso/okta)
- [Azure](/glide/sso/azure)
