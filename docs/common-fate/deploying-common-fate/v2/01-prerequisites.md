---
slug: prerequisites
---


# Prerequisites

This guide will walk you through through deploying Common Fate. It will take around 15 minutes to complete.


## Concepts

### Target Groups and Deployments
An important concept introduced in Common Fate providers v2 is Target Groups and Deployments. These are what make up our provider framework and enable the user to have highly configurable, reliant and organised provider infrastructure. 
We used [The AWS Load Balancer](https://aws.amazon.com/elasticloadbalancing/) as inspiration behind our provider framework deployments we have found this beneficial in a number of ways. 

Concerns are separated with Target Groups and Handlers. Whereby Target Groups hold all the configuration of the provider and the handlers manage all the deployment information.
- Currently providers are hosted as lambda functions.

#### What is a target group
A Target Group can be thought of as an encapsulation of configuration schema for a provider for a given version. 


**Why is having providers split via Target Groups helpful?**  

Theres a number of reasons why Target Groups can make the process of managing providers easier.

- Different versions for the same provider may include breaking changes to the configuration schema, which requires a new target group to be made. This means that for multiple providers the same Target Group can be used. This is the case for a number of AWS services.
- This means that you can use a single target group for multiple provider deployments. This can be used for multi region providers and redundancy!

#### How to create a target group
Currently the only way to make target groups for your Common Fate deployment is via the [cf cli](https://github.com/common-fate/cli).
The Target Group command has the following subcommand that can be used to create, update, list and delete Target Groups

```
COMMANDS:
   COMMANDS:
   create    Create a target group
   link      Link a handler to a target group
   unlink    Unlink a deployment from a target group
   list, ls  List target groups
   delete    Delete a target group
   help, h   Shows a list of commands or help for one comman
```

To create a Target Group run the following command:
```
cf targetgroup create --id={name_of_tg} --schema-from={publisher/provider@version}
```
- This requires a provider to exist in our [Provider Registry](https://github.com/common-fate/provider-registry)


#### What is a deployment handler
The second component to creating and using a provider is creating a **handler**. The handler is an instance of a lambda deployment which is then linked to a Target Group to complete the deployment process. 
Handlers can be made independant of Target Groups, but must have compatible schema when attempting to link a handler to a target group.

When creating a Handler, it will have a health reading of heathly or unhealthy. This is the health check for the lambda to see if it is running for a given provider and configuration.
If the lambda failed to deploy you will also get an unhealthy reading. 
:::info
If a if a deployed handler has an incompatible schema with it's linked Target Group it will fail and return an unhealthy reading, along with diagnostic logs describing what went wrong. 
:::

#### Linking a Target Group to a Deployment Handler
A deployment handler must be linked with a target group to make it usable, as the Target Group holds all of the configuration needed to run the provider. The linking process will fail if an incompatible schema version is used.
To link a Handler to a Target Group 

The cf cli is how we can link the two together. with the `cf targetgroup link` command.

Similarly to AWS Load Balancers. Common Fate Provider Handlers have a priority rating, ranging from 0 - 999. This priority is how the Common Fate will determine which Deployment Handler to use when serving an Access Request.
The healthiest, active and highest priority handler will be used to serve the access request when it comes through the Common Fate platform.

```
OPTIONS:
   --target-group value  
   --handler value       
   --kind value          
   --priority value      (default: 100)
   --help, -h            show help
```
You will need to specify:
- The target group ID
- The Handler ID
- The kind of Handler
- The priority for the handler

```
cf targetgroup link --target-group={ID} --handler={ID} --Kind="Account" --priority=999
```

#### Current limitations with PDK providers


Common Fate is self-hosted in your own AWS account. The application is deployed and updated using CloudFormation. Common Fate has been developed using serverless services such as Cognito, AWS Lambda, and DynamoDB. Hosting costs for Common Fate should fall fully into the AWS free tier, or if not should be a few dollars per month.

An architecture diagram of Common Fate is shown below:

![An architecture diagram of Common Fate](/img/common-fate-getting-started/architecture.png)

If you have any questions about Common Fate's architecture, feel free to get in touch by [joining our Slack community](https://join.slack.com/t/commonfatecommunity/shared_invite/zt-q4m96ypu-_gYlRWD3k5rIsaSsqP7QMg).

## Before you get started

- You'll need an AWS account to deploy Common Fate into. We recommend setting up a designated account specifically for Common Fate.
- You'll need an AWS profile set up on your computer with the ability to create resources and IAM roles in the account you'll deploy Common Fate to.

:::info
If you don't have an AWS account and would like to use Common Fate, or would prefer to deploy to Google Cloud or Microsoft Azure, [join our early access program for Common Fate Cloud](https://commonfate.io/early-access).
:::
