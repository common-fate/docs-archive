# Configuring the shell alias

Granted uses a shell script to export environment variables. You can read more about how this works [here](/granted/internals/shell-alias).

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

If this doesn't work for you please [send us a message on Slack](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg) and we'll help you out.
