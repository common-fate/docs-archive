# Using Granted Approvals for requesting access 

#### Prerequisite 
For this recipe, you'll need [Granted Approvals Configured](/approvals/introduction). 

You can use Granted to request access to roles through Granted Approvals. Internally, we use AWS [credential_process](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sourcing-external.html) to source credentials through Granted CLI.

First, update your aws config file to look like: 

```
[profile my-profile]
granted_sso_account_id = <your-sso-account-id>
granted_sso_region = <your-sso-region>
granted_sso_role_name = <your-role-name>
granted_sso_start_url = <https://example.awsapps.com/start>
credential_process = granted credential-process --profile my-profile --url localhost:8848
```

Note: If you do not provide `--url` flag in `credential_process` key, you will need to set granted approvals URL by running 

```bash
granted settings request-url set <GRANTED_APPROVALS_URL>
```

:tada: Now try running aws cli command with profile that doesn't have required access. 

For example:

```
 > aws s3 ls --profile needs-requesting
```

You should see something like

![A screenshot of the resonse from terminal with role that needs access](/img/recipes/cli-approval/forbidden_exception_output.png)
