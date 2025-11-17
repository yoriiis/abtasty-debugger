import { Component, navigate } from 'costro'
import type { TargetingsSortedByStatus } from 'shared/assets/definitions/types.js'
import { namespace, sendMessage } from 'shared/utils/bridge.js'
import validateTarget from 'validate-target'
import TemplateDetail from './templates/detail.js'

export default class Detail extends Component {
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

		if (typeof this.getStore('targetingsSortedByStatus') === 'undefined') {
			this.setStore({
				targetingsSortedByStatus: this.props.dataManager.getTargetingsSortedByStatus(
					this.props.data
				)
			})
		}
	}

	/**
	 * Render the template
	 * @returns Template
	 */
	render() {
		const targetingsSortedByStatus = this.getStore(
			'targetingsSortedByStatus'
		) as TargetingsSortedByStatus
		const testId = this.route.params.testId

		if (!targetingsSortedByStatus) {
			return
		}

		return (
			<TemplateDetail
				testId={testId}
				identifier={this.props.data.accountData.accountSettings.identifier}
				test={this.props.data.accountData.tests[testId]}
				result={this.props.data.results[testId]}
				targetingSorted={targetingsSortedByStatus[testId]}
			/>
		)
	}

	/**
	 * After render
	 */
	afterRender() {
		this.element = document.querySelector('.detail')

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
		const validateTargetCollapseButton = validateTarget({
			target,
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
			target,
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

		// @ts-expect-error
		target.closest('.collapse').classList.toggle('active')
	}

	/**
	 * Switch variation
	 * @param {Event} e Event data
	 */
	switchVariation(e: Event) {
		const target = e.target as HTMLInputElement
		const newVariationId = Number.parseInt(target.value, 10)
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
						const currentVariationId = thValue.match(new RegExp(`${testId}.(-?[0-9]*).`))

						if (currentVariationId?.length) {
							const thValueUpdated = thValue.replace(
								`${testId}.${currentVariationId[1]}`,
								`${testId}.${newVariationId}`
							)

							sendMessage({
								action: 'changeVariation',
								data: {
									testId,
									variationId: newVariationId,
									cookieValue: response.replace(thValue, thValueUpdated)
								}
							})
							namespace.tabs.reload()
						}
					}
				}
			}
		})
	}
}
