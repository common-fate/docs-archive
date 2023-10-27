---
slug: end-users
---

# End User Guide

## Introduction

Glide is a privileged access framework that aims to simplify how you request access to your cloud environments and SaaS services. Glide will allow you to request access to services with just a few clicks, and then send the request off to your Ops team to quickly approve. In some cases, Glide will allow your access requests to be automatically approved without requiring oversight from anyone else in your organisation.

We've aimed to create a tool that simplifies access and gives you more independence without sacrificing security. Read on to learn about how it works!

## Accessing the dashboard

In order to access your organisation's Glide dashboard, you'll need the deployment URL, your login username and your login password. If you're missing any of these, contact the person in your organisation who set up your Glide deployment for help.

Once you've logged in, you'll see a dashboard similar to this:

![](/img/end-user/00-cfdashboard.png)

If you're part of any user groups that have access rules assigned to them, then these access rules will show up under "New Request" (and will hopefully be named something more descriptive than just _Developer_).

## Requesting access

At Glide, we use Glide to manage our own workflow. The _Developer_ access rule that we've configured in our own Glide deployment gives us write access to one of our AWS sandbox environments. If I try using our [CLI tool](https://github.com/common-fate/granted) to assume the AWS sandbox role without having approved access, it won't work:

![](/img/end-user/01-assumefailed.png)

So let's fix that! I'm going to click the _Development_ access rule.

![](/img/end-user/02-dashboardselectrule.png)

Now I should see the _Access Request_ page for _Development_:

![](/img/end-user/03-accessrequest.png)

There are a few different options here:

- _ASAP_ or _Scheduled_ - if you need access now, just leave it on _ASAP_. If you're planning for access at a later time, that's what _Scheduled_ is for.
- _Access duration_ - enter how long you'll need access for. At the end of this duration, your access will automatically expire. There's a Minimum and Maximum value for this defined by your Glide administrator.
- _Reason for access_ - filling this out will help your org's Risk team sleep at night. If you don't think Risk people deserve peace, you can just type in "access" like we do.

You'll also get a note at the bottom of the access request page about whether the request will be approved automatically or by someone else in your organisation. The _Development_ access rule we've set up is automatic, so my request will be approved once I submit the page.

Once the request is approved, it'll be active under the "Upcoming" panel:

![](/img/end-user/04-accessgranted.png)

Let's check if it works! I'll try to assume the AWS sandbox role again:

![](/img/end-user/05-assumesuccessful.png)

And now it worked! I've got write access to the sandbox for the next 12 hours.

With this type of workflow, I can decide for myself when I need access to what - without our team setting the dangerous precedent of everyone just having access to everything all the time.
