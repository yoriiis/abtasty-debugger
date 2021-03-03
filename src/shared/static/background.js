console.log('background.js')

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	console.log(message)
	if (message.method === 'get') {
		chrome.storage.local.get(['abTasty'], function (result) {
			console.log('storage', result.abTasty)
			// sendResponse(result)
			// chrome.tabs.sendMessage(message.tabId, { abTasty: result.abTasty })
			chrome.runtime.sendMessage({ abTasty: result.abTasty })
		})
	} else {
		chrome.storage.local.set({ abTasty: message.data })
	}
})
