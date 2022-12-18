import validateTarget from 'validate-target'
import { createElement } from 'jsx-dom'
import TemplateList from './templates/list'
import { Component, navigate } from 'costro'
import { sendMessage, isExtensionMode, namespace } from 'shared/utils/bridge'

export default class List extends Component {
	element: null | HTMLElement

	constructor(props: any) {
		super(props)

		this.element = null

		this.onClickOnElement = this.onClickOnElement.bind(this)
		this.onChangeOnElement = this.onChangeOnElement.bind(this)
	}

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

	/**
	 * After render
	 */
	afterRender() {
		this.element = document.querySelector('.list')
		this.addEvents()
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		if (this.element) {
			this.element.addEventListener('click', this.onClickOnElement)
			this.element.addEventListener('change', this.onChangeOnElement)
		}
	}

	/**
	 * On click event listener on the element
	 * @param {Event} e Event data
	 */
	onClickOnElement(e: Event) {
		const target = e.target

		const validateTargetclearCookies = validateTarget({
			target: target,
			selectorString: '.clearCookies',
			nodeName: ['button']
		})

		if (validateTargetclearCookies && isExtensionMode) {
			this.clearCookies(e)
		}
	}

	/**
	 * On change event listener on the element
	 * @param {Event} e Event data
	 */
	onChangeOnElement(e: Event) {
		const target = e.target

		const validateTargeDebugMode = validateTarget({
			target: target,
			selectorString: '#debugMode',
			nodeName: ['input']
		})

		if (validateTargeDebugMode) {
			this.toggleDebugMode(e)
		}
	}

	/**
	 * Retry and reload the popup if no results
	 * @param {Event} e Event data
	 */
	clearCookies(e: Event) {
		e.preventDefault()

		sendMessage({
			action: 'clearAbtastyCookies'
		})
		namespace.tabs.reload()
		window.close()
	}

	/**
	 * Toggle debug mode
	 * @param {Event} e Event data
	 */
	toggleDebugMode(e: Event) {
		const target = e.target as HTMLInputElement

		target.setAttribute('disabled', '')

		sendMessage({
			action: target.checked ? 'setStorage' : 'removeCookie',
			data: {
				name: 'abTastyDebug',
				value: target.checked
			}
		})
		namespace.tabs.reload()
	}
}
