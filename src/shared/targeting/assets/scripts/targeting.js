import { createElement } from 'jsx-dom'
import Badge from 'shared/badge/assets/scripts/badge'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import wording from 'shared/utils/wording'

/**
 * Targeting template
 * @param {Object} options
 * @param {Object} options.key Targeting key (url_scope|code_scope|selector_scope|cookie_scope|ip_scope)
 * @param {Object} options.testStatus Status of the test
 * @param {Object} options.data Targeting data
 * @param {Object} options.headerOnly Display the header only, without content
 * @param {Object} options.textarea Use textarea instead of input field
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ key, testStatus, data, headerOnly = false, textarea = false }) {
	return (
		<section className={`targeting${headerOnly ? ' headerOnly' : ''}`}>
			<div className="targeting-header">
				<button className="targeting-headerButton">
					<span className="targeting-name">{wording(key)} targeting</span>
					<Badge status={data.success ? 'accepted' : testStatus} />
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
