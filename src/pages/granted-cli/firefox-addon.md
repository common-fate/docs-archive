# Firefox addon

The [Granted Firefox addon](https://addons.mozilla.org/en-GB/firefox/addon/granted/) operates with the minimum possible permissions and does not have the ability to read information from any web pages. By design, the extension does not have permission to read any information from the DOM when you are accessing cloud provider consoles. The extension uses a [Background Script](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#background_scripts) which can't directly access web page content.

The permissions that this extension requires are:

| Permission           | Reason                                                                                                                                                                                          |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| contextualIdentities | used to manage tab containers via the [contextualIdentity API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/contextualIdentities)                                 |
| cookies              | required to access [container tab stores](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Work_with_the_Cookies_API#cookie_stores) in order to list available identities |
| tabs                 | required to open a new tab in a container                                                                                                                                                       |
| storage              | required to store information on the list of available containers                                                                                                                               |

Additionally, the source code for the addon is [available on GitHub under the MIT licence](https://github.com/common-fate/granted-containers). Security-conscious users may opt to build the extension from source and install it locally: instructions on how to do so are available in the GitHub repository.
