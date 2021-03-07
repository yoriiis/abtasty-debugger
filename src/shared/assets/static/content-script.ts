// import { CustomEvent } from 'shared/assets/interfaces/interfaces'

// Create the connection with a specific name (for scope)
const port = chrome.runtime.connect({
	name: 'abtastyExtention'
})

// Inject the page script in the current web page
const pageScript = document.createElement('script')
pageScript.src = chrome.runtime.getURL('static/page-script.ts')
document.head.appendChild(pageScript)

// Listen for dispatchEvent from the page script
document.addEventListener('sendABTastyObject', (event: Event)  => {
	// Send data to the background
	port.postMessage({ ABTastyData: (event as CustomEvent).detail.ABTastyData })
})
