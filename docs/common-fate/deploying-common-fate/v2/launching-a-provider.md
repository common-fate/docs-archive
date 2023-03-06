---
slug: Launching-an-access-provider 
---


# Prerequisities 

To get started with PDK Providers, you will need to install the following command line tool. 

1. [cf](https://github.com/common-fate/cli) 

# Launching a pre-existing Provider 

1. List all the existing providers in Provider Registry by running: 

```
> cf provider list 
```


2. Run the following command to create a bootstrap bucket for your provider and get the S3 bucket name. Bootstrap bucket is a S3 bucket where the provider assets are stored.

```
> cf bootstrap aws 
```

3. Run the following command to copy the provider assets to your bootstrap bucket 

```
> cf provider bootstrap --id <provider-id> --bootstrap-bucket <your-bootstrap-bucket>
```

The `provider-id` here is the complete provider information including the publisher and version information. Here, `common-fate/aws@v.0.2.0` means publisher is `common-fate`, name is `aws` & version is `v.0.2.0` 

4. Create a new targetgroup for your provider by running:

```
> cf targetgroup create --id <add_target_group_id> --schema-from <provider-id>
```

5. Create a new handler for your targetgroup by running:

```
> cf handler register --id <enter_handler_id> --aws-region <your_aws_region> --aws-account <your_aws_accound_id>
```

6. You need to link your targetgroup with a handler by running:

```
> cf targetgroup link --target-group <target_group_id> --handler <handler_id> --kind <kind_name>
```

7. Deploy cloudformation stack for your handler by running:

``` 
aws cloudformation create-stack --stack-name <your_stack_name> --region <region> --template-url <pre_signed_cloudformation.json> --parameters 
```

You can use `cf generate-cf-output` command to interactively enter all the required cloudformation parameters and generate the `aws cloudformation create-stack` command

