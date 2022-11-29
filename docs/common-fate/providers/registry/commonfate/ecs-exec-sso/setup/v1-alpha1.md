# commonfate/ecs-exec-sso/setup@v1-alpha1
:::info
When setting up a provider for your deployment, we recommend using the [interactive setup workflow](../../../interactive-setup.md) which is available from the Providers tab of your admin dashboard.
:::
## Example granted_deployment.yml
```yaml
version: 2
deployment:
  stackName: example
  account: "12345678912"
  region: ap-southeast-2
  release: v0.11.0
  parameters:
    CognitoDomainPrefix: example
    AdministratorGroupID: granted_administrators
    ProviderConfiguration:
      ecs-exec-sso:
        uses: commonfate/ecs-exec-sso@v1-alpha1
        with:
          ecsClusterArn: ""
          ecsRegion: ""
          ecsRoleArn: ""
          identityStoreId: ""
          instanceArn: ""
          ssoRegion: ""
          ssoRoleArn: ""

```
## Find the AWS SSO instance details
### Configuration Fields
This step will guide you through collecting the values for these fields required to setup your provider.

| Field | Description |
| ----------- | ----------- |
| identityStoreId | The AWS SSO Identity Store ID |
| instanceArn | The AWS SSO Instance ARN |
| ssoRegion | The region the AWS SSO instance is deployed to |
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

The **InstanceArn** value in the CLI output should be provided as the **instanceArn** parameter when configuring the provider.

The **IdentityStoreId** field in the CLI output should be provided as the **identityStoreId** parameter when configuring the provider.

If your AWS SSO instance is deployed in a separate region to the region that Common Fate is running in, set the **region** parameter to be the region of your AWS SSO instance (e.g. 'us-east-1').

### Using the AWS Console

Open the AWS console in the account that your AWS SSO instance is deployed to. If your company is using AWS Control Tower, this will be the root account in your AWS organisation.

Visit the **Settings** tab. The information about your SSO instance will be shown here, including the Instance ARN (as the “ARN” field) and the Identity Store ID.

