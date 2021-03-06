/**
 * Data manager for ABTasty data
 */

import { Data, TestsSortedByStatus, TargetingsSortedByStatus } from 'shared/assets/interfaces/interfaces'

export default class DataManager {
	data: Data;
	testsSortedByStatus: TestsSortedByStatus;
	targetingsSortedByStatus: TargetingsSortedByStatus;

	constructor({ data }: {data: Data}) {
		this.data = data
		this.testsSortedByStatus = this.getTestsSortedByStatus()
		this.targetingsSortedByStatus = this.getTargetingsSortedByStatus()
	}

	/**
	 * Get tests sorted by status (accepted or not)
	 * @returns {Object} Sorted tests
	 */
	getTestsSortedByStatus(): TestsSortedByStatus {
		return {
			accepted: Object.keys(this.data.results)
				.filter((id: string) => this.data.results[id].status === 'accepted')
				.map((id: string) => {
					this.data.results[id].key = id
					return this.data.results[id]
				}),
			rejected: Object.keys(this.data.results)
				.filter((id: string) => this.data.results[id].status !== 'accepted')
				.map((id: string) => {
					this.data.results[id].key = id
					return this.data.results[id]
				})
		}
	}

	/**
	 * Get targetings sorted by status (success or not)
	 * @returns {Object} Sorted targetings
	 */
	getTargetingsSortedByStatus(): TargetingsSortedByStatus {
		const data:TargetingsSortedByStatus = {}
		Object.keys(this.data.results).forEach((id: string) => {
			const targetings = this.data.results[id].targetings
			const acceptedTargetPages = Object.keys(targetings.targetPages)
				.filter((targetingKey: string) => targetings.targetPages[targetingKey].success === true)
				.map((targetingKey) => {
					targetings.targetPages[targetingKey].key = targetingKey
					return targetings.targetPages[targetingKey]
				})
			const acceptedQaParameters = Object.keys(targetings.qaParameters)
				.filter((targetingKey: string) => targetings.qaParameters[targetingKey].success === true)
				.map((targetingKey) => {
					targetings.qaParameters[targetingKey].key = targetingKey
					return targetings.qaParameters[targetingKey]
				})
			const rejectedTargetPages = Object.keys(targetings.targetPages)
				.filter((targetingKey: string) => targetings.targetPages[targetingKey].success === false)
				.map((targetingKey) => {
					targetings.targetPages[targetingKey].key = targetingKey
					return targetings.targetPages[targetingKey]
				})
			const rejectedQaParameters = Object.keys(targetings.qaParameters)
				.filter((targetingKey: string) => targetings.qaParameters[targetingKey].success === false)
				.map((targetingKey) => {
					targetings.qaParameters[targetingKey].key = targetingKey
					return targetings.qaParameters[targetingKey]
				})

			data[id] = {
				accepted: [...acceptedTargetPages, ...acceptedQaParameters],
				rejected: [...rejectedTargetPages, ...rejectedQaParameters]
			}
		})

		return data
	}
}
