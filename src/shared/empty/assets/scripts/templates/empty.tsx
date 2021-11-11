import { createElement } from 'jsx-dom'
import notFOund from 'shared/assets/svgs/not-found.svg'

/**
 * Empty template
 * @returns {HTMLElement} Generated HTML
 */
export default function (): any {
	return (
		<div className="empty">
			<div className="empty-icon" innerHTML={notFOund}></div>
			<p className="empty-text">AB Tasty was not found on the page</p>
			<button className="empty-retryButton">Try again</button>
		</div>
	)
}
