import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Provider 

Provider is a Python-based service that enables you to create just-in-time access requests for managing permissions across a range of cloud providers, SaaS applications, and CI/CD platforms. 

With the Provider framework, you have access to a standardized API for granting or revoking access. This allows you to build your own provider that is tailored to meet the unique requirements of your company. 

There are also Common Fate built Providers such as AWS SSO, Okta, Google Groups which you can instantly setup in your environment and create workflows with fine-grained permissions.

![diagram of Provider framework](../../../static/img/pdk/pdk-overview.png)


# Provider Registry 
A Provider registry is a centralized location where Access Providers are stored, managed, and distributed. It's a server-side application that stores and serves information about Providers. When a developer creates a new Provider, they can push it to the registry, making it available for other users to pull and use in their own environment.

Provider registries can be either public or private. A public registry, such as the AWS SSO, allows anyone to use this Access Provider in their own environment. In contrast, a private registry is only accessible to authorized users, typically within a specific organization.

Organizations can also host their own Access Providers securely using Provider Registry.  

Provider Registry is hosted at https://api.registry.commonfate.io

:::note
Provider Registry is still in alpha version and will continue to improve.
:::


# Handler

To achieve High Availability, you can have multiple deployments for a single provider at the same time. Each handler is a unique cloudformation stack. Each provider can be configured with more than one handler for deployments running in multiple regions or Blue/Green deployment for zero down time upgrades. 



# Provider Development Kit (PDK)

You can get started to creating your own Access Provider using our [Python Provider Development Kit](https://github.com/common-fate/commonfate-provider-core). 




