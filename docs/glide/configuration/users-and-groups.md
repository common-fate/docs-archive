# Users and Groups

**_Adding or removing users and user-groups is only available when you are using the default Cognito user pool as Identity Provider_**. If you have connected an SSO provider, like Okta, Google or AzureAD, use those tools to manage your users and groups instead.

## Create New User

To create new user in current cognito user pool id, run the following command:

```
gdeploy identity users create -u USER_EMAIL_ADDRESS
```

To instead create an admin user, pass `--admin` or `-a` flag. Here's a sample:

```
gdeploy identity users create --admin --u USER_EMAIL_ADDRESS
```

## Remove User

To delete existing user, run:

```
gdeploy identity users delete -u USER_EMAIL_ADDRESS
```

## Add New User Group

o create new user group in current cognito user pool id, run:

```
gdeploy identity groups create --group-name GROUP_NAME
```

To add a description to your user group pass the `--desc` flag. Here's a sample:

```
gdeploy identity groups create --group-name GROUP_NAME -desc GROUP_DESCRIPTION
```

## Remove User Group

To delete existing user group, run:

```
gdeploy identity groups delete --group-name GROUP_NAME
```

## Add Members to Existing User Group

To add user to provided user group, run:

```
gdeploy identity groups members add --group GROUP_NAME -u USER_EMAIL_ADDRESS
```
