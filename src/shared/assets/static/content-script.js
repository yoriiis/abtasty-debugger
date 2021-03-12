// Inject the page script in the current web page
const pageScript = document.createElement('script')
pageScript.src = chrome.runtime.getURL('static/page-script.js')
document.head.appendChild(pageScript)

let dataFromPage

// Listen for event from the page script
document.addEventListener('sendABTastyObject', (event) => {
	const data = JSON.parse(event.detail.ABTastyData)

	console.log(data)
	dataFromPage = data

	chrome.runtime.sendMessage({
		from: 'contentScript',
		action: 'updateBadge',
		counter: Object.keys(data.results).length
	})
})

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, response) => {
	console.log('popup open')
	message.from === 'popup' && message.action === 'getData' && response(dataFromPage)
})
