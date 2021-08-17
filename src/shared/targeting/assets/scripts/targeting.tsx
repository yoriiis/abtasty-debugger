import { createElement } from 'jsx-dom'
import BadgeTemplate from 'shared/badge/assets/scripts/badge'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import wording from 'shared/utils/wording'
import { Targeting, Condition } from 'shared/assets/interfaces/interfaces'

/**
 * Targeting template
 * @param {Object} options
 * @param {String} options.testStatus Status of the test
 * @param {Object} options.data Targeting data
 * @param {Object} options.headerOnly Display the header only, without content
 * @param {Object} options.textarea Use textarea instead of input field
 * @returns {HTMLElement} Generated HTML
 */
export default function ({
	testStatus,
	data,
	headerOnly = false,
	textarea = false
}: {
	testStatus: string
	data: Targeting
	headerOnly: Boolean
	textarea: Boolean
}) {
	const displayBadge = data.success || (!data.success && typeof testStatus !== 'undefined')
	return (
		<section className={`targeting${headerOnly ? ' headerOnly' : ''}`}>
			<div className="targeting-header">
				<button className="targeting-headerButton">
					<span className="targeting-name">{wording(data.key)} targeting</span>
					{displayBadge && (
						<BadgeTemplate status={data.success ? 'accepted' : testStatus} />
					)}
					{!headerOnly && (
						<div className="targeting-headerIcon" innerHTML={arrowBottom}></div>
					)}
				</button>
			</div>
			{!headerOnly && (
				<div className="targeting-content">
					<table className="targeting-table">
						<tbody>
							{data.conditions.map((item: Condition) => {
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
