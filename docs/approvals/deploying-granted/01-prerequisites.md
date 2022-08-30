---
slug: prerequisites
---

# Prerequisites

This guide will walk you through through deploying Granted Approvals. It will take around 15 minutes to complete.

## Deployment

Granted Approvals is self-hosted in your own AWS account. The application is deployed and updated using CloudFormation. Granted Approvals has been developed using serverless services such as Cognito, AWS Lambda, and DynamoDB. Hosting costs for Granted Approvals should fall fully into the AWS free tier, or if not should be a few dollars per month.

An architecture diagram of Granted Approvals is shown below:

![An architecture diagram of Granted Approvals](/img/approvals-getting-started/architecture.png)

If you have any questions about Granted Approvals' architecture, feel free to get in touch by [joining our Slack community](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg).

## Before you get started

- You'll need an AWS account to deploy Granted Approvals into. We recommend setting up a designated account specifically for Granted.
- You'll need an AWS profile set up on your computer with the ability to create resources and IAM roles in the account you'll deploy Granted Approvals to.

:::info
If you don't have an AWS account and would like to use Granted Approvals, or would prefer to deploy to Google Cloud or Microsoft Azure, [join our early access program for Common Fate Cloud](https://granted.dev/cfcloud?ref=docs-approvals-prereq).
:::
