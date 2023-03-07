# Deployment tagging

You can add tags to the Common Fate CloudFormation deployment by adding them to the `deployment.yml` file:

```diff
version: 2
deployment:
  stackName: CommonFate
  account: "123456789012"
  region: us-west-2
+  tags:
+    some-tag: some-value
+    other-tag: other-value
```
