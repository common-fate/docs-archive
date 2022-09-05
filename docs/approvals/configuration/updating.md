# Updating your deployment

You can use the `gdeploy` CLI to update your Granted Approvals deployment when Common Fate releases new versions. Keeping your deployment up to date ensures that you take advantage of new features and security fixes.

Release information, including the latest version number and the changelog, can be found in the [Granted Approvals GitHub repository](https://github.com/common-fate/granted-approvals/releases).

## Process

The below process will use an example version upgrade from `v0.4.1` to `v0.4.1`.

First, ensure that your `gdeploy` CLI is up to date. You can update the CLI by following the installation instructions [here](/granted-approvals/deploying-granted/setup).

Edit your `granted-deployment.yml` file as follows to specify the latest version:

```diff
version: 1
deployment:
  stackName: Granted
  account: "123456789012"
  region: ap-southeast-2
+ release: v0.4.1
- release: v0.4.1
```

## Deploying the changes

Now, apply the changes to your deployment by running:

```
gdeploy update
```

You should see an output similar to the below:

```
[✔] Your Granted deployment has been updated
```
