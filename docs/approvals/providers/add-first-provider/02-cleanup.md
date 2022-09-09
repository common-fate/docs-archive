---
slug: clean-up
---

# Clean up the TestVault provider

When you're finished with the TestVault provider you can remove it from your `granted-deployment.yml` file:

```diff
version: 1
deployment:
  stackName: Granted
  account: "123456789012"
  region: ap-southeast-2
  release: v0.5.0
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

