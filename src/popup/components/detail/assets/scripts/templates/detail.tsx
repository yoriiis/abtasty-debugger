import { createElement, Fragment } from 'jsx-dom'
import externalLink from 'shared/assets/svgs/external-link.svg'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import chart from 'shared/assets/svgs/chart.svg'
import TargetingTemplate from 'shared/targeting/assets/scripts/targeting'
import VariationTemplate from 'shared/variation/assets/scripts/variation'
import TrackingTemplate from 'shared/tracking/assets/scripts/tracking'
import CollapseTemplate from 'shared/collapse/assets/scripts/collapse'
import { Targeting, DetailData } from 'shared/assets/interfaces/interfaces'

/**
 * Detail template
 * @param {Object} options Template options
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ data }: { data: DetailData }) {
	const hasVariation =
		!!data.test.asyncVariationInfoById && Object.keys(data.test.asyncVariationInfoById).length
	const hasTracking = !!data.test.actionTrackings && Object.keys(data.test.actionTrackings).length
	const templateGeneral = (
		<ul className="detail-list" data-status={data.result.status}>
			<li>
				ID: {data.testId}&nbsp;
				{data.test.parentID !== 0 && <>(parent ID: {data.test.parentID})</>}
			</li>
			<li>Status: {data.result.status}</li>
			<li>Type: {data.result.type}</li>
			<li>Targeting mode: {data.test.targetingMode}</li>
			<li>Async: {data.test.isAsync ? 'true' : 'false'}</li>
			<li>Traffic: {data.test.traffic}%</li>
		</ul>
	)
	const templateTargeting = (
		<>
			{data.targetingSorted.rejected.map((item: Targeting) => (
				<TargetingTemplate
					testStatus={data.result.status}
					targeting={item}
					textarea={item.key === 'code_scope'}
					headerOnly={item.key === 'ip_scope'}
				/>
			))}
			{data.targetingSorted.accepted.map((item: Targeting) => (
				<TargetingTemplate
					testStatus={data.result.status}
					targeting={item}
					textarea={item.key === 'code_scope'}
					headerOnly={item.key === 'ip_scope'}
				/>
			))}
		</>
	)
	return (
		<div className="detail">
			<ul className="detail-header">
				<li>
					<a href="#/" className="detail-headerBack">
						<div className="detail-headerLinkIcon" innerHTML={arrowBottom}></div>
						Back
					</a>
				</li>
				<li>
					<a
						href={`https://app2.abtasty.com/reporting/test/${data.testId}/report`}
						target="_blank"
						rel="noreferrer"
						className="detail-headerReport"
					>
						See the report
						<div className="detail-headerLinkIcon" innerHTML={chart}></div>
					</a>
				</li>
			</ul>

			<h1 className="detail-title">{data.result.name}</h1>
			<div className="detail-section">
				<CollapseTemplate header="General" content={templateGeneral} />
				{['accepted', 'traffic_rejected'].includes(data.result.status) && hasVariation && (
					<VariationTemplate
						variations={data.test.asyncVariationInfoById}
						currentVariationId={data.result.variationID}
						testId={data.testId}
					/>
				)}
				{hasTracking && <TrackingTemplate trackings={data.test.actionTrackings} />}
			</div>

			<div className="detail-section last">
				<h2 className="detail-subtitle">
					Targeting
					<a
						href={`https://app2.abtasty.com/edit/test/${data.testId}/audience`}
						target="_blank"
						rel="noreferrer"
						className="detail-subtitleLink"
					>
						<div className="detail-subtitleIcon" innerHTML={externalLink}></div>
					</a>
				</h2>
				{templateTargeting}
			</div>
		</div>
	)
}
