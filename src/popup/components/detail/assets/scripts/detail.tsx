import { createElement } from 'jsx-dom'
import TemplateDetail from './templates/detail'
import { Component, navigate } from 'costro'

export default class Detail extends Component {
	/**
	 * Render the template
	 * @returns {HTMLElement} Template
	 */
	render() {
		const testId = this.route.params.testId
		return (
			<TemplateDetail
				testId={testId}
				identifier={this.props.accountData.accountSettings.identifier}
				test={this.props.accountData.tests[testId]}
				result={this.props.results[testId]}
				targetingSorted={this.props.targetingsSortedByStatus[testId]}
			/>
		)
	}
}
