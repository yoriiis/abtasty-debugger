import { createElement, Fragment } from 'jsx-dom'
import warning from 'shared/assets/svgs/warning.svg'

export default function () {
	return (
		<>
			<div className="empty">
				<div className="empty-icon" innerHTML={warning}></div>
				<p className="empty-text">
					No tests available on this page
					<br />
					or the AB Tasty script is not available
				</p>
				<a href="#list" className="empty-reloadButton">
					Refresh
				</a>
			</div>
		</>
	)
}
