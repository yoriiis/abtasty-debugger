import List from '../../components/list/assets/scripts/list'
import Detail from '../../components/detail/assets/scripts/detail'
import Empty from 'shared/empty/assets/scripts/empty'
import Popup from './popup'
import { sendMessage, isExtensionMode, namespace } from 'shared/utils/bridge'
import mockData from 'shared/assets/fixtures/abtasty.json'

// const namespace =
// 	typeof browser !== 'undefined' ? browser : typeof chrome !== 'undefined' ? chrome : null
// const isExtensionMode = typeof namespace.tabs !== 'undefined'

if (isExtensionMode) {
	const manifestVersion = namespace.runtime.getManifest().manifest_version
	const action = manifestVersion === 3 ? 'action' : 'browserAction'

	sendMessage({
		action: 'getData',
		callback: ({ response, currentTab }) => {
			// Initialize the popup with data received from the page-script
			const popup = new Popup({
				// data: response,
				data: JSON.parse(mockData),
				instances: [List, Detail, Empty]
			})
			popup.init()

			// Remove the badge when the popup is open
			namespace[action].setBadgeText({
				tabId: currentTab.id,
				text: ''
			})
		}
	})
}
