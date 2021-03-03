const ABTASTY_NAME = 'ABTasty'
const INTERVAL_IN_MS = 1000
const TIME_OUT_IN_MS = INTERVAL_IN_MS * 60

// Search in interval to find the data
// Interval is automatically clear when the data is found
const interval = setInterval(() => {
	// console.log('window.ABTasty', window.ABTasty)
	if (typeof window[ABTASTY_NAME] !== 'undefined') {
		document.dispatchEvent(
			new window.CustomEvent('sendABTastyObject', {
				detail: {
					ABTastyData: JSON.stringify(window.ABTasty || null)
				}
			})
		)
		clearInterval(interval)
	}
}, INTERVAL_IN_MS)

// Add timeout to stop the research and clear timers
const timeout = setTimeout(() => {
	clearInterval(interval)
	clearTimeout(timeout)
}, TIME_OUT_IN_MS)
