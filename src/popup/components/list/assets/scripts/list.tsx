import { createElement } from 'jsx-dom'
import Template from './templates/list'
import { ListData } from 'shared/assets/interfaces/interfaces'

export default class List {
	// @ts-ignore
	requestFormattedData: Function
	// @ts-ignore
	requestData: Function

	id = 'list'
	route = '/'
	selector = '.list'

	/**
	 * Render the template
	 * @returns {HTMLElement} Template
	 */
	render(): Element {
		return this.getTemplate(this.getData())
	}

	/**
	 * Get data for the template
	 * @param dynamicSegments
	 * @returns {Object} Template's data
	 */
	getData(): ListData {
		const data = this.requestData()
		const formattedData = this.requestFormattedData()

		return {
			testsSortedByStatus: formattedData.testsSortedByStatus,
			debug: data.debug
		}
	}

	/**
	 * Get template
	 * @param {Object} data Template's data
	 * @returns {HTMLElement} Template
	 */
	getTemplate(data: ListData): Element {
		return <Template data={data} />
	}
}
