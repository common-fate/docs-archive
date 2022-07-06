---
slug: acess-provider
---

# Adding an Access Provider

## Access Provider setup

Access Providers are plugins for Granted which provide access to roles and resources. Examples of Access Providers are AWS SSO Permission Sets and Okta groups. Access Providers contain specific integration logic to assign users to the resource.

To get started with Granted Approvals, we'll add the TestVault provider. TestVault is an Access Provider intended to get you started with Granted and show you how access workflows work, without requiring you to connect Granted with your production infrastructure.

Add a provider by running the following command:

```bash
gdeploy provider add
```

You should see an output similar to below.

```bash
? What are you trying to grant access to?  [Use arrows to move, type to filter]
  AWS SSO PermissionSets (commonfate/aws-sso@v1)
> TestVault - a provider for testing out Granted Approvals (commonfate/testvault@v1)
  Okta groups (commonfate/okta@v1)
```

Select the `TestVault` provider and press Enter. Enter `testvault` as the ID for the provider.

You should see an output similar to below:

```
[✔] wrote config to granted-deployment.yml.
[!] Your changes won't be applied until you redeploy. Run 'gdeploy deploy' to apply the changes to your deployment.
```

Finally, run `gdeploy update` to update the deployment:

```
gdeploy update
```

:::info
All configuration changes in Granted Approvals follow a similar workflow: first, edit the configuration file, then run `gdeploy update` to apply your changes to the deployment.
:::

## Adding an Access Rule

Access Rules are a core component of Granted Approvals. They define what roles and resources particular groups can request access to, and define policies such as requiring a second person to approve the access.

Let's create our first access rule now. Open the web dashboard with `gdeploy dashboard open`. Press the **Admin** button to swap to the admin dashboard, and then press the **New Access Rule** button. You should see a screen similar to the below.

![](/img/approvals-getting-started/04-newrule.png)

Enter “Demo” for the name and “Demo” for the description, and click **Next**. You should see a screen similar to the below.

![](/img/approvals-getting-started/05-provider.png)

Because we set up the TestVault provider in the previous step, it's now available for us to use with our Access Rules. Adding more Access Providers will give us more options to choose from in this step. Select **testvault.**

You'll now be prompted to set up specific options for the TestVault provider. Each provider has it's own options available for configuration, which allows you to specify the particular role or resource that you want to grant access to.

Enter “demovault” as the Vault option and click **Next**.

![](/img/approvals-getting-started/06-providerselected.png)

Specify a Maximum Duration of 1 hour and click **Next**.

![](/img/approvals-getting-started/07-time.png)

Select **granted_administrators** as the request group and click **Next**.

![](/img/approvals-getting-started/08-whocanrequest.png)

Leave the Approvers section empty and click **Create**.

![](/img/approvals-getting-started/09-approvalrequired.png)

:::info
Granted won't let you approve your own access requests, so if you'd like to test out approval policies you'll need to invite a second user to your Granted team!
:::

You'll be taken back to the Access Rule table, where you should see your newly created rule.

![](/img/approvals-getting-started/10-rulecreated.png)

Now, let's request access!
