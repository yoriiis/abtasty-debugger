import { createElement } from 'jsx-dom'
import TemplateList from './templates/list'
import { Component, navigate } from 'costro'

export default class List extends Component {
	/**
	 * Render the template
	 * @returns {HTMLElement} Template
	 */
	render() {
		return (
			<TemplateList
				testsSortedByStatus={this.props.testsSortedByStatus}
				debug={this.props.debug}
			/>
		)
	}
}
