browser.runtime.onMessage.addListener((message, sender) => {
	if (message.from === 'contentScript' && message.action === 'updateBadge') {
		browser.browserAction.setBadgeText({ text: `${message.counter}` })
		browser.browserAction.setBadgeBackgroundColor({ color: '#054c5d' })
	}
})
