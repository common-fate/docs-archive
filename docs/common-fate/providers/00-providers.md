---
slug: providers
---

# Providers

Common Fate consists of two components: the **Core Framework** and **Access Providers**.

The **Core Framework** is the access approval engine, and handles the workflows around granting and revoking access.

**Access Providers** are plugins for Common Fate which provide access to roles and resources. Examples of Access Providers are an AWS Access Provider or an Okta Access Provider. Access Providers contain specific integration logic to assign users to resources.

You can get started by [adding your first provider](add-first-provider/first-provider). This will walk you through how to add a test provider, helping you understand the access workflow before connecting your production environments.

## Provider List

- [AWS CloudWatch Log Groups](https://github.com/common-fate/cf-provider-cloudwatch-log-groups)
- [AWS SSO (Built-In Provider)](built-in/aws-sso/v2/setup)
- [Azure AD Groups (Built-In Provider)](built-in/azure-ad/v1/setup)
- [ECS Exec (Built-In Provider)](built-in/ecs-exec-sso/v1-alpha1/setup)
- [Okta Groups (Built-In Provider)](built-in/okta/v1/setup)

## Upgrade advice from Common Fate v0.14 and earlier

In Common Fate v0.14 and earlier, a set of Access Providers were included in the Common Fate deployment. These are referred to as **Built-In Providers**.

In Common Fate v0.15+, Access Providers are versioned and deployed separately to the Common Fate deployment, and are developed using a library called the [Provider Development Kit (PDK)](https://github.com/common-fate/commonfate-provider-core). These are referred to as **PDK Providers**. Common Fate v0.15 also supports the existing Built-In Providers.

If you are currently using Built-In Providers (such as AWS SSO or Okta Groups Access Providers), no action is currently required, and your Common Fate deployment will work as-usual when updating to v0.15.

It is intended for Built-In Providers to be deprecated in favor of PDK Providers within the next few releases. Documentation will be published on how to migrate from Built-In Providers to PDK Providers, without causing downtime in your deployment.

## Provider Registry

Providers are published to the Provider Registry at `https://api.registry.commonfate.io`.

:::note
The Provider Registry is currently in alpha. Registry APIs are subject to change.
:::
