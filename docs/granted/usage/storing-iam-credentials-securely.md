---
sidebar_position: 7
---

# Storing IAM credentials securely

Granted can securely store IAM credentials traditionally stored in plaintext in the AWS credentials file `~/.aws/credentials`.
Granted uses the system keychain to securely store credentials and falls back to an encrypted file on systems where this is not available.

```bash
NAME:
   granted credentials - Manage secure IAM credentials

USAGE:
   granted credentials command [command options] [arguments...]

COMMANDS:
   add               Add IAM credentials to secure storage
   import            Import plaintext IAM user credentials from AWS credentials file into secure storage
   update            Update existing credentials in secure storage
   list              Lists the profile names for credentials in secure storage
   remove            Remove credentials from secure storage and an associated profile if it exists in the AWS config file
   export-plaintext  Export credentials from the secure storage to ~/.aws/credentials file in plaintext
   help, h           Shows a list of commands or help for one command

OPTIONS:
   --help, -h  show help (default: false
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
credential_process = granted credential-process --profile=example
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
credential_process = granted credential-process --profile=example
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

## `remove` command

This will remove credentials from secure storage. If there is a profile configured under the same name, the CLI will check whether it has a credential-process entry.
For example

```
[profile example]
credential_process = granted credential-process --profile=example

```

If this is the case, the profile will also be removed. If it does not have this entry, the profile will not be modified and the credentials will be removed from the secure storage.

:::warning
If you need to keep the credentials, be sure to first run `granted credentials export-plaintext <profile name>` to save them back to the default AWS credentials file
:::

**Example Usage**

```bash
granted credentials clear example
Removing credentials from secure storage will cause them to be permanently deleted.
To avoid losing your credentials you may first want to export them to plaintext using 'granted credentials export-plaintext <profile name>'
This command will remove a profile with the same name from the AWS config file if it has a 'credential_process = granted credential-process --profile=<profile name>'
If you have already used 'granted credentials export-plaintext <profile name>' to export the credentials, the profile will not be removed by this command.

? Are you sure you want to remove these credentials and profile from your AWS config? (Y/n)
```

**Example Usage --all**

```bash
granted credentials clear --all
Removing credentials from secure storage will cause them to be permanently deleted.
To avoid losing your credentials you may first want to export them to plaintext using 'granted credentials export-plaintext <profile name>'
This command will remove a profile with the same name from the AWS config file if it has a 'credential_process = granted credential-process --profile=<profile name>'
If you have already used 'granted credentials export-plaintext <profile name>' to export the credentials, the profile will not be removed by this command.

? Are you sure you want to remove these credentials and profile from your AWS config? (Y/n)
```

This will clear all credentials from secure storage.

## `export-plaintext` command

This command can be used to return your credentials to the original insecure plaintext format in the AWS credentials file.
The credentials will not be removed from secure storage, however the profile configuration in the AWS config file will be updated to use the plaintext credentials rather than the credentials in the secure storage.

:::warning
After exporting, your IAM credentials will be stored in plaintext on disk.
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
