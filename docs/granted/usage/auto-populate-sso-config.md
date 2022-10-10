---
sidebar_position: 5
---


# Auto-populate SO config
Using granted you can auto-populate your SSO config with `granted sso generate|populate`.

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
This will output an AWS Config with profiles from
accounts and roles available in AWS SSO`.

**Example Usage**

```bash
# Command
granted sso generate --region ap-southeast-2 https://<SSO_ID>.awsapps.com/start

# Output
[profile CFDemoCompany-AWSAdministratorAccess] 
sso_region = ap-southeast-2 
sso_account_id = 012345678901 
sso_role_name = AWSAdministratorAccess 
sso_start_url = https://<SSO_ID>.awsapps.com/start 
# ...
```

## `populate` command
This will populate your AWS Config directly. Note this will overwrite any existing profiles with the same name. Alternatively you can use the `--prefix` flag to prefix newly generated profiles (as shown below) 

**Example Usage**

```bash
# Command
granted sso generate --prefix test_ --region ap-southeast-2 https://<SSO_ID>.awsapps.com/start

# Output saved to ~/.aws/config
[profile test_CFDemoCompany-AWSAdministratorAccess] 
sso_region = ap-southeast-2 
sso_account_id = 012345678901 
sso_role_name = AWSAdministratorAccess 
sso_start_url = https://<SSO_ID>.awsapps.com/start 
# ...
```

## Additional notes
This command will have to be run for each SSO instance you have access to

## Special Mentions
Special thank you to [@misterjoshua](https://github.com/misterjoshua) for the implementation of this feature

