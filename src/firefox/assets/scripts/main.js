import List from '../../../popup/components/list/assets/scripts/list'
import Detail from '../../../popup/components/detail/assets/scripts/detail'
import Empty from 'shared/empty/assets/scripts/empty'
import Popup from '../../../popup/assets/scripts/popup'

const isExtensionMode = typeof browser !== 'undefined' && typeof browser.tabs !== 'undefined'

if (isExtensionMode) {
	browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		const currentTab = tabs[0]

		if (currentTab) {
			browser.tabs.sendMessage(
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
					browser.browserAction.setBadgeText({
						text: ''
					})
				}
			)
		}
	})
}
