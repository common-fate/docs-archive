---
slug: access-providers
title: Access Providers (Deprecated in v0.40)
---

# Access Providers ([Deprecated in v0.40](https://github.com/common-fate/granted-approvals/releases/tag/v0.4.0))

Providers are an essential part of Granted Approvals. Providers are plugins that allow the access management integration between Granted Approvals and your choice of cloud/identity service.

The current list of providers integrated are:

- [AWS IAM Identity Center (AWS SSO)](aws-sso.md)
- [Okta Groups](okta.md)
- [Azure Groups](azure-ad.md)

To configure a new provider to your Granted Approvals deployment, run

```bash
gdeploy provider add
```

And follow the prompts. Setup information for each provider is located in the subpages of this category.

We highly recommend you get started with [Adding Your First Provider](/granted-approvals/providers/add-first-provider/first-provider). It'll walk you through how to add a test provider so you can understand the access workflow before you try connecting your production environments.
