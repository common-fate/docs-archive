---
sidebar_position: 11
---

# Org Unit Access

Granted Approvals has support for Org Unit access control. This allows you to grant access to a set of accounts based on the OU structure of your organization.

## What is an Org Unit?
Org units are a way to organize your AWS accounts into groups. You can read more about them [here](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_ous.html). By specifiying access to a specific OU, you can grant access to all accounts within that OU and all accounts within any child OUs.
![hierachical diagram of aws account structure](/img/org-units/structure.png)

## Why use Org Units?
Org Units allow you to group accounts by business unit, project, or any other criteria you choose. In Granted Approvals this means less work for you. You can grant access to all accounts within an OU and not have to worry about adding new accounts to your access rule.

## What is the Root Org Unit?
The Root OU is the top level of your organization. It is the parent of all other OUs. It is the only OU that can have accounts directly attached to it. All other OUs must be a child of another OU. By selecting the Root OU in Granted Approvals you are granting access to all accounts in your organization. This should be reserved for Sandbox Accounts, Privilleged users or for break-glass access.

## Getting Started
Navigate to the Access Rule Create page and select the Provider Input Field 
![](/img/org-units/1.png)

You will see three fields: Accounts, Organizational Units and Permission Sets. By selecting an account it will be individuall added to the list of accounts. 

By selecting an OU it will add all accounts within that OU. You can also add accounts and OUs at the same time. 

Selecting a Permission Set will reduce the access scope of the accounts you have selected to that permission set. If you select multiple permission sets, the requesting user can select one of those permission sets when making their access request.

## How do I setup an OU in my aws account?
Using the AWS CLI you can create an Org Unit in your account. You can read more about the CLI [here](https://docs.aws.amazon.com/cli/latest/reference/organizations/create-organizational-unit.html). The following command will create an OU named "Engineering" in the Root OU of your account.
```
aws organizations create-organizational-unit --parent-id <root-ou-id> --name "Engineering"
```
You can find the Root OU ID by running the following command:
```
aws organizations list-roots
```
To [create an account](https://docs.aws.amazon.com/cli/latest/reference/organizations/create-account.html) in your OU you can use the following command:
```
aws organizations create-account --email <email> --account-name <account-name> --role-name <role-name> --iam-user-access-to-billing ALLOW --parent-id <ou-id>
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