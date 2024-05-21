# CHANGELOG

## 1.3.3

### Fixes

- Fix variation changes with cookie domain and new `ABTastyForcedVariations` browser storage ([#30](https://github.com/yoriiis/abtasty-debugger/pull/30))

## 1.3.2

### Updates

- Add GitHub Actions workflow to publish on Chrome Web Store, Edge Add-ons and Firefox Add-ons

## 1.3.1

### Fixes

- Fix switch variation when variation id already exist on other test ([#15](https://github.com/yoriiis/abtasty-debugger/pull/15))

### Updates

- Improve Edge store validation ([bca3710](https://github.com/yoriiis/abtasty-debugger/commit/bca3710d8eaef7f023922dbde2fa6280cfcf7a87), [b9eac39](https://github.com/yoriiis/abtasty-debugger/commit/b9eac39ad9c490b611ebcf28fa55dc6f1fdd47a6))
- Replace jsx-dom by costro jsx ([19f62ab](https://github.com/yoriiis/abtasty-debugger/commit/19f62ab6daa3ab4345bce7ea9689a912f5fcc27a), [2c7f733](https://github.com/yoriiis/abtasty-debugger/commit/2c7f7339b1cc3dbca3dc7178d5d8cf503ae2b9e2))
- Update packages dependencies ([#17](https://github.com/yoriiis/abtasty-debugger/pull/17))

## 1.3.0

### New features

- Visualization of triggers and segments of a test

### Updates

- Migration to [Costrojs](https://github.com/costrojs/costro) for the application
- Remove Opera support
- Edge migration to manifest v3

## 1.2.3

### Fixes

- Fix url targeting with favorite url scope ([#11](https://github.com/yoriiis/abtasty-debugger/pull/11))

## 1.2.2

### Fixes

- Sync cookie with storage ([#10](https://github.com/yoriiis/abtasty-debugger/pull/10))

## 1.2.1

### Fixes

- Fix variation ID regexp ([#9](https://github.com/yoriiis/abtasty-debugger/pull/9))

## 1.2.0

### New features

- Visualization and activation of the variations of a test
- Visualization of the trackings of a test
- Add a debug mode button to activate AB Tasty logs in the DevTools console (the button reloads the page and hangs when reloading)
- Add a clear AB Tasty cookies button to clear AB Tasty cookies and reload the page
- Add a "retry" button on the 404 page, when no result is found (the button reloads the pop-up)
- Add a link to see the test report
- Add a link to see the JSON modifications of each variation
- Data is now retrieved each time the pop-up window is opened (previously, if the data changed after the first search, it was no longer up to date)
- Add the `.code-workspace` file for VS Code

### Updates

- Improve control when ABTasty is ready
- The counter badge is now kept even when the pop-up opens
- Add `activeTab` permission to limit the use of the extension to the active tab only
- Small design improvements
- Upgrade to Node LTS `v16.13.0`

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
