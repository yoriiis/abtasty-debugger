import { createElement } from 'jsx-dom'
import Template from './templates/detail'
import { DynamicSegments, DetailData } from 'shared/assets/interfaces/interfaces'

export default class Detail {
	// @ts-ignore
	requestDynamicSegments: Function
	// @ts-ignore
	requestFormattedData: Function
	// @ts-ignore
	requestData: Function

	id = 'detail'
	route = '/detail/:testId'
	selector = '.detail'

	/**
	 * Render the template
	 * @returns {HTMLElement} Template
	 */
	render(): Element {
		const dynamicSegments = this.requestDynamicSegments(this.route)
		return this.getTemplate(this.getData(dynamicSegments))
	}

	/**
	 * Get data for the template
	 * @param dynamicSegments
	 * @returns {Object} Template's data
	 */
	getData(dynamicSegments: DynamicSegments): DetailData {
		const formattedData = this.requestFormattedData()
		const data = this.requestData()
		const testId = dynamicSegments[':testId']

		return {
			testId,
			identifier: data.accountData.accountSettings.identifier,
			test: data.accountData.tests[testId],
			result: data.results[testId],
			targetingSorted: formattedData.targetingsSortedByStatus[testId]
		}
	}

	/**
	 * Get template
	 * @param {Object} data Template's data
	 * @returns {HTMLElement} Template
	 */
	getTemplate(data: DetailData): any {
		return <Template data={data} />
	}
}
