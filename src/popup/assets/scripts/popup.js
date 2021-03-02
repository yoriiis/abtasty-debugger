import { createElement } from 'jsx-dom'
import TemplateListResults from './templates/list-results'
import TemplateNoResults from './templates/no-results'
import validateTarget from 'validate-target'

export default class Popup {
	constructor() {
		this.app = document.querySelector('#app')
		this.onClickOnApp = this.onClickOnApp.bind(this)
	}

	init() {
		if (this.isDataAvailable()) {
			document
				.querySelector('#app')
				.appendChild(<TemplateListResults data={window.ABTasty} />)
		} else {
			document.querySelector('#app').appendChild(<TemplateNoResults />)
		}

		this.addEvents()
	}

	isDataAvailable() {
		return (
			typeof window.ABTasty !== 'undefined' &&
			typeof window.ABTasty.results !== 'undefined' &&
			Object.keys(window.ABTasty.results).length
		)
	}

	addEvents() {
		this.app.addEventListener('click', this.onClickOnApp)
	}

	onClickOnApp(e) {
		const target = e.target
		const validateTargetAbtestView = validateTarget({
			target: target,
			selectorString: '.resultsList-itemButton',
			nodeName: ['button']
		})

		if (validateTargetAbtestView) {
			this.viewAbtest(e)
		}
	}

	viewAbtest(e) {
		const target = e.target
		target.parentNode.classList.toggle('active')
	}
}
