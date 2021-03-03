console.log('contentscript.js')

// start connection in content script
const contentPort = chrome.runtime.connect({
	name: 'background-content'
})

const s = document.createElement('script')
s.src = chrome.extension.getURL('static/pagescript.js')
;(document.head || document.documentElement).appendChild(s)

document.addEventListener('testEvent', (e) => {
	const data = e.detail.abTasty

	console.log('testEvent', data ? JSON.parse(data) : null)
	chrome.runtime.sendMessage({ method: 'post', data: data ? JSON.parse(data) : null })
})
