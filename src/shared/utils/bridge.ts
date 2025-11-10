const namespace =
	// @ts-expect-error
	typeof browser !== 'undefined' ? browser : typeof chrome !== 'undefined' ? chrome : null

const isExtensionMode = !!namespace?.tabs

/**
 * Get tab ID with Browser extension API
 * @returns {Promise<number>} Tab id
 */
function getTabId(): Promise<number> {
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
 * @param options
 * @param options.action Action name
 * @param options.data Action data
 * @param options.callback Action callback function
 */
function sendMessage({
	action,
	data,
	callback
}: {
	action: string
	data?: any
	callback?: (response: string) => void
}): void {
	getTabId().then((tabId) => {
		namespace.tabs.sendMessage(tabId, { from: 'popup', action, data }, (response: any) => {
			callback instanceof Function && callback(response)
		})
	})
}

export { namespace, isExtensionMode, getTabId, sendMessage }
