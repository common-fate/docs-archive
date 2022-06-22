---
sidebar_position: 5
---

# Export to a .env file

Granted supports exporting temporary session credentials to a `.env` file. This can be useful when using development tools that support reading environment variables from a `.env` file.

To export session credentials to a `.env` file, run the following command (replacing `role-a` with the name of the profile you'd like to assume):

```
assume role-a --env
```

This will insert the following into your `.env` file:

```
AWS_ACCESS_KEY_ID=<access key>
AWS_REGION=<region>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_SESSION_TOKEN=<token>
```

Internally at Common Fate we've found this very useful when using Granted with [VS Code](https://code.visualstudio.com/). When running tests in VS Code, we load environment variables from a `.env` file in the repository we are working in. By running `assume --env`, we can run tests without having to add much additional config to our VS Code workspace settings.

:::info
You can also run `assume role-a -e` as a shorter alias for this action.
:::
