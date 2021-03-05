import { createElement, Fragment } from 'jsx-dom'
import externalLink from 'shared/assets/svgs/external-link.svg'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import Targeting from 'shared/targeting/assets/scripts/targeting'

/**
 * View template
 * @param {Object} options
 * @param {String} options.id Test id
 * @param {StriObjectng} options.result Test data
 * @param {Object} options.targetingSorted Test data sorted by accepted and
 * @param {String} options.targetingMode Targeting mode (fastest|waituntil)
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ id, result, targetingSorted, targetingMode }) {
	return (
		<div data-route-id="view">
			<div className="view">
				<ul className="view-header">
					<li>
						<a href="#list" className="view-headerBack">
							<div className="view-headerBackIcon" innerHTML={arrowBottom}></div>
							Back
						</a>
					</li>
					<li>
						<a
							href={`https://app2.abtasty.com/edit/test/${id}/audience`}
							target="_blank"
							without
							rel="noreferrer"
							className="view-headerDashboard"
						>
							Edit on AB Tasty
							<div
								className="view-headerDashboardIcon"
								innerHTML={externalLink}
							></div>
						</a>
					</li>
				</ul>
				<ul className="view-list">
					<li>ID: {id}</li>
					<li>Type: {result.type}</li>
					{result.variationName && (
						<li>
							Variation: {result.variationName}{' '}
							{result.variationID && <>({result.variationID})</>}
						</li>
					)}
					<li>Ajax targeting: {targetingMode === 'waituntil' ? 'on' : 'off'}</li>
				</ul>

				{targetingSorted.rejected.map((item) => (
					<Targeting
						testStatus={result.status}
						key={item.key}
						data={item}
						textarea={item.key === 'code_scope'}
						headerOnly={item.key === 'ip_scope'}
					/>
				))}
				{targetingSorted.accepted.map((item) => (
					<Targeting
						testStatus={result.status}
						key={item.key}
						data={item}
						textarea={item.key === 'code_scope'}
						headerOnly={item.key === 'ip_scope'}
					/>
				))}
			</div>
		</div>
	)
}
