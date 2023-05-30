# Using Common Fate for requesting access

## Prerequisites

For this recipe, you'll need [Common Fate Configured](/common-fate/introduction).

You can use Granted to request access to roles through Common Fate. Internally, we use AWS [credential_process](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sourcing-external.html) to source credentials through Granted.

You will need to update each role you want to request access to with the following configuration:

```diff
- [profile my-profile]
- sso_account_id = <your-sso-account-id>
- sso_region = <your-sso-region>
- sso_role_name = <your-role-name>
- sso_start_url = <https://example.awsapps.com/start>

+ [profile updated-profile]
+ granted_sso_account_id = <your-sso-account-id>
+ granted_sso_region = <your-sso-region>
+ granted_sso_role_name = <your-role-name>
+ granted_sso_start_url = <https://example.awsapps.com/start>
+ credential_process = granted credential-process --profile updated-profile --url https://granted.example.com
```

Note: If you do not provide `--url` flag in `credential_process` key, you will need to set Common Fate URL by running

```bash
granted settings request-url set <GRANTED_APPROVALS_URL>
```

:tada: Now try running an AWS CLI command with a profile that doesn't have required access.

For example:

```
 > aws s3 ls --profile needs-requesting
```

You should see something like

![A screenshot of the resonse from terminal with role that needs access](/img/recipes/cli-approval/forbidden_exception_output.png)

Additionally you can run:

```
granted exp request aws
```

to request access to roles through Common Fate.
