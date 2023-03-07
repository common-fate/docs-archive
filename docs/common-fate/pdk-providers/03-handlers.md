---
slug: handlers
---

# Handlers

#### What is a Handler
The second component to creating and using a provider is creating a **Handler**. The Handler is an instance of a lambda deployment which is then linked to a Target Group to complete the deployment process. 
Handlers can be made independant of Target Groups, but must have compatible schema when attempting to link a Handler to a target group.

When creating a Handler, it will have a health reading of heathly or unhealthy. This is the health check for the lambda to see if it is running for a given provider and configuration.
If the lambda failed to deploy you will also get an unhealthy reading. 
:::info
If a if a deployed Handler has an incompatible schema with it's linked Target Group it will fail and return an unhealthy reading, along with diagnostic logs describing what went wrong. 
:::

#### Linking a Target Group to a Handler
A Handler must be linked with a target group to make it usable, as the Target Group holds all of the configuration needed to run the provider. The linking process will fail if an incompatible schema version is used.
To link a Handler to a Target Group 

The cf cli is how we can link the two together. with the `cf targetgroup link` command.

Similarly to AWS Load Balancers. Common Fate Provider Handlers have a priority rating, ranging from 0 - 999. This priority is how the Common Fate will determine which Handler to use when serving an Access Request.
The healthiest, active and highest priority Handler will be used to serve the access request when it comes through the Common Fate platform.

```
OPTIONS:
   --target-group value  
   --Handler value       
   --kind value          
   --priority value      (default: 100)
   --help, -h            show help
```
You will need to specify:
- The target group ID
- The Handler ID
- The kind of Handler
- The priority for the Handler

```
cf targetgroup link --target-group={ID} --Handler={ID} --Kind="Account" --priority=999
```

#### Current limitations with PDK providers
At the current state of development with the Provider Registry. Publishing permissions is only avaliable to the Common Fate team. As the registry enters beta and eventually a general release there will be functionality for the community to create and publish their own providers.