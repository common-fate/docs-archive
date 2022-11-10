---
slug: requesting-access
---

# Requesting access

Navigate back to the end user dashboard by running `gdeploy dashboard open`. You should see your new Access Rule available for requests. Click **Demo** to begin an access request.

![](/img/approvals-getting-started/11-home-with-rule.png)

Fill in the following details on the page:

**When do you need access?** “ASAP”

**How long in hours do you need access for?** “0.01”

**Why do you need access?** “Testing Granted”

![](/img/approvals-getting-started/12-newrequest.png)

Click **Submit**.

You'll be taken back to the dashboard homepage, with a new request in the Upcoming section. Click the request in the Upcoming section to view details about it.

![](/img/approvals-getting-started/13-requestactive.png)

The Request details page shows more information about the Access Request, including some instructions on how to access the resource. Click the **vault membership URL** in the access instructions to open the TestVault membership page.

![](/img/approvals-getting-started/14-requestdetails.png)

You should see a screen similar to below, with a message like the following:

```
{"message":"success! user chris@commonfate.io is a member of vault 2BWcbq1fY1SZRDPh5tHDpsYUVvv_demovault"}
```

![](/img/approvals-getting-started/15-testvaultactive.png)

In Granted Approvals, all Access Requests have a **duration**. Granted Approvals is especially designed for “just-in-time” access, where your team can request elevated permissions for periods of time when they need them. After the Access Request has expired, **Granted Approvals removes the permissions automatically**. We can see this happen with the TestVault provider. Wait 30 seconds for the Access Request to expire, and then refresh the TestVault page in your browser. You should see an output similar to the below.

![](/img/approvals-getting-started/16-testvaultinactive.png)

With the following message:

```
{"error":"user is not a member of this vault"}
```

What happened here? When the access was due to expire, Granted Approvals made an API call to the TestVault service to remove the user from the vault. Granted Approvals works the same way with other providers too. For example, if you're using the AWS SSO provider, Granted Approvals will provision and de-provision Permission Sets when Access Requests are approved and when they expire.

If you navigate back to the end user dashboard, you'll see there that your access is expired too.

![](/img/approvals-getting-started/17-requestexpired.png)

Congratulations - you've now set up Granted Approvals and used it to request privileged access! Read on to the next section for what to do next.
