import Popup from './popup'

const isExtensionMode =
	typeof chrome !== 'undefined' &&
	typeof chrome.tabs !== 'undefined' &&
	typeof chrome.storage !== 'undefined'

if (isExtensionMode) {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		const currentTab = tabs[0]
		if (currentTab) {
			const storageKey = `tab-${currentTab.id}-ABTastyData`
			chrome.storage.local.get([storageKey], function (response) {
				// Initialize the popup with data received from the storage
				const popup = new Popup({ data: response[storageKey] })
				popup.init()

				// Remove the badge when the popup is open
				chrome.action.setBadgeText({
					text: ''
				})
			})
		}
	})
}
