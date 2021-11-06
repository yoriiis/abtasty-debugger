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
 * Set cookie
 * @param {Object} options
 * @param {String} options.name Cookie name
 * @param {String} options.value Cookie value
 * @param {(Number|Boolean)} options.days Cookie expiration in days
 * @param {String} options.path Cookie path
 */
function setCookie({ name, value, days = false, path = '/' }) {
	let expires = ''
	const domain = window.location.host.split('.').slice(-2).join('.')
	const isSecure = window.location.protocol === 'https:'

	if (days) {
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		expires = `expires=${date.toGMTString()}; `
	}

	document.cookie = `${name}=${value}; ${expires}path=${path}; domain=.${domain};${
		isSecure ? ' Secure;' : ''
	}`
}

/**
 * Remove cookie
 * @param {Object} options
 * @param {String} options.name Cookie name
 * @param {String} options.value Cookie value
 */
function removeCookie({ name, path = '/' }) {
	const domain = window.location.host.split('.').slice(-2).join('.')
	document.cookie = `${name}=; expires=${new Date(
		0
	).toUTCString()}; path=${path}; domain=.${domain};`
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
		const data = JSON.parse(e.detail.abtastyData)
		data.debug = !!getCookie('abTastyDebug')
		response(data)
	})

	if (message.from === 'popup') {
		if (message.from === 'popup' && message.action === 'getData') {
			document.dispatchEvent(new window.Event('abtastyDebugger::getData'))
		} else if (message.action === 'getCookie') {
			response(getCookie(message.data.cookieName))
		} else if (message.action === 'setCookie') {
			setCookie({
				name: message.data.cookieName,
				value: message.data.value,
				days: message.data.days
			})
		} else if (message.action === 'removeCookie') {
			removeCookie({
				name: message.data.cookieName
			})
		}
	}
})
