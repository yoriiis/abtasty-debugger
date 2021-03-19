import { createElement, Fragment } from 'jsx-dom'
import externalLink from 'shared/assets/svgs/external-link.svg'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import TargetingTemplate from 'shared/targeting/assets/scripts/targeting'
import { Targeting, DetailData } from 'shared/assets/interfaces/interfaces'

/**
 * Detail template
 * @param {Object} options Template options
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ data }: {data: DetailData}) {
	return (
		<div className="detail">
			<ul className="detail-header">
				<li>
					<a href="#/" className="detail-headerBack">
						<div className="detail-headerBackIcon" innerHTML={arrowBottom}></div>
							Back
					</a>
				</li>
				<li>
					<a
						href={`https://app2.abtasty.com/edit/test/${data.testId}/audience`}
						target="_blank"
						rel="noreferrer"
						className="detail-headerDashboard"
					>
							Edit on AB Tasty
						<div
							className="detail-headerDashboardIcon"
							innerHTML={externalLink}
						></div>
					</a>
				</li>
			</ul>
			<ul className="detail-list">
				<li>Name: {data.result.name}</li>
				<li>
                    ID: {data.testId}
					{data.test.parentID !== 0 && <> (parent ID: {data.test.parentID})</>}
				</li>
				<li>Type: {data.result.type}</li>
				{data.result.variationName && (
					<li>
						Variation: {data.result.variationName}
						{data.result.variationID && <> ({data.result.variationID})</>}
					</li>
				)}
				<li>Ajax targeting: {data.targetingMode === 'waituntil' ? 'on' : 'off'}</li>
			</ul>

			{data.targetingSorted.rejected.map((item: Targeting) => (
				<TargetingTemplate
					testStatus={data.result.status}
					data={item}
					textarea={item.key === 'code_scope'}
					headerOnly={item.key === 'ip_scope'}
				/>
			))}
			{data.targetingSorted.accepted.map((item: Targeting) => (
				<TargetingTemplate
					testStatus={data.result.status}
					data={item}
					textarea={item.key === 'code_scope'}
					headerOnly={item.key === 'ip_scope'}
				/>
			))}
		</div>
	)
}
