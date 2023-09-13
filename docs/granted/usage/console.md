---
sidebar_position: 2
---

# Opening the console

Granted allows you to access multiple cloud accounts in your web browser simultaneously. In the screenshot below, two different accounts are open in the two tabs.

![A screenshot of the AWS Console on Firefox with two tabs: the first tab is blue and is the 'role-a' profile, and the second tab is orange and is the 'role-b' profile](/img/tab-containers.png)

If you have credentials already assumed locally you can run `assume -c role-a` to open up a console window using that role.

## For a specific profile

To open the web console for a role, add the `--console` or `-c` flag to your `assume` call, for example:

```
assume -c role-a
```

This will open a session in the AWS console for the specified profile. On Firefox, the session will open in a [Container Tab](https://support.mozilla.org/en-US/kb/containers). On Chrome, Brave, Edge, Safari and Arc the session will open in a new profile.

:::info
If the console does not open on Firefox, ensure that you have installed the [Granted addon](https://addons.mozilla.org/en-GB/firefox/addon/granted/).
:::

To open a second role, call `assume -c` again with a different profile. For example:

```
assume -c role-b
```

Granted will open this role in your same browser and you will be able to access both roles simultaneously.

:::info
If Granted is unable to open the console in your browser it will fallback to returning a URL for you to paste into your browser
:::

## Using the profile selector

You can also use the profile selector with the `-c` flag to find a role, by running `assume -c` without a profile name. When run without a role name, Granted will prompt you to select a profile and will then open the browser.

```
➜ assume -c

? Please select the profile you would like to assume:  [Use arrows to move, type to filter]
> role-a
  role-b
  role-c
```

## Opening the console with a specific region

You can open a console for a profile in a specific region by adding the `--region` or `-r` flag. For example:

```
assume -c -r ap-southeast-1
```

or

```
assume -c -r ap-southeast-1 role-a
```

Will open a console in the _ap-southeast-1_ region for the selected profile.

### Shorthand region syntax

Using the -r(egion) flag, granted has support for a shorthand syntax which makes it faster to open console or terminal sessions to the region you want.

For example

```
ue1 -> us-east-1
ase2 -> ap-southeast-2

# this will launch the console to us-west-1
assume -c -r uw1 demo
```

## Opening the console to a specific service

You can open a console and go directly to a specific service by adding the `--service` or `-s` flag. For example:

```
assume -s iam
```

Will open a console and take you directly to the IAM service (https://console.aws.amazon.com/iamv2). Granted supports using shortcuts such as `l` for the Lambda service. You can see the full list of shortcuts [here](https://github.com/common-fate/granted/blob/main/pkg/console/service_map.go). PRs which add additional shortcuts or services are very welcome.

## Opening the console with a specific destination

You can open a console for a profile at a specific destination by adding the `--console-destination` or `-cd` flag. For example:

```
assume -cd "https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#dashboards:name=ServiceDashboard" role-a
```

Will open the _us-west-2_ console for the CloudWatch Dashboard called _ServiceDashboard_. This provides the ability to bookmark or create shell aliases for specific console destinations you use frequently.

## Opening the console with an active role

If you have already assumed a role using `assume`, you can open the console using this assumed role by adding the `--active-role` or `-ar` flags. For example:

```bash
# Assume the 'role-a' profile in this terminal window
assume role-a

# 'role-a' is now the active profile. Open a web console for it:
assume -ar
```

## Assuming a role and returning the console URL

If you don't want the browser to automatically open the browser or are using Granted from a headless node Granted has the option to only return the console URL with all the session credentials included.
This can be achieved by running:

```
assume -u
```

or

```
assume role-a -u
```

## Launching the console with existing credentials

In some cases, you may want to launch a console using existing credentials. An example is to programatically invoke `granted` from another application where that application manages the credentials.

The `granted console` command will read the credentials from the environment as below:

```bash

AWS_ACCESS_KEY_ID=example AWS_SECRET_ACCESS_KEY=example AWS_SESSION_TOKEN=example granted console --service cfn --region us-east-1

```

To return the URL to stdout instead of launching a browser, use the `--url` flag. Here's an example:

```bash

AWS_ACCESS_KEY_ID=example AWS_SECRET_ACCESS_KEY=example AWS_SESSION_TOKEN=example granted console --url

```

To generate the firefox container URL, use the `--firefox` flag. Here's an example:

```bash

AWS_ACCESS_KEY_ID=example AWS_SECRET_ACCESS_KEY=example AWS_SESSION_TOKEN=example granted console --url --firefox

```

Use `granted console --help` for more information.

## Firefox: cleaning up containers

The Granted Firefox extension includes a menu where you can view and clear your tab containers. The menu should appear next to the settings icon as shown below.

![A screenshot of Firefox showing the Granted menu icon](/img/granted-firefox-menu-icon.png)

Clicking on the icon shows a menu where you can clear your Granted tab containers, as shown below. This is useful if you have roles which you are no longer accessing and you'd like to declutter your tab container list.

![A screenshot of Firefox showing the Granted menu, with a button at the bottom to clear all containers](/img/granted-firefox-menu.png)

## Next steps

In addition to assuming roles for use in the terminal, Granted supports some headless workflows.
[Next, you'll learn how to use Granted in headless environments](/granted/usage/headless).
