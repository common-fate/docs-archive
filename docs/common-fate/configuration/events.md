# Audit trail events

All audit trail events in Granted Approvals are emitted to an [Amazon EventBridge](https://aws.amazon.com/eventbridge/) event bus. You can build your own integrations with Granted Approvals by subscribing to the event bus. Examples of integrations could include custom notification logic, or sending events to a centralised security logging tool.

## Event types

The following table summarises the audit trail events emitted by Granted Approvals. Each event contains a data payload with specific details about what happened.

| Event               | Description                                                           |
| ------------------- | --------------------------------------------------------------------- |
| `request.created`   | An Access Request was created                                         |
| `request.approved`  | An Access Request was approved                                        |
| `request.cancelled` | An Access Request was cancelled                                       |
| `request.declined`  | An Access Request was declined                                        |
| `grant.created`     | A workflow was created to grant access to a resource                  |
| `grant.activated`   | Access to a resource was activated                                    |
| `grant.expired`     | Access to a resource was deactivated at the expiry time of a request  |
| `grant.revoked`     | Access to a resource was revoked before the expiry time               |
| `grant.failed`      | Granted Approvals had a problem activating or deactivating the access |

## Finding the event bus ARN

All events are emitted with a source of `commonfate.io/granted`. Granted Approvals uses a custom EventBridge bus, which is included as part of the CloudFormation deployment. To develop your own integrations against the events emitted by Granted Approvals, you'll need to find the ARN of the event bus. The ARN is listed in the `EventBusArn` output of the Granted Approvals CloudFormation stack. You can run `gdeploy status` to print it to your console, as shown below:

```
➜ gdeploy status
+--------------------------+-------------------------------------------------------------------+
|     OUTPUT PARAMETER     |                               VALUE                               |
+--------------------------+-------------------------------------------------------------------+
| UserPoolDomain           | granted-login-cfdemo.auth.ap-southeast-2.amazoncognito.com        |
| CloudFrontDomain         | d3s0441cha6x1h.cloudfront.net                                     |
| FrontendDomain           |                                                                   |
| APIURL                   | https://9e7t7dgus6.execute-api.ap-southeast-2.amazonaws.com/prod/ |
| DynamoDBTable            | Granted                                                           |
| CognitoClientID          | 3dhk5dn6oobh8r5ft6r7834ijg                                        |
| UserPoolID               | ap-southeast-2_7UAB8g9AZ                                          |
| S3BucketName             | granted-frontendwebappbucketdfdb6ba7-1svhcuc0zft5l                |
| CloudFrontDistributionID | E1V3I3M613HH6O                                                    |
| EventBusArn              | arn:aws:events:ap-southeast-2:616777145260:event-bus/Granted      |
| EventBusSource           | commonfate.io/granted                                             |
| Region                   | ap-southeast-2                                                    |
+--------------------------+-------------------------------------------------------------------+
[✔] Your Granted deployment is online
```

## Sending events to your SIEM

A [SIEM](https://en.wikipedia.org/wiki/Security_information_and_event_management) is a tool which aggregates and analyses security events. You can add a destination to the Granted Approvals event bus to send audit trail events to your SIEM.

Depending on the capabilities of your SIEM, we recommend following one of three approaches below.

### If your SIEM supports Amazon CloudWatch log streams

By default, Granted Approvals logs all events to an [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/) log group.

If your SIEM can read Amazon CloudWatch log streams, you can connect it directly to the event log group. The ARN of this log group can be found by looking at the `EventBusLogGroupName` output from the Granted Approvals CloudFormation stack.

### If your SIEM supports REST API events

If your SIEM supports event delivery using a REST API, [follow this tutorial to receive events](https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/).

### Custom integrations

If you need to build custom integration logic to send events to your SIEM, you can add an AWS Lambda destination to the event bus by [following this guide](https://aws.amazon.com/blogs/compute/integrating-amazon-eventbridge-into-your-serverless-applications/).
