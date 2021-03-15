# AB Tasty debugger

![ABTastyDebugger](https://img.shields.io/badge/abtasty--debugger-v1.0.0-009CB2.svg?style=for-the-badge) ![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/yoriiis/abtasty-debugger/Build/master?style=for-the-badge) [![Coverage Status](https://img.shields.io/coveralls/github/yoriiis/abtasty-debugger?style=for-the-badge)](https://coveralls.io/github/yoriiis/abtasty-debugger?branch=master)

`ABTastyDebugger` is a browser extension that simplifies the debugging of A/B Tests from AB Tasty and adds useful informations.

Display A/B tests available on the current page and debug targeting informations. For example, if a test is not displaying, the extension display which targetings are not valid.

## Installation

The `AB Tasty Debugger` browser extension is available for:

| <a href="https://chrome.google.com/webstore" title="Chrome Web Store"><img src="./assets/svgs/chrome.svg" width="50" height="50" alt="Chrome" /></a> | <a href="https://addons.mozilla.org" title="Firefox Browser Add-ons"><img src="./assets/svgs/firefox.svg" width="50" height="50" alt="Firefox" /></a> | <a href="https://addons.opera.com" title="Opera Add-ons"><img src="./assets/svgs/opera.svg" width="50" height="50" alt="Opera" /></a> | <a href="https://microsoftedge.microsoft.com/addons" title="Microsoft Edge Add-ons"><img src="./assets/svgs/edge.svg" width="50" height="50" alt="Edge" /></a> |
| :--------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                     [Chrome](https://chrome.google.com/webstore)                                                     |                                                         [Firefox](https://addons.mozilla.org)                                                         |                                                   [Opera](https://addons.opera.com)                                                   |                                                       [Edge](https://microsoftedge.microsoft.com/addons)                                                       |

---

## Features

- Dark mode compatible (user preference media feature).
- Displays a badge with the number of A / B tests found on the current page.
- Displays a list of all A/B tests available on the current page with their status.
- The list of A/B tests is sorted to show the accepted tests at the top of the list.
- Displays a detail view of each tests with their general informations (ID, name, ajax targeting).
- Displays a link to edit the test on the AB Tasty editor.
- List all targeting informations of the test (URL, code, selector, cookie, IP) with their status.
- The list of targeting is sorted to show the invalid targets at the top of the list.
- Collapse/expand all targeting informations.
- No permissions requested and no data collected.

<table>
    <tr>
        <td width="50%">
            <p><strong>List A/B tests</strong></p>
            <p><img src="./assets/images/screenshot-list.png" /></p>
        </td>
        <td width="50%">
            <p><strong>List A/B tests in dark mode</strong></p>
            <p><img src="./assets/images/screenshot-list-dark.png" /></p>
        </td>
    </tr>
    <tr>
        <td width="50%">
            <p><strong>Detail of an A/B test</strong></p>
            <p><img src="./assets/images/screenshot-detail.png" /></p>
        </td>
        <td width="50%">
            <p><strong>Detail of an A/B test in dark mode</strong></p>
            <p><img src="./assets/images/screenshot-detail-dark.png" /></p>
        </td>
    </tr>
    <tr>
        <td width="50%">
            <p><strong>Detail opened of an A/B test</strong></p>
            <p><img src="./assets/images/screenshot-detail-open.png" /></p>
        </td>
        <td width="50%">
            <p><strong>Detail opened of an A/B test in dark mode</strong></p>
            <p><img src="./assets/images/screenshot-detail-open-dark.png" /></p>
        </td>
    </tr>
</table>

---

## Licence

`ABTastyDebugger` and its documentation are licensed under the [MIT License](http://opensource.org/licenses/MIT).

Created with ♥ by [@yoriiis](http://github.com/yoriiis).
