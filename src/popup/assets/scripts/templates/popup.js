import { createElement, Fragment } from 'jsx-dom'
import svg from 'shared/utils/svg'
import scope from './scope'

export default function ({ data }) {
	return (
		<>
			<ul className="resultsList">
				{Object.keys(data.results).map((key, index) => {
					const result = data.results[key]
					const isLive = result.status === 'accepted'
					const urlScope = result.targetings.targetPages.url_scope
					const codeScope = result.targetings.targetPages.code_scope
					const selectorScope = result.targetings.targetPages.selector_scope
					const cookieScope = result.targetings.qaParameters.cookie_scope
					const ipScope = result.targetings.qaParameters.ip_scope

					return (
						<>
							<li
								className={`resultsList-item${index === 0 ? ' active' : ''}${
									isLive ? ' live' : ''
								}`}
							>
								<button className="resultsList-itemButton">
									<span className="resultsList-itemStatus">
										{isLive ? 'Live' : 'Paused'}
									</span>
									<span className="resultsList-itemName">{result.name}</span>
									<div className="resultsList-itemIcons">
										{svg('arrow-bottom')}
									</div>
								</button>
								<div className="resultsList-itemDetails">
									<span className="resultsList-itemDetailsField">Id: {key}</span>
									<span className="resultsList-itemDetailsField">
										Type: {result.type}
									</span>
									<span className="resultsList-itemDetailsField last">
										Visitor id: {data.visitor.id}
									</span>
									{urlScope && scope('Url', urlScope)}
									{selectorScope && scope('Selector', selectorScope)}
									{codeScope && scope('Code', codeScope)}
									{cookieScope && scope('Cookie', cookieScope)}
									{ipScope && scope('Ip', ipScope)}
								</div>
							</li>
						</>
					)
				})}
			</ul>
		</>
	)
}
