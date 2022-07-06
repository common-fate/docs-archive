---
sidebar_position: 2
---

# AWS SSO

## Parameters

| Name            | Description                                               |
| --------------- | --------------------------------------------------------- |
| identityStoreId | the AWS SSO Identity Store ID                             |
| instanceArn     | the AWS SSO Instance ARN                                  |
| region          | (optional) the region the AWS SSO instance is deployed to |

## Prerequisites

In order to use this provider, the AWS account which Granted is deployed in must be a delegated administrator of the AWS SSO instance.

To set this up, open the AWS console visit the **Settings** page in AWS SSO. Navigate to the **Management** tab. Then, click on the **Register account** button in the “Delegated administrator” section.

![](/img/providers/aws-sso/01.png)

Select the account which Granted is deployed to.

![](/img/providers/aws-sso/02.png)

<aside>
💡 Enabling this action has security implications: users with administrative access in the account that Granted is deployed in will have the ability to perform AWS SSO administrative tasks. Once Granted is set up, we recommend removing any persistent Permission Sets which grant users administrative access to the account that Granted is running in.

</aside>

A delegated administrator account does not have the ability to remove Permission Sets created in your SSO management account. For example, if you have persistent permissions defined in your management account and only use Granted for elevated administrative access, Granted will be unable to remove any persistent permissions as long as they are defined in the management account.

## Setup instructions

### Using the AWS CLI

If you have the AWS CLI installed and can access the account that your AWS SSO instance is deployed to, run the following command to retrieve details about the instance:

```bash
❯ aws sso-admin list-instances
{
    "Instances": [
        {
            "InstanceArn": "arn:aws:sso:::instance/ssoins-1234567890",
            "IdentityStoreId": "d-1234567890"
        }
    ]
}
```

The `InstanceArn` value in the CLI output should be provided as the `instanceArn` parameter when configuring the provider.

The `IdentityStoreId` field in the CLI output should be provided as the `identityStoreId` parameter when configuring the provider.

If your AWS SSO instance is deployed in a separate region to the region that Granted Approvals is running in, set the `region` parameter to be the region of your AWS SSO instance (e.g. `us-east-1`).

### Using the AWS Console

Open the AWS console in the account that your AWS SSO instance is deployed to. If your company is using AWS Control Tower, this will be the root account in your AWS organisation.

Visit the **Settings** tab. The information about your SSO instance will be shown here, including the Instance ARN (as the “ARN” field) and the Identity Store ID.

![](/img/providers/aws-sso/03.png)
