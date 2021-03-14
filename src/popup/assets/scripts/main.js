import List from '../../components/list/assets/scripts/list'
import Detail from '../../components/detail/assets/scripts/detail'
import Empty from 'shared/empty/assets/scripts/empty'
import Popup from '../../assets/scripts/popup'

const namespace =
	typeof browser !== 'undefined' ? browser : typeof chrome !== 'undefined' ? chrome : null
const isExtensionMode = typeof namespace.tabs !== 'undefined'

if (isExtensionMode) {
	const manifestVersion = namespace.runtime.getManifest().manifest_version
	const action = manifestVersion === 3 ? 'action' : 'browserAction'

	namespace.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		const currentTab = tabs[0]

		if (currentTab) {
			namespace.tabs.sendMessage(
				currentTab.id,
				{ from: 'popup', action: 'getData' },
				(response) => {
					// Initialize the popup with data received from the page-script
					const popup = new Popup({
						data: response,
						instances: [List, Detail, Empty]
					})
					popup.init()

					// Remove the badge when the popup is open
					namespace[action].setBadgeText({
						text: ''
					})
				}
			)
		}
	})
}
