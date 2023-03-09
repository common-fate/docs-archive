---
slug: deploying-pdk-provider
---


# Installation 

To get started with deploying a PDK Providers, you will need to install `cf` cli tool which provides commands to configure a Provider.

### Package manager for macOS
```
brew tap common-fate/tap
brew install cf
```

### Building the source code 
Clone the [commonfate/cli](https://github.com/common-fate/cli) repo and run `make cli`

# Listing existing Providers 
List all the existing providers in Provider Registry by running: 

```
cf provider list 
```

You can quickly view the schema of a provider by running:

```
curl https://api.registry.commonfate.io/v1alpha1/providers/common-fate/aws/v0.2.0

```

To learn more about the schema for the Provider [click here](/common-fate/pdk-providers/concepts/schema)


# Bootstrapping 

Bootstrapping copies the provider resources from Common Fates release infrastructure to your AWS account in the region that you will be deploying the provider.
Cloudformation requires that resources from s3 be in the same region as the cloudfromation stack.

The following command will create a bootstrap bucket for your provider and get the S3 bucket name.

```
> cf bootstrap aws 
```

We suggest that you assign the output of the this command to environment variable as bootstrap bucket name is required when deploying a provider.

```
DEPLOYMENT_BUCKET=$(cf bootstrap aws)
```

# Deploying an existing Provider 

1. Run the following command to copy the Provider Assets to your bootstrap bucket 

```
> cf provider bootstrap --id <provider-id> --bootstrap-bucket=DEPLOYMENT_BUCKET
```

The `provider-id` here is the complete provider information including the publisher and version information. For example provider-id `common-fate/aws@v.0.2.0` means publisher is `common-fate`, name is `aws` & version is `v.0.2.0` 

2. Create a new Target Group for your Provider by running:

```
cf targetgroup create --id <enter_a_unique_targetgroup_identifier> --schema-from <provider-id>
```

3. Create a new Handler for your Provider by running:

```
cf handler register --id <enter_a_unique_handler_identifier> --aws-region <your_aws_region> --aws-account <your_aws_accound_id>
```

4. You need to now link your Target Group with a Handler by running:

```
cf targetgroup link --target-group <target_group_id> --handler <handler_id> --kind <kind_name>
```

5. Deploy cloudformation stack for your Handler:

You can use `cf generate-cf-output` command to interactively enter all the required cloudformation parameters and generate the `aws cloudformation create-stack` command. 

``` 
cf generate-cf-output --provider-id <provider_id> --handler-id <handler_id> --region <aws_region>
--bootstrap-bucket=$DEPLOYMENT_BUCKET
```

If no `--stackname` flag is provided, then `--handler-id` will be used as stackname for the cloudformation stack.


## Validating a Deployed Provider 

Run the following command to check the status of your Handler

```
cf handler validate --id <handler_id> --aws-region <region> --runtime aws-lambda
```
