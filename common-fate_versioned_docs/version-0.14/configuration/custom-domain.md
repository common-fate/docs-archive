# Using a custom domain

By default, Common Fate is deployed to a random CloudFront URL, like `https://d3s0441cha6x1h.cloudfront.net`. While this is easy to get started with, it can be difficult for your team members to remember. This guide will walk you through using a custom domain for your Common Fate web dashboard, such as `https://granted.mycompany.com`.

## Prerequisites

To add a custom domain, you'll need to have a domain which you control and are able to [add DNS records to](https://www.cloudflare.com/en-gb/learning/dns/dns-records/). You'll also need an [AWS Certificate Manager (ACM) HTTPS certificate](https://aws.amazon.com/certificate-manager/) in the account you've deployed Common Fate to. This certificate must be provisioned in the `us-east-1` region.

You can [follow this guide to create an AWS ACM certificate](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html).

## Setting up a DNS record

To redirect from a custom domain to Common Fate you will need to set up a custom DNS Record in your domain registrar.

If you're domain is in AWS, go to [Route 53](https://console.aws.amazon.com/route53/home) and click 'Create record'

If you wanted to host it on a sub-domain called `testing.devcommonfate.com` you would create a CNAME record with the following values:

- Name: `testing`
- Type: `CNAME`
- Value: `<randomId>.cloudfront.net` (this is the URL you received when you deployed Common Fate)

If you're using a domain registrar other than AWS, you'll need to follow the instructions for your domain registrar to create a CNAME record.

## Setting up an SSL certificate

If you haven't already set up an SSL certificate, you can create a SSL certificate ARN by going to the [AWS Certificate Manager console](https://console.aws.amazon.com/acm/home) and clicking 'Request a certificate'. This mus be done in the same accoutn as your Common Fate deployment.

Note: if your Route 53 domains have been provisioned into a different AWS account, you will need to swap accounts to request the certificate from the same account as your Common Fate deployment.

:::info
The ACM certificate must be provisioned in the `us-east-1` region.
:::

Now click 'Request a public certificate'. We recommend setting the validation method to 'DNS validation', and the domain name should be the same as the one you entered in the previous step. Click 'Request'.

![](/img/approvals-configuration/custom-domain/request-certificate.png)

Now click 'List certificates' and find the certificate you just created.

If you're using the **same** account for both Route 53 and Common Fate, you can click 'Actions' and 'Create record in Route 53' to create the DNS record.

If you're using **seperate** accounts, you'll need to create a CNAME record in your Route 53 domain. The name should be the same as the domain name you entered in the previous step, and the value should be the validation record name from the certificate details.

![](/img/approvals-configuration/custom-domain/certificate-success.png)

Click on the certificate and copy the ARN.

## Adding the custom domain and Certifcate ARN to Granted

Edit your `deployment.yml` file as follows to specify the custom domain details:

```diff
version: 1
deployment:
  stackName: Granted
  account: "123456789012"
  region: ap-southeast-2
  release: v0.3.1
  parameters:
    CognitoDomainPrefix: granted-login-cfdemo
+   FrontendDomain: testing.devcommonfate.com
+   FrontendCertificateARN: arn:aws:acm:us-east-1:123456789012:certificate/12345678-d88f-497c-b48f-b273ddaf25c0
```

Ensure that you replace the placeholder values above with your actual custom domain and certificate ARN. You should enter the domain **without** a `https://` prefix as shown above.

## Deploying the changes

Now, apply the changes to your deployment by running:

```
gdeploy update
```

You should see an output similar to the below:

```
[✔] Your Granted deployment has been updated
```
