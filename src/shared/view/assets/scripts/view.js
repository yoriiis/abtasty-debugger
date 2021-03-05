import { createElement } from 'jsx-dom'
import externalLink from 'shared/assets/svgs/external-link.svg'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import Targeting from 'shared/targeting/assets/scripts/targeting'

export default function ({ id, result, test }) {
	const {
		url_scope: urlScope,
		code_scope: codeScope,
		selector_scope: selectorScope
	} = result.targetings.targetPages
	const { cookie_scope: cookieScope, ip_scope: ipScope } = result.targetings.qaParameters
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
							Edit on AB Tasty dashboard
							<div
								className="view-headerDashboardIcon"
								innerHTML={externalLink}
							></div>
						</a>
					</li>
				</ul>
				<ul className="view-list">
					<li>Test ID: {id}</li>
					<li>Test type: {result.type}</li>
					{result.variationID && <li>Variation ID: {result.variationID}</li>}
					{result.variationName && <li>Variation name: {result.variationName}</li>}
					<li>Ajax targeting: {test.targetingMode === 'waituntil' ? 'on' : 'off'}</li>
				</ul>
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
