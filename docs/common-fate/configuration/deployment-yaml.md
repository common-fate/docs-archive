# Deployment YAML reference

When `gdeploy init` is run, a `deployment.yml` file is created in the folder that the command was executed in. This YAML file contains the parameters for your Common Fate deployment. It includes information about where the deployment is running, such as the AWS account ID and region, as well as the configured identity provider and Access Providers.

You can edit the YAML file manually using a text editor of choice. Some `gdeploy` commands will make changes to the YAML file automatically, such as `gdeploy release set <release version>`. When `gdeploy` makes automatic changes to the YAML file, any comments in the YAML (like `# example comment`) are removed.

Here's an example of a complete `deployment.yml` for reference:

```yaml
version: 2
deployment:
  stackName: Granted
  account: "123456789012"
  region: us-west-2
  release: 0.4.3
  tags:
    some-tag: some-value
    other-tag: other-value
  parameters:
    CognitoDomainPrefix: granted-login-mycompany
    AdministratorGroupID: 00g6cyy2ha8VTk3mK5d7
    DeploymentSuffix: <only required if there are multiple Granted CloudFormation stacks deployed to the same AWS account>
    IdentityProviderType: okta
    SamlSSOMetadataURL: https://mycompany.okta.com/app/abcdef12345/sso/saml/metadata
    FrontendDomain: granted.mycompany.com
    FrontendCertificateARN: arn:aws:acm:us-east-1:123456789012:certificate/12345-12345-12345-12345-12345
    APIGatewayWAFACLARN: arn:aws:wafv2:us-west-2:123456789012:regional/webacl/acl-name/d34e51bd-df7f-41a3-93d1-4735efb5af4c
    CloudfrontWAFACLARN: arn:aws:wafv2:us-east-1:123456789012:global/webacl/cloudfront-acl-name/ebdf717e-7d52-458f-ab78-caa45b2d7b57
    ProviderConfiguration:
      aws-sso:
        uses: commonfate/aws-sso@v2
        with:
          identityStoreId: d-12345abc
          instanceArn: arn:aws:sso:::instance/ssoins-1234512345
          region: ap-southeast-2
    IdentityConfiguration:
      okta:
        apiToken: awsssm:///granted/secrets/identity/okta/token:1
        orgUrl: https://mycompany.okta.com
    NotificationsConfiguration:
      slack:
        apiToken: awsssm:///granted/secrets/notifications/slack/token:1
```
