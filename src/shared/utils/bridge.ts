const namespace =
	// @ts-ignore
	typeof browser !== 'undefined' ? browser : typeof chrome !== 'undefined' ? chrome : null

const isExtensionMode = !!namespace.tabs

const manifestVersion = namespace.runtime.getManifest().manifest_version
const browserAction = manifestVersion === 3 ? 'action' : 'browserAction'

/**
 * Get tab ID with Browser extension API
 * @returns {Promise<Number>} Tab id
 */
function getTabId(): Promise<Number> {
	return new Promise((resolve, reject) => {
		namespace.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
			if (tabs[0]) {
				resolve(tabs[0].id)
			} else {
				reject(new Error('No tabs found'))
			}
		})
	})
}

/**
 * Send message to content script with Browser extension API
 * @param {Object} options
 * @param {String} options.action Action name
 * @param {Object} options.data Action data
 * @param {Function} options.callback Action callback function
 */
function sendMessage({
	action,
	data,
	callback
}: {
	action: string
	data?: any
	callback?: Function
}): void {
	getTabId().then((tabId) => {
		namespace.tabs.sendMessage(tabId, { from: 'popup', action, data }, (response: any) => {
			callback instanceof Function && callback(response, tabId)
		})
	})
}

export { namespace, isExtensionMode, getTabId, sendMessage, browserAction }
