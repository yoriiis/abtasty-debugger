import { createElement } from 'jsx-dom'
import TemplateEmpty from './templates/empty'
import { Component } from 'costro'

export default class Empty extends Component {
	/**
	 * Render the template
	 * @returns {HTMLElement} Template
	 */
	render() {
		return <TemplateEmpty />
	}
}
