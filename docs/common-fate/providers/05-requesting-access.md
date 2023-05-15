---
slug: requesting-access
---

# Requesting access

Navigate back to the end user dashboard by running:

```
gdeploy dashboard open
```
If you were successful in creating an Access Rule in the previous step, a background process would have run and configured all possible access patterns availiable to you. 
These access **Entitlements** will be listed in a table, all searchable via the search bar above.

@TODO: add photo of home page with entitlements

@TODO: add photo of entitlements being filtered with search bar

Click on as many Entitlements as you need. Once you have selected all the resources you want access to, click the next button or hit `⌘ + Enter`

@TODO: add photo of the preflight review screen.
After hitting next, you will be taken to a request review page. Here your Entitlements would have been grouped into their respective Access Rules, meaning a group of Entitlements will share the same duration and approval settings.
Here you can adjust your the duration of each of the Access Groups and add a reason for your request.

@TODO: add photo of updating duration and inputting a reason.

Click the next button or hit `⌘ + Enter` to finalise your request.


## Request Details

The request details page will show all the information about your request. Broken down into the different Access Groups and their respective targets.

In Common Fate, all Access Requests have a duration. Common Fate is especially designed for “just-in-time” access, where your team can request elevated permissions for periods of time when they need them. After an Access Request has expired, **Common Fate removes the permissions automatically**. We can see this happen with the TestVault provider. Wait 30 seconds for the Access Request to expire, and then refresh the TestVault page in your browser. You should see an output similar to the below:

![](/img/common-fate-getting-started/17-testvaultinactive.png)

What happened here? When the access was due to expire, Common Fate made an API call to the TestVault service to remove the user from the vault. Common Fate works the same way with other providers too. For example, if you're using the AWS SSO provider, Common Fate will provision and de-provision permission sets when Access Requests are approved and when they expire.

Navigate back to the end user dashboard, you'll see there that your access has expired.

![](/img/common-fate-getting-started/18-requestexpired.png)

Congratulations - you've now set up Common Fate and used it to request privileged access! Continue on to the next section for what to do next.


