# Identity Provider Sync Configuration

Common Fate uses a scheduled Lambda function to sync users and groups with your identity provider. By default the sync configuration values are as follows:
- Lambda Memory = 128 MB
- Lambda Timeout = 20 seconds
- EventBridge Cron Schedule = Every 5 minutes `rate(5 minutes)`

These values can be overridden by configuration fields in your `deployment.yml` file.

## Updating Identity Sync Configuration
Example `deployment.yml` with updated fields:
```
version: 2
deployment:
  stackName: test
  account: "123456789012"
  region: ap-southeast-2
  release: v0.13.2
  parameters:
    AdministratorGroupID: "597375"
    IDPSyncTimeoutSeconds: 60
    IDPSyncSchedule: rate(10 minutes)
    IDPSyncMemory: 256

```

- [Information on Lambda memory and computing power](https://docs.aws.amazon.com/lambda/latest/operatorguide/computing-power.html)
- [Information on Configuring timeouts](https://docs.aws.amazon.com/lambda/latest/dg/configuration-function-common.html#configuration-timeout-console)
- [Information on schedule expressions](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html)
