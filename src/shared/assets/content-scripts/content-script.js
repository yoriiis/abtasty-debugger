const namespace = typeof browser !== 'undefined' ? browser : chrome

// Inject the page script in the current web page
const pageScript = document.createElement('script')
pageScript.src = namespace.runtime.getURL('scripts/page-script.js')
document.head.appendChild(pageScript)

let dataFromPage

// Listen for event from the page script
document.addEventListener('sendABTastyObject', (event) => {
	const data = JSON.parse(event.detail.ABTastyData)
	dataFromPage = data

	// Calculate the counter excluding "mastersegment" type tests
	const counter = Object.keys(data.results).filter(
		(key) => data.results[key].type !== 'mastersegment'
	).length

	// Update the badge only if the counter is greater than 0
	if (counter > 0) {
		namespace.runtime.sendMessage({
			from: 'contentScript',
			action: 'updateBadge',
			counter
		})
	}
})

function getCookie(name) {
	const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
	return v ? v[2] : null
}

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

function removeCookie({ name, path = '/' }) {
	const domain = window.location.host.split('.').slice(-2).join('.')
	document.cookie = `${name}=; expires=${new Date(
		0
	).toUTCString()}; path=${path}; domain=.${domain};`
}

// Listen for messages from the popup
namespace.runtime.onMessage.addListener((message, sender, response) => {
	if (message.from === 'popup' && message.action === 'getData') {
		dataFromPage.debug = !!getCookie('abTastyDebug')
		response(dataFromPage)
	} else if (message.from === 'popup' && message.action === 'getCookie') {
		response(getCookie(message.data.cookieName))
	} else if (message.from === 'popup' && message.action === 'setCookie') {
		setCookie({
			name: message.data.cookieName,
			value: message.data.value,
			days: message.data.days
		})
	} else if (message.from === 'popup' && message.action === 'removeCookie') {
		removeCookie({
			name: message.data.cookieName
		})
	} else if (message.from === 'popup' && message.action === 'getLiveData') {
		response(dataFromPage)
	}
})
