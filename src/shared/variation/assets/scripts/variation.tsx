import { createElement } from 'jsx-dom'
import CollapseTemplate from 'shared/collapse/assets/scripts/collapse'
import externalLink from 'shared/assets/svgs/external-link.svg'
import { Variations, Variation } from 'shared/assets/interfaces/interfaces'
import getTrafficAllocation from 'shared/utils/get-traffic-allocation'

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
	testId,
	accountId
}: {
	variations: Variations
	currentVariationId: number
	testId: string
	accountId: string
}) {
	const originalVariation = {
		id: 0,
		name: 'Original',
		traffic: getTrafficAllocation(variations).original
	}
	const unTrackedVariation = {
		id: -1,
		name: 'Untracked',
		traffic: getTrafficAllocation(variations).untracked
	}
	const content = (
		<div className="variation">
			<ul className="variation-list">
				{Object.entries(variations).map(
					([, variation]: [id: string, variation: Variation]) =>
						variationListItem({
							variation,
							currentVariationId,
							testId,
							accountId
						})
				)}
				{variationListItem({ variation: originalVariation, currentVariationId, testId })}
				{variationListItem({ variation: unTrackedVariation, currentVariationId, testId })}
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
	testId,
	accountId
}: {
	variation: Variation
	currentVariationId: number
	testId: string
	accountId?: string
}) => {
	// Original = 0 | unTracked = -1 | Timeout = -2 | Other = undefined
	const isVariationChangeGranted = ![-2, -1, undefined].includes(variation.id)

	// Current variation ID is set to undefined when traffic is not tracked (not synchronized with cookie value set to -1)
	const isChecked =
		variation.id === -1 && [-1, undefined].includes(currentVariationId)
			? true
			: variation.id === currentVariationId

	return (
		<li className={`variation-listItem${!isVariationChangeGranted ? ' disabled' : ''}`}>
			<span className="variation-traffic">
				{variation.traffic === -1 ? '-' : `${variation.traffic}%`}
			</span>
			<label htmlFor={`variation-${variation.id}`} className="variation-name">
				{variation.name}
				{isVariationChangeGranted && variation.id !== 0 && (
					<a
						href={`https://try.abtasty.com/${accountId}/${testId}.${
							variation.id
						}.json?${new Date().getTime()}`}
						target="_blank"
						rel="noreferrer"
						className="variation-link"
					>
						<div className="variation-linkIcon" innerHTML={externalLink}></div>
					</a>
				)}
			</label>
			<div className="customRadio">
				<input
					type="radio"
					value={variation.id}
					id={`variation-${variation.id}`}
					className="customRadio-input variation-inputRadio"
					name="variationId"
					data-test-id={testId}
					disabled={!isVariationChangeGranted}
					checked={isChecked}
				/>
				<span className="customRadio-round"></span>
			</div>
		</li>
	)
}
