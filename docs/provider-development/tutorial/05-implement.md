---
slug: implement
---

# Implement the Provider

:::info
Our Provider Development documentation is still a work-in-progress. If you're building an Access Provider, [join our Community Slack](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg).
:::

In this tutorial step we'll connect our Access Provider to the TestVault API.

To start, let's import and initialise the TestVault API client in our Provider class:

```diff
+import testvault

class Provider(provider.Provider):
    """
    The Provider class contains initialization logic which your `grant` and `revoke` function relies upon.
    """

    # add configuration variables to your provider by uncommenting the below.
    # These variables will be specified by users when they deploy your Access Provider.

    # api_url = provider.String(description="The API URL")
    # api_key = provider.String(description="The API key", secret=True)

    def setup(self):
        # construct any API clients here

        # you can reference config values as follows:
        # url = self.api_url.get()

-       pass
+       self.client = testvault.Client(team_name="example-team")
```

Our TestVault provider will grant access to Vaults. Remove the `EnvironmentTarget` class and replace it with the class below:

```py
@access.target(kind="Vault")
class VaultTarget:
    vault = target.String(title="Vault")
```

You'll also need to update the signatures for the `grant` and `revoke` methods:

```diff
@access.grant()
-def grant(p: Provider, subject: str, target: EnvironmentTarget) -> access.GrantResult:
+def grant(p: Provider, subject: str, target: VaultTarget) -> access.GrantResult:
    ...

@access.revoke()
-def revoke(p: Provider, subject: str, target: EnvironmentTarget):
+def revoke(p: Provider, subject: str, target: VaultTarget):
    ...
```

Now, implement the grant and revoke methods. The `testvault` SDK provides some methods that we can use to assign and revoke access, called `add_member_to_vault` and `remove_member_from_vault`:

```py
@access.grant()
def grant(p: Provider, subject: str, target: VaultTarget) -> access.GrantResult:
    p.client.add_member_to_vault(vault_id=target.vault, user=subject)


@access.revoke()
def revoke(p: Provider, subject: str, target: VaultTarget):
    p.client.remove_member_from_vault(vault_id=target.vault, user=subject)
```
