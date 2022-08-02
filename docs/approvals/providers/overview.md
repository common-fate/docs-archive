---
sidebar_position: 1
---

# Overview

Providers are an essential part of Granted approvals.
Providers are plugins that allow the access management integration between Granted and your choice of cloud/identity service.

The current list of providers integrated are:

- [AWS IAM Identity Center (AWS SSO)](aws-sso.md)
- [Azure Groups](aws-sso.md)
- [Okta Groups](aws-sso.md)


To configure a new provider to your Granted Approvals deployment, run

```bash
gdeploy provider add
```

And follow the prompts. Setup information about each provider is shown below to assist you with setting the required config variables.
