---
sidebar_position: 7
---

# Storing IAM credentials securely

Granted can securely store IAM credentials traditionally stored in plaintext in the AWS credentials file `~/.aws/credentials`
Granted uses the system keychain to securely store credentials and falls back to an encrypted file on systems where this is not available.

```bash
NAME:
   granted credentials - Manage secure IAM credentials

USAGE:
   granted credentials command [command options] [arguments...]

COMMANDS:
   add               Add IAM credentials to secure storage
   import            Import credentials from ~/.credentials file into secure storage
   update            Update existing credentials in secure storage
   list              Lists the profiles in secure storage
   clear             Remove credentials from secure storage, this also removes the associated profile entry from the AWS config file
   export-plaintext  Export credentials from the secure storage to ~/.aws/credentials file in plaintext
   help, h           Shows a list of commands or help for one command

OPTIONS:
   --help, -h  show help (default: false)
```

## `add` command

Add new credentials directly via the command line.

**Example Usage**

```bash
granted credentials add example
```

You should see an output like the following:

```
? Access key id: abcd1234
? Secret access key:  ********
Saved example to secure storage
```

This stores the credentials in secure storage and creates a new entry in your local AWS config file that looks like this.

```
[profile example]
credential_process = dgranted credential-process --profile=example
```

You can now assume the profile by running `assume example`

## `import` command

Importing allows you to import existing credentials from your local AWS credentials file into secure storage.

**Example Usage**

```bash
granted credentials import example
```

This command will write an output similar to the following to `~/.aws/config`:

```
[profile example]
credential_process = dgranted credential-process --profile=example
```

:::info
If you already have a profile in your AWS config file, the credential_process entry will be added to it
:::

You can now assume the profile by running `assume example`

## `update` command

Update credentials stored in secure storage.

**Example Usage**

```bash
granted credentials update example
```

You should see an output like the following:

```
? Access key id: abcd1234
? Secret access key:  ********
Updated example in secure storage
```

## `list` command

This will list profile names of the credentials stored in secure storage.

**Example Usage**

```bash
granted credentials list
```

## `clear` command

This will remove credentials from secure storage and also remove the profile entry in the AWS config file.

:::warning
The `granted credentials clear <profile-name>` command will remove all configuration for the selected profile
:::

**Example Usage**

```bash
granted credentials clear example
```

**Example Usage --all**

```bash
granted credentials clear --all
```

This will clear all credentials from secure storage.

## `export-plaintext` command

This command can be used to return your credentials to the original insecure plaintext format in the AWS credentials file.

:::warning
After exporting, your IAM credentials will be stored in plaintext on disk
:::

**Example Usage**

```bash
granted credentials export-plaintext example
```

This command will write an entry similar to the following in your AWS credentials file.

```
[example]
aws_access_key_id = abcdefg
aws_secret_access_key = secret
```

It will also remove the `credential_process` entry from the profile in the AWS config file.
