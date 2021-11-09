import { createElement } from 'jsx-dom'
import info from 'shared/assets/svgs/info.svg'

/**
 * Empty template
 * @returns {HTMLElement} Generated HTML
 */
export default function (): any {
	return (
		<div className="empty">
			<div className="empty-icon" innerHTML={info}></div>
			<p className="empty-text">No tests available on the current page.</p>
			<button className="empty-retryButton">Try again</button>
		</div>
	)
}
