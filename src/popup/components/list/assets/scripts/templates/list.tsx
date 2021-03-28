import { createElement } from 'jsx-dom'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import BadgeTemplate from 'shared/badge/assets/scripts/badge'
import { ListData, Result } from 'shared/assets/interfaces/interfaces'

/**
 * List template
 * @param {Object} options Template options
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ data }: { data: ListData }) {
	return (
		<ul className="list" data-route-id="list">
			{data.testsSortedByStatus.accepted.map((item: Result) => (
				<ListItem data={item} />
			))}
			{data.testsSortedByStatus.rejected.map((item: Result) => (
				<ListItem data={item} />
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
function ListItem({ data }: { data: Result }) {
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
