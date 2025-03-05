import { navigate } from 'costro'
import type { ListData, Result } from 'shared/assets/definitions/types.js'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import check from 'shared/assets/svgs/check.svg'
import clear from 'shared/assets/svgs/clear.svg'
import BadgeTemplate from 'shared/badge/assets/scripts/badge.js'

/**
 * List template
 * @param {Object} options Template options
 * @returns {HTMLElement} Generated HTML
 */
export default function ListTemplate({ testsSortedByStatus, debug }: ListData) {
	return (
		<div className="list">
			<div className="list-nav">
				<ul className="list-navList">
					<li className="list-navItem">
						<button type="button" className="list-navItemButton clearCookies">
							<div className="list-navItemButtonIcon" innerHTML={clear} />
							Reset cookies
						</button>
					</li>
					<li className="list-navItem checkbox">
						<div className="customCheckbox">
							<input
								type="checkbox"
								value={debug ? 'true' : 'false'}
								className="customCheckbox-input"
								id="debugMode"
								name="debug"
								checked={debug}
							/>
							<span className="customCheckbox-round">
								<div className="customCheckbox-roundIcon" innerHTML={check} />
							</span>
						</div>
						<label
							htmlFor="debugMode"
							className="list-navItemLabel"
							title="See DevTools > Console for debug logs">
							Debug
						</label>
					</li>
				</ul>
			</div>
			<ul>
				{testsSortedByStatus.accepted.map((item: Result) => (
					<ListItem data={item} />
				))}
				{testsSortedByStatus.rejected.map((item: Result) => (
					<ListItem data={item} />
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
function ListItem({ data }: { data: Result }) {
	return (
		<li className="list-item">
			<button type="button" onClick={() => navigate(`/detail/${data.key}`)} className="list-link">
				<span className="list-name">{data.name}</span>
				{typeof data.status === 'string' && (
					<BadgeTemplate text={data.status} color={data.status === 'accepted' ? 'green' : 'red'} />
				)}
				<div className="list-icon" innerHTML={arrowBottom} />
			</button>
		</li>
	)
}
