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
			let acceptedSegment: Array<Targeting> = []
			let rejectedSegment: Array<Targeting> = []
			let acceptedTrigger: Array<Targeting> = []
			let rejectedTrigger: Array<Targeting> = []

			const acceptedTargetPages = Object.entries(targetings.targetPages)
				.filter(([key, value]: [key: string, value: Targeting]) => value.success === true)
				.map(([key, value]: [key: string, value: Targeting]) => {
					value.key = key
					return value
				})
			const acceptedQaParameters = Object.entries(targetings.qaParameters)
				.filter(([key, value]: [key: string, value: Targeting]) => value.success === true)
				.map(([key, value]: [key: string, value: Targeting]) => {
					value.key = key
					return value
				})

			if (targetings.segment) {
				acceptedSegment = targetings.segment
					.filter((item: Targeting) => item.success === true)
					.map((item) => {
						item.key = 'segment'
						return item
					})
			}
			if (targetings.trigger) {
				acceptedTrigger = targetings.trigger
					.filter((item: Targeting) => item.success === true)
					.map((item) => {
						item.key = 'trigger'
						return item
					})
			}

			const rejectedTargetPages = Object.entries(targetings.targetPages)
				.filter(([key, value]: [key: string, value: Targeting]) => value.success === false)
				.map(([key, value]: [key: string, value: Targeting]) => {
					value.key = key
					return value
				})
			const rejectedQaParameters = Object.entries(targetings.qaParameters)
				.filter(([key, value]: [key: string, value: Targeting]) => value.success === false)
				.map(([key, value]: [key: string, value: Targeting]) => {
					value.key = key
					return value
				})

			if (targetings.segment) {
				rejectedSegment = targetings.segment
					.filter((item: Targeting) => item.success === false)
					.map((item) => {
						item.key = 'segment'
						return item
					})
			}
			if (targetings.trigger) {
				rejectedTrigger = targetings.trigger
					.filter((item: Targeting) => item.success === false)
					.map((item) => {
						item.key = 'trigger'
						return item
					})
			}

			outputData[id] = {
				accepted: [
					...acceptedTargetPages,
					...acceptedQaParameters,
					...acceptedSegment,
					...acceptedTrigger
				],
				rejected: [
					...rejectedTargetPages,
					...rejectedQaParameters,
					...rejectedSegment,
					...rejectedTrigger
				]
			}
		})

		return outputData
	}
}
