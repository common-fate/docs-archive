---
slug: org-units
sidebar_position: 11
---

# AWS Organizational Unit Access

Granted Approvals has support for AWS Organzational Unit (OU) access control. This allows you to grant access to a set of accounts based on the OU structure of your AWS organization.

:::info
To use this feature you must have a `commonfate/aws-sso` provider configured. See [AWS SSO Provider](/granted-approvals/providers/aws-sso/aws-sso) for more information.
:::

## What are Organizational Units?

OUs are a way to organize your AWS accounts into groups. You can read more about them [here](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_ous.html). By specifiying access to a specific OU, you can grant access to all accounts within that OU and all accounts within any child OUs.
![hierachical diagram of aws account structure](/img/org-units/structure.png)

## Why use OUs?

Granted Approvals automatically updates the available accounts when OUs are used in Access Rules.

For example, if you want to allow team members to request access to any production account, you can create a Production OU in your AWS organization. Then in Granted, you can set up an Access Rule specifying that Production OU.

![screenshot of ou sync UI](/img/org-units/ou_sync.png)

When new accounts are added to the Production OU, they will automatically be made available for users to request access to under the same Access Rule. Granted Approvals syncs the available accounts every 5 minutes.

## The Root OU

The Root OU is the top level of your organization. In Granted Approvals the Root OU is shown as 'Root' when selecting an OU for an Access Rule. It's the parent of all other OUs, and is the only OU that can have accounts directly attached to it. All other OUs must be a child of another OU. Selecting the Root OU in Granted Approvals will grant access to every account in your organization: this should be reserved for sandbox accounts, privileged users or for break-glass access.

![root OU in UI](/img/org-units/root_ou.png)

## Getting Started

Navigate to the Access Rule Create page and select the Provider Input Field:
![](/img/org-units/1.png)

You'll see three fields: Accounts, Organizational Units and Permission Sets. Granted Approvals will show you a preview of which accounts will be available for selection by Granted Approvals end users. You can also add individual accounts and OUs at the same time.

## Setting up an OU in your AWS account

You can create an OU in your account using the [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/organizations/create-organizational-unit.html). The following command creates an OU named "Engineering" in the Root OU of your account:

```
ROOT_OU_ID=$(aws organizations list-roots --query "Roots[0].Id" --output text)
aws organizations create-organizational-unit --parent-id $ROOT_OU_ID --name "Engineering"
```

Create an account in your OU by running the following command:

```
aws organizations create-account --account-name ApprovalsTestAccount --parent-id <ou-id> --email <email>
```

## Cleaning up

To return to the default state of your AWS account and Granted deployment:
1. Archive the Access Rule in your Granted Approvals deployment
1. Delete the AWS account(s) that you created
1. Delete the AWS OU that you created


Archive the Access Rule by clicking the Archive button on the Access Rule page.
![archive rule](/img/org-units/archive_rule.png)


You can find the OU's ID by running the following command and looking for the OU name in the list of OUs:

```
ROOT_OU_ID=$(aws organizations list-roots --query "Roots[0].Id" --output text)
aws organizations list-organizational-units-for-parent --parent-id $ROOT_OU_ID
```

Now you can list all the OU's child accounts:
```
aws organizations list-accounts-for-parent --parent-id <ou-id>
```

And then delete the child accounts:

```
aws organizations delete-account --account-id <account-id>
```

Finally, you can delete the OU by running the following command:


```
aws organizations delete-organizational-unit --organizational-unit-id <ou-id>
```

This process must be repeated for all nested OUs and accounts.

You can read more about deleting OUs using the CLI [here](https://docs.aws.amazon.com/cli/latest/reference/organizations/delete-organizational-unit.html).
