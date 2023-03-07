---
slug: concepts
---

# Core Ideas

An important concept introduced in Common Fate providers v2 is Target Groups and Handlers. These are what make up our provider framework and enable the user to have highly configurable, reliant and organised provider infrastructure. 
We used [The AWS Load Balancer](https://aws.amazon.com/elasticloadbalancing/) as inspiration behind our provider framework deployments we have found this beneficial in a number of ways. 

Concerns are separated with Target Groups and Handlers. Whereby Target Groups hold all the configuration of the provider and the Handlers manage all the deployment information.
- Currently providers are hosted as lambda functions.

