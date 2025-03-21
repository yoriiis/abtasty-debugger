import type { TrafficAllocation, Variation, Variations } from 'shared/assets/definitions/types.js'

/**
 * Get traffic allocation between original and untracked variations
 * @param {Object} variations Test variations
 * @returns {Object} Traffic allocation for the test
 */
export default function getTrafficAllocation(variations: Variations): TrafficAllocation {
	const listVariationTraffic = Object.entries(variations).map(
		([, variation]: [id: string, variation: Variation]) => variation.traffic
	)
	const totalVariationTraffic = listVariationTraffic.reduce((partialSum, a) => partialSum + a, 0)
	const highestTraffic = Math.max(...listVariationTraffic)

	let untracked = -1
	let original = -1

	if (totalVariationTraffic + highestTraffic === 100) {
		original = highestTraffic
		untracked = 0
	} else if (totalVariationTraffic + highestTraffic > 100) {
		original = 100 - totalVariationTraffic
		untracked = 0
	} else if (totalVariationTraffic + highestTraffic < 100) {
		original = highestTraffic
		untracked = 100 - totalVariationTraffic - highestTraffic
	}

	return {
		original,
		untracked
	}
}
