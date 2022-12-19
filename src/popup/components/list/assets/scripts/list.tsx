import validateTarget from 'validate-target'
import { createElement } from 'jsx-dom'
import TemplateList from './templates/list'
import { Component, navigate } from 'costro'
import { sendMessage, isExtensionMode, namespace } from 'shared/utils/bridge'
import { TestsSortedByStatus } from 'shared/assets/interfaces/interfaces'

export default class List extends Component {
	element: null | HTMLElement

	constructor(props: any) {
		super(props)

		this.element = null

		this.onClickOnElement = this.onClickOnElement.bind(this)
		this.onChangeOnElement = this.onChangeOnElement.bind(this)
	}

	/**
	 * Before render
	 */
	beforeRender() {
		if (!this.props.hasData) {
			navigate('/empty')
			return
		}

		if (typeof this.getStore('testsSortedByStatus') === 'undefined') {
			this.setStore({
				testsSortedByStatus: this.props.dataManager.getTestsSortedByStatus(this.props.data)
			})
		}
		if (typeof this.getStore('debug') === 'undefined') {
			this.setStore({ debug: this.props.data.debug })
		}
	}

	/**
	 * Render the template
	 * @returns {HTMLElement} Template
	 */
	render() {
		const testsSortedByStatus = this.getStore('testsSortedByStatus') as TestsSortedByStatus
		// @ts-ignore
		const debug = this.getStore('debug') as boolean

		if (!testsSortedByStatus) {
			return
		}

		return <TemplateList testsSortedByStatus={testsSortedByStatus} debug={debug} />
	}

	/**
	 * After render
	 */
	afterRender() {
		this.element = document.querySelector('.list')

		if (this.element) {
			this.addEvents()
		}
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		const element = this.element as HTMLElement

		element.addEventListener('click', this.onClickOnElement)
		element.addEventListener('change', this.onChangeOnElement)
	}

	/**
	 * On click event listener on the element
	 * @param {Event} e Event data
	 */
	onClickOnElement(e: Event) {
		const target = e.target

		const validateTargetclearCookies = validateTarget({
			target,
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
			target,
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
