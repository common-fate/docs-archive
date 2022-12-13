---
slug: prerequisites
---

# Prerequisites

This guide will walk you through through deploying Common Fate. It will take around 15 minutes to complete.

## Deployment

Common Fate is self-hosted in your own AWS account. The application is deployed and updated using CloudFormation. Common Fate has been developed using serverless services such as Cognito, AWS Lambda, and DynamoDB. Hosting costs for Common Fate should fall fully into the AWS free tier, or if not should be a few dollars per month.

An architecture diagram of Common Fate is shown below:

![An architecture diagram of Common Fate](/img/common-fate-getting-started/architecture.png)

If you have any questions about Common Fate's architecture, feel free to get in touch by [joining our Slack community](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg).

## Before you get started

- You'll need an AWS account to deploy Common Fate into. We recommend setting up a designated account specifically for Common Fate.
- You'll need an AWS profile set up on your computer with the ability to create resources and IAM roles in the account you'll deploy Common Fate to.

:::info
If you don't have an AWS account and would like to use Common Fate, or would prefer to deploy to Google Cloud or Microsoft Azure, [join our early access program for Common Fate Cloud](https://commonfate.io/early-access).
:::
