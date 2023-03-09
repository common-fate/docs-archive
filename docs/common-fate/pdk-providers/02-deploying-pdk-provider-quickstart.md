---
slug: deploying-pdk-provider-quickstart
---


# Provider Install (Single Command)

To automate the installation of the PDK, you can use the following command:

```
cf provider install
```

This will do the following:
- Create a target group
- Create a handler 
- Link the handler to the target group (creating a route)
- Generate a Cloud Formation template
- Build the Cloud Formation template
- Run a health check that queries the provider

If you would prefer to do these steps manually, you can follow the steps in the [Next Page](/docs/common-fate/pdk-providers/deploying-pdk-provider) below.

# Provider Uninstall (Single Command)

To uninstall the provider and its associated items you can use the following command:

```
cf provider --handler-id <handler-id> --target-group-id <target-group-id> --delete-cloudformation-stack 
```