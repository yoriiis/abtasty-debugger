import { createElement, Fragment } from 'jsx-dom'
import externalLink from 'shared/assets/svgs/external-link.svg'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import Targeting from 'shared/targeting/assets/scripts/targeting'

export default function ({ data, id }) {
	const urlScope = data.targetings.targetPages.url_scope
	const codeScope = data.targetings.targetPages.code_scope
	const selectorScope = data.targetings.targetPages.selector_scope
	const cookieScope = data.targetings.qaParameters.cookie_scope
	const ipScope = data.targetings.qaParameters.ip_scope
	return (
		<>
			<div data-route-id="view">
				<div className="view">
					<a href="#list" className="view-backLink linkWithIcon iconLeft">
						<div className="view-backLinkIcon" innerHTML={arrowBottom}></div>
						Back to the list
					</a>
					<ul className="view-list">
						<li>ID: {id}</li>
						<li>Type: {data.type}</li>
					</ul>
					<a
						href={`https://app2.abtasty.com/edit/test/${id}/audience`}
						target="_blank"
						without
						rel="noreferrer"
						className="view-linkDashboard linkWithIcon iconRight"
					>
						Edit the test on AB Tasty dashboard
						<div className="view-linkIcon" innerHTML={externalLink}></div>
					</a>
					{urlScope && <Targeting mainStatus={data.status} title="URL" data={urlScope} />}
					{selectorScope && (
						<Targeting mainStatus={data.status} title="Selector" data={selectorScope} />
					)}
					{codeScope && (
						<Targeting
							mainStatus={data.status}
							title="Code"
							data={codeScope}
							textarea={true}
						/>
					)}
					{cookieScope && (
						<Targeting mainStatus={data.status} title="Cookie" data={cookieScope} />
					)}
					{ipScope && (
						<Targeting
							mainStatus={data.status}
							title="Ip"
							data={ipScope}
							headerOnly={true}
						/>
					)}
				</div>
			</div>
		</>
	)
}
