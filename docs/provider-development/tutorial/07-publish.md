# Publish the Provider

:::info
Our Provider Development documentation is still a work-in-progress. If you're building an Access Provider, [join our Community Slack](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg).
:::

Log in to the Provider Registry by running

```
pdk login
```

Your browser window should open and you'll be prompted for an email and password. If you don't yet have an account, click the "Sign up" button to create an account.

After you've logged in, run:

```
pdk publish
```

to publish your Access Provider to the registry.

## Updating an Access Provider

To update an Access Provider after publishing, change the `version` field in `provider.toml`:

```diff
name = "testvault"
publisher = "YOUR_NAME"
-version = "v0.1.0"
+version = "v0.1.1"
language = "python3.9"
```

and then run `pdk publish`.