![](https://static.commonfate.io/providers/aws/sso/console-instance-arn-setup.png)
## Locating your ECS Resources
### Configuration Fields
This step will guide you through collecting the values for these fields required to setup your provider.

| Field | Description |
| ----------- | ----------- |
| ecsClusterArn | The ARN of the ECS Cluster to provision access to |
| ecsRegion | The region the ecs cluster instance is deployed to |
# Locating your ECS Cluster

Locate your chosen `ecsClusterArn` by running the following command:

```bash
> aws ecs list-clusters
{
    "clusterArns": [
        "arn:aws:ecs:ap-southeast-2:1234567890:cluster/MyFirstCluster",
        "arn:aws:ecs:ap-southeast-2:1234567890:cluster/MySecondCluster",
        "arn:aws:ecs:ap-southeast-2:1234567890:cluster/MyThirdCluster",
    ]
}
```

Copy in the ARN of the ECS cluster you want to set up the Access Provider for.

Enter the region where your cluster is deployed.
## Create a SSO IAM role
### Configuration Fields
This step will guide you through collecting the values for these fields required to setup your provider.

| Field | Description |
| ----------- | ----------- |
| ssoRoleArn | The ARN of the AWS IAM Role with permission to administer SSO |
This Access Provider requires permissions to manage your SSO instance.

The following instructions will help you to setup the required IAM Role with a trust relationship that allows only the Common Fate Access Handler to assume the role.

This role should be created in the root account of your AWS organization. _This is the account where AWS SSO is configured and your AWS Organization is managed_.

Copy the following YAML and save it as 'common-fate-access-handler-ecs-exec-sso-role.yml'.

We recommend saving this alongside your deployment.yml file in source control.

```yaml
Resources:
  CommonFateAccessHandlerSSORole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Statement:
          - Action: sts:AssumeRole
            Effect: Allow
            Principal:
              AWS: "{{ Access Handler Execution Role ARN }}"
        Version: "2012-10-17"
      Description: This role grants management access to AWS SSO for the Common Fate Access Handler.
      Policies:
        - PolicyDocument:
            Statement:
              - Action:
                  - sso:DescribeAccountAssignmentDeletionStatus
                  - sso:DescribeAccountAssignmentCreationStatus
                  - sso:DescribePermissionSet
                  - sso:ListPermissionSets
                  - sso:ListTagsForResource
                  - sso:ListAccountAssignments
                  - organizations:ListAccounts
                  - organizations:DescribeAccount
                  - organizations:DescribeOrganization
                  - iam:GetSAMLProvider
                  - iam:GetRole
                  - iam:ListAttachedRolePolicies
                  - iam:ListRolePolicies
                  - identitystore:ListUsers
                  - iam:ListRoles
                  - iam:ListUsers
                Effect: Allow
                Resource: "*"
                Sid: ReadSSO
              - Action:
                  - sso:DeletePermissionSet
                  - sso:DeleteAccountAssignment
                  - sso:CreatePermissionSet
                  - sso:PutInlinePolicyToPermissionSet
                  - sso:CreateAccountAssignment
                Effect: Allow
                Resource: "*"
                Sid: AssignSSO
            Version: "2012-10-17"
          PolicyName: AccessHandlerSSOPolicy
Outputs:
  RoleARN:
    Value:
      Fn::GetAtt:
        - CommonFateAccessHandlerSSORole
        - Arn
```

### Using the AWS CLI

If you have the AWS CLI installed and can deploy cloudformation you can run the following commands to deploy this stack.
Ensure you have credentials for the same account that Common Fate is deployed to and that AWS_REGION environment variable is set correctly, we recommend deploying this role to the same region as your Common Fate stack.

```bash
aws cloudformation deploy --template-file common-fate-access-handler-ecs-exec-sso-role.yml --stack-name Common-Fate-Access-Handler-ECS-Exec-SSO-Role --capabilities CAPABILITY_IAM
```

Once the stack is deployed, you can retrieve the role ARN by running the following command.

```bash
aws cloudformation describe-stacks --stack-name Common-Fate-Access-Handler-ECS-Exec-SSO-Role --query "Stacks[0].Outputs[0].OutputValue"
```

### Using the AWS Console

Open the AWS Console to Cloudformation in the root account of your AWS organization and click **Create stack** then select **with new resources (standard)** from the menu.

![](https://static.commonfate.io/providers/aws/sso/create-stack.png)

Upload the template file

![](https://static.commonfate.io/providers/aws/sso/create-stack-with-template.png)

Name the stack 'Common-Fate-Access-Handler-ECS-Exec-SSO-Role'

![](https://static.commonfate.io/providers/aws/sso/specify-stack-details.png)

Click **Next**

Click **Next**

Acknowledge the IAM role creation check box and click **Create Stack**

![](https://static.commonfate.io/providers/aws/sso/accept-iam-prompt.png)

Copy the **RoleARN** output from the stack and paste it in the **ssoRoleArn** config value on the right.

![](https://static.commonfate.io/providers/aws/sso/role-output.png)
## Create an ECS IAM role
### Configuration Fields
This step will guide you through collecting the values for these fields required to setup your provider.

| Field | Description |
| ----------- | ----------- |
| ecsRoleArn | The ARN of the AWS IAM Role with permission to read ECS |
This Access Provider requires permissions to read ECS properties.

The following instructions will help you to setup the required IAM Role with a trust relationship that allows only the Common Fate Access Handler to assume the role.

This role should be created in the _same account where your cluster is deployed_.

Copy the following YAML and save it as 'common-fate-access-handler-ecs-exec-ecs-role.yml'.

We recommend saving this alongside your deployment.yml file in source control.

```yaml
Resources:
  CommonFateAccessHandlerECSRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Statement:
          - Action: sts:AssumeRole
            Effect: Allow
            Principal:
              AWS: "{{ Access Handler Execution Role ARN }}"
        Version: "2012-10-17"
      Description: This role grants read access to ECS for the Common Fate Access Handler.
      Policies:
        - PolicyName: AccessHandlerECSPolicy
          PolicyDocument:
            Statement:
              - Action:
                  - ecs:ListTasks
                  - ecs:ListTaskDefinitionFamilies
                  - ecs:DescribeTasks
                  - ecs:DescribeClusters
                  - cloudtrail:LookupEvents
                Effect: Allow
                Resource: "*"
                Sid: ReadECS
            Version: "2012-10-17"
Outputs:
  RoleARN:
    Value:
      Fn::GetAtt:
        - CommonFateAccessHandlerECSRole
        - Arn
```

### Using the AWS CLI

If you have the AWS CLI installed and can deploy cloudformation you can run the following commands to deploy this stack.
Ensure you have credentials for the same account that Common Fate is deployed to and that AWS_REGION environment variable is set correctly, we recommend deploying this role to the same region as your Common Fate stack.

```bash
aws cloudformation deploy --template-file common-fate-access-handler-ecs-exec-ecs-role.yml --stack-name Common-Fate-Access-Handler-ECS-Exec-ECS-Role --capabilities CAPABILITY_IAM
```

Once the stack is deployed, you can retrieve the role ARN by running the following command.

```bash
aws cloudformation describe-stacks --stack-name Common-Fate-Access-Handler-ECS-Exec-ECS-Role --query "Stacks[0].Outputs[0].OutputValue"
```

### Using the AWS Console

Open the AWS Console to Cloudformation in the same account that your ECS cluster is running in and click **Create stack** then select **with new resources (standard)** from the menu.

![](https://static.commonfate.io/providers/aws/sso/create-stack.png)

Upload the template file

![](https://static.commonfate.io/providers/aws/sso/create-stack-with-template.png)

Name the stack 'Common-Fate-Access-Handler-ECS-Exec-ECS-Role'

![](https://static.commonfate.io/providers/aws/sso/specify-stack-details.png)

Click **Next**

Click **Next**

Acknowledge the IAM role creation check box and click **Create Stack**

![](https://static.commonfate.io/providers/aws/sso/accept-iam-prompt.png)

Copy the **RoleARN** output from the stack and paste it in the **ssoRoleArn** config value on the right.

![](https://static.commonfate.io/providers/aws/sso/role-output.png)
## Finalizing Your Deployment
### Configuration Fields
This step will guide you through collecting the values for these fields required to setup your provider.

| Field | Description |
| ----------- | ----------- |
# Setting up Python shell access

If you aren't using interactive Python shells on your ECS tasks, skip this step.

The following instructions detail how to install the [granted-flask](https://pypi.org/project/granted-flask/) library for audited Python shell access.

### Installing the Python library

Add `granted-flask` to your Docker container's Python dependencies. This will depend on what dependency management approach you use. We've given an example below for `requirements.txt`:

```bash
pip install granted-flask
pip freeze > requirements.txt
```

### Set the GRANTED_WEBHOOK_URL environment variable

A `GRANTED_WEBHOOK_URL` environment variable must be provided to the ECS task pointing to your Common Fate deployment URL.

To find your webhook URL open a terminal at the directory containing your `deployment.yml` file. Then run:

```
gconfig output WebhookUrl
```

Update the task definition of the ECS container with the following environment variable:

```
GRANTED_WEBHOOK_URL=<Webhook URL from the gconfig output>
```
