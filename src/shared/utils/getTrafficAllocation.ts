import { Variations, Variation, TrafficAllocation } from 'shared/assets/interfaces/interfaces'

/**
 * Get traffic allocation between original and untracked variations
 * @param {Object} variations Test variations
 * @returns {Object} Traffic allocation for the test
 */
export default function getTrafficAllocation(variations: Variations): TrafficAllocation {
	const listVariationTraffic = Object.entries(variations).map(
		([id, variation]: [id: string, variation: Variation]) => variation.traffic
	)
	const totalVariationTraffic = listVariationTraffic.reduce(
		(partial_sum, a) => partial_sum + a,
		0
	)
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
