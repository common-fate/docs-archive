---
sidebar_position: 3
---

# Headless environments

Granted has built-in support for use in headless environments such as a remote Linux server or in shell scripting.

## Shell Scripting with Granted

In some cases, you may want to write a script which can execute some aws command over a set of accounts.

With Granted, you can use the `--exec` flag to have granted assume a profile, then automatically execute your command with the temporary credentials.

The effect of the below command is that the get caller identity command is called without exporting any new credentials after it completes. This can also be useful if you wanted to run a quick command for a second account without opening a new terminal.

`assume my-profile --exec 'aws sts get-caller-identity'`

In a bash script, the following example would run a program for each profile in a file.

```
for PROFILE in $(cat profile_list.txt); do FORCE_NO_ALIAS=true assume $PROFILE --exec 'aws sts get-caller-identity'; done
```
