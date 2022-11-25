# Users and Groups

**_Adding or removing users and user-groups are only available when you are using the default Cognito user pool as Identity Provider_**. If you have connected an SSO provider, like Okta, Google or AzureAD, use those tools to manage your users and groups instead.

## Create New User

Run `gdeploy identity users create -u YOUR_EMAIL_ADDRESS` to create new user in current cognito user pool id. 

To instead create an admin user, pass `--admin` or `-a` arg like `gdeploy identity users create --admin --u YOUR_EMAIL_ADDRESS` 

## Remove User 

Run `gdeploy identity users delete -u YOUR_EMAIL_ADDRESS` to delete existing user.

## Add New User Group

Run `gdeploy identity groups create --group-name GROUP_NAME` to create new user group in current cognito user pool id. 

Additionally, pass `--desc` arg to add description to your user group. 

`gdeploy identity groups create --group-name GROUP_NAME -desc "YOUR_DESCRIPTION"` 

## Remove User Group 

Run `gdeploy identity groups delete --group-name GROUP_NAME` to delete existing user group.

## Add Members to Existing User Group 

Run `gdeploy identity groups members add --group GROUPNAME -u USERNAME` to add user to provided user group.  