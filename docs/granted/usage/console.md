# Opening the console

Granted allows you to access multiple cloud accounts in your web browser simultaneously. In the screenshot below, two different accounts are open in the two tabs.

![A screenshot of the AWS Console on Firefox with two tabs: the first tab is blue and is the 'role-a' profile, and the second tab is orange and is the 'role-b' profile](/img/tab-containers.png)

If you have credentials already assumed locally you can run `assume role-a -c ` to open up a console window using that role.
## For a specific profile

To open the web console for a role, add the `--console` or `-c` flag to your `assume` call, for example:

```
assume -c role-a
```

This will open a session in the AWS console for the specified profile. On Firefox, the session will open in a [Container Tab](https://support.mozilla.org/en-US/kb/containers). On Chrome, Brave, and Edge, the session will open in a new profile.

:::info
If the console does not open on Firefox, ensure that you have installed the [Granted addon](https://addons.mozilla.org/en-GB/firefox/addon/granted/).
:::

To open a second role, call `assume -c` again with a different profile. For example:

```
assume -c role-b
```

Granted will open this role in your same browser and you will be able to access both roles simultaneously.

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

## Opening the console to a specific service

You can open a console and go directly to a specific service by adding the `--service` or `-s` flag. For example:

```
assume -c -s iam
```

Will open a console and take you directly to the IAM service (https://console.aws.amazon.com/iamv2). Granted supports using shortcuts such as `l` for the Lambda service. You can see the full list of shortcuts [here](https://github.com/common-fate/granted/blob/main/pkg/browsers/console.go). PRs which add additional shortcuts or services are very welcome.

## Opening the console with an active role

If you have already assumed a role using `assume`, you can open the console using this assumed role by adding the `--active-role` or `-ar` flags. For example:

```bash
# Assume the 'role-a' profile in this terminal window
assume role-a

# 'role-a' is now the active profile. Open a web console for it:
assume -ar
```

## Firefox: cleaning up containers

The Granted Firefox extension includes a menu where you can view and clear your tab containers. The menu should appear next to the settings icon as shown below.

![A screenshot of Firefox showing the Granted menu icon](/img/granted-firefox-menu-icon.png)

Clicking on the icon shows a menu where you can clear your Granted tab containers, as shown below. This is useful if you have roles which you are no longer accessing and you'd like to declutter your tab container list.

![A screenshot of Firefox showing the Granted menu, with a button at the bottom to clear all containers](/img/granted-firefox-menu.png)
