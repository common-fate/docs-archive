---
slug: create
---

# Create the Provider

:::info
Our Provider Development documentation is still a work-in-progress. If you're building an Access Provider, [join our Community Slack](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg).
:::

Get started by creating a folder for your Access Provider. From the terminal, run

```
mkdir cf-provider-testvault
cd cf-provider-testvault
```

:::info
By convention, we use `cf-provider-<provider name>` as a folder name for Common Fate providers. For example, if you are building a provider for AWS CloudWatch Log Groups, you could use the name `cf-provider-cloudwatch-log-groups`.
:::

Scaffold the provider by running:

```
pdk init
```

The `pdk` CLI should create a file structure similar to the below:

```
.
├── .venv
├── README.md
├── provider.toml
├── provider_testvault
│   ├── __init__.py
│   └── provider.py
└── requirements.txt
```

The `provider.toml` file contains a manifest for the provider with details like the provider name and publisher:

```toml
name = "testvault"
publisher = "YOUR_NAME"
version = "v0.1.0"
language = "python3.9"
```

The `requirements.txt` file contains a list of Python dependencies for the Provider.

The `provider.py` contains the Python code to implement your Provider.

## Describing the provider

You can verify that the Provider has been scaffolded correctly by running:

```
pdk run describe
```

You should see an output similar to the below.

```
{"config":{},"diagnostics":[],"healthy":true,"provider":{"name":"","publisher":"","version":""},"schema":{"$id":"","$schema":"https://schema.commonfate.io/provider/v1alpha1","config":{},"meta":{"framework":"0.11.0"},"resources":{"loaders":{},"types":{"Resource":{"properties":{"id":{"title":"ID","type":"string"},"name":{"title":"Name","type":"string"}},"required":["id","name"],"title":"Resource","type":"object"}}},"targets":{"Environment":{"properties":{"environment":{"title":"Software Development Environment","type":"string"}},"type":"object"}}}}
```

:::info
The output that you're seeing above is the **schema** of the Provider. The schema helps Common Fate understand what the provider grants access to, and what configuration variables are required.
:::
