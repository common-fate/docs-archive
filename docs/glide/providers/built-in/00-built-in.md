---
slug: built-in
---

# Built-In Providers

In Glide v0.14 and earlier, a set of Access Providers were included in the Glide deployment. We refer to these as "Built-In Providers".

In Glide v0.15+, Access Providers are now versioned and deployed separately to the Glide deployment, and are developed using a library called the Provider Development Kit (PDK). We refer to these as "PDK Providers". Glide v0.15 also supports the existing Built-In Providers.

If you are currently using Built-In Providers (such as our AWS SSO or Okta Groups Access Providers), no action is currently required and your Glide deployment will work as-usual when updating to v0.15.

We are planning on deprecating Built-In Providers in favor of PDK Providers within the next few releases. We will publish documentation on how to migrate from Built-In Providers to PDK Providers without causing downtime in your deployment.

You can find documentation for our built-in Providers below:

[commonfate/aws-sso@v2](commonfate/aws-sso/v2/setup)

[commonfate/azure-ad@v1](commonfate/azure-ad/v1/setup)

[commonfate/ecs-exec-sso@v1-alpha1](commonfate/ecs-exec-sso/v1-alpha1/setup)

[commonfate/okta@v1](commonfate/okta/v1/setup)
