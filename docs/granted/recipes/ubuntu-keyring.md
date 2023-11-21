# Encrypting AWS SSO Tokens Using Gnome Keyring

Granted uses an [open-source library](https://github.com/99designs/keyring) to securely store AWS SSO tokens in a backend service. Apart from `pass` or the `Windows Credentials Manager`, Linux Desktop users that leverage Gnome as their desktop environment can use keyring to securely store AWS SSO tokens, and get it unlocked with the default `login` keychain.

## Prerequisites

- Installed Granted CLI tool.
- Access to AWS SSO tokens.
- Gnome keyring installed. Tested on Ubuntu 22 with Gnome 40+

## Configuration

Open the Granted configuration file located at `~/.granted/config`. Add the following configuration to specify the backend for keyring:

```
[Keyring]
  Backend = "secret-service"
  LibSecretCollectionName = "login"
```

Next time you run Granted, it will use the `secret-service` backend to store AWS SSO tokens and it will not ask you to enter your password. It will unlock it with the `login` keychain instead.

As of Granted `v0.22.2` there is no official documentation on how to configure the keyring, however, [these settings](https://github.com/common-fate/granted/blob/bcf79899f282cceff6313f1757d963e4dbbf44e1/pkg/config/config.go#L58-L63) are already exposed and can be used. Refer to the upstream [library documentation](https://pkg.go.dev/github.com/99designs/keyring?utm_source=godoc) for further details.
