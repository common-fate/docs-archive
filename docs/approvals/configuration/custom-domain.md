# Using a custom domain

By default, Granted Approvals is deployed to a random CloudFront URL, like `https://d3s0441cha6x1h.cloudfront.net`. While this is easy to get started with, it can be difficult for your team members to remember. This guide will walk you through using a custom domain for your Granted Approvals web dashboard, such as `https://granted.mycompany.com`.

## Prerequisites

To add a custom domain, you'll need to have a domain which you control and are able to [add DNS records to](https://www.cloudflare.com/en-gb/learning/dns/dns-records/). You'll also need an [AWS Certificate Manager (ACM) HTTPS certificate](https://aws.amazon.com/certificate-manager/) in the account you've deployed Granted Approvals to. This certificate must be provisioned in the `us-east-1` region.

You can [follow this guide to create an AWS ACM certificate](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html).

## Setting up the custom domain

Edit your `granted-deployment.yml` file as follows to specify the custom domain details:

```diff
version: 1
deployment:
  stackName: Granted
  account: "123456789012"
  region: ap-southeast-2
  release: v0.3.2
  parameters:
    CognitoDomainPrefix: granted-login-cfdemo
+   FrontendDomain: myfrontenddomain.com
+   FrontendCertificateARN: arn:aws:acm:us-east-1:123456789012:certificate/12345678-d88f-497c-b48f-b273ddaf25c0
```

Ensure that you replace the placeholder values above with your actual custom domain and certificate ARN. You should enter the domain **without** a `https://` prefix as shown above.

:::info
The ACM certificate must be provisioned in the `us-east-1` region.
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
