# CHANGELOG

## 1.2.0

### New features

- Visualization and activation of the variations of a test
- Visualization of the trackings of a test
- Add a debug mode button to activate AB Tasty logs in the DevTools console (the button reloads the page and is blocked when reloading)
- Add a reload tag button to clear the AB Tasty cookies and reload the page
- Add a retry button on the not found page, when no result is found (the button reloads the pop-up)
- Add a link to see the test report
- Add a link to see the JSON file of each variation
- Data is now retrieved when opening the pop-up window (before, if the data changed after the first search, it was no longer up to date)
- Add `.code-workspace` file for VS Code

### Updates

- Improve the check of ABTasty ready detection
- The counter badge is kept even when the pop-up opens
- Small design improvements

## 1.1.3

### New features

- Add `isAsync` value on the detail view
- Asynchronous tests with an `undefined` status are updated as long as the status does not change for a maximum duration of 60s

### Fixes

- Restrict status badge to string type

## 1.1.2

### New features

- Auto-redirect to the empty route when no data

### Fixes

- Display the badge only if the counter is greater than 0
- Fix empty route not trigger when `ABTasty.results` empty

## 1.1.1

### New features

- Add parent ID when test has one

### Updates

- Hide tests with type `mastersegment` in the list and the badge counter

### Fixes

- Limit the badge counter with the tab ID

## 1.1.0

### New features

- Add TypeScript
- Add lint extension with the web-ext package
- Add communication between the popup and the page script
- Generate extension for Chrome, Firefox, Opera and Edge
- Chrome uses the `manifest.json` version 3 and the `chrome` object
- Firefox, Opera and Edge uses the `manifest.json` version 2 and the `browser` object

### Updates

- Update list, detail and empty with a dedicated class (inspired from [step-manager](https://github.com/yoriiis/step-manager))
- Improvement of unit tests
- Update docs (REAME, CHANGELOG)
- Update Terser config
- Updated styles for compatibility with other browsers
- Update the browserslist

### Removes

- Remove permission `activeTab` and `storage`
- Remove job to deploy on store (only manual)

## 1.0.0

### New features

- First release of `ABTastyDebugger`
