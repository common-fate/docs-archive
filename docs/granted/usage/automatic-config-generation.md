---
sidebar_position: 5
---

# AWS config file generation

Granted can automatically populate your local AWS configuration file (`~/.aws/config` by default) with `granted sso generate` and `granted sso populate`.

```bash
NAME:
   granted sso - Manage AWS Config from information available in AWS SSO

USAGE:
   granted sso command [command options] [arguments...]

COMMANDS:
   generate  Outputs an AWS Config with profiles from accounts and roles available in AWS SSO
   populate  Populate your AWS Config with profiles from accounts and roles available in AWS SSO
   help, h   Shows a list of commands or help for one command

OPTIONS:
   --help, -h  show help (default: false)
```

## `generate` command

This will print an AWS configuration with profiles from accounts and roles available in AWS SSO.

**Example Usage**

```bash
granted sso generate --region ap-southeast-2 https://example.awsapps.com/start
```

You should see an output like the following:

```
[profile CFDemoCompany-AWSAdministratorAccess]
sso_region = ap-southeast-2
sso_account_id = 123456789012
sso_role_name = AWSAdministratorAccess
sso_start_url = https://example.awsapps.com/start
# ...
```

## `populate` command

This will populate your AWS config directly.

:::warning
The `granted sso populate` command will overwrite any existing profiles with the same name. Alternatively, you can use the `--prefix` flag to prefix newly generated profiles as shown below.
:::

**Example Usage**

```bash
granted sso populate --prefix test_ --region ap-southeast-2 https://example.awsapps.com/start
```

This command will write an output similar to the following to `~/.aws/config`:

```
[profile test_CFDemoCompany-AWSAdministratorAccess]
sso_region = ap-southeast-2
sso_account_id = 123456789012
sso_role_name = AWSAdministratorAccess
sso_start_url = https://example.awsapps.com/start
# ...
```

## Additional notes

If you have access to multiple AWS SSO instances, you'll need to run this command once for each instance.

## Acknowledgements

A special thank you to [@misterjoshua](https://github.com/misterjoshua) for the implementation of this feature.
