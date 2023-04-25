## Create an Access Provider

We'll walk through creating an example Access Provider called `example`.

Get started by creating a folder for your Access Provider. From the terminal, run

```
mkdir cf-provider-example
cd cf-provider-example
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
├── __init__.py
├── docs
├── provider.py
├── provider.toml
└── requirements.txt
```

The `provider.toml` file contains a manifest for the provider with details like the provider name and publisher:

```toml
name = "example"
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
