# Inline Role Assumption

## `--chain` flag

In some edge cases, you may have roles which you have access to, but do not have a pre-configured profile. You can use the `--chain` flag to assume another role inline. This feature can be utilized in conjunction with either the `--exec` option or as part of a regular profile definition.

```
assume <base-profile> --chain arn:aws:iam::12345678912:role/aws-example --exec -- aws sts get-caller-identity
```

or

```
assume <base-profile> --chain arn:aws:iam::12345678912:role/aws-example
```
