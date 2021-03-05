import { createElement } from 'jsx-dom'
import externalLink from 'shared/assets/svgs/external-link.svg'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import Targeting from 'shared/targeting/assets/scripts/targeting'

export default function ({ id, result, test }) {
	const urlScope = result.targetings.targetPages.url_scope
	const codeScope = result.targetings.targetPages.code_scope
	const selectorScope = result.targetings.targetPages.selector_scope
	const cookieScope = result.targetings.qaParameters.cookie_scope
	const ipScope = result.targetings.qaParameters.ip_scope
	return (
		<div data-route-id="view">
			<div className="view">
				<a href="#list" className="view-backLink">
					<div className="view-backLinkIcon" innerHTML={arrowBottom}></div>
					Back to the list
				</a>
				<ul className="view-list">
					<li>Test ID: {id}</li>
					<li>Test type: {result.type}</li>
					<li>Variation ID: {result.variationID}</li>
					<li>Variation name: {result.variationName}</li>
					<li>Targeting mode: {test.targetingMode}</li>
				</ul>
				<a
					href={`https://app2.abtasty.com/edit/test/${id}/audience`}
					target="_blank"
					without
					rel="noreferrer"
					className="view-linkDashboard"
				>
					Edit the test on AB Tasty dashboard
					<div className="view-linkDashboardIcon" innerHTML={externalLink}></div>
				</a>
				{urlScope && <Targeting mainStatus={result.status} name="URL" data={urlScope} />}
				{selectorScope && (
					<Targeting mainStatus={result.status} name="Selector" data={selectorScope} />
				)}
				{codeScope && (
					<Targeting
						mainStatus={result.status}
						name="Code"
						data={codeScope}
						textarea={true}
					/>
				)}
				{cookieScope && (
					<Targeting mainStatus={result.status} name="Cookie" data={cookieScope} />
				)}
				{ipScope && (
					<Targeting
						mainStatus={result.status}
						name="Ip"
						data={ipScope}
						headerOnly={true}
					/>
				)}
			</div>
		</div>
	)
}
