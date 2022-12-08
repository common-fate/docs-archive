---
slug: first-provider
---

# Adding Your First Provider

## Access Provider setup

Access Providers are plugins for Common Fate which provide access to roles and resources. Examples of Access Providers are AWS SSO Permission Sets and Okta groups. Access Providers contain specific integration logic to assign users to the resource.

To get started with Common Fate, add the TestVault provider. TestVault is an Access Provider intended to get you started with Common Fate and show you how access workflows work, without requiring you to connect Common Fate with your production infrastructure.

:::info
You will need to have deployed Common Fate and have valid AWS credentials in your terminal environment before you can get started with this guide, checkout [Deploying Common Fate](../../deploying-common-fate/deploying-common-fate)
:::

Add the TestVault provider by running the following command:

```bash
gdeploy provider add --uses commonfate/testvault@v1
```

You will see an output similar to below:

```bash
The TestVault API URL (apiUrl) (https://prod.testvault.granted.run)
```

Press `Enter`

You will see an output similar to below:

```bash
A unique ID used as a prefix for vault IDs (uniqueId) (2HZh1BPHaJMsywtNunV9o7Y9c8f)
```

Press **Enter**

You will see an output similar to below:

```
[✔] wrote config to deployment.yml
[!] Your changes won't be applied until you redeploy. Run 'gdeploy update' to apply the changes to your CloudFormation deployment.
```

Finally, update the deployment:

```
gdeploy update
```

:::info
All configuration changes in Common Fate follow a similar workflow: first, edit the configuration file, then run the command below to apply your changes to the deployment:

```bash
gdeploy update
```

:::

## Adding an Access Rule

Access Rules are a core component of Common Fate. They define what roles and resources particular groups can request access to, and define policies such as requiring a second person to approve the access.

To create your first access rule, open the web dashboard with the following command:

```bash
gdeploy dashboard open
```

Press the **Switch to Admin** button to swap to the admin dashboard, and then press the **New Access Rule** button. You will see a screen similar to below:

![](/img/common-fate-getting-started/05-newrule.png)

Enter “Demo” for the name and “Demo” for the description, and click **Next**. You will see a screen similar to below:

![](/img/common-fate-getting-started/06-provider.png)

Since you set up the TestVault provider in the previous step, it's now available for you to use with your Access Rules. Adding more Access Providers will give you more options to choose from in this step. For now, select **testvault**.

You'll then be prompted to set up specific options for the TestVault provider. Each provider has it's own options available for configuration, this allows you to specify the particular role or resource that you want to grant access to.

Enter “demovault” as the Vault option and click **Next**.

![](/img/common-fate-getting-started/07-providerselected.png)

Specify a Maximum Duration of 1 hour and click **Next**.

![](/img/common-fate-getting-started/08-time.png)

Select **common_fate_administrators** as the request group and click **Next**.

![](/img/common-fate-getting-started/09-whocanrequest.png)

Leave the Approvers section empty and click **Create**.

![](/img/common-fate-getting-started/10-approvalrequired.png)

:::info
Common Fate won't let you approve your own access requests, so if you'd like to test out approval policies you'll need to invite a second user to your Common Fate team!
:::

You'll be taken back to the Access Rule table, where you will see your newly created rule.

![](/img/common-fate-getting-started/11-rulecreated.png)

Now, let's request access!
