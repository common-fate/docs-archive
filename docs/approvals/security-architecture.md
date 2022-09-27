---
sidebar_position: 5
---

# Security Architecture

Granted Approvals is an identity-based privileged access management system. Employees within a company sometimes require administrative access to internal applications, such as cloud providers and SaaS applications. Granted Approvals provides workflows for employees to attain elevated access based on rules which you configure, such as designating roles as "break-glass" to be used only in an outage, to requiring a reason to be given for the access session.

## Granted Approvals assigns roles to your existing users

Granted Approvals uses an Access Provider plugin framework to connect to your cloud environment and SaaS services. Access Providers contain the necessary integration logic to assign and revoke access. For example, the `commonfate/aws-sso` Access Provider contains logic to assign users to Permission Sets in [AWS IAM Identity Center](https://aws.amazon.com/iam/identity-center/).

Each Access Provider requires that some permissions are given to Granted Approvals in order to assign and revoke access. These permissions are scoped so that Granted Approvals only has the ability to assign roles to existing users, rather than create new roles or users.

By design, the blast radius of Granted Approvals being compromised is that existing users in your directory could be granted access to roles, rather than external users being created or given access to resources.

## Granted Approvals runs in your cloud

Granted Approvals is deployed as a serverless application which runs in your own AWS account. Common Fate does not have access to any data in your Granted Approvals deployment.

## API security

All actions involving reading and writing data within Granted Approvals are conducted by calling REST APIs over HTTPS. These APIs are served via Amazon API Gateway. The REST APIs are secured using the AWS Cognito Authorizer. This is a native AWS security feature which runs in front of Granted Approvals. In order to access the API, users must authenticate with AWS Cognito. Cognito issues users with a short-lived access token for the API.

Additionally, Granted Approvals supports Single-Sign-On (SSO) using the SAML2.0 protocol. This functionality is built in to AWS Cognito. When using SSO, it is possible to configure Granted Approvals such that multi-factor authentication (MFA) is required for all logins. This can be configured in your corporate identity provider, such as Okta, Google Workspace, or Azure Active Directory. Users are prohibited from accessing APIs unless they have authenticated with Cognito. AWS’s security documentation on API Gateway is available [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/security.html).

There are two authorization levels within Granted Approvals:

- End User
- Administrator

End Users can make and approve Access Requests. The resources which they can request and approve access for are governed by Access Rules. Access Rules define which groups can request access, and which groups approve requests. Users can belong to multiple groups. When Granted Approvals is connected to your corporate identity provider, groups and group memberships are synchronised from your identity provider’s directory.

Administrators can create and modify Access Rules. A user is an Administrator if they belong to the Administrative Group. This group is specified when deploying Granted Approvals. When Granted Approvals is connected to your identity provider, the Administrative Group is a group ID of a group in your identity provider. This allows you to use your identity provider (such as Okta or Azure AD) to manage Granted Approvals administrators.

When an administrative API call is made, Granted Approvals first evaluates the group membership of a user. If the user does not belong to the Administrative Group, the action is aborted immediately.

## Revoking access

In case of a suspected security incident, Granted Approvals allows administrators to immediately revoked an access session before it expires.

## Audit trail events

Granted Approvals emits detailed audit trail events for all actions to Amazon EventBridge. These events can be aggregated in your SIEM in order to develop alerting rules. Documentation on audit trail events can be found [here](https://www.notion.so/Team-Home-09dc640a01d149b09edfd12ca83a3926).

## Disaster recovery

Granted Approvals stores data in Amazon DynamoDB and supports data backup and restore for disaster recovery. Documentation on this is available [here](https://docs.commonfate.io/granted-approvals/configuration/backup).

## Deployment tooling release verification

`gdeploy` is a command-line interface (CLI) tool for creating and managing Granted Approvals deployments. Common Fate signs `gdeploy` binaries with our [GPG key](https://docs.commonfate.io/granted/security#pgp-public-key). You can verify the integrity and authenticity of a `gdeploy` binary by following the process below.

:::note
The process below will use `v0.6.1` as the version of `gdeploy`. Ensure that you change references to `v0.6.1` to the version of Granted Approvals you wish to verify when following this process.
:::

Prior to verifying a release you must import our [GPG key](https://docs.commonfate.io/granted/security#pgp-public-key):

```bash
# get the key from Keybase, GitHub, or https://docs.commonfate.io/granted/security, and save it as commonfate.asc.
gpg import commonfate.asc
```

1. Download the Granted Approvals release artifact you wish to verify (we will use the Linux `x86_64` version as an example):

   ```
   curl -OL releases.commonfate.io/gdeploy/v0.6.1/gdeploy_0.6.1_linux_x86_64.tar.gz
   ```

2. Download the checksums for the release:

   ```
   curl -OL releases.commonfate.io/gdeploy/v0.6.1/checksums.txt
   ```

3. Download the signature file:

   ```
   curl -OL releases.commonfate.io/gdeploy/v0.6.1/checksums.txt.sig
   ```

4. Verify the integrity of the release artifact:

   ```
   shasum -a 256 -c checksums.txt --ignore-missing
   ```

   You should see an output similar to the below:

   ```
   gdeploy_0.6.1_linux_x86_64.tar.gz: OK
   ```

5. Verify the integrity and authenticity of the checksums:

   ```
   gpg --verify ./checksums.txt.sig
   ```
