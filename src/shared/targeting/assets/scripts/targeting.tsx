import type { Condition, FavoriteUrlScope, Targeting } from 'shared/assets/definitions/types'
import CollapseTemplate from 'shared/collapse/assets/scripts/collapse'
import wording from 'shared/utils/wording'
/**
 * Targeting template
 * @param {Object} options
 * @param {Object} options.targeting Targeting data
 * @param {Object} options.headerOnly Display the header only, without content
 * @param {Object} options.textarea Use textarea instead of input field
 * @returns {HTMLElement} Generated HTML
 */
export default function TargetingTemplate({
	targeting,
	headerOnly = false,
	textarea = false
}: {
	targeting: Targeting
	headerOnly: boolean
	textarea: boolean
}) {
	const badge = {
		color: targeting.success ? 'green' : 'red',
		withIcon: true
	}
	let contentTemplate = null

	if (!headerOnly && targeting.conditions) {
		let conditions = targeting.conditions

		// The page builder uses a different structure (FavoriteUrlScope interface)
		if (!Array.isArray(targeting.conditions) && targeting.key === 'favorite_url_scope') {
			conditions = targeting.conditions.urlScopes
		}
		contentTemplate = (
			<table className="table">
				<tbody>
					{(conditions as Condition[]).map((item: Condition) => {
						let value = item.value
						if (targeting.key === 'cookie_scope') {
							value = `${item.name}=${item.value}`
						} else if (targeting.key === 'favorite_url_scope' && item.favorite_url_id) {
							const urlScopeRef = (
								targeting.conditions as FavoriteUrlScope
							).favoriteUrlScopeConditions.find(
								(urlScope: Condition) => urlScope.favorite_url_id === item.favorite_url_id
							)
							if (urlScopeRef?.url) {
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
	}

	let headerText = wording(targeting.key)
	if (['segment', 'trigger'].includes(targeting.key)) {
		headerText += `: ${targeting.name.toLowerCase()}`
	}
	return <CollapseTemplate header={headerText} content={contentTemplate} badge={badge} />
}
