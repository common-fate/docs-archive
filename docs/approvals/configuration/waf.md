# Using AWS WAF

By default, Granted Approvals allows all access to the frontend and authenticated access to the backend API. In some cases you will want to restrict this access further to only known IP ranges, such as a corporate network.
To implement this and other restrictions, you can use [AWS Web Application Firewall (WAF)](https://aws.amazon.com/waf/).

## Prerequisites

You will need to create a WAF ACL for a cloudfront distribution in the global region.
You will need to create a WAF ACL in the region that your Granted Approvals stack is deployed for the API Gateway.

## Setting up the WAF ACLs

Edit your `granted-deployment.yml` file as follows to specify the WAF ACL details:

```diff
version: 1
deployment:
  stackName: Granted
  account: "123456789012"
  region: ap-southeast-2
  release: v0.3.1
  parameters:
    CognitoDomainPrefix: granted-login-cfdemo
+   CloudfrontWAFACLARN: arn:aws:wafv2:us-east-1:12345678912:global/webacl/my-cloudfront-acl/54a591c6-8fd7-4c41-8fd3-acbdefghijkl
+   APIGatewayWAFACLARN: arn:aws:wafv2:ap-southeast-2:12345678912:regional/webacl/my-api-gateway-acl/54a591c6-8fd7-4c41-8fd3-acbdefghijkl
```

Ensure that you replace the placeholder values above with your actual ACL ARNs. You can find the ful ARN for your WAF ACL by downloading the ACL as JSON in the AWS console.

:::info
The CloudfrontWAFACLARN must be provisioned in the global region for cloudfront distributions.
:::
:::info
The APIGatewayWAFACLARN must be provisioned in the same region as your Granted Approvals deployment.
:::

## Deploying the changes

Now, apply the changes to your deployment by running:

```
gdeploy update
```

You should see an output similar to the below:

```
[✔] Your Granted deployment has been updated
```
