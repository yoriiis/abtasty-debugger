import { createElement } from 'jsx-dom'
import CollapseTemplate from 'shared/collapse/assets/scripts/collapse'
import { Variations } from 'shared/assets/interfaces/interfaces'

/**
 * collapse template
 * @param {Object} options
 * @param {String} options.testStatus Status of the test
 * @param {Object} options.data collapse data
 * @param {Object} options.headerOnly Display the header only, without content
 * @param {Object} options.textarea Use textarea instead of input field
 * @returns {HTMLElement} Generated HTML
 */
export default function ({
	variations,
	identifier,
	testId,
	variationActive
}: {
	testId: string
	variations: Variations
	identifier: string
	variationActive: number
}) {
	console.log(variations)
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
								data-identifier={identifier}
								data-test-id={testId}
								checked={variation.id === variationActive}
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
