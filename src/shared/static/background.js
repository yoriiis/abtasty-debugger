// Listen for the connection from the content script
chrome.runtime.onConnect.addListener(function (portFrom) {
	// Check if the name is valid from the content script
	if (portFrom.name === 'abtastyExtention') {
		// Listen for postMessage send by the content script
		portFrom.onMessage.addListener(function (message) {
			console.log('background', JSON.parse(message.ABTastyData))

			// Get the current tab data
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				const currentTab = tabs[0]
				if (currentTab) {
					// Build the storage data with the tab id as the key
					const storageData = {}
					storageData[`tab-${currentTab.id}-ABTastyData`] = JSON.parse(
						message.ABTastyData
					)

					// Set data to the storage
					chrome.storage.local.set(storageData)
				}
			})
		})
	}
})
