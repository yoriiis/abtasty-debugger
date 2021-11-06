import { createElement } from 'jsx-dom'
import CollapseTemplate from 'shared/collapse/assets/scripts/collapse'
import { Variations, Variation } from 'shared/assets/interfaces/interfaces'

/**
 * Template of variations list
 * @param {Object} options
 * @param {String} options.variations Test variations
 * @param {Object} options.currentVariationId Current variation ID
 * @param {Object} options.testId Test ID
 * @returns {HTMLElement} Generated HTML
 */
export default function ({
	variations,
	currentVariationId,
	testId
}: {
	variations: Variations
	currentVariationId: number
	testId: string
}) {
	const defaultVariation = {
		id: 0,
		name: 'Original',
		traffic: 0
	}
	const content = (
		<div class="variation">
			<ul class="variation-list">
				{Object.keys(variations).map((key) =>
					variationListItem({ variation: variations[key], currentVariationId, testId })
				)}
				{variationListItem({ variation: defaultVariation, currentVariationId, testId })}
			</ul>
		</div>
	)
	return <CollapseTemplate header="Variations" content={content} />
}

/**
 * Template of a single variation
 * @param {Object} options
 * @param {String} options.variations Test variations
 * @param {Object} options.currentVariationId Current variation ID
 * @param {Object} options.testId Test ID
 * @returns {HTMLElement} Generated HTML
 */
const variationListItem = ({
	variation,
	currentVariationId,
	testId
}: {
	variation: Variation
	currentVariationId: number
	testId: string
}) => {
	// Original = 0 | Untracked = -1 | Timeout = -2 | Other = undefined
	const isDefaultActive = [-2, -1, 0, undefined].includes(currentVariationId)

	const isDefault = variation.id === 0
	const isChecked = isDefault ? isDefaultActive : variation.id === currentVariationId
	return (
		<li class="variation-listItem">
			<span class="variation-traffic">{isDefault ? '-' : `${variation.traffic}%`}</span>
			<label htmlFor={`variation-${variation.id}`} class="variation-name">
				{variation.name}
			</label>
			<div class="variation-input">
				<input
					type="radio"
					value={variation.id}
					id={`variation-${variation.id}`}
					class="variation-inputRadio"
					name="variationId"
					data-test-id={testId}
					checked={isChecked}
				/>
				<span class="variation-inputRound"></span>
			</div>
		</li>
	)
}
