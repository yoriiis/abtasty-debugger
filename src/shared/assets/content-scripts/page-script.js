const ABTASTY_NAME = 'ABTasty'
const INTERVAL_IN_MS = 1000
const TIME_OUT_IN_MS = INTERVAL_IN_MS * 10
const IGNORE_TEST_IDS = ['global']

let counterIsUpdated = false
let timerAbtastyData

// Check for ABTasty data on the page and send the counter if tests is found
const checkAbtastyData = () => {
	if (typeof window[ABTASTY_NAME] !== 'undefined' && window[ABTASTY_NAME].started) {
		const data = window[ABTASTY_NAME]

		const counterTests = Object.keys(data.accountData.tests).filter(
			(id) => !IGNORE_TEST_IDS.includes(id)
		).length
		const counterResults = Object.keys(data.results).length

		// Results are not yet ready
		if (counterTests !== counterResults) {
			timerAbtastyData = setTimeout(
				() => requestAnimationFrame(checkAbtastyData),
				INTERVAL_IN_MS
			)
		} else {
			window.cancelAnimationFrame(checkAbtastyData)
			clearTimeout(timerAbtastyData)
			updateBadge()
		}

		// if(counter)
	} else {
		timerAbtastyData = setTimeout(() => requestAnimationFrame(checkAbtastyData), INTERVAL_IN_MS)
	}
}
window.requestAnimationFrame(checkAbtastyData)

// Stop the research after a delay
const timeout = setTimeout(() => {
	window.cancelAnimationFrame(checkAbtastyData)
	clearTimeout(timerAbtastyData)
	clearTimeout(timeout)
	!counterIsUpdated && updateBadge()
}, TIME_OUT_IN_MS)

/**
 * Send data from the ABTasty object to the service worker
 * @param {Object} data ABTasty object
 */
document.addEventListener('abtastyDebugger::getData', (e) => {
	document.dispatchEvent(
		new window.CustomEvent('abtastyDebugger::sendData', {
			detail: {
				abtastyData: JSON.stringify(window[ABTASTY_NAME])
			}
		})
	)
})

/**
 * Update extension counter badge
 */
function updateBadge() {
	counterIsUpdated = true
	const data = window[ABTASTY_NAME]

	// Exclude "mastersegment" test type from counter
	const counter = Object.keys(data.results).filter(
		(key) => data.results[key].type !== 'mastersegment'
	).length

	// Update the badge only if the counter is greater than 0
	if (counter > 0) {
		document.dispatchEvent(
			new window.CustomEvent('updateBadge', {
				detail: { counter }
			})
		)
	}
}
