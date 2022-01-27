---
sidebar_position: 1
---

# Introduction

Granted is a cloud access management framework for humans. Granted makes it simple and secure for engineers in your team to access cloud resources, for both day-to-day and in exceptional breakglass circumstances.

![A diagram showing cloud providers connected to Granted](/img/granted-cloud-access.png)

## Access to the cloud

When using the cloud, Identity & Access Management (IAM) policies are often the only control which limit internal access to sensitive customer data. It's no secret that writing least-privileged IAM policies is hard, and ensuring that the right team members have access to the right roles can also be difficult. In order to move quickly when building and maintaining cloud-based services, engineers are often given highly privileged administrative roles.

Auditing usage of these roles can be difficult, as analysing cloud audit trails by themselves don't give you the full picture. Was the team member responding to an outage? Were they deploying a new service or feature? Collecting this additional contextual data can be a time consuming process.

Granted's goal is provide you to ensure that access to privileged roles is controlled, but that these roles remain available when they are needed. Granted also aims to capture contextual data relevant to privileged role access at the time the role is used, giving security and compliance teams the full picture of _why_ a role was used, not just what the role was used for.

## How Granted works

## For developers

The Granted Command Line Interface (CLI) makes roles more discoverable and consistent across your team. By using Granted you'll no longer have to manually maintain config files or long-lived credentials for your cloud providers.

Using the `assume` command or the [Granted Role Registry](/) you can search all of the roles you've been given access to. Granted can also suggest or automatically assume roles based on the repository you're working on.

Granted also allows you to [view multiple regions or accounts in cloud providers' consoles at the same time](/granted/usage/console).

Instead of raising service request tickets or sending emails to have roles provisioned by your account administrator or IAM team, Granted allows you to request roles through [the self-serve workflow](/granted/usage/self-serve). Granted has an extensive library of least-privileged permission templates to start from - or you can write your own.

## For cloud administrators

Granted allows you to centrally administer and audit roles across all of your cloud providers, and allows users to request roles and permissions in a self-serve fashion. Granted can be administered by non-technical users through the [web portal](/), or by editing the [declarative configuration files](/). Granted allows you to [securely automate deployment of roles](/) through GitHub, GitLab and other source control platforms.

Granted is particularly well suited to managing privileged roles, such as roles with access to production data or those only intended to be used in incident response to an outage, as it has first-class support for workflows such as [Audited Access](/) and [Multi-Party Authorization](/).

Granted greatly simplifies compliance reporting around IAM by [automatically generating User Access Review reports](/). Auditors also be invited to your team, providing them with read-only access to compliance reports.

In addition to managing roles, Granted helps you meaningfully improve your IAM security [by applying least-privilege policies using IAM Zero](/granted/admin/least-privilege). Unused permissions will be gracefully removed over time to reduce your IAM risk - and can easily be requested again if your team needs them.

Granted is flexible and can be integrated with SSO identity providers such as [Okta](/granted/integrations/okta) and [Azure AD](/granted/integrations/azure-ad), and works well with cloud sign-in services like [AWS SSO](/granted/integrations/aws-sso). Granted also integrates with mobile device management (MDM) platforms such as [Jamf](/granted/integrations/jamf) which allows privileged role access to be restricted to managed devices.

## Your team's identity infrastructure

At it's core Granted is an identity framework which issues unique, short lived identity certificates. You can think of Granted as a lightweight certificate authority, without the headaches of managing long-lived signing keys (alternatively, if you're already using a private certificate authority you can [connect it with Granted](/)).

![A diagram showing an example Granted Identity Certificate for alice@acme.com, with groups "Developers" and "DevOps" bound to the certificate](/img/granted-identity-certificates.png)

Granted's identity framework gives you building blocks which your organisation can use to quickly develop it's own internal access solutions:

| Building Block            | Description                                                                                                                                                                                                           | Use Case                                                                                                                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| x509 Certificates         | Granted signs short-lived identity certificates which bind users to their corporate identity and groups.                                                                                                              | ACME Corp has an internal API that their engineering team uses to provision services. ACME Corp uses Granted to secure this API with mTLS, ensuring that only engineers in the "DevOps" Okta group can access it.        |
| SAML                      | Granted supports acting as a SAML Service Provider: used when your corporate identity provider is the source of truth for identities, and a SAML Identity Provider: used to federate access to SAML SSO applications. | Best Corp uses Granted in conjunction with Azure AD providing SSO login, and AWS SSO providing cloud access. Granted allows access to privileged AWS roles to be controlled with workflows to access them when required. |
| OpenID Connect (OIDC)     | Granted acts as an OIDC consumer: used when your corporate identity provider supports OIDC and is the source of truth for identities, and an OIDC provider: used to federate access to OIDC SSO applications.         | TBD                                                                                                                                                                                                                      |
| Audited Access            |                                                                                                                                                                                                                       |                                                                                                                                                                                                                          |
| Multi-Party Authorization |                                                                                                                                                                                                                       |                                                                                                                                                                                                                          |

## Why use Granted?

To evaluate whether Granted is a good fit for your organization it's worth comparing it to other tools out there, namely corporate identity providers like Okta, cloud provider sign-in tools like AWS SSO, and infrastructure-as-code tools like Terraform.

:::note
Granted is designed to integrate with the tools mentioned below, rather than replace any of them. That being said, we think it's worthwhile discussing the differences between Granted and the tools below to help illustrate how Granted is best useful to your organization.
:::

### Granted vs Okta

### Granted vs AWS SSO

### Granted vs Terraform
