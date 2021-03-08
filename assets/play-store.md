## Play Store

## Description

Browser extension that simplifies the debugging of A/B tests from AB Tasty and adds useful informations.

Display A/B tests available on the current page and debug targeting information. For example, if a test does not display, the extension displays invalid targets.

Features:

- Dark mode compatible (user preference media feature).
- Displays a badge with the number of A / B tests found on the current page
- Displays a list of all A/B tests available on the current page with their status.
- The list of A/B tests is sorted to show the accepted tests at the top of the list.
- Displays a detail view of each tests with their general informations (ID, name, ajax targeting).
- Displays a link to edit the test on the AB Tasty editor.
- List all targeting informations of the test (URL, code, selector, cookie, IP) with their status.
- The list of targeting is sorted to show the invalid targets at the top of the list.
- Collapse/expand all targeting informations

## Goal

Simplifies the debugging of A/B tests from AB Tasty and adds useful informations. Display A/B tests available on the current page and debug targeting information.

## Privacy

### activeTab authorization

The activeTab permission is used to get the ID of the current tab and generates a dynamic storage key with the following format `tab-<TAB_ID>-ABTastyData`. The generated key is used to store data specific to a tab.

### storage authorization

The storage permission is used to store data for the global object found on the page (window.ABTasty). The data is sent from the page to the service worker, which declare it in the storage. The pop-up retrieves the data of the current tab from storage to create a user interface. Storage data is unique to each tab that contains A/B tests on the page.

### host authorization

The host permission is used to inject a small script on the current page to retrieve a global `window.ABTasty` object. The object store data from A/B tests and allows to create a user interface in the popup. The script search with an interval the object and send it to the service worker when it is found. When no results are found after a timeout, the interval is destroy for better performance.
