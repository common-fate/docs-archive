# Backup

## Backing up

Common Fate stores data in [Amazon DynamoDB](https://aws.amazon.com/dynamodb/). You can trigger a manual backup of the DynamoDB table using the `gdeploy` CLI. This can be useful in situations such as migrating Common Fate to a new AWS account, or taking a snapshot before updating the deployment to a new version.

To make a backup of the DynamoDB table, run:

```
gdeploy backup
```

and follow the prompts. You should see an output similar to the below:

```
[✔] successfully started a backup of Common Fate dynamoDB table: Granted
[i] backup details
Backup: mytestbackup
ARN: arn:aws:dynamodb:ap-southeast-2:123456789012:table/Granted/backup/123456789-5d199eb1
Status: CREATING
[i] to view the status of this backup, run `gdeploy backup status --arn=arn:aws:dynamodb:ap-southeast-2:123456789012:table/Granted/backup/123456789-5d199eb1`
[i] to restore from this backup, run `gdeploy restore --arn=arn:aws:dynamodb:ap-southeast-2:123456789012:table/Granted/backup/123456789-5d199eb1`
```

Under the hood, this command uses the [DynamoDB CreateBackup API](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateBackup.html).

## Restoring

To restore the backup, run:

```
gdeploy restore --arn=<ARN>
```

Where `<ARN>` is the ARN of the backup printed in the output of the backup step above.
