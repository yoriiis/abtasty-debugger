import { createElement } from 'jsx-dom'
import CollapseTemplate from 'shared/collapse/assets/scripts/collapse'
import { Trackings, Tracking } from 'shared/assets/interfaces/interfaces'

/**
 * Template of trackings list
 * @param {Object} options
 * @param {String} options.trackings Trackins list
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ trackings }: { trackings: Trackings }) {
	const content = (
		<div className="tracking">
			<ul className="tracking-list">
				{Object.entries(trackings).map(
					([type, trackingsByType]: [type: string, trackingsByType: Array<Tracking>]) => {
						return (
							<li className="tracking-listItem">
								<span className="tracking-type">{type}</span>
								<table className="tracking-table">
									<tbody>
										{trackingsByType.map((tracking: Tracking) => {
											return (
												<tr>
													<td>
														<span className="tracking-name">
															{tracking.name}
														</span>
													</td>
													<td>
														<span className="tracking-selector">
															<input
																className="input"
																disabled
																type="text"
																value={tracking.selector}
															/>
														</span>
													</td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</li>
						)
					}
				)}
			</ul>
		</div>
	)
	return <CollapseTemplate header="Trackings" content={content} />
}
