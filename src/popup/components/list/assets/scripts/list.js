import { createElement } from 'jsx-dom'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import Badge from 'shared/badge/assets/scripts/badge'

/**
 * List template
 * @param {Object} options
 * @param {Object} options.data List data
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ data }) {
	return (
		<div data-route-id="list">
			<ul className="list" data-route-id="list">
				{data.accepted.map((item) => (
					<List data={item} />
				))}
				{data.rejected.map((item) => (
					<List data={item} />
				))}
			</ul>
		</div>
	)
}

/**
 * List item template
 * @param {Object} options
 * @param {Object} options.data List item data
 * @returns {HTMLElement} Generated HTML
 */
function List({ data }) {
	return (
		<li className="list-item">
			<a href={`#view/${data.key}`} className="list-link">
				<span className="list-name">{data.name}</span>
				<Badge status={data.status} />
				<div className="list-icon" innerHTML={arrowBottom}></div>
			</a>
		</li>
	)
}
