# AB Tasty debugger

![ABTastyDebugger](https://img.shields.io/badge/abtasty--debugger-v1.0.0-009CB2.svg?style=for-the-badge) ![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/yoriiis/abtasty-debugger/Build/master?style=for-the-badge) [![Coverage Status](https://img.shields.io/coveralls/github/yoriiis/abtasty-debugger?style=for-the-badge)](https://coveralls.io/github/yoriiis/abtasty-debugger?branch=master)

`ABTastyDebugger` is a browser extension that simplifies the debugging of A/B Tests from AB Tasty and adds useful informations.

Display A/B tests available on the current page and debug targeting informations. For example, if a test is not displaying, the extension display which targetings are not valid.

## Installation

Install the `AB Tasty Debugger` browser extension from the Chrome Web Store (Coming soon).

![Chrome](assets/images/chrome.png 'Chrome')

## Features

- Displays a badge with the number of A / B tests found on the current page
- Displays a list of all A/B tests available on the current page with their status.
- The list of A/B tests is sorted to show the accepted tests at the top of the list.
- Displays a detail view of each tests with their general informations (ID, name, ajax targeting).
- Displays a link to edit the test on the AB Tasty editor.
- List all targeting informations of the test (URL, code, selector, cookie, IP) with their status.
- The list targetings is sorted to show the rejected targeting at the top of the list.
- Collapse/expand all targeting informations

## Licence

`ABTastyDebugger` and its documentation are licensed under the [MIT License](http://opensource.org/licenses/MIT).

Created with ♥ by [@yoriiis](http://github.com/yoriiis).
