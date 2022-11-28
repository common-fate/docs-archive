---
sidebar_position: 8
---

# Migration Guide

This page will detail migration steps to upgrade your deployment of Granted Approvals to new versions.

## v0.11.0

### Rebranding From Granted Approvals to Common Fate

In v0.11.0 the platform has been rebranded to be called Common Fate, this includes renaming the repository from common-fate/granted-approvals to commonfate/common-fate.
There are non breaking changes to the appearance of some colors and logos in the frontend, and non breaking changes to naming conventions in the backend code.

### Deployment Configuration File Changes

This change affects you if you are using the default filename `granted-deployment.yml` for your deployment configuration. This release introduces a breaking change here and you will be required to rename the file to `deployment.yml` before you can use gdeploy to manage your deployment.

## v0.9.0

### AWS SSO Access Provider IAM changes

This change impacts you if you are using the `commonfate/aws-sso@v2` Access Provider. To check whether you are using it, inspect your `granted-deployment.yml` file in a text editor. You will see the Access Provider in the `ProviderConfiguration` section of the configuration file. For example:

```yaml
version: 2
deployment:
  stackName: Granted
  account: "123456789012"
  region: us-west-2
  release: v0.8.0
  parameters:
    // highlight-start
    ProviderConfiguration:
      aws-sso-v2:
        uses: commonfate/aws-sso@v2
        with:
          identityStoreId: d-123456789
          instanceArn: arn:aws:sso:::instance/ssoins-12345abcdef
          region: us-east-1
          ssoRoleArn: arn:aws:iam::123456789012:role/SSOAccessRole-12345678abcdef
    // highlight-end
```

This release adds support for [Organizational Unit](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_ous.html) access rules to the AWS SSO Access Provider. This feature uses a new Granted Approvals framework feature we have introduced called Dynamic Fields. Dynamic Fields automatically filter the available permissions that a user can select - such as selecting an account which belongs in a particular Organizational Unit.

In order to support this feature, the AWS SSO Access Provider requires some additional read-only IAM permissions. The new permissions are: `organizations:ListAccountsForParent`, `organizations:ListOrganizationalUnitsForParent`, `organizations:ListRoots`, `organizations:ListTagsForResource`. To prevent disruption to your deployment, these new permissions should be added prior to updating your deployment to v0.9.0.

If you do not apply these changes, your end users may see a "no options" message when trying to request access to roles:

!["No options" message screenshot on the Account field when requesting a role](/img/migration/no-accounts.png)

You can view the pull request which introduced these changes [here](https://github.com/common-fate/granted-approvals/pull/332/files).

To add the new IAM permissions, follow the guide below.

Update the SSO Access Role CloudFormation file. Open a terminal in the same folder as your `granted-deployment.yml` file, and then run:

```bash
ACCESS_HANDLER_ROLE=$(gdeploy output AccessHandlerExecutionRoleARN)
cat <<EOF > granted-access-handler-sso-role.yml
Resources:
  GrantedAccessHandlerSSORole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Statement:
          - Action: sts:AssumeRole
            Effect: Allow
            Principal:
              AWS: "${ACCESS_HANDLER_ROLE}"
        Version: "2012-10-17"
      Description: This role grants management access to AWS SSO for the Granted Access Handler.
      Policies:
        - PolicyName: AccessHandlerSSOPolicy
          PolicyDocument:
            Version: "2012-10-17"
            Statement:
              - Sid: ReadSSO
                Action:
                  - iam:GetRole
                  - iam:GetSAMLProvider
                  - iam:ListAttachedRolePolicies
                  - iam:ListRolePolicies
                  - identitystore:ListUsers
                  - organizations:DescribeAccount
                  - organizations:DescribeOrganization
                  - organizations:ListAccounts
                  - organizations:ListAccountsForParent
                  - organizations:ListRoots
                  - organizations:ListTagsForResource
                  - sso:DescribeAccountAssignmentCreationStatus
                  - sso:DescribeAccountAssignmentDeletionStatus
                  - sso:DescribePermissionSet
                  - sso:ListAccountAssignments
                  - sso:ListPermissionSets
                  - sso:ListTagsForResource
                  - tag:GetResources
                Effect: Allow
                Resource: "*"
              - Sid: AssignSSO
                Action:
                  - iam:UpdateSAMLProvider
                  - sso:CreateAccountAssignment
                  - sso:DeleteAccountAssignment
                Effect: Allow
                Resource: "*"
Outputs:
  RoleARN:
    Value:
      Fn::GetAtt:
        - GrantedAccessHandlerSSORole
        - Arn
EOF
```

Update the existing CloudFormation stack. This guide will use the AWS Console, but you can also do this with the AWS CLI. Open a console in the account that the Granted Access Handler SSO role stack was deployed to. In most cases, this will be the root account in your AWS organization. Select the CloudFormation stack and click the "Update" button. Choose the options as shown below, opting to replace the current template and to upload a template file. Upload the template file that you created in the previous step. Navigate through the rest of the wizard and apply the update.

![Update Stack CloudFormation Console screenshot](/img/migration/update-stack.png)
