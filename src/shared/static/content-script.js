// Create the connection with a specific name (for scope)
const port = chrome.runtime.connect({
	name: 'abtastyExtention'
})

// Inject the page script in the current web page
const pageScript = document.createElement('script')
pageScript.src = chrome.extension.getURL('static/page-script.js')
document.head.appendChild(pageScript)

// Listen for dispatchEvent from the page script
document.addEventListener('sendABTastyObject', (e) => {
	// Send data to the background
	port.postMessage({ ABTastyData: e.detail.ABTastyData })
})
