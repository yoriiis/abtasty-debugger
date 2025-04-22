import * as Sentry from '@sentry/browser'
import { isExtensionMode, sendMessage } from 'shared/utils/bridge'
import Popup from './popup.js'

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	environment: process.env.NODE_ENV
})

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
