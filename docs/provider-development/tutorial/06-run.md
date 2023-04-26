---
slug: run
---

# Run the Provider locally

:::info
Our Provider Development documentation is still a work-in-progress. If you're building an Access Provider, [join our Community Slack](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg).
:::

You can run the `grant` and `revoke` methods locally to test the Access Provider. To grant access, run:

```
pdk run grant --subject test@example.com --kind Vault --arg vault=example-vault
```

You should see an output similar to the following:

```
❯ pdk run grant --subject test@example.com --kind Vault --arg vault=example-vault
[i] generated a unique Access Request ID: pdk_2OxnC2wVkoqi0LTQXMT7xRHGhPU
[i] granting access  	request:{Subject:test@example.com Target:{Kind:Vault Arguments:map[vault:example-vault]} Request:{ID:pdk_2OxnC2wVkoqi0LTQXMT7xRHGhPU}}
2023-04-26 13:09:33 [info     ] granted access to TestVault vault status_code=200
2023-04-26 13:09:33 [info     ] visit https://prod.testvault.granted.run/vaults/example-team_example-vault/members/test%40example.com to check the membership status
[✔] granted access: {"access_instructions":"","state":null}
[i] revoke access by running:
pdk run revoke --request-id pdk_2OxnC2wVkoqi0LTQXMT7xRHGhPU --subject test@example.com --kind Vault -a vault=example-vault
```

To revoke access, run the `pdk run revoke` command that was printed above.
