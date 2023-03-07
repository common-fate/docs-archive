---
slug: target-groups
---

# Target Groups

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


#### Current limitations with PDK providers
At the current state of development with the Provider Registry. Publishing permissions is only avaliable to the Common Fate team. As the registry enters beta and eventually a general release there will be functionality for the community to create and publish their own providers.