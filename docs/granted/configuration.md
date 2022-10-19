---
sidebar_position: 4
---

# Configuration

## Granted configuration folder

Granted stores configuration in the `$HOME/.granted` folder on Unix systems, and in `%USERPROFILE%/.granted` on Windows. Configuration which is stored in this folder includes:

- The web browser which Granted uses
- Profiles for Chromium-based browsers
- [Frecency](#frecency) data

## Frecency

Granted uses a [Frecency](https://en.wikipedia.org/wiki/Frecency) algorithm to show the most frequent and recent profiles at the top of the list when running `assume`. The algorithm can be found [here](https://github.com/common-fate/granted/blob/main/pkg/frecency/frecency.go). The algorithm caches frecency data locally in the `aws_profiles_frecency` file in the Granted configuration folder.

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
```

Select which browser you would like to use and press Enter.

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

## Granted Configuation Editing

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

- To remove a token from the local store use `sso-tokens remove`

```
granted sso-tokens remove
```

```
granted sso-tokens remove profile_name
```

- To remove all tokens from the store use the `--all` flag

```
granted sso-tokens remove --all
```
