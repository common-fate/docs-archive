# Logging

Granted Approvals sends all logs to [Amazon CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html). Granted Approvals uses a JSON structured log format. An example of a log message is shown below.

```json
{
  "caller": "logger/middleware.go:63",
  "level": "info",
  "method": "GET",
  "msg": "Served",
  "proto": "HTTP/1.1",
  "remote": "0.6.1.4",
  "reqId": "1e095537-6a72-4e45-9121-863e91d86c6d",
  "request": "/api/v1/users/me",
  "size": 199,
  "status": 200,
  "took": 0.65133094,
  "ts": 1657135399.0898278,
  "userId": "usr_2BWUDH5etXYQB8Eybs2RJZ7c0wK"
}
```

The `userId` field corresponds to an authenticated user in Granted Approvals. The `reqId` field is populated from the AWS Lambda request ID.

You can use `gdeploy` to query for logs. Under the hood, `gdeploy` calls CloudWatch APIs and prints the messages to your terminal.

## Getting logs for all services

To retrieve logs for all services, run

```
gdeploy logs get
```

You should see an output similar to the below.

```
➜ gdeploy logs get
[i] starting to watch logs for api, log group id: /aws/lambda/Granted-APIRestAPIHandlerFunction6F0D5931-Tdrmgxjr7kZa
[i] starting to watch logs for accesshandler, log group id: /aws/lambda/Granted-AccessHandlerRestAPIHandlerFunction9FEF0B2-nbs5EVKZdQ8h
[i] starting to watch logs for idp-sync, log group id: /aws/lambda/Granted-APIIdpSyncHandlerFunctionB5E49815-YHckG94aahEX
[i] starting to watch logs for granter, log group id: /aws/lambda/Granted-AccessHandlerGranterStepHandlerFunction149-SPtI0RFiRHl6
[i] starting to watch logs for events, log group id: Granted-EventBusEventBusLogFAEB6547-Je81BRwcDgOu
[i] starting to watch logs for slack-notifer, log group id: /aws/lambda/Granted-APINotifiersSlackNotifierFunction3528BD0B-vCiYi0yfhmVX
[i] starting to watch logs for event-handler, log group id: /aws/lambda/Granted-APIEventHandlerFunctionD526CC8B-Gi3feS7zQjfn
[2022-07-06T20:25:34+01:00] (2022/07/06/[$LATEST]186ff953f07f4bc5b941b47e801e2d09) START RequestId: ce6afaae-020d-4f8c-bd7f-02443ad407da Version: $LATEST

[2022-07-06T20:25:34+01:00] (2022/07/06/[$LATEST]9474ab7678d94c73a0c1bd08c0a20e81) START RequestId: 7a57ed49-5905-4574-b28c-809e372f621b Version: $LATEST

[2022-07-06T20:25:34+01:00] (2022/07/06/[$LATEST]186ff953f07f4bc5b941b47e801e2d09) { "caller": "logger/middleware.go:63", "level": "info", "method": "GET", "msg": "Served", "proto": "HTTP/1.1", "remote": "0.6.1.4", "reqId": "ce6afaae-020d-4f8c-bd7f-02443ad407da", "request": "/api/v1/access-rules", "size": 30, "status": 200, "took": 0.123400793, "ts": 1657135534.8757534, "userId": "usr_2BWUDH5etXYQB8Eybs2RJZ7c0wK" }
[2022-07-06T20:25:34+01:00] (2022/07/06/[$LATEST]186ff953f07f4bc5b941b47e801e2d09) END RequestId: ce6afaae-020d-4f8c-bd7f-02443ad407da
0.6.1.
```

By default logs from the last 5 minutes are loaded. To change the start and end times, provide them as arguments:

```bash
gdeploy logs get --start -15m --end -5m # retrieves logs from 15 minutes ago, until 5 minutes ago
```

## Getting logs for a particular service

You can filter for a particular service by providing the `--service` flag:

```bash
gdeploy logs get --service api
```

## Watching logs

You can live tail the logs by running:

```
gdeploy logs watch
```
