const namespace =
	typeof browser !== 'undefined' ? browser : typeof chrome !== 'undefined' ? chrome : null

// Inject the page script in the current web page
const pageScript = document.createElement('script')
pageScript.src = namespace.runtime.getURL('scripts/page-script.js')
document.head.appendChild(pageScript)

/**
 * Get cookie
 * @param {String} name Cookie name
 * @returns {(String|null)} Cookie value or null if no result
 */
function getCookie(name) {
	const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
	return v ? v[2] : null
}

/**
 * Set storage (cookie and localStorage)
 * @param {Object} options
 * @param {String} options.name Name
 * @param {String} options.value Value
 * @param {String} options.path Cookie path
 * @param {Boolean} options.syncWithLocalStorage Sync localtorage
 */
function setStorage({ name, value, path = '/', syncWithLocalStorage = false }) {
	const domain = window.location.host.split('.').slice(-2).join('.')
	const isSecure = window.location.protocol === 'https:'

	document.cookie = `${name}=${value}; path=/; domain=.${domain};${isSecure ? ' Secure;' : ''}`

	const valueInStorage = window.localStorage.getItem(name)
	if (syncWithLocalStorage && valueInStorage) {
		window.localStorage.setItem(name, value)
	}
}

/**
 * Remove cookie
 * @param {Object} options
 * @param {String} options.name Cookie name
 * @param {String} options.value Cookie value
 */
function removeCookie({ name, path = '/' }) {
	const domain = window.location.host.split('.').slice(-2).join('.')
	document.cookie = `${name}=; expires=${new Date(0).toUTCString()}; path=/; domain=.${domain};`
}

// Listen for event from the page script
document.addEventListener('updateBadge', (e) => {
	const counter = e.detail.counter

	// Update the badge only if the counter is greater than 0
	if (counter > 0) {
		namespace.runtime.sendMessage({
			from: 'contentScript',
			action: 'updateBadge',
			counter
		})
	}
})

// Listen for messages from the popup
namespace.runtime.onMessage.addListener((message, sender, response) => {
	document.addEventListener('abtastyDebugger::sendData', (e) => {
		const abtastyData = e.detail.abtastyData

		if (abtastyData) {
			const data = JSON.parse(abtastyData)
			data.debug = !!getCookie('abTastyDebug')
			response(data)
		}

		response(undefined)
	})

	if (message.from === 'popup') {
		if (message.from === 'popup' && message.action === 'getData') {
			document.dispatchEvent(new window.Event('abtastyDebugger::getData'))
		} else if (message.action === 'getCookie') {
			response(getCookie(message.data.name))
		} else if (message.action === 'setStorage') {
			setStorage({
				name: message.data.name,
				value: message.data.value,
				syncWithLocalStorage: message.data.syncWithLocalStorage
			})
			response('success')
		} else if (message.action === 'removeCookie') {
			removeCookie({
				name: message.data.name
			})
			response('success')
		} else if (message.action === 'clearAbtastyCookies') {
			document.dispatchEvent(new window.Event('abtastyDebugger::clearCookie'))
			response('success')
		}
	}

	// Keeps the message channel open until `sendResponse` is executed
	return true
})
