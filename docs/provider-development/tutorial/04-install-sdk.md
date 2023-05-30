---
slug: install-sdk
---

# Install the TestVault SDK

:::info
Our Provider Development documentation is still a work-in-progress. If you're building an Access Provider, [join our Community Slack](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg).
:::

Common Fate provides a [Python SDK](https://github.com/common-fate/testvault-python-sdk) for the TestVault service. To install the SDK, run:

```bash
source .venv/bin/activate # activate the Python virtual environment for the Provider

pip install testvault
pip freeze > requirements.txt # IMPORTANT: ensures that requirements.txt is updated
```

If you open `requirements.txt`, you should see that `testvault` is now present:

```diff
black==23.3.0
boto3==1.26.120
botocore==1.29.120
certifi==2022.12.7
charset-normalizer==3.1.0
click==8.1.3
common-fate-schema==0.7.0
idna==3.4
jmespath==1.0.1
mypy-extensions==1.0.0
packaging==23.1
pathspec==0.11.1
platformdirs==3.3.0
provider==0.11.0
pydantic==1.10.7
python-dateutil==2.8.2
requests==2.28.2
s3transfer==0.6.0
six==1.16.0
structlog==23.1.0
+testvault==0.2.0
toml==0.10.2
typing_extensions==4.5.0
urllib3==1.26.15
```
