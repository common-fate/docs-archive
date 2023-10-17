---
sidebar_position: 1
---

# Introduction

Granted is a command line interface (CLI) tool which simplifies access to cloud roles and allows multiple cloud accounts to be opened in your web browser simultaneously. The goals of Granted are:

- Provide a fast experience around finding and assuming roles
- Leverage native browser functionality to allow multiple accounts to be accessed at once
- Encrypt cached credentials to avoid plaintext SSO tokens being saved on disk

![A screenshot of the AWS Console on Firefox with two tabs: the first tab is blue and is the 'role-a' profile, and the second tab is orange and is the 'role-b' profile](/img/tab-containers.png)

## Supported cloud providers

Granted currently supports AWS. If you'd like to see support for another cloud provider please let us know by [opening an issue on GitHub](https://github.com/common-fate/granted/issues)!

On AWS, Granted works with both IAM roles and with AWS SSO. We highly recommend using Granted with AWS SSO as it avoids storing long-lived IAM credentials on your device.

## Supported browsers

Granted currently supports Firefox, Chromium-based browsers (such as Chrome, Brave, and Edge), Safari, Arc and Waterfox.

:::tip

We recommend using Firefox with Granted as it has the best user experience when accessing multiple cloud consoles, even if it's not your daily driver browser.

:::

On Firefox Granted uses [Multi-Account Containers](https://support.mozilla.org/en-US/kb/containers) to view multiple cloud accounts. Multiple cloud accounts can be opened in the same window and they are color-coded for easy reference. In order to use Granted with Firefox you'll need to download [our Firefox addon](https://addons.mozilla.org/en-GB/firefox/addon/granted/). The extension requires minimal permissions and does not have access to web page content. You can read more about security considerations for the extension [here](/granted/security).

On Chromium-based browsers Granted uses [Profiles](https://support.google.com/chrome/answer/2364824). Each cloud account is opened in a separate window.

## Why create Granted?

As cloud practitioners we follow best practices and use [multi-account environments](https://aws.amazon.com/organizations/deploying-granted/best-practices/). This frequently led to situations where we were cross-referencing resources or viewing logs across multiple accounts. When using the AWS console this becomes quite painful as only one account and region is accessible at a time per browser.

Yes, one way to solve this is to simply stop using the console and develop your own abstractions and visualisation layer on top of AWS's APIs. However, we believe the native console can be a useful tool for viewing your cloud resources; namely because you don't need to build anything yourself in order to use it.

An additional motivation for developing Granted is the way that the AWS CLI handles session credentials when using AWS SSO. We're big fans of AWS SSO as it removes the need for long-lived IAM credentials; however the AWS CLI stores [the SSO access token in plaintext](https://aws.amazon.com/premiumsupport/knowledge-center/sso-temporary-credentials/). If this token is compromised it can be [painful](https://stackoverflow.com/questions/65848394/how-to-revoke-a-user-session-when-using-aws-sso) [to revoke](https://blog.christophetd.fr/phishing-for-aws-credentials-via-aws-sso-device-code-authentication/#Containment_8211_revoking_AWS_SSO_access_tokens). Granted offers an improvement over the AWS CLI in this regard, as the SSO access token is stored in the system's keychain rather than on disk.

We've been using Granted internally for all our cloud access at Common Fate and we've found it's greatly increased our productivity when working in the cloud.

## Get started

Follow the [Getting Started guide](/granted/getting-started) to start using Granted for your cloud access.
