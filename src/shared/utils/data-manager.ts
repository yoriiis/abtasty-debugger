import {
	Data,
	TestsSortedByStatus,
	TargetingsSortedByStatus,
	FormattedData,
	Result,
	Targeting
} from 'shared/assets/interfaces/interfaces'

/**
 * Data manager for ABTasty data
 */
export default class DataManager {
	/**
	 * Get formatted data
	 * @param {Object} data Data
	 * @returns {Object} Formatted data
	 */
	getFormattedData(data: Data): FormattedData {
		return {
			testsSortedByStatus: this.getTestsSortedByStatus(data),
			targetingsSortedByStatus: this.getTargetingsSortedByStatus(data)
		}
	}

	/**
	 * Get tests sorted by status (accepted or not)
	 * @returns {Object} Sorted tests
	 */
	getTestsSortedByStatus(data: Data): TestsSortedByStatus {
		return {
			accepted: Object.entries(data.results)
				.filter(
					([id, result]: [id: string, result: Result]) =>
						result.status === 'accepted' && result.type !== 'mastersegment'
				)
				.map(([id, result]: [id: string, result: Result]) => {
					result.key = id
					return result
				}),
			rejected: Object.entries(data.results)
				.filter(
					([id, result]: [id: string, result: Result]) =>
						result.status !== 'accepted' && result.type !== 'mastersegment'
				)
				.map(([id, result]: [id: string, result: Result]) => {
					result.key = id
					return result
				})
		}
	}

	/**
	 * Get targetings sorted by status (success or not)
	 * @returns {Object} Sorted targetings
	 */
	getTargetingsSortedByStatus(data: Data): TargetingsSortedByStatus {
		const outputData: TargetingsSortedByStatus = {}
		Object.entries(data.results).forEach(([id, result]: [id: string, result: Result]) => {
			const targetings = result.targetings
			const acceptedTargetPages = Object.entries(targetings.targetPages)
				.filter(
					([targetingKey, targeting]: [targetingKey: string, targeting: Targeting]) =>
						targeting.success === true
				)
				.map(([targetingKey, targeting]: [targetingKey: string, targeting: Targeting]) => {
					targeting.key = targetingKey
					return targeting
				})
			const acceptedQaParameters = Object.entries(targetings.qaParameters)
				.filter(
					([targetingKey, targeting]: [targetingKey: string, targeting: Targeting]) =>
						targeting.success === true
				)
				.map(([targetingKey, targeting]: [targetingKey: string, targeting: Targeting]) => {
					targeting.key = targetingKey
					return targeting
				})
			const rejectedTargetPages = Object.entries(targetings.targetPages)
				.filter(
					([targetingKey, targeting]: [targetingKey: string, targeting: Targeting]) =>
						targeting.success === false
				)
				.map(([targetingKey, targeting]: [targetingKey: string, targeting: Targeting]) => {
					targeting.key = targetingKey
					return targeting
				})
			const rejectedQaParameters = Object.entries(targetings.qaParameters)
				.filter(
					([targetingKey, targeting]: [targetingKey: string, targeting: Targeting]) =>
						targeting.success === false
				)
				.map(([targetingKey, targeting]: [targetingKey: string, targeting: Targeting]) => {
					targeting.key = targetingKey
					return targeting
				})

			outputData[id] = {
				accepted: [...acceptedTargetPages, ...acceptedQaParameters],
				rejected: [...rejectedTargetPages, ...rejectedQaParameters]
			}
		})

		return outputData
	}
}
