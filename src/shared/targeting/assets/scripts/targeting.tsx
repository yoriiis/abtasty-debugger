import { createElement } from 'jsx-dom'
import BadgeTemplate from 'shared/badge/assets/scripts/badge'
import CollapseTemplate from 'shared/collapse/assets/scripts/collapse'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import wording from 'shared/utils/wording'
import { Targeting, Condition } from 'shared/assets/interfaces/interfaces'

/**
 * Targeting template
 * @param {Object} options
 * @param {String} options.testStatus Status of the test
 * @param {Object} options.targeting Targeting data
 * @param {Object} options.headerOnly Display the header only, without content
 * @param {Object} options.textarea Use textarea instead of input field
 * @returns {HTMLElement} Generated HTML
 */
export default function ({
	testStatus,
	targeting,
	headerOnly = false,
	textarea = false
}: {
	testStatus: string
	targeting: Targeting
	headerOnly: Boolean
	textarea: Boolean
}) {
	const badge = {
		text: targeting.success ? 'accepted' : testStatus,
		color: targeting.success ? 'green' : 'red'
	}

	const content = !headerOnly && (
		<table className="targeting-table">
			<tbody>
				{targeting.conditions.map((item: Condition) => {
					let value = item.value
					if (targeting.key === 'cookie_scope') {
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
									<input className="input" disabled type="text" value={value} />
								)}
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
	return (
		<CollapseTemplate
			header={`${wording(targeting.key)} targeting`}
			content={content}
			badge={
				targeting.success || (!targeting.success && typeof testStatus === 'string')
					? badge
					: false
			}
		/>
	)
}
