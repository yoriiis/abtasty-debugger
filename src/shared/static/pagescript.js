console.log('pagescript.js')

const testEvent = new window.CustomEvent('testEvent', {
	detail: {
		abTasty: JSON.stringify(window.ABTasty) || ''
	}
})
document.dispatchEvent(testEvent)
