// Listen for the connection from the content script
chrome.runtime.onConnect.addListener(function (portFrom) {
	// Check if the name is valid from the content script
	if (portFrom.name === 'abtastyExtention') {
		// Listen for postMessage send by the content script
		portFrom.onMessage.addListener(function (message) {
			const data = JSON.parse(message.ABTastyData)
			console.log('sw.ts', data)

			// Set the badge with the number of results found
			chrome.action.setBadgeText({ text: `${Object.keys(data.results).length}` })
			chrome.action.setBadgeBackgroundColor({ color: '#054c5d' })

			// Get the current tab data
			chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
				const currentTab = tabs[0]

				if (currentTab) {
					// Build the storage data with the tab id as the key
					const storageData = {
						[`tab-${currentTab.id}-ABTastyData`]: data
					}

					// Set data to the storage
					chrome.storage.local.set(storageData)
				}
			})
		})
	}
})
