const namespace = typeof browser !== 'undefined' ? browser : chrome
const manifestVersion = namespace.runtime.getManifest().manifest_version
const action = manifestVersion === 3 ? 'action' : 'browserAction'

namespace.runtime.onMessage.addListener((message) => {
	if (message.from === 'contentScript' && message.action === 'updateBadge') {
		namespace.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			const currentTab = tabs[0]
			if (currentTab) {
				namespace[action].setBadgeText({
					tabId: currentTab.id,
					text: `${message.counter}`
				})
				namespace[action].setBadgeBackgroundColor({
					tabId: currentTab.id,
					color: '#054c5d'
				})
			}
		})
	}
})
