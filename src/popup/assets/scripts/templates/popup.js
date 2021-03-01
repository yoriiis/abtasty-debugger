import { createElement, Fragment } from 'jsx-dom'

export default function ({ results }) {
	return (
		<>
			<ul className="resultsList">
				{Object.keys(results).map((key, index) => {
					const result = results[key]
					const urlScope = result.targetings.targetPages.url_scope
					const codeScope = result.targetings.targetPages.code_scope
					const selectorScope = result.targetings.targetPages.selector_scope
					return (
						<>
							<li className="resultsList-item">
								<button className="resultsList-itemButton">
									{key} - {result.name}
								</button>
								<div className="resultsList-itemDetails">
									<strong>Status</strong> {result.status}
									{urlScope && (
										<div className="resultsList-itemUrlScope">
											<strong>Url scope</strong>:{' '}
											{urlScope.sucess ? 'TRUE' : 'FALSE'}
											<ul>
												{urlScope.conditions.map((url) => {
													return (
														<>
															<li>
																{url.include ? 'TRUE' : 'FALSE'} -
																&nbsp;
																{url.value}
															</li>
														</>
													)
												})}
											</ul>
										</div>
									)}
									{selectorScope && (
										<div className="resultsList-itemUrlScope">
											<strong>Selector scope</strong>:{' '}
											{selectorScope.sucess ? 'TRUE' : 'FALSE'}
											<ul>
												{selectorScope.conditions.map((url) => {
													return (
														<>
															<li>
																{url.include ? 'TRUE' : 'FALSE'} -
																&nbsp;
																{url.value}
															</li>
														</>
													)
												})}
											</ul>
										</div>
									)}
									{codeScope && (
										<div className="resultsList-itemCodeScope">
											<strong>Code scope</strong>
											{codeScope.sucess}
											<ul>
												{codeScope.conditions.map((url) => {
													return (
														<>
															<li>
																<textarea
																	className="resultsList-itemTextarea"
																	disabled
																>
																	{url.value}
																</textarea>
															</li>
														</>
													)
												})}
											</ul>
										</div>
									)}
								</div>
							</li>
						</>
					)
				})}
			</ul>
		</>
	)
}
