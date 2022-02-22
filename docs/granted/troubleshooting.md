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

## Other issues

If you have any other issues with Granted please [send us a message on Slack](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg) and we'll help you out.
