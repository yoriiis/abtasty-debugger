import { createElement } from 'jsx-dom'
import Template from './templates/empty'

export default class Empty {
	id = 'empty'
	route = '/empty'
	selector = '.empty'

	/**
	 * Render the template
	 * @returns {HTMLElement} Template
	 */
	render(): Element {
		return this.getTemplate()
	}

	/**
	 * Get template
	 * @param {Object} data Template's data
	 * @returns {HTMLElement} Template
	 */
	getTemplate(): any {
		return <Template />
	}
}
