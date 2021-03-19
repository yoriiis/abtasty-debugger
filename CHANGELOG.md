# CHANGELOG

## 1.1.1

### New features

- Add parent ID when test has one

### Updates

- Hide tests with type `mastersegment` in the list

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
