---
sidebar_position: 11
---

# AWS Organizational Unit Access

Granted Approvals has support for AWS Organzational Unit (OU) access control. This allows you to grant access to a set of accounts based on the OU structure of your AWS organization.

## What is an Organizational Unit?

OUs are a way to organize your AWS accounts into groups. You can read more about them [here](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_ous.html). By specifiying access to a specific OU, you can grant access to all accounts within that OU and all accounts within any child OUs.
![hierachical diagram of aws account structure](/img/org-units/structure.png)

## Why use OUs?

OUs allow you to group accounts by business unit, project, or any other criteria you choose. In Granted Approvals this means less work for you. You can grant access to all accounts within an OU and not have to worry about adding new accounts to your access rule.

## What is the Root OU?

The Root OU is the top level of your organization. It is the parent of all other OUs. It is the only OU that can have accounts directly attached to it. All other OUs must be a child of another OU. By selecting the Root OU in Granted Approvals you are granting access to all accounts in your organization. This should be reserved for Sandbox Accounts, Privilleged users or for break-glass access.

## Getting Started

Navigate to the Access Rule Create page and select the Provider Input Field
![](/img/org-units/1.png)

You will see three fields: Accounts, Organizational Units and Permission Sets. By selecting an account it will be individually added to the list of accounts.

Granted Approvals will show you a preview of what accounts will be available for selection by Granted Approvals end users. You can also add individual accounts and OUs at the same time.


## How do I setup an OU in my AWS account?

Using the AWS CLI you can create an OU in your account. You can read more about the CLI [here](https://docs.aws.amazon.com/cli/latest/reference/organizations/create-organizational-unit.html). The following command will create an OU named "Engineering" in the Root OU of your account.

```
ROOT_OU_ID=$(aws organizations list-roots --query "Roots[0].Id" --output text)
aws organizations create-organizational-unit --parent-id $ROOT_OU_ID --name "Engineering"
```

You can find the Root OU ID by running the following command:

```
aws organizations list-roots
```

Create an account in your OU by running the following command:

```
aws organizations create-account --account-name ApprovalsTestAccount --parent-id <ou-id> --email <email>
```

## Cleaning up

If you no longer need an OU you can delete it using the AWS CLI. You can read more about the CLI [here](https://docs.aws.amazon.com/cli/latest/reference/organizations/delete-organizational-unit.html). The following command will delete the OU named "Engineering" in the Root OU of your account.

```
aws organizations delete-organizational-unit --organizational-unit-id <ou-id>
```

You can find the OU ID by running the following command:

```
aws organizations list-organizational-units-for-parent --parent-id <root-ou-id>
```
