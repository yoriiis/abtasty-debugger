import { createElement, Fragment } from 'jsx-dom'
import externalLink from 'shared/assets/svgs/external-link.svg'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import TargetingTemplate from 'shared/targeting/assets/scripts/targeting'
import VariationTemplate from 'shared/variation/assets/scripts/variation'
import CollapseTemplate from 'shared/collapse/assets/scripts/collapse'
import { Targeting, DetailData } from 'shared/assets/interfaces/interfaces'

/**
 * Detail template
 * @param {Object} options Template options
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ data }: { data: DetailData }) {
	const hasVariation =
		data.test.asyncVariationInfoById && Object.keys(data.test.asyncVariationInfoById).length
	const templateConfig = (
		<ul className="detail-list">
			<li>Id: {data.testId}</li>
			<li>Type: {data.result.type}</li>
			<li>Targeting mode: {data.test.targetingMode}</li>
			<li>Async: {data.test.isAsync ? 'true' : 'false'}</li>
			{data.test.parentID !== 0 && <li>Parent ID: {data.test.parentID}</li>}
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
						<div className="detail-headerDashboardIcon" innerHTML={externalLink}></div>
					</a>
				</li>
			</ul>
			<h1 className="detail-title">{data.result.name} </h1>
			<CollapseTemplate header="Config" content={templateConfig} />
			<CollapseTemplate header="Targeting" content={templateTargeting} />

			{data.result.status === 'accepted' && hasVariation && (
				<VariationTemplate
					testId={data.testId}
					variations={data.test.asyncVariationInfoById}
					identifier={data.identifier}
					variationActive={data.result.variationID}
				/>
			)}
		</div>
	)
}
