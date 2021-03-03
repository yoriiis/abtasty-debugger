import { createElement, Fragment } from 'jsx-dom'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import scope from './scope'

export default function ({ data }) {
	return (
		<>
			{data === null ? (
				<div className="empty">No tests available on this page</div>
			) : (
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
											{result.status}
										</span>
										<span className="resultsList-itemName">{result.name}</span>
										<div
											className="resultsList-itemIcons"
											innerHTML={arrowBottom}
										></div>
									</button>
									<div className="resultsList-itemDetails">
										<ul className="resultsList-itemDetailList">
											<li>Id: {key}</li>
											<li>Type: {result.type}</li>
										</ul>
										{urlScope && scope({ title: 'URL', data: urlScope })}
										{selectorScope &&
											scope({ title: 'Selector', data: selectorScope })}
										{codeScope && scope({ title: 'Code', data: codeScope })}
										{cookieScope &&
											scope({
												title: 'Cookie',
												data: cookieScope,
												statusOnly: true
											})}
										{ipScope &&
											scope({ title: 'Ip', data: ipScope, statusOnly: true })}
									</div>
								</li>
							</>
						)
					})}
				</ul>
			)}
		</>
	)
}
