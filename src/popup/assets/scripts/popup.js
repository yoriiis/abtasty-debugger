import { createElement } from 'jsx-dom'
import TemplateListResults from './templates/list-results'
import TemplateNoResults from './templates/no-results'
import validateTarget from 'validate-target'

export default class Popup {
	constructor({ data = null }) {
		this.data = data
		this.app = document.querySelector('#app')
		this.onClickOnApp = this.onClickOnApp.bind(this)
	}

	init() {
		if (this.data) {
			document.querySelector('#app').appendChild(<TemplateListResults data={this.data} />)
		} else {
			document.querySelector('#app').appendChild(<TemplateNoResults />)
		}

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
		target.parentNode.classList.toggle('active')
	}
}
