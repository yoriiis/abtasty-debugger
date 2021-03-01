export default function (target, action = false, callback = () => {}) {
	const computedStyles = window.getComputedStyle(target)
	const animationDuration = parseFloat(computedStyles.transitionDuration)
	const animationDurationMs = animationDuration * 1000
	const currentDisplay = computedStyles.display
	let heightTarget = null
	const delay = 100

	if (animationDuration === 0) {
		console.warn(
			'slideToggle use only CSS Transition to animate the height, the target does not have'
		)
	}

	target.style.overflow = 'hidden'

	if (currentDisplay === 'none' && (action === 'open' || action === false)) {
		open()
	} else if (
		(currentDisplay === '' || currentDisplay === 'block') &&
		(action === 'close' || action === false)
	) {
		close()
	}

	function open() {
		target.style.height = 'auto'
		target.style.display = 'block'
		heightTarget = target.offsetHeight
		target.style.height = 0

		// Trigger CSS animation
		setTimeout(() => {
			target.style.height = `${heightTarget}px`
		}, delay)

		// Callback CSS animation
		setTimeout(() => {
			callback()
		}, animationDurationMs + delay)
	}

	function close() {
		target.style.height = `${target.offsetHeight}px`

		// Trigger CSS animation
		setTimeout(() => {
			target.style.height = 0
		}, delay)

		// Callback CSS animation
		setTimeout(() => {
			target.style.height = 'auto'
			target.style.display = 'none'
			callback()
		}, animationDurationMs + delay)
	}
}
