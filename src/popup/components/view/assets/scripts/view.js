import { createElement, Fragment } from 'jsx-dom'
import externalLink from 'shared/assets/svgs/external-link.svg'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import Targeting from 'shared/targeting/assets/scripts/targeting'
import wording from 'shared/utils/wording'

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
						mainStatus={result.status}
						name={wording(item.key)}
						data={item}
						textarea={item.key === 'code_scope'}
						headerOnly={item.key === 'ip_scope'}
					/>
				))}
				{targetingSorted.accepted.map((item) => (
					<Targeting
						mainStatus={result.status}
						name={wording(item.key)}
						data={item}
						textarea={item.key === 'code_scope'}
						headerOnly={item.key === 'ip_scope'}
					/>
				))}
			</div>
		</div>
	)
}
