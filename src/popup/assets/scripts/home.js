import { createElement } from 'jsx-dom'
import TemplatePopup from './templates/popup'
import validateTarget from 'validate-target'
import slideToggle from 'shared/utils/slide-toggle'

export default class Popup {
	constructor() {
		this.app = document.querySelector('#app')
		this.onClickOnApp = this.onClickOnApp.bind(this)
	}

	init() {
		const results = window.ABTasty.results
		document.querySelector('#app').appendChild(<TemplatePopup results={results} />)

		this.addEvents()
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
		slideToggle(target.parentNode.querySelector('.resultsList-itemDetails'))
	}
}
