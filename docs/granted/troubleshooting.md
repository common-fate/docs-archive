---
sidebar_position: 6
---

# Troubleshooting

## Manually configuring your shell profile

If you keep your shell profile in a non-standard location, Granted may fail to install the alias. If this happens, you can manually add the alias to your shell profile. Some examples are included below to assist you:

### Bash

Add the following to `~/.bash_profile`:

```bash
alias assume="source assume"
```

### ZSH

Add the following to `~/.zshenv`:

```bash
alias assume="source assume"
```

### Fish

Add the following to `~/.config/fish/config.fish`:

```bash
alias assume="source /usr/local/bin/assume.fish"
```

:::note

After adding the alias to your shell profile manually, if Granted does not detect that the alias is configured, please run `export GRANTED_ALIAS_CONFIGURED="true"` before running `assume` to bypass the setup process.

:::

## AWS SSO issues

### Regions

Entering the wrong `sso_region` will result in this cryptic looking error:

![A screenshot of an AWS error that just says "invalid grant".](/img/invalid-sso-region.png)

If you don't know which SSO region your AWS organization is in, you'll need to check with whoever set up your AWS SSO service. Alternatively, you can just guess until you get it right. There's only [twenty-one](https://docs.aws.amazon.com/general/latest/gr/sso.html) of them.

## Other issues

If you have any other issues with Granted please [send us a message on Slack](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg) and we'll help you out. Alternatively, you can also shoot us a [Twitter message](https://twitter.com/CommonFateTech).

Please don't hesitate to reach out! We want to make Granted work for everyone and we're keen to help you with any problems you might encounter.
