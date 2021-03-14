const namespace = typeof browser !== 'undefined' ? browser : chrome
const manifestVersion = namespace.runtime.getManifest().manifest_version
const action = manifestVersion === 3 ? 'action' : 'browserAction'

namespace.runtime.onMessage.addListener((message, sender) => {
	if (message.from === 'contentScript' && message.action === 'updateBadge') {
		namespace[action].setBadgeText({ text: `${message.counter}` })
		namespace[action].setBadgeBackgroundColor({ color: '#054c5d' })
	}
})
