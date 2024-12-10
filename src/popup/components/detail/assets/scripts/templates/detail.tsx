import { navigate } from 'costro'
import type { DetailData, Targeting } from 'shared/assets/definitions/types'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import externalLink from 'shared/assets/svgs/external-link.svg'
import CollapseTemplate from 'shared/collapse/assets/scripts/collapse'
import TargetingTemplate from 'shared/targeting/assets/scripts/targeting'
import TrackingTemplate from 'shared/tracking/assets/scripts/tracking'
import VariationTemplate from 'shared/variation/assets/scripts/variation'

/**
 * Detail template
 * @param {Object} options Template options
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ testId, identifier, test, result, targetingSorted }: DetailData) {
	const hasVariation =
		!!test.asyncVariationInfoById && Object.keys(test.asyncVariationInfoById).length
	const hasTracking = !!test.actionTrackings && Object.keys(test.actionTrackings).length
	const templateGeneral = (
		<ul className="detail-list" data-status={result.status}>
			<li>
				ID: {testId}
				{test.parentID !== 0 && (
					<span className="detail-listParentId">(parent ID: {test.parentID})</span>
				)}
			</li>
			<li>Status: {result.status}</li>
			<li>Type: {result.type}</li>
			<li>Async: {test.isAsync ? 'true' : 'false'}</li>
			<li>Traffic: {test.traffic}%</li>
		</ul>
	)
	const templateTargeting = (
		<>
			{targetingSorted.rejected.map((item: Targeting) => (
				<TargetingTemplate
					targeting={item}
					textarea={item.key === 'code_scope'}
					headerOnly={['ip_scope', 'segment', 'trigger'].includes(item.key)}
				/>
			))}
			{targetingSorted.accepted.map((item: Targeting) => (
				<TargetingTemplate
					targeting={item}
					textarea={item.key === 'code_scope'}
					headerOnly={['ip_scope', 'segment', 'trigger'].includes(item.key)}
				/>
			))}
		</>
	)
	return (
		<div className="detail">
			<div className="detail-nav">
				<ul className="detail-navList">
					<li className="detail-navItem back">
						<button
							type="button"
							onClick={() => navigate('/list')}
							className="detail-navItemButton">
							<div className="detail-navItemButtonIcon" innerHTML={arrowBottom} />
							Back
						</button>
					</li>
					<li className="detail-navItem editor">
						<a
							href={`https://app2.abtasty.com/reporting/test/${testId}/editor`}
							target="_blank"
							rel="noreferrer"
							className="detail-navItemButton">
							Editor
						</a>
					</li>
					<li className="detail-navItem report">
						<a
							href={`https://app2.abtasty.com/reporting/test/${testId}/report`}
							target="_blank"
							rel="noreferrer"
							className="detail-navItemButton">
							Report
						</a>
					</li>
				</ul>
			</div>
			<h1 className="detail-title">{result.name}</h1>
			<div className="detail-section">
				<CollapseTemplate header="General" content={templateGeneral} />
				{['accepted', 'traffic_rejected'].includes(result.status) && hasVariation && (
					<VariationTemplate
						variations={test.asyncVariationInfoById}
						currentVariationId={result.variationID}
						testId={testId}
						accountId={identifier}
					/>
				)}
				{hasTracking && <TrackingTemplate trackings={test.actionTrackings} />}
			</div>

			<div className="detail-section last">
				<h2 className="detail-subtitle">
					Targeting
					<a
						href={`https://app2.abtasty.com/edit/test/${testId}/audience`}
						target="_blank"
						rel="noreferrer"
						className="detail-subtitleLink">
						<div className="detail-subtitleIcon" innerHTML={externalLink} />
					</a>
				</h2>
				{templateTargeting}
			</div>
		</div>
	)
}
