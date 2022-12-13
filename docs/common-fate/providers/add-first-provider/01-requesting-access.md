---
slug: requesting-access
---

# Requesting access

Navigate back to the end user dashboard by running:

```bash
gdeploy dashboard open
```

You should see your new Access Rule available for requests. Click **Demo** to begin an access request.

![](/img/common-fate-getting-started/12-homewithrule.png)

Fill in the following details on the page:

**When do you need access?** “ASAP”

**How long in hours do you need access for?** “0hrs, 1mins”

**Why do you need access?** “Testing Common Fate"

![](/img/common-fate-getting-started/13-newrequest.png)

Click **Submit**.

You'll be taken back to the dashboard homepage, with a new request in the Upcoming section. Click the request in the Upcoming section to view details about it.

![](/img/common-fate-getting-started/14-requestactive.png)

The Request details page shows more information about the Access Request, including some instructions on how to access the resource. Click the **vault membership URL** in the access instructions to open the TestVault membership page.

![](/img/common-fate-getting-started/15-requestdetails.png)

You should see a screen similar to below:

![](/img/common-fate-getting-started/16-testvaultactive.png)

In Common Fate, all Access Requests have a duration. Common Fate is especially designed for “just-in-time” access, where your team can request elevated permissions for periods of time when they need them. After an Access Request has expired, **Common Fate removes the permissions automatically**. We can see this happen with the TestVault provider. Wait 30 seconds for the Access Request to expire, and then refresh the TestVault page in your browser. You should see an output similar to the below:

![](/img/common-fate-getting-started/17-testvaultinactive.png)

What happened here? When the access was due to expire, Common Fate made an API call to the TestVault service to remove the user from the vault. Common Fate works the same way with other providers too. For example, if you're using the AWS SSO provider, Common Fate will provision and de-provision permission sets when Access Requests are approved and when they expire.

Navigate back to the end user dashboard, you'll see there that your access has expired.

![](/img/common-fate-getting-started/18-requestexpired.png)

Congratulations - you've now set up Common Fate and used it to request privileged access! Continue on to the next section for what to do next.
