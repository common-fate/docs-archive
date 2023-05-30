---
slug: clean-up
---

# Clean up the TestVault provider

When you're finished with the TestVault provider you can remove it from your `deployment.yml` file:

```diff
version: 2
deployment:
  stackName: common-fate
  account: "123456789012"
  region: ap-southeast-2
  release: v0.12.0
  parameters:
    CognitoDomainPrefix: common-fate-login-cfdemo
    AdministratorGroupID: common_fate_administrators
-    ProviderConfiguration:
-      testvault:
-        uses: commonfate/testvault@v1
-        with:
-          apiUrl: https://prod.testvault.commonfate.run
-          uniqueId: 2IGDCCFjxniHCd8W8YztRFmeJXp
    NotificationsConfiguration:
      slack:
        apiToken: awsssm:///commonfate/secrets/notifications/slack/token:1

```

To apply the changes and remove the provider, run:

```
gdeploy update
```
