---
slug: prerequisites
---

# Prerequisites

This guide will walk you through deploying Glide. It will take around 15 minutes to complete.

## Deployment

Glide is self-hosted in your own AWS account. The application is deployed and updated using CloudFormation. Glide has been developed using serverless services such as Cognito, AWS Lambda, and DynamoDB. Hosting costs for Glide should fall fully into the AWS free tier, or if not should be a few dollars per month.

An architecture diagram of Glide is shown below:

![An architecture diagram of Glide](/img/common-fate-getting-started/architecture.png)

If you have any questions about Glide's architecture, feel free to get in touch by [joining our Slack community](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg).

## Before you get started

- You'll need an AWS account to deploy Glide into. We recommend setting up a designated account specifically for Glide.
- You'll need an AWS profile set up on your computer with the ability to create resources and IAM roles in the account you'll deploy Glide to.

:::info
If you don't have an AWS account and would like to use Glide, or would prefer to deploy to Google Cloud or Microsoft Azure, get in touch by [joining our Slack community](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg).
:::
