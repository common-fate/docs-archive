---
sidebar_position: 6
---

# AWS SSO EKS

## Parameters

| Name            | Description                                               |
| --------------- | --------------------------------------------------------- |
| identityStoreId | the AWS SSO Identity Store ID                             |
| instanceArn     | the AWS SSO Instance ARN                                  |
| clusterName     | the name of the cluster to target                         |
| clusterRegion   | the region the cluster instance is deployed to            |
| namespace       | the namespace the cluster is deployed into                |
| ssoRegion       | the region the AWS SSO instance is deployed into          |


## Prerequisites

### Creating a new k8s cluster
For the purpose of this documentation we will be creating a fresh cluster deployment to showcase the setup for Granted Approvals with EKS. This is optional and if you want to go straight ahead and integrate with an existing cluster then just follow the instructions for that context in mind.

To easily create a cluster with EKS, we recommend using [eksctl](https://eksctl.io/usage/creating-and-managing-clusters/).
We will be creating a *t2.nano* instance, by running the following:
```
eksctl create cluster --instance-types "t2.nano" --nodes=1 --name={CLUSTER_NAME}
```
- This will take about 20 minutes to run

To get access to this cluster, run: `aws eks update-kubeconfig --name {CLUSTER_NAME}` then using your tooling of choice to interact with the cluster. We are fans of [k9s](https://k9scli.io/)

### Kubernetes Roles
Granted Approvals leverages [Kubernetes RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) to grant and revoke access to users for a given EKS deployment. These docs will go over the implementation and necessary steps to setting up Granted Approvals for SSO EKS.

To set up EKS with Granted you'll need to have RBAC roles setup, you can check if there are existing roles by running the following against your cluster:
```
kubectl get roles -A
```

If you don't have any existing roles, thats fine. For the purpose of this tutorial in the documentation we will create a test role that allows a user to "get", "watch", "list" pods (read access) for a cluster.
- If you already have roles set up and want to get started with them, go ahead.

### Creating Kubernetes RBAC Roles
In a folder, create a new file and call it `test-role.yml`. This is where we will specify our new role
Copy the following into the file and save:
```yaml
  apiVersion: rbac.authorization.k8s.io/v1
  kind: Role
  metadata:
    namespace: default
    name: pod-reader
    labels:
      app.kubernetes.io/part-of: "commonfate.io/granted"
  rules:
  - apiGroups: [""] # "" indicates the core API group
    resources: ["pods"]
    verbs: ["get", "watch", "list"]
```

In the same directory from a terminal, we can then apply this config to the kubernetes cluster by running:
```
kubectl apply -f test-role.yml
```
- We can confirm that the role was successfully created by running:
```
kubectl get roles -A
```
## Setup instructions
:::info
Make sure you have AWS credentials before attempting the provider setup.
:::

Start by running the `gdeploy provider add` command. Run the following to begin the Provider setup:

```json
gdeploy provider add
```

Select 'AWS SSO EKS (commonfate/aws-sso-eks@v1)' when prompted for the provider.

```json
? What are you trying to grant access to?  [Use arrows to move, type to filter]
  Okta groups (commonfate/okta@v1)
  Azure-AD groups (commonfate/azure-ad@v1)
  AWS SSO PermissionSets (commonfate/aws-sso@v1)
> AWS SSO EKS (commonfate/aws-sso-eks@v1)
  TestVault - a provider for testing out Granted Approvals (commonfate/testvault@v1)
```
gdeploy will prompt for some setup parameters, we will go through each one and tell you where to find them.


1. `ID` for the provider, call this `sso-eks` (default)
2. `clusterName` the name of the cluster we will be targeting this provider to.
3. `namespace` the namespace that the cluster is deployed in, if you're unsure then it will be in the "default" namespace
4. `clusterRegion` the region the cluster is deployed to in AWS.

The next two require looking up some details from AWS.

### Using the AWS CLI

If you have the AWS CLI installed and can access the account that your AWS SSO instance is deployed to, run the following command to retrieve details about the instance:

```bash
❯ aws sso-admin list-instances
{
    "Instances": [
        {
            "InstanceArn": "arn:aws:sso:::instance/ssoins-1234567890",
            "IdentityStoreId": "d-1234567890"
        }
    ]
}
```

The `InstanceArn` value in the CLI output should be provided as the `instanceArn` parameter when configuring the provider.

The `IdentityStoreId` field in the CLI output should be provided as the `identityStoreId` parameter when configuring the provider.

If your AWS SSO instance is deployed in a separate region to the region that Granted Approvals is running in, set the `region` parameter to be the region of your AWS SSO instance (e.g. `us-east-1`).

### Using the AWS Console

Open the AWS console in the account that your AWS SSO instance is deployed to. If your company is using AWS Control Tower, this will be the root account in your AWS organisation.

Visit the **Settings** tab. The information about your SSO instance will be shown here, including the Instance ARN (as the “ARN” field) and the Identity Store ID.

![](/img/providers/aws-sso/03.png)

5. `identity store id` is the IdentityStoreId from the cli
6. `instance arn` is the instanceArn from the cli
7. `ssoRegion` the region AWS SSO instance is deployed into.

Your provider will now be set in your Granted config. Run gdeploy update to push the change to your Granted deployment.

## Giving Granted access to the cluster
At the end of the provider setup you would have noticed some outputs. Two ARNS. These are important and will now be used to complete the EKS provider setup.

Create a new config file for the cluster and name it `ac-role.yml`
Copy in the following config and save:
```yaml
  apiVersion: rbac.authorization.k8s.io/v1
  kind: ClusterRole
  metadata:
    name: common-fate-granted
  rules:
  - apiGroups: ["*"] 
      resources: ["*"]
      verbs: ["*"]
```

Create this new role by running:
```
kubectl apply -f ac-role.yml
```
Next create another file called `ac-role-binding.yml`
and copy the following config and save:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: access-handler-k8-manager
subjects:
- kind: User
  name: access-handler-k8-manager
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: access-handler-k8-manager
  apiGroup: rbac.authorization.k8s.io
```
Then apply the config again by running 
```
kubectl apply -f ac-role-binding.yml
```

Lastly we will need to update the `aws-auth` config map in our cluster, by adding this new cluster role which enables Granted to grant and revoke access. The ARNs referenced are the same as the ones from the output of the gdeploy *provider add* command.

It is recommended to use third party tooling to make changes to aws-auth and other k8s configs as mistakes in config can cause downtime if done incorrectly.
Here are some easy **eksctl** commands to create the identity mappings, just replace the values with the correct ones from the outputs:
```
eksctl create iamidentitymapping \
    --cluster {CLUSTER_NAME} \
    --region={CLUSTER_REGION} \
    --arn {access handler granter lambda role ARN} \
		--username access-handler-k8-manager \
    --no-duplicate-arns


eksctl create iamidentitymapping \
    --cluster {CLUSTER_NAME} \
    --region={CLUSTER_REGION} \
    --arn {access handler rest api lambda role ARN} \
		--username access-handler-k8-manager \
    --no-duplicate-arns
```

Unpreferred but you can interact with the aws-auth directly by running 
```
kubectl edit -n kube-system configmap/aws-auth
```
Then manually editing the mapRoles using your terminal text editor.

With these roles and permissions in place Granted now should have access to start granting and revoking access to our new cluster!