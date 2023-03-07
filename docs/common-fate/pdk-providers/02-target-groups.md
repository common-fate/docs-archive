---
slug: target-groups
---

# Target Groups and Deployments
An important concept introduced in Common Fate providers v2 is Target Groups and Deployments. These are what make up our provider framework and enable the user to have highly configurable, reliant and organised provider infrastructure. 
We used [The AWS Load Balancer](https://aws.amazon.com/elasticloadbalancing/) as inspiration behind our provider framework deployments we have found this beneficial in a number of ways. 

Concerns are separated with Target Groups and Handlers. Whereby Target Groups hold all the configuration of the provider and the Handlers manage all the deployment information.
- Currently providers are hosted as lambda functions.

Here is how each part of a provider deployment works together.
![](/img/targetgroups/diagram.png)

#### What is a Target Group
A Target Group can be thought of as an encapsulation of configuration schema for a provider for a given version. 


**Why is having providers split via Target Groups helpful?**  

Theres a number of reasons why Target Groups can make the process of managing providers easier.

- Different versions for the same provider may include breaking changes to the configuration schema, which requires a new Target Group to be made. This means that for multiple providers the same Target Group can be used. This is the case for a number of AWS services.
- This means that you can use a single Target Group for multiple provider deployments. This can be used for multi region providers and redundancy!

#### How to create a Target Group
Currently the only way to make Target Groups for your Common Fate deployment is via the [cf cli](https://github.com/common-fate/cli).
The Target Group command has the following subcommand that can be used to create, update, list and delete Target Groups

```
COMMANDS:
   COMMANDS:
   create    Create a Target Group
   link      Link a Handler to a Target Group
   unlink    Unlink a deployment from a Target Group
   list, ls  List Target Groups
   delete    Delete a Target Group
   help, h   Shows a list of commands or help for one comman
```

To create a Target Group run the following command:
```
cf targetgroup create --id={name_of_tg} --schema-from={publisher/provider@version}
```
- This requires a provider to exist in our [Provider Registry](https://github.com/common-fate/provider-registry)


#### Linking a Target Group to a Handler
A Handler must be linked with a Target Group to make it usable, as the Target Group holds all of the configuration needed to run the provider. The linking process will fail if an incompatible schema version is used.
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
- The Target Group ID
- The Handler ID
- The kind of Handler
- The priority for the Handler

```
cf targetgroup link --target-group={ID} --Handler={ID} --Kind="Account" --priority=999
```

#### Current limitations with PDK providers
At the current state of development with the Provider Registry. Publishing permissions is only avaliable to the Common Fate team. As the registry enters beta and eventually a general release there will be functionality for the community to create and publish their own providers.