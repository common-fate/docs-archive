---
slug: concepts
---

# Concepts

Community Providers work in a slightly different way to how built-in providers worked in Common Fate v0.14.0 and below.
In Common Fate v0.14.0 and below, Access Rules had a direct mapping to an Access Provider and all Access Providers ran in the same Lambda function. This meant that you could not deploy high availability architectures and updating configuration came with a risk of downtime.

In v0.15.0 and above Community Providers changes this, now, Access Rules point to a [Target Group](./02-target-groups.md) instead of a Provider.

Think of a Target Group like a load balancer, it can recieve a request, then route the request to an available [Handlers](./03-handlers.md) based on priority and health status.

## Benefits:

### High Availability

Multiple handlers can be deployed to seperate regions and serve the same target group.

### Blue/Green Deployments

You can deploy configuration changes in isolation, test then cutover to the updated deployment. In the event there is an issue you can easily roll back to the previous handler.

### More Providers

Community Providers are easy to develop and our updated framework allows for more complex use-cases to be implemented.

## CF CLI

The CF CLI is built to allow authenticated access to your Common Fate deployment, and is used to manage Target Groups, and Handlers.
