export const ABTASTY_NAME = 'ABTasty'
const INTERVAL_IN_MS = 1000
const TIME_OUT_IN_MS = INTERVAL_IN_MS * 10
const IGNORE_TEST_IDS = ['global']

let counterIsUpdated = false
let timerAbtastyData

// Check for ABTasty data on the page and send the counter if tests is found
const checkAbtastyData = () => {
	if (isAbtastyReady()) {
		const data = window[ABTASTY_NAME]

		const counterTests = Object.keys(data.accountData.tests).filter(
			(id) => !IGNORE_TEST_IDS.includes(id)
		).length
		const counterResults = Object.keys(data.results).length

		// Results are not yet ready
		if (counterTests !== counterResults) {
			retryResearch()
		} else {
			window.cancelAnimationFrame(checkAbtastyData)
			clearTimeout(timerAbtastyData)
			updateBadge()
		}
	} else {
		retryResearch()
	}
}
window.requestAnimationFrame(checkAbtastyData)

/**
 * Check if ABTasty data are ready to use
 * @returns {Boolean} ABTasty data are ready
 */
function isAbtastyReady() {
	return (
		typeof window[ABTASTY_NAME] !== 'undefined' &&
		window[ABTASTY_NAME].started &&
		window[ABTASTY_NAME].accountData.tests &&
		window[ABTASTY_NAME].results
	)
}

/**
 * Retry the request animation frame for ABTasty data research
 */
function retryResearch() {
	timerAbtastyData = setTimeout(() => requestAnimationFrame(checkAbtastyData), INTERVAL_IN_MS)
}

// Stop the research after a delay
const timeout = setTimeout(() => {
	window.cancelAnimationFrame(checkAbtastyData)
	clearTimeout(timerAbtastyData)
	clearTimeout(timeout)
	!counterIsUpdated && isAbtastyReady() && updateBadge()
}, TIME_OUT_IN_MS)

/**
 * Send data from the ABTasty object to the service worker
 * @param {Object} e Event data
 */
document.addEventListener('abtastyDebugger::getData', () => {
	document.dispatchEvent(
		new window.CustomEvent('abtastyDebugger::sendData', {
			detail: {
				abtastyData: JSON.stringify(window[ABTASTY_NAME])
			}
		})
	)
})

/**
 * Clear ABTasty cookies
 * @param {Object} e Event data
 * {@Link https://developers.abtasty.com/docs/tag/tag-window-abtasty#clearallcookies}
 */
document.addEventListener('abtastyDebugger::clearCookie', () => {
	window.ABTasty.clearAllCookies()
	window.localStorage.removeItem(ABTASTY_NAME)
	window.sessionStorage.removeItem('ABTastyForcedVariations')
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
