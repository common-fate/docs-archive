#  Running Granted on Windows with WSL and VSCode

If you're using Windows and want to run Granted with Windows Subsystem for Linux (WSL) and VSCode, you may have encountered some issues when running Granted in the VSCode terminal. The problem lies with VSCode, which doesn't execute the `.bash_profile`, causing Granted to not work properly.

Fortunately, there is a simple solution to fix this issue. You can update the VSCode `settings.json` file located at `C:\Users\{username}\AppData\Roaming\Code\User\settings.json` or find it through the GUI by searching for `terminal.integrated.profiles.linux` in the settings. Now edit the settings.json file by adding the "args" property:

```
"bash": {
    "path": "bash",
    "args": [
        "-l"
    ]
}

```

After making this update, start a new terminal and remove the old one. Assuming roles works in the VSCode WSL-environment as well.

(Credits to [Jakob Heinisch](https://github.com/jakheipcg) and [this superuser thread](https://superuser.com/questions/1209366/win10-vs-code-integrated-bash-not-loading-bash-profile) for providing the solution.)
