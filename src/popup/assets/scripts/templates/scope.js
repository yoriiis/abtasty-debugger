import { createElement, Fragment } from 'jsx-dom'

export default function ({ title, data, statusOnly }) {
	return (
		<>
			<section className="scope">
				<div className="scope-header">
					<span className="scope-title">{title} targeting</span>
					<span className="scope-status">Success: {data.success ? 'TRUE' : 'FALSE'}</span>
				</div>
				{!statusOnly && (
					<div className="scope-content">
						<table className="scope-table">
							<thead>
								<tr>
									<th>Success</th>
									<th>Value</th>
								</tr>
							</thead>
							<tbody>
								{data.conditions.map((item) => {
									return (
										<>
											<tr>
												<td>{item.include ? 'TRUE' : 'FALSE'}</td>
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
					</div>
				)}
			</section>
		</>
	)
}
