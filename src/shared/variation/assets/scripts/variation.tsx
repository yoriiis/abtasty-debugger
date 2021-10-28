import { createElement } from 'jsx-dom'
import BadgeTemplate from 'shared/badge/assets/scripts/badge'
import CollapseTemplate from 'shared/collapse/assets/scripts/collapse'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import wording from 'shared/utils/wording'
import { Variations, Condition } from 'shared/assets/interfaces/interfaces'

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
	testId
}: {
	variations: Variations
	identifier: number
	testId: string
}) {
	console.log(variations)
	const content = (
		<ul>
			{Object.keys(variations).map((key) => {
				const variation = variations[key]
				return (
					<li>
						<span>{variation.name}</span>
						<BadgeTemplate text="Off" color="red" />
						<button
							class="activate-variation"
							data-variation-id={variation.id}
							data-identifier={identifier}
							data-test-id={testId}
						>
							Activate
						</button>
					</li>
				)
			})}
		</ul>
	)
	return <CollapseTemplate header="Variations" content={content} />
}
