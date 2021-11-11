# Store

## Description

Browser extension that simplifies the debugging of A/B tests from AB Tasty and adds useful informations.

Display A/B tests available on the current page and detail their informations such as variations and trackings and targetings. For example, if a test does not display, the extension displays the current variation and invalid targets.

Features:

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
- List all targeting information of the test (URL, code, selector, cookie, IP) with their status.
- Displays a link to edit the test targetings on the AB Tasty editor.
- The list of targeting is sorted to show the invalid targets at the top of the list.
- Collapse/expand all variations, trackings and targetings information.

## Labels

abtasty, abtest, debugger, inspect

## Goal

Simplifies the debugging of A/B tests from AB Tasty and adds useful informations. Display A/B tests available on the current page and visualize variations, trackings and targeting information.

## Privacy

### activeTab permission

The extension has limited use to the active tab only. It can do the following actions:

- Reload the tab when the user click on a button (no A/B tests are found on the page, debug mode is enabled, A/B test variation change)
- Listen to the `onUpdated` tab event to update the UI according to the debug mode cookie
- Send message to the content script of the active tab (with tab ID) to establish a communication between the popup and the page (read A/B tests data from global variable, update AB Tasty cookies)

### host permission

The active tab permission is used to inject a small script on the current page to retrieve a global `window.ABTasty` object. The object stores the data of the A/B tests and allows to create a user interface in the popup. The script searches for the object with an interval and sends it to the service worker when it is found. When no results are found after a timeout, the interval is destroyed.
