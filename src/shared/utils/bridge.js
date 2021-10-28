const namespace =
	typeof browser !== 'undefined' ? browser : typeof chrome !== 'undefined' ? chrome : null

const isExtensionMode = typeof namespace.tabs !== 'undefined'

function sendMessage({ callback, action, data = null }) {
	namespace.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		const currentTab = tabs[0]

		if (currentTab) {
			namespace.tabs.sendMessage(
				currentTab.id,
				{ from: 'popup', action, data },
				(response) => {
					callback instanceof Function && callback({ response, currentTab })
				}
			)
		}
	})
}

function reload(callback) {
	// namespace.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	// 	const currentTab = tabs[0]
	// 	if (currentTab) {
	// chrome.tabs.reload(currentTab.id, callback)
	// 	}
	// })
}

export { namespace, isExtensionMode, sendMessage, reload }
