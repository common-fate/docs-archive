import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Access Rules

## Creating an Access Rule

Access rules control who can request access to what, and the requirements surrounding their requests.

To create an access rule, you must be an administrator. See, [creating an admin user](../deploying-common-fate/deploying#creating-an-admin-user).

Open the admin console to the **Access Rules** tab.

Press **+ New Access Rule** at the top left of the table.

![](/img/access-rules/00-landingpage.png)

You will be presented with a form with 5 sections.

## General

Start by giving your access rule a name and description. This name is what users will see when they look at what they can request access to. Make this something that has meaning in your context, such as Dev Admin or Prod Admin.

Both Name and Description are required fields.

![](/img/access-rules/01-general.png)

## Provider

Next you will be able to select from one of your configured Access Providers. If you have not yet configured an Access Provider, follow the steps on the [Access Providers page](../providers/00-access-providers.md)

**Click** on the provider and wait while the form updates with options specific to your provider type.

<Tabs>
  <TabItem value="aws-sso" label="Aws SSO" default>
    An AWS SSO provider requires an account or organization unit, and at least one permission set. This allows you to define different access levels and easily apply them across any of your accounts. When a user uses this access rule, a temporary assignment of the user to permission set and account is created in AWS SSO.

Select from the options and then press **Next**.

![](/img/access-rules/02-provider.png)

For detailed setup instructions on how to configure an AWS SSO provider with Organizational Units, Accounts and Permission Sets refer to [Organizational Unit Access](/common-fate/configuration/org-units).

  </TabItem>
  <TabItem value="okta" label="Okta">
    An Okta provider requires you to select a group from Okta. Users will be temporarily assigned as a member of the group when they use this access rule.

    Select from the option and then press **Next**.

  </TabItem>
</Tabs>

## Time

The time section allows you to configure constraints around how long your users may request access for.

### Maximum duration

Set a maximum duration for access per request.

![](/img/access-rules/03-time.png)

This duration controls how long a user will be able to access the target of the access rule. For example, in AWS SSO, a user may be able to request credentials for an account and permission set any time during the their approved window. However their maximum SSO session duration may be less than that, as configured for the permission set.

## Request

The request section configures who can request this access rule. Access is governed by identity provider groups. For example, you have a group for your “web app developers” and you are creating a rule that grants temporary access to “production web app account”.

![](/img/access-rules/04-request.png)

**Select** one or more groups and press **Next**.

## Approvers

The final section allows you to configure whether an approval is required when a user requests this rule.

If you set Approval Required to true, you can either chose to have anyone in a particular group able to approve requests for this rule, or individual users or both.

![](/img/access-rules/05-approvers.png)

Select a configuration which suits this access rule and press **Create**

You will be redirected to the Access Rules table where you can view all of your access rules.

![](/img/access-rules/06-accessrules.png)
