import { createElement } from 'jsx-dom'
import BadgeTemplate from 'shared/badge/assets/scripts/badge'
import CollapseTemplate from 'shared/collapse/assets/scripts/collapse'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import wording from 'shared/utils/wording'
import { Targeting, Condition, FavoriteUrlScope } from 'shared/assets/interfaces/interfaces'

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
		color: targeting.success ? 'green' : 'red',
		withIcon: true
	}
	let conditions = targeting.conditions as Array<Condition>

	// The page builder uses a different structure (FavoriteUrlScope interface)
	if (!Array.isArray(targeting.conditions) && targeting.key === 'favorite_url_scope') {
		conditions = targeting.conditions.urlScopes
	}

	const content = (
		<table className="table">
			<tbody>
				{conditions.map((item: Condition) => {
					let value = item.value
					if (targeting.key === 'cookie_scope') {
						value = `${item.name}=${item.value}`
					} else if (targeting.key === 'favorite_url_scope' && item.favorite_url_id) {
						const urlScopeRef = (
							targeting.conditions as FavoriteUrlScope
						).favoriteUrlScopeConditions.find(
							(urlScope: Condition) =>
								urlScope.favorite_url_id === item.favorite_url_id
						)
						if (urlScopeRef && urlScopeRef.url) {
							value = urlScopeRef.url
						}
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
			header={`${wording(targeting.key)}`}
			content={!headerOnly && content}
			badge={badge}
		/>
	)
}
