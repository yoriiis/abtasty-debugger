import { isExtensionMode, sendMessage } from 'shared/utils/bridge'
import Popup from './popup'

if (isExtensionMode) {
	sendMessage({
		action: 'getData',
		callback: (response) => {
			// Initialize the popup with data received from the page-script
			const popup = new Popup({
				data: response
			})
			document.getElementById('app') && popup.init()
		}
	})
}
