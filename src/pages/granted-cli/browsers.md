# Browsers

Granted currently supports Firefox and Chromium-based browsers (such as Chrome, Brave, and Edge).

:::tip

We recommend using Firefox with Granted as it has the best user experience when accessing multiple cloud consoles, even if it's not your daily driver browser.

:::

On Firefox Granted uses [Multi-Account Containers](https://support.mozilla.org/en-US/kb/containers) to view multiple cloud accounts. Multiple cloud accounts can be opened in the same window and they are color-coded for easy reference. In order to use Granted with Firefox you'll need to download [our Firefox addon](https://addons.mozilla.org/en-GB/firefox/addon/granted/). The extension requires minimal permissions and does not have access to web page content. You can read more about security considerations for the extension [here](/granted/security).

On Chromium-based browsers Granted uses [Profiles](https://support.google.com/chrome/answer/2364824). Each cloud account is opened in a separate window.

![A screenshot of the AWS Console on Firefox with two tabs: the first tab is blue and is the 'role-a' profile, and the second tab is orange and is the 'role-b' profile](/img/tab-containers.png)


## Custom browser for running SSO flows
You can specify a custom browser path for your SSO login flows with Granted.
You should be prompted when setting up Granted to set up the custom sso browser. But at any time you can update this browser with the `granted browsers --set-sso` flag.

- This will run you through a simple wizard to set up a new custom browser to execute your SSO sign on flow.
```
❯ granted browser set-sso  

ℹ️  Select your SSO default browser

? Select your default browser Chrome

✅  Granted will default to using /Applications/Google Chrome.app/Contents/MacOS/Google Chrome for SSO flows.
```