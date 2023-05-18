---
sidebar_position: 1
---

# Introduction

:::info
Our Provider Development documentation is still a work-in-progress. If you're building an Access Provider, [join our Community Slack](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg).
:::

Access Providers are plugins that enable Common Fate users to connect their accounts to other services, such as cloud providers and SaaS applications. They contain integration logic that assigns users to specific resources within these services, streamlining the process of managing user access across multiple platforms. Examples of Access Providers include AWS Access Provider and Okta Access Provider.

To develop your own Access Provider for Common Fate, you will need to have a basic understanding of Python programming and experience with the Common Fate framework. Our Access Providers are written in Python and this documentation will guide you through the process of developing your own Access Provider and publishing it to the [Provider Registry](https://registry.commonfate.io)

## The Provider Development Kit

Common Fate Providers are built using the Provider Development Kit, or PDK for short. The PDK consists of:

- A [`pdk` CLI](https://github.com/common-fate/pdk) to help create, test, and publish Providers
- A [Python `provider` library](https://github.com/common-fate/provider) which is imported by all Access Providers to enable integration with the Common Fate platform

You'll use the `pdk` CLI from the command line, and the `provider` library inside your Provider Python code.

## Get started

Follow the [Getting Started guide](/provider-development/tutorial/overview) to start building an Access Provider.
