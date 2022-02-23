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

## Autocompletion

Granted has support for shell auto complete. We currently support fish, with plans to support [bash, powershell, and zsh](https://github.com/urfave/cli/tree/master/autocomplete) in the future. Please let us know of your interest by [opening an issue on GitHub](https://github.com/common-fate/granted/issues).

Fish autocompletions can be created by running the following command, then following the prompts

```
granted completion -s fish
```

## Changing the web browser

To see which browser Granted will use to open cloud consoles with, run `granted browser`.

To change the web browser, run the command:

```bash
granted browser set
```

You will get a response like this:

```
? Select your default browser  [Use arrows to move, type to filter]
> Chrome
  Brave
  Edge
  Firefox
```

Select which browser you would like to use and press Enter.

## Error reporting and update checking

We currently do not collect error reports in Granted but this is something we are considering in future in order to ensure Granted works reliably on all platforms. Any error reporting telemetry, including instructions on how to opt out, will be communicated through GitHub and this documentation page.

The Granted binary will periodically check to see if new versions are available by calling https://update.api.granted.dev.

To disable update checking you can set the environment variable `GRANTED_DISABLE_UPDATE_CHECK=true`.
