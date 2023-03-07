---
slug: pdk-provider
---

# Provider Development Kit (PDK)

The Provider Development Kit (PDK) is a Python-based framework to build Providers for Common Fate. Providers connect Common Fate with any cloud provider or SaaS application with an API for managing permissions. 

With the PDK framework, you can create workflows for just-in-time access requests with fine-grained permissions.

There are Common Fate built Providers which you can instantly setup in your environment and create workflows with fine-grained permissions.

![diagram of Provider framework](../../../static/img/pdk/pdk-overview.png)


# Provider Registry 
Providers are published to the Provider Registry. The Provider registry is a centralized service which alows Common Fate users to discover and distribute Providers with other users.
 
Provider Registry is hosted by Common Fate and is available at https://api.registry.commonfate.io

You can run `cf provider list` to get the list of all available providers in the Provider Registry. 

:::note
The Provider Registry is currently in alpha. Registry APIs are subject to change.
:::
