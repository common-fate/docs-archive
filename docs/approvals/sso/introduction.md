---
sidebar_position: 1
---

# Introduction

In this guide, you'll use the `gdeploy` CLI to enable Single Sign On (SSO) for your Granted Approvals deployment. SSO with Granted Approvals consists of two components:

1. Team members use their corporate credentials to authenticate to Granted Approvals. This is achieved using the [SAML2.0](https://en.wikipedia.org/wiki/SAML_2.0) protocol.

2. Users and groups from your corporate identity provider are synchronised with Granted Approvals. This allows you to define access rules which reference your corporate groups, and use your corporate identity provider as the single source of truth for user and group membership.

## Before you start

Wait for the `gdeploy update` command to be completed and your stack has been provisioned. You can verify this by running `gdeploy status`.

```
➜ gdeploy status
...
[✔] Your Granted deployment is online
```

By default Granted will set the identity provider to an AWS Cognito user pool, so that you can test it out without connecting it to your corporate identity provider. Granted supports the following corporate identity providers:

- Google Workspaces
- Okta
- Azure AD (coming soon)

## Setting up SSO

To start setup for our SSO provider we will use `gdeploy` to configure all the parameters for us. Using `gdeploy` run the `gdeploy sso configure` command to get started and follow the steps below for your identity provider

```json
❯ gdeploy sso configure
? The SSO provider to deploy with  [Use arrows to move, type to filter]
> Google
  Okta
```

As part of setting up SSO and user directory sync, you'll be prompted for parameters to connect to your identity provider. Follow the guides below based on the corporate identity provider that you use:

- [Google Workspace](/granted-approvals/sso/google)
- [Okta](/granted-approvals/sso/okta)
