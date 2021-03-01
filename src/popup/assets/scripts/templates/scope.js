import { createElement, Fragment } from 'jsx-dom'

export default function (name, scope) {
	return (
		<>
			<section className="scope">
				<span className="scope-name">
					{name} scope: {scope.success ? 'true' : 'false'}
				</span>
				{name !== 'Ip' && (
					<table className="scope-table">
						<thead>
							<tr>
								<th>Status</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody>
							{scope.conditions.map((item) => {
								return (
									<>
										<tr>
											<td>{item.include ? 'true' : 'false'}</td>
											<td>
												{name === 'Code' ? (
													<textarea className="textarea" disabled>
														{item.value}
													</textarea>
												) : (
													<input
														className="input"
														disabled
														type="text"
														value={item.value}
													/>
												)}
											</td>
										</tr>
									</>
								)
							})}
						</tbody>
					</table>
				)}
			</section>
		</>
	)
}
