# Cache Commands

Granted provides commands for managing and retrieving cached credentials stored securely. You can interact with cached IAM credentials, SSO tokens, and session credentials using the following commands:

## Usage

```
NAME:
   granted cache - Manage your cached credentials that are stored in secure storage

USAGE:
   granted cache command [command options] [arguments...]

COMMANDS:
   clear    Clear cached credential from the secure storage
   list     List currently cached credentials and secure storage type
   help, h  Shows a list of commands or help for one command

OPTIONS:
   --help, -h  show help

```

## Clear Cached Credentials

To remove cached credentials from IAM credentials, SSO tokens, or session credentials, use:

```shell
granted cache clear
```

## List Cached Credentials

To list currently cached credentials along with their secure storage type, use:

```shell
granted cache list
```
