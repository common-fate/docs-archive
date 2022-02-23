# Assuming roles

Run the `assume` command to assume a role with Granted.

## First time setup

The first time you run `assume`, you'll be prompted to select a web browser for Granted to use when opening web consoles for your roles. You should see a prompt similar to the one below.

```
➜ assume
Granted works best with Firefox but also supports Chrome, Brave, and Edge (https://granted.dev/browsers).

ℹ️  Granted has detected that your default browser is Brave.
? Use this browser with Granted?
> Yes
  No
```

Follow the steps in the wizard and then rerun `assume`.

:::info
To update the web browser that Granted uses you can run `granted browser`.
:::

The second time you run `assume`, you will be prompted to set up a shell alias. You should see a prompt similar to the one below. The prompt may be slightly different depending on the shell that you are using.

```
➜ assume

ℹ️ To assume roles with Granted, we need to add an alias to your shell profile (https://granted.dev/shell-alias).
? Install zsh alias at /Users/<username>/.zshenv Yes

Added the Granted alias to /Users/<username>/.zshenv

Shell restart required to apply changes: please open a new terminal window and re-run your command.
```

Restart your shell by opening a new terminal window. The first-time setup for Granted is now complete.

## Using the role selector

After completing the first-time setup, run `assume` again. You should see a list of installed roles similar to below:

```
➜ assume

? Please select the profile you would like to assume:  [Use arrows to move, type to filter]
> role-a
  role-b
  role-c
```

:::info
If you don't see any roles listed when running the command above, ensure that you have configured your AWS roles as described in the [requirements section on the Getting Started page](/granted/getting-started#requirements).
:::

You can search for a role by name by typing on your keyboard. Select a role using the arrow keys and press Enter to assume it. If the role uses AWS SSO, you will be prompted to log in through your browser.

You should then see an output similar to below:

```
[role-a] session credentials will expire 2022-02-21 16:36:20 +0000 GMT
```

You can use the [AWS STS Get Caller Identity API](https://docs.aws.amazon.com/cli/latest/reference/sts/get-caller-identity.html) to verify that you have assumed the role. Run the below command from the same terminal window that you called `assume` from. You should see an output similar to below, with the `UserId`, `Account`, and `ARN` fields matching your role's configuration.

```
➜ aws sts get-caller-identity
{
    "UserId": "ABCDEFGHIJKLM:me@company.com",
    "Account": "123456789012",
    "Arn": "arn:aws:sts::123456789012:assumed-role/my-role/session-name"
}
```

:::info
Your role credentials only apply to the terminal window that you ran `assume` in. If you open a new terminal window, you'll need to run `assume` again in order to get session credentials for a role.
:::

## Assuming a role by name

To avoid needing to open the role selector, you can specify the name of the profile as an argument by running `assume <PROFILE_NAME>`:

```
➜ assume role-a

[role-a] session credentials will expire 2022-02-21 16:47:33 +0000 GMT
```

## Keychain prompt

When using Granted on MacOS you will receive a keychain access prompt similar to the one below when Granted uses cached AWS SSO credentials to assume roles.

![A MacOS keychain prompt which states 'assumego would like to use confidential information stored in your keychain'](/img/keychain-prompt.png)

This is expected as Granted stores the AWS SSO credentials in your keychain. The binary name which you see in this prompt should always be `assumego`.

## Next steps

In addition to assuming roles for use in the terminal, Granted allows you to open multiple cloud accounts in your web browser simultaneously. [Next, you'll learn how to use Granted with your web browser](/granted/usage/console).