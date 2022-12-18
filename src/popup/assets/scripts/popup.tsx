import validateTarget from 'validate-target'
import DataManager from 'shared/utils/data-manager'
import { sendMessage, isExtensionMode, namespace } from 'shared/utils/bridge'
import { Data, ChangeInfo } from 'shared/assets/interfaces/interfaces'
import List from '../../components/list/assets/scripts/list'
import Detail from '../../components/detail/assets/scripts/detail'
import Empty from 'shared/empty/assets/scripts/empty'

import { App, navigate } from 'costro'

declare global {
	interface Window {
		ABTasty: {
			clearAllCookies: Function
		}
	}
}

// Fix innerHTML attribute with jsx-dom and TS
declare module 'react' {
	interface HTMLAttributes<T> {
		innerHTML?: any
	}
}

export default class Popup {
	data: Data
	app: Element
	dataManager: any

	constructor({ data }: { data: Data }) {
		this.data = data

		// @ts-ignore
		this.app = document.querySelector('#app')

		this.onClickOnApp = this.onClickOnApp.bind(this)
		this.onChangeOnApp = this.onChangeOnApp.bind(this)
		this.onTabUpdated = this.onTabUpdated.bind(this)

		this.dataManager = new DataManager()
	}

	/**
	 * Initialize the popup
	 */
	init() {
		if (this.app) {
			const app = new App({
				target: this.app as HTMLElement,
				routes: [
					{
						path: '/list',
						component: List,
						props: {
							testsSortedByStatus: this.dataManager.getTestsSortedByStatus(this.data),
							debug: this.data.debug
						}
					},
					{
						path: '/detail/:testId',
						component: Detail,
						props: {
							accountData: this.data.accountData,
							results: this.data.results,
							targetingsSortedByStatus: this.dataManager.getTargetingsSortedByStatus(
								this.data
							)
						}
					},
					{
						path: '/empty',
						component: Empty
					}
				]
			})
			console.log(app, this.data)

			if (this.data && this.data.results) {
				navigate('/list')
			} else {
				navigate('/empty')
			}
		}

		this.addEvents()
	}

	/**
	 * Add event listeners
	 */
	addEvents() {
		this.app.addEventListener('click', this.onClickOnApp)

		if (isExtensionMode) {
			this.app.addEventListener('change', this.onChangeOnApp)
			namespace.tabs.onUpdated.addListener(this.onTabUpdated)
		}
	}

	/**
	 * On click event listener on the app
	 * @param {Event} e Event data
	 */
	onClickOnApp(e: Event) {
		const target = e.target
		const validateTargetCollapseButton = validateTarget({
			target: target,
			selectorString: '.collapse-headerButton',
			nodeName: ['button']
		})
		const validateTargetRetry = validateTarget({
			target: target,
			selectorString: '.empty-retryButton',
			nodeName: ['button']
		})
		const validateTargetclearCookies = validateTarget({
			target: target,
			selectorString: '.clearCookies',
			nodeName: ['button']
		})

		if (validateTargetCollapseButton) {
			this.toggleCollapse(e)
		} else if (validateTargetRetry) {
			this.retry(e)
		} else if (validateTargetclearCookies && isExtensionMode) {
			this.clearCookies(e)
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
	 * Retry and reload the popup if no results
	 * @param {Event} e Event data
	 */
	retry(e: Event) {
		e.preventDefault()

		window.location.reload()
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
	 * On change event listener on the app
	 * @param {Event} e Event data
	 */
	onChangeOnApp(e: Event) {
		const target = e.target
		const validateTargetSwitchVariation = validateTarget({
			target: target,
			selectorString: '.variation-inputRadio',
			nodeName: ['input']
		})
		const validateTargeDebugMode = validateTarget({
			target: target,
			selectorString: '#debugMode',
			nodeName: ['input']
		})

		if (validateTargetSwitchVariation) {
			this.switchVariation(e)
		} else if (validateTargeDebugMode) {
			this.toggleDebugMode(e)
		}
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
							this.data.results[testId].variationID = newVariationId
						}
					}
				}
			}
		})
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

	/**
	 * On tab updates event listener
	 * @param {Number} tabId Tab ID
	 * @param {Object} changeInfo Updated data (status)
	 * @param {Object} tab Tab data
	 */
	onTabUpdated(tabId: number, changeInfo: ChangeInfo, tab: any) {
		const debugMode = document.querySelector('#debugMode')
		if (debugMode && debugMode.hasAttribute('disabled') && changeInfo.status === 'complete') {
			debugMode.removeAttribute('disabled')
		}
	}

	/**
	 * Remove HTML Element
	 * @param {HTMLElement} element
	 */
	removeElement(element: Element) {
		element.remove()
	}
}
