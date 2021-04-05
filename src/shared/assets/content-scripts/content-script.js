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

// Listen for messages from the popup
namespace.runtime.onMessage.addListener((message, sender, response) => {
	message.from === 'popup' && message.action === 'getData' && response(dataFromPage)
})
