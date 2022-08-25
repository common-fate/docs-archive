---
sidebar_position: 1
---

# Assuming roles

Run the `assume` command to assume a role with Granted.

## First time setup

The first time you run `assume`, you'll be prompted to select a web browser for Granted to use when opening web consoles for your roles. You should see a prompt similar to the one below.

- Granted searches your PATH and checks common install locations to determine your current default browser. If thats not the browser you want to use ou can still specify another at a later stage in the first time setup.

```
➜ assume
Granted works best with Firefox but also supports Chrome, Brave, and Edge (https://granted.dev/browsers).

ℹ️  Granted has detected that your default browser is Brave.
? Use this browser with Granted?
> Yes
  No
```

If you select Firefox, you'll be prompted to install the [Granted Firefox addon](https://addons.mozilla.org/en-GB/firefox/addon/granted/). Follow the steps in the wizard and then rerun `assume`.

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
If you don't see any roles listed when running the command above, ensure that you have configured your AWS roles as described in the [requirements section on the Deployment page](/granted/deploying-granted#requirements).
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

## Overriding duration

With Granted you can specify the `--duration` or `-d` flag to set the temporary credentials duration. Note that this will have to be within the default maximum duration set on the role when the role was created.

```
➜ assume role-a -d 3h

[role-a] session credentials will expire 2022-02-21 16:47:33 +0000 GMT
```

## Using a third party credential provider

Granted supports using third party CLIs to obtain AWS credentials.

Here is the current list of providers that work with Granted:

- AWS SSO
- IAM
- [aws-azure-login](https://github.com/sportradar/aws-azure-login)
- [aws-google-auth](https://github.com/cevoaustralia/aws-google-auth)
- Specifying a credential-process in your config

We are looking to add more to this list in the future. Contributions for additional credential providers are most welcome. [assumer_aws_azure_login.go](https://github.com/common-fate/granted/blob/eb7221d4e69472bf1c8a7171d930ff0cab37290d/pkg/cfaws/assumer_aws_azure_login.go) in our source code is a good example to use as a starting point.

## Pass-through flags

If you are using a custom SSO credential provider like aws-azure-login or aws-google-auth, Granted allows you to pass through flags to run custom procedures using those providers.

Using the `-pt` or `--pass-through` flag will allow you to pipe commands into that internal command.

For example:

```
assume role-a -pt --no-prompt
```

under the hood will run :

```
aws-azure-login —profile role-a —no-prompt
```

## Keychain prompt

When using Granted on MacOS you will receive a keychain access prompt similar to the one below when Granted uses cached AWS SSO credentials to assume roles.

![A MacOS keychain prompt which states 'assumego would like to use confidential information stored in your keychain'](/img/keychain-prompt.png)

This is expected as Granted stores the AWS SSO credentials in your keychain. The binary name which you see in this prompt should always be `assumego`.

## Next steps

In addition to assuming roles for use in the terminal, Granted allows you to open multiple cloud accounts in your web browser simultaneously. [Next, you'll learn how to use Granted with your web browser](/granted/usage/console).
