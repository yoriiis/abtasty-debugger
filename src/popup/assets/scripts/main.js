import List from '../../components/list/assets/scripts/list'
import Detail from '../../components/detail/assets/scripts/detail'
import Empty from 'shared/empty/assets/scripts/empty'
import Popup from './popup'

const isExtensionMode = typeof chrome !== 'undefined' && typeof chrome.tabs !== 'undefined'

if (isExtensionMode) {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		const currentTab = tabs[0]

		if (currentTab) {
			chrome.tabs.sendMessage(
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
					chrome.action.setBadgeText({
						text: ''
					})
				}
			)
		}
	})
}
