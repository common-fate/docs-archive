# Web Application Firewall (WAF) integration

Common Fate can integrate with [AWS WAF](https://aws.amazon.com/waf/) to allow additional network protection in front of the web dashboard and API.

AWS WAF uses [Web access control lists (ACLs)](https://docs.aws.amazon.com/waf/latest/developerguide/web-acl.html) to define rules against HTTPS requests. ACLs allow you to block or display a [CAPTCHA](https://en.wikipedia.org/wiki/CAPTCHA) based on policies that you define.

:::info
There is no free tier for WAF Web ACLs. If left running, the rules created in this guide will cost around $12 per month. Make sure to delete the Web ACLs after you've finished testing Common Fate if you're evaluating the deployment in a personal AWS account.
:::

## Getting started

This guide will walk you through creating WAF Web ACLs and connecting them to your Common Fate deployment. It will take around 10 minutes to complete.

:::note
To complete these steps you'll need access to a role with permission to create WAF Web ACLs in the AWS account that your Common Fate deployment is running in.
:::

Common Fate has support for WAF Web ACLs to protect the following components:

| Component      | Description                                                       | Scope                                                                                |
| -------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| CloudFront CDN | Static HTML/JavaScript web application for user-facing dashboards | `CLOUDFRONT` (must be deployed to `us-east-1`)                                       |
| API Gateway    | User facing API                                                   | `REGIONAL` (must be deployed to the same region your Common Fate deployment runs in) |

Start by creating WAF Web ACLs. The AWS CLI will be used to create these, but you can use the AWS console or infrastructure-as-code like Terraform too. To show how the WAF integration works, you will create rules that block all access to Common Fate. Open a new terminal window in the folder that your `deployment.yml` is in, and run the following commands:

```bash
# Ensure you have assumed a role that allows access to create Web ACLs in the AWS account that Common Fate is running in.

GRANTED_AWS_REGION=$(gdeploy output Region)

# Create the Web ACL for the API
aws wafv2 create-web-acl --name granted-test-api-acl --scope REGIONAL --region=$GRANTED_AWS_REGION --default-action Block={} --description "test WAF ACL for Common Fate" --visibility-config SampledRequestsEnabled=false,CloudWatchMetricsEnabled=false,MetricName=granted-test-api-acl

# Create the Web ACL for the CloudFront CDN
aws wafv2 create-web-acl --name granted-test-cdn-acl --scope CLOUDFRONT --region=us-east-1 --default-action Block={} --description "test WAF ACL for Common Fate" --visibility-config SampledRequestsEnabled=false,CloudWatchMetricsEnabled=false,MetricName=granted-test-cdn-acl
```

When creating the ACLs, you should see an output like the following:

```
{
    "Summary": {
        "Name": "granted-test-cdn-acl",
        "Id": "621ccb45-b0ec-4312-91a4-7a8760122f02",
        "Description": "test WAF ACL for Common Fate",
        "LockToken": "299cceae-4dcd-48c4-a215-8b6199d9536f",
        "ARN": "arn:aws:wafv2:us-east-1:123456789012:global/webacl/granted-test-cdn-acl/621ccb45-b0ec-4312-91a4-7a8760122f02"
    }
}
```

You now need to link your WAF ACLs with your Common Fate deployment. To do this, open `deployment.yml` in a text editor and add the `APIGatewayWAFACLARN` and `CloudfrontWAFACLARN` parameters:

```diff
deployment:
  stackName: Granted
  account: "123456789012"
  region: us-west-2
  release: 0.4.3
  parameters:
+    APIGatewayWAFACLARN: arn:aws:wafv2:us-west-2:123456789012:regional/webacl/acl-name/d34e51bd-df7f-41a3-93d1-4735efb5af4c
+    CloudfrontWAFACLARN: arn:aws:wafv2:us-east-1:123456789012:global/webacl/cloudfront-acl-name/ebdf717e-7d52-458f-ab78-caa45b2d7b57
```

The `APIGatewayWAFACLARN` should be the ARN of the first ACL that you deployed. It must have `:regional/` as part of its ARN. The `CloudfrontWAFACLARN` should be the ARN of the second ACL, and must have `:global/` as part of its ARN.

Update your deployment to apply the changes:

```
gdeploy update
```

You should see an output similar to the below:

```
[✔] Your Granted deployment has been updated
```

Now visit the web dashboard with `gdeploy dashboard open`. You should be denied access to the dashboard in your browser and see an empty page.

![Screenshot of web browser with an empty page](/img/waf/00-blocked.png)

Blocking all traffic to Common Fate isn't very helpful though. You can [customise the Web ACLs](https://docs.aws.amazon.com/waf/latest/developerguide/web-acl.html) and write your own policies based on IP addresses, regexes, and detection of malicious scripting. Alternatively, you can use [managed rule groups](https://docs.aws.amazon.com/waf/latest/developerguide/waf-managed-rule-groups.html), which are rules managed by AWS or other third-party vendors.

## Cleaning up

To clean up the test Web ACLs that were deployed, first unlink them from your Common Fate deployment. Remove the following entries from your `deployment.yml` file:

```diff
deployment:
  stackName: Granted
  account: "123456789012"
  region: us-west-2
  release: 0.4.3
  parameters:
-    APIGatewayWAFACLARN: arn:aws:wafv2:us-west-2:123456789012:regional/webacl/acl-name/d34e51bd-df7f-41a3-93d1-4735efb5af4c
-    CloudfrontWAFACLARN: arn:aws:wafv2:us-east-1:123456789012:global/webacl/cloudfront-acl-name/ebdf717e-7d52-458f-ab78-caa45b2d7b57
```

Update your deployment to apply the changes:

```
gdeploy update
```

You should see an output similar to the below:

```
[✔] Your Granted deployment has been updated
```

Clean up the Web ACLs using the AWS CLI by running the commands below in the same folder as your `deployment.yml` file.

```bash
GRANTED_AWS_REGION=$(gdeploy output Region)

# find the Id and LockToken of the CloudFront Web ACL
CDN_ACL_ID=$(aws wafv2 list-web-acls --scope CLOUDFRONT --region us-east-1 --query 'WebACLs[?Name==`granted-test-cdn-acl`] | [0].Id' --output text)
CDN_ACL_LOCKTOKEN=$(aws wafv2 list-web-acls --scope CLOUDFRONT --region us-east-1 --query 'WebACLs[?Name==`granted-test-cdn-acl`] | [0].LockToken' --output text)

# find the Id and LockToken of the API ACL
API_ACL_ID=$(aws wafv2 list-web-acls --scope REGIONAL --region $GRANTED_AWS_REGION --query 'WebACLs[?Name==`granted-test-api-acl`] | [0].Id' --output text)
API_ACL_LOCKTOKEN=$(aws wafv2 list-web-acls --scope REGIONAL --region $GRANTED_AWS_REGION --query 'WebACLs[?Name==`granted-test-api-acl`] | [0].LockToken' --output text)

# delete the CloudFront ACL
aws wafv2 delete-web-acl --region us-east-1 --scope CLOUDFRONT --name granted-test-api-acl --id $CDN_ACL_ID --lock-token $CDN_ACL_LOCKTOKEN

# delete the API ACL
aws wafv2 delete-web-acl --region $GRANTED_AWS_REGION --scope REGIONAL --name granted-test-api-acl --id $API_ACL_ID --lock-token $API_ACL_LOCKTOKEN
```

## Integrate with existing WAF ACLs

For production deployments of Common Fate, we recommend using infrastructure-as-code such as Terraform or CloudFormation to provision your WAF ACLs.

After your WAF ACLs have been provisioned, open `deployment.yml` in a text editor and add the `APIGatewayWAFACLARN` and `CloudfrontWAFACLARN` parameters:

```diff
deployment:
  stackName: Granted
  account: "123456789012"
  region: us-west-2
  release: 0.4.3
  parameters:
+    APIGatewayWAFACLARN: arn:aws:wafv2:us-west-2:123456789012:regional/webacl/acl-name/d34e51bd-df7f-41a3-93d1-4735efb5af4c
+    CloudfrontWAFACLARN: arn:aws:wafv2:us-east-1:123456789012:global/webacl/cloudfront-acl-name/ebdf717e-7d52-458f-ab78-caa45b2d7b57
```

Update your deployment to apply the changes:

```
gdeploy update
```

You should see an output similar to the below:

```
[✔] Your Granted deployment has been updated
```

## Notes

### Resetting Your Browser Cache

There may be some cases where you need to reset your browser cache when changing WAF rules as your browser may cache a denied response and you will see a blank page.

### WAF Rules With Known Issues

The following AWS managed ACLs break the Common Fate application; they should be avoided when setting up WAF for your deployment.

| Vendor | Ruleset                               | Rule                    | Reason                                                                    |
| ------ | ------------------------------------- | ----------------------- | ------------------------------------------------------------------------- |
| AWS    | AWSManagedRulesAdminProtectionRuleSet | AdminProtection_URIPATH | This ruleset breaks Common Fate entirely as it blocks /api/v1/admin calls |
