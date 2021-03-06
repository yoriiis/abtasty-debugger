import { createElement } from 'jsx-dom'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import BadgeTemplate from 'shared/badge/assets/scripts/badge'
import { TestsSortedByStatus, Test } from 'shared/assets/interfaces/interfaces'

/**
 * List template
 * @param {Object} options
 * @param {Object} options.data List data
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ data }: {data: TestsSortedByStatus}) {
	return (
		<div data-route-id="list">
			<ul className="list" data-route-id="list">
				{data.accepted.map((item: Test) => (
					<List data={item} />
				))}
				{data.rejected.map((item: Test) => (
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
function List({ data }: {data: Test}) {
	return (
		<li className="list-item">
			<a href={`#detail/${data.key}`} className="list-link">
				<span className="list-name">{data.name}</span>
				<BadgeTemplate status={data.status} />
				<div className="list-icon" innerHTML={arrowBottom}></div>
			</a>
		</li>
	)
}
