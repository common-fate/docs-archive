# EKS

:::info
For this recipe, you'll need access to an [EKS cluster](https://docs.aws.amazon.com/eks/latest/userguide/clusters.html). You can [provision one using eksctl](https://eksctl.io/usage/creating-and-managing-clusters/).
:::

You can use Granted as a `kubectl` [credential plugin](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#client-go-credential-plugins) to authenticate to EKS clusters. `kubectl` uses a "kubeconfig" file, which is located at `~/.kube/config` by default. To use Granted with EKS, we'll modify this kubeconfig file.

First, add an entry for your cluster to the kubeconfig file by running

```bash
aws eks update-kubeconfig --name <CLUSTER_NAME>
```

Where `<CLUSTER_NAME>` is the name of the EKS cluster you're trying to connect to. This command will add an entry to your kubeconfig file similar to the below:

```yaml
users:
  - name: arn:aws:eks:ap-southeast-2:123456789012:cluster/<CLUSTER_NAME>
    user:
      exec:
        apiVersion: client.authentication.k8s.io/v1beta1
        args:
          - --region
          - <CLUSTER_REGION>
          - eks
          - get-token
          - --cluster-name
          - <CLUSTER_NAME>
        command: aws
        env: null
        provideClusterInfo: false
```

Now, modify the `exec` field of this entry to be the following:

```yaml
- name: arn:aws:eks:ap-southeast-2:123456789012:cluster/<CLUSTER_NAME>
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1beta1
      args:
        [
          "<PROFILE_NAME>",
          "--exec",
          "aws --region <CLUSTER_REGION> eks get-token --cluster-name <CLUSTER_NAME>",
        ]
      command: assumego
      env:
        - name: GRANTED_QUIET
          value: "true"
        - name: FORCE_NO_ALIAS
          value: "true"
      interactiveMode: IfAvailable
      provideClusterInfo: false
```

Where `<PROFILE_NAME>` is the name of the AWS profile to use, `<CLUSTER_REGION>` is the region the EKS cluster is deployed to, and `<CLUSTER_NAME>` is the name of the EKS cluster.

:::note
The above configuration will call `assumego`, rather than `assume`. `assumego` is the underlying Go binary file, and `assume` is the shell wrapper script [used to export environment variables into the calling shell](/granted/internals/shell-alias). For EKS authentication we don't need to export environment variables, so we bypass the `assume` script and call `assumego` directly.
:::

Now, run a `kubectl` command against the cluster to verify the connection:

```bash
kubectl get nodes
```

The command should print the list of nodes for your cluster.
