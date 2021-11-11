import { createElement, Fragment } from 'jsx-dom'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import check from 'shared/assets/svgs/check.svg'
import clear from 'shared/assets/svgs/clear.svg'
import BadgeTemplate from 'shared/badge/assets/scripts/badge'
import { ListData, Result } from 'shared/assets/interfaces/interfaces'

/**
 * List template
 * @param {Object} options Template options
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ data }: { data: ListData }) {
	return (
		<>
			<div className="list">
				<div className="list-nav">
					<ul className="list-navList">
						<li className="list-navItem">
							<button className="list-navItemButton clearCookies">
								<div className="list-navItemButtonIcon" innerHTML={clear}></div>
								Clear AB Tasty cookies
							</button>
						</li>
						<li className="list-navItem">
							<label
								htmlFor="debugMode"
								className="list-navItemLabel"
								title="See DevTools > Console for debug logs"
							>
								Debug mode
							</label>
							<div className="customCheckbox">
								<input
									type="checkbox"
									value={data.debug ? 'true' : 'false'}
									className="customCheckbox-input"
									id="debugMode"
									name="debug"
									checked={data.debug}
								/>
								<span className="customCheckbox-round">
									<div
										className="customCheckbox-roundIcon"
										innerHTML={check}
									></div>
								</span>
							</div>
						</li>
					</ul>
				</div>
				<ul>
					{data.testsSortedByStatus.accepted.map((item: Result) => (
						<ListItem data={item} />
					))}
					{data.testsSortedByStatus.rejected.map((item: Result) => (
						<ListItem data={item} />
					))}
				</ul>
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
