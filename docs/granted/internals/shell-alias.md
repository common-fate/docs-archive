# Shell Alias

In order to minimise the number of commands that Granted users need to run, Granted automatically exports several environment variables after an AWS role is assumed. These include:

- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`
- `AWS_PROFILE`
- `AWS_SESSION_EXPIRATION`

:::note

When opening a web console for your active role by running `assume -c -ar`, Granted reads the `AWS_PROFILE` to determine the active role.

:::

Shells such as Bash generally do not permit executables to export environment variables into the shell which called them. To overcome this limitation, Granted includes an `assume` [shell script](https://github.com/common-fate/granted/blob/main/scripts/assume) which wraps our binary (called `assumego`) and reads the `stdout` output of the binary. After assuming a role, our binary prints the following line to `stdout`:

```
GrantedAssume <AWS_ACCESS_KEY_ID> <AWS_SECRET_ACCESS_KEY> <AWS_SESSION_TOKEN> <AWS_PROFILE>
```

The shell script reads this line and exports the environment variables accordingly.

In order for the `assume` script to export environment variables, it must be [sourced](https://linuxize.com/post/bash-source-command/). We require an alias like the one below to be configured in your shell profile:

```bash
alias assume="source /usr/local/bin/assume"
```

Granted will walk you through installing the shell alias the first time that it is run.

If you keep your shell profile in a non-standard location, Granted may fail to install the alias. If this happens, you can [manually configure your shell alias](/granted/troubleshooting#manually-configuring-your-shell-profile). If you have already installed the shell alias manually, you can run `export GRANTED_ALIAS_CONFIGURED="true"` to bypass the setup process.

We'd like to acknowledge Trek10's [awsume](https://github.com/trek10inc/awsume) project which has inspired the approach we have taken to exporting environment variables.
