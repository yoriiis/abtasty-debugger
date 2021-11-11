# Store

## Description

Browser extension that simplifies the debugging of A/B tests from AB Tasty and adds useful informations.

Display A/B tests available on the current page and vizualize targeting, variations and trackings information. For example, if a test does not display, the extension displays invalid targets.

Features:

- Dark mode compatible (user preference media feature).
- Displays a badge with the number of A / B tests found on the current page.
- Displays a list of all A/B tests available on the current page with their status.
- The list of A/B tests is sorted to show the accepted tests at the top of the list.
- Displays a clear AB Tasty cookies button to clear AB Tasty cookies and reload the page.
- Displays a debug mode button to activate AB Tasty logs in the DevTools console.
- Displays a detail view of each tests with their general informations (ID, status, type, targeting mode, async, traffic).
- Displays a link to see the test report.
- List all variations of the test if the status is `accepted` or `traffic_rejected`, with their name, traffic, JSON modifications link and activation button.
- List all trackings informations of the test with their name and selector.
- List all targeting informations of the test (URL, code, selector, cookie, IP) with their status.
- Displays a link to edit the test targetings on the AB Tasty editor.
- The list of targeting is sorted to show the invalid targets at the top of the list.
- Collapse/expand all variations, trackings and targeting informations.

## Labels

abtasty, abtest, debugger, inspect

## Goal

Simplifies the debugging of A/B tests from AB Tasty and adds useful informations. Display A/B tests available on the current page and debug variations, trackings and targeting information.

## Privacy

### host authorization

The host permission is used to inject a small script on the current page to retrieve a global `window.ABTasty` object. The object stores the data of the A/B tests and allows to create a user interface in the popup. The script searches for the object with an interval and sends it to the service worker when it is found. When no results are found after a timeout, the interval is destroyed.
