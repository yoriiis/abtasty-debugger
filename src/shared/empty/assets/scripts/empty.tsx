import validateTarget from 'validate-target'
import { createElement } from 'jsx-dom'
import TemplateEmpty from './templates/empty'
import { Component, navigate } from 'costro'

export default class Empty extends Component {
	element: null | HTMLElement

	constructor(props: any) {
		super(props)

		this.element = null

		this.onClickOnElement = this.onClickOnElement.bind(this)
	}

	/**
	 * Before render
	 */
	beforeRender() {
		this.props.hasData && navigate('/list')
	}

	/**
	 * Render the template
	 * @returns {HTMLElement} Template
	 */
	render() {
		return <TemplateEmpty />
	}

	/**
	 * After render
	 */
	afterRender() {
		this.element = document.querySelector('.empty')
		this.addEvents()
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		if (this.element) {
			this.element.addEventListener('click', this.onClickOnElement)
		}
	}

	/**
	 * On click event listener on the element
	 * @param {Event} e Event data
	 */
	onClickOnElement(e: Event) {
		const target = e.target
		const validateTargetRetry = validateTarget({
			target,
			selectorString: '.empty-retryButton',
			nodeName: ['button']
		})

		if (validateTargetRetry) {
			this.retry(e)
		}
	}

	/**
	 * Retry and reload the popup if no results
	 * @param {Event} e Event data
	 */
	retry(e: Event) {
		e.preventDefault()

		window.location.reload()
	}
}
