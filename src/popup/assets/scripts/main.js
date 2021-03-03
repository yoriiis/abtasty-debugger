import Popup from './popup'

console.log('popup.js')

chrome.tabs.query({ active: true, currentWindow: true }, function (response) {
	console.log(response)
	chrome.runtime.sendMessage({ method: 'get', tabId: response[0].id })
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	console.log('popup received', message)

	document.querySelector('#app').innerHTML = ''
	const popup = new Popup({ data: message.data })
	popup.init()
})
