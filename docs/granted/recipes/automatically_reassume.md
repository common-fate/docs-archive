# Automatically reassume roles (ZSH)

By default Granted will assume a given role for 1hr. This can be altered by passing the `--duration` flag, or by specifying a [`duration_seconds`](https://docs.aws.amazon.com/cli/latest/topic/config-vars.html) prop in your config file. This means that after a given hour of activity, you will need to re-run `assume` to get a new set of credentials.

If you would like to **automatically reassume** roles, with ZSH you can you can add the following to your `~/.zshrc`:

```bash
export GRANTED_ENABLE_AUTO_REASSUME=true
```

:::info
If you're using `credential_process`, you shouldn't need to export `GRANTED_ENABLE_AUTO_REASSUME` because AWS will automatically call the granted credential process as needed to refresh your session credentials. As we have updated our code from [v0.19.0](https://github.com/common-fate/granted/releases/tag/v0.19.0) to export only the `AWS_PROFILE` environment variable when using credential process.
:::
