---
slug: next-steps
---

# Next steps

## Clean up the TestVault provider

When you're finished with the TestVault provider you can remove it from your `granted-deployment.yml` file:

```diff
version: 1
deployment:
  stackName: Granted
  account: "123456789012"
  region: ap-southeast-2
  release: v0.3.2
  parameters:
    CognitoDomainPrefix: granted-login-cfdemo
- providers:
-  testvault:
-    uses: commonfate/testvault@v1
-    with:
-      apiUrl: https://prod.testvault.granted.run
-      uniqueId: 2BWcbq1fY1SZRDPh5tHDpsYUVvv

```

To apply the changes and remove the provider, run

```
gdeploy update
```

## Getting ready for production

Before using Granted with your team, we recommend completing the following steps:

1. [Configure Access Providers](/granted-approvals/providers/introduction)
2. [Enable SSO and user directory sync](/granted-approvals/sso/introduction)
3. [Enable Slack notifications](/granted-approvals/configuration/slack)
4. [Use a custom domain for the web portal](/granted-approvals/configuration/custom-domain)

If you use a [SIEM](https://en.wikipedia.org/wiki/Security_information_and_event_management) to collect security logs, you can connect Granted Approvals to it to capture audit trail events.
