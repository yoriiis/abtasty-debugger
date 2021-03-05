import { createElement } from 'jsx-dom'
import Badge from 'shared/badge/assets/scripts/badge'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'

export default function ({ name, mainStatus, data, headerOnly = false, textarea = false }) {
	return (
		<section className={`targeting${headerOnly ? ' headerOnly' : ''}`}>
			<div className="targeting-header">
				<button className="targeting-headerButton">
					<span className="targeting-name">{name} targeting</span>
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
								let value = item.value
								if (data.key === 'cookie_scope') {
									value = `${item.name}=${item.value}`
								}

								return (
									<tr>
										{typeof item.include !== 'undefined' && (
											<td>{item.include ? 'Include' : 'Exclude'}</td>
										)}
										<td>
											{textarea ? (
												<textarea className="textarea" disabled>
													{value}
												</textarea>
											) : (
												<input
													className="input"
													disabled
													type="text"
													value={value}
												/>
											)}
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			)}
		</section>
	)
}
