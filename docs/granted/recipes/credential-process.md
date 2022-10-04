# Credential Process

Granted has a custom SSO credentials process that automatically assumes roles. This is useful for the following:

- You want to use the native AWS CLI (with `--profile` flag) but don't want to be prompted for re-authentication
- You don't want your SSO credentials stored in plaintext (uses Granted's encrypted credentials store)

## Prerequisites

If a profile contains both `credential_process`and other AWS SSO keys, the AWS CLI skips the credential_process and uses the default `aws sso login` process to fetch the credentials. For this reason, to use Granted to seamlessly authenticate your SSO profiles with the AWS CLI, you will need to update the SSO configuration keys to include the prefix `granted_` as shown below.

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

:::info
Additionally, if you would like to use Granted Approvals for turn-key access requests, we support a further integration in the recipe, [Connecting to Granted Approvals](/granted/recipes/access-requests).
:::
