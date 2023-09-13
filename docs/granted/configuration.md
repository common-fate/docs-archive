---
sidebar_position: 4
---

# Configuration

## Granted Configuration Folder

The configuration settings for Granted are stored within the `$HOME/.granted` folder on Unix systems, and `%USERPROFILE%/.granted` on Windows. This designated folder serves as a repository for configuration data, encompassing:

- **Default Browser Configuration**: The `DefaultBrowser` option allows you to [establish the default browser](#changing-the-web-browser).

- **Custom Browser Paths**: The `CustomBrowserPath` option lets you override default installation paths for browsers with custom locations.

- **Custom Single Sign-On (SSO) Browser Paths**: The `CustomSSOBrowserPath` option provides the ability to [set custom browser](#custom-browser-for-running-sso-flows) for running Single Sign-On (SSO) flows.

- **Profile Ordering**: The `Ordering` option allows you to change the [order of profiles](#changing-the-profile-ordering) when they are displayed.

- **Export Credential Suffix**: The `ExportCredentialSuffix` option enables appending a suffix when exporting credentials.

- **Access Request URL**: The `AccessRequestURL` option lets you set a Common Fate URL that can be used to request access.

- **CommonFate SSO Default Start URL and Region**: The `CommonFateDefaultSSOStartURL` and `CommonFateDefaultSSORegion` options respectively set the default start URL and region for CommonFate Single Sign-On.

- **Usage Tips and Credential Caching**: The `DisableUsageTips` option, when set to true, suppresses usage tips. The `DisableCredentialProcessCache` option, when set to true, prevents credential caching via credential processes.

To configure any of these options, you can use the following command:

```
granted settings set
```

## Changing the profile ordering

There are settings options in Granted which allow you to change the way that profiles are listed in use. Default being by Frecency. Alternatively it can be configured to list profiles alphabetically. To set the profile ordering type just run:

```
granted settings profile-order set
```

From here you will be able to select your preferred method of choice

```
? Select filter type  [Use arrows to move, type to filter]
> Frecency
  Alphabetical
```

### Frecency

Granted uses a [Frecency](https://en.wikipedia.org/wiki/Frecency) algorithm to show the most frequent and recent profiles at the top of the list when running `assume`. The algorithm can be found [here](https://github.com/common-fate/granted/blob/main/pkg/frecency/frecency.go). The algorithm caches frecency data locally in the `aws_profiles_frecency` file in the Granted configuration folder.

## Autocompletion

Granted has support for shell auto complete. We currently support zsh and fish, with plans to support [bash, and powershell](https://github.com/urfave/cli/tree/master/autocomplete) in the future. Please let us know of your interest by [opening an issue on GitHub](https://github.com/common-fate/granted/issues).

### Fish

Fish autocompletions can be created by running the following command, then following the prompts.

Note, This currently only provides command and flag autocompletion, it does not automatically list aws profiles with the assume command.
Let us know if you are using Fish and would like to see this added.

```
granted completion -s fish
```

### ZSH

ZSH autocompletion can be enabled by running the following command.

```
granted completion -s zsh
```

Type `assume` and press **tab** to see a list of your aws profiles.

```
assume
profile-1 profile-2 profile-3
```

Type `assume -` and press **tab** to see flag completions.

```
assume -
--active-role                      --duration                         --export                           --pt                               --unset                            --version                          -h                                 -v
--ar                               --env                              --granted-active-aws-role-profile  --region                           --update-checker-api-url           -c                                 -r
--auto-configure-shell             --ex                               --help                             --service                          --url                              -d                                 -s
--console                          --exec                             --pass-through                     --un                               --verbose                          -e                                 -u
```

## Changing the web browser

To see which browser Granted will use to open cloud consoles with, run `granted browser`.

To change the web browser, run the command:

```
granted browser set
```

You will get a response like this:

```
? Select your default browser  [Use arrows to move, type to filter]
> Chrome
  Brave
  Edge
  Firefox
  Chromium
  Safari
  Firefox Developer Edition
  Arc
```

Select which browser you would like to use and press Enter.

## Using specific browser profiles

Launching a specific browser profile is possible with `--browser-profile` flag for supported browsers such as Chrome, Edge, and Chromium Variants. Example useage: `assume profile-name -c --browser-profile "<your_browser_profile>"`

## Setting color and icon preferences for profiles

If you use Firefox with the [Granted Firefox Addon](https://addons.mozilla.org/en-GB/firefox/addon/granted/), you can set the color and icon preference for each profile. This is useful for distinguishing between profiles at a glance.

To customize the color and icon add `granted_color` and `granted_icon` to the profile in your `~/.aws/config` file.

This configuration:

```
granted_color = green
granted_icon = dollar
```

Will result in this:

![A screenshot of the Firefox address bar, showing a custom color and icon for a profile](/img/granted-firefox-custom-color-icon.png)

Valid colors are: `blue`, `turquoise`, `green`, `yellow`, `orange`, `red`, `pink` and `purple`

Valid icons are: `fingerprint`, `briefcase`, `dollar`, `cart`, `circle`, `gift`, `vacation`, `food`, `fruit`, `pet`, `tree` and `chill`

## Custom browser for running SSO flows

You can specify a custom browser path for your SSO login flows with Granted.

```
granted browser set-sso
```

You will get a response like this:

```
ℹ️  Select your SSO default browser

? Select your default browser Chrome

✅  Granted will default to using /Applications/Google Chrome.app/Contents/MacOS/Google Chrome for SSO flows.
```

## Error reporting and update checking

We currently do not collect error reports in Granted but this is something we are considering in future in order to ensure Granted works reliably on all platforms. Any error reporting telemetry, including instructions on how to opt out, will be communicated through GitHub and this documentation page.

The Granted binary will periodically check to see if new versions are available by calling https://update.api.granted.dev.

To disable update checking you can set the environment variable `GRANTED_DISABLE_UPDATE_CHECK=true`.

## Granted Configuration Editing

Granted gives you tools to be able to interact with the config that is set under the hood.

- Use the `-unset` flag to remove any exported environment variables that Granted has provisioned
  eg.

```
assume -unset
```

- Use the `uninstall` command to reset the granted configuration to a factory default

```
granted uninstall
```

## SSO Configuration

- To list all SSO tokens saved in the Granted keychain use the `sso-tokens` command

```
granted sso-tokens
```

```
granted sso-tokens list
```

- To remove a token from the local store use `sso-tokens clear`

```
granted sso-tokens clear
```

```
granted sso-tokens clear profile_name
```

- To remove all tokens from the store use the `--all` flag

```
granted sso-tokens clear --all
```

## Enable Quiet Mode

To enable quiet mode in Granted, set the `GRANTED_QUIET` environment variable to `true` by running:

```
 export GRANTED_QUIET=true
```

This suppresses most of the command output, providing a quieter experience.
