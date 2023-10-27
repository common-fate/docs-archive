---
slug: python-virtual-environments
---

# Python virtual environments

:::info
Our Provider Development documentation is still a work-in-progress. If you're building an Access Provider, [join our Community Slack](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg).
:::

[Virtual environments](https://docs.python.org/3/library/venv.html) are used in Python development to isolate Python project dependencies from one another. The PDK takes an opinionated approach to Python virtual environments.

When you run `pdk init`, The PDK CLI creates a folder called `.venv` in the provider project folder. The `.venv` folder contains a Python virtual environment.

If you need to recreate the `.venv` folder manually, you can run the following command from the provider project folder:

```
python3 -m venv .venv
```

:::info
PDK commands like `pdk package` and `pdk publish` expect that the virtual environment exists in `.venv`.
:::

To activate the virtual environment, you can run:

```
source .venv/bin/activate
```
