---
slug: managing-community-providers
---

# Managing Community Providers

## List Providers in the Registry

List all the existing providers in Provider Registry by running:

```
cf provider list
```

## Bootstrap your AWS Account

The bootstrap command will create a cloudformation stack that deploys an S3 bucket in your account and return the bucket name.
Bootstrapping is required because Cloudformation requires that resources from S3 be in the same region as the cloudfromation stack.
When deploying a provider you must first copy the provider resources from the Provider Registry to your AWS account in the region that you will be deploying the provider.

```
> cf bootstrap
```

## Bootstrap a Provider to Your AWS Account

Before you can deploy a Provider, you will need to bootstrap it. This process will copy the files from the Provider Registry to your bootstrap bucket.

```
> cf provider bootstrap --id <provider-id>
```

The `provider-id` here is in the following format `provider/name@version`. For example provider-id `common-fate/aws@v0.2.0`

## Create a Target Group

2. Create a new Target Group for your Provider by running:

```
cf targetgroup create --id <an id for the target group> --schema-from <provider-id>

```

The `provider-id` here is in the following format `provider/name@version/Kind`. For example provider-id `common-fate/aws@v0.2.0/Account`

## Create a Handler

```
cf handler register --id cf-handler-<some id> --aws-region <your_aws_region> --aws-account <your_aws_accound_id>
```

## Link a Handler With a Target Group

You can link any target group with any handler, however it does not guaratee that the link will be valid.

```

cf targetgroup link --target-group <target_group_id> --handler <handler_id> --kind <kind_name> --priority 100

```

## Deploy Cloudformation Stack for a Handler:

You can use `cf generate-cf-output` command to interactively enter all the required cloudformation parameters and generate the `aws cloudformation create-stack` command.

```
cf generate-cf-output --provider-id <provider_id> --handler-id <handler_id> --region <aws_region>
```

## Validating a Deployed Provider

Run the following command to check the status of your Handler

```
cf handler validate --id <handler_id> --aws-region <region> --runtime aws-lambda
```
