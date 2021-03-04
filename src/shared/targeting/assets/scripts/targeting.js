import { createElement, Fragment } from 'jsx-dom'
import Badge from 'shared/badge/assets/scripts/badge'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'

export default function ({ title, mainStatus, data, headerOnly = false, textarea = false }) {
	return (
		<>
			<section className={`targeting${headerOnly ? ' headerOnly' : ''}`}>
				<div className="targeting-header">
					<button className="targeting-headerButton">
						<span className="targeting-title">{title} targeting</span>
						<Badge status={data.success ? 'accepted' : mainStatus} />
						{!headerOnly && (
							<div className="targeting-headerIcon" innerHTML={arrowBottom}></div>
						)}
					</button>
				</div>
				{!headerOnly && (
					<div className="targeting-content">
						<table className="targeting-table">
							<tbody>
								{data.conditions.map((item) => {
									return (
										<>
											<tr>
												{typeof item.include !== 'undefined' && (
													<td>
														<Badge
															status={
																item.include
																	? 'accepted'
																	: 'rejected'
															}
															small={true}
														/>
													</td>
												)}
												<td>
													{textarea ? (
														<textarea className="textarea" disabled>
															{item.value}
														</textarea>
													) : (
														<input
															className="input"
															disabled
															type="text"
															value={item.name || item.value}
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
