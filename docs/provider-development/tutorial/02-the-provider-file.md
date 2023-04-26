---
slug: the-provider-file
---

# The provider.py file

:::info
Our Provider Development documentation is still a work-in-progress. If you're building an Access Provider, [join our Community Slack](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg).
:::

Now, let's take a look at the `provider.py` file.

:::info
We're updating our starter templates, so there is a chance that your `provider.py` file may look slightly different to the one shown in this tutorial. If you have difficulty getting started don't hesitate to [ask for help on our Slack](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg).
:::

At the top of the file, you'll see some libraries which are imported:

```py
import provider
from provider import target, access
import structlog

log = structlog.get_logger()
```

`provider` is the Common Fate provider framework library. [`structlog`](https://www.structlog.org/) is a logging library. You don't have to use `structlog`, but we recommend it and it comes pre-installed when you run `pdk init`.

Next up, we have the Provider class:

```py
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

        pass
```

This class contains all of the configuration variables and initialization logic.

Up next, we have a Target:

```py
@access.target(kind="Environment")
class EnvironmentTarget:
    """
    Targets are the things that Access Providers grants access to.

    In this example, environment is a software development environment that the user can request access to.
    """

    environment = target.String(
        title="Software Development Environment",
    )
```

The `@access.target` decorator defines a class as a Target, which is something that Common Fate can grant access to.

Finally, we have the Grant and Revoke methods. These methods automate permissions to the target:

```py
@access.grant()
def grant(p: Provider, subject: str, target: EnvironmentTarget) -> access.GrantResult:
    # you can remove these log messages - they're just there to show an example of how to write logs.
    log.info(f"granting access", subject=subject, target=target)

    # Add your grant logic here
    # You can reference Provider config values as follows:
    # p.api_url.get()


@access.revoke()
def revoke(p: Provider, subject: str, target: EnvironmentTarget):
    # you can remove these log messages - they're just there to show an example of how to write logs.
    log.info(f"revoking access", subject=subject, target=target)

    # Add your revoke logic here
    # You can reference Provider config values as follows:
    # p.api_url.get()
```

In this tutorial, we will implement the `@access.grant` and `@access.revoke` methods to automate access to the TestVault service.
