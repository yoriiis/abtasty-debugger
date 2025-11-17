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
	const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
	return v ? v[2] : null
}

/**
 * Set cookie
 * @param {Object} options
 * @param {String} options.name Storage name
 * @param {String} options.value Storage value
 */
function setCookie({ name, value }) {
	const domain = window.location.host
	const isSecure = window.location.protocol === 'https:'

	document.cookie = `${name}=${value}; path=/; domain=.${domain};${isSecure ? ' Secure;' : ''}`
}

/**
 * Change test variation
 * Update new browser storage to force the variation changes
 * @param {Object} options
 * @param {String} options.testId Test ID
 * @param {String} options.variationId Variation ID
 * @param {String} options.cookieValue Cookie value
 */
function changeVariation({ testId, variationId, cookieValue }) {
	setCookie({ name: 'ABTasty', value: cookieValue })

	// Update new browser storage to force variation changes
	const storageKey = 'ABTastyForcedVariations'
	const storage = JSON.parse(window.sessionStorage.getItem(storageKey)) || {}
	storage[testId] = variationId
	window.sessionStorage.setItem(storageKey, JSON.stringify(storage))
	window.sessionStorage.setItem('AB_TASTY_QA_ASSISTANT_ENV', 'staging')
}

/**
 * Remove cookie
 * @param {Object} options
 * @param {String} options.name Cookie name
 * @param {String} options.value Cookie value
 */
function removeCookie({ name }) {
	const domain = window.location.host
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
namespace.runtime.onMessage.addListener((message, _sender, response) => {
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
		} else if (message.action === 'setCookie') {
			setCookie({
				name: message.data.name,
				value: message.data.value
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
		} else if (message.action === 'changeVariation') {
			changeVariation({
				testId: message.data.testId,
				variationId: message.data.variationId,
				cookieValue: message.data.cookieValue
			})
			response('success')
		}
	}

	// Keeps the message channel open until `sendResponse` is executed
	return true
})
