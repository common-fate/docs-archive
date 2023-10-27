# Credential Process

Granted has a custom SSO credentials process that automatically assumes roles. This is useful for the following:

- You want to use the native AWS CLI (with `--profile` flag) but don't want to be prompted for re-authentication
- You don't want your SSO credentials stored in plaintext (uses Granted's encrypted credentials store)

## Prerequisites

If a profile contains both `credential_process`and other AWS SSO keys, the AWS CLI skips the credential*process and uses the default `aws sso login` process to fetch the credentials. For this reason, to use Granted to seamlessly authenticate your SSO profiles with the AWS CLI, you will need to update the SSO configuration keys to include the prefix `granted*` as shown below.

```diff
- [profile my-profile]
- sso_account_id = <your-sso-account-id>
- sso_region = <your-sso-region>
- sso_role_name = <your-role-name>
- sso_start_url = <https://example.awsapps.com/start>

+ [profile my-profile]
+ granted_sso_account_id = <your-sso-account-id>
+ granted_sso_region = <your-sso-region>
+ granted_sso_role_name = <your-role-name>
+ granted_sso_start_url = <https://example.awsapps.com/start>
+ credential_process = granted credential-process --profile my-profile
```

Now when running:

```
 > aws sts get-caller-identity --profile my-profile
```

You should see something like

```bash
{
    "UserId": "<UserId>",
    "Account": "<Account>",
    "Arn": "<Arn>",
}
```

## Auto-login with Credential Process

You can enable auto login with `credential_process` by using the `--auto-login` flag:

```
credential_process = granted credential-process --auto-login --profile my-profile
```

(Credits to [Eric Miller](https://github.com/sosheskaz) for implementing the auto login flag)

:::info
Additionally, if you would like to use Glide for turn-key access requests, we support a further integration in the recipe, [Connecting to Glide](/granted/recipes/access-requests).
:::

## Assuming roles with Credential Process

When assuming roles via the credential process, we have improved the process by introducing automatic credential renewal. By default, only the `AWS_PROFILE` environment variable is exported when you run `assume <credential-process-profile>`. If you wish to export all variables, you can do so by using the `--export-all-env-vars` flag when executing the assume command.
