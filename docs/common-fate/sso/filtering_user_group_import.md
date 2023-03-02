

# Filtering User and Group Imports

Common Fate supports User and Group import filters. This is configured in your `deployment.yml` file via the `IdentityGroupFilter` parameter. 

The `IdentityGroupFilter` is a regex string that is used by Common Fate's IDP sync function.

```diff
version: 2
deployment:
  account: '012345678912'
  region: ap-southeast-2
  parameters:
    AdministratorGroupID: common_fate_administrators
+   IdentityGroupFilter: common_fate_administrators|dev_.*
    ProviderConfiguration:
      aws-sso-v2:
        uses: commonfate/aws-sso@v2
```

In the above example Common Fate will filter any imported groups to match the regex pattern for `common_fate_administrators|dev_.*`. Practically this means that only users in the `common_fate_administrators` group or prefixed with `dev_` will be imported in to Common Fate.

**Why use an IdentityGroupFilter?**

Identity group filters are helpful for Organizations with a large number of users/groups who want to reduce.

**How does this differ from access groups configured in SAML?**

Even if you have limited who can access Common Fate in your SAML settings, Common Fate by default will  import the full set of Users/Groups. By adding and `IdentityGroupFilter` you can adhere the imported users/groups to the configuration in SAML. 

**What happens if I use an IdentityGroupFilter**

Users are synced based on whether they are a part of the selection of groups that meet the filter criteria. Users not in a group will not be imported. Only groups that meet the criteria will be imported.


**What happens if I don't use an IdentityGroupFilter**

All users and groups are synced from your IDP (including users without a group).