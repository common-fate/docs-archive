---
slug: provider-registry
---


# Provider Registry 

A Provider registry is a centralized location where Access Providers are stored, managed, and distributed. It's a server-side application that stores and serves information about Providers. When a developer creates a new Provider, they can push it to the registry, making it available for other users to pull and use in their own environment.

Provider registries can be either public or private. A public registry, such as the AWS SSO, allows anyone to use this Access Provider in their own environment. In contrast, a private registry is only accessible to authorized users, typically within a specific organization.

Organizations can also host their own Access Providers securely using Provider Registry.  

Provider Registry is hosted at https://api.registry.commonfate.io

:::note
Provider Registry is still in alpha version and will continue to improve.
:::


# Provider Development Kit (PDK)

You can get started to creating your own Access Provider using our [Python Provider Development Kit](https://github.com/common-fate/commonfate-provider-core). 




