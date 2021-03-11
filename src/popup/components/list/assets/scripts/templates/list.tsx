import { createElement } from 'jsx-dom'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import BadgeTemplate from 'shared/badge/assets/scripts/badge'
import { TestsSortedByStatus, Result } from 'shared/assets/interfaces/interfaces'

/**
 * List template
 * @param {Object} options
 * @param {Object} options.data List data
 * @returns {HTMLElement} Generated HTML
 */

interface ListData {
    testsSortedByStatus: TestsSortedByStatus;
}

export default function ({ data }: {data: ListData}) {
	return (
		<ul className="list" data-route-id="list">
			{data.testsSortedByStatus.accepted.map((item: Result) => (
				<List data={item} />
			))}
			{data.testsSortedByStatus.rejected.map((item: Result) => (
				<List data={item} />
			))}
		</ul>
	)
}

/**
 * List item template
 * @param {Object} options
 * @param {Object} options.data List item data
 * @returns {HTMLElement} Generated HTML
 */
function List({ data }: {data: Result}) {
	return (
		<li className="list-item">
			<a href={`#/detail/${data.key}`} className="list-link">
				<span className="list-name">{data.name}</span>
				<BadgeTemplate status={data.status} />
				<div className="list-icon" innerHTML={arrowBottom}></div>
			</a>
		</li>
	)
}
