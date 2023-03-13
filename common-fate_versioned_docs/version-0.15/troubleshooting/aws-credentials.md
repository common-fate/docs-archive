---
sidebar_position: 1
---

# AWS Credentials

### AWS credentials are expired

```
> gdeploy init
[✘] AWS credentials are expired.
Please export valid AWS credentials to run this command.
```

If you are receiving the above error it means that your current terminal session has expired AWS credentials.

Install Common Fate's [Granted CLI tool](/granted/introduction) and run `assume` to set your credentials.

Alternatively, authenticate through your preferred tool (e.g. `aws sso login`)

### Failed to load AWS credentials.

```
> gdeploy init
[✘] Failed to load AWS credentials.
Please export valid AWS credentials to run this command.
```

The above error can occur if your AWS config file is misconfigured. Try running `assume` with an active session.
