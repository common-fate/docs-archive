---
sidebar_position: 4
---

# Export to ~/.aws/credentials

If you need to export your new temporary credentials to your `~/.aws/credentials` file you can use Granted's `--export` flag.

To export session credentials to the `~/.aws/credentials` file, run the following command (replacing `role-a` with the name of the profile you'd like to assume):

```
assume role-a --export
```

Will add the role into your AWS credentials file under the profile name you have assumed in the following format:

```
[<profile_name>]
AWS_ACCESS_KEY_ID=<access key>
AWS_REGION=<region>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_SESSION_TOKEN=<token>
```

:::info
You can also run `assume role-a -ex` as a shorter alias for this action.
:::
