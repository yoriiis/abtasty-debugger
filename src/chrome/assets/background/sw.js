chrome.runtime.onMessage.addListener((message, sender) => {
	if (message.from === 'contentScript' && message.action === 'updateBadge') {
		chrome.action.setBadgeText({ text: `${message.counter}` })
		chrome.action.setBadgeBackgroundColor({ color: '#054c5d' })
	}
})
