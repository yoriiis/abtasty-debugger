const namespace =
	typeof browser !== 'undefined' ? browser : typeof chrome !== 'undefined' ? chrome : null

const isExtensionMode = !!namespace.tabs

function getTabId() {
	return new Promise((resolve, reject) => {
		namespace.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs[0]) {
				resolve(tabs[0].id)
			} else {
				reject(new Error('No tabs found'))
			}
		})
	})
}

function sendMessage({ callback, action, data }) {
	getTabId().then((tabId) => {
		namespace.tabs.sendMessage(tabId, { from: 'popup', action, data }, (response) => {
			callback instanceof Function && callback(response, tabId)
		})
	})
}

export { namespace, isExtensionMode, sendMessage, getTabId }
