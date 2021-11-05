import { createElement } from 'jsx-dom'
import CollapseTemplate from 'shared/collapse/assets/scripts/collapse'
import { Variations } from 'shared/assets/interfaces/interfaces'

/**
 * collapse template
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
	const content = (
		<ul class="variation">
			{Object.keys(variations).map((key) => {
				const variation = variations[key]
				return (
					<li class="variation-listItem">
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
								checked={variation.id === currentVariationId}
							/>
							<span class="variation-inputRound"></span>
						</div>
					</li>
				)
			})}
		</ul>
	)
	return <CollapseTemplate header="Variations" content={content} />
}
