---
sidebar_position: 6
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

## Examples

Here are some quick examples of config file generation below. The `generate` command prints the profiles to the stdout stream in your terminal, and the `populate` command writes the profiles to your local AWS configuration file. You can exchange `generate` for `populate` when running the below commands.

### All available AWS SSO roles

```
granted sso generate --sso-region ap-southeast-2 https://example.awsapps.com/start
```

Output:

```
[profile AccountName/RoleName]
granted_sso_region = ap-southeast-2
granted_sso_account_id = 123456789012
granted_sso_role_name = RoleName
granted_sso_start_url = https://example.awsapps.com/start
commonfate_generated_by = aws-sso
credential_process = granted credential-process --profile AccountName/RoleName
# ...
```

### All available Common Fate Access Rules

```
granted sso generate --sso-region ap-southeast-2 --source cf https://example.awsapps.com/start
```

Output:

```
[profile AccountName/RoleName]
granted_sso_region = ap-southeast-2
granted_sso_account_id = 123456789012
granted_sso_role_name = RoleName
granted_sso_start_url = https://example.awsapps.com/start
commonfate_generated_by = commonfate
credential_process = granted credential-process --profile AccountName/RoleName
# ...
```

### Multiple profile sources

```
granted sso generate --sso-region ap-southeast-2 --source cf --source aws-sso https://example.awsapps.com/start
```

Output:

```
[profile AccountName/RoleName]
granted_sso_region = ap-southeast-2
granted_sso_account_id = 123456789012
granted_sso_role_name = RoleName
granted_sso_start_url = https://example.awsapps.com/start
commonfate_generated_by = commonfate
credential_process = granted credential-process --profile AccountName/RoleName
# ...
```

### Custom profile format

```
granted sso generate --sso-region ap-southeast-2 --profile-template="{{ .AccountName }}.{{ .RoleName }}" https://example.awsapps.com/start
```

Output:

```
[profile AccountName.RoleName]
granted_sso_region = ap-southeast-2
granted_sso_account_id = 123456789012
granted_sso_role_name = RoleName
granted_sso_start_url = https://example.awsapps.com/start
commonfate_generated_by = aws-sso
credential_process = granted credential-process --profile AccountName.RoleName
# ...
```

### Prefix for generated profiles

```
granted sso generate --sso-region ap-southeast-2 --prefix gen_ https://example.awsapps.com/start
```

Output:

```
[profile gen_AccountName/RoleName]
granted_sso_region = ap-southeast-2
granted_sso_account_id = 123456789012
granted_sso_role_name = RoleName
granted_sso_start_url = https://example.awsapps.com/start
commonfate_generated_by = aws-sso
credential_process = granted credential-process --profile gen_AccountName/RoleName
# ...
```

### Prune stale generated profiles

When `--prune` is provided, profiles with the `commonfate_generated_by` key will be removed if they no longer exist in the source. This can be useful for removing roles which no longer exist in AWS SSO. The `--prune` flag is only supported on the `populate` command.

```
granted sso populate --sso-region ap-southeast-2 --prune https://example.awsapps.com/start
```

### Opt-out of Granted Credential Process

By default, generated profiles use the [Granted Credential Process](/granted/recipes/credential-process) and will include a `credential_process` entry. If you'd like to opt out of this behaviour, you can provide the `--no-credential-process` flag when generating profiles:

```
granted sso generate --sso-region ap-southeast-2 --no-credential-process https://example.awsapps.com/start
```

Output:

```
[profile AccountName/RoleName]
sso_region = ap-southeast-2
sso_account_id = 123456789012
sso_role_name = RoleName
sso_start_url = https://example.awsapps.com/start
commonfate_generated_by = aws-sso
# ...
```

## Sources

Granted supports the below profile sources, using the `--source` flag. We'd love to hear from you if you have any suggestions for additional profile sources for us to add - you can [raise an issue here](https://github.com/common-fate/granted/issues/new). Multiple sources can be provided by specifying `--source` more than once when running a command.

| Source                            | CLI flag           | Description                                                                                          |
| --------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------- |
| AWS IAM Identity Center (default) | `--source aws-sso` | Creates a profile for each account and permission set available to you in AWS IAM Identity Center    |
| Common Fate                       | `--source cf`      | Creates a profile for each account and permission set available as an Access Rule within Common Fate |

## `generate` command

This will print an AWS configuration with profiles from accounts and roles available in AWS IAM Identity Center.

**Example Usage**

```bash
granted sso generate --sso-region ap-southeast-2 https://example.awsapps.com/start
```

You should see an output like the following:

```
[profile CFDemoCompany/AWSAdministratorAccess]
granted_sso_region         = ap-southeast-2
granted_sso_account_id     = 123456789012
granted_sso_role_name      = AWSAdministratorAccess
granted_sso_start_url      = https://example.awsapps.com/start
common_fate_generated_from = aws-sso
credential_process         = granted credential-process --profile CFDemoCompany/AWSAdministratorAccess
# ...
```

## `populate` command

This will populate your AWS config file directly.

:::warning
The `granted sso populate` command will overwrite any existing profiles with the same name. Alternatively, you can use the `--prefix` flag to prefix newly generated profiles as shown below.
:::

**Example Usage**

```bash
granted sso populate --prefix test_ --sso-region ap-southeast-2 https://example.awsapps.com/start
```

This command will write an output similar to the following to `~/.aws/config`:

```
[profile test_CFDemoCompany/AWSAdministratorAccess]
sso_region = ap-southeast-2
sso_account_id = 123456789012
sso_role_name = AWSAdministratorAccess
sso_start_url = https://example.awsapps.com/start
# ...
```

The profile name can be customized using the `--profile-template` flag. The template uses the [gotemplate format](https://pkg.go.dev/text/template). The available fields are those of this struct:

```go
type SSOProfile struct {
	// SSO details
	StartUrl  string
	SSORegion string
	// Account and role details
	AccountId   string
	AccountName string
	RoleName    string
}
```

The default template used to generate profile names is:

```
{{ .AccountName }}/{{ .RoleName }}
```

Here is a Granted `populate` command example that generates profiles using a period as the separator between the AWS account name and the role name:

```bash
granted sso populate --profile-template="{{ .AccountName }}.{{ .RoleName }}" --sso-region ap-southeast-2 https://example.awsapps.com/start
```

## Additional notes

If you have access to multiple AWS SSO instances, you'll need to run this command once for each instance.

## Acknowledgements

A special thank you to [@misterjoshua](https://github.com/misterjoshua) for the implementation of this feature.
