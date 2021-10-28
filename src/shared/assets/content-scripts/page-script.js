const ABTASTY_NAME = 'ABTasty'
const INTERVAL_IN_MS = 1000
const TIME_OUT_IN_MS = INTERVAL_IN_MS * 60

// Search the ABTasty object in interval
// Interval is automatically clear when the data is found
const intervalSearchScript = window.setInterval(() => {
	if (typeof window[ABTASTY_NAME] !== 'undefined') {
		sendData(window[ABTASTY_NAME])

		const pendingTests = searchPendingTests(window[ABTASTY_NAME])
		// Check if pending tests are found
		if (pendingTests.length) {
			// Search the pendings tests in interval
			const intervalPendingTests = window.setInterval(() => {
				const pendingTests = searchPendingTests(window[ABTASTY_NAME])

				// If no pending tests, send the new ABTasty object and clear the interval
				if (pendingTests.length === 0) {
					clearInterval(intervalPendingTests)
					sendData(window[ABTASTY_NAME])
				}
			}, INTERVAL_IN_MS)
		}

		clearInterval(intervalSearchScript)
	}
}, INTERVAL_IN_MS)

// Stop the research after a delay
const timeout = setTimeout(() => {
	clearInterval(intervalSearchScript)
	clearTimeout(timeout)
}, TIME_OUT_IN_MS)

/**
 * Search pending tests in the ABTasty object
 * @param {Object} data ABTasty object
 * @returns {Array} List of pending tests
 */
function searchPendingTests(data) {
	const tests = data.accountData.tests
	const results = data.results
	return Object.keys(tests).filter(
		(testId) =>
			(tests[testId].targetingMode === 'waituntil' && tests[testId].status === 'pending') ||
			(tests[testId].isAsync && results[testId].status === undefined)
	)
}

/**
 * Send data from the ABTasty object to the service worker
 * @param {Object} data ABTasty object
 */
function sendData(data) {
	document.dispatchEvent(
		new window.CustomEvent('sendABTastyObject', {
			detail: {
				ABTastyData: JSON.stringify(data || null)
			}
		})
	)
}

document.addEventListener('setVariation', (e) => {
	Function(e.detail.data)()
})
