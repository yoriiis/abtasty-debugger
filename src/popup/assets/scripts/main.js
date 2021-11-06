import List from '../../components/list/assets/scripts/list'
import Detail from '../../components/detail/assets/scripts/detail'
import Empty from 'shared/empty/assets/scripts/empty'
import Popup from './popup'
import { sendMessage, isExtensionMode } from 'shared/utils/bridge'

if (isExtensionMode) {
	sendMessage({
		action: 'getData',
		callback: (response, tabId) => {
			// Initialize the popup with data received from the page-script
			const popup = new Popup({
				data: response,
				instances: [List, Detail, Empty]
			})
			popup.init()
		}
	})
}
