# AB Tasty Debugger

![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/yoriiis/abtasty-debugger/build.yml?branch=main&style=for-the-badge) [![Coverage Status](https://img.shields.io/coveralls/github/yoriiis/abtasty-debugger?style=for-the-badge)](https://coveralls.io/github/yoriiis/abtasty-debugger?branch=main) [![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/ideeaicjegejlmejdjbhbhfhenekneie?style=for-the-badge&logo=googlechrome&logoColor=FFCD46&color=%234C8BF5&link=https%3A%2F%2Fchromewebstore.google.com%2Fdetail%2Fab-tasty-debugger%2Fideeaicjegejlmejdjbhbhfhenekneie)](https://chromewebstore.google.com/detail/ab-tasty-debugger/ideeaicjegejlmejdjbhbhfhenekneie)

`AB Tasty Debugger` is a browser extension that simplifies the debugging of A/B Tests from AB Tasty and adds useful informations.

Display A/B tests available on the current page and debug targeting informations. For example, if a test is not displaying, the extension display which targetings are not valid.

## Installation

The `AB Tasty Debugger` browser extension is available for:

| <a href="https://chrome.google.com/webstore/detail/ab-tasty-debugger/ideeaicjegejlmejdjbhbhfhenekneie" title="AB Tasty Debugger on Chrome Web Store"><img src="./assets/svgs/chrome.svg" width="50" height="50" alt="Chrome" /></a> | <a href="https://addons.mozilla.org/addon/abtasty-debugger" title="AB Tasty Debugger on Firefox Browser Add-ons"><img src="./assets/svgs/firefox.svg" width="50" height="50" alt="Firefox" /></a> | <a href="https://microsoftedge.microsoft.com/addons/detail/agniifpndnebgiaeajkkebdmceajjajl" title="AB Tasty Debugger on Microsoft Edge Add-ons"><img src="./assets/svgs/edge.svg" width="50" height="50" alt="Edge" /></a> |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                               [Chrome](https://chrome.google.com/webstore/detail/ab-tasty-debugger/ideeaicjegejlmejdjbhbhfhenekneie)                                                                |                                                                   [Firefox](https://addons.mozilla.org/addon/abtasty-debugger)                                                                    |                                                                 [Edge](https://microsoftedge.microsoft.com/addons/detail/agniifpndnebgiaeajkkebdmceajjajl)                                                                  |

---

## Features

- Dark mode compatible (user preference media feature).
- Displays a badge with the number of A / B tests found on the current page.
- Displays a list of all A/B tests available on the current page with their status.
- The list of A/B tests is sorted to show the accepted tests at the top of the list.
- Displays a clear AB Tasty cookies button to clear AB Tasty cookies and reload the page.
- Displays a debug mode button to activate AB Tasty logs in the DevTools console.
- Displays a detail view of each tests with their general informations (ID, status, type, targeting mode, async, traffic).
- Displays a link to see the test report.
- List all variations of the test if the status is `accepted` or `traffic_rejected`, with their name, traffic, a link of JSON modifications and activation button.
- List all trackings information of the test with their name and selector.
- List all targeting information of the test (segment, trigger, URL, code, selector, cookie, IP) with their status.
- Displays a link to edit the test targetings on the AB Tasty editor.
- The list of targeting is sorted to show the invalid targets at the top of the list.
- Collapse/expand all variations, trackings and targetings information.

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
</table>

---

## Licence

`AB Tasty Debugger` and its documentation are licensed under the [MIT License](http://opensource.org/licenses/MIT).

Created with ♥ by [@yoriiis](http://github.com/yoriiis).
