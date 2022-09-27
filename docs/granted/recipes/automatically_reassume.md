# Automatically reassume roles 

By default Granted will assume a given role for 1hr. This can be altered by passing the `--duration` flag. This means that after a given hour of activity, you will need to re-run `assume` to get a new set of credentials.

If you would like to **automatically reassume** roles, with .zsh you can you can add the following to your `~/.zshrc`:

```bash
export GRANTED_ENABLE_AUTO_REASSUME=true
```


:::info
For supporting other shells (such as fish), please open a feature request on [GitHub](https://github.com/common-fate/granted/issues).
:::

