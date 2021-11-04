import { createElement, Fragment } from 'jsx-dom'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import BadgeTemplate from 'shared/badge/assets/scripts/badge'
import { ListData, Result } from 'shared/assets/interfaces/interfaces'
import debug from 'shared/assets/svgs/debug.svg'

/**
 * List template
 * @param {Object} options Template options
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ data }: { data: ListData }) {
	return (
		<>
			<div className="list">
				<ul>
					{data.testsSortedByStatus.accepted.map((item: Result) => (
						<ListItem data={item} />
					))}
					{data.testsSortedByStatus.rejected.map((item: Result) => (
						<ListItem data={item} />
					))}
				</ul>
				<div className="list-footer">
					<button className={`list-footerDebugButton${data.debug ? ' active' : ''}`}>
						<span className="list-footerDebugName">Debug</span>
						<div className="list-footerDebugIcon" innerHTML={debug}></div>
					</button>
				</div>
			</div>
		</>
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
				{typeof data.status === 'string' && (
					<BadgeTemplate
						text={data.status}
						color={data.status === 'accepted' ? 'green' : 'red'}
					/>
				)}
				<div className="list-icon" innerHTML={arrowBottom}></div>
			</a>
		</li>
	)
}
