import validateTarget from 'validate-target'
import { createElement } from 'jsx-dom'
import TemplateDetail from './templates/detail'
import { Component, navigate } from 'costro'
import { sendMessage, isExtensionMode, namespace } from 'shared/utils/bridge'

export default class Detail extends Component {
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

	/**
	 * After render
	 */
	afterRender() {
		this.element = document.querySelector('.detail')
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
		const validateTargetCollapseButton = validateTarget({
			target: target,
			selectorString: '.collapse-headerButton',
			nodeName: ['button']
		})

		if (validateTargetCollapseButton) {
			this.toggleCollapse(e)
		}
	}

	/**
	 * On change event listener on the element
	 * @param {Event} e Event data
	 */
	onChangeOnElement(e: Event) {
		const target = e.target
		const validateTargetSwitchVariation = validateTarget({
			target: target,
			selectorString: '.variation-inputRadio',
			nodeName: ['input']
		})

		if (validateTargetSwitchVariation) {
			this.switchVariation(e)
		}
	}

	/**
	 * Toggle collapse content
	 * @param {Event} e Event data
	 */
	toggleCollapse(e: Event) {
		const target = e.target as HTMLElement

		if (target.closest('.collapse.headerOnly')) {
			return
		}

		// @ts-ignore
		target.closest('.collapse').classList.toggle('active')
	}

	/**
	 * Switch variation
	 * @param {Event} e Event data
	 */
	switchVariation(e: Event) {
		const target = e.target as HTMLInputElement
		const newVariationId = parseInt(target.value)
		const testId = target.getAttribute('data-test-id') as string

		sendMessage({
			action: 'getCookie',
			data: {
				name: 'ABTasty'
			},
			callback: (response: string) => {
				if (response) {
					const thValue = response.split('&').find((item: string) => item.includes('th='))

					if (thValue) {
						const currentVariationId = thValue.match(
							new RegExp(`${testId}.(-?[0-9]*).`)
						)

						if (currentVariationId && currentVariationId.length) {
							const thValueUpdated = thValue.replace(
								`.${currentVariationId[1]}`,
								`.${newVariationId}`
							)
							response = response.replace(thValue, thValueUpdated)

							sendMessage({
								action: 'setStorage',
								data: {
									name: 'ABTasty',
									value: response,
									syncWithLocalStorage: true
								}
							})
							namespace.tabs.reload()

							// Update the data with the new variation ID
							// Useful if the detail view is re-rendered after updating the variation
							this.props.results[testId].variationID = newVariationId
						}
					}
				}
			}
		})
	}
}
