# Using `pass` on Linux

Granted works well with [pass](https://www.passwordstore.org/) on Linux. You can follow the below steps to configure Granted so that you aren't prompted for a GPG password each time commands are run.

First, ensure that your Granted config file is set up as follows:

```
cat ~/.granted/config
DefaultBrowser = "STDOUT"
CustomBrowserPath = ""
CustomSSOBrowserPath = ""
LastCheckForUpdates = 3
Ordering = ""
ExportCredentialSuffix = ""
[Keyring]
  Backend = "pass"
```

Then, run the following commands:

```bash
sudo apt install pass
gpg --gen-key
pass init E7BF4FFE628F18FCFC3A6C8DC5E556A9DB95E5E5 # your public key ID from previous step
export GPG_TTY=$(tty)
```
