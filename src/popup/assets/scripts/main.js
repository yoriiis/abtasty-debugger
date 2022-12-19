import Popup from './popup'
import { sendMessage, isExtensionMode } from 'shared/utils/bridge'

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
