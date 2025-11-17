import type { Tracking, Trackings } from 'shared/assets/definitions/types.js'
import CollapseTemplate from 'shared/collapse/assets/scripts/collapse.js'

/**
 * Template of trackings list
 * @param options
 * @param options.trackings Trackins list
 * @returns Generated HTML
 */
export default function TrackingTemplate({ trackings }: { trackings: Trackings }) {
	const content = (
		<div className="tracking">
			<ul className="tracking-list">
				{Object.entries(trackings).map(
					([type, trackingsByType]: [type: string, trackingsByType: Tracking[]]) => {
						return (
							<li className="tracking-listItem">
								<span className="tracking-type">{type}</span>
								<table className="table">
									<tbody>
										{trackingsByType.map((tracking: Tracking) => {
											return (
												<tr>
													<td>
														<span className="tracking-name">{tracking.name}</span>
													</td>
													<td>
														<span className="tracking-selector">
															<input
																className="input"
																disabled
																type="text"
																value={tracking.selector}
																title={tracking.selector}
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
